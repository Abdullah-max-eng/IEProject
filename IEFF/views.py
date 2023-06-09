from imaplib import _Authenticator
import json
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponseBadRequest, HttpResponseNotFound, JsonResponse, HttpResponse
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.sessions.backends.db import SessionStore

from .models import *
# Create your views here.


@csrf_exempt
def login_view(request):
    logout(request)
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            role = user.SystemUser.role
            selected_role = data.get('role')

            if (selected_role == "Professor" and role == "professor") or \
                    (selected_role == "Reviewer" and role == "reviewer") or \
                    (role == "both" and (selected_role == "Reviewer" or selected_role == "Professor")):
                login(request, user)
                request.session['selected_role'] = selected_role
                return JsonResponse({'success': True})
            else:
                return JsonResponse({'success': False, 'error': 'Invalid role selection'})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid credentials'})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})


def getRoleAndData(request):
    if request.user.is_authenticated:
        system_user = request.user.SystemUser
        role = system_user.role
        selected_role = request.session.get('selected_role')
        AcademicYear = request.GET.get('academicYear')
        # print("++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Role", role)
        # print(
        # "++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Selected Role", selected_role)

        if selected_role == 'Professor' or 'Reviewer':
            # Retrieve the courses taught by the professor from the database
            if (AcademicYear):
                courses = Courses.objects.filter(
                    teacher=system_user, academicYear=AcademicYear)
                course_data = json.loads(
                    serializers.serialize('json', courses))
                return JsonResponse({'role': selected_role, 'courses': course_data})
            else:
                return JsonResponse({'role': selected_role})

        # elif selected_role == 'Reviewer':
        #         courses = Courses.objects.filter(
        #         teacher=system_user, academicYear=request.GET.get('academicYear'))
        #         course_data = json.loads(serializers.serialize('json', courses))
            # print("+++++++++++++++++++++++++++++++++++++++++++++++ Courses", courses)
            # print(
            # "+++++++++++++++++++++++++++++++++++++++++++++++ Courses Data", course_data)
            # return JsonResponse({'role': selected_role, 'courses': course_data})

        elif role == 'both':
            return JsonResponse({'role': selected_role})
    else:
        return JsonResponse({'role': None})


def get_SelectedCourseBasedOnTerm(request):
    if request.user.is_authenticated:
        try:
            selected_course_ID = request.GET.get('courseID')
            academic_year = request.GET.get('academicYear')
            start_year = int(academic_year.split('-')[0]) - 1
            end_year = int(academic_year.split('-')[1]) - 1
            one_year_before_academic_year = f'{start_year}-{end_year}'

            try:
                selected_course = Courses.objects.get(
                    pk=selected_course_ID, academicYear=academic_year)
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'Selected course does not exist.'})

            # Store the selected course ID in the session
            session = SessionStore(request.session.session_key)
            session['selected_course_id'] = selected_course_ID
            session.save()

            course_fall_previous_year = Courses.objects.filter(
                academicYear=one_year_before_academic_year, term='Fall').first()
            course_fall_selected_year = Courses.objects.filter(
                academicYear=academic_year, term='Fall').first()
            course_spring_selected_year = Courses.objects.filter(
                academicYear=academic_year, term='Spring').first()

            course_data = {
                'courseTitle': selected_course.courseTitle,
                'professorName': selected_course.teacher.user.username,
                'students_fall_prev_year': course_fall_previous_year.numberOfStudent if course_fall_previous_year else '',
                'fail_rate_fall_prev_year': str(course_fall_previous_year.failRate) if course_fall_previous_year else '',
                'drop_withdraw_fall_prev_year': course_fall_previous_year.dropOrWithdraw if course_fall_previous_year else '',
                'satisfaction_score_fall_prev_year': str(course_fall_previous_year.studentSatisfactionScore) if course_fall_previous_year else '',
                'teaching_quality_fall_prev_year': str(course_fall_previous_year.teachingQualityScore) if course_fall_previous_year else '',
                'students_spring_selected_year': course_spring_selected_year.numberOfStudent if course_spring_selected_year else '',
                'fail_rate_spring_selected_year': str(course_spring_selected_year.failRate) if course_spring_selected_year else '',
                'drop_withdraw_spring_selected_year': course_spring_selected_year.dropOrWithdraw if course_spring_selected_year else '',
                'satisfaction_score_spring_selected_year': str(course_spring_selected_year.studentSatisfactionScore) if course_spring_selected_year else '',
                'teaching_quality_spring_selected_year': str(course_spring_selected_year.teachingQualityScore) if course_spring_selected_year else '',
                'students_fall_selected_year': course_fall_selected_year.numberOfStudent if course_fall_selected_year else '',
                'fail_rate_fall_selected_year': str(course_fall_selected_year.failRate) if course_fall_selected_year else '',
                'drop_withdraw_fall_selected_year': course_fall_selected_year.dropOrWithdraw if course_fall_selected_year else '',
                'satisfaction_score_fall_selected_year': str(course_fall_selected_year.studentSatisfactionScore) if course_fall_selected_year else '',
                'teaching_quality_fall_selected_year': str(course_fall_selected_year.teachingQualityScore) if course_fall_selected_year else ''
            }
            # print("Dataaa++++++++++++++++++++++", course_data)

            return JsonResponse({'coursesBasedOnTerm_data': course_data})
        except ValueError:
            return JsonResponse({'error': 'Invalid academic year format.'})
        except Exception as e:
            return JsonResponse({'error': str(e)})

    else:
        return HttpResponseBadRequest("Invalid request method.")


def get_selected_course_id(request):
    if request.user.is_authenticated:
        selected_course_id = request.session.get('selected_course_id')
        return JsonResponse({'selected_course_id': selected_course_id})
    else:
        return JsonResponse({'error': 'User not authenticated'})


@csrf_exempt
def AddOrGetDataSecondKeyIndicators(request):
    selected_course_ID = request.GET.get('Cid')

    if request.user.is_authenticated:
        if request.method == 'POST':
            received_data = request.body
            try:
                # Parse the received JSON data
                data_list = json.loads(received_data)
                if selected_course_ID is not None and selected_course_ID.isdigit():
                    course = get_object_or_404(
                        Courses, pk=int(selected_course_ID))
                else:
                    return JsonResponse({'error': 'Invalid course ID'})

                # Clear existing CLOs and related assessment components for the selected course
                course.clos.all().delete()

                for data in data_list:
                    clo_index = data['cloIndex']
                    marks = data['marks']
                    weight = data['weight']
                    assignments = data['assignments']

                    # Create a new CLO instance
                    clo = CLO(index=clo_index, cloMarks=marks,
                              cloWeight=weight, course=course)
                    clo.save()

                    # Create assessment components for the CLO
                    for assignment in assignments:
                        assessment_component = AssessmentComponent(
                            assessmentType=assignment,
                        )
                        assessment_component.save()
                        clo.assessment_components.add(assessment_component)

                # Delete assignments not associated with any CLO
                AssessmentComponent.objects.filter(clos__isnull=True).delete()

                return JsonResponse({'success': 'Data saved successfully'})
            except json.JSONDecodeError:
                return JsonResponse({'error': 'Invalid data format'})
            except Courses.DoesNotExist:
                return JsonResponse({'error': 'Course not found'})

        elif request.method == 'GET':
            try:
                course = get_object_or_404(Courses, pk=int(selected_course_ID))
                clo_data = []
                for clo in course.clos.all():
                    assignments = [assessment_component.assessmentType for assessment_component in
                                   clo.assessment_components.all()]

                    clo_data.append({
                        'cloIndex': clo.index,
                        'marks': clo.cloMarks,
                        'weight': clo.cloWeight,
                        'assignments': assignments
                    })

                return JsonResponse(clo_data, safe=False)
            except Courses.DoesNotExist:
                return JsonResponse({'error': 'Course not found'})
    else:
        return JsonResponse({'error': 'User not authenticated'})


def index(request):
    return render(request, 'index.html')


@csrf_exempt
def AddorGetDataWeekToWeek(request):
    selected_course_ID = request.GET.get('Cid')
    if request.user.is_authenticated:
        if request.method == 'POST':
            received_data = json.loads(request.body)
            # print("Received Data -------------------", received_data)

            try:
                if selected_course_ID is not None and selected_course_ID.isdigit():
                    course = get_object_or_404(
                        Courses, pk=int(selected_course_ID))
                else:
                    return JsonResponse({'error': 'Invalid course ID'})

                # Clear existing weeks for the selected course
                Week.objects.filter(course=course).delete()

                for data in received_data:
                    week_index = data['weekindex']
                    # Use .get() to provide a default value if 'feedback' is missing
                    week_feedback = data.get('feedback', '')

                    # Create a new Week instance for each week index and feedback
                    week = Week(weekIndex=week_index,
                                WeekFeedback=week_feedback, course=course)
                    week.save()

                return JsonResponse({'success': 'Data saved successfully'})
            except Courses.DoesNotExist:
                return JsonResponse({'error': 'Course not found'})

        elif request.method == 'GET':
            if selected_course_ID is not None and selected_course_ID.isdigit():
                course = get_object_or_404(Courses, pk=int(selected_course_ID))
                weeks = Week.objects.filter(
                    course=course).order_by('weekIndex')
                data = [{'weekindex': week.weekIndex,
                         'feedback': week.WeekFeedback} for week in weeks]
                # print("Sent Data -------------------", data)

                return JsonResponse(data, safe=False)

    return HttpResponseBadRequest('Invalid request')


@csrf_exempt
def saveimprovementplan(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            data = json.loads(request.body)
            course_id = data.get('selectedCourseID')
            improvement_plan_data = data.get('improvementPlanData')
            print("Received data on the server side:", data)

            try:
                course = Courses.objects.get(id=course_id)
            except Courses.DoesNotExist:
                return JsonResponse({'message': 'Invalid course ID'}, status=400)

            for issue_data in improvement_plan_data:
                issue_id = issue_data.get('id')
                issue = Issues.objects.filter(
                    IssueIndex=issue_id, course=course).first()

                # if issue:
                # Check if the field has a value before saving
                # if issue_data.get('improvementPlan'):
                issue.improvementPlan = issue_data.get('improvementPlan')
                # if issue_data.get('successIndicators'):
                issue.successIndicator = issue_data.get(
                    'successIndicators')
                # if issue_data.get('actualOutcome'):
                issue.actualOutcome = issue_data.get('actualOutcome')
                # if issue_data.get('endOfSemesterOutcomes'):
                issue.endOfSemesterOutcome = issue_data.get(
                    'endOfSemesterOutcomes')
                # if issue_data.get('furtherAction'):
                issue.actionsNeeded = issue_data.get('furtherAction')
                # if issue_data.get('feedback'):
                issue.reviewersFeedback = issue_data.get('feedback')

                issue.save()
                # else:
                # Issues.objects.create(
                #     IssueIndex=issue_data.get('id'),
                #     IssueDescription=issue_data.get('issue'),
                #     improvementPlan=issue_data.get('improvementPlan'),
                #     successIndicator=issue_data.get('successIndicators'),
                #     actualOutcome=issue_data.get('actualOutcome'),
                #     endOfSemesterOutcome=issue_data.get(
                #         'endOfSemesterOutcomes'),
                #     actionsNeeded=issue_data.get('furtherAction'),
                #     reviewersFeedback=issue_data.get('feedback'),
                #     course=course
                # )
            print("Data Saved Successfully")
            return JsonResponse({'message': 'Improvement plan data saved successfully'})

        elif request.method == 'GET':
            selected_course_ID = request.GET.get('selectedCourseID')
            if selected_course_ID is not None and selected_course_ID.isdigit():
                course = get_object_or_404(Courses, pk=int(selected_course_ID))
                issues = Issues.objects.filter(course=course)

                data = [{
                        'id': issue.IssueIndex or "",
                        'issue': issue.IssueDescription or "",
                        'improvementPlan': issue.improvementPlan or "",
                        'successIndicators': issue.successIndicator or "",
                        'actualOutcome': issue.actualOutcome or "",
                        'endOfSemesterOutcomes': issue.endOfSemesterOutcome or "",
                        'furtherAction': issue.actionsNeeded or "",
                        'feedback': issue.reviewersFeedback or ""
                        } for issue in issues]
                print("Send Data +++++++++++++++++++++++++", data)
                return JsonResponse(data, safe=False)

            else:
                return JsonResponse({'message': 'Invalid course ID'}, status=400)
        else:
            return JsonResponse({'message': 'Invalid request method'}, status=405)
    else:
        return JsonResponse({'message': 'User not authenticated'}, status=401)
