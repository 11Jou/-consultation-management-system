from django.urls import path
from .views import CustomLoginView, CustomRefreshTokenView

urlpatterns = [
    path("login/", CustomLoginView.as_view(), name="login"),
    path("refresh/", CustomRefreshTokenView.as_view(), name="refresh"),
]