<template>
  <div v-if="utente" class="profilo mt-3">
    <h1>{{ utente.nome }}</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AxiosService from '@/axiosService/AxiosService';

// eslint-disable-next-line no-undef
const props = defineProps({
  id_utente: String
})

const API_90D = new AxiosService

const loading = ref(false)
const utente = ref([])

async function getUtente() {
  loading.value = true
  API_90D.leggiUtenti('id', props.id_utente)
    .then(res => utente.value = res.data[0])
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getUtente()
</script>
