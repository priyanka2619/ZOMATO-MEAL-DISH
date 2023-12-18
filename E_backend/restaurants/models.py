from django.db import models
from account.models import User

from food_categories.models import FoodCategory

# Create your models here.


class Restaurant(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class MenuItem(models.Model):
    menu_item_name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    availability = models.BooleanField(default=True)
    image = models.ImageField(
        upload_to='menu_item_images/')
    restaurant = models.ForeignKey(
        Restaurant, related_name='restaurant', on_delete=models.CASCADE)
    category = models.ForeignKey(
        FoodCategory, related_name='category', on_delete=models.CASCADE)

    def __str__(self):
        return self.menu_item_name


class Cart(models.Model):
    cart_id = models.IntegerField(primary_key=True)
    user_id = models.ForeignKey(
        User, related_name='user', on_delete=models.CASCADE)
    item_id = models.ForeignKey(
        MenuItem, related_name='menu_items', on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return (self.cart_id)
