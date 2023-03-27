from yolo import Yolo


if __name__ == '__main__':
    _yolo = Yolo()

    res = _yolo.get_video_objects("../../Test 1.mov")
    print(res)