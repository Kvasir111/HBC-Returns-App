<template>
	<div id="customer-information">
		<input type="text" v-model="customerName" id="customerName" placeholder="Customer Name" class="px-4 py-2 m-2">
		<br>
		<input type="tel" v-model.number="customerPhoneNumber" id="Phone Number" placeholder="Phone Number" class="px-4 py-2 m-2">
		<br>
		<input type="text" v-model="customerAddress" id="customer-address" placeholder="Address" class=" px-4 py-2 m-2">
		<br>
		<input type="number" v-model.number="customerAccount" id="customer-account" placeholder="Account #" class=" px-4 py-2 m-2">
		<br>
	</div>
</template>

<script>
	export default {
		data(){
			return{
					customerName: null,
					customerPhoneNumber: null,
					customerAddress: null,
					customerAccount: null,
			}
		},
	}
</script>

<style scoped>

</style>