from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from restaurants.views import AddToCartView, CartItemView, RestaurantFoodItemView, RestaurantItemDetailView

urlpatterns = [
    path('getRestaurantServingItemsByCategoryId',
         RestaurantItemDetailView.as_view(), name='restaurant-item'),
    path('getFoodItemOfRestaurantByCategory',
         RestaurantFoodItemView.as_view(), name='restaurant-food-item'),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart'),
    path('getCartItemsByCustomerIdForRestaurant',
         CartItemView.as_view(), name='added-cart-items')
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
