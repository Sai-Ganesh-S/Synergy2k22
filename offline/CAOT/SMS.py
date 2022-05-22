import requests

# url="https://maker.ifttt.com/trigger/Alert/with/key/iYvXmuJ6AHGH7qy9FsMZ-Lujlw7de4vN2PerhxrDFgp"
url_sms = "https://maker.ifttt.com/trigger/Alert_SMS/with/key/kgmb2ZB_lmFuaY5kURqH9Sn2fDf0Qs-Vd8tqYDhhbPI"
url_mail = "https://maker.ifttt.com/trigger/Alert_MAIL/with/key/kgmb2ZB_lmFuaY5kURqH9Sn2fDf0Qs-Vd8tqYDhhbPI"


def send_alert(x):
    jso = '?value1='+str(x)+' Person Entered Home'
    x = int(x)
    if x == 1:
        jso+='\nA Single Blacksheep'
    if x > 1 and x <= 5:
        jso += '\nHope they didn\'t steal your Icecream :)'
    if x > 5:
        jso += '\nHope you didn\'t invite them for Party :)'
    print(url_sms+jso)
    print("Sending Data......")
    r1 = requests.get(url_sms+jso, timeout=2.50)
    r2 = requests.get(url_mail+jso, timeout=2.50)
    print("Sent :)" if(r1.status_code >= 200 and r2.status_code >= 200) else "Failed")
    print(r1.status_code)
    print(r2.status_code)
