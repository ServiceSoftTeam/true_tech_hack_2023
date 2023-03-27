import pydub
from pydub import AudioSegment
import pathlib
import requests
import json


def GET_SPEECH(text='Похоже, на сервисе произошла ошибка'):
    url = "https://aimyvoice.com/api/v1/synthesize"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
        "api-key": "WEy0PziHNpELsfSKcYtD1BvGGARKdbVvpdH0xkhYHlT1+S3xh0/oZTxm0T0YaCRrZEI8VHoumDVKN+ffVrWB7Q=="
    }
    payload = {
        "text": text,
    }

    response = requests.post(url, headers=headers, data=payload)

    if response.status_code == 200:
        with open("response.wav", "wb") as result:
            result.write(response.content)
            result.close()
    else:
        print(response.status_code)
        print(response.text)
        print('----ERORR----')


def CreateAudio(data=dict()):
    audio = AudioSegment.from_mp3("template.wav")
    audio = audio - 90
    time_line = int(data['timeline']) * 1000
    for key, value in data.items():
        if key == 'timeline' or key == 'project-name':
            pass
        else:
            codes = key.split(':')
            start = codes[0]
            end = codes[1]
            GET_SPEECH(value)
            speech = AudioSegment.from_mp3('response.wav')
            temp = audio
            url = audio + speech
            audio = temp
            if len(audio) / 1000.0 < int(end):
                audio = audio + AudioSegment.silent(duration=(int(end) - len(audio) / 1000.0) * 1000)
    audio.export(data['project-name'], format="wav")
    return pathlib.Path(data['project-name']).absolute()


def SendRequerst():

    # FIXME: сегмент удалить нужен был как тестовые данные
    data = {
        'project-name': 'test.wav',
        'timeline': '10',
        '0:4': 'Похоже, на сервисе произошла ошибка!'
    }
    ##########
    audio = CreateAudio(data)  # FIXME: сюда вместо data свой словарь
    ##### FIXME: сюда добовлять свои фнкции

    #####
    url = "http://localhost:5000/echo"  # FIXME: сюды свой адрес

    headers = {
        "Content-Type": "application/json",
    }
    payload = {
        "audio": str(audio)
        # "video": str(video)
    }
    return requests.post(url, headers=headers, json=payload)


if __name__ == '__main__':
    SendRequerst()
