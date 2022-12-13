<template>
  <p v-if="loading">Caricamento...</p>
  <div v-else class="recap mt-2">
    <div v-if="difference >= 6 && difference < 7 ||
    difference >= 13 && difference < 14 ||
    difference >= 20 && difference < 21 ||
    difference >= 27 && difference < 28 ||
    difference >= 34 && difference < 35 ||
    difference >= 41 && difference < 42 ||
    difference >= 48 && difference < 49 ||
    difference >= 55 && difference < 56 ||
    difference >= 62 && difference < 63 ||
    difference >= 69 && difference < 70 ||
    difference >= 76 && difference < 77 ||
    difference >= 83 && difference < 84 ||
    difference >= 89 && difference < 90">
      <div class="alert alert-warning fade show" role="alert">
        <span>
          Ricordati di compilare il tuo recap settimanale!
        </span>
        <button class="btn btn-dark" @click="newRecap()">Nuovo recap</button>
      </div>
    </div>
  </div>
</template>

<script setup >
import router from '@/router'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AxiosService from '@/axiosService/AxiosService';


const loading = ref(true)
const authStore = useAuthStore()

const API_90D = new AxiosService
const nome_gruppo = authStore.DirectusUser.gruppo

const difference = ref()

function getDirectusUser() {
  authStore.getDirectusUser()
}
getDirectusUser()

async function getDay() {
  loading.value = true
  API_90D.leggiGruppi('nome', nome_gruppo)
    .then(res => {
      if (res.data[0]) {
        let created = new Date(res.data[0].start)
        let today = new Date()
        difference.value = (today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
      }
    })
    .finally(loading.value = false)
}
getDay()

function newRecap() {
  router.push('/nuovo-recap')
}

</script>
