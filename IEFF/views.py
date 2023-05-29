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
            print("Dataaa++++++++++++++++++++++", course_data)

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


def index(request):
    return render(request, 'index.html')
