from rest_framework import serializers

from authentication.serializer import PatientSerializer, DoctorSerializer
from core.models import Department, Appointment, MedicalRecord, MedicalRecordFiles


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)
    department = DepartmentSerializer(read_only=True)

    class Meta:
        model = Appointment
        fields = '__all__'


class MedicalRecordFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalRecordFiles
        fields = ['file_id', 'filename', 'file']


class MedicalRecordSerializer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)
    doctor = DoctorSerializer(read_only=True)
    appointment = AppointmentSerializer(read_only=True)
    files = MedicalRecordFilesSerializer(many=True, read_only=True,
                                         source='medicalrecordfiles_set')

    class Meta:
        model = MedicalRecord
        fields = '__all__'
