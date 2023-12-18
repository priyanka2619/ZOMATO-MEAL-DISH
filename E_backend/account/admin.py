from django.contrib import admin
from .models import User
from django.contrib.auth.models import User as AuthUser

# Register your models here.
admin.site.register(User)
admin.site.register(AuthUser)
