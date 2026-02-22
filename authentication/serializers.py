from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework.exceptions import AuthenticationFailed




class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    """
    Serializer for the custom login view.
    """

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["email"] = user.email
        token["role"] = user.role
        return token

    def validate(self, attrs):
        try:
            data = super().validate(attrs)
            data["full_name"] = self.user.full_name
            data["role"] = self.user.role
            return data
        except AuthenticationFailed as e:
            raise AuthenticationFailed(e)



class CustomRefreshTokenSerializer(TokenRefreshSerializer):

    def validate(self, attrs):
        try:
            data = super().validate(attrs)
            return data
        except Exception as e:
            raise serializers.ValidationError(e)
