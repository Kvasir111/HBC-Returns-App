<template>
	<div class="mx-auto">
	<form class="text-left">
		<input name="equipment" type="radio" id="Swap" value="Swap" v-model="returnType">
		<label for="Swap">Swapping Equipment</label>
		<br>
		<input name="equipment" type="radio" id="Cancelling" value="Cancelling" v-model="returnType">
		<label for="Cancelling">Cancelling Service</label>
		<br>
		<input name="equipment" type="radio" id="Moving" value="Moving" v-model="returnType">
		<label for="Moving">Moving</label>
		<br>

		{{returnType}}
	</form>
	</div>
</template>

<script>
	export default {
		name: 'returnType',
		data() {
			return {
				returnType: ''
			}
		}
	}
</script>

<style scoped>

</style>