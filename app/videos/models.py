# models.py
import os
import uuid
import subprocess
from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


def video_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    new_filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('videos/', new_filename)


class VideoModel(models.Model):
    id = models.CharField(
        primary_key=True, max_length=36,
        default=uuid.uuid4, editable=False, verbose_name=_('id')
    )
    title = models.CharField(max_length=200, verbose_name=_("video-title"))
    file = models.FileField(
        upload_to=video_upload_path, verbose_name=_("video-file")
    )
    author = models.CharField(max_length=100, verbose_name=_("author"))
    wish_message = models.TextField(
        blank=True, verbose_name=_("wish-message")
    )
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name=_('upload-date')
    )
    updated_at = models.DateTimeField(
        auto_now=True, verbose_name=_('update-date')
    )
    hls_playlist = models.CharField(
        max_length=255, blank=True, null=True, verbose_name=_('HLS Playlist')
    )

    def save(self, *args, **kwargs):

        if self.pk:
            old_instance = VideoModel.objects.get(pk=self.pk)
            is_new_file = old_instance.file != self.file
        else:
            is_new_file = True


        super().save(*args, **kwargs)

        if is_new_file:
            self.convert_to_hls()

    def convert_to_hls(self):
        input_file = self.file.path
        output_dir = os.path.join(
            settings.MEDIA_ROOT, 'hls', str(self.id)
        )
        os.makedirs(output_dir, exist_ok=True)
        output_file = os.path.join(output_dir, 'index.m3u8')

        cmd = [
            'ffmpeg',
            '-i', input_file,
            '-c:v', 'libx264',
            '-c:a', 'aac',
            '-ar', '48000',
            '-b:a', '128k',
            '-profile:v', 'baseline',
            '-level', '3.1',
            '-g', '60',  # Устанавливает интервал между ключевыми кадрами
            '-keyint_min', '60',  # Минимальный интервал между ключевыми кадрами
            '-sc_threshold', '0',  # Отключает обнаружение сцен
            '-hls_time', '2',  # Длительность сегмента в секундах
            '-hls_list_size', '0',
            '-hls_flags', 'independent_segments',
            '-hls_segment_filename', os.path.join(output_dir, 'segment_%03d.ts'),
            '-f', 'hls',
            output_file
        ]

        subprocess.run(cmd, check=True)

        self.hls_playlist = f'/media/hls/{self.id}/index.m3u8'
        super().save(update_fields=['hls_playlist'])

    def __str__(self):
        return f"{self.title} от {self.author}"

    class Meta:
        verbose_name = _("video")
        verbose_name_plural = _("videos")
