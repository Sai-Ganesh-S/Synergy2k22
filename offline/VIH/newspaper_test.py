from newspaper import Article
from requests.api import delete
# import feedparser
from validate import fake_news_det as detect


def get_content(url):

    article = Article(url)

    try:

        article.download() 

        article.parse()

        content = article.text

    except:

        return None

    return content

def detect_link(url):

    # url = input ("Enter url: ")

    content = get_content(url)

    pred = detect(content)

    return pred

def test():

    url = "https://economictimes.indiatimes.com/news/india/karnataka-33-quota-for-women-in-outsourced-govt-jobs/articleshow/91706432.cms"
    pred = detect_link(url)
    print ("prediction:", pred)

def main():

    test()

    # content = get_content("https://www.indiatoday.in/coronavirus-outbreak/story/delhi-covid-cases-death-positivity-rate-1886156-2021-12-09")

    # print(content)

if __name__=='__main__':

    main()