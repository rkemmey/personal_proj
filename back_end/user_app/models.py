from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core import validators as v


# Create your models here.
class User(AbstractUser):
    email = models.CharField(unique=True, blank=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email