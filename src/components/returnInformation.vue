<template>
	<form>
		<input type="radio" id="Swap" value="Swap" v-model="picked">
		<label for="Swap">Swapping Equipment</label>
		<input type="radio" id="Cancelling" value="Cancelling" v-model="picked">
		<label for="Cancelling">Cancelling Service</label>
		<input type="radio" id="Moving" value="Moving" v-model="picked">
		<label for="Moving">Moving</label>
	</form>
</template>

<script>
	export default {
		name: "returnInformation"
	}
</script>

<style scoped>

</style>