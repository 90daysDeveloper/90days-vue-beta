<template>
  <div class="profilo">
    <div v-if="view">
      <div class="alert" role="alert">
        <i v-if="loading" class="pi pi-spin pi-spinner"></i>
        <p v-else>{{ obiettivo.obiettivo }}</p>
      </div>

      <div v-if="authStore.DirectusUser.id == id_utente" class="text-end mt-3">
        <a class="annulla" @click="modifyObiettivo()">Modifica obiettivo</a>
      </div>
    </div>
    <div v-else>
      <div class="form-group mt-3">
        <label class="form-label" for="testo">Modifica il tuo obiettivo</label>
        <textarea rows="3" class="form-control" id="testo" placeholder="" v-model="obiettivo.obiettivo"></textarea>
      </div>
      <div class="text-end mt-3">
        <a class="annulla" @click="unModifyObiettivo()">Annulla</a>
        <button class="btn btn-primary ms-3" type="submit" @click="updateObiettivo()">Aggiorna</button>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth';
import AxiosService from '@/axiosService/AxiosService';
// eslint-disable-next-line no-undef
const props = defineProps({
  id_utente: String,
})
const authStore = useAuthStore()
const API_90D = new AxiosService
const loading = ref(false)
const obiettivo = ref([])
const view = ref(true)

function modifyObiettivo() {
  view.value = false
}
function unModifyObiettivo() {
  view.value = true
}

async function getObiettivo() {
  loading.value = true
  API_90D.leggiObiettivi('user_id', props.id_utente)
    .then(res => obiettivo.value = res.data[0])
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getObiettivo()

function updateObiettivo() {
  obiettivo.value.date_updated = new Date()
  loading.value = true
  API_90D.modificaObiettivi(obiettivo.value)
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      view.value = true
    })
}
</script>
