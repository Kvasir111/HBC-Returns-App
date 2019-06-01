<template>
	<div>
	<h1 class="text-2xl">HBC Return Exchange Form</h1>
	</div>
</template>

<script>
	import customerInformation from "customerInformation"
	import jsPDF from 'jspdf'

	export default {
		data() {
		},
		components: {

		},
		methods: {
			exportPDF() {
				console.log(customerInformation.data().customerName);
				//let doc = new jsPDF('p', `pt`);
				//doc.save("return.pdf");
			}
		}
	}

</script>

<style scoped>

</style>