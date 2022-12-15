<template>
  <div class="diario">
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item" role="presentation">
        <button class="nav-link active" id="diario-tab" data-bs-toggle="pill" data-bs-target="#diario" type="button"
          role="tab" aria-controls="diario" aria-selected="true">Pagine</button>
      </li>
      <li v-if="authStore.DirectusUser.gruppo !== null" class="nav-item" role="presentation">
        <button class="nav-link" id="recap-week-tab" data-bs-toggle="pill" data-bs-target="#recap-week" type="button"
          role="tab" aria-controls="recap-week" aria-selected="false">Recap settimanale</button>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="diario" role="tabpanel" aria-labelledby="diario-tab" tabindex="0">
        <div class="d-grid d-md-flex justify-content-md-end addPage">
          <button class="btn btn-primary" @click="newPage()">Crea pagina</button>
        </div>
        <div v-if="diario">
          <div class="card text-bg-dark mt-3" v-for=" pagina  of diario.slice().reverse()" :key="pagina.id">
            <div class="row single" @click="readPost(pagina.id)">
              <div class="col">
                <div class="card-body">
                  <h3 class="card-title">{{ pagina.titolo }}</h3>
                  <p class="card-text">{{ pagina.testo.slice(0, 70) }} ...</p>
                  <p class="card-text mt-2"><small class="text-muted">{{ formatDate(pagina.date_created) }}</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="recap-week" role="tabpanel" aria-labelledby="recap-week-tab" tabindex="0">
        <div class="d-grid d-md-flex justify-content-md-end addPage">
          <button class="btn btn-primary" @click="newRecap()">Nuovo recap</button>
        </div>
        <div v-if="recap">
          <div class="card text-bg-dark mt-3" v-for=" single  of recap.slice().reverse()" :key="single.id">
            <div class="row single" @click="readRecap(single.id)">
              <div class="col">
                <div class="card-body">
                  <h3 class="card-title">Settimana {{ single.settimana }}</h3>
                  <p class="card-text">{{ single.migliorare }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import AxiosService from '@/axiosService/AxiosService';
import { ref } from 'vue'
const authStore = useAuthStore()
function getDirectusUser() {
  authStore.getDirectusUser()
}
getDirectusUser()

const API_90D = new AxiosService('directus')
const uid_utente = authStore.DirectusUser.uid

const loading = ref(false)
const diario = ref([])
const recap = ref([])

async function getDiario() {
  loading.value = true
  API_90D.leggiDiario('user_uid', uid_utente)
    .then(res => diario.value = res.data)
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getDiario()

async function getRecap() {
  loading.value = true
  API_90D.leggiRecapSettimanale('user_uid', uid_utente)
    .then(res => recap.value = res.data)
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getRecap()

function newPage() {
  router.push('/nuova-pagina')
}
function readPost(elem) {
  router.push(`/diario/${elem}`)
}

function newRecap() {
  router.push('/nuovo-recap')
}
function readRecap(elem) {
  router.push(`/recap/${elem}`)
}

function formatDate(date) {
  const newDate = new Date(date).toLocaleDateString('it-IT')
  return newDate
}
</script>
