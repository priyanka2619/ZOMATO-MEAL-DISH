
from django.urls import path
from .views import FoodCategoryListView


urlpatterns = [
    path('getAllFoodCategory/', FoodCategoryListView.as_view(),
         name='food_category_list'),
    # path('categories/<int:pk>/', FoodCategoryDetailView.as_view(),
    #      name='category-detail'),
]
