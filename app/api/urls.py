from django.urls import include, path
from rest_framework.routers import DefaultRouter

from app.api.views import VideoViewSet

router = DefaultRouter()
router.register('videos', VideoViewSet)

urlpatterns = [
    path('', include(router.urls))
]
