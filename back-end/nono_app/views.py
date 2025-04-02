from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .utils import generate_nonogram

def nonogram_api(request):
    """API endpoint to fetch a random Nonogram puzzle."""
    puzzle = generate_nonogram(size=5)  # Generate a puzzle
    return JsonResponse(puzzle)
