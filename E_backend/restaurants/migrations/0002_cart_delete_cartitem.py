# Generated by Django 4.2.7 on 2023-12-16 09:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('restaurants', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('cart_id', models.IntegerField(primary_key=True, serialize=False)),
                ('quantity', models.IntegerField(default=0)),
                ('created_at', models.DateField(auto_now_add=True)),
                ('item_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='menu_items', to='restaurants.menuitem')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='CartItem',
        ),
    ]