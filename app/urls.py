from django.urls import path
from .views import *

urlpatterns = [
    path('save/', AudioSaveApi.as_view()),
path('getall/', AudioAllApi.as_view()),
path('get/', AudioApi.as_view())
]