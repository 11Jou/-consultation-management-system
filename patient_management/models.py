from django.db import models
from datetime import date

class Patient(models.Model):
    full_name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    email = models.EmailField(unique=True)


    def calculate_age(self):
        today = date.today()
        age = today.year - self.date_of_birth.year
        return age



    def __str__(self):
        return self.full_name


