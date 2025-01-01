from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests (for frontend integration)

# Store session data (for simplicity, we're using an in-memory store)
user_sessions = {}

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_id = data.get('user_id', 'default_user')  # Unique ID for the user
    user_input = data.get('message', '').strip()

    if not user_input:
        return jsonify({'response': "Hello! How can I assist you with physics today?"}), 200

    if user_id not in user_sessions:
        # Initialize a new session for the user
        user_sessions[user_id] = [
            {'role': 'system', 'content': 'You are a helpful physics tutor. Your task is to solve physics problems step by step. Start by asking the user if they have a physics question or if they need help solving a physics problem. Do not move to the next step until the user responds, and include equations and explanations clearly nicely spaced and esay to read.'}
        ]

    # Add the user's message to the session
    user_sessions[user_id].append({'role': 'user', 'content': user_input})

    # Send the conversation to the Ollama model
    try:
        response = ollama.chat(model='llama3.2', messages=user_sessions[user_id])
        ai_message = response['message']['content']

        # Add the AI's response to the session
        user_sessions[user_id].append({'role': 'assistant', 'content': ai_message})

        return jsonify({'response': ai_message})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)