<template>
	<form v-model="customerInformation" id="customer-information" class="bg-blue-400 py-4 px-4">
		<input type="text" v-model="customerName" id="customer-name" placeholder="Customer Name" class="px-4 py-2 m-2">
		<br>
		<input type="tel" v-model="customerPhoneNumber" id="Phone Number" placeholder="Phone Number" class="px-4 py-2 m-2">
		<br>
		<input type="text" v-model="customerAddress" id="customer-address" placeholder="Address" class=" px-4 py-2 m-2">
		<br>
		<input type="number" v-model="customerAccount" id="customer-account" placeholder="Account #" class=" px-4 py-2 m-2">
		<br>
	</form>
</template>

<script>
	export default {
		name: "customer-information",
		name: "customerName",
		name: "customerPhoneNumber",
		name: "customerAddress",
		name: "customerAccount",
		data(){
			return{
				customerInformation: '',
				customerName: '',
				customerPhoneNumber: '',
				customerAddress: '',
				customerAccount:'',

			}
		}
	}
</script>

<style scoped>

</style>