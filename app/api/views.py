from rest_framework import viewsets
from rest_framework.exceptions import MethodNotAllowed

from app.videos.models import VideoModel
from .serializer import VideoSerializer


# Create your views here.

class VideoViewSet(viewsets.ModelViewSet):
    queryset = VideoModel.objects.all()
    serializer_class = VideoSerializer

    def create(self, request, *args, **kwargs):
        raise MethodNotAllowed("POST", detail="Adding new records is not allowed through this API.")

