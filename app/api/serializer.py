from rest_framework import serializers

from app.videos.models import VideoModel


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoModel
        fields = '__all__'
