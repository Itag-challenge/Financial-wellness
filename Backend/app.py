from flask import Flask, request, jsonify
from utils.pdf_loader import extract_text_from_pdf
from utils.embedder import create_faiss_index
from utils.retriever import search_index, build_prompt, ask_chatgpt
from langchain.text_splitter import RecursiveCharacterTextSplitter
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
# new
# Load and process the PDF once
#text = extract_text_from_pdf("data/EZ_Living_Furniture.pdf")
#text = extract_text_from_pdf("data/hackathon.pdf")
#text = extract_text_from_pdf("data/hackathon-dummy-data.pdf")
text = extract_text_from_pdf("data\crypto.pdf")
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = splitter.split_text(text)
index, _ = create_faiss_index(chunks)

@app.route("/ask", methods=["POST"])
def ask():
    data = request.get_json()
    question = data.get("question")
    if not question:
        return jsonify({"error": "Missing 'question'"}), 400

    context_chunks = search_index(index, chunks, question, top_k = 5)
    prompt = build_prompt(context_chunks, question)
    print(f"prompt:{prompt}")
    answer = ask_chatgpt(prompt)
    return jsonify({"answer": answer})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9999, debug=True)

