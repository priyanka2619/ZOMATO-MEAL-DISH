from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import SignupSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import User

# Create your views here.


class SignUpView(APIView):
    serializer_class = SignupSerializer
    queryset = User.objects.all()

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            user_data = {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "mobile": user.mobile,
                "password": user.password,
                "role": "",
            }

            response_data = {
                "data": user_data,
                "message": "User Created Successfully",
                "statusCode": status.HTTP_201_CREATED,
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

    def post(self, request):
        response = super().post(request)
        if response.status_code == status.HTTP_200_OK:
            user = User.objects.get(email=request.data.get("email"))
            user_data = {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "mobile": user.mobile,
                "password": user.password,
                "role": "",
            }
            data = {
                "refresh": response.data["refresh"],
                "access": response.data["access"],
                "user": user_data,
            }
            return Response({"data": data, "statusCode": status.HTTP_200_OK, "message": "Login Successfully"})

        return response
