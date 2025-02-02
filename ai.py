from flask import Flask, request, jsonify
from flask_cors import CORS
import ollama

app = Flask(__name__)
CORS(app)  # Allow frontend access

# Store user sessions
user_sessions = {}

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_id = data.get('user_id', 'default_user')  # Unique user ID
    user_input = data.get('message', '').strip()

    if not user_input:
        return jsonify({'response': "Please ask a physics-related question."})

    # Initialize user session if not existing
    if user_id not in user_sessions:
        user_sessions[user_id] = [
            {'role': 'system', 'content': 'You are a physics tutor. Explain physics concepts step by step, using equations and clear formatting. Use bullet points, headers, and equations for better readability. Answer only physics-related questions.'}
        ]

    # Add user message to session
    user_sessions[user_id].append({'role': 'user', 'content': user_input})

    try:
        # Send conversation to Ollama (Llama 3.3)
        response = ollama.chat(model='llama3.2', messages=user_sessions[user_id])
        ai_message = response['message']['content']

        # Store AI response in session
        user_sessions[user_id].append({'role': 'assistant', 'content': ai_message})

        return jsonify({'response': ai_message})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
def format_ai_response(text):
    """
    Formats AI response with better readability.
    - Adds **bold** headers
    - Converts `*` into bullet points
    - Formats equations using LaTeX-style `$...$`
    """
    formatted_text = []
    lines = text.split("\n")

    for line in lines:
        line = line.strip()

        if line.startswith("**"):  # Headers
            formatted_text.append(f"<h3>{line.replace('**', '').strip()}</h3>")
        elif line.startswith("* "):  # Bullet points
            formatted_text.append(f"<ul><li>{line[2:]}</li></ul>")
        elif "$" in line:  # Equations
            formatted_text.append(f"<p class='equation'>{line}</p>")
        else:  # Regular text
            formatted_text.append(f"<p>{line}</p>")

    return "<div class='ai-response'>" + "".join(formatted_text) + "</div>"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)