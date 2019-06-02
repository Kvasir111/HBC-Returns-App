<template>
	<div id="app" class="">
		<img v-bind:src="image" v-bind:alt="logoAlt" class="mx-auto">
		<h1 class="text-center text-2xl">Enter Information for return</h1>
		<form id="information input" @submit.prevent="exportPDF" class="bg-white shadow-md w-2/3 mx-auto p-2">
			<div id="customerInformation" class="p-2">
				<input type="text" v-model="customerName" placeholder="Customer Name"
				       v-bind:aria-valuemax="customerName" class="cardInput mx-auto">
				<input type="number" v-model="customerAccount" placeholder="Account Number"
				       v-bind:aria-valuemax="customerAccount" class="cardInput mx-auto">
				<input type="tel" v-model="customerPhoneNumber" placeholder="Phone number"
				       v-bind:aria-valuemax="customerPhoneNumber" class="cardInput mx-auto">
				<input type="text" v-model="customerAddress" placeholder="Service Address"
				       v-bind:aria-valuemax="customerAddress" class="cardInput mx-auto">
			</div>
			<div id="equipment-type" class="text-center">
				<select v-model="equipmentType" class="p-2 m-2 bg-gray-200" v-bind:aria-valuemax="equipmentType">
					<option disabled>Select Equipment Type</option>
					<option value="DVR/Set-Top Box">DVR/Set-Top Box</option>
					<option value="Gateway/Modem">Gateway/Modem</option>
					<option value="Wireless Router">Wireless Router</option>
					<option value="DTA">DTA</option>
				</select>
				<input class="equipmentInput" v-model="equipmentNum" type="text" placeholder="CMAC/SN"
				       v-bind:aria-valuemax="equipmentNum">
				<input class="p-2 m-2" type="checkbox" v-model="powerCord" true-value="Power Cord" false-value=""
				       v-bind:aria-valuemax="powerCord">Power Cord?
				<input class="p-2 m-2" type="checkbox" v-model="remote" true-value="Remote" false-value=""
				       v-bind:aria-valuemax="remote">Remote?
			</div>
			<div id="return-information" class="text-center">
				<select v-model="returnType" class="py-2 m-2 bg-gray-200">
					<option disabled>Select a reason for return</option>
					<option value="Exchange/Defective Equipment">Exchange/Defective Equipment</option>
					<option value="Cancelling Service">Cancelling Service</option>
					<option value="Moving">Moving</option>
					<option value="Other">Other, please leave notes!</option>
				</select>
			</div>
			<div id="notes" class="mx-auto block">
				<textarea rows="4" cols="50" placeholder="Enter notes here" v-model="notes" class="mx-auto block bg-gray-200 p-2"></textarea>
			</div>
			<input type="submit" value="Submit" class="mx-auto block px-4 py-2 m-2 rounded hover:bg-blue-300">
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
				
				image: "https://bloximages.chicago2.vip.townnews.com/winonadailynews.com/content/tncms/assets/v3/editorial/4/44/4444c7a3-8473-5f32-be6e-c72a804dc6ee/59d7d6ed20146.image.jpg",
				logoAlt: "Hiawatha Broadband Communications"
			}
		},
		methods: {
			collateData() {
				return data;
			},
			exportPDF() {
				let name = this.customerName;
				let phone = this.customerPhoneNumber;
				let address = this.customerAddress;
				let account = this.customerAccount;
				
				let equipmentType = this.equipmentType;
				let equipmentNum = this.equipmentNum;
				let hasRemote = this.remote;
				let hasPwrCord = this.powerCord;
				
				let returnType = this.returnType;
				let notes = this.notes;
				let k = this.shit;
				
				let customerData = [name, phone, address, account];
				let equipmentData = [equipmentType, equipmentNum, hasRemote, hasPwrCord];
				let returnData = [returnType, notes];
				
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

</style>
