<template>
	<div class id="app">
		<img class="mx-auto" v-bind:alt="logoAlt" v-bind:src="image" width="200px">
		<h1 class="text-center text-2xl font-bold text-white p-2">Enter Information for Equipment Return</h1>
		<form
				@submit.prevent="printRows"
				class="bg-white shadow-md w-2/3 mx-auto p-2"
				id="information input"
		>
			<div id="cDiv">
				<div class="p-2" id="customerInformation">
					<div class="text-center">
						<input
								autocomplete="no"
								class="form-input m-2"
								placeholder="First Name"
								type="text"
								v-model="firstName"
						>
						<input
								autocomplete="no"
								class="form-input m-2"
								placeholder="Last Name"
								type="text"
								v-model="lastName"
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
						>
						<input
								class="form-input m-2"
								placeholder="Service Address"
								type="text"
								v-model="address"
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
			<div id="eDiv">
				<div class="text-center">
					<table>
						<tr>
							<td>Equipment Type</td>
							<td>CMAC/SN</td>
							<td>Accessories</td>
						</tr>
						<tbody>
						<tr v-for="(row, index) in rows">
							<td><select class="form-select bg-gray-200 m-2" id="equipmentType" v-model="equipmentType">
								<option disabled selected>Select a device type</option>
								<option :key="index" v-for="(equipmentType,index) in equipmentTypes">
									{{ equipmentType.text }}
								</option>
							</select></td>
							<td><input class="form-input inline" id="CMAC/SN input" placeholder="CMAC/SN" type="text" v-model="equipmentNum"></td>
							<td>
								<label for="powerCord">Power Cord</label>
								<input id="powerCord" class="p-2 m-2 form-checkbox" type="checkbox" v-model="powerCord">
								<label for="remote">Remote</label>
								<input id="remote" class="p-2 m-2 form-checkbox" type="checkbox" v-model="remote">
							</td>
							<td>
								<a class="block mx-auto px-4 py-2 rounded-full bg-gray-200 hover:bg-blue-300 hover:font-bold"
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
			<div id="rDiv">
				<div>
					<div class="text-center" id="return-information">
						<label for="returnType">Select Reason for return</label>
						<select class="form-select m-2 bg-gray-200 text-black" id="returnType" v-model="returnType">
							<option disabled selected>Select Reason</option>
							<option :key="index" v-bind:value="returnOption.value"
							        v-for="(returnOption,index) in returnOptions">
								{{ returnOption.text }}
							</option>
						</select>
					</div>
					<div class="text-center" id="notes">
						<textarea class="mx-auto bg-gray-200 text-center" cols="50" rows="4"
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
	import CustomerInformation from './components/customerInformation'
	import EquipmentInput from "./components/equipmentInput";
	import ReturnInformation from "./components/returnInformation"

	export default {
		components: {CustomerInformation, EquipmentInput, ReturnInformation},
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
				powerCord: "",
				remote: "",
				equipmentNum: "",
				rows: [],
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

				let doc = new jspdf({
					orientation: "p",
					unit: "in",
					format: "a4"
				});
				doc.text(data, 2, 2);
				doc.save("return.pdf");
			},
			printRows() {
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
