from django.urls import path

from authentication.views import *

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('doctors/', DoctorView.as_view(), name='doctors'),
    path('patients/', PatientView.as_view(), name='patients'),
    path('doctors/<str:dr_id>/', DoctorView.as_view(), name='doctors'),
    path('patients/<str:pat_id>', PatientView.as_view(), name='patients'),
]
