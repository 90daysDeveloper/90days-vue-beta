<template>
  <div class="profilo">
    <h3>Il mio obiettivo</h3>
    <div class="alert" role="alert">
      <i v-if="loading" class="pi pi-spin pi-spinner"></i>
      <p v-else>{{ obiettivo.obiettivo }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AxiosService from '@/axiosService/AxiosService';

// eslint-disable-next-line no-undef
const props = defineProps({
  id_utente: String,
})
const API_90D = new AxiosService('directus')
const loading = ref(false)
const obiettivo = ref([])

async function getObiettivo() {
  loading.value = true
  API_90D.leggiObiettivi('user_id', props.id_utente)
    .then(res => obiettivo.value = res.data[0])
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getObiettivo()
</script>
