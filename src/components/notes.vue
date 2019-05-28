<template>
	<form class="bg-blue-500">
	<span>Notes</span>
	<br>
	<textarea v-model="message" placeholder="Enter notes here"></textarea>
	</form>
</template>

<script>
	export default {
		name: "notes"
	}
</script>

<style scoped>

</style>