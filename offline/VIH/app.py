from crypt import methods
from email import contentmanager
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def start():

    return render_template('test.html')

@app.route('/detect', methods = ["POST", "GET"])
def detect():

    # Predicting whether a given content is fake or real

    content = request.values.get("content")
    link    = request.values.get("link")

    prediction = "fake"

    form_content = {
        "content"   : content,
        "link"      : link
    }

    return render_template('test.html', prediction = prediction)

@app.route('/ping')
def ping():

    result = {
        "ping"  : "pong"
    }
    return result

if __name__== "__main__":

    app.run(host="0.0.0.0", debug = True, port = 5003)