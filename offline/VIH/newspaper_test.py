from newspaper import Article
from requests.api import delete
# import feedparser

def get_content(url):

    article = Article(url)

    try:

        article.download() 

        article.parse()

        content = article.text

    except:

        return None

    return content

def main():

    content = get_content("https://www.indiatoday.in/coronavirus-outbreak/story/delhi-covid-cases-death-positivity-rate-1886156-2021-12-09")

    print(content)

if __name__=='__main__':
    
    main()