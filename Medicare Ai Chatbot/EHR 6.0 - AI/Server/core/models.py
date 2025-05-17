import os
import uuid

from django.db import models
from django.utils import timezone


class Department(models.Model):
    name = models.CharField(max_length=100, unique=True, null=False)

    def __str__(self):
        return self.name


class DiseaseDepartmentMapping(models.Model):
    disease_name = models.CharField(max_length=100, unique=True, null=False)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.disease_name}-{self.department.name}'


class Appointment(models.Model):
    dateTime = models.DateTimeField()
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    doctor = models.ForeignKey('authentication.Doctor', on_delete=models.CASCADE)
    patient = models.ForeignKey('authentication.Patient', on_delete=models.CASCADE)
    status = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.id}"


class MedicalRecord(models.Model):
    dateTime = models.DateTimeField()
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    patient = models.ForeignKey('authentication.Patient', on_delete=models.CASCADE)
    doctor = models.ForeignKey('authentication.Doctor', on_delete=models.CASCADE)
    medical_record = models.JSONField(blank=False, null=False)


class MedicalRecordFiles(models.Model):
    file_id = models.UUIDField(default=uuid.uuid4, editable=False)
    mr = models.ForeignKey(MedicalRecord, on_delete=models.CASCADE, db_index=True)
    file = models.FileField(upload_to="medical_records/", blank=True, null=True)
    filename = models.CharField(max_length=255)

    def save(self, *args, **kwargs):
        original_filename = self.file.name
        extension = os.path.splitext(original_filename)[1]
        timestamp = timezone.now().strftime("%Y%m%d%H%M%S")
        new_filename = f"{timestamp}_{uuid.uuid4().hex}{extension}"
        self.file.name = new_filename
        self.filename = os.path.splitext(original_filename)[0]
        super(MedicalRecordFiles, self).save(*args, **kwargs)
