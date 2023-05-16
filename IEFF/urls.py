from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="Login"),
    path('Login', views.index, name="Login"),
    path('loginHandler/', views.login_view, name='logining'),
    path('Dashboard/', views.index, name='Dashboard'),
    path('getRoleAndData/', views.getRoleAndData, name='getRoleAndData'),

]
