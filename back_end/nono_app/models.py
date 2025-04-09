from django.db import models
# Create your models here.
from django.contrib.postgres.fields import ArrayField, JSONField  # depends on Django version

# psql table to store image pixels 
class ImagePixels(models.Model):
    source_url = models.URLField() 
    pixels = models.JSONField() 
    created_at = models.DateTimeField(auto_now_add=True)