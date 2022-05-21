import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv
from email.mime.application import MIMEApplication
import os
from os.path import basename

load_dotenv()

sender_address = os.environ.get('GMAIL_USER') 
sender_pass = os.environ.get('GMAIL_PASSWORD')