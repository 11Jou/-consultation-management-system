from consultation_management.external_service import OpenAISummaryService, GoogleAISummaryService
from decouple import config



def get_ai_summary_service():
    service_name = config("AI_SUMMARY_SERVICE")
    if service_name == "openai":
        return OpenAISummaryService(api_key=config("OPENAI_API_KEY"), mock=config("MOCK", default=False, cast=bool))
    elif service_name == "google":
        return GoogleAISummaryService(api_key=config("GOOGLE_API_KEY"), mock=config("MOCK", default=False, cast=bool))
    raise ValueError(f"Invalid service name: {service_name}")