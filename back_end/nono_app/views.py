from django.shortcuts import render
# Create your views here.
from django.http import JsonResponse
from rest_framework.views import APIView, Response
from .utils import generate_nonogram
import requests
from requests_oauthlib import OAuth1
from puzzle_proj.settings import env

class Noun_Project(APIView):
    def get(self, request):
        auth = OAuth1(env.get("NOUN_API_KEY"), env.get("NOUN_SECRET_KEY"))
        endpoint = "https://api.thenounproject.com/v2/icon/1"
        response = requests.get(endpoint, auth=auth)
        #print(response.content)
        responseJSON = response.json()
        #return Response(responseJSON)
        #return Response(responseJSON['icons'][0]['thumbnail_url'])
        return Response(responseJSON['icon']['thumbnail_url'])


# def nonogram_api(request):
#     """API endpoint to fetch a random Nonogram puzzle."""
#     puzzle = generate_nonogram(size=5)  # Generate a puzzle
#     return JsonResponse(puzzle)
