from django.contrib import admin
from django.contrib.admin import register
from unfold.admin import ModelAdmin

from .models import VideoModel
from django.utils.translation import gettext_lazy as _


# Register your models here.

@register(VideoModel)
class EventsAdmin(ModelAdmin):
    list_display = ('title', 'author', 'created_at', 'updated_at')
    search_fields = ('title', 'author')
    list_filter = ('created_at', 'updated_at')
    ordering = ('-created_at',)


    fieldsets = (
        (None, {
            'fields': (
                'title',
                'author',
                'wish_message',
                'file',
            ),
            'description': _("detailed-information-about-the-video"),
        }),
        (_("dates"), {

            'fields': (
                'created_at',
                'updated_at'
            ),
        }),
    )

    readonly_fields = ('id', 'created_at', 'updated_at')
    verbose_name = _("video")
    verbose_name_plural = _("videos")





