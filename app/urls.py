from django.urls import path
from .views import *

urlpatterns = [
    path('save/', VideoApi.as_view()),
]
