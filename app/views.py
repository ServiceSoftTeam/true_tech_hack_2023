from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from srvssft.srvssft.settings import BASE_DIR
from .models import *
import requests
from analytics.audioready_gpt_senteces import GetGPTSentences
from analytic.audio_analytics import CreateAudio
class VideoApi(APIView):
    def post(self,request):
        project_name = request.data['project_name']
        video = request.FILE['video']
        audio_new = Video.objects.create(
            project_name=project_name,
            video=video,
        )
        kek = GetGPTSentences()
        audio = CreateAudio(kek)

        return Response({'video': f'{BASE_DIR}/video', 'audio':audio})

