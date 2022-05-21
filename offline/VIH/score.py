from dotenv import load_dotenv
import os
from bs4 import BeautifulSoup
from newspaper_test import detect_link, get_content
import requests
import spacy
from similarity import check_similarity

# NLP libraries to clean the text data
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
import re

import yake

def predict_link_score(url):
    
    # url = "https://www.dnaindia.com/education/report-cbse-class-10-12-board-exam-2022-term-1-cancellation-latest-updates-news-exam-centre-datesheetonline-petition-2917207"
    # url = "https://www.bbc.com/sport/football/59572726"

    content = get_content(url)
    # print(content)

    result = predict_content_score(content)
    print ("Link score:", result)
    return result
    

def predict_content_score(content):

    keyword_list = get_keyword_list(content)

    # print(keyword_list)

    judge_list = []
    prediction = []

    for keyword in keyword_list:

        judge_list = get_content_of_link(keyword)

        # print(judge_list)

        prediction.append(judge_list)

        # for judge in judge_list:

        #     # print(judge)

        #     judge_list.append(judge)

    # print (prediction)

    pred_list = [elem for sublist in prediction for elem in sublist]

    # print (pred_list)

    result = finalizer(pred_list)  
    print(result) 

    return result



if __name__=='__main__':
    predict_link_score("https://www.bbc.com/sport/football/59572726")