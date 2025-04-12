from django.shortcuts import render
from rest_framework.views import APIView
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST

from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import User 

class TokenReq(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


# Create your views here.
class Sign_Up(APIView):
    def post(self, request):
        data = request.data
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return Response({"error": "Email and password required"}, status=HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({"error": "User already exists"}, status=HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=email, email=email, password=password)
        token = Token.objects.create(user=user)

        return Response({"user": user.email, "token": token.key}, status=HTTP_201_CREATED)


class Log_in(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"error": "Email and password required"}, status=HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=email, password=password)
        if not user:
            return Response({"error": "Invalid credentials"}, status=HTTP_400_BAD_REQUEST)

        token, _ = Token.objects.get_or_create(user=user)
        return Response({"user": user.email, "token": token.key}, status=HTTP_200_OK)

class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        request.user.auth_token.delete()  
        return Response(status=HTTP_204_NO_CONTENT)
    

class Info(TokenReq):
    def get(self, request):
        return Response({"email" : request.user.email})
    
    def put(self, request):
        data = request.data.copy()
        user = request.user

        # {"password": 1234, "new_password" : 56789}
        current_password = data.get('password')

        if current_password and data.get('new_password'):
            user = authenticate(username=user.username, password=current_password)
            user.set_password(data.get('new_password'))
            user.full_clean()
            user.save()
        return Response({"email" : user.email, "new_password": user.password}, status=HTTP_200_OK)