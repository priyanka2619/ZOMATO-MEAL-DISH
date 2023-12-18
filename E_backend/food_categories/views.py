from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from food_categories.models import FoodCategory
from food_categories.serializers import FoodCategorySerializer


class FoodCategoryListView(APIView):
    serializer_class = FoodCategorySerializer
    queryset = FoodCategory.objects.all()

    def get(self, request):
        categories = FoodCategory.objects.all()
        serializer = FoodCategorySerializer(categories, many=True)

        formatted_data = []
        for category in serializer.data:
            formatted_category = {
                'category_id': category['category_id'],
                'category_name': category['category_name'],
                'image': category['image'],
            }
            formatted_data.append(formatted_category)

        response_data = {'data': formatted_data,
                         'statusCode': status.HTTP_200_OK}
        return Response(response_data)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
