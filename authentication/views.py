from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import CustomTokenObtainPairSerializer, CustomRefreshTokenSerializer
from utils.CustomResponse import *
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed


class CustomLoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except AuthenticationFailed as e:
            return CustomResponse.error(message="Invalid credentials", errors = "Login Failed")

        return CustomResponse.success(message="Login successful", data=serializer.validated_data)


class CustomRefreshTokenView(TokenRefreshView):
    serializer_class = CustomRefreshTokenSerializer




