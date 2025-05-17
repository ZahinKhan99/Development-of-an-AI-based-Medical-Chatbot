from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

import ai.predict_disease
from authentication.models import *
from core.models import Department, Appointment, MedicalRecord
from core.models import DiseaseDepartmentMapping, MedicalRecordFiles
from core.serializers import AppointmentSerializer, MedicalRecordSerializer
from core.serializers import DepartmentSerializer


class AppointmentView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            doctor = Doctor.objects.filter(id=request.data['doctor']).first()
            patient = Patient.objects.filter(id=request.data['patient']).first()
            dept = Department.objects.filter(id=request.data['department']).first()

            if doctor and patient:
                appointment = Appointment.objects.create(patient=patient, doctor=doctor,
                                                         dateTime=request.data['dateTime'],
                                                         status=False, department=dept)
                appointment.save()
                return Response({'data': AppointmentSerializer(appointment).data}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        appointments = Appointment.objects.all()
        serializer = AppointmentSerializer(appointments, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, app_id):
        appointment = Appointment.objects.filter(id=app_id).first()

        if not appointment:
            return Response({'error': 'Appointment not found'}, status=status.HTTP_404_NOT_FOUND)

        doctor = Doctor.objects.filter(id=request.data['doctor']).first()
        patient = Patient.objects.filter(id=request.data['patient']).first()
        dept = Department.objects.filter(id=request.data['department']).first()

        appointment.dateTime = request.data['dateTime']
        appointment.doctor = doctor
        appointment.patient = patient
        appointment.department = dept

        if doctor and dept and patient:
            appointment.save()
            return Response({'data': AppointmentSerializer(appointment).data}, status=status.HTTP_200_OK)
        return Response({'error': 'Error updating Appointment'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, app_id):
        appointment = Appointment.objects.filter(id=app_id).first()

        if not appointment:
            return Response({'error': 'Appointment not found'}, status=status.HTTP_404_NOT_FOUND)

        if appointment:
            appointment.delete()
            return Response({'data': 'Appointment Deleted'}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Appointment ID'}, status=status.HTTP_400_BAD_REQUEST)


class MedicalRecordView(APIView):
    def get(self, request, pat_id):
        if pat_id:
            medical_record = MedicalRecord.objects.filter(patient__id=pat_id)
            serializer = MedicalRecordSerializer(medical_record, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)
        medical_records = MedicalRecord.objects.all()
        serializer = MedicalRecordSerializer(medical_records, many=True)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        try:
            doctor = Doctor.objects.filter(id=request.data['doctor']).first()
            patient = Patient.objects.filter(id=request.data['patient']).first()
            appointment = Appointment.objects.filter(id=request.data['appointment']).first()

            if doctor and patient:
                medical_record = MedicalRecord.objects.create(patient=patient, doctor=doctor, appointment=appointment,
                                                              dateTime=timezone.now(),
                                                              medical_record=request.data['medical_record'])

                if 'files' in request.FILES:
                    for file in request.FILES.getlist('files'):
                        MedicalRecordFiles.objects.create(mr=medical_record, file=file)

                appointment.status = True
                appointment.save()
                return Response({'data': MedicalRecordSerializer(medical_record).data}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': 'Invalid Doctor/Patient ID'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_counts(request):
    doctors = Doctor.objects.all().count()
    patients = Patient.objects.all().count()
    return Response({'data': {'doctors': doctors, 'patients': patients}}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_doctor_appointments(request, id):
    appointments = Appointment.objects.filter(doctor__id=id, status=False).all()
    serializer = AppointmentSerializer(appointments, many=True)
    return Response({'data': serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_patient_appointments(request, id):
    appointments = Appointment.objects.filter(patient__id=id).all()
    serializer = AppointmentSerializer(appointments, many=True)
    return Response({'data': serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_symptoms(request):
    return Response({"symptoms": list(ai.predict_disease.symptoms_dict)}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_departments(request):
    departments = Department.objects.all()
    serializer = DepartmentSerializer(departments, many=True)
    return Response({"departments": serializer.data}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_disease_department(request, disease):
    try:
        dept = DiseaseDepartmentMapping.objects.filter(disease_name=disease).first()
        return Response({"department": dept.department.name}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": "The Disease is empty or There is no department for given disease"},
                        status=status.HTTP_400_BAD_REQUEST)
