<template>
	<div class="register d-flex justify-content-center align-items-center">
		<form @submit.prevent=" handleSubmit ">
			<img class="d-grid mx-auto mb-2" src="@/assets/images/logo-dark.png" alt="Logo 90days">
			<p class="text-center mb-3">Inserisci l'email con la quale ti sei resistrato a <b>90days</b> per resettare la tua password.</p>
			<div class="form-group mt-5 mb-3">
				<input type="email" class="form-control" id="email" v-model=" email " placeholder="Email">
			</div>
			<div class="d-grid mx-auto mt-2 mb-4">
				<button  class="btn btn-primary" type="submit" :loading="loadingLogin">RESET DELLA PASSWORD</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router/index.js'

const authStore = useAuthStore()

const email = ref()

async function handleSubmit() {
	await authStore.resetEmail(email.value)
	router.push('/login')
}
</script>
