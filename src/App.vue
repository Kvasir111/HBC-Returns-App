<template>
	<div class id="app">
		<img class="mx-auto" v-bind:alt="logoAlt" v-bind:src="image" width="200px">
		<h1 class="text-center text-2xl font-bold text-white p-2">Enter Information for Equipment Return</h1>
		<form
				@submit.prevent="printInputs"
				class="bg-white shadow-md w-2/3 mx-auto p-2"
				id="information input"
		>
			<div id="cDiv">
				<customer-information id="cInfo"></customer-information>
			</div>
			<div id="eDiv">
				<equipment-input id="eInfo"></equipment-input>
			</div>
			<div id="rDiv">
				<return-information id="rInfo"></return-information>
			</div>
		</form>
	</div>
</template>

<script>
	import jspdf from "jspdf";
	import EquipmentInput from "./components/equipment-input";
	import CustomerInformation from "./components/customer-information";
	import ReturnInformation from "./components/return-information"

	export default {
		components: {CustomerInformation, EquipmentInput, ReturnInformation},
		data() {
			return {
				image: "https://www.hbci.com/wp-content/uploads/footer-logo.png",
				logoAlt: "Hiawatha Broadband Communications"
			};
		},
		methods: {
			exportPDF() {
				let heading = "Customer Information: \n";
				let name = "Customer Name: " + this.firstName + " " + this.lastName + "\n";
				let phone = "Contact Number: " + this.customerPhoneNumber + "\n";
				let address = "Service Address: " + this.customerAddress + "\n";
				let account = "Account #: " + this.customerAccount + "\n";

				let equipmentType =
					"Type of Equipment: " + document.EquipmentInput.equipmentType + "\n\n";
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
					orientation: "p",
					unit: "in",
					format: "a4"
				});
				doc.text(data, 2, 2);
				doc.save("return.pdf");
			},
			printInputs(){
				let c = document.getElementById("cInfo");
				console.log(c)
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
