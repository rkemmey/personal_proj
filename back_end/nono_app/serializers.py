from rest_framework import serializers
from .models import ImagePixels

class ImagePixelsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagePixels
        fields = ['id', 'source_url', 'pixels', 'created_at']