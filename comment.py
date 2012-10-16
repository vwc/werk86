#!/usr/bin/python
# comment.py
# A simple CGI handler for sending emails from an HTML
# form. This script supports asynchronous requests via
# Javascript as well as being requested through the normal
# browser POST behavior.
#
# Note: Make sure to set this file as executable or your web
# server will not run it! On *nix you could do this by
# running: `chmod +x comment.py`

import cgi
import smtplib
import datetime

data = cgi.FieldStorage(keep_blank_values=True)

error = None
if not (len(data['yourEmail'].value) and
        len(data['yourMsg'].value)):
    error = "E-Mail-Adresse und Nachrichtentext sind Pflichtfelder."

else:
    email = data['yourEmail'].value
    subject = data['subject'].value
    body = data['yourMsg'].value
    message_text = "\n\n".join(["Email:  " + email,
                                "Subject: " + subject,
                                "Body:\n" + body])

if not error:
    from_address = to_address = "hallo@vorwaerts-werbung.de"
    subj = "Kontakt Formular Anfrage"
    date = datetime.datetime.now().strftime("%d/%m/%Y %H:%M")
    msg = "From: %s\nTo: %s\nSubject: %s\nDate: %s\n\n%s" \
          % (from_address, to_address, subj, date, message_text)
    server = smtplib.SMTP('mail.vorwaerts-werbung.de:25')
    server.login('vw_zopemailsender', 'oTgDy%32')
    server.sendmail(from_address, to_address, msg)
    server.quit()

    result = "Anfrage erfolgreich versandt!"
else:
    result = "ERROR! " + error

if 'async' in data:
    # print "Content-Type: text/plain\r\n\r\n"
    return result
else:
    print "Content-Type: text/html\r\n\r\n"
    print """
<html>
<head>
<title>Formular versandt</title>
</head>
<body>
<h1>Vielen Dank</h1>
<p>Folgende Daten wurden verchickt: <em>%s</em></p>
</body>
</html>""" % result
