from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
import requests 

# Create your views here.
class Sol_api(APIView):
    def get(self, request):
        #params = {"api-key":env.get("NYT_API_KEY")}
        endpoint = "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results,message}}"
        response = requests.get(endpoint) 
        responseJSON = response.json() 
        return Response(responseJSON)