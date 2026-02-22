# 🏥 Consultation Management System

Full-stack Consultation Management System built with:

* **Backend:** Django + Django REST Framework + Celery + Redis
* **Frontend:** React (Vite)
* **Containerization:** Docker & Docker Compose

---

# 🔧 Features

* JWT Authentication
* Role-Based Access Control
* Consultation creation & management
* Patient management
* AI-generated consultation summaries (OpenAI)
* Background task processing with Celery
* API Documentation with Swagger

---

# 🛠 Tech Stack

* Django
* Django REST Framework
* Redis
* Celery
* React (Vite)
* Docker & Docker Compose
* Nginx

---

# 📋 Setup Instructions

## 1 -  Clone the repository

```bash
git clone https://github.com/11Jou/-consultation-management-system.git
```

## 2 - Set Environment Variables
Create a `.env` file in the project root. You can copy from `.env.example`:

```bash
cp .env.example .env
```

Then update the following variables:

```dotenv
SECRET_KEY=your-secret-key
OPENAI_API_KEY=your-openai-api-key
GOOGLE_API_KEY=your-google-api-key

`MOCK` (boolean) – When set to `True`, the AI summary generation will return mock responses instead of calling the OpenAI API.  
For actual AI summaries, set `MOCK=False` and provide your OpenAI API key in the `OPENAI_API_KEY` environment variable.
```

## 3 -  Build and Start Containers

```bash
docker compose up --build -d
```

## 4 - Access The Application

* Frontend: [http://localhost:5174](http://localhost:5174)
* Django Admin: [http://localhost:8000/admin](http://localhost:8000/admin)
* Swagger Docs: [http://localhost:8000/swagger](http://localhost:8000/swagger)

---

# 🔑 Demo Credentials

⚠️ For development/testing purposes only.

### Doctor Account

Email: [doctor@gmail.com](mailto:doctor@gmail.com)
Password: real@1234

### Admin Account

Email: [admin@gmail.com](mailto:admin@gmail.com)
Password: 1234

> Both accounts currently have the same permissions (creating patients and consultations). They are separated to demonstrate role-based authorization for production-ready environments.


---

# 📌 Notes

* The included SQLite database file allows quick testing with pre-created accounts and sample data.
* Celery handles background AI tasks.
* Ensure `.env` variables are set correctly for all services before running.
