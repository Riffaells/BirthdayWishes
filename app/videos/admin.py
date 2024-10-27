from django.contrib import admin
from django.contrib.admin import register
from unfold.admin import ModelAdmin

from .models import VideoModel


# Register your models here.

@register(VideoModel)
class EventsAdmin(ModelAdmin):
    pass
