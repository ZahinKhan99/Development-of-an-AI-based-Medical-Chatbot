import json
from os import path

from django.core.management import BaseCommand

from authentication.models import User
from core.models import Department, DiseaseDepartmentMapping
from ehr import settings
from ehr.settings import BASE_DIR

json_file = path.join(BASE_DIR, 'data/departments.json')


def add_admin():
    admin_email = settings.ADMIN_EMAIL
    admin_password = settings.ADMIN_PWD
    if not User.objects.filter(email=admin_email).exists():
        User(email=admin_email, password=admin_password, is_superuser=True, is_staff=True, is_active=True).save()


class Command(BaseCommand):
    def handle(self, *args, **options):
        pass
        # add_admin()
        # with open(json_file, 'r') as f:
        #     data = json.load(f)
        #     for department in data.keys():
        #         dept, _ = Department.objects.get_or_create(name=department)
        #         for disease in data.get(department):
        #             DiseaseDepartmentMapping.objects.get_or_create(disease_name=disease, department=dept)
        #     self.stdout.write(self.style.SUCCESS('Successfully loaded data from json file'))
