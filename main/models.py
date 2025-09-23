import uuid
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

# Create your models here.
class Product(models.Model):
    CATEGORY_CHOICES = [
        ('ball', 'Ball'),
        ('shoes', 'Shoes'),
        ('jersey', 'Jersey & Apparel'),
        ('accessories', 'Accessories'),
        ('bag', 'Bags'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    price = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    stock = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    description = models.TextField()
    thumbnail = models.URLField(blank=True, null=True)
    category = models.CharField(choices=CATEGORY_CHOICES, default='ball')
    is_featured = models.BooleanField(default=False)

    def __str__(self):
        return self.name