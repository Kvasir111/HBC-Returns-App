<template>
	<div class="container inline-block items-center">
	<form id="customer-information" class="content-center bg-blue-400 w-2/3 py-4 px-4">
		<input type="text" id="customer-name" placeholder="Customer Name" class="block px-4 py-2">
		<input type="tel" id="Phone Number" placeholder="Phone Number" class="block px-4 py-2">
		<input type="text" id="customer-address" placeholder="Address" class="block px-4 py-2">
		<input type="number" id="customer-account" placeholder="Account #" class="block px-4 py-2">
	</form>
	</div>
</template>

<script>
	export default {
		name: "customer-information",
		data(){
			return{
				customerInformation: [
					{"cName" : "Ryan"},
					{"pNumber" : "555-555-5555"},
					{"address" : "123 mullhoand drive"}
				]
			}
		}
	}
</script>

<style scoped>

</style>