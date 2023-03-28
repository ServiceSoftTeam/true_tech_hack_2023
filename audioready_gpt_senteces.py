from analytics.cv.yolo import Yolo
from analytics.analytic_data_chatgpt import get_answer

def GetGPTSentences(video_project:str='Test 1', video_path:str='Test 1.mov', seconds:int = 5)-> list[dict]:
    
    '''


    '''
    
    
    _yolo = Yolo()
    words = _yolo.get_video_objects(video_path, seconds)
    sentences = []
    for i in words:
        temp = list(i.items())[0]
        sentences.append({
            'project-name': video_project,
            'timeline': seconds,
            f'{temp[0]}': get_answer(temp[1])
        })
    return sentences


if __name__ == "__main__":
    print("GetGPTSentences")