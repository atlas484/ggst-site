<script setup lang="ts">
import NavBar from '../../components/NavBar.vue'
import MatchupTable from '../../components/MatchupTable.vue'
import MatchupBarGraph from '../../components/MatchupBarGraph.vue'
import MatchupLineGraph from '../../components/MatchupLineGraph.vue'

import { ref } from 'vue';

const names = ref(['Alice', 'Bob', 'Charlie', 'David']);
const selectedName = ref('Alice');
const components = ref(['MatchupTable', 'MatchupBarGraph', 'MatchupLineGraph']);
const selectedComponent = ref('MatchupTable');

</script>

<script lang="ts">
	export default {
		components: {
			MatchupTable, MatchupBarGraph, MatchupLineGraph
		}
	}
</script>

<template>
	<NavBar pageName="Stats" />
	<main>
		<h1>
			Match Stats:
			<select id="components" v-model="selectedComponent">
				<option v-for="component in components" :key="component">{{component}}</option>
			</select>
			vs 
			<select id="names" v-model="selectedName">
				<option v-for="name in names" :key="name">{{name}}</option>
			</select>
		</h1>
		<component :is="selectedComponent" :opponent="selectedName" character1="" character2=""/>
	</main>
</template>

<style scoped>

</style>
