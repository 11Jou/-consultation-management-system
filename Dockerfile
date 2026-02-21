from python:3.12-slim

WORKDIR /usr/src/app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["sh", "-c","python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]