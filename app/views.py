from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from srvssft.settings import BASE_DIR
from .models import *
from django.core.files.base import ContentFile
import requests
from analytics.audioready_gpt_senteces import GetGPTSentences
from analytics.audio_analytics import CreateAudio

class VideoApi(APIView):
    def post(self,request):
        project_name = request.data['project_name']
        video = request.FILE.get('video')
        video_content = ContentFile(video.read())
        audio_new = Video.objects.create(
            project_name=project_name,
            video=video_content,
        )
        kek = GetGPTSentences(f'{video_content.name}.wav', f'{BASE_DIR}/video/{video_content.name}',5)
        audio = CreateAudio(kek)
        audio_path = f"""{BASE_DIR}/media/{audio.name}"""
        with open(audio_path, 'wb+') as destination:
            for chunk in audio.chunks():
                destination.write(chunk)

        return Response({'video': f'{BASE_DIR}/video/{video.name}', 'audio':audio_path})
