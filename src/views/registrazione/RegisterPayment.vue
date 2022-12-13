<template>
  <div class="content">
    <div class="container router-view">
      <div class="register" style="padding: 0px;">

        <div v-for="utente of utente" :key="utente.id">
          <h1>Ciao {{ utente.nome }}!
          </h1>
        </div>
        <h3>Stai per essere reindirizzat* nella pagina di checkout.</h3>
        <hr>
        <p>Ricorda: per qualsiasi necessità ci trovi a <b>support@90days.it</b></p>
        <hr>
        <div class="counter-step mt-3">
          <div class="step"></div>
          <div class="step active"></div>
          <div class="step"></div>
          <div class="step"></div>
        </div>

      </div>
    </div>
  </div>

</template>

<script setup>
import AxiosService from '@/axiosService/AxiosService';
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
// import router from '@/router'

const authStore = useAuthStore()

const API_90D = new AxiosService
const uid_utente = authStore.userData.uid

const utente = ref([])
const loading = ref(false)

async function getUser() {
  loading.value = true
  API_90D.leggiUtenti('uid', uid_utente)
    .then(res => {
      utente.value = res.data
    })
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getUser()

function getDirectusUser() {
  authStore.getDirectusUser()
}
getDirectusUser()

setTimeout(() => {
  window.location.href = 'https://buy.stripe.com/bIYbLj8YCfkp9Pi5kl';
}, 6000)

// function getName() {
// 	var emailItem = localStorage.getItem('userLogin90days')
// 	if (emailItem) {
// 		router.push('/')
// 	}
// }
// getName()
</script>
