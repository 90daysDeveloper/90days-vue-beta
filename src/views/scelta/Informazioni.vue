<template>
	<div class="scelta-informazioni mt-2">
		<div class="title">
			<h3>THUNDER <img src="../../assets/icon/profilo.svg"><img src="../../assets/icon/profilo.svg"><img
				src="../../assets/icon/profilo.svg"><img src="../../assets/icon/profilo.svg" style="opacity: 0.2;"></h3>
			<div class="orario">
				Orario: 7:00/8:00
			</div>
		</div>
			<People></People>
			<People></People>
			<People></People>
			<div class="text-end mt-3">
				<a class="annulla" @click="goTo('/scelta')">Torna all'elenco dei MasterGroup</a>
				<button class="btn btn-primary ms-3" @click="goTo('/conferma')">Unisciti a THUNDER</button>
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
