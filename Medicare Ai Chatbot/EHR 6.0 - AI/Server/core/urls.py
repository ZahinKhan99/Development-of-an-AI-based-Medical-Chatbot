from django.urls import path

from .views import *

urlpatterns = [
    path('departments/', get_departments, name='get_departments'),
    path('symptoms/', get_symptoms, name='get_symptoms'),
    path('get_department_for_disease/<str:disease>', get_disease_department, name="get_disease_department"),
    path('appointment/', AppointmentView.as_view(), name='appointment'),
    path('appointment/<int:app_id>/', AppointmentView.as_view(), name='appointment'),
    path('appointment/doctor/<str:id>/', get_doctor_appointments, name='get_doctor_appointments'),
    path('appointment/patient/<str:id>/', get_patient_appointments, name='get_patient_appointments'),
    path('medical_records/', MedicalRecordView.as_view(), name='medical_record'),
    path('medical_records/<str:pat_id>/', MedicalRecordView.as_view(), name='medical_record'),
    path('get_counts/', get_all_counts, name='get_all_counts'),
]
