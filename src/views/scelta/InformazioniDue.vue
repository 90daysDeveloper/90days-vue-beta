<template>
	<div class="scelta-informazioni mt-2">
		<div class="title">
			<h3>BOOMER <img src="../../assets/icon/profilo.svg"><img src="../../assets/icon/profilo.svg"><img
				src="../../assets/icon/profilo.svg" style="opacity: 0.2;"><img src="../../assets/icon/profilo.svg" style="opacity: 0.2;"></h3>
		</div>
		<p class="mb-3">
			Gli orari disponibili sono: <span class="yellow">7:00/8:00</span> - <span class="yellow">13:00/14:00</span><br>
			<em class="dark-light">Prima di inserirti ufficialmente nel MG ti verrà chiesto quale siano gli orari che preferisci.</em>
		</p>
			<People></People>
			<People></People>
			<People></People>
			<div class="text-end mt-3">
				<a class="annulla" @click="goTo('/scelta')">Torna all'elenco dei MasterGroup</a>
				<button class="btn btn-primary ms-3" @click="goTo('/confermadue')">Unisciti a BOOMER</button>
			</div>
	</div>
</template>

<script setup>
import People from '@/components/scelta/People.vue'
import { useRouter } from 'vue-router';
const router = useRouter()
function goTo(next) {
	router.push(next)
}
</script>
