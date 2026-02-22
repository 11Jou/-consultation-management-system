from celery import shared_task
from consultation_management.models import Consultation
from utils.factory import get_ai_summary_service

@shared_task(bind=True, max_retries=3)
def generate_summary_task(self, consultation_id):
    try:
        consultation = Consultation.objects.get(id=consultation_id)
        ai_summary_service = get_ai_summary_service()
        ai_summary = ai_summary_service.generate_ai_summary(consultation.symptoms, consultation.diagnosis)
        consultation.ai_summary = ai_summary
        consultation.save()
        return ai_summary
    except Exception as e:
        raise self.retry(exc=e, countdown=5)