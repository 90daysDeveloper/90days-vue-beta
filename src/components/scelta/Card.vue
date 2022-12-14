<template>
	<div class="scelta">
		<a @click="goTo('/informazioni')">
			<div class="card">
				<div class="card-header text-center">
					<h5>Orario <span>7:00/8:00</span></h5>
				</div>
				<div class="card-body">
					<h3 class="card-title">THUNDER <img src="../../assets/icon/profilo.svg"><img
							src="../../assets/icon/profilo.svg"><img src="../../assets/icon/profilo.svg"><img
							src="../../assets/icon/profilo.svg" style="opacity: 0.2;"></h3>
					<div class="row">
						<div class="col-md-4 col-sm-6 mb-2">
							<h4>Marco</h4>
							<p>Obiettivo</p>
							<div class="alert alert-work">Lavoro</div>
							<p>Può aiutarti in</p>
							<div class="alert alert-fitness">Alimentazione e fitness</div>
							<div class="alert alert-psyco">Benessere psicologico</div>
						</div>
						<div class="col-md-4 col-sm-6 mb-2">
							<h4>Laura</h4>
							<p>Obiettivo</p>
							<div class="alert alert-study">Studio</div>
							<p>Può aiutarti in</p>
							<div class="alert alert-fitness">Alimentazione e fitness</div>
						</div>
						<div class="col-md-4 col-sm-6 mb-2">
							<h4>Anna Rita</h4>
							<p>Obiettivo</p>
							<div class="alert alert-psyco">Benessere psicologico</div>
							<p>Può aiutarti in</p>
							<div class="alert alert-study">Studio</div>
						</div>
					</div>
				</div>
			</div>
		</a>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
function goTo(next) {
	router.push(next)
}
</script>
