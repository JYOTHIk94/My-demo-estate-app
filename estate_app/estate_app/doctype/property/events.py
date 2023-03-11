import frappe
from estate_app.estate_app.utils import sendmail

def validate(doc, event):
    pass
    # print(f"\n\n{doc}, {event}\n\n")
    # frappe.throw("Error Occured")
def on_update(doc, event):
    print(f"\n\n{doc}, {event}\n\n")
    frappe.msgprint(f"{doc.name} was updated {doc.owner}")
def after_insert(doc, event):
    #crate note an property insert
    note = frappe.get_doc({
        'doctype': 'Note',
        'title': f"{doc.name} Added",
        'public':True,
        'content': doc.descriptions

        })
    note.insert()
    frappe.db.commit()
    frappe.msgprint(f"{note.title} was created.")
# send email

    agent_email = frappe.get_doc('Agent', doc.agent)
    msg = f"Hellooooo <b> {doc.agent} </b> a property was created."
    attachments = [frappe.attach_print(doc.doctype, doc.name, file_name=doc.name)]
    sendmail(doc, [agent_email, 'test@gmail.com'], msg, 'New Property', attachments)
    