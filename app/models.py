from django.db import models


class Video(models.Model):
  project_name = models.CharField(max_length=500)
  video = models.FileField(upload_to='video/')




