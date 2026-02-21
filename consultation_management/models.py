from django.db import models
from patient_management.models import Patient
from utils.factory import get_ai_summary_service

class Consultation(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    symptoms = models.TextField()
    diagnosis = models.TextField(null=True, blank=True)
    ai_summary = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return f"{self.patient.full_name}"


    def generate_summary(self):
        ai_summary_service = get_ai_summary_service()
        self.ai_summary = ai_summary_service.generate_ai_summary(self.symptoms, self.diagnosis)
        self.save()
        return self.ai_summary