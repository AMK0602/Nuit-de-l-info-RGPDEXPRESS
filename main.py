from flask import Flask, request, jsonify
from openai import OpenAI
from flask import Flask

client = OpenAI(api_key="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")
app = Flask(__name__,
            static_url_path='', 
            static_folder='public',)

@app.route("/chat", methods=['POST'])
def chat():
  response = client.chat.completions.create(
    model="gpt-3.5-turbo-1106",
    messages=request.get_json()
  )
  return response.choices[0].message.content

app.run(debug=True)
