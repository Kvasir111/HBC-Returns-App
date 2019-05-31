<template>
	<form class="bg-blue-500">
	<span>Notes</span>
	<br>
	<textarea v-model="message" placeholder="Enter notes here"></textarea>
		{{message}}
	</form>

</template>

<script>
	export default {
		name: "message",
		data(){
			return{
				message: '',
			}
		}
	}
</script>

<style scoped>

</style>