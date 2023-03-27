import numpy as np
import torch

np.random.seed(42)
torch.manual_seed(42)
from transformers import GPT2LMHeadModel, GPT2Tokenizer

tok = GPT2Tokenizer.from_pretrained("models/essays")
model = GPT2LMHeadModel.from_pretrained("models/essays")
model.cuda()


def GPT_analytics(text):
    inpt = tok.encode(text, return_tensors="pt")

    out = model.generate(inpt.cuda(), max_length=100, repetition_penalty=5.0, do_sample=True, top_k=5, top_p=0.95,
                         temperature=1)
    print(tok.decode(out[0]))
    return tok.decode(out[0])