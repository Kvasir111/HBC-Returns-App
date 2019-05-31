<template>
	<div id="app">
		<h1 class="text-2xl">HBC Return Exchange Form</h1>
		<customerInformation />
		<equipment-input />
		<return-information />
		<notes />
		<button type="submit" @click="updateCustomerData">Export</button>
	</div>
</template>

<script>
	import customerInformation from './components/customerInformation'
	import EquipmentInput from "./components/equipmentInput";
	import Notes from "./components/notes";
	import ReturnInformation from "./components/returnInformation";
	import jsPDF from 'jspdf'


	export default {
		data(){
			return{
				customerData: []
			}
		},
		name: 'app',
		components: {
			ReturnInformation,
			Notes,
			EquipmentInput,
			customerInformation,
		},
		methods:{
			updateCustomerData(e){
				this.customerData.push(e);
				console.log(customerData);
			},
			exportPDF(){
				console.log();
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
