from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField()


    class Meta:
        model = Patient
        fields = "__all__"

    def get_age(self, obj):
        return obj.calculate_age()