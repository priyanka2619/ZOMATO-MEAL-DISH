from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from account.models import User
from .models import Cart, MenuItem, Restaurant
from .serializers import CartItemSerializer, CartSerializer, MenuItemSerializer


class RestaurantItemDetailView(APIView):
    def get(self, request):
        category_id = request.GET.get("categoryId")

        if category_id:
            # Filter based on the related model's field (category)
            queryset = MenuItem.objects.filter(category=category_id)

            menu_item_serializer = MenuItemSerializer(queryset, many=True)

            response_data = {
                'data': menu_item_serializer.data,
                'statusCode': status.HTTP_200_OK
            }
            return Response(response_data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={'detail': 'Missing categoryId parameter'})


class RestaurantFoodItemView(APIView):
    def get(self, request):
        restaurant_id = request.GET.get("restaurantId")
        category_id = request.GET.get("categoryId")
        if not restaurant_id or not category_id:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'detail': 'Missing restaurantId or categoryId parameter'}
            )

        try:
            # Filter based on both restaurant and category using double underscores
            queryset = MenuItem.objects.filter(
                restaurant=restaurant_id, category=category_id
            )

            menu_item_serializer = MenuItemSerializer(queryset, many=True)

            response_data = {
                'data': menu_item_serializer.data,
                'statusCode': status.HTTP_200_OK
            }
            return Response(response_data)
        except MenuItem.DoesNotExist:
            return Response(
                status=status.HTTP_404_NOT_FOUND,
                data={
                    'detail': 'No matching items found for the given restaurantId and categoryId'}
            )


class AddToCartView(APIView):
    def post(self, request):
        # Extract parameters from the request data
        user_id = request.data.get("userId")
        item_id = request.data.get("itemId")
        quantity = request.data.get("quantity")

        # Retrieve User and MenuItem instances
        user_instance = User.objects.get(pk=user_id)
        item_instance = MenuItem.objects.get(pk=item_id)

        # Create or update the cart item
        cart_item, created = Cart.objects.update_or_create(
            user_id=user_instance, item_id=item_instance, defaults={
                "quantity": quantity}
        )

        # Serialize the cart item data
        cart_item_serializer = CartSerializer(cart_item)

        # Prepare the response data
        response_data = {
            "data": cart_item_serializer.data,
            "message": "Item Added to cart",
            "statusCode": status.HTTP_200_OK,
        }

        return Response(response_data)


class CartItemView(APIView):
    serializer_class = CartItemSerializer

    def get(self, request):
        restaurant_id = request.GET.get("restaurantId")
        user_id = request.GET.get("customerId")

        if not restaurant_id or not user_id:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'detail': 'Missing restaurantId or customerId parameter'}
            )

        try:
            # Filter based on both restaurant and category using double underscores
            queryset = Cart.objects.filter(
                item_id=restaurant_id, user_id=user_id
            )

            cart_item_serializer = CartItemSerializer(queryset, many=True)

            response_data = {
                'data': cart_item_serializer.data,
                'statusCode': status.HTTP_200_OK
            }
            return Response(response_data)
        except Cart.DoesNotExist:
            return Response(
                status=status.HTTP_404_NOT_FOUND,
                data={
                    'detail': 'No matching items found for the given restaurantId and customerId'}
            )
