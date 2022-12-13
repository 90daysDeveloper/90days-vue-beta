<template>
	<div class="account mt-3">
		<h2>Assistenza</h2>
		<br>
		Per qualsiasi necessità scrivici a: <span class="purple">support@90days.it</span>
		<br>
		<br>
		Vuoi parlare direttamente con noi?
		<br>
		<a class="btn btn-primary mt-2" href="https://calendly.com/90days/15min" target="_blank">Prenota una call</a>
		<br>
		<br>
		Hai bisogno di una mano per navigare sull'app?
		<br>
		<a class="btn btn-outline-light mt-2" href="https://www.90days.it/Guida-ufficiale.pdf" target="_blank">Scarica la guida</a>

		<hr>
		<h2>Feedback</h2>
		Hai dei feedback per noi? Faccelo sapere!<br>
		Cliccando sul pulsante potrai inserire le tue richieste di funzionalità. Ricorda di verificare se qualcuno ha già proposto la tua idea. In quel caso votala così capiremo a cosa dare la priorità.
		<br>
		<button @click="goToCanny" target="_blank" type="button" class="btn btn-primary mt-2">
			<i class="fa-regular fa-heart"></i> Feedback
		</button>
			<div class="container-fluid mt-5 mobile">
				<div class="container text-center">
					<div class="row">
						<div class="col">
							<div class="footer">
								Copyright © 2022 90days.<br>
								Tutti i diritti riservati.
							</div>
						</div>
					</div>
				</div>
			</div>
	</div>
</template>

<script setup>
function goToCanny() {
	window.open(
		'https://90days.canny.io/feedback',
		'_blank'
	);
}
</script>
