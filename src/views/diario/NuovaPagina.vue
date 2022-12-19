<template>

  <div class="diario">

    <div v-if="loading">
      Caricamento nuova pagina...
    </div>
    <div v-else>
      <h1 class="text-center data">{{ formatDate(today) }}</h1>
      <div class="form-group mt-3">
        <label class="form-label" for="titolo">Dai un titolo a questa pagina di diario</label>
        <input type="text" class="form-control" id="titolo" v-model="form.titolo" placeholder="Titolo">
      </div>
      <div class="form-group mt-3">
        <label class="form-label" for="testo">Scrivi la tua pagina</label>
        <textarea rows="6" class="form-control" id="testo" v-model="form.testo"
          placeholder="Oggi ho imparato che..."></textarea>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
        <button class="btn btn-outline-light" @click="goDiary()">Annulla</button>
        <button class="btn btn-primary" type="submit" @click="savePost()">Salva</button>
      </div>
    </div>

  </div>

</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import AxiosService from '@/axiosService/AxiosService';
import { ref } from 'vue'
import router from '@/router'

const authStore = useAuthStore()
const loading = ref(false)

const API_90D = new AxiosService('directus')

var today = new Date()

function getDirectusUser() {
  authStore.getDirectusUser()
}
getDirectusUser()

const form = ref({
  titolo: '',
  testo: '',
  user_uid: null,
  user_id: null,
})

function formatDate(date) {
  const newDate = new Date(date).toLocaleDateString('it-IT')
  return newDate
}

function savePost() {
  form.value.user_uid = authStore.DirectusUser.uid
  form.value.user_id = authStore.DirectusUser.id
  loading.value = true
  API_90D.creaDiario(form.value)
    .then(() => (('Page saved')))
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      router.push('/diario')
    })
}

function goDiary() {
  router.push('/diario')
}

</script>
