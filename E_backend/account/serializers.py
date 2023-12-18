from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["name", "mobile", "email", "password"]

    def create(self, validated_data):
        return User.objects.create_user(
            email=validated_data.get('email'),
            name=validated_data.get('name'),
            mobile=validated_data.get('mobile'),
            password=validated_data.get("password"))


class LoginSerializer(TokenObtainPairSerializer):
    class Meta:
        model = User
        fields = ("email", "password")
