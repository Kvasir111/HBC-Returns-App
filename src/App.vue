<template>
	<div class="" id="app">
		<img class="mx-auto " v-bind:alt="logoAlt" v-bind:src="image" width="200px">
		<h1 class="text-center text-2xl font-bold text-white p-2">Enter Information for Equipment Return</h1>
		<form @submit.prevent="exportPDF" class="bg-white shadow-md w-2/3 mx-auto p-2" id="information input">
			<div class="p-2" id="customerInformation">
				<div class="text-center">
					<input autocomplete="no" class="form-input m-2" placeholder="Customer Name" required type="text"
					       v-bind:aria-valuemax="customerName" v-model="customerName">
					<input class="form-input m-2" min="0" placeholder="Account Number" type="number"
					       v-bind:aria-valuemax="customerAccount" v-model="customerAccount">
				</div>
				<div class="text-center">
					<input class="form-input m-2" maxlength="11" minlength="10" placeholder="Phone number" required
					       type="tel"
					       v-bind:aria-valuemax="customerPhoneNumber" v-model="customerPhoneNumber">
					<input class="form-input m-2" placeholder="Service Address" required type="text"
					       v-bind:aria-valuemax="customerAddress" v-model="customerAddress">
				</div>
			</div>
			<div class="text-center" id="equipment-type">
				<label for="equipmentDropdown" invisible></label>
				<select class="form-multiselect bg-gray-200 m-2" id="equipmentDropdown" v-bind:aria-valuemax="equipmentType"
				        v-model="equipmentType">
					<option class="" disabled selected>Select Equipment Type</option>
					<option value="DVR/Set-Top Box">DVR/Set-Top Box</option>
					<option value="Gateway/Modem">Gateway/Modem</option>
					<option value="Wireless Router">Wireless Router</option>
					<option value="DTA">DTA</option>
				</select>
				<input class="form-input inline" placeholder="CMAC/SN" type="text" v-bind:aria-valuemax="equipmentNum"
				       v-model="equipmentNum" id="CMAC/SN input">
				<input class="p-2 m-2 form-checkbox" false-value="" true-value="Power Cord" type="checkbox"
				       v-bind:aria-valuemax="powerCord"
				       v-model="powerCord">Power Cord?
				<input class="p-2 m-2 form-checkbox" false-value="" true-value="Remote" type="checkbox" v-bind:aria-valuemax="remote"
				       v-model="remote">Remote?
			</div>
			<div class="text-center" id="return-information">
				<select class="form-multiselect m-2 bg-gray-200" v-model="returnType">
					<option disabled selected>Select a reason for return</option>
					<option value="Exchange/Defective Equipment">Exchange/Defective Equipment</option>
					<option value="Cancelling Service">Cancelling Service</option>
					<option value="Moving">Moving</option>
					<option value="Other">Other</option>
				</select>
			</div>
			<div class="mx-auto block" id="notes">
				<div v-if="returnType === 'Cancelling Service'">
					<textarea class="mx-auto block bg-gray-200 p-2 max-w-2xl" cols="50" placeholder="Enter Reason for Cancelling" required rows="4"
					          v-model="notes"></textarea>
				</div>
				<div v-if="returnType === 'Moving'">
					<textarea class="mx-auto block bg-gray-200 p-2 max-w-2xl" cols="50" placeholder="Enter Forwarding Address" rows="4"
					          v-model="notes"></textarea>
				</div>
				<div v-if="returnType === 'Other'">
					<textarea class="mx-auto block bg-gray-200 p-2 max-w-2xl" cols="50" placeholder="Enter notes here" rows="4"
					          v-model="notes"></textarea>
				</div>
				<div v-if="returnType === 'Exchange/Defective Equipment'">
					<textarea class="mx-auto block bg-gray-200 p-2 max-w-2xl" cols="50" placeholder="Enter CMAC/SN of new Equipment" rows="4"
					          v-model="notes"></textarea>
				</div>
				<input class="mx-auto newInput hover:bg-blue-300" type="submit" value="Submit">
			</div>
		</form>
	</div>
</template>

<script>
	import jspdf from 'jspdf'

	export default {
		component: {},
		data() {
			return {
				customerName: null,
				customerPhoneNumber: null,
				customerAddress: null,
				customerAccount: null,

				equipmentType: null,
				equipmentNum: null,
				powerCord: null,
				remote: null,

				returnType: null,

				notes: null,

				image: "https://www.hbci.com/wp-content/uploads/footer-logo.png",
				logoAlt: "Hiawatha Broadband Communications"
			}
		},
		methods: {
			collateData() {
				return data;
			},
			exportPDF() {
				let heading = "Customer Information: \n";
				let name = "Customer Name: " + this.customerName + "\n";
				let phone = "Contact Number: " + this.customerPhoneNumber + "\n";
				let address = "Service Address: " + this.customerAddress + "\n";
				let account = "Account #: " + this.customerAccount + "\n";

				let equipmentType = "Type of Equipment: " + this.equipmentType + "\n\n";
				let equipmentNum = "CMAC/SN:" + this.equipmentNum + "\n";
				let hasRemote = this.remote + "\n";
				let hasPwrCord = this.powerCord + "\n";

				let returnType = "Type of Return: " + this.returnType + "\n";
				let notes = "Notes: " + this.notes + "\n";

				let customerData = [heading, name, phone, address, account];
				let equipmentData = [equipmentType, equipmentNum, hasRemote, hasPwrCord];
				let returnData = [returnType, notes];

				customerData = customerData.join();
				equipmentData = equipmentData.join();
				returnData = returnData.join();

				console.log(customerData);
				console.log(equipmentData);
				console.log(returnData);

				let data = [customerData, equipmentData, returnData];

				data = data.join("\n");
				console.log(data);

				let doc = new jspdf({
					orientation: 'p',
					unit: 'in',
					format: 'a4'

				});
				doc.text(data, 2, 2);
				doc.save("return.pdf")
			},
		}
	}
</script>
<style>
	body {
		background-color: #4a5568;
		
	}
	
	input[type=number]::-webkit-inner-spin-button,
	input[type=number]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
