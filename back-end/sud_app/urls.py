from django.urls import path
from .views import Sol_api

urlpatterns = [
    path('', Sol_api.as_view(), name="sol_api"),
]