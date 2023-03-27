from django.db import models


class Video(models.Model):
  project_name = models.CharField(max_length=500)
  video = models.CharField(max_length=1000)


