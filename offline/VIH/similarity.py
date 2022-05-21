import spacy

# Run:
# python -m spacy download en_core_web_sm
# the first time you run this file


def check_similarity(cnt_1, cnt_2):

    cnt_1 = cnt_1.lower()
    cnt_2 = cnt_2.lower()

    nlp = spacy.load('en_core_web_sm')

    search_doc = nlp(cnt_1)

    main_doc = nlp(cnt_2)

    print(main_doc.similarity(search_doc))


if __name__ == '__main__':

    check_similarity()