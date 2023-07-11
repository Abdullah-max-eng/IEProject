from django.forms.models import model_to_dict
from .models import Challenges, Courses
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
from django.contrib.auth.decorators import login_required

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
            teacher = request.user.SystemUser
            selected_course_ID = request.GET.get('courseID')
            academic_year = request.GET.get('academicYear')
            start_year = int(academic_year.split('-')[0]) - 1
            end_year = int(academic_year.split('-')[1]) - 1
            one_year_before_academic_year = f'{start_year}-{end_year}'

            try:
                selected_course = Courses.objects.get(
                    pk=selected_course_ID, academicYear=academic_year, teacher=teacher)
                selected_course_code = selected_course.courseCode
                # selected_course_Title = selected_course.courseTitle
            except ObjectDoesNotExist:
                return JsonResponse({'error': 'Selected course does not exist.'})

            # Store the selected course ID in the session (------Very Importan-----)
            session = SessionStore(request.session.session_key)
            session['selected_course_id'] = selected_course_ID
            session.save()

            course_fall_previous_year = Courses.objects.filter(
                academicYear=one_year_before_academic_year, courseCode=selected_course_code, term='Fall', teacher=teacher).first()
            course_fall_selected_year = Courses.objects.filter(
                academicYear=academic_year, courseCode=selected_course_code, term='Fall', teacher=teacher).first()
            course_spring_selected_year = Courses.objects.filter(
                academicYear=academic_year, courseCode=selected_course_code, term='Spring', teacher=teacher).first()

            # print(course_fall_previous_year, course_fall_selected_year,
            #       course_spring_selected_year)

            CFPY_Grade_Card = GradesCard.objects.filter(
                course=course_fall_previous_year).first()
            # print("Card 11111", CFPY_Grade_Card)
            CFSY_Grade_Card = GradesCard.objects.filter(
                course=course_fall_selected_year).first()
            # print("Card 44444", CFSY_Grade_Card)
            CSSY_Grade_Card = GradesCard.objects.filter(
                course=course_spring_selected_year).first()
            # print("Card 3333", CSSY_Grade_Card)

            CFPY_FailRate = CFPY_Grade_Card.get_grade_rate(
                "F") if CFPY_Grade_Card else None
            CFSY_FailRate = CFSY_Grade_Card.get_grade_rate(
                "F") if CFSY_Grade_Card else None
            CSSY_FailRate = CSSY_Grade_Card.get_grade_rate(
                "F") if CSSY_Grade_Card else None

            if CFPY_Grade_Card:
                try:
                    CFPY_NumberOfStudents = CFPY_Grade_Card.get_total_students()
                    CFPY_WithDrawRates = CFPY_Grade_Card.get_grade_rate("W")
                    # print("Number of students in CFPY_Grade_Card:",
                    #       CFPY_NumberOfStudents)
                    # print("Withdraw Rate in CFPY_Grade_Card:", CFPY_WithDrawRates)
                except Exception as e:
                    print("Error occurred while processing CFPY_Grade_Card:", e)
            else:
                # print("CFPY_Grade_Card does not exist")
                pass

            if CFSY_Grade_Card:
                try:
                    CFSY_NumberOfStudents = CFSY_Grade_Card.get_total_students()
                    CFSY_WithDrawRates = CFSY_Grade_Card.get_grade_rate("W")
                    # print("Number of students in CFSY_Grade_Card:",
                    #       CFSY_NumberOfStudents)
                    # print("Withdraw Rate in CFSY_Grade_Card:", CFSY_WithDrawRates)
                except Exception as e:
                    print("Error occurred while processing CFSY_Grade_Card:", e)
            else:
                # print("CFSY_Grade_Card does not exist")
                pass

            if CSSY_Grade_Card:
                try:
                    CSSY_NumberOfStudents = CSSY_Grade_Card.get_total_students()
                    CSSY_WithDrawRates = CSSY_Grade_Card.get_grade_rate("W")
                    # print("Number of students in CSSY_Grade_Card:",
                    #       CSSY_NumberOfStudents)
                    # print("Withdraw Rate in CSSY_Grade_Card:", CSSY_WithDrawRates)
                except Exception as e:
                    print("Error occurred while processing CSSY_Grade_Card:", e)
            else:
                # print("CSSY_Grade_Card does not exist")
                pass

            course_data = {
                'courseTitle': selected_course.courseTitle,
                'professorName': selected_course.teacher.user.username,
                'students_fall_prev_year': CFPY_NumberOfStudents if course_fall_previous_year else '',
                'fail_rate_fall_prev_year': str(CFPY_FailRate) + "%" if course_fall_previous_year else '',
                'drop_withdraw_fall_prev_year': str(CFPY_WithDrawRates) + "%" if course_fall_previous_year else '',
                'satisfaction_score_fall_prev_year': str(course_fall_previous_year.studentSatisfactionScore) if course_fall_previous_year else '',
                'teaching_quality_fall_prev_year': str(course_fall_previous_year.teachingQualityScore) if course_fall_previous_year else '',
                'students_spring_selected_year': CSSY_NumberOfStudents if course_spring_selected_year else '',
                'fail_rate_spring_selected_year': str(CSSY_FailRate) + "%" if course_spring_selected_year else '',
                'drop_withdraw_spring_selected_year': str(CSSY_WithDrawRates) + "%" if course_spring_selected_year else '',
                'satisfaction_score_spring_selected_year': str(course_spring_selected_year.studentSatisfactionScore) if course_spring_selected_year else '',
                'teaching_quality_spring_selected_year': str(course_spring_selected_year.teachingQualityScore) if course_spring_selected_year else '',
                'students_fall_selected_year': CFSY_NumberOfStudents if course_fall_selected_year else '',
                'fail_rate_fall_selected_year': str(CFSY_FailRate) + "%" if course_fall_selected_year else '',
                'drop_withdraw_fall_selected_year': str(CFSY_WithDrawRates) + "%" if course_fall_selected_year else '',
                'satisfaction_score_fall_selected_year': str(course_fall_selected_year.studentSatisfactionScore) if course_fall_selected_year else '',
                'teaching_quality_fall_selected_year': str(course_fall_selected_year.teachingQualityScore) if course_fall_selected_year else ''
            }

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


def index(request, route=''):
    return render(request, 'index.html')


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


def saveimprovementplan(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            data = json.loads(request.body)
            course_id = data.get('selectedCourseID')
            improvement_plan_data = data.get('improvementPlanData')
            # print("==================================", data)

            try:
                course = Courses.objects.get(id=course_id)
            except Courses.DoesNotExist:
                return JsonResponse({'message': 'Invalid course ID'}, status=400)

            for issue_data in improvement_plan_data:
                issue_id = issue_data.get('id')
                issue = Issues.objects.filter(
                    IssueIndex=issue_id, course=course).first()

                if not issue:
                    issue = Issues(IssueIndex=issue_id, course=course)

                issue.IssueDescription = issue_data.get('issue')
                issue.improvementPlan = issue_data.get('improvementPlan')
                issue.successIndicator = issue_data.get('successIndicators')
                issue.actualOutcome = issue_data.get('actualOutcome')
                issue.endOfSemesterOutcome = issue_data.get(
                    'endOfSemesterOutcomes')
                issue.actionsNeeded = issue_data.get('furtherAction')
                issue.reviewersFeedback = issue_data.get('feedback')

                issue.save()

            return JsonResponse({'message': 'Improvement plan data saved successfully'})
        elif request.method == 'GET':
            selected_course_ID = request.GET.get('selectedCourseID')
            if selected_course_ID is not None and selected_course_ID.isdigit():
                course = get_object_or_404(Courses, pk=int(selected_course_ID))
                issues = Issues.objects.filter(course=course)

                data = []
                for i in range(1, 4):
                    issue = issues.filter(IssueIndex=i).first()

                    if not issue:
                        issue = Issues(IssueIndex=i, course=course)

                    data.append({
                        'id': i,
                        'issue': issue.IssueDescription or "",
                        'improvementPlan': issue.improvementPlan or "",
                        'successIndicators': issue.successIndicator or "",
                        'actualOutcome': issue.actualOutcome or "",
                        'endOfSemesterOutcomes': issue.endOfSemesterOutcome or "",
                        'furtherAction': issue.actionsNeeded or "",
                        'feedback': issue.reviewersFeedback or ""
                    })

                # print("Send Data ----------------------------------- ", data)
                return JsonResponse(data, safe=False)

            else:
                return JsonResponse({'message': 'Invalid course ID'}, status=400)

        else:
            return JsonResponse({'message': 'Invalid request method'}, status=405)
    else:
        return JsonResponse({'message': 'User not authenticated'}, status=401)


def SaveLink(request):
    if request.user.is_authenticated:

        system_user = get_object_or_404(SystemUsers, user=request.user)

        if request.method == 'POST':
            # print(
            # system_user, "request Received;l;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
            data = json.loads(request.body.decode('utf-8'))
            drive_link = data.get('link')
            course_id = data.get('courseId')

            # print("Received data: course_id =",
            #   course_id, "drive_link =", drive_link)

            course = get_object_or_404(
                Courses, id=course_id)
            teacher = course.teacher
            teacher.drive_link = drive_link
            teacher.save()

            return JsonResponse({'success': True})

        elif request.method == 'GET':
            course_id = request.GET.get('courseId')
            # print("Course id = ", course_id)
            if course_id:
                course = get_object_or_404(
                    Courses, id=course_id)
                teacher = course.teacher
                drive_link = teacher.drive_link
                # print("Sent Data:", drive_link)
                return JsonResponse({'link': drive_link})
            else:
                return JsonResponse({'error': 'Missing courseID parameter'}, status=400)

    return JsonResponse({'error': 'Unauthorized'}, status=401)


def ChallengesAndConcerns(request):
    if request.user.is_authenticated:

        if request.method == 'POST':
            course_id = request.GET.get('Cid')
            try:
                course = get_object_or_404(Courses, id=course_id)
            except Courses.DoesNotExist:
                return HttpResponseBadRequest("Invalid Course ID")
            data = request.body.decode('utf-8')
            try:
                mydata = json.loads(data)
                for item in mydata:
                    index = item.get('id')
                    challenge_description = item.get('challengerConcern', '')
                    challenge, created = Challenges.objects.get_or_create(
                        index=index, course=course,
                        defaults={'challengeDescription': challenge_description})
                    if not created:
                        challenge.challengeDescription = challenge_description
                        challenge.save()
            except json.JSONDecodeError as e:
                return HttpResponseBadRequest("Invalid JSON data")

            return JsonResponse({'success': 'Data saved successfully'})

        elif request.method == "GET":
            course_id = request.GET.get('courseId')
            # print("Course IDDDDDDDDDDDDD", course_id)
            try:
                course = get_object_or_404(Courses, id=course_id)
            except Courses.DoesNotExist:
                return HttpResponseBadRequest("Invalid Course ID")
# Retrieve challenges and concerns for the course
            challenges = Challenges.objects.filter(course=course)
            data = []
            for challenge in challenges:
                data.append({
                    'id': challenge.index,
                    'challengerConcern': challenge.challengeDescription
                })

            if data:
                return JsonResponse(data, safe=False)
            else:
                emtpyData = [{'id': 1, 'challengerConcern': ''}, {
                    'id': 2, 'challengerConcern': ''}, {'id': 3, 'challengerConcern': ''}]
                print("Empty Sent")
                return JsonResponse(emtpyData, safe=False)
            # Return the data as JSON response

    return HttpResponseBadRequest("Invalid request")


def grade_rates(request):
    # if request.user.is_authenticated:
    courseID = request.GET.get('courseID')
    academicYear = request.GET.get('academicYear')
    teacher = request.user.SystemUser

    # print("Teacher,", teacher)
    try:
        course = get_object_or_404(Courses, pk=courseID, teacher=teacher)
        courseCode = course.courseCode
    except Courses.DoesNotExist:
        return HttpResponseBadRequest("Course not found")

    spring_term_courses = Courses.objects.filter(
        term="Spring", academicYear=academicYear, courseCode=courseCode, teacher=teacher
    )
    fall_term_courses = Courses.objects.filter(
        term="Fall", academicYear=academicYear, courseCode=courseCode, teacher=teacher
    )
    # print(spring_term_courses, fall_term_courses)

    if not (spring_term_courses.exists() or fall_term_courses.exists()):
        return HttpResponseBadRequest("Courses not found")

    grade_rates = {}

    for term_courses in [spring_term_courses, fall_term_courses]:
        for course in term_courses:
            try:
                grades_card = GradesCard.objects.get(course=course)
                grade_rates[course.term] = {
                    'A': grades_card.get_grade_rate('A'),
                    'B': grades_card.get_grade_rate('B'),
                    'C': grades_card.get_grade_rate('C'),
                    'D': grades_card.get_grade_rate('D'),
                    'F': grades_card.get_grade_rate('F'),
                    'W': grades_card.get_grade_rate('W')
                }
            except GradesCard.DoesNotExist:
                pass

    return JsonResponse(grade_rates)

    # return HttpResponseBadRequest("Invalid request")


def ReviwersFeeBack(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            course_id = request.GET.get('Cid')
            dataReceived = json.loads(request.body)
            try:
                course = get_object_or_404(Courses, id=course_id)
            except Courses.DoesNotExist:
                return HttpResponseBadRequest("Invalid Course ID")

            feedback, created = ReviewersFeedback.objects.get_or_create(
                course=course)
            feedback.cirteriaStatus = dataReceived['criteria']
            feedback.Rationale = dataReceived['rationale']
            feedback.otherComments = dataReceived['otherComments']
            feedback.save()

            return HttpResponse("Feedback saved successfully")

        if request.method == 'GET':
            course_id = request.GET.get('Cid')
            try:
                course = get_object_or_404(Courses, id=course_id)
                feedback = get_object_or_404(ReviewersFeedback, course=course)
                data = {
                    'criteria': feedback.cirteriaStatus,
                    'rationale': feedback.Rationale,
                    'otherComments': feedback.otherComments
                }
                return JsonResponse(data)
            except (Courses.DoesNotExist, ReviewersFeedback.DoesNotExist):
                return HttpResponseBadRequest("Invalid Course ID")


def Logout(request):
    logout(request)  # Logout the current user
    return JsonResponse({'success': True})


def getAssignments(request):
    if request.user.is_authenticated:
        course_id = request.GET.get('Cid')
        try:
            course = get_object_or_404(Courses, id=course_id)
        except Courses.DoesNotExist:
            return JsonResponse({'error': 'Invalid Course ID'})

        try:
            clos_of_the_course = CLO.objects.filter(course=course)
            assignments = AssessmentComponent.objects.filter(
                clos__in=clos_of_the_course)
            assignments_list = [
                {'id': assignment.id, 'assessmentType': assignment.assessmentType} for assignment in assignments]
            return JsonResponse({'assignments': assignments_list}, safe=False)
        except CLO.DoesNotExist:
            return JsonResponse({'error': 'No assignments found for the course'})

    return JsonResponse({'error': 'Invalid request'})
