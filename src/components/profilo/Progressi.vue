<template>
  <h3>I tuoi progressi</h3>
  <div class="mt-3 mb-3">
    <Graph :id_utente="props.id_utente"></Graph>
  </div>
  <div v-if="authStore.DirectusUser.id == id_utente" class="my-4">
    <a :class="{ disabled: !is_valid }" :href="'/share/' + props.id_utente" target="blank"
      class="btn btn-primary btn-lg" style="width: 100%;">Condividi il tuo percorso</a>
    <p v-if="!is_valid" class="mt-2" style="color:maroon;font-weight:bold">
      Prima di condividere crea la tua abitudine
    </p>
    <p class="small-text mt-2">Questo raddoppierà le tue probabilità di successo</p>

  </div>
</template>

<script setup >
import { ref, computed } from 'vue'
import AxiosService from '@/axiosService/AxiosService';
import Graph from "@/components/habit/Graph.vue"
import { useAuthStore } from "../../stores/auth";
// eslint-disable-next-line no-undef
const props = defineProps({
  id_utente: String
})

const loading = ref(false)

const has_obbiettivo = ref()
const has_abitudine = ref()

const authStore = useAuthStore()

const API_90D = new AxiosService
const id_utente = authStore.DirectusUser.id

function getObiettivo() {
  loading.value = true
  API_90D.leggiObiettivi('user_id', id_utente)
    .then(res => has_obbiettivo.value = !!res.data[0].id)
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
    })
}

function getAbitudine() {
  loading.value = true
  API_90D.leggiAbitudini('user_id', id_utente)
    .then(res => has_abitudine.value = !!res.data[0].id)
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
    })
}

const is_valid = computed(() => {
  if (has_abitudine.value && has_obbiettivo.value) {
    return true
  } else {
    return false
  }
})

getObiettivo()
getAbitudine()

</script>
