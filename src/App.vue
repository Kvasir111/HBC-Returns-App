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
				<CustomerInformation></CustomerInformation>
			</div>
			<div id="eDiv">
				<EquipmentInput></EquipmentInput>
			</div>
			<div id="rDiv">
				<ReturnInformation></ReturnInformation>
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
		data(){
			return {
				firstName: "Ryan",
				image: "https://www.hbci.com/wp-content/uploads/footer-logo.png",
				logoAlt: "Hiawatha Broadband Communications",
			};
		},
		methods: {
			exportPDF() {
				
				let doc = new jspdf({
					orientation: "p",
					unit: "in",
					format: "a4"
				});
				doc.text(data, 2, 2);
				doc.save("return.pdf");
			},
			printInputs(){
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
