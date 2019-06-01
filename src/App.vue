<template>
	<div id="app">
		<h1 class="text-2xl">HBC Return Exchange Form</h1>
		<form @submit.prevent="exportPDF" id="main-form">
			<customerInformation/>
			<equipment-input/>
			<return-information/>
			<notes/>
			<button>Submit</button>
			<br>
		</form>
	</div>
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
			ReturnInformation,
			Notes,
			EquipmentInput,
			customerInformation,
		},
		methods: {
			exportPDF() {
				console.log(customerInformation.data());
				//let doc = new jsPDF('p', `pt`);
				//doc.save("return.pdf");
			}
		}
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
