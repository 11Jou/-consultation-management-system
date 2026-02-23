from django.test import TestCase
from .models import Consultation
from patient_management.models import Patient
from rest_framework.test import APIClient
from django.urls import reverse
from authentication.models import User
from .task import generate_summary_task
from datetime import date
from unittest.mock import patch


class ConsultationModelTests(TestCase):
    """Test the Consultation model and Celery task"""

    def setUp(self):
        self.patient = Patient.objects.create(
            full_name="John Doe",
            date_of_birth=date(1990, 1, 1),
            email="john.doe@example.com"
        )

        self.consultation = Consultation.objects.create(
            patient=self.patient,
            symptoms="I have a headache and a sore throat",
            diagnosis="I have a cold"
        )

    def test_consultation_str(self):
        self.assertEqual(str(self.consultation), "John Doe")

    @patch("consultation_management.task.get_ai_summary_service")
    def test_generate_summary_task(self, mock_service):
        """
        Test Celery task without calling external AI service
        """
        mock_instance = mock_service.return_value
        mock_instance.generate_ai_summary.return_value = "Mock AI Summary"

        generate_summary_task(self.consultation.id)

        self.consultation.refresh_from_db()

        self.assertEqual(self.consultation.ai_summary, "Mock AI Summary")



class ConsultationAPIViewTests(TestCase):
    """Test the Consultation API views"""

    def setUp(self):
        self.client = APIClient()

        self.user = User.objects.create_user(
            full_name="John Doe",
            email="test@example.com",
            password="testpassword"
        )

        self.client.force_authenticate(user=self.user)

        self.patient = Patient.objects.create(
            full_name="John Doe",
            date_of_birth=date(1990, 1, 1),
            email="john.doe@example.com"
        )

        self.consultation = Consultation.objects.create(
            patient=self.patient,
            symptoms="I have a headache and a sore throat",
            diagnosis="I have a cold"
        )

    def test_list_consultations(self):
        response = self.client.get(reverse("consultation-list-create"))
        self.assertEqual(response.status_code, 200)

    def test_create_consultation(self):
        response = self.client.post(
            reverse("consultation-list-create"),
            {
                "patient": self.patient.id,
                "symptoms": "I have a headache",
                "diagnosis": "Migraine"
            }
        )

        self.assertEqual(response.status_code, 201)

    def test_get_consultation_detail(self):
        response = self.client.get(
            reverse("consultation-detail", args=[self.consultation.id])
        )

        self.assertEqual(response.status_code, 200)

    @patch("consultation_management.task.generate_summary_task.delay")
    def test_generate_ai_summary(self, mock_delay):
        """
        Test API endpoint that triggers AI summary generation
        We mock delay() so Celery is not required
        """

        response = self.client.post(
            reverse("generate-ai-summary", args=[self.consultation.id])
        )

        self.assertEqual(response.status_code, 200)

        mock_delay.assert_called_once_with(self.consultation.id)