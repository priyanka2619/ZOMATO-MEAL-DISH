from django.db import models

# Create your models here.


class FoodCategory(models.Model):
    category_id = models.IntegerField(primary_key=True)
    category_name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='food_category/')

    def __str__(self):
        return self.category_name
