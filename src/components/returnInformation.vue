<template>
	<div id="return-information">
		<input name="equipment" type="radio" id="Swap" value="Swap" v-model="returnType">
		<label for="Swap">Swapping Equipment</label>
		<br>
		<input name="equipment" type="radio" id="Cancelling" value="Cancelling" v-model="returnType">
		<label for="Cancelling">Cancelling Service</label>
		<br>
		<input name="equipment" type="radio" id="Moving" value="Moving" v-model="returnType">
		<label for="Moving">Moving</label>
		<br>
	</div>
</template>

<script>
</script>

<style scoped>

</style>