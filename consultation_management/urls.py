from django.urls import path
from .views import ConsultationListCreateAPIView, GenerateAISummaryAPIView, ConsultationDetailAPIView

urlpatterns = [
    path('', ConsultationListCreateAPIView.as_view(), name='consultation-list-create'),
    path('<int:pk>/', ConsultationDetailAPIView.as_view(), name='consultation-detail'),
    path('<int:consultation_id>/generate-summary/', GenerateAISummaryAPIView.as_view(), name='generate-ai-summary'),
]