# Copyright (c) 2022, jyothi and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class Property(Document):
	#pass
	def after_insert(self):
		frappe.msgprint((f'Document {self.name } updated successfully'));
# code for check flat canot have outdoor kitchen in amenity table

	# def validate(self):
	# 	if(self.property_type=="Flat"):
	# 		for amenity in self.amenities:
	# 			if(amenity.amenity=="OutDoor Kitchen"):
	# 				frappe.throw((f'property type <b>Flat</b> canot have outdoor kitchen <b>{amenity.amenity}</b>'))
	# #SQL
			# amenity = frappe.db.sql(f"""SELECT amenity FROM `tabProperty Amenity Detail` WHERE parent="{self.name}"  AND parenttype="Property" AND amenity="OutDoor Kitchen";""")
			# print(f"""\n\n\n{amenity}""")
			# if(amenity):
			# 	frappe.throw((f'property type <b>Flat</b> canot have outdoor kitchen <b>{amenity[0].amenity}</b>'))
