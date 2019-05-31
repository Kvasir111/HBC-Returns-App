<template>
	<div id="equipmentDiv" class="appearance-none mx-auto text-center bg-blue-200 px-2 py-4">
		<form class="block">
		<select v-model="equipmentType" class="p-2 m-2">
			<option disabled >Select Equipment Type</option>
			<option value="DVR/Set-Top Box">DVR/Set-Top Box</option>
			<option value="Gateway/Modem">Gateway/Modem</option>
			<option value="Wireless Router">Wireless Router</option>
			<option value="DTA">DTA</option>
		</select>
		<input class="p-2 m-2" type="text" placeholder="CMAC/SN">
		<input class="p-2 m-2" type="checkbox" v-model="powerCord" true-value="Power Cord" false-value="">Power Cord?
		<input class="p-2 m-2" type="checkbox" v-model="remote" true-value="Remote" false-value="">Remote?
		</form>
		{{remote}}
		{{powerCord}}
		{{equipmentType}}
	</div>

</template>

<script>
	export default {
		name: "powerCord",
		name: "remote",
		name: "equipmentType",
		data(){
			return{
				remote: '',
				powerCord:'',
				equipmentType: '',

			}
		}
	}
</script>

<style scoped>

</style>