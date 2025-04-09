from django.urls import path
from .views import  Noun_Project, AllPixelsView, OnePixelsView

urlpatterns = [
    #path("", nonogram_api, name="nonogram_api"),
    path('', Noun_Project.as_view(), name='nonogram_api'),  # POST- store 1 images pixels
    path('allpixels/', AllPixelsView.as_view(), name='all-pixels'), # GET - all pixels
    path('pixels/<int:id>/', OnePixelsView.as_view(), name='a_pixel') # GET pixels for one image
]
