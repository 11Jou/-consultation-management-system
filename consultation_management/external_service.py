from abc import ABC, abstractmethod 
import os
from decouple import config
from openai import OpenAI
import time


class GenerateAISummaryService(ABC):
    
    @abstractmethod
    def generate_ai_summary(self, symptoms: str, diagnosis: str) -> str:
        pass




class OpenAISummaryService(GenerateAISummaryService):

    def __init__(self, api_key: str, mock: bool = True):
        self.client = OpenAI(api_key=api_key)
        self.model = "gpt-4o-mini"
        self.mock = mock
        self.prompt = "Generate a summary of the following consultation symptoms and diagnosis: {symptoms}, {diagnosis}"

    def generate_ai_summary(self, symptoms: str, diagnosis: str) -> str:   
        if self.mock:
            time.sleep(5)
            return f"This is a new test summary of the consultation symptoms and diagnosis: {symptoms}, {diagnosis}"

        try:

            response = client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are a helpful assistant"},
                    {"role": "user", "content": self.prompt.format(symptoms=symptoms, diagnosis=diagnosis)},
                ],
                temperature=0.7,
            )
            return response.choices[0].message.content
        except Exception as e:
            raise e




class GoogleAISummaryService(GenerateAISummaryService):
    def __init__(self, api_key: str, mock: bool = True):
        self.client = GoogleAI(api_key=api_key)
        self.model = "gemini-2.5-flash"
        self.api_key = api_key
        self.mock = mock
        self.prompt = "Generate a summary of the following consultation symptoms and diagnosis: {symptoms}, {diagnosis}"

    def generate_ai_summary(self, symptoms: str, diagnosis: str) -> str:
        pass