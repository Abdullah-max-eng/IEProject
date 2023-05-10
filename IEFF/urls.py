from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="Login"),
    path('Login', views.index, name="Login"),
    path('loginHandler/', views.login_view, name='logining'),
    path('checkRole/', views.checkRole, name='CheckRole'),
    path('Dashboard/', views.index, name='Dashboard'),

]
