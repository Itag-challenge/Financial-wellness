import numpy as np
from utils.embedder import get_embedding
from openai import OpenAI
from config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

def search_index(index, chunks, query, top_k=5):
    q_emb = np.array([get_embedding(query)]).astype("float32")
    distances, indices = index.search(q_emb, top_k)
    return [chunks[i] for i in indices[0]]

def build_prompt(contexts, question):
    context_str = "\n\n".join(contexts)
    return f"""You are a helpful assistant.Use the below information, 
from a document to answer the user's question. Only answer based on the information provided. If you don’t know the answer, say “I don’t know."

Context:
{context_str}

Question: {question}
Answer:"""

def ask_chatgpt(prompt):
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )
    return response.choices[0].message.content

