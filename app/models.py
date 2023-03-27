from django.db import models


class AudioFile(models.Model):
  project_name = models.CharField(max_length=500)
  timeline = models.CharField(max_length=100)
  record = models.CharField(max_length=1000)


