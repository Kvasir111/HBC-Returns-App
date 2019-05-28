<template>
	<div class="mx-auto">
	<form class="text-left">
		<input name="equipment" type="radio" id="Swap" value="Swap" v-model="picked">
		<label for="Swap">Swapping Equipment</label>
		<br>
		<input name="equipment" type="radio" id="Cancelling" value="Cancelling" v-model="picked">
		<label for="Cancelling">Cancelling Service</label>
		<br>
		<input name="equipment" type="radio" id="Moving" value="Moving" v-model="picked">
		<label for="Moving">Moving</label>
		<br>
	</form>
	</div>
</template>

<script>
	export default {
		name: "returnInformation"
	}
</script>

<style scoped>

</style>