<template>
	<div id="equipmentDiv" class="appearance-none mx-auto text-center bg-blue-200 px-2 py-4">
		<form class="block">
		<select class="p-2 m-2" v-model="selected">
			<option disabled value="" >Select Equipment Type</option>
			<option value="DVR/Set-Top Box">DVR/Set-Top Box</option>
			<option value="Gateway/Modem">Gateway/Modem</option>
			<option value="Wireless Router">Wireless Router</option>
			<option value="DTA">DTA</option>
		</select>
		<input class="p-2 m-2" type="text" placeholder="CMAC/SN">
		<input class="p-2 m-2" type="checkbox" v-model="toggle" true-value="yes" false-value="no">Power Cord?
		<input class="p-2 m-2" type="checkbox" v-model="toggle" true-value="yes" false-value="no">Remote?
		</form>
	</div>
	
</template>

<script>
	export default {
		name: "equipmentInput"
	}
</script>

<style scoped>

</style>