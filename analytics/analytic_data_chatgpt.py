import openai

openai.api_key = "TOKEN"
def get_answer(question):
    text_question = 'Придумай сцену из набора слов коротким предложением'
    text_question = text_question + question
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=text_question,
        max_tokens=2048,
        top_p=1,
        n=1,
        stop=None,
        frequency_penalty=0,
        presence_penalty=0,
        temperature=0.5,
    )
    message = response["choices"][0]["text"].strip()
    return message

