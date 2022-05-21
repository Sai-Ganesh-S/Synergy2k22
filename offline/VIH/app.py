from flask import Flask,request, flash, redirect, render_template, request
import pickle
from score import predict_link_score as detect_link
from score import predict_content_score as detect_content

from dotenv import load_dotenv

app = Flask(__name__)


@app.route('/', methods = ["GET","POST"])
def home():

    if request.method == "POST":

        try:

            content = request.values.get("news_content")
            prediction = detect_content(content)

        except:

            pass

        try:

            link = request.values.get("news_link")
            prediction = detect_link(link)
            print("Prediction: ", prediction)        

        except:

            pass

        return render_template("index.html", prediction = prediction)

    return render_template("index.html")

@app.route('/ping')
def ping():

    result = {
        "ping"  : "pong"
    }
    return result

if __name__== "__main__":

    app.run(host="0.0.0.0", debug = True, port = 5003)