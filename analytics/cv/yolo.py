import torch
import json
from typing import Union
import numpy as np
import cv2 as cv


class Yolo(object):

    def __init__(self):
        self.model = torch.hub.load('ultralytics/yolov5', 'yolov5s', pretrained=True)

    def get_frame_objects(self, frame: Union[str, np.ndarray]) -> list:
        '''
        Принимает кадр и выдет имена объектов на нем
        Возвращает список объектов
        
        '''

        results = self.model([frame])
        #results.show()
        records = json.loads(results.pandas().xyxy[0].to_json(orient="records"))
        return [i['name'] for i in records if i['confidence'] >= .4]
    
    def get_video_objects(self, video_path:str=None, seconds:int = 5) -> list[list]:
        
        '''
        Принимает путь к видео и находит объекты на кадре каждые seconds секунд
        Если видео найдено возвращает матрицу объектов, если нет None 
        
        '''

        cap = cv.VideoCapture(video_path)
        (major_ver, minor_ver, subminor_ver) = (cv.__version__).split('.')
        if int(major_ver)  < 3 :
            fps = cap.get(cv.cv.CV_CAP_PROP_FPS)
        else :
            fps = cap.get(cv.CAP_PROP_FPS)

        #out = cv.VideoWriter('output.mp4',cv.VideoWriter_fourcc('M','J','P','G'), fps, (frame_width,frame_height))
        if cap.isOpened() == False:
            return None

        frame_counter = 0
        objects = []

        while cap.isOpened():
            ret, frame = cap.read()
            if ret:
                frame_counter += 1
                if frame_counter % (2 * int(fps)) == 0:
                    result = self.get_frame_objects(frame)
                    objects.append(result)
                if cv.waitKey(1) & 0xFF == ord('q'):
                    break

            else:
                break


        cap.release()
        #out.release()
        cv.destroyAllWindows()
        return objects

if __name__ == '__main__':
    print("Класс для детекции объектов на кадрах")
