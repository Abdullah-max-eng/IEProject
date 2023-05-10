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
        print("-------------------------", email, password)  # Add this line
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            print("User Authnticated Succesfully", user.get_username)
            # logout(request)
            return JsonResponse({'success': True})

        else:
            return JsonResponse({'success': False, 'error': 'Invalid credentials'})
    else:
        return JsonResponse({'success': False, 'error': 'Invalid request method'})


def checkRole(request):
    if request.user.is_authenticated:
        system_user = request.user.SystemUser
        role = system_user.role
        if (role == "professor"):
            print("Entered as a professor")
            # Here we can retrieve the classes that this professor teach and pass it to the below json objt
            return JsonResponse({'role': role, })
        elif (role == "reviewer"):
            # print("Entered as a Rev")
            return JsonResponse({'role': role})

    else:
        return HttpResponse("User not authenticated")


def index(request):
    return render(request, 'index.html')
