from django.test import TestCase
from .models import Patient
from datetime import date
from rest_framework.test import APIClient
from django.urls import reverse
from authentication.models import User


class PatientModelTests(TestCase):
    """Test the Patient model"""


    def setUp(self):
        patient = Patient.objects.create(
            full_name="John Doe",
            date_of_birth=date(1990, 1, 1),
            email="john.doe@example.com"
        )

    def test_calculate_age(self):
        patient = Patient.objects.get(email="john.doe@example.com")
        self.assertEqual(patient.calculate_age(), 36)



class PatientAPIViewTests(TestCase):
    """Test the Patient API views"""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            full_name="John Doe",
            email="test@example.com",
            password="testpassword"
        )
        self.client.force_authenticate(user=self.user)

    def test_list_patients(self):
        response = self.client.get(reverse("patient-list-create"))
        self.assertEqual(response.status_code, 200)
        

    def test_create_patient(self):
        response = self.client.post(reverse("patient-list-create"), {
            "full_name": "John Doe",
            "date_of_birth": date(1990, 1, 1),
            "email": "john.doe@example.com"
        })
        self.assertEqual(response.status_code, 201)
        