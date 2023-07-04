from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="Login"),
    path('Login/', views.index, name="Login"),
    path('loginHandler/', views.login_view, name='logining'),
    path('Dashboard/', views.index, name='Dashboard'),
    path('getRoleAndData/', views.getRoleAndData, name='getRoleAndData'),
    path('get_SelectedCourseBasedOnTerm/', views.get_SelectedCourseBasedOnTerm,
         name='getSelectedCourseBasedOnTerm'),
    path('get_selected_course_id/', views.get_selected_course_id,
         name='get_selected_course_id'),
    path('AddorGetDataSecondKeyIndicators/', views.AddOrGetDataSecondKeyIndicators,
         name='add_or_get_data_second_key_indicators'),
    path('AddorGetDataWeekToWeek/', views.AddorGetDataWeekToWeek,
         name='AddorGetDataWeekToWeek'),
    path('saveimprovementplan/', views.saveimprovementplan,
         name='save_improvement_plan'),
    path('SaveLink/', views.SaveLink, name='SaveLink'),
    path('ChallengesAndConcerns/', views.ChallengesAndConcerns,
         name='ChallengesAndConcerns'),
    path('grade_rates/', views.grade_rates, name='grade_rates'),
    path('Logout/', views.Logout, name='Logout'),
    #     path('<path:route>/', views.index, name='ReactApp'),  # New catch-all route
    path('ReviwersFeeBack/', views.ReviwersFeeBack, name='ReviwersFeeBack'),
]
