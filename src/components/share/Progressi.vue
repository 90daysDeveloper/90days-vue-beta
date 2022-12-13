<template>
	<h3>I miei progressi</h3>
	<div class="mt-3 mb-3">
		<Graph :id_utente=" props.id_utente "></Graph>
	</div>
</template>

<script setup >
import Graph from "@/components/habit/Graph.vue"

// eslint-disable-next-line no-undef
const props = defineProps({
	id_utente: String
})
</script>
