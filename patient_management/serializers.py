from rest_framework import serializers
from .models import Patient
from datetime import date

class PatientSerializer(serializers.ModelSerializer):
    age = serializers.SerializerMethodField()


    class Meta:
        model = Patient
        fields = "__all__"

    def get_age(self, obj):
        return obj.calculate_age()


    def validate_date_of_birth(self, value):
        if value > date.today():
            raise serializers.ValidationError("Date of birth cannot be in the future")
        return value