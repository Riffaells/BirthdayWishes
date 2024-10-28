from rest_framework import viewsets

from app.videos.models import VideoModel
from .serializer import VideoSerializer


# Create your views here.

class VideoViewSet(viewsets.ModelViewSet):
    queryset = VideoModel.objects.all()
    serializer_class = VideoSerializer
