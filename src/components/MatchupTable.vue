<script setup lang="ts">
import { stringifyExpression } from '@vue/compiler-core';
import { ref, reactive } from 'vue';

defineProps<{
	opponent: string,
	character1: string,
	character2: string,
}>()

const characters = reactive({} as { [key: string]: string });
const charCodes = reactive([] as Array<string>);
// get list of all characters to select from
fetch("./src/assets/characters/codes.json", { cache: "no-cache" })
	.then(response => response.json())
	.then(jsondata => {
		for (const key in jsondata) {
			characters[key] = jsondata[key]["name_long"]
			charCodes.push(key)
		}
	})
	.catch(error => {
		// if the fetch fails, these are the most likely characters to be needed
		characters["SO"] = "Sol Badguy";
		characters["KY"] = "Ky Kiske";
		characters["GI"] = "Giovanna";
		characters["MI"] = "Millia Rage";
		characters["NA"] = "Nagoriyuki";
		characters["BR"] = "Bridget";
		characters["FA"] = "Faust";
		characters["CH"] = "Chipp Zanuff";
		characters["RA"] = "Ramlethal Valentine";
		characters["IN"] = "I-No";
	});

const values = reactive({} as { [key: string]: { [key: string]: string | number} });
const getValues = (c1: string, c2: string) => {
	const r = values[c1] ?? {};
	return r[c2] ?? "-";
}
const charsWithValues = reactive([] as Array<string>);
function getMatchupStats() {
	console.log("sending request for stats")
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "./src/php/stats.php");
	xhr.onload = function () {
		const response = JSON.parse(this.response);
		if (response["successful"]) {
			for(const key in response){
				if (!response.hasOwnProperty(key)) continue;
				const stat = response[key];
				const c1Object = values[stat["character_1"]] ?? {};
				c1Object[stat["character_2"]] = Math.round(1000 * stat["won"] / stat["played"]) / 10;
				values[stat["character_1"]] = c1Object;
			}
			for(const i in charCodes){
				if(charCodes[i] in values) charsWithValues.push(charCodes[i]);
			}
			console.log("stats processed");
		}
	};
	xhr.send();
}
getMatchupStats();

const rowSelect = (rowIndex: number) => {
	// Do something with the selected row header
	console.log(`Selected row header: ${charCodes[rowIndex]}`);
};
const columnSelect = (columnIndex: number) => {
	// Do something with the selected column header
	console.log(`Selected column header: ${charCodes[columnIndex]}`);
};
const tableSelect = (rowIndex: number, columnIndex: number) => {
	// Do something with the selected table value
	console.log(`Selected value: ${charCodes[rowIndex]}, ${charCodes[columnIndex]}, ${getValues(charCodes[rowIndex], charCodes[columnIndex])}`);
};

const getColorFromValue = (value: number) => {
	const hue = ((value / 100) * 120).toString(10)
	return `hsl(${hue}, 100%, 50%)`
}
const getColorFromCharCodes = (c1: string, c2: string) => {
	const v = getValues(c1, c2);
	if (typeof v === "string") return `rgb(0, 0, 0)`
	else return getColorFromValue(v)
}
function charImgPath(charCode: string) {
	return "./src/assets/characters/faces/" + charCode + ".png"
}
</script>

<template>
	<div>
		<table class="table-with-clickable-headers">
			<thead>
			<tr>
				<th>VS</th>
				<th v-for="(column, columnIndex) in charCodes" :key="columnIndex" @click="columnSelect(columnIndex)">
					<img :src="charImgPath(column)" :alt=column />
				</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for="(row, rowIndex) in charsWithValues">
				<th :key="rowIndex" @click="rowSelect(rowIndex)">
					<img :src="charImgPath(row)" :alt=row />
				</th>
				<td v-for="(column, columnIndex) in charCodes" :key="row+column" 
				    @click="tableSelect(rowIndex, columnIndex)"
					:style="{'--bg-color': getColorFromCharCodes(row, column)}">
					{{ getValues(row, column) }} 
				</td>
			</tr>
			</tbody>
		</table>
    </div>
</template>

<style scoped>
/* td {
	text-align: center;
}

td.hover {
	font-weight: bold;
} */

.table-with-clickable-headers {
  border-collapse: collapse;
  /* width: 100%; */
}

.table-with-clickable-headers th, .table-with-clickable-headers td {
  border: 1px solid white;
  /* padding: 8px; */
  text-align: center;
  width: 50px; /* set the width */
  height: 50px; /* set the height */
  transition: transform 0.2s ease-in-out; /* add a transition for smooth animation */
  background-color: var(--bg-color); /* set the background color dynamically */
}

.table-with-clickable-headers th {
  background-color: #272727;
}

.table-with-clickable-headers td {
  color: black;
}

.table-with-clickable-headers td:hover {
  /* background-color: #f5f5f5; */
  transform: scale(1.1); /* expand the hovered td element */
}

table img {
  width: 50px;
  height: 50px;
  display: block;
}
</style>