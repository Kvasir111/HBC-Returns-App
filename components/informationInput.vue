<template>
	<div class="">
	<div class="">
		<form-header v-bind:card-subtitle="subtitle" v-bind:card-title="title"></form-header>
		<form v-on:submit="exportPDF" autocomplete="off"
		      class="card"
		      id="informationInputForm">
			<div class="mx-auto flex-wrap mb-2 text-center" id="customerInformation">
				<h1 class="font-bold text-xl text-left p-2">Customer</h1>
				<input :key="index" autocomplete="off" :placeholder="customerDataInputs.text"
				       class="w-full text-center md:w-1/4 m-2 mx-auto md:mx-2 md:text-left border-blue-500 p-2 bg-transparent border-b-2 focus:outline-none focus:text-black focus:border-blue-800"
				       type="text" v-for="(customerDataInputs, index) in customerDataInputs"
				       v-model="customerDataInputs.value"
				>
			</div>
			<div class="text-center mx-auto" id="equipmentInformation">
				<h1 class="font-bold text-xl text-left p-2">Equipment</h1>
				<div v-for="(row, index) in rows">
					<select
							id="equipmentType" required v-model="rows[index].device"
					        class="mb-2 border-b-2 border-blue-500 p-2 bg-transparent focus:outline-none">
						<option disabled selected> Select a Device Type</option>
						<option :key="index" v-for="(equipmentType, index) in equipmentTypes">
							{{equipmentType.text}}
						</option>
					</select>
					<input autocapitalize="characters" autocomplete="off" class="mb-2 border-b-2 border-blue-500 p-2 bg-transparent inline-flex m-2 focus:outline-none focus:border-blue-800"
					id="CMAC/SN input"
					maxlength="12"
					minlength="12"
					placeholder="CMAC"
					type="text"
					v-model="rows[index].equipmentNum">
					<div class="md:inline align-baseline">
					<label for="powerCord">Power Cord</label>
					<input class="m-2 form-checkbox text-blue-400" id="powerCord" type="checkbox"
					       v-model="rows[index].powerCord">
					<label for="remote">Remote</label>
					<input class="m-2 form-checkbox text-blue-400" id="remote" type="checkbox"
					       v-model="rows[index].remote">
						<button v-on:click="removeElement(index)" type="button"><x_button class="inline" color="#E81123" size="28"/></button>
				</div>
				</div>
				<div>
					<button class="" v-on:click.prevent="addRow">
						<add-button color="#00CC6A" size="28"/>
					</button>
				</div>
			</div>
			<div id="returnInformation">
				<h1 class="font-bold text-xl text-left p-2">Return</h1>
				<div>
					<div class="text-center" id="return-information">
						<select class="mb-2 border-b-2 border-blue-500 p-2 bg-transparent focus:outline-none" id="returnType" required
						        v-model="returnType">
							<option disabled selected>Select Reason</option>
							<option :key="index" v-bind:value="returnOption.value"
							        v-for="(returnOption,index) in returnOptions">
								{{ returnOption.text }}
							</option>
						</select>
					</div>
					<div class="text-center mx-auto" id="notes">
						<textarea class="w-full text-center md:text-left md:w-2/3 p-2 border-2 border-blue-500 rounded bg-transparent focus:outline-none"
						          id="explanation"
						          rows="4"
						          v-bind:placeholder="returnType"></textarea>
					</div>
					<input class="submitButton hover:cursor-pointer" id="sButton" type="submit" value="Submit">
				</div>
			</div>
		</form>
	</div>
	</div>
</template>

<script>
	import FormHeader from "./formHeader";
	import jspdf from 'jspdf';
	import firebase from '@/plugins/firebase'
	import X_button from "./x_button";
	import AddButton from "./addButton";

	export default {
		name: "informationInput",
		components: {AddButton, X_button, FormHeader},
		created(){
		this.addRow();
		},
		data: function () {
			return {
				//data for page heading
				title: "HBCI returns",
				subtitle: "Please enter information for return",

				//array for data inputs
				customerDataInputs: [
					{text: "First Name", value: ""},
					{text: "Last Name", value: ""},
					{text: "Account #", value: ""},
					{text: "Phone #", value: ""},
					{text: "Service Address", value: ""},
					{text: "Email", value: ""},

				],
				//data for return reasons
				returnType: 'Select Reason',
				returnOptions: [
					{text: 'Exchange/Defective Equipment', value: 'Enter CMAC/SN of device being exchanged'},
					{text: 'Cancelling Service', value: 'Enter Reason and forwarding address'},
					{text: 'Moving', value: 'Enter Forwarding Address'},
					{text: 'Other', value: 'Enter Notes'}
				],
				//data for equipment
				equipmentType: "Select a Device Type",
				equipmentTypes: [
					{text: "Modem/Router", value: "Modem/Router"},
					{text: "DTA", value: "DTA"},
					{text: "Gateway", value: "Gateway"},
					{text: "DVR/STB", value: "DVT/STB"}
				],
				//contains the rows of data entered for the equipment
				rows: [
				],
				//for looping
				equipmentItem: [],

				//data for headings
				image: "https://www.hbci.com/wp-content/uploads/footer-logo.png",
				altImage: "https://bloximages.chicago2.vip.townnews.com/winonadailynews.com/content/tncms/assets/v3/editorial/4/44/4444c7a3-8473-5f32-be6e-c72a804dc6ee/59d7d6ed20146.image.jpg",
				logoAlt: "Hiawatha Broadband Communications",
				yCoordinate: 155,
				leftMargin: 72,
				myFontSize: 12,
				lineSpacing: 1,
				fileName: this.fileName + "_return.pdf"
			}
		},
		methods: {
			//adds row to equipment table
			addRow() {
				let elem = document.createElement('tr');
				this.rows.push({
					'Equipment Type': "",
					'CMAC/SN': "",
					'Accessories': ""
				});
			},
			//removes a row from equipment table
			removeElement(index) {
				this.rows.splice(index, 1);
			},
			//top level function to making the PDF, calls the 4 write functions to help improve sanity of making the output
			exportPDF() {
				let doc = new jspdf({
					orientation: "p",
					unit: "pt",
					format: "a4"
				});
				doc.setFontSize(this.myFontSize);
				//adds HBC logo to the top
				let img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAEDAgMDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6pooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAT8aWopJo4v9Y6L9Tiqr6pYL968gz6BwaxnVhT+KSXqwL/NHNZMmv6anW6BP+ypP9KryeJtPH3Wkb6J/jXPLMMLHerH70OxvUVzZ8V2faGc/gP8aibxbCPu2sh+rgVhLOcFHeovx/yDlZ0/PfrQM5rl01nUL2TbZQBB/wB9H8SeBWnY3l0soh1GHy2flHXofY471pSzCjWdoJ272dvv/wAwsa9FFFeiIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKBVWe9trc4mniQ+jMBWcpxirydkBZorFm8RadFnExkYdkU/wD6qoy+Loh/qbV2/wB9gv8ALNcNXNsHS+Kovlr+Vx2Z1BbFGeK4ebxTevkRpCg+mT/P+lUp9b1Gb7904H+yAv8AKvPqcSYWPwpv5W/N/oOx6ISAMngVUl1Kzi4kuoVPoXGa84lmlmP72V3/AN5iajrhqcUS/wCXdP73/wAALHfS+I9OjziZpD6KhqnJ4stx/q7eVv8AeIFcbRXDU4jxkvhsvRf53Cx0svi2dv8AU20af7zFv8Kqy+JtRfO14o/91P8AHNYlFcU83xs96j+Wn5WHZGhLrOoy/eu5P+A/L/Kqsl1cSf6yeV/95yahorkniKtT45t+rYBRRRWABRRRQAVb063NxcIi8kkAfU1Urb8Lsq6lbliB8zD8SCBXXgaSq4iEJbNr8wOzsrWOzgWKIcDqe5PqalkjWQbWHGQfxBzUmabuG/b3xmv05RjGPIlpsQPooorQAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAEpahnnigXdPIsa+rHFZN34jsIThZGlb0jX+p4rmrYqjQ/iTS9WFjbApa4258WSkYtrdEHq53foMVl3OtahccPcuo9E+X+VeRW4iwlP4Ly9Fb87DsegT3EUC7ppEjX1ZsVmXPiHT4SQJ/MPoik/r0rgnZnYszFie5OTTa8qtxNWf8ACgl66/5DsdZceLF6W9sx93bH6Cs2fxLqMn3Hjj/3E/xzWLRXl1s4xtXeo16afkOyLU9/dz/625lYem44/KqtFFedOcpu822/MAoqWK3ml/1UUj/7qk1bi0fUJfu2kn/Aht/nVww9Wp8EW/RNgZ9FbcfhnUn+8kaf7zj+masxeE7k/wCtuIl/3QT/AIV1wynG1Nqb+en5hdHN0V10fhKMD95duf8AdTH9TVhPCtkp+aSdvqR/hXVDh/Gy3il6tfpcV0cTRXfx+HdNTrAWPu7f41YXRtPQcWkX4jP866Y8M4l/FKK+/wDyC55xRXpqWFpH9y2hX6IBU6IifcRV+grePC8vtVV93/BQcx5esMrfdic/RSalFldn7trOfpGf8K9OpcVtHheHWo/u/wCCHMeZrpl8wyLSf8UIp40i/P8Ay7S/lXpHNH4VouGKHWb/AAC553/YWpf8+rf99D/Gj+wtS/59W/76X/GvRKKv/VnDfzS/D/IVzzv+wtS/59W/76X/ABqe10jU43H+jOoznO4cH1613vFLVR4bw8HdTl+H+QXMi1/tbAWcwgf3iMn8hWlFGEXGSSeSx6k1JzS9q9ylS9mrXb9XcQUUUVuAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFBOBk9KAGkUuay7vXLC1BDTB3H8MfzGsO88VyNkWsAQf3pDn9BXmYjNcJhtJzV+y1f4fqM7DPFULvVrG1BEtwgYfwr8x/IVwl3qd5d58+4dgf4RwPyFUq8PEcUdKEPm/8l/mOx1134sjHFrbs5/vOcD8qx7vX9QuOPO8tfSMY/Xr+tZNTQWs9wf3EMkn+6pNeNVzXG4p8vM/RaflqOyI5JHkYtI7Ox6ljk02tmDw5qMoBaNIgf77f0Ga0rfwkNoNxcn3CLj9T/hSpZRja+qg/np+YXRylFd/b+HtPhIJhMh9XYn9OlaMFrBb/AOohjj/3VAr06XDFaX8SaXpd/wCQrnnMGn3c+BFbzEHvtIH51oReGtRkA3Rxx/77j+ma71RijpXoUuGsPFfvJN/cv8/zC5yEHhOQ/wCuuVX2VM/4Vdj8LWa8u8z+2QBXR5pua9Cnk2Cp7U7+t2F2ZkWhabF921Un/aYt/M1cisraH/VW8Sf7qAVYoIruhhqNP4IJeiRItFFFdABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAN9K5H4jeMoPBWjQ389q10ZphCsSuEPQnOcHjj9a64ngV87/ALTerCTV9H0tekEL3Dc9S52j8th/OunA0FXrxhLbqcuLrOjRc479DV/4aDtf+hfn/wDAof8AxNH/AA0Ha/8AQvz/APgUP/ia+fc0Zr6T+ysL/L+L/wAzwP7RxP8AN+C/yPoL/hoO1/6F+f8A8Ch/8TR/w0Ha/wDQvz/+BQ/+Jr59zRmj+ysL/L+L/wAw/tHE/wA34L/I+0PAPiU+LPDsWrfYntI5XdURn3khTjOcDuCPwrpMA1z/AMP9L/sbwVotiy7ZIrZPMHo5G5v/AB4mugPFfJ1OXnlybX0PpKXNyLn3tqLS1BcXMVvFvmkWNfVjisG+8UW8eVtI2mb+8flX/E1w4jHUMMr1ppeXX7tzax0v1NZ99qtlZZE067x/AvJ/IVxV7rN9d5DzFE/ux/KP8aza+exPEy2w8fm/8l/mOx1F74rdsraQBf8AbkOf0H+NYV5qF1eH/SJ3cf3eg/IcVh6prmmaUD/aF9BC2M7C2WP/AAEcn8q47VPidZRZXTLOa5b+/IfLX+pP6Vx0sNnGc/w4ylF/KP36Ixq4qjR+OSX5noVQXl5bWUfmXlxDBH/elcKP1rxPVPH2u3+VS5W0jP8ADbrtP/fRyfyNcxPcTzymW4lklkPV5GLE/ia+hwXh9iJ2eKqqPktX9+iX4nnVc4gtKcb+uh9M+FZbbxS90NIuY5ktSqyyYIUE5wAcc9O3tXYW/hSJQDPcO59EG0f1rlP2d9MNj8P1uWXDX9w83P8AdHyD/wBBJ/GvUQcitJcPYHC1ZQScraXb/wArI9ChVlUpxnLd6nO61Dp+gaDqGoi2jP2S3eb58tkqpPf6V4OPjv4pxgWWjcf9MZP/AI5XqP7QGp/2f8O7mEHbJezR24+md5/RCPxr5WPBr6zJstw7pOXIt/Q8rMsXUp1FCm7aHrH/AAvnxT/z56N/35k/+OUf8L58U/8APno3/fmT/wCOV5LRXs/2bhv5PzPM+vYj+dnrX/C+fFP/AD56N/35k/8AjlH/AAvnxT/z56N/35k/+OV5LRR/ZuG/k/MPr2I/nZ61/wAL58U/8+ejf9+ZP/jlH/C+fFP/AD56N/35k/8AjleS0Uf2bhv5PzD69iP52evRfHvxIM+dYaUw7bY5F/8AZzViH4+ayCfO0mxcdtrOv9TXjPFLxS/s3DfyfmV9exC+0z3+x+P8RYC/8PyIueWguQxx9Co/nXZaD8XvCWsOI2vXsJj0S8TYP++hlR+Jr5OxSgDuaxq5Rh5fDdej/wAzaGaV4/E0/l/kfd0MqTRLJEyujDKspyCPUGpccV8ceBfHmr+D7xDZStPYbv3tnIxMbDuV/ut7j8cjivqvwp4isPE+iQ6lpkm6GThlP3o2HVWHYj/A9CK8LGYGeFd3rF9T2MLjIYhWWj7G9RRRXGdoUUVFJIsSM8jBUUFizHAAHUk0APxUNxNHbwtLO6JGgyzOcAD1J7V5F47+NWn6W8tn4cRNRu14NwxxAh9u7/hge5rwvxN4r1rxNceZrGoTXIBysWdsafRRwPrjNelhsqrVvel7q/H7jzcRmVKl7sfef4fefSXiH4weFdI3JFdvqM4/gs13j/vs4X8ia891f4+30hI0jRreEdmuZTJn3wu3H5mvETmgV7FLKMPBe8r+p5dTMq89nb0PRr34y+M7gnytQgtQe0Nsh/8AQgT/APqrLl+J3jGXG7XbkY/uqi/yFcdk0n412LCUFtBfcjleJrPeb+9nbwfFXxpAQU12U4GPnhib+amtzTvjh4pt2Au1sLxe++Eox+hUgD8q8spaiWBoSVnBfcUsXXjtN/efRugfHnSbplj1rT7mwY8eZG3nIPc8Aj8Aa9R0PXdM1+0+06NfwXcPGTG2SuezDqp9iAa+IjgHg1c0nU77SL2O8025mtbhDlZI2wfofUex4NcFfJ6UtaT5X96/zO2jmtSOlRXX3M+5x0oryP4U/FePxFLHpOv+Xb6qRiKVflS4Ppjs/t0Pb0r1w+9fP1qE6EuSorM9yjWhWjzweg6iiiszUKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigBnvXyD8ZNU/tX4iazIpzHBILZR6eWAp/8eDH8a+s9WvY9P026vJv9VbxPM/bhQSf5V8OXc8l1eTXMxzLM7SOfVicn9TXt5JSvOVTsrff/AMMePm87RjDvr9xFRRXceC/hp4g8U+XNDALKwbn7VcgqGHqi9W+o49xXvVK0KUeabsjxKdOdSXLBXZw7A55ruvh/8O9b8SX9lcGweLSBKjyz3HyK8YIyFB5YkZxgYz1Ir2Hw94D8JeENslxH/a+pr/y0nUMFP+yv3V/HJHrW3qHiC8ugUjbyIv7qHn8+v8q+OzXjLDYW9Oj70vL+tPnr5Hs4fKXpKs/kjrr7VLOyUiaYeYP4F5b8v8a5y+8UTy5W0jEK/wB5uW/+t+tc8qtI4Cgs7HoBkmtix8OXtzhpQIIz3f735f44r8/qZrj8wfJhotLy3+cun4HuWSMmeeW4ffPI0jerHNSWlncXbbbaF5D6gcD6noK7Sx8OWVtzIpnf1fp+XSthFWNAqqAB0A4rXD8N1aj58TO3ktX9/wDw4XOPsvC00mGu5hEP7qfMfz6fzrxr46arNpXiOLRtIup4IY7ZXnKOQzuxJwSP9nH5mvpYdPavjH4lal/a/jvW7zO5WuWjQ5zlU+RT+SivtOH8kwdKtzKmnyrd66/P9DzM0rShSSTs2zmWJZiWJJJySetJRRX3p8wFKASQACTR3ro/h5pn9seOdFsdu5HuVZ19UX52/wDHVNZ1aipxcn0NIRc5KK6n1z4R0z+xvDGl6ceGtrZI2/3gOT+ea2cdaWjNfDOTbbZ9lGKikl0Pnv8Aaf1TffaNpSH/AFcb3Lj13Hav/oLfnXh/8IruPjZqf9qfEjVGDZit2W1T22ABh/31urhzxxX2OAp+zw8I+V/v1PlMbU568n5/loMooorsOQdyKK7r4MaFB4g8e2tvfwpPaQRSTzROMqwAwMj03MtfSQ8BeEx/zLul/wDgOv8AhXmYrM4YafI02z0cPgJ4iHOmkfGNFfZ//CAeE/8AoXNM/wC/C01vh/4TZSp8O6bg8cQAH8xXP/bdP+V/gb/2PU/mR8ZU7pxX0N8Rfg5pkmmXF/4Wie2vIkL/AGQMXjmA6hc5Ib07dsDOa+ea9DC4ynio80OhwYjDTw8uWY2iiius5hy9a9V/Z21+TT/GB0mRybTUUIweglQFlPtkBh78eleVCuq+FSyH4h+HxF977UpP07/pmuXGwU6E1Lszpws3CtFruj7MoopjsEUszBVAySTwBXxZ9eZ2t6rZ6Lp09/qdwlvawruZ2/kPUnoAOTXzD8TPibf+LZ5LSyaSy0YHAhBw0w7GQj/0HoPfrTfjB47k8W6ybWzkYaNZuRCo6St0Mh+vOPQe5Nee8g+9fSZdlyppVaq978v+CfPY7Huo3Tpv3fz/AOANooor2jyB1FJ1q9pWlX+r3P2fS7Oe7n67IULED1OOg9zSbUFdjSbdkUsUYr0S0+DXjOeMO1jBb5GQstymf/HSaivvhB4ztFZxpaXCL18m4jY/gCQT+Arn+t0L25196Oj6rWtfkf3M8/patajp17plybfUbO4tJxzsnjKHHrg9veqtdCaaujnaadmNooopiJEdo3WSNirghlZTggjoQa+tPg74vPizwqrXbg6lZkQ3Pq/Hyv8A8CH6g18kn09K9U/Z11V7Px4bIsRFf27pszwXT5wfwAf8zXmZph1VoOXWOv8Amejl1d06yj0lp/kfUVFFFfKH04UUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHn3xw1Mab8ONT2nbJdbbZPfcw3f+Ohq+c/BngXXfFsw/sy1K2gOHu5vliX15/iPsM19QeNNO0TU4rRNfX7VHay+eltnh3wQCw7gZPBOPXNY93q8rwrb2iLa2iAKkUY2gAdBx29hgVnV4nw+U0XSj71Rv7v6/pM4K+A+s1eeb91IxPDfgDwv4PAlvgus6sveRRsjb/ZXkD6nJrc1HWry9+Uv5UXTZHxx7mua1nW9P0aHzdRukhyMqucs30UcmvNfEPxMu7gvFosItoz/y2kAaQ/QdB+tfOR/triWd6aah32X39fRL5Gk62GwUeXbyW/8AXqen6nqljpcHm6hdRQJ23ty30HU/hWt4AFp4t0+bUITMlrHMYV3KFMhABLD0HOPXg9K+Xbu7uLu4aa6nkmlbq8jFifxNfXXwk0z+yvh1okBGHkg+0NxzmQl+fpuA/CvYfB+Fy+kp15OpNv0S+W7+b+RjhcfPE1WkrRS+Z1Vnp9vZLi2hVPUjqfxq2fagUV1xhGEeWCsvI9IWiiitBGP4r1IaP4b1PUuptLaSUA9yFJA/E4FfEJYsxLEknkk9TX1L+0Jqf2H4ey26nD308cA9cA7z/wCgY/GvlntX0eS07U5T7v8AI+ezapepGHZfmJRRRXtnkC167+zbpn2rxndX7LlLK2IB9Hc4H/joevJB1r6T/Zp0z7N4SvtQdQHvbrAPqiDA/wDHi9edmlTkw0vPT+vkd+XU+fER8tT18Cq99cxWNlPd3BxFBG0jn0UDJ/lVntXCfGvVP7L+HGrsGxJcILZffeQGH/fO6vlKUXUnGC6ux9LVn7ODn2R8m391JfX9zdznMs8rSufVmJJ/U1WopRX3aVtEfGN31YlFFFMR75+zBpny63qjrxlLWNvzZh/6BXvQ4FeefAnTBpnw3sCy7Zbtnun99xwp/wC+QtehNxXxePqe0xE5edvu0PrcFD2dCK8r/fqPooorlOsiYgA54HrXwzqrxyaneyW+PJeZ2THTaWOP0r6Y+NnjmDw7oU+lWc27V72MqFU8wxngufTjIHfPPavlzrgV9DktGUYyqPrt8jwM1rRlKMF03G0UUV7p4w73r1L9nfRm1Dx0L9lJg02FpCccb3BRR+RY/wDAa8ytrea6uYra3jeaaRgiRoMsxPAAHc19dfCrwkng/wALxWsoU6hOfOu3Bz85H3QfRRx+Z715eaYlUaLgt5af5npZdQdWspdI6/5Ha4xXj/7Qni86VoaaFZSFbvUVJmI6pB0I/wCBHj6Bq9auJ47aB5pmCRRqWdm6KAMkmvi/xx4gm8T+Kb/VJiwWaQiJT/BGOFH5AZ9814+VYb21XmltH8+h6mY4j2VLlW8vy6nP0UUV9YfMi9KUUHk1t+DfD1z4n8R2elWmVMrZkkxkRxjlmP0HT1OB3qZyUIuUtkXGLm1Fbs6b4WfDm48ZXbXFy72+jQMBJKB80p/upn9T296+oNC0XTtCsEtNIs4ra3X+GMdT6sepPucmnaJplpoul22nafEsdrAgRFHp6n1J6k9ya0QR618djMbPEzu9F0R9ThcLHDx7y6sdRRRXIdhjeI9B03xFp72Wr2sdxC3TcPmQ+qnqD7ivkf4heFZfCHiWbTXkMsBUS28pGC8ZzjPuCCD7ivs7r9K83+Lfw8n8cSabJZ3kNrJaCQOZELbw23HT0wfzr0ctxn1epab91nnY/C+3hzQXvI+U8+9Gfeva/wDhn/VP+g1Z/wDfpqP+Gf8AVP8AoNWf/fpq97+08L/P+Z431DEfyfkeLDk9a7b4LOV+J2hlWIPmOOPQxODXZ/8ACgNUH/Mas/8Av01dF8PPhFeeFfFtnrF1qdvcLbiTbHHGwJLIV6n/AHjWGIzLDypTjGV20+/Y1oYKvGrGUo6Jrt3PaqKKK+XPpQooooAKKKKACiiigAooooAKKKKACiiigAo+tHesjWNYt9NUqf3k5HEY6/j6CsK1enQg6lR2SA0Jpo7eJpJnVEHVmPFcpqviZ3zHp4KL0MrDk/Qdqxr6+udRnBmYtk4WNRwPoK1dP8Onyjcak/kwqpYrnnA5yT2r5ermWKzGbo4FNR6vr9/T8yrW3OS1jVrTTIGutUuliUn7znLMfYdSfpXmHiP4lXNxvg0OM20fTz5AC7fQdF/U/SuL17UptX1a5vJndhJIxRWYnYpJIUZ6ACs7vzX22T8E4XCWq4v95Ps/hXy6/P7j5zFZpUqXjT0X4ktzcTXU7zXMryyscs7sWJ/E1DRS19tGKiuWOiR5Ld9WKOlevQfHbW4IUih0vTFRFCqoD4AHAH3q8horCthade3tFexvSr1KN/Zu1z2H/hfmv/8AQN038n/+Ko/4X5r/AP0DdN/J/wD4qvHeKOKw/s3C/wAn5mv17EfzM9i/4X5r/wD0DdN/J/8A4qj/AIX5r/8A0DdN/J//AIqvHeKOKP7Nwv8AJ+YfXsR/MztPiB8QdS8bR2UeoW9tbx2pdlWAN8xbAyck9McfU1xZ6UtJXVTpQox5IKyOepUlUlzTd2JRRRWpkL3r7N+GWmf2R4C0Oz27XW2V3Hoz/O36sa+RvDGmnWPEel6cAcXNzHE2Oylhk/gMmvt9QFAAAAHQCvn87qaQp/P+vxPcyinrKfyFxXh37Tup7LDRdLRv9ZK9y4/3RtX/ANCb8q9yHQ18p/tAal9v+ItzCrZjsoY7cemcbz+r4/CuHKqXPiE+12dmZVOSg130PNaKKK+uPlwooooA9p0r45y6ZpdpYweHofKtoUhT/SiOFAA/h9qt/wDDQVz/ANC9D/4FH/4ivDO1LXB/ZuGevJ+L/wAzuWYYhL4vwX+R7e/7QF6VITQYA3Ym5JH5bRWHrXxu8T30DQ2UVnYKwx5kaF5B9CxI/TNeVnNJRHLcNF3UF+YpY/ESVnImu7me8uZbi7mkmnkO55JGLMx9ST1qOitLQrGxvrry9R1aDTYunmPFJIfwCKf1IrsbVONzkScnYzB7jNa3h7w/qfiK+Fro1nLcyHrtGFQerMeFH1r23wH8LvBF9tm/txfEEictHHII0H1RTuH4mvYtM0yx0yzW0020gtbdekcKBF+uB3968fE5xGHu043fnp/wfyPWw+Vyqe9Udl5a/wDAOD+F3wxtfCW2/v2S71plx5oX5IAeoTPOT0Ldcccc59MAopTXz9WrOrLnm7s9ynShSjyQVkeZfH3Xv7H8CTW0LEXGov8AZhjqE6ufpgbf+BV8r9K9d/aU1Y3Xi+001WzFY2+4j0kk5P8A46EryKvqMro+zw6fV6/18j5zMqvtK7XRaDaKKK9M84cegHpX0Z+zd4cFrol3rs6fvr1jFCSOkSnkj6sD/wB8ivnaFGmkVI1LOxCqo6knoK+3PDOlx6H4f07TIsbbWBIsgfeIHJ/E5P414uc1uSkqa+1+SPWyqjzVXN/Z/NmvRRRXzZ9EFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFADaWk7Vx/iLXTIXtbNiFzh5Afvewrgx2OpYKn7Sp8l1bGlcta74hEO6CxYNJ0aTsv09TXO2FhdanO2wFucvIx4H4+tXtC0KS+2y3GY7ft6v9Pb3rtLeCK3iWKBVSNegFfP0cFiM2mq+LfLDov8v892PYo6To9tp6goN8veRhz+HoKw/ixqn9k/D7W7kErI0BgQjruchBj/vrP4V2Arxf9prU/J8O6VpqNhrq4MrAd1Ren5uD+FfY5bhacakKNONo32OXF1OSjKXkfONFFFfeHx4UUUUAOor17wz8FbrXNAsNTbV4rUXcQmEJtyxVTyOdwzkYP41p/wDDPtz/ANDDD/4Cn/4uuB5nhotpz28n/kdywGIkrqP4r/M8Nor3L/hn25/6GGH/AMBT/wDF0f8ADPtz/wBDDD/4Cn/4uj+1ML/N+D/yH/Z2J/l/Ff5nhvvS17l/wz9c/wDQwQ/+Ap/+Lrm/Hvwobwd4ffVLnWIrrEixpCtuVLsT67j0AJ6dqccxw85KMZXb8n/kTLA14RcpR0Xmv8zy+iiiu44gooooA9N/Z8037f8AEOGdhlLGCSfkcZI2D/0PP4V9UY4FeIfsx6Z5ema1qbjmaZLdCewQbjj67x+Ve4V8jmtXnxDXayPqMtp8mHT76jXYRoWYgKBkk9hXw94j1E6vr+paiSf9KuJJRnsCxIH4DAr64+KGp/2T8PtduwxV/szRIR1DP8ikfiwNfGuOa78kp6TqfI4s3qaxh8xKKKK988QdmijNfQ/wL8FaPf8Agr+0dZ0y0vZbm4donniDFUXC4Gf9pWrkxWLjhoc8lc6sNh5YifJHQ+d80Zr7O/4QHwn/ANC5pn/fhaP+EB8J/wDQuaZ/34WvO/tun/Kzu/sep/Mj4zIY9aSvr+9+GPg69QrJoNtGT3hLREfTaRXj3xQ+Eg8PafLq2gzyz2MXM8EvLxDP3gR1X1yMgc5POOihm1GtJQ1TfcxrZbWpxctGl2PH6KKK9Q80lhlkglSWGR45EOVdCQQfUEdK9b+Hfxjv9MnisfFDtfaeTtFy3+uh9yf4x6559z0ryA0tc+Iw1PER5aiudFGvOjLmg7H3bZ3MN5bxXFrIksEqh0kU5VlIyCD3FWO1eJfs2eIZbrTL/QrmTd9iImt8nJEbZ3L9A3P/AAKvbBXx2IoOhUdN9D6mhWVamprqfGnxRvjqPxB1+cnOLpoQfaP5B+i1ytXdbmNxrN/O2d0lxI5ycnJYmqn8Nfa0oclOMeyR8nUlzTcu7GUUUVoZHU/DKxGo+P8AQrdhkfa0kI9Qnzkf+O19mgV8l/AWMSfFHSSf4FmYe/7px/WvrU9a+Yzp3rRXl+rPo8oj+6b8/wBELRRRXkHqhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRTc1m65fDT7CSUH94flQe/+eaxq1o0oOpLZK4GN4q1crusrducfvWB6f7NV/Deh/adt1eL+56oh/j9z7fzqt4e0w6leNNcZaBDlyf4m9P8AGu6ChVwvA9q+bwOGnmVZ43FL3fsx/rp+b8inpoPAAAAAApaKK+qJENfLv7Rmpfa/HaWSsStjbIhX0dvnJ/IpX1AO9fE3jfUjrHi7V9Q3blnupCh/2AcL/wCOgV62S0+as59l+f8ATPKzWpy0lHu/yMOiiivqD5wf/DU1jbSXt7b2sIzLPIsSD/aJAH6moO1dv8F9LGq/EjSEdcxW7tdP7bASp/7621jWqezpyn2VzWlD2k1Duz610+1jsbG3tIBiKCNYkHoqjA/lVqgUV8OfZWtoFFFFAxuOa8I/ae1QLb6JpaNyzvdSL6YG1T/489e7Zwa+UPj3qX9ofEa8jU5jsoo7dfqBuP6sR+FehlVP2mJT7Jv9DgzKpyUGu+h5zRRRX1x8sFFLVnTrSS/1G1s4f9bcSrCnGeWIA/U0m0ldjSu7I+tPgzpn9mfDnRkK4eeM3Le/mEsP/HSv5V3Haq9pbx2dpDbQjEUKCNB6ADAqfPGK+EqydWbm+rufZ04ezgoLojx79pfU/s/hXT9OVsSXlyXI9UQc/qyV82HrXrX7SGp/avG8FkrZSytVBHo7ncf02V5LX1eWU/Z4aPnr9/8AwD5rManPiJeWglFFFeicApP619reBdN/sbwdo+nldskNsgcf7ZGW/wDHia+RvA+mf2z4w0fTyu5JbpA4x/ADlv0Br7Y4zXz2d1NYU/n/AF+J7uUU/in8v6/AdRRRXhHtjO1ZXivyv+Ea1f7Rt8n7JLv3dNuw5z7Vqj0ryn4++LItH8MSaPBIDqOpLs2g8pDn5mP1wVH1PpWlCk6tRQj1Ma9RUqblLsfMFFFFfdHxoUUUUAeu/sz7v+E7vsZ2f2c+fTPmR4/rX0u3Irwf9mHSyI9b1Z14JS1jb6ZZx+qV7z3FfIZnJSxUmvL8j6nLYtYdX63Pg2VXSV1kyHViG5zz3plaXiS2+yeItVtcf6m7li/JyP6Vn19bF8yTPmJKzsNoooqiTt/gzdrZ/EzQ5HbCPI8R5xkvGygfmRX2APevhGxuZbG/t7u3bbPbyLLG3oykEH8xX2l4R1628SeHrPVbNgUnQFlByY3/AIkPuDxXzmd0n7SNTpse9lFVcsqfXc3aKKK8Q9oTtSHntSZrnvGfirTvCelPe6nMBwfKhB+eVv7qj+vQd6Ixc2oxV2yZSUFzSdkP1rxXoWg3EcGsanb2k7rvVJGwSuSM/TINZ/8Awsjwh/0MFl/30f8ACvlHxZr154m1651S/I82U/Ki9I1HRR7Afnye9Y9fQU8lhyrnk79Tw55tNSfJFWPsj/hZPg7/AKGCy/76P+FH/CyfB3/QwWX/AH0f8K+OM+9GfetP7FpfzP8AAn+16v8AKvxPtbQ/Fmha9cvb6PqUF5OieYyRkkhcgZ6e4reJ4rxb9mrRDa6Hf61MuDeSiKHI/gTOSPqxI/4DXtVeDiaUKVVwg7pHsYapKrSU5qzYtFFFYnQFFFFABRRRQAUUUUAFFFFACH1rjPGlw0l9Fbj7sabse5//AFCuz7Vw3iEgeJlLj5CYyfccV4PEEmsKoL7Ukn+f6DR1Wj2YsrCGHADAZf3Y9avYp1FexTpRpwUI7JWAKKKK2Ec/471P+x/B2sagrbXhtnKH/bIwv6kV8UnrX05+0dqf2TwPFZK3zX1yqEeqL85/ULXzF719LktPlpSn3f5f0z57Nql6qj2X5iUUUV7J5AvavcP2YtM36jrOqMuBHGlsh9dx3N+W1fzrxDvX1R+z7pf9n/Dy3nZdsl9NJcHPXGdg/RAfxry83qcmHa72R6OWU+eun21PTqKKK+VPpwooooAilkWGNpJCFRQWYnsBXw7ruoNqmtahfvnddXEk2D23MTj9a+t/ivqf9k/DzXLkNtc25hQg8hpCEGPpuz+FfHGOa9/JKek6nyPCzeprGHzEooor3zxB38IrvPgdpn9p/EfTFZcx22+6f22r8p/76K1wde6fsw6WGudb1V15RUtY2+pLOP0T864sfU9nh5vyt9+h2YKPtK8V53+7U+gaQ96M9KxPGep/2L4U1bUFba9vbO6HOPmx8v64r49JtpI+qlJRTb6HyN4+1L+2PG2s32dySXThD6op2r+gFc93opK+5p01CKiuh8ZOTnJyfUKKKK0IO1+EuuaV4e8YR6rrbSLFBC4i8tN53sNvTt8pbmvc/wDhdvhD/ntef+A5r5awRSZNefiMtpYmfPNu53UMdUoR5IWsfU3/AAu3wj/z3vP/AAHNMl+N3hNELK99IR/CtvyfzIFfLdFY/wBjYfu/v/4Bt/atfy+49y8TfHeWWF4fDemmEkYFxdMGK/RBxn6kj2rxjU9Ru9Uvpr3ULiS4upTueSQ5JP8AQew4FVcUV2YfB0sOv3asclbE1Kz993G0UUV1HMOqaztpr27htbaNpbiZxHGi9WYnAA/GokR3KqilmY4AA5J9K+kPgv8ADZ9DC67r8ezVGXEFu3/LupGCT/tkcY7D3PHHjMXHDQ5nv0Xc68LhpYifKtur7Hf+APDqeFvCljpYKtLGu6V1/jkY5Y/TJwPYCukz1NA4peK+OlJzk5S3Z9XGKglFbI+Sfjlo7aX8RdQIGIrwLdR++4Yb/wAeVq4DPGK+ovjr4Qk8SeHUvtPRn1HTtzhAMmWM/eUepGAR+I6mvl09c19blmIVagl1WjPmMfRdGs+z1Q2iiivQOAdXVeA/HGreDb1pNOdZbSUgzWsv3H9x/dPuPxzXKnijFRUpxqRcJq6ZpCcqb5ouzPpTTfjxoE0a/b7C/tJf4ggWVB9DkE/lU1x8dfDMakx22pzHOAFiUZ9+W6V8yUleY8mw7d9fvO9ZpiLW0+49t8Q/Hm+mjaPQdLitQf8Altcv5rfgowAfxNeRazq+oa3fteavdzXVy3BeRug9AOgHsMCqGKSuyjg6ND+HGxy1sTVq/HK4UUUV1HMKa1PDWiXfiHXbTS7Bcz3DhckcIvUsfYDJ/CqNrbzXdxFBbRPLPKwRI0GSxPAAHc19SfB/4fL4Q0xrvUNj6zdKBKRyIU6+Wp/Un1A9M1wY7GRw1O/2nsjtweFeInbotzu9D0220bSbTT7JdtvbRiJB3wO59+5rRoor5Bu7uz6pJJWQtFFFAwooooAKKKKACiiigAooooAb1rlvGdkzpHeRjlPkf6Z4P8/zrqjUcqJLGySKGRhgg9xXDjsLHF0JUZddvJ9BplHRLwX2nxy7suBtcf7X+efxrSrkHt7jw9emeENLYufnA7D3+nY101ldQ3kAmgcMp/Q+h96ywOKlNexr6VI7rv5rumDLVFFFemI+a/2ltS83xNpumryLW2Mp5/ikbp+SD868cxxXvfxA+E/ifxN4w1DVobrSkgnZREsk0gZUVQoyAhAOBng9a57/AIUP4p6fbdH/AO/0n/xuvpsFjcNRoxg56pHzeJwterVlNR3Z5LRXrX/ChvFP/P5o3/f6T/43R/wobxT/AM/mjf8Af6T/AON11f2lhv5/zOb6jiP5GeTqCxCKCWY4AHc19veGdOGkeHtN04Y/0WBITjuQoBP55rwvw38EtesvEOm3mpXelvZ29wk0qRyuWZVIOACgHOMdRX0T0xXjZti6dfljTd0rnsZbhp0eaVRWbHUUUV5B6oUUUUAeK/tMan5XhrStOjbDXVyZGx3VF6fm6n8K+c+TxX0r8X/h3r/jPXbS5025sIrOC38sJcSOG3liWOAhGMbR17Vwg+A/inP/AB+aP/3+k/8AjdfQ5fi8PQoKMpWfU+fxuGr1qzlGOnQ8kor1r/hQ3in/AJ/NG/7/AEn/AMbo/wCFDeKf+fzRv+/0n/xuu/8AtLDfz/mcX1HEfyM8lHBr6t+AWmDTvhzaSsNsl7I9yw/HaP0UH8a8sPwH8U9TeaP/AN/pP/jdfROgacmkaJp+npjbawJCCO+1QM/pXl5rjaVamoUnfXU9PLcLUp1HOoraGjgfhXlf7ROpmy8Ai0U4e+uEiI77V+cn81UfjXqvavPfij8P5fHUmn/8TYWMdoHwn2bzd5bbznevTaPzNeVhJwjWjKo7JanpYqM5UZRgrtnyZRXvX/DPP/Uzf+SH/wBto/4Z5/6mb/yQ/wDttfT/ANqYX+b8H/kfO/2dif5fxX+Z4LRXvX/DPP8A1M3/AJIf/baP+Gef+pm/8kP/ALbR/amF/m/B/wCQf2dif5fxX+Z4LRXvX/DPP/Uzf+SH/wBto/4Z5/6mb/yQ/wDttH9qYX+b8H/kH9nYn+X8V/meC0V71/wzz/1M3/kh/wDbalj/AGfIAP3viKVm9Vswo/8AQzR/amF/n/B/5B/Z2J/l/Ff5nz/S19ERfACx587Xrpx2226r/MmtOy+BXhmBw1xc6ndeqvKqqf8AvlQf1rOWb4ZbNv5Giyuu90l8z5lAzXWeEvh94h8TupsLBo7U8m6uMxxAeoJGW/4CDX05ofw/8L6KyvY6LarKvSSUGVwfUFySPwrq8cHmuKtnV1ajH5v/AC/4J10so61ZfJf5nnfw8+F2k+Eyl3KTf6r/AM/Ei4Ef+4vb6nJ+nSvRqOlBrxKtWdWXNN3Z69OlClHlgrIWiiipNBvUV4T8W/hLJczXGt+FoszsTJcWQ/iPdo/fuV79ueD7sKMVrh8RPDz54f8ADmNfDwrx5ZnwbKjwyPHMjLIpIZWGCCOoI7GmZ9OK+wvGnw70LxahkvYDDe44u7f5ZPx7MPqD7YrxTxL8EvEOnM8mlNBq1uOQFIilx7qxx+RP0r6XD5pRrK0nyvz/AMz5+vl1am7xXMvL/I8pptaOqaLqmkuV1LTru0IOP30TKD9CRg1n9K9JSUldHntOLsxKKKKokfxTas2dlc30nl2VtPcyf3IYy5/IV2WhfCjxdrG1l0w2cR/5aXjeVj6r979KxqVqdJe/JI2hSnU+BNnCAZrb8MeGdV8TX4tNGtHnfje/RIx6s3QfzPbNe4+FPgXptqyT+IryS/ccmCLMcX0J+8f0r1zS9Ps9Ls1tdNtYbW3T7scKBVH4DvXlYnOYR0oq779D0qGVzlrVdl26nDfDT4Z6f4PRLy4db3WGX5pyvyxZ6rGO3pk8n26V6L0pT060tfPVas6suebuz3KdKNKPLBWQtFFFSaBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAEbKGGCAQeoNYc2jyW85udKl8iQ9Yjyjf4f56VvmiuWvhqddLnWq2a0a9GMx4dY8phFqcLW0nTeeUb6GtWNldAyMGU8gg9aJEWRCrqGU9QRwazm0iJH8yykktG6/uz8p+qnioisRS686+5/5P8AADUHSk3DrWcp1KFwH8m6j/vD9235cg/pWj+FbQqc3Rp+f9WfyYDqKKK3EFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBGyhlKsAVIwQe4rGvPCugXrFrzRNMnY/xSWqMfzIrbp1NNrYlxUt0ct/wgXhL/oXdL/8AAdf8KntvB/hq1Ia30HS42HRltUz+eM10GPel5pupN7t/eQqUFsl9xFBDFbxiOCNI0HRUUAfkKmFFFSahRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAEbY796UCvHv2jtQvdP0XR3sLy4tXe4cMYJWQsNvQ4IzXoXjfXF8OeFtT1Riu63hJjB6GQ8IPxYitXh5ezhJa81192hzquuacX9mz+83gegx+FO/GvFf2ctRv9StNfbUby6unSWIKZ5GcrkPnGTxUuqahfeJvjja6VY3lxDpekxiW4WKVlV2GGOQCM/MUUg+hrWeDcKsqbfwq7fyM44tSpxqJfE7JHs9FFFcp2BRRRQAUUUUAFFFFABRRRQAUUUUARtxwe9KBzmvHv2jtQvbDRdHbT7y5tXe4dWMErIWG3ocHmu/8AHmvL4b8KanqeR5kMR8oHvIeEH5kfhWv1eXJCS+1dfdoc/t1zTi/s2f3nQjoBjn0pxOa8c/Zz1C91HRNYkv7y5upEuECtPKzkDb2yTSXeoXnib45w6faX1zFpWjxB7hIpWVJHXk5AOD8zKpB7Ka1lhHCpOm38Ku2ZxxSlTjNL4nZI9mooorlOwKKKKACiiigAooooAKKKKACiiigBuBQaB6VheMPEln4V0KbVdQWVoIiq7YgCzEnAAyQP1ojFyajHVsmUlFOT2RvUtZPhvVP7Z0Kw1LyGgF3Cs6xsclVYZGT9CK1jQ007ME01dDCcDJo74ryn9oq/u9P8F2MthdT2sjagil4ZCjEeXIcZB6ZA/KuzfVo9H8DLqt0SyW1kszZPLkIMDPqTgfjV+wfJGa6tq39epn7Zc8oPornRAjGMfhSk/nXh37PGsalrGqeIpdSvbi4LLFIFkkZlQszk7QTwPpV7xzqF94h+Lmh+GdMvLiC1s1E975MjJkEByrY/2QoGe71vLBShWlSb2V2/lcxjilKkqqW7sl87Hs1FFFcp2BRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAHiP7UHGhaLj/n5f/wBBq/8AGORvEPiTw34MtyT9qnF1d7T0iXP9BIfwFVv2j4RPY+HYyu4SXxXHrkAYq38KlPiXxt4m8ZTKWhaT7DYk/wDPNcZI9OAn4lq9aD5MNCq/s81vVtJf5/I8mfvYidL+bl+5K7/y+Zj/AAc1KHRrP4gajcj9zaXBmYDjOPMOB7npTfhddp4a8EeIPHGtDzLjUJmdBnBlwxAAJ6bpGb8s9q4AXczaRruhWJJvNb1tYAnqiMT/AOhMn5Gu8+Olt/ZXhXwl4W07/VPLsXPG4xqqjP1MmT710VqSlW5H9tq/+FJX/H8jClUcafOvsJ/e3p+H5mfe2PjHXfCN7401DxLc6dtjNxa2cBaNDGD7MMZHTgk8ZPNeufDDWrrxB4E0nUdQIa7ljZZGxjeVdk3fjtz+Neft4C8beJLS20/xLrFnZaJCEX7LYrklV6DoB2GMkgHnFet6NptrpGl2un2Mfl21tGI419APU9z3J7muDF1IOHs1Zu/RaJdr9TtwkJqfM00ra33b726HmfxP13W7zxppPgzw7etpsl5H5s92vDbTuOFPUYCE8EEkgZHNbHhnw7ceBYtU1PWPE+oanYR25cpcbiI8cswBY5JAAGMd6yvjP4RvrmS38W+H5mi1fS03Oo6vGpLAr6kZPB6g47YPNeOfHUniX4KR3fl+TcXN4ljdKn3Q6jzDj2IVT+OPerhD2tKnCnaz0lor3v8A5bETn7OpOVS91qu1v+H3H2kPi74jWV/r8muz6FpcfmfYbeBmUNt7sVI4BGCxzznAAGKbZeN9Xn+BN/ez30yarb3K2cN2GxIw3RtknudpYZ6nHrU+j+C/HureGbDR7rVbDTfD/kqpS3GZHjIzzgc5zyNwBz0NQfGXRrXw54K8NeFdHDYnvGcM5+aVgMEsR6mQfkPSuheznUjSVn72iS2S7vrfqYP2kKbqu601b6t9l0t0LvgG38YeMZtF1m/1Oe10Ky8sLEZWD3jIBvdsfeBYHk9uMdTWr8ANX1TVdJ1g61fXF1JBcqgM7ltg28gH616fpllBpun21jaKEgt41ijX0VRgV83aHrr+HfB/ju1g3Lc3N+tlbqB8wZ/MDe+Qqn8cVhD/AGqFSMYpaxtpsr/1c2mvq0oSk29Hfz0/qx1fh3xld3mueK/F1/fXJ8NabmK1tFkISVzhUwOmSMHnu4Pasuay8ZeJfCd/4yv/ABFdaXHFE9zaWVuzIjIuT2YYzjAJBJ4NRfE3SJPC/wAL/C/h9AFubq5M1yR/FJt5BPoC4H/ARW+vgXxzr2n2uk+ItZsrDRIkSM21kuWZVAAB4GRgDqxGQDit7U4JVYtJN2V9fdWmitu+pg3UbdOSbaV9O711fZHd/CbWrrX/AAJpl/qLb7oh43kxjeVdlDfUgDPvmuxHHBrO0HS7XQ9ItNNsF2WtsgRAep9SfUk5JPqa0PWvHqyjKbcVZN6Hr0ouMEpO7SPHP2kHUWnhlCfmN6SB7ADP8xVn4tyHxF4s8NeDbfJjlmF5egdoxnAP4Bzj121S/aMTzJPCaghd124yegzsq98Joz4k8WeJPGdwpKTTfY7LPaJcZI/AIM+u6vUh7mGhVf2VK3q3Zf5/I82Xv150u7jf0Su/8vmY3wb1iHR/DPjbV5UCxW9002zP+ySFH44FN+GF4nhP4f63411geZd6jMzoDwZcMQoHpuctn2Ge1cElxcPoepeG9PGJtY17yQueCiEcH23Mh/A13Xx6tDYeHvCHhnTR+5eQpGOmSioi5+vmE101qSlV9m/tvX/DFf5/kYU6jjT519hfi3/kZ9/p/jPVfB93431HxNdaewT7TbWULMieXkY6MAMjpwcjGTzXr/w01e61/wADaRqV/k3U0REhxjcVYrux77c/jXn8ngPxr4ojgsvFetWtlo0QUfZbBOSFxgdAPoSWAIzivW9J0+30vTbWxsU8u2t4xFGvXAHHXufevOxdWDgoaN36LRLtfqduFpzU3OzSt13b726HDfFjxtceHFtNM0KPz/EGosFhTbu8sE4DY7kngA8cEnpg5Gi+GNc8Mzf8JV4w8XXlzFZxvPc2KM5jPynCg7gDyRgbQCcVnaDt179ovVZrghhpsDeSOoUqEj/m7H61sftHX0lr4DjtYyR9su0jf3VQz/zVauNPllDDw3kld211/wAkZylzRnXltFuy6adfmzm9OsfGPxI0+98QnW7rSLMF/wCz7S2YgPtz1KkZ5+XccnOeAOK2/hx4zvtQ+FOs6hqVw8l5piTKJj95wI9yknu3OM+w75rs18rwr8MvlACafpufTcyx/wAyf1NeJaIZNI/Z71qZ8q2qXwjh7ZUFAf8A0BxWkLYiLjZJc0UtPX9CJJ0JJ3bfK29fu/E1vh/F4z8feHpIT4gutP063kYPdgs81xIedudwIRRjgEDnv26L4C6/qF5o2tw6zeyXQ06UbJZm3MqkNkbjyR8vGema6Lwgq+Fvg3bXIUK8GnPeN6lmUyYPvk4rz74ek6J8B/E2psdsl2ZVRvqFiX/x4mibVaNSKircyS08whF0ZQk22+Vt6+RV+Ht74z8dRX1lDrd1Z2Am825vi5eRQR8sUfQjuTgjjHToeh+CupavB4p8SeHdT1GfULewdgs0rltrK5U4JJIB64zwR9a6L4GWMemfDS0uZF8s3TSXUpPpuIB/75VTXm/gS7lj8CfEXxMdwuLsmJX7qzZJx75lU/hV1LVXVpxSSTSWnW9r/mTBOkqU5NttNvXpa9jfa/8AEHxS8SX8GiatNpHhqxfy/tEGQ0zevBBbOM4yABjIyan+FPiu60yz8XWfiTUZL200GTi6di7EbnUgE8nJUbRnviue+HHh/wAeXHg2GHQNQ0/TdJvWaUy5/fNk7SchSQfl4wQeOtP+J3hu38CfDiDSrOeSe41K9V7u5ZdpmCKSBjsAcEDJ71UqdKUnhk1q0kluu7b7kxnUUfbtPRNtvZ32SXY0dHtvGPxRM+p/2zN4f0PeVtY7cNl8HHQMpYerE4z0HHGT8atF1TS7TQrOfxBeail0FgW2lDYaRFUNISWOSWb04z1Ne8+H9Nj0bQdP06IYS1gSL6kAAn6k15N8Q92t/G7wnpa/NHaBLg/XczsP++Y1rHDYhyr3ikoxTdrLZLvubV8Oo0rNtyk0r3e7f3HceAPCGpeGXl/tDxHdatAY1ihhkjKJCB6Au3sO2MV2rDjg0oUDpS4rzKk3UfNLf7vyPShBQXLHY8e/aY58D2H/AGEk/wDRUtQ/FO7mv/DvhPwlp7H7VrBh8zHO2JQvJ9s4P/ADU/7TPHgfTv8AsIp/6KlqH4a258RfEnU9dly1no8KaZZlv7wXaxH5Mf8AtoK9KguWhGr/ACuT+elvxPNre9XlTX2rL5at/gVPhDLbaV4v+ITyERWVjKRwOEijeUD8lWo/hRdxwWniz4h62CgmkcIO+zO4qvrklFHutcRqmpzWNz8RbS0JN1qeqrZoi/eIM0zNge+3b/wKu0+MVp/winwj0Lw/AwGZkSbb0cqrOx/FyDXROnzSUXvPlXySTZjGpyx5ltDmfzbaRS+zeL/G3h3UvFt1r1xo1lFHJNY2du7IrKmcklSMDgjccknJ4GAfSfg5rl54g8DWd3qbmW6V3jaU9ZArcE++MD3xXFW/gTx5rGkWmi61rFjp2hQRpEYLVdzsq8AHAGendsd8GvWvDmjWfh3RrXS9OUpbWy7VBOSSTkkn1JJJ+tcmKnT5ORNN30t0Xr1udWFpz5+dppW1v1fp0scx8U/Gn/CHaPEtmnnareMY7WIjPPdyB1AyOO5I9657wz4J8WPf2WveJ/Fl3HLHItxNYRMwjwOdpIYKB6gKRjI5rN1aNde/aOsrS4BeDS4VcIemRH5gP/fTr+Vdn8aNRk0v4b6o8TYmmQWy+4dgG/8AHd1Dg6Sp0YW5ppNvffZeQrqo51Z/DB2S223ZyH9s+Ividrl7beHNRk0bwzZvsa8iQiWZvY5B564BGARnJIFV/g0dUHxC8QWM2s3+oadpyvB+/lZld/MChtpJA+63Suz+GsFr4X+FFheSgBBZm/nYfxbl3/ywPwFcP8GppNM+H3jHxHPkXEpkfcOCxjjLAj/gTkfWtHKLp1IwS5VZLTd33v3IUWqlOc37zu3r0ttbsYnh7xB4w8V61rekaBqU4jurkym6lkO20gVmwEPVc7gOOflGMDJHSa3qevNf6V8PPDWoudRggU6lqhYll43HBPIxkHIOeQMjmtf9nLSxaeCZr5kAmvrlju7lE+UD8Dv/ADrz74fw+L9b8Q+Idc8JzWEUtzOyS3Nzg7QzFgFGDxwO3YVtJQlUqKKSUO+19rv8dDFc8acLttz7dt7L/M6bwlJrfhP4uWvhm61261eyvIGkYzkkqdjsCAzHacp2PINe5cEA1514B+HsmhatPrmuai2q6/OCDLghYweDtz1OOM4GBwAK9GUg9DwK83F1IVJpw6JXdrXfc9DCQlCDUtLt2V72XYfRRRXOdYUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAePftFaXqWqaPpCaVY3d5JHcszC2haQqNvBOAcV3vgTQl8N+E9O0vA8yGIeaR/FIeXP5k/hiuh60hPWtp15ypRo9E7mEaMY1XV6vQ+ffhR4N1F/iXfalqun3dtZ2ck00JuIWRZJHYhSuQM4GTkegrsvjt4X1HXdGsL/Ro3mvtMlaRY4/vsrYyVHcgqpx35+lepcY4o4IrWWNqSrKt1RlHCQjSdHueTeH/iP4l1S70+y/4Qu/imeSNLq4kDrGi5G9gGUY4yQCfzr1ck8nFAPoKCawqVI1HeMeX7/wBTelCUF70r/ceN6z8RfEd5p19pUHgjVotRmDwI5RmRVOQG+7yce+O+cVRPwv1GP4OHSSitrIuv7R8hXBG/bs2Z6E7Pwz3717gDx15pQScd89K2WL5ElTilqn1d7foYPC87ftJN6W6K1/1PFNA+IXiu20i00tfBeo3GpwxiHznV44ztGAzArxxjPIGfSrnjzStR1z4veFETT7o6bZqs8lwY2MSsGLlSwG3PyKOvJIFew9qMZqfrKUuaEEnZ9+o/qzceSc21p26AOK+ePCHgrUb34vahLqVhew6PZ6hPeI80TJHMwkPl7SQA3OG4yMA+tfRFBHWppYiVFSUftKxpWw8azi5dHc8w+Ofhe+8R+HLWbSI2lvtPmMqxJ95lIwdvqQQpx7GqWhfEXxPqE9jZ/wDCFagtyzolzO4ZI1XPzsAygDjOATx716zjHt7Upzxj86pYlezVOcU7Xtvpf0IeHftHUhJq++2tjyy/1/xgvxhg0m1tpB4eG3d/o+UdCmWcyYyCDkAAgZAGPX1IZ4PalHbnigHI5OaynUVS1klZW06+ZpTpuF7tu7v6eR41+0Ro+p6pa6D/AGRYXl5JHLKW+zRM5TITBOBx06mvSvBGhp4c8K6dpaBd0EQEhHRpDy5/Fia3SBS1cq8pUo0eiFGhGNWVXqz59+Eng3UT8SNR1TVdPu7a1tJJXgNxEyCSR2IBXIGQFycj2rrvjt4Y1LXNK03UtFjM99pcrSCJBlmVtpJUdyCi8dxn6H1MYHSlyCK1ljakqyrdUZRwkI0nR7nlHh74i+I9XvbCyHgq/hd5I1uriUssca5G9huUdskAn869UJb6UDjoP1pevUVz1Zxm7wjy/e/zN6UZQXvSv9x4V4nste8FfFO48UaVpE+q6bfoVkWAFmGQu5TgEqdyggkYPSrXjePWfiN8OpbpNBu7C8sr7zILOXJknjCAFgCo/vnjH8OBk17WeOTTTg84rdYxrlnyrmjbXXZeRh9VtzR5nyyvp5vzPBNT1jxT8QNJsvDVloN3pokCLqF3cIyx/LjpkDAyM46np61ofF3wzdJ4V8K+GPD9jd3Fqk/zSRQmQJtAXe5AwMmRm7d69r3YBPpTlxj2prG8souEUkm3bz7ieD5oyUpNt2V/JdDhfi1Bcp8N9QsdHs57meRI7eOKCJpGC7lzwoJxtBrh/FWkarY/AjRNFsdOvLi6mMbXEEUDu8eS0rblAyMNgHPevcgenrQemc1FLFSpqMUtnzfM0q4ZVG5XtdW+RxOp2d1o3wklsLKCea7g0sWyRxIXkLmPbwoBycnNcz4D8G3E/wAFrrRrqCSzvtQE0hjnUqyPuwm4HkfcU/SvXAcijpURxEoxcVve9/Qbw8XJN7JWseB+CvF3ijwdoqeHr3wfqd7NasywSRqwBBYnBIUgjJOCD0+ldN8UPD+r+Mvh1p8wsfJ1q3K3L2gIzkqQ6Lz15BHPbHWvVe2M0gA7nOK1li/3iqwilK93vqZxwz5HSlJuNrdNDy3wB471/Vb7TtH1Xwtf2zlCtxfSK6ou1CQSpTgkgDBPeub8Wf2x4b+NM3iJNAvdUs5IVWAW6MesQQ8hTgghuD2PvXu56YB/ChVC9qUcXGE3KMEk1Zq76hLDSnBRlN3TunZHlfi/xD4yg+I+iafo1nKukTeW02LcOrgt+83OR8u0ehHrzkV6pnPHegduaAeeTxWNSopqKSSsvvN4QcW223f8Dy39oXTr/U/B1jFplldXsqX6MY7eJpGC+XIMkAE4yRz7iul+F2gHw54J0+zmQrdyL59zu+95r8kH3Awv/Aa7Ck4qnXk6So9L3JVCKqur1asfPXhfwTqFz8atSvL+xuo9Mt7ya9SaWFljlbeSgUkYOCwPHZTXe/G/wxeeJ/CKLpkXnXtnMJ1jBAaRcEMo9+QffHrivSO9IcEGtHjKjqRqdY2t8v8AMiOEhGnKn/MeOaH8SPFlxb2dgfBeoPqPyxyzyK8cfXBYgqMfQkD3r2PtQKXmsa1SNR3jHl+80pU5QVpSueH/ABH0rXPDfxLtvGeiabLqVu6Kk8USljkJsIIAJAK4w2Dgjntm34lu9Y+Ifw51lIvD97p1xbSxSQwzq2+4AOW25UZI54Gcke+K9jX5iPWk4C8dK3WMdoNxXNG1nrsvIxeF1klJ8sr3Xmz58N/4r8V/D5fD8GiXlhb2Flturh0cvdGJfkiRdoJLMozjPf6HRj0zVbD9nkafBpeoHU7t2V7Zbd/NAM5ySgGQCijqO4r3XjHvSe3SqeM2UYpJO/zJWE3cpNtq3yOZ+G+mvpHgTRLGaJopo7ZWkjYYKu3zMCOxyxryPRm8QfCzxPrduvh+81bSbyTzIpLZWPAJKnIBAOGIKnnIBHHX6BHXB60NySKzp4hxcuZXUt187ms8OpKPK7OOz/A8zvPFPiu5+Hmsavb6DPp2pJKFtIXUySeWSoLlSMkjLHpjgcEA53vhhfa1qPg+zuvEqOuoyFsl4xGzLu+UlQAASPYcYrr88daTODyeKiVWLg4KKWt79fQqNKSmpOTelrfqSUUUVkbhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH/9k=";
				doc.addImage(img, "JPEG", 162, 0, 288, 144);
				//uses the customerDataInput array to write customer information to the doc
				doc = this.writeCustomerString(doc);
				//uses the rows array to write equipment to the doc
				doc = this.writeEquipmentString(doc);
				//gets the return resaon to write data to the doc
				doc = this.writeReturnString(doc);
				//calls some time functions to write the time/data stamp on the bottom of the doc
				doc = this.writeDateTimeStamp(doc);
				let s = doc.output('dataurlnewwindow');
				this.saveToFirebase()
			},
			saveToFirebase(){
				let database = firebase.firestore();
				let data = this.createDataObject();

			},
			createDataObject(){
				let customer = {
					'First Name' : this.customerDataInputs['First Name'],
					'Last Name' : this.customerDataInputs['Last Name'],
					'Account #': this.customerDataInputs['Account #'],
					'Phone #' : this.customerDataInputs['Phone #'],
					'Service Address': this.customerDataInputs['Service Address'],
					'Email': this.customerDataInputs['Email']
				};
				let equipment = this.rows;

				let temp = document.getElementById('returnType');
				let rr = temp.options[temp.selectedIndex].text;
				let explanation = document.getElementById('explanation').value;
				let return_information = {
					'Return Type' : rr,
					'Return Explanation' : explanation
				}

				return {customer, equipment, return_information};
			},
			writeCustomerString(doc) {

				let customerInformation = [
					{
						text: "Customer Name: ",
						value: this.customerDataInputs[0].value + " " + this.customerDataInputs[1].value
					},
					{text: "Account #: ", value: this.customerDataInputs[2].value},
					{text: "Phone #: ", value: this.customerDataInputs[3].value},
					{text: "Address: ", value: this.customerDataInputs[4].value},
					{text: "Email: ", value: this.customerDataInputs[5].value},
				];

				for (let i = 0; i < customerInformation.length; i++) {
					//sets the font type to bold for the label
					doc.setFontType('bold');

					//writes the value with the offset of the left margin
					doc.text(customerInformation[i].text, this.leftMargin, this.yCoordinate);
					doc.setFontType('normal');

					//gets the length of the label by getting the length of the string written * the font size in points
					let labelLength = doc.getStringUnitWidth(customerInformation[i].text) * this.myFontSize;
					doc.text(customerInformation[i].value, labelLength + this.leftMargin + 5, this.yCoordinate);

					//increments y by text size + 1 for better spacing
					this.yCoordinate = this.yCoordinate + this.myFontSize + this.lineSpacing;
				}
				this.yCoordinate = this.yCoordinate + (this.myFontSize * 2);
				return doc;
			},
			writeEquipmentString(doc) {
				for (let i = 0; i < this.rows.length; i++) {
					//sets the font to bold for the label
					doc.setFontType('bold');

					//writes the label with the offset of the margin
					doc.text("Device Type: ", this.leftMargin, this.yCoordinate);

					//resets the font type for writing a value
					doc.setFontType('normal');

					//sets the length of the label by getting the length of the label * the font size in pts
					let labelLength = doc.getStringUnitWidth("Device: type: ") * this.myFontSize;
					//writes the device information to the doc + the offset
					doc.text(this.rows[i].device, labelLength + this.leftMargin + 5, this.yCoordinate);

					//increments y for spacing
					this.yCoordinate = this.yCoordinate + this.myFontSize + this.lineSpacing;
					doc.setFontType('bold');
					doc.text("CMAC/SN: ", this.leftMargin, this.yCoordinate);
					doc.setFontType('normal');
					let labelLength2 = doc.getStringUnitWidth("CMAC/SN: ") * this.myFontSize;
					let equipmentMAC = this.formatMAC(this.rows[i].equipmentNum);
					doc.text(equipmentMAC, labelLength2 + this.leftMargin + 5, this.yCoordinate);
					this.yCoordinate = this.yCoordinate + this.myFontSize + this.lineSpacing; //increments y for spacing
					if (this.rows[i].powerCord || this.rows[i].remote) {
						doc.setFontType('bold');
						doc.text("Accessories: ", this.leftMargin, this.yCoordinate);
						doc.setFontType('normal');
						let labelLength3 = doc.getStringUnitWidth("Accessories: ") * this.myFontSize;
						if (this.rows[i].powerCord) {
							doc.text("Power Cord Included", labelLength3 + this.leftMargin + 5, this.yCoordinate);
						}
						if (this.rows[i].remote) {
							this.yCoordinate = this.yCoordinate + this.myFontSize;
							doc.text("Remote Included", labelLength3 + this.leftMargin + 5, this.yCoordinate);
							this.yCoordinate = this.yCoordinate + this.myFontSize + this.lineSpacing;
						}
					}
					this.yCoordinate = this.yCoordinate + this.myFontSize + this.lineSpacing;
				}
				this.yCoordinate = this.yCoordinate + (this.myFontSize * 2);
				return doc;
			},
			writeReturnString(doc) {
				let temp = document.getElementById("returnType");
				let returnReason = temp.options[temp.selectedIndex].text;
				let explanation = document.getElementById("explanation").value;
				let returnInformation = [
					{text: "Reason For Return: ", value: returnReason},
					{text: this.returnType + ": ", value: explanation}
				];


				for (let i = 0; i < returnInformation.length; i++) {
					doc.setFontType('bold');
					//console.log(returnInformation[i].text);
					//this writes the label "Return reason"
					doc.text(returnInformation[i].text, this.leftMargin, this.yCoordinate);
					doc.setFontType('normal');
					//this makes a new line for the entered return reason
					this.yCoordinate = this.yCoordinate + this.myFontSize;
					// multiline
					let ptsPerInch = 72;
					let oneLineHeight = this.myFontSize * this. myFontSize/ ptsPerInch;
					let maxlineWidth = 595 - this.leftMargin * 2;
					let reason = returnInformation[i].value;
					let reasonlines = doc.splitTextToSize(reason, maxlineWidth);

					doc.text(reasonlines, this.leftMargin , this.yCoordinate);
					this.yCoordinate = this.yCoordinate + this.myFontSize + this.lineSpacing;
				}
				this.yCoordinate = this.yCoordinate + (this.myFontSize * 2);
				return doc;
			},
			writeDateTimeStamp(doc) {
				let date = new Date();
				const monthNames = ["January", "February", "March", "April", "May", "June",
					"July", "August", "September", "October", "November", "December"
				];
				let myDate = "Date: " + date.getDate() + "/" + monthNames[date.getMonth()] + 1 + "/" + date.getFullYear();
				let centerPoint = doc.internal.pageSize.getWidth() / 2; //gets the internal page width
				let dateLength = doc.getStringUnitWidth(myDate) * 12;
				let leftAlign = centerPoint - (dateLength / 2);
				let bottomAlign = doc.internal.pageSize.getHeight();
				doc.text(myDate, leftAlign, bottomAlign - 12);
				return doc;
			},
			//function to format MAC address for output
			formatMAC(macString) {
				macString = macString.toUpperCase(); //caps the whole string
				let str = macString.split("");
				let splitString = "";
				for (let i = 0; i < macString.length; i += 2) {
					if (i === (macString.length - 2)) {
						splitString += str[i] + str[i + 1];
					} else {
						splitString += str[i] + str[i + 1] + ":";
					}
				}
				return splitString;
			},
		}
	}
</script>

<style scoped>
	input[type=number]::-webkit-inner-spin-button,
	input[type=number]::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	h1{
		font-family: 'Montserrat', sans-serif;
	}

</style>