<template>
	<div id="notes">
	<span>Notes</span>
	<br>
	<textarea v-model="message" placeholder="Enter notes here"></textarea>
	</div>
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