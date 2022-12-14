<template>
	<div class="text-center">
		<h3 class="mb-3">Ti stai unendo al MasterGroup <b class="purple">BOOMER</b></h3>
		<p>Quali sono gli orari che preferisci?</p>
		<hr>
		<div class="form-check mt-4">
			<input class="form-check-input" type="checkbox" inputId="orario_1" v-model="form.orario_1" />
			<label class="form-check-label" for="orario_1">7:00 - 8:00</label>
		</div>
		<div class="form-check">
			<input class="form-check-input" type="checkbox" inputId="orario_2" v-model="form.orario_2" />
			<label class="form-check-label" for="orario_2">13:00 - 14:00</label>
		</div>
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
