<template>
	<div class id="app">
		<img class="mx-auto" v-bind:alt="logoAlt" v-bind:src="image" width="200px">
		<h1 class="text-center text-2xl font-bold text-white p-2">Enter Information for Equipment Return</h1>
		<form
				@submit.prevent="exportPDF"
				class="bg-white shadow-md w-2/3 mx-auto p-2"
				id="information input"
		>
			<div id="customerInformationDiv">
				<div class="p-2" id="customerInformation">
					<div class="text-center">
						<input
								autocomplete="no"
								class="form-input m-2"
								placeholder="First Name"
								type="text"
								v-model="firstName"
								required
						>
						<input
								autocomplete="no"
								class="form-input m-2"
								placeholder="Last Name"
								type="text"
								v-model="lastName"
								required
						>
						<input
								class="form-input m-2"
								min="0"
								placeholder="Account Number"
								type="number"
								v-model="account"
						>
					</div>
					<div class="text-center">
						<input
								class="form-input m-2"
								maxlength="11"
								minlength="10"
								placeholder="Phone number"
								type="tel"
								v-model="phone"
								required
						>
						<input
								class="form-input m-2"
								placeholder="Service Address"
								type="text"
								v-model="address"
								required
						>
						<input
								class="form-input m-2"
								placeholder="Customer Email"
								type="email"
								v-model="email"
						>
					</div>
				</div>
			</div>
			<div id="equipmentInformationDiv" class="">
				<div class="text-center block">
					<table class="mx-auto">
						<tr>
							<td>Equipment Type</td>
							<td>CMAC/SN</td>
							<td>Accessories</td>
						</tr>
						<tbody>
						<tr v-for="(row, index) in rows">
							<td><select required class="form-select bg-gray-200 m-2" id="equipmentType" v-model="rows[index].device">
								<option disabled selected>Select a device type</option>
								<option :key="index" v-for="(equipmentType,index) in equipmentTypes">
									{{ equipmentType.text }}
								</option>
							</select></td>
							<td><input autocomplete="off" class="form-input inline" id="CMAC/SN input" placeholder="CMAC/SN" type="text" v-model="rows[index].equipmentNum"></td>
							<td>
								<label for="powerCord">Power Cord</label>
								<input id="powerCord" class="p-2 m-2 form-checkbox" type="checkbox" v-model="rows[index].powerCord">
								<label for="remote">Remote</label>
								<input id="remote" class="p-2 m-2 form-checkbox" type="checkbox" v-model="rows[index].remote">
							</td>
							<td>
								<a class="block mx-auto px-4 py-2 rounded-full bg-gray-200"
								   style="cursor: pointer" v-on:click="removeElement(index)">Remove</a></td>

						</tr>
						</tbody>
					</table>
					<div>
						<button class="block mx-auto px-4 py-2 rounded-full bg-gray-200 hover:bg-blue-300 hover:font-bold"
						        v-on:click.prevent="addRow">Add More Equipment +
						</button>
					</div>
				</div>
			</div>
			<div id="returnInformationDiv">
				<div>
					<div class="text-center" id="return-information">
						<label for="returnType">Select Reason for return</label>
						<select required class="form-select m-2 bg-gray-200 text-black" id="returnType" v-model="returnType">
							<option disabled selected>Select Reason</option>
							<option :key="index" v-bind:value="returnOption.value"
							        v-for="(returnOption,index) in returnOptions">
								{{ returnOption.text }}
							</option>
						</select>
					</div>
					<div class="text-center" id="notes">
						<textarea required id="explanation" class="mx-auto bg-gray-200 text-center" cols="50" rows="4"
						          v-bind:placeholder="returnType"></textarea>
					</div>
					<input class="mx-auto newInput hover:bg-blue-300" type="submit" value="Submit">
				</div>
			</div>
		</form>
	</div>
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
			removeElement(index) {
				this.rows.splice(index, 1);
			},
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
				for (let i = 0 ; i < this.rows.length ; i++){
					str += "Device: " + this.rows[i].device;
					str += "\n";
					str += "CMAC/SN: " + this.rows[i].equipmentNum;
					str += "\n";
					str += "Accessories: ";
					if (this.rows[i].remote){
						str += "Remote Included ";
					}
					if (this.rows[i].powerCord){
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
			echoTest(){
				let data = document.getElementById("returnType");
				console.log(data.options[data.selectedIndex].text)
			}
		}
	};
</script>
<style>
	body {
		background-color: #4a5568;
	}

	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
