<template>
	<div id="app" class="">
		<img v-bind:src="image" v-bind:alt="logoAlt" class="mx-auto " width="200px">
		<h1 class="text-center text-2xl font-bold text-white p-2">Enter Information for Equipment Return</h1>
		<form id="information input" @submit.prevent="exportPDF" class="bg-white shadow-md w-2/3 mx-auto p-2">
			<div id="customerInformation" class="p-2">
				<div class="text-center">
				<input type="text" autocomplete="no" required v-model="customerName" placeholder="Customer Name"
				       v-bind:aria-valuemax="customerName" class="form-input m-2">
				<input type="number" min="0" v-model="customerAccount" placeholder="Account Number"
				       v-bind:aria-valuemax="customerAccount" class="form-input m-2">
				</div>
				<div class="text-center">
				<input type="tel" required minlength="10" maxlength="11" v-model="customerPhoneNumber" placeholder="Phone number"
				       v-bind:aria-valuemax="customerPhoneNumber" class="form-input m-2">
				<input type="text" required v-model="customerAddress" placeholder="Service Address"
				       v-bind:aria-valuemax="customerAddress" class="form-input m-2">
				</div>
				</div>
			<div id="equipment-type" class="text-center">
				<label for="equipmentDropdown" invisible></label>
				<select v-model="equipmentType" id="equipmentDropdown" class="form-multiselect bg-gray-200 m-2" v-bind:aria-valuemax="equipmentType">
					<option selected disabled class="">Select Equipment Type</option>
					<option value="DVR/Set-Top Box">DVR/Set-Top Box</option>
					<option value="Gateway/Modem">Gateway/Modem</option>
					<option value="Wireless Router">Wireless Router</option>
					<option value="DTA">DTA</option>
				</select>
				<input class="form-input inline" v-model="equipmentNum" type="text" placeholder="CMAC/SN"
				       v-bind:aria-valuemax="equipmentNum">
				<input class="p-2 m-2 form-checkbox" type="checkbox" v-model="powerCord" true-value="Power Cord" false-value=""
				       v-bind:aria-valuemax="powerCord">Power Cord?
				<input class="p-2 m-2 form-checkbox" type="checkbox" v-model="remote" true-value="Remote" false-value=""
				       v-bind:aria-valuemax="remote">Remote?
			</div>
			<div id="return-information" class="text-center">
				<select v-model="returnType" class="form-multiselect m-2 bg-gray-200">
					<option selected disabled>Select a reason for return</option>
					<option value="Exchange/Defective Equipment">Exchange/Defective Equipment</option>
					<option value="Cancelling Service">Cancelling Service</option>
					<option value="Moving">Moving</option>
					<option value="Other">Other, please leave notes!</option>
				</select>
			</div>
			<div id="notes" class="mx-auto block">
				<textarea rows="4" cols="50" placeholder="Enter notes here" v-model="notes" class="mx-auto block bg-gray-200 p-2 "></textarea>
			</div>
			<input type="submit" value="Submit" class="mx-auto newInput hover:bg-blue-300">
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
body{
	background-color: #4a5568;
	
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>
