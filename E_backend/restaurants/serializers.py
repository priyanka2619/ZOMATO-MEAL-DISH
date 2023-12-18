from rest_framework import serializers
from .models import Cart, MenuItem


class MenuItemSerializer(serializers.ModelSerializer):

    restaurant_name = serializers.CharField(
        source='restaurant.name', read_only=True)
    category_name = serializers.CharField(
        source='category.category_name', read_only=True)

    class Meta:
        model = MenuItem
        fields = ['id', 'menu_item_name', 'description', 'price', 'availability',
                  'image', 'restaurant_id', 'restaurant_name', 'category_id', 'category_name']


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ["user_id", "item_id", "quantity"]


class CartItemSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer(source='id', read_only=True)

    class Meta:
        model = Cart
        fields = ['cart_id', 'menu_item', 'quantity', 'created_at']
