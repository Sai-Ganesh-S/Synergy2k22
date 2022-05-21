from flask import Flask,request, flash, redirect, render_template, request
import pickle
from score import predict_link_score as detect_link
from score import predict_content_score as detect_content

from dotenv import load_dotenv


app     = Flask(__name__)
mail    = Mail(app)

# https://www.dnaindia.com/education/report-cbse-class-10-12-board-exam-2022-term-1-cancellation-latest-updates-news-exam-centre-datesheetonline-petition-2917207
# https://www.bbc.com/news/live/world-europe-60685883


model = pickle.load(open('model_svm.pkl','rb'))

load_dotenv()

# SENDER_ADDRESS = os.environ.get('GMAIL_USER') 
# SENDER_PASS = os.environ.get('GMAIL_PASSWORD')

SENDER_ADDRESS  = os.environ.get('GMAIL_USER') 
SENDER_PASS     = os.environ.get('GMAIL_PASSWORD')
EMAIL_LIST      = os.environ.get('EMAIL_LIST').split(',')


app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = SENDER_ADDRESS
app.config['MAIL_PASSWORD'] = SENDER_PASS
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config["UPLOAD_FOLDER"] = "uploads/"
mail = Mail(app)

ALLOWED_EXTENSIONS  = {'png', 'jpg', 'jpeg'}


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