from rest_framework import serializers
from .models import Consultation
from patient_management.serializers import PatientSerializer


class ConsultationSerializer(serializers.ModelSerializer):
    patient = PatientSerializer()
    class Meta:
        model = Consultation
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']