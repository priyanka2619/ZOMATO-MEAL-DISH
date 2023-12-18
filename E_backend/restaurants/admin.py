from django.contrib import admin

from restaurants.models import MenuItem, Restaurant

# Register your models here.
admin.site.register(MenuItem)
admin.site.register(Restaurant)
