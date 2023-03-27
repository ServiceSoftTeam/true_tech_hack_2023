from yolo import Yolo

if __name__ == '__main__':
    yolo = Yolo()

    objects = yolo.get_video_objects(video_path="../data/Test 1.mov", seconds=2)
    print(objects)