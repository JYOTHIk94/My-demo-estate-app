import frappe

def sendmail(doc, reciepients, msg, title, attachments=None):
    email_args = {
        'reciepients': reciepients,
        'message': msg,
        'subject': title,
        'reference_doctype':doc.doctype,
        'reference_name':doc.name,
    }
    if attachments:
        email_args['attachments'] = attachments
        # send mail
        frappe.enqueue(method=frappe.sendmail, queue='short', timeout=300, **email_args)
