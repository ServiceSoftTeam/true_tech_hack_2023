from audioready_gpt_senteces import GetGPTSentences
from audio_analytics import CreateAudio

if __name__ == "__main__":
    kek = GetGPTSentences('kek.wav', 'Test 1.mov', 5)
    print(kek)
    audio = CreateAudio(kek)

