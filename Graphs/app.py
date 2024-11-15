from flask import Flask, render_template, request, jsonify
import matplotlib.pyplot as plt
import numpy as np

app = Flask(__name__)

#function to generate graphs
def generate_graphs(v0, a, time_duration):

    # Time array (0 to time_duration)
    t = np.linspace(0, time_duration, 100)

    # Position-Time graph (x(t) = x0 + v0*t + 0.5*a*t^2)
    x = v0 * t + 0.5 * a * t**2

    # Velocity-Time graph (v(t) = v0 + a*t)
    v = v0 + a * t

    # Acceleration-Time graph (constant a)
    acceleration = np.full_like(t, a)

    # Save the graphs as images in the /static directory
    plt.figure(figsize=(10, 6))
    plt.subplot(3, 1, 1)
    plt.plot(t, x)
    plt.title('Position-Time Graph')
    plt.xlabel('Time (s)')
    plt.ylabel('Position (m)')
    plt.grid()

    plt.subplot(3, 1, 2)
    plt.plot(t, v)
    plt.title('Velocity-Time Graph')
    plt.xlabel('Time (s)')
    plt.ylabel('Velocity (m/s)')
    plt.grid()

    plt.subplot(3, 1, 3)
    plt.plot(t, acceleration)
    plt.title('Acceleration-Time Graph')
    plt.xlabel('Time (s)')
    plt.ylabel('Acceleration (m/s²)')
    plt.grid()

    # Save the plot image to the static directory
    plt.tight_layout()
    file_path = 'graphs.png'
    plt.savefig(file_path)
    plt.close()

    return file_path

@app.route('/')
def index():
    return render_template('graph.html')

@app.route('/submitGraph', methods=['POST'])
def submit_graph():
    # Get user drawing data (just placeholder for now)
    user_data = request.json['graphData']  # The user drawing data would come here

    # Generate the AI graphs (For now, using sample values)
    ai_graph_file = generate_graphs(v0=0, a=2, time_duration=10)

    # Compare graphs logic (simplified)
    feedback = "Great job! Your graph is correct!"  # Placeholder feedback

    # Return AI graph and feedback
    return jsonify({
        'message': feedback,
        'aiGraph': ai_graph_file
    })

if __name__ == '__main__':
    app.run(debug=True)