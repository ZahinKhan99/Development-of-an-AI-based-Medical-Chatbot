from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from authentication.models import User
from authentication.serializer import *
from core.models import Department
from ehr import settings


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        if request.data['user_type'] == "Doctor":
            password = 'password'
        else:
            password = request.data['password']
        try:
            user = User.objects.create_user(email=request.data['email'], password=password,
                                            username=request.data['email'])
            user.save()
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        try:
            if user is not None:
                if request.data['user_type'] == 'Doctor':
                    try:
                        department = Department.objects.get(id=request.data['department'])
                        doctor = Doctor.objects.create(user_id=user, phone=request.data['phone'],
                                                       email=request.data['email'],
                                                       date_of_joining=request.data['date_of_joining'],
                                                       name=request.data['name'], image=None,
                                                       department=department)
                        doctor.save()
                        return Response({'data': DoctorSerializer(doctor).data}, status=status.HTTP_201_CREATED)
                    except Exception as e:
                        user.delete()
                        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                elif request.data['user_type'] == 'Patient':
                    try:
                        patient = Patient.objects.create(user_id=user, phone=request.data['phone'],
                                                         email=request.data['email'],
                                                         name=request.data['name'],
                                                         blood_group=request.data['blood_group'],
                                                         age=request.data['age'])
                        patient.save()
                    except Exception as e:
                        user.delete()
                        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                    return Response({'data': PatientSerializer(patient).data}, status=status.HTTP_201_CREATED)
                else:
                    return Response({'error': 'User type must be Doctor or Patient'},
                                    status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error': 'An error occurred while processing your request'},
                        status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        # implement login logic here
        email = request.data.get('email')
        password = request.data.get('password')
        user_type = request.data.get('user_type')
        if user_type == 'Admin':
            if email == settings.ADMIN_EMAIL:
                if password == settings.ADMIN_PWD:
                    return Response(
                        {'token': 'token.key', 'message': 'Admin Authenticated Successfully', 'status': 'success',
                         'data': 'Login Successfully'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid Admin Password'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Invalid Admin Email'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()

        if not user:
            return Response({'error': 'Invalid Email ID'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            if not user.check_password(password):
                return Response({'error': 'Invalid Password'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                # token, created = Token.objects.get_or_create(user=user)
                if user_type == 'Doctor':
                    doctor = Doctor.objects.filter(user_id=user).first()
                    if doctor:
                        return Response({'data': DoctorSerializer(doctor).data}, status=status.HTTP_201_CREATED)
                    else:
                        return Response({'error': 'Invalid Doctor ID'}, status=status.HTTP_400_BAD_REQUEST)
                elif user_type == 'Patient':
                    patient = Patient.objects.filter(user_id=user).first()
                    if patient:
                        return Response({'data': PatientSerializer(patient).data}, status=status.HTTP_201_CREATED)
                    else:
                        return Response({'error': 'Invalid Patient ID'}, status=status.HTTP_400_BAD_REQUEST)


class DoctorView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, dr_id=None):
        if dr_id:
            doctor = Doctor.objects.filter(id=dr_id).first()
            return Response({'data': DoctorSerializer(doctor).data}, status=status.HTTP_200_OK)
        else:
            doctors = Doctor.objects.all()
            serializer = DoctorSerializer(doctors, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, dr_id=None):
        if dr_id:
            doctor = Doctor.objects.filter(id=dr_id).first()
            serializer = DoctorSerializer(doctor, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'data': serializer.data}, status=status.HTTP_200_OK)
            else:
                return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Invalid Doctor ID'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, dr_id=None):
        if dr_id:
            doctor = Doctor.objects.filter(id=dr_id).first()
            if doctor:
                doctor.delete()
                return Response({'data': DoctorSerializer(doctor).data}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid Doctor ID'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Invalid Doctor ID'}, status=status.HTTP_400_BAD_REQUEST)


class PatientView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pat_id=None):
        if pat_id:
            patient = Patient.objects.filter(id=pat_id).first()
            if patient:
                return Response({'data': PatientSerializer(patient).data}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid Patient ID'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            patients = Patient.objects.all()
            serializer = PatientSerializer(patients, many=True)
            return Response({'data': serializer.data}, status=status.HTTP_200_OK)

    def put(self, request, pat_id=None):
        if pat_id:
            patient = Patient.objects.filter(id=pat_id).first()
            if patient:
                serializer = PatientSerializer(patient, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response({'data': serializer.data}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Invalid Patient ID'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Invalid Patient ID'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pat_id=None):
        if pat_id:
            patient = Patient.objects.filter(id=pat_id).first()
            if patient:
                patient.delete()
                return Response({'data': PatientSerializer(patient).data}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid Patient ID'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Invalid Patient ID'}, status=status.HTTP_400_BAD_REQUEST)
