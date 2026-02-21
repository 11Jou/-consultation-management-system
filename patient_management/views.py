from rest_framework.generics import ListCreateAPIView
from .models import Patient
from .serializers import PatientSerializer
from utils.CustomResponse import CustomResponse
from utils.permission import *
from rest_framework.exceptions import ValidationError
from utils.pagination import GlobalPagination


class PatientListCreateAPIView(ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = [IsAuthenticated, IsDoctorOrAdmin]
    pagination_class = GlobalPagination

    def list(self, request, *args, **kwargs):
        try:
            response = super().list(request, *args, **kwargs)
            return CustomResponse.success(
                "Patients fetched successfully",
                response.data
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
                message="Patient created successfully"
            )
        except ValidationError as e:
            first_field = next(iter(e.detail.keys()))
            first_error = e.detail[first_field][0]
            return CustomResponse.error(
                message="Patient creation failed",
                errors=f"{first_field}: {first_error}"
            )
        except Exception as e:
            return CustomResponse.error(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                message="An unexpected error occurred",
                errors=str(e)
            )