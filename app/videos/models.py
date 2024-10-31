import os
import uuid
from datetime import datetime

from django.db import models
from django.utils.translation import gettext_lazy as _


def video_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    # Задаем новое имя файла
    new_filename = f"{uuid.uuid4()}.{ext}"
    # Определяем путь к файлу
    return os.path.join('videos/', new_filename)


class VideoModel(models.Model):
    id = models.CharField(primary_key=True, max_length=36, default=uuid.uuid4, editable=False,
                          verbose_name=_('id'))
    title = models.CharField(max_length=200, verbose_name=_("video-title"))
    file = models.FileField(upload_to=video_upload_path, verbose_name=_("video-file"))
    author = models.CharField(max_length=100, verbose_name=_("author"))
    wish_message = models.TextField(blank=True, verbose_name=_("wish-message"))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('upload-date'))
    updated_at = models.DateTimeField(auto_now=True, verbose_name=_('update-date'))

    def __str__(self):
        return f"{self.title} от {self.author}"


