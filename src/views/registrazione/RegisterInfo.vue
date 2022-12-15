<template>
  <div class="content">
    <div class="container router-view">
      <div class="register" style="padding: 0px;">

        <h1>Benvenut*!</h1>
        <h3>Dicci di più per iniziare il tuo percorso</h3>

        <hr>

        <div class="form-group mt-3">
          <label class="form-label" for="nome">Nome *</label>
          <input type="text" class="form-control" id="nome" v-model="form.nome" placeholder="Nome" required>
        </div>
        <div class="form-group mt-3">
          <label class="form-label" for="cognome">Cognome *</label>
          <input type="text" class="form-control" id="cognome" v-model="form.cognome" placeholder="Cognome" required>
        </div>
        <div class="form-group mt-3">
          <label class="form-label" for="nascita">Data di nascita *</label>
          <input type="text" class="form-control" id="nascita" v-model="form.nascita" placeholder="GG/MM/AAA" required>
        </div>
        <div class="form-group mt-3">
          <label class="form-label" for="codice">Codice sconto</label>
          <input type="text" class="form-control" id="codice" v-model="form.codice" placeholder="CODICESCONTO">
        </div>
        <em class="small-text mt-2">* Campi richiesti</em>
        <div class="mt-4">
          <button class="btn btn-primary" type="submit" @click="newProfile()">Crea il mio profilo</button>
        </div>

        <div class="counter-step mt-3">
          <div class="step active"></div>
          <div class="step"></div>
          <div class="step"></div>
          <div class="step"></div>
          <div class="step"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue'
import router from '@/router'
import AxiosService from '@/axiosService/AxiosService';
const authStore = useAuthStore();

const API_90D = new AxiosService('directus')

const loading = ref(false)

const nome = ref('')
const cognome = ref('')
const nascita = ref('')
const codice = ref('')

const form = {
  uid: authStore.userData.uid,
  nome: nome.value,
  cognome: cognome.value,
  email: authStore.userData.email,
  livello: 1,
  nascita: nascita.value,
  codice: codice.value
}

async function newProfile() {
  loading.value = true
  form.codice = form.codice.toLowerCase()
  form.codice = form.codice.toUpperCase()

  API_90D.creaUtenti(form)
    .then(res => res.send(console.log('User created')))
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      goTo()
    })
}

// function getName() {
// 	var emailItem = localStorage.getItem('userLogin90days')
//   if (emailItem) {
//     router.push('/')
//   }
// }
// getName()

const beta = process.env.VUE_APP_BETA_USERS_LIST

const codice_sconto = process.env.VUE_APP_CODICI_SCONTO


function goTo() {
  if (codice_sconto.includes(form.codice) || beta.includes(authStore.userData.email)) {
    router.push('/register-thanks')
  } else {
    router.push('/register-payment')
  }
}
</script>
