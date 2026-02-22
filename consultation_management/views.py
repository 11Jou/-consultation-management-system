from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.views import APIView
from .serializers import ConsultationSerializer
from utils.CustomResponse import CustomResponse
from utils.permission import *
from utils.pagination import GlobalPagination
from rest_framework.exceptions import ValidationError
from .models import Consultation
from rest_framework import status


class ConsultationListCreateAPIView(ListCreateAPIView):
    queryset = Consultation.objects.select_related('patient').all()
    serializer_class = ConsultationSerializer
    permission_classes = [IsAuthenticated, IsDoctorOrAdmin]
    pagination_class = GlobalPagination

    def list(self, request, *args, **kwargs):
        try:
            response = super().list(request, *args, **kwargs)
            return CustomResponse.success(
                data=response.data,
                message="Consultations fetched successfully"
            )
        except Exception as e:
            return CustomResponse.error(
                message="An unexpected error occurred",
                errors=str(e),
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def create(self, request, *args, **kwargs):
        try:
            response = super().create(request, *args, **kwargs)
            return CustomResponse.created(
                data=response.data,
                message="Consultation created successfully"
            )
        except ValidationError as e:
            first_field = next(iter(e.detail.keys()))
            first_error = e.detail[first_field][0]
            return CustomResponse.error(
                message="Consultation creation failed",
                errors=f"{first_field}: {first_error}"
            )
        except Exception as e:
            return CustomResponse.error(
                message="An unexpected error occurred",
                errors=str(e),
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class ConsultationDetailAPIView(RetrieveAPIView):
    queryset = Consultation.objects.select_related('patient').all()
    serializer_class = ConsultationSerializer
    permission_classes = [IsAuthenticated, IsDoctorOrAdmin]
    def get(self, request, *args, **kwargs):
        try:
            response = super().get(request, *args, **kwargs)
            return CustomResponse.success(
                data=response.data,
                message="Consultation fetched successfully"
            )
        except Exception as e:
            return CustomResponse.error(
                message="An unexpected error occurred",
                errors=str(e),
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class GenerateAISummaryAPIView(APIView):
    permission_classes = [IsAuthenticated, IsDoctorOrAdmin]
    def post(self, request, *args, **kwargs):
        try:
            consultation = Consultation.objects.get(id=kwargs['consultation_id'])
            consultation.generate_summary()
            return CustomResponse.success(
                data=consultation.ai_summary,
                message="AI summary generated successfully"
            )
        except Exception as e:
            return CustomResponse.error(
                message="An unexpected error occurred",
                errors=str(e),
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
            )