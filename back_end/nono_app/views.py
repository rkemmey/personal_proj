from django.shortcuts import render
# Create your views here.
from django.http import JsonResponse
from rest_framework.views import APIView, Response
#from .utils import generate_nonogram
import requests
from requests_oauthlib import OAuth1
from PIL import Image, UnidentifiedImageError
from io import BytesIO
import numpy as np
from puzzle_proj.settings import env
from .models import ImagePixels
from rest_framework.generics import ListAPIView
#from .serializers import ImagePixelsSerializer

class Noun_Project(APIView): # search for an icon to build a puzzle, save in psql db
    def get(self, request):
        auth = OAuth1(env.get("NOUN_API_KEY"), env.get("NOUN_SECRET_KEY"))
        endpoint = "https://api.thenounproject.com/v2/icon/1"
        response = requests.get(endpoint, auth=auth)
        responseJSON = response.json()
        #return Response(responseJSON)
        #return Response(responseJSON['icons'][0]['thumbnail_url'])
        image_url = responseJSON['icon']['thumbnail_url']
        try:
            image_response = requests.get(image_url, timeout=10)
            image_response.raise_for_status()
            img = Image.open(BytesIO(image_response.content)).convert("RGB")
            pixel_arr = np.array(img)
            obj, created = ImagePixels.objects.get_or_create(source_url=image_url, 
                                                             defaults={'pixels': pixel_arr})
            if not created:
                print("Already existed!")
            #ImagePixels.objects.create(source_url=image_url, pixels=pixel_arr)
            return Response(pixel_arr)
        except (requests.RequestException, UnidentifiedImageError) as e:
            print(f"Image fetch/convert failed: {e}")
            return Response('Nothing')
        #return Response(responseJSON['icon']['thumbnail_url'])

# class AllPixelsView(ListAPIView):
#     queryset = ImagePixels.objects.all()
#     serializer_class = ImagePixelsSerializer


# def nonogram_api(request):
#     """API endpoint to fetch a random Nonogram puzzle."""
#     puzzle = generate_nonogram(size=5)  # Generate a puzzle
#     return JsonResponse(puzzle)

        