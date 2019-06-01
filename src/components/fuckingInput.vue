<template>
	<h1 class="text-2xl">HBC Return Exchange Form</h1>
	<form @submit.prevent="exportPDF" id="main-form">
		<customerInformation/>
		<equipment-input/>
		<return-information/>
		<notes/>
	</form>
</template>

<script>
	import customerInformation from './components/customerInformation'
	import EquipmentInput from "./components/equipmentInput";
	import Notes from "./components/notes";
	import ReturnInformation from "./components/returnInformation";
	import jsPDF from 'jspdf'

	export default {
		data() {
		},
		name: 'app',
		components: {
			FuckingInput,
			ReturnInformation,
			Notes,
			EquipmentInput,
			customerInformation,
		},
		methods: {
			exportPDF() {
				console.log(customerInformation.data().customerName);
				//let doc = new jsPDF('p', `pt`);
				//doc.save("return.pdf");
			}
		}

</script>

<style scoped>

</style>