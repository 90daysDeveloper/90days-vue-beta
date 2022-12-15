<template>
  <p v-if="loading">Caricamento informazioni...</p>
  <div class="diario">
    <div v-if="tappa">
      <small class="text-muted">Settimana: {{ tappa.data.settimana }}</small>
      <h1 class="card-title">{{ tappa.data.titolo }}</h1>
      <div class="card text-bg-dark mb-3 mt-4">
        <div class="row">
          <div class="col">
            <div class="card-body">
              <span class="card-text" v-html="tappa.data.testo"></span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3>Aiutaci a migliorare💜</h3>
        <h4 class="mt-2">Quanto hai trovato utile la tappa?</h4>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" inputId="poco" v-model="form.poco" />
          <label class="form-check-label" for="poco">Poco utile</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" inputId="nulla" v-model="form.nulla" />
          <label class="form-check-label" for="nulla">Ne utile ne inutile</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" inputId="molto" v-model="form.molto" />
          <label class="form-check-label" for="molto">Molto utile</label>
        </div>
        <h4 class="mt-2">La cosa che hai trovato meno utile?</h4>
        <div class="form-group mt-3">
          <textarea rows="6" class="form-control" id="feedback" v-model="form.feedback"
            placeholder="La cosa che ho trovato meno utile è stata..."></textarea>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
          <button class="btn btn-primary" type="submit" @click="saveFeedback()">Invia il feedback</button>
        </div>
      </div>
      <div class="d-md-flex justify-content-end align-items-center mt-4">
        <a class="annulla" @click="goPercorso()">Torna al percorso</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import router from '@/router'

import { useAuthStore } from '@/stores/auth'
import AxiosService from '@/axiosService/AxiosService'
const authStore = useAuthStore()
function getDirectusUser() {
  authStore.getDirectusUser()
}
getDirectusUser()

const route = useRoute()

const loading = ref(false)
const tappa = ref()

const API_90D = new AxiosService('directus')
const id_tappa = route.params.idTappa

const form = ref({
  poco: '',
  nulla: '',
  molto: '',
  feedback: '',
  settimana: null,
  user_uid: null,
  user_id: null
})

async function gettappa() {
  loading.value = true
  API_90D.leggiById('Percorso', id_tappa)
    .then(res => {
      tappa.value = res
      console.log(tappa)
    })
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
gettappa()

function saveFeedback() {
  form.value.user_uid = authStore.DirectusUser.uid
  form.value.user_id = authStore.DirectusUser.id
  form.value.settimana = tappa.value.data.settimana
  form.value.titolo = tappa.value.data.titolo
  loading.value = true

  API_90D.creaPercorsoFeedback(form.value)
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      router.push('/percorso')
    })
}


function goPercorso() {
  router.push('/percorso')
}
</script>
