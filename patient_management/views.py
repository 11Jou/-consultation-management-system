from rest_framework.generics import ListCreateAPIView
from .models import Patient
from .serializers import PatientSerializer
from utils.CustomResponse import CustomResponse
from utils.permission import *


class PatientListCreateAPIView(ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated, IsDoctorOrAdmin]

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return CustomResponse.success(
            "Patients fetched successfully",
            response.data
        )

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        return CustomResponse.success(
            "Patient created successfully",
            response.data
        )