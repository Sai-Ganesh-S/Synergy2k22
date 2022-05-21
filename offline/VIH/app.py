from email import contentmanager
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def start():

    return render_template('test.html')

@app.route('/detect')
def detect():

    # Predicting whether a given content is fake or real

    content = request.values.get("content")
    link    = request.values.get("link")

    return result

@app.route('/ping')
def ping():

    result = {
        "ping"  : "pong"
    }
    return result

if __name__== "__main__":

    app.run(host="0.0.0.0", debug = True, port = 5003)