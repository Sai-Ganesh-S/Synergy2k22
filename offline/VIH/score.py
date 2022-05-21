from dotenv import load_dotenv
import os
from bs4 import BeautifulSoup
from newspaper_test import detect_link, get_content
import requests
import spacy
from similarity import check_similarity