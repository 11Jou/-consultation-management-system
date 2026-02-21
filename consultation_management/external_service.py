from abc import ABC, abstractmethod 
import os
from decouple import config
from openai import OpenAI
import time


class GenerateAISummaryService(ABC):
    mock = config("MOCK", default=False, cast=bool)

    
    @abstractmethod
    def generate_ai_summary(self, symptoms: str, diagnosis: str) -> str:
        pass




class OpenAISummaryService(GenerateAISummaryService):
    model = "gpt-4o-mini"
    api_key = config("OPENAI_API_KEY")
    prompt = "Generate a summary of the following consultation symptoms and diagnosis: {symptoms}, {diagnosis}"


    def generate_ai_summary(self, symptoms: str, diagnosis: str) -> str:
        client = OpenAI(api_key=self.api_key)
        if self.mock:
            time.sleep(5)
            return "This is a test summary of the consultation symptoms and diagnosis: {symptoms}, {diagnosis}"

        response = client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are a helpful assistant"},
                {"role": "user", "content": self.prompt.format(symptoms=symptoms, diagnosis=diagnosis)},
            ],
            temperature=0.7,
        )
        return response.choices[0].message.content




class GoogleAISummaryService(GenerateAISummaryService):
    model = "gemini-2.5-flash"
    api_key = config("GOOGLE_API_KEY")
    prompt = "Generate a summary of the following consultation symptoms and diagnosis: {symptoms}, {diagnosis}"

    def generate_ai_summary(self, symptoms: str, diagnosis: str) -> str:
        pass