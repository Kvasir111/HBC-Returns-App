<template>
	<form @submit.prevent="onSubmit" id="customer-information" class="bg-blue-400 py-4 px-4">
		<input type="text" v-model="form.customerName" id="customerName" placeholder="Customer Name" class="px-4 py-2 m-2">
		<br>
		<input type="tel" v-model.number="form.customerPhoneNumber" id="Phone Number" placeholder="Phone Number" class="px-4 py-2 m-2">
		<br>
		<input type="text" v-model="form.customerAddress" id="customer-address" placeholder="Address" class=" px-4 py-2 m-2">
		<br>
		<input type="number" v-model.number="form.customerAccount" id="customer-account" placeholder="Account #" class=" px-4 py-2 m-2">
		<br>
	</form>
</template>

<script>
	export default {
		data(){
			return{
				form: {
					customerName: null,
					customerPhoneNumber: null,
					customerAddress: null,
					customerAccount: null,
				},

			}
		},
		methods : {
			onSubmit(){
				let customerData = {
					name : this.customerName,
					phone : this.customerPhoneNumber,
					address : this.customerAddress,
					account : this.customerAccount
				};
				this.$emit('updateCustomerData', customerData);
			}
		}
	}
</script>

<style scoped>

</style>