from django.urls import path
from .views import PuzzleProgressViewSet

urlpatterns = [
    path('', PuzzleProgressViewSet.as_view(), name='progress'),
]