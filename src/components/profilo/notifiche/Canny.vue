<template>
  <p v-if="loading">Caricamento...</p>
  <div v-else class="canny mt-2">
    <div v-if="difference >= 29 && difference < 30 ||
    difference >= 59 && difference < 60 ||
    difference >= 89 && difference < 90">
      <div class="alert alert-warning fade show" role="alert">
        <span>
          Ciao {{ authStore.DirectusUser.nome }} è tempo di <strong>feedback</strong>, vai su Canny per dirci come
          migliorare.
        </span>
        <button class="btn btn-primary" @click="goToCanny">Canny</button>
      </div>
    </div>
  </div>
</template>

<script setup >
import { ref } from 'vue'
import AxiosService from '@/axiosService/AxiosService';
import { useAuthStore } from '@/stores/auth'

const loading = ref(true)
const authStore = useAuthStore()

const API_90D = new AxiosService('directus')
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

function goToCanny() {
  window.open(
    'https://90days.canny.io/feedback',
    '_blank'
  );
}

</script>
