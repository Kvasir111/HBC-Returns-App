<template>
	<form id="customer-information" class="bg-blue-400 py-4 px-4">
		<input v-model="name" type="text" id="customer-name" placeholder="Customer Name" class="px-4 py-2">
		<input v-model="phone" type="tel" id="Phone Number" placeholder="Phone Number" class="px-4 py-2">
		<input v-model="address" type="text" id="customer-address" placeholder="Address" class=" px-4 py-2">
		<input v-model="account" type="number" id="customer-account" placeholder="Account #" class=" px-4 py-2">
	</form>
</template>

<script>
	export default {
		name: "customer-information",
	}
</script>

<style scoped>

</style>