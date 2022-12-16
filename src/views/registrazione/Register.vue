<template>
  <div class="register d-flex justify-content-center align-items-center">
    <form @submit.prevent="handleSubmit">
      <img class="d-grid mx-auto mb-2" src="@/assets/images/logo-dark.png" alt="Logo 90days">
      <p class="text-center mb-3">Completa la registrazione per iniziare la tua avventura con <b>90days</b></p>
      <div class="form-group mb-3">
        <label class="form-label" for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" placeholder="Email">
				<p class="small-text" v-if="!email">Inserisci una mail</p>
      </div>
      <div class="form-group password">
        <a class="hidden" role="button" @click.prevent="toggleVisible"><i class="fa-solid fa-eye"></i></a>
        <label class="form-label" for="password">Password</label>
        <input class="form-control" id="password" v-model="password" placeholder="Password" :type="visible ? 'text' : 'password'">
        <p class="form-text">Utilizza almeno 8 caratteri con un numero, una lettera maiuscola e una minuscola</p>
      </div>
      <div class="form-group password">
				<a class="hidden" role="button" @click.prevent="toggleVisible"><i class="fa-solid fa-eye"></i></a>
				<label class="form-label" for="password">Conferma la password</label>
        <input class="form-control" id="password" v-model="confermapassword" placeholder="Conferma la password" :type="visible ? 'text' : 'password'">
				<p class="small-text" v-if="passwordDiverse">Le password non corrispondono</p>
      </div>
      <div class="form-check mt-4">
        <input class="form-check-input" type="checkbox" inputId="rimani-connesso" v-model="rimaniConnesso" required />
        <label class="form-check-label" for="rimani-connesso">Accetto la <a href="https://www.iubenda.com/privacy-policy/10762418/legal" target="_blank">privacy policy</a> ed i <a
            href="http://90days.it/termini-condizioni.php" target="_blank">termini del servizio</a></label>
      </div>
      <div class="d-grid mx-auto mt-2 mb-4">
        <button :disabled="passwordDiverse" class="btn btn-primary" type="submit"
          :loading="loadingLogin">REGISTRATI</button>
      </div>
      <div class="mt-2 mb-4 small-text">
        <p class="text-center">
          Sei già registrato?<br>
					<a class="btn btn-outline-light mt-2" href="/login">ACCEDI ORA</a>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import axios from 'axios'

const authStore = useAuthStore()

const email = ref()
const password = ref('')
const confermapassword = ref()
const rimaniConnesso = ref()

const loading = ref(false)

const loadingLogin = computed(() => {
  return authStore.loadingAuth ? true : false
})

const passwordDiverse = computed(() => {
  if (password.value != confermapassword.value || password.value == '') {
    return true
  } else {
    return false
  }
})

async function handleSubmit() {
	if (!email.value) {
		return alert('Missing email')
	} else if (password.value.length < 8) {
		return alert('Password should have more then 8 characters')
	}
	await authStore.registerUser(email.value, password.value)
	postMember()
	router.push('/register-info')
}

function postMember() {
	loading.value = true
	axios.post('https://90days-vue-beta.vercel.app/api/postmember?email=' + email.value,)
		.then(res => console.log(res))
		.finally(loading.value = false)
}

const visible = ref(false)
function toggleVisible() {
  visible.value = !visible.value
}

</script>
