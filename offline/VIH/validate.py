# NLP libraries to clean the text data
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
import re


def wordopt(text):

    ps = PorterStemmer()


    text = re.sub('[^a-zA-Z]', ' ',text)

    text = text.lower()

    text = text.split()

    text = [ps.stem(word) for word in text if not word in stopwords.words('english')]

    text = ' '.join(text)

    return text