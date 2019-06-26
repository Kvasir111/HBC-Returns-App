<template>
	<form
			@submit.prevent="sendEmail"
			class="bg-white shadow-md w-2/3 mx-auto p-2"
			id="information input"
	>
		<div id="customerInformationDiv">
			<div class="p-2" id="customerInformation">
				<div class="text-center">
					<input
							autocomplete="no"
							class="customerInformationInput focus:outline-none"
							placeholder="First Name"
							type="text"
							v-model="firstName"
							required
					>
					<input
							autocomplete="no"
							class="customerInformationInput focus:outline-none"
							placeholder="Last Name"
							type="text"
							v-model="lastName"
							required
					>
					<input
							class="customerInformationInput focus:outline-none"
							min="0"
							placeholder="Account Number"
							type="number"
							v-model="account"
					>
				</div>
				<div class="text-center">
					<input
							class="customerInformationInput focus:outline-none"
							maxlength="11"
							minlength="10"
							placeholder="Phone number"
							type="tel"
							v-model="phone"
							required
					>
					<input
							class="customerInformationInput focus:outline-none"
							placeholder="Service Address"
							type="text"
							v-model="address"
							required
					>
					<input
							class="customerInformationInput focus:outline-none"
							placeholder="Customer Email"
							type="email"
							v-model="email"
					>
				</div>
			</div>
		</div>
		<div id="equipmentInformationDiv" class="">
			<div class="text-center block">
				<table class="mx-auto max-w-full sm:text-center px-4">
					<tr class="sm:invisible border-b-2">
						<td>Equipment Type</td>
						<td>CMAC/SN</td>
						<td>Accessories</td>
					</tr>
					<tbody class="sm:block">
					<tr class="sm:block" v-for="(row, index) in rows">
						<td class="sm:block"><select required
						                             class="border-b-2 border-blue-500 px-2 py-2 m-2 focus:outline-none"
						                             id="equipmentType" v-model="rows[index].device">
							<option disabled selected>Select a device type</option>
							<option :key="index" v-for="(equipmentType,index) in equipmentTypes">
								{{ equipmentType.text }}
							</option>
						</select></td>
						<td class="sm:block"><input autocomplete="off"
						                            class="border-b-2 border-blue-500 m-2 p-2 focus:outline-none inline"
						                            id="CMAC/SN input" placeholder="CMAC/SN" type="text"
						                            v-model="rows[index].equipmentNum"></td>
						<td class="block m-2 p-2 align-text-bottom">
							<label for="powerCord">Power Cord</label>
							<input id="powerCord" class="form-checkbox m-2" type="checkbox"
							       v-model="rows[index].powerCord">
							<label for="remote">Remote</label>
							<input id="remote" class="form-checkbox m-2" type="checkbox" v-model="rows[index].remote">
						</td>
						<td class="sm:block">
							<input type="button"
							       class="removeEquipmentButton "
							       style="cursor: pointer"
							       v-on:click="removeElement(index)"
							       value="X">
						</td>
					</tr>
					</tbody>
				</table>
				<div>
					<button class="addEquipmentButton"
					        v-on:click.prevent="addRow">Add +
					</button>
				</div>
			</div>
		</div>
		<div id="returnInformationDiv">
			<div>
				<div class="text-center" id="return-information">
					<select required class="border-b-2 border-blue-500 p-2 focus:outline-none" id="returnType"
					        v-model="returnType">
						<option disabled selected>Select Reason</option>
						<option :key="index" v-bind:value="returnOption.value"
						        v-for="(returnOption,index) in returnOptions">
							{{ returnOption.text }}
						</option>
					</select>
				</div>
				<div class="text-center" id="notes">
						<textarea required id="explanation"
						          class="mx-auto border-2 border-blue-500 text-center  p-2 m-4 max-w-full" cols="50"
						          rows="4"
						          v-bind:placeholder="returnType"></textarea>
				</div>
				<input class="submitButton hover:cursor-pointer" type="submit" value="Submit">
			</div>
		</div>
	</form>
</template>

<script>

	import jspdf from "jspdf";

	export default {

		data: function () {

			return {
				//data for customer information
				firstName: "",
				lastName: "",
				address: "",
				phone: "",
				account: "",
				email: "",
				//data for return reasons
				returnType: 'Select Reason',
				returnOptions: [
					{text: 'Exchange/Defective Equipment', value: 'Enter CMAC/SN of device being exchanged'},
					{text: 'Cancelling Service', value: 'Enter Reason'},
					{text: 'Moving', value: 'Enter Forwarding Address'},
					{text: 'Other', value: 'Enter Notes'}
				],
				//data for equipment
				equipmentType: "Select a Device Type",
				equipmentTypes: [
					{text: "Modem/Router", value: "Modem/Router"},
					{text: "DTA", value: "DTA"},
					{text: "Gateway", value: "Gateway"},
					{text: "DVR/STB", value: "DVT/STB"}
				],

				rows: [
					{device: ""},
					{powerCord: ""},
					{remote: ""},
					{equipmentNum: "",}
				],
				equipmentItem: [],

				//data for headings
				image: "https://www.hbci.com/wp-content/uploads/footer-logo.png",
				logoAlt: "Hiawatha Broadband Communications",
			};
		},
		methods: {
			//adds a row to the equipment table
			addRow() {
				let elem = document.createElement('tr');
				this.rows.push({
					'Equipment Type': "",
					'CMAC/SN': "",
					'Accessories': ""
				});
			},
			//removes a row from equipment table
			removeElement(index) {
				this.rows.splice(index, 1);
			},
			//exports the provided information to a PDF
			exportPDF() {
				let data = [
					"Name: " + this.firstName + " " + this.lastName + "\n"
					+ "Service Address: " + this.address + "\n"
					+ "Account: " + this.account + "\n"
					+ "Contact Number : " + this.phone + "\n"
					+ "Email: " + this.email + "\n"
				];
				data += "\n";
				let str = "";
				for (let i = 0; i < this.rows.length; i++) {
					str += "Device: " + this.rows[i].device;
					str += "\n";
					str += "CMAC/SN: " + this.rows[i].equipmentNum;
					str += "\n";
					str += "Accessories: ";
					if (this.rows[i].remote) {
						str += "Remote Included ";
					}
					if (this.rows[i].powerCord) {
						str += "Power Cord included";
					}
					str += "\n";
				}
				data += str;
				data += "\n";
				let temp = document.getElementById("returnType");
				temp = temp.options[temp.selectedIndex].text;
				data += "Reason for Return: " + temp;
				data += "\n";
				data += "Notes: " + document.getElementById("explanation").value;
				let doc = new jspdf({
					orientation: "p",
					unit: "in",
					format: "a4"
				});
				doc.text(data, 2, 2);
				doc.save("return.pdf");
			},
			//for testing output
			echoTest() {
				let data = document.getElementById("returnType");
				console.log(data.options[data.selectedIndex].text)
			},
			//converts information to JSON
			toJSON() {
				let equipmentData = "";
				for (let i = 0; i < this.rows.length; i++) {
					equipmentData += "Device: " + this.rows[i].device;
					equipmentData += "CMAC/SN: " + this.rows[i].equipmentNum;
					equipmentData += "Accessories: ";
					if (this.rows[i].remote) {
						equipmentData += "Remote Included ";
					}
					if (this.rows[i].powerCord) {
						equipmentData += "Power Cord included";
					}
				}
				let reason = document.getElementById("returnType");
				reason = reason.options[reason.selectedIndex].text;
				let r = {
					"returns": [
						{
							"Name": this.firstName + this.lastName,
							"Service Address": this.address,
							"Account #": this.account,
							"Phone #": this.phone,
							"Email": this.email,
							"EquipmentData": equipmentData,
							"Return Reason": reason,
							"Notes": document.getElementById("explanation").value
						}
					]
				};
				console.log(r);
				this.sendToFirebase(r);
			},
			//sends JSON to firebase
			sendToFirebase() {
				let firebase = require("firebase/app");
				require("firebase/auth");
				require("firebase/firestore");
				let firebaseConfig = "/config.js";
				firebase.initializeApp(firebaseConfig)

			},
			//email using mandrill
			sendEmail() {
				let str = "";
				for (let i = 0; i < this.rows.length; i++) {
					str += "Device: " + this.rows[i].device;
					str += "\n";
					str += "CMAC/SN: " + this.rows[i].equipmentNum;
					str += "\n";
					str += "Accessories: ";
					if (this.rows[i].remote) {
						str += "Remote Included ";
					}
					if (this.rows[i].powerCord) {
						str += "Power Cord included";
					}
					str += "\n";
				}
				;
				let temp = document.getElementById("returnType");
				temp = temp.options[temp.selectedIndex].text;
				let returnReason = "Reason for Return: " + temp;
				let notes = "Notes: " + document.getElementById("explanation").value;

				let nodemailer = require('nodemailer');
				let jasonStatham = nodemailer.createTransport({
					service: 'cpanel',
					auth:{
						user: 'jasonstatham@returns.hbci.com',
						pass: "f3nriswolf!"
					}
				});

				let mailOptions = {
					from: "jasonstatham@returns.hbci.com",
					to: this.email,
					subject: "Your HBC Equipment Return",
					text: "Thank you for returning your equipment to HBC, attached is the information you provided"
				};

				jasonStatham.sendMail(mailOptions, function (error, info) {
					if (error){
						console.log(error);
					}else{
						console.log('Email sent: ' + info.response);
					}
				});
			}

		}
	};
</script>

<style scoped>

</style>