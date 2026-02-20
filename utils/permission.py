from rest_framework.permissions import BasePermission

class IsAuthenticated(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "admin"


class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "doctor"

class IsDoctorOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.role == "doctor" or request.user.role == "admin")