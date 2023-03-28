from cv.yolo import Yolo
from analytic_data_chatgpt import get_answer

def GetGPTSentences(video_project:str='Test 1', video_path:str='Test 1.mov', seconds:int = 5)-> list[dict]:
    
    '''
    video_project - project name
    video_path - путь к видео
    seconds - timeline
    '''
    
    
    _yolo = Yolo()
    words = _yolo.get_video_objects(video_path, seconds)
    sentences = {
        'project-name': video_project,
        'timeline': seconds,
    }
    if words is not None:
        for i in words:
            temp = list(i.items())[0]
            sentences[temp[0]] = get_answer(temp[1])
    return sentences


if __name__ == "__main__":
    print("GetGPTSentences")