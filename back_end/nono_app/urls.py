from django.urls import path
from .views import  Noun_Project

urlpatterns = [
    #path("", nonogram_api, name="nonogram_api"),
    path("", Noun_Project.as_view(), name="nonogram_api"),

]
