from imaplib import _Authenticator
import json
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse, HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
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


# new Branch
def getRoleAndData(request):
    if request.user.is_authenticated:
        system_user = request.user.SystemUser
        role = system_user.role
        selected_role = request.session.get('selected_role')
        if (role == "professor"):
            print("Entered as a professorlllllllllllllllllllllll")
            # Here we can retrieve the classes that this professor teach and pass it to the below json objt
            return JsonResponse({'role': selected_role, })
        elif (role == "reviewer"):
            print("Entered as a Revlllllllllllllllllllllllllllll")
            return JsonResponse({'role': selected_role})
        elif (role == "both"):
            print("Entered as a bothllllllllllllllllllllllllllllllllll")
            return JsonResponse({'role': selected_role})

    else:
        return HttpResponse("User not authenticated")


def index(request):
    return render(request, 'index.html')
