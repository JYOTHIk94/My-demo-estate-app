// Copyright (c) 2022, jyothi and contributors
// For license information, please see license.txt
frappe.ui.form.on('Property', {
	refresh : function(frm){
		frappe.msgprint("this is my new project");

	},
	
	// duplicate amenities when show an error message
	setup : function(frm){
		frm.check_amenities_duplicate = function(frm, row){
			frm.doc.amenities.forEach(item => {
				if (row.amenity =='' || row.idx == item.idx){
					// pass
				}
				else{
					if(row.amenity==item.amenity){
					// clear field
					row.amenity = '';
					frappe.throw(__(`${item.amenity} Already Exists in row ${item.idx}`));
					frm.refresh_fields('amenities');
				
					
					}
				}
			
				
		})
		// flat canot contain outdoor kitchen when amenity section we select amenity as outdoor kitchen throw an error
		frm.check_flat_against_out_door_kitchen = function(frm, row){
			if(row.amenity =='OutDoor Kitchen' && frm.doc.property_type == 'Flat'){
				let amenity = row.amenity
				row.amenity = '';
				frappe.throw(__(`${amenity} Canot exist in Flat`));
				
				frm.refresh_fields('amenities');


			}
		}

		}
		// compute total
		frm.compute_total = function(frm){
			let total = 0;
			// loop for child table
			frm.doc.amenities.forEach(d=>{
				total = total + d.amenity_price;
				console.log(total);
				frm.set_value("grand_total", total);
			})
			// new total
			// let new_total = frm.doc.property_price + total;
		
			// if(frm.doc.discount){
			
			// 	new_total = new_total- new_total*(frm.doc.discount/100)
			// 	console.log(new_total);
				// frm.set_value("grand_total", total);
			}
			
			// set the grand total
			// frm.set_value('grand_total', total);
	
	// }



	// copy discount to amenities child table

	frm.copy_discount = function(frm){
		frm.doc.amenities.forEach(d=>{
			d.discount = frm.doc.discount;
		})
		frm.refresh_fields(amenities)

	}
		
	},
	refresh : function(frm) {
		// to enter address in button click prompt dialog it will saved our form

		frm.add_custom_button('Say hii', () => {
			frappe.prompt('Address', ({ value }) => {
			if(value){
				frm.set_value('address', value);
				frm.refresh_fields('address')
				// frappe.msgprint(__(frm.doc.address ));
				frappe.msgprint(__(`Address field updated  with ${ value }`));
			}
			})
			
		},"Actions");

		// to check property type
		// its not working code trying on it self
		frm.add_custom_button('Check property Types', () =>{
			let property_type = frm.doc.property_type
			console.log(property_type);
			// make ajax call
			frappe.call({
				method: "estate_app.estate_app.api.check_property_type", //dotted path to server method
				args: {'property_type': property_type },
				callback: function(r) {
					// code snippet
					console.log(r);
					if(r.message.length>0){
						let head = `<h3> Below Properties has ${property_type} </h3>`;
						let body = ``;
						r.message.forEach(d => {
							let cont = `<p>Name: ${d.name} :<a href='/app/property/${property}'>Visit</a></p>`;
						
						let	body1 = body + cont;

						})

						let all = header + body1;
						frappe.msgprint(__(all));
					}

				}
			});

		},"Actions");

	
	},
	property_price: function(frm){
		frm.compute_total(frm);	
	},
	discount: function(frm){
		frm.compute_total(frm);
		frm.copy_discount(frm);

	}

});

// AMentity Child Table  Grab Entire Records in child table


frappe.ui.form.on('Property Amenity Detail', {
	// check duplicate value in amenity this section will call parent doc property
	amenity: function(frm, cdt, cdn){
		// grab entire record
		let row = locals[cdt][cdn];
		frm.check_amenities_duplicate(frm, row);
		frm.check_flat_against_out_door_kitchen(frm, row, row.amenity);
		frm.compute_total(frm);
		frm.copy_discount(frm);
		// console.log(row);
	},
	amenities_remove: function (frm, cdt,cdn){
		console.log('Removed');

	},
	
	
	

})
