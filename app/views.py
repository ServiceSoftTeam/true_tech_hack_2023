from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import AudioFile


# Create your views here.
class AudioSaveApi(APIView):
    def post(self,request):
        project_name = request.data['project_name']
        timeline = request.data['timeline']
        print(request.data)
        record = {}
        for i in request.data.keys():
            if i != 'project_name' and i != 'timeline':
                record[i] = request.data[i]
        audio_new = AudioFile.objects.create(
            project_name=project_name,
            timeline=timeline,
            record=record
        )
        return Response({'': ''})

class AudioAllApi(APIView):
    def get(self,request):
        lst = list(AudioFile.objects.all().values())
        return Response(lst)


class AudioApi(APIView):
    def post(self,request):
        project_name = request.data['project_name']
        lst = list(AudioFile.objects.all().values())
        for i in lst:
            if i['project_name'] == project_name:
                return Response(i)
        return Response(lst)

