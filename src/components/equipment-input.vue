<template>
	<div class="text-center">
		<table>
			<thread>
				<tr>
					<td>Equipment Type</td>
					<td>CMAC/SN</td>
					<td>Accessories</td>
				</tr>
			</thread>
			<tbody>
			<tr v-for="(row, index) in rows">
				<td><select class="form-multiselect bg-gray-200 m-2" id="equipmentDropdown"
				            v-bind:aria-valuemax="equipmentType"
				            v-model="equipmentType">
					<option class="" disabled selected>Select Equipment Type</option>
					<option value="DVR/Set-Top Box">DVR/Set-Top Box</option>
					<option value="Gateway/Modem">Gateway/Modem</option>
					<option value="Wireless Router">Wireless Router</option>
					<option value="DTA">DTA</option>
				</select></td>
				<td><input class="form-input inline" id="CMAC/SN input" placeholder="CMAC/SN" type="text"
				           v-bind:aria-valuemax="equipmentNum" v-model="equipmentNum"></td>
				<td><input class="p-2 m-2 form-checkbox" false-value="" true-value="Power Cord" type="checkbox"
				           v-bind:aria-valuemax="powerCord"
				           v-model="powerCord">Power Cord?
					<input class="p-2 m-2 form-checkbox" false-value="" true-value="Remote" type="checkbox"
					       v-bind:aria-valuemax="remote"
					       v-model="remote">Remote?
				</td>
				<td><a class="block mx-auto px-4 py-2 rounded-full bg-gray-200 hover:bg-blue-300 hover:font-bold"
				       style="cursor: pointer" v-on:click="removeElement(index)">Remove</a></td>

			</tr>
			</tbody>
		</table>
		<div>
			<button class="block mx-auto px-4 py-2 rounded-full bg-gray-200 hover:bg-blue-300 hover:font-bold"
			        v-on:click.prevent="addRow">Add More Equipment +
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "equipment-input",
		data: function () {
			return {
				equipmentType: null,
				equipmentNum: null,
				powerCord: null,
				remote: null,
				rows: [],
			}
		},
		methods: {
			addRow() {
				let elem = document.createElement('tr');
				this.rows.push({
					'Equipment Type': "",
					'CMAC/SN': "",
					'Accessories': ""
				});
			},
			removeElement(index) {
				this.rows.splice(index, 1);
			},

		}
	}
</script>

<style scoped>

</style>