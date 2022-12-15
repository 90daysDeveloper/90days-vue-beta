<template>
  <div class="profilo">
    <div class="alert" role="alert">
      <i v-if="loading" class="pi pi-spin pi-spinner"></i>
      <p v-else>{{ obiettivo.obiettivo }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AxiosService from '@/axiosService/AxiosService';

const loading = ref(false)
const obiettivo = ref([])
const authStore = useAuthStore()
const API_90D = new AxiosService('directus')
const uid_utente = authStore.DirectusUser.uid

async function getObiettivo() {
  loading.value = true
  API_90D.leggiObiettivi('user_uid', uid_utente)
    .then(res => obiettivo.value = res.data[0])
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getObiettivo()

</script>
