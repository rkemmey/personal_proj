from django.urls import path
from .views import nonogram_api

urlpatterns = [
    path("", nonogram_api, name="nonogram_api"),
]
