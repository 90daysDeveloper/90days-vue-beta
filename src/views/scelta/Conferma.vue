<template>
	<div class="text-center">
		<h3 class="mb-3">Ti stai unendo al MasterGroup <b class="purple">THUNDER</b></h3>
		<p>Ti ricordiamo che l'orario scelto per gli appuntamenti è <b class="purple">7:00/8:00</b></p>
		<hr>
		<button class="btn btn-primary" @click="goTo('/')">CONFERMO LA MIA SCELTA</button>
		<br>
		<br>
		<a class="annulla mt-2" @click="goTo('/scelta')">Torna all'elenco dei MasterGroup</a>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
function goTo(next) {
	router.push(next)
}
</script>
