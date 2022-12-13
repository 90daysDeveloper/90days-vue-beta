<template>
	<div class="text-center mt-4">
		<h1 class="mb-4">Nella giungla dovrai stare finché un 5 o un 8 non compare</h1>
		<img src="../../../public/img/Loading.gif" width="320" />
		<hr>
		<h4>Abbiamo 14 giorni di tempo per trovare i tuoi compagni di MasterGroup. L'attesa del piacere è essa stessa il
			piacere.<br><br>
			Quindi goditi l'app iniziando a prendere qualche appunto sul tuo diario sull'avventura che stai per intraprendere.<br><br>
			Sii paziente, vogliamo trovare i compagni di MasterGroup più adatti a te :)</h4>
		<hr>
		<p>Vai sul tuo profilo e leggi le guide disponibili</p>
		<hr>
		<button class="btn btn-outline-light" @click="goToTutorial()">Leggi le guide</button>
	</div>
</template>

<script setup>
import router from '@/router'
function goToTutorial() {
	router.push(`/`)
}
</script>
