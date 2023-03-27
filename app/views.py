from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import *
import requests

FRONT_IP = 'http://82.148.16.205:8001'
class VideoApi(APIView):
    def post(self,request):
        project_name = request.data['project_name']
        video = request.FILE['video']
        audio_new = Video.objects.create(
            project_name=project_name,
            video=video,
        )
        return Response({'': ''})
    async def f(self,request):
        data = {}
        requests.post(f"""{FRONT_IP}/""", json=data)

# Create your views here.
# class AudioSaveApi(APIView):
#     def post(self,request):
#         project_name = request.data['project_name']
#         timeline = request.data['timeline']
#         print(request.data)
#         record = {}
#         for i in request.data.keys():
#             if i != 'project_name' and i != 'timeline':
#                 record[i] = request.data[i]
#         audio_new = AudioFile.objects.create(
#             project_name=project_name,
#             timeline=timeline,
#             record=record
#         )
#         return Response({'': ''})
#
# class AudioAllApi(APIView):
#     def get(self,request):
#         lst = list(AudioFile.objects.all().values())
#         return Response(lst)
#
#
# class AudioApi(APIView):
#     def post(self,request):
#         project_name = request.data['project_name']
#         lst = list(AudioFile.objects.all().values())
#         for i in lst:
#             if i['project_name'] == project_name:
#                 return Response(i)
#         return Response(lst)
#
