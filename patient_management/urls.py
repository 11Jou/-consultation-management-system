from django.urls import path
from .views import PatientListCreateAPIView, ListAllPatientsAPIView

urlpatterns = [
    path("", PatientListCreateAPIView.as_view(), name="patient-list-create"),
    path("all/", ListAllPatientsAPIView.as_view(), name="list-all-patients"),
]