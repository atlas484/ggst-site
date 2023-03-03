<script setup lang="ts">
import NavBar from '../../components/NavBar.vue'
import HomePage from '../../components/HomePage.vue'

import { ref } from 'vue';

const props = ref([
	["0", "1", "2", "3", "4"],
	["1", 1, 2, 3, 4],
	["2", 2, 4, 6, 8],
	["3", 3, 6, 9, 12],
	["4", 4, 8, 12, 16],

])
const columns = props.value[0];
const rows = props.value.slice(1);

</script>

<template>
	<NavBar pageName="Stats" />
	<main>
		<table>
			<thead>
				<tr>
					<th v-for="col in columns">{{ col }}</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(row, rowIndex) in rows">
					<th>{{ row[0] }}</th>
					<td v-for="(col, colIndex) in columns.slice(1)">{{ row[colIndex + 1] }}</td>
				</tr>
			</tbody>
		</table>
	</main>
</template>

<style scoped>
td {
	text-align: center;
}

td.hover {
	font-weight: bold;
}
</style>
