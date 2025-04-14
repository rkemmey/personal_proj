from django.shortcuts import render
from rest_framework.views import APIView
from django.core.exceptions import ValidationError
from django.contrib.auth import authenticate, login, logout

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST

from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import User 

# class TokenReq(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]


# # Create your views here.
# class Sign_Up(APIView):
#     def post(self, request):
#         data = request.data
#         email = data.get("email")
#         password = data.get("password")

#         if not email or not password:
#             return Response({"error": "Email and password required"}, status=HTTP_400_BAD_REQUEST)

#         if User.objects.filter(email=email).exists():
#             return Response({"error": "User already exists"}, status=HTTP_400_BAD_REQUEST)

#         user = User.objects.create_user(username=email, email=email, password=password)
#         token = Token.objects.create(user=user)

#         return Response({"user": user.email, "token": token.key}, status=HTTP_201_CREATED)


# class Log_in(APIView):
#     def post(self, request):
#         email = request.data.get("email")
#         password = request.data.get("password")

#         if not email or not password:
#             return Response({"error": "Email and password required"}, status=HTTP_400_BAD_REQUEST)

#         user = authenticate(request, username=email, password=password)
#         if not user:
#             return Response({"error": "Invalid credentials"}, status=HTTP_400_BAD_REQUEST)

#         token, _ = Token.objects.get_or_create(user=user)
#         return Response({"user": user.email, "token": token.key}, status=HTTP_200_OK)

# class Log_out(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]
    
#     def post(self, request):
#         request.user.auth_token.delete()  
#         return Response(status=HTTP_204_NO_CONTENT)
    

# class Info(TokenReq):
#     def get(self, request):
#         return Response({"email" : request.user.email})
    
#     def put(self, request):
#         data = request.data.copy()
#         user = request.user

#         # {"password": 1234, "new_password" : 56789}
#         current_password = data.get('password')

#         if current_password and data.get('new_password'):
#             user = authenticate(username=user.username, password=current_password)
#             user.set_password(data.get('new_password'))
#             user.full_clean()
#             user.save()
#         return Response({"email" : user.email, "new_password": user.password}, status=HTTP_200_OK)

class Sign_up(APIView):
    def post(self, request):
        data = request.data.copy()
        data["username"] = request.data.get("username", request.data.get("email"))
        new_user = User(**data)
        try:
            # TODO: use create_user instead
            # new_user.full_clean()
            # new_user.save()
            new_user.set_password(data.get("password"))
            new_user.save()
            login(request, new_user)
            token = Token.objects.create(user=new_user)
            print(new_user)
            return Response(
                {"user": new_user.email, "token": token.key}, status=HTTP_201_CREATED
            )
        except ValidationError as e:
            print(e)
            return Response(e, status=HTTP_400_BAD_REQUEST)


class Log_in(APIView):
    def post(self, request):
        data = request.data.copy()
        data["username"] = request.data.get("username", request.data.get("email"))
        user = authenticate(
            username=data.get("username"), password=data.get("password")
        )
        print(user)
        if user:
            login(request, user)
            # if
            # return SELECT * token WHERE user = user
            # else
            # return INSERT token (user) VALUES (user)
            token, created = Token.objects.get_or_create(user=user)
            return Response(
                {
                    "user": {"email": user.email, "display_name": user.display_name},
                    "token": token.key,
                },
                status=HTTP_200_OK,
            )
        return Response("No user matching credentials", status=HTTP_400_BAD_REQUEST)


class TokenReq(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class Log_out(TokenReq):
    def post(self, request):
        request.user.auth_token.delete()
        logout(request)
        return Response(status=HTTP_204_NO_CONTENT)


class Info(TokenReq):
    def get(self, request):
        try:
            data = request.data.copy()
            ruser = request.user
            return Response(
                {
                    "display_name": ruser.display_name,
                    "email": ruser.email,
                }
            )
        except ValidationError as e:
            print(e)
            return Response(e, status=HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            data = request.data.copy()
            ruser = request.user
            # check for display_name
            ruser.display_name = data.get("display_name", ruser.display_name)
            # authenticate credential
            cur_pass = data.get("password")
            if cur_pass and data.get("new_password"):
                auth_user = authenticate(username=ruser.username, password=cur_pass)
                if auth_user == ruser:
                    ruser.set_password(data.get("new_password"))

            # if credentials match the user
            # update password and save it
            ruser.full_clean()
            ruser.save()
            return Response(
                {
                    "display_name": ruser.display_name,
                }
            )
        except ValidationError as e:
            print(e)
            return Response(e, status=HTTP_400_BAD_REQUEST)