import os
import uuid
from datetime import datetime

from django.db import models


def video_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    # Задаем новое имя файла
    new_filename = f"{uuid.uuid4()}.{ext}"
    # Определяем путь к файлу
    return os.path.join('videos/', new_filename)


class VideoModel(models.Model):
    id = models.CharField(primary_key=True, max_length=36, default=uuid.uuid4, editable=False,
                          verbose_name='ID')
    title = models.CharField(max_length=200, verbose_name='Название видео')
    file = models.FileField(upload_to=video_upload_path, verbose_name='Файл видео')
    author = models.CharField(max_length=100, verbose_name='Автор')
    description = models.TextField(blank=True, verbose_name='Описание видео')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата загрузки')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')

    def __str__(self):
        return f"{self.title} от {self.author}"
