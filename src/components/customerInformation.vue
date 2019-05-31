<template>
	<form @submit.prevent="onSubmit" v-model="customerInformation" id="customer-information" class="bg-blue-400 py-4 px-4">
		<input type="text" v-model="customerName" id="customerName" placeholder="Customer Name" class="px-4 py-2 m-2">
		<br>
		<input type="tel" v-model.number="customerPhoneNumber" id="Phone Number" placeholder="Phone Number" class="px-4 py-2 m-2">
		<br>
		<input type="text" v-model="customerAddress" id="customer-address" placeholder="Address" class=" px-4 py-2 m-2">
		<br>
		<input type="number" v-model.number="customerAccount" id="customer-account" placeholder="Account #" class=" px-4 py-2 m-2">
		<br>
	</form>
</template>

<script>
	export default {
		name: 'customerName',
		data(){
			return{
					customerName: null,
					customerPhoneNumber: null,
					customerAddress: null,
					customerAccount: null,
			}
		},
		methods : {
			onSubmit(){
				let customerData = {
					name : this.customerName,
					phone : this.customerPhoneNumber,
					address : this.customerAddress,
					account : this.customerAccount
				}
				this.$emit('customer-data-entered', customerData);
			}
		}
	}
</script>

<style scoped>

</style>