from django.shortcuts import render

from app.videos.models import VideoModel


# Create your views here.

def index(request, exception=None):

    videos = VideoModel.objects.all().order_by('updated_at')

    return render(request, 'core.html', {"videos": videos})
