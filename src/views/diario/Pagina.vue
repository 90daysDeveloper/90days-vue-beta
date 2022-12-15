<template>
  <p v-if="loading">Caricamento...</p>
  <div class="diario">
    <div v-if="diario">

      <div v-if="view">
        <div class="card text-bg-dark mb-3 mt-4">
          <div class="row">
            <div class="col">
              <div class="card-body">
                <h3 class="card-title">{{ diario.data.titolo }}</h3>
                <p class="card-text">{{ diario.data.testo }}</p>
                <p class="card-text"><small class="text-muted">{{ formatDate(diario.data.date_created) }}</small></p>
              </div>
            </div>
          </div>

        </div>
        <div class="d-md-flex justify-content-end align-items-center mt-2">
          <a class="annulla" @click="goDiary()">Torna al diario</a> <button class="btn btn-outline-light"
            @click="modifyPost()">Modifica</button>
        </div>
      </div>


      <div v-else>
        <div v-if="deleteConfirm">
          <div class="alert alert-danger d-flex align-items-center justify-content-between" role="alert">
            <div><i class="fa-solid fa-triangle-exclamation"></i> Sei sicur* di voler cancellare la pagina?</div>
            <div>
              <button class="btn btn-outline-danger me-2" type="submit" @click="deletePost()">Si</button>
            </div>
          </div>
          <div class="text-end">
            <a class="annulla" @click="hiddenDelete()">Annulla</a>
          </div>
        </div>
        <div class="form-group mt-3">
          <label class="form-label" for="titolo">Modifica il titolo</label>
          <input type="text" class="form-control" id="titolo" placeholder="" v-model="diario.data.titolo">
        </div>
        <div class="form-group mt-3">
          <label class="form-label" for="testo">Modifica la pagina</label>
          <textarea rows="6" class="form-control" id="testo" placeholder="pagina.titolo"
            v-model="diario.data.testo"></textarea>
        </div>
        <div class="d-md-flex justify-content-end align-items-center mt-4">
          <a class="annulla" @click="unModifyPost()">Annulla</a>
          <button class="btn btn-outline-light ms-2" type="submit" @click="viewDelete()">Elimina</button>
          <button class="btn btn-primary ms-3" type="submit" @click="savePost()">Aggiorna</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import router from '@/router'
import AxiosService from '@/axiosService/AxiosService';

const view = ref(true)
const deleteConfirm = ref(false)
const route = useRoute()

const API_90D = new AxiosService('directus')
const id_pagina = route.params.idPagina

const loading = ref(false)
const diario = ref()

async function getPost() {
  loading.value = true
  API_90D.leggiById('Diario', id_pagina)
    .then(res => {
      diario.value = res
      console.log(diario.value)
    })
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getPost()

function modifyPost() {
  view.value = false
}
function unModifyPost() {
  view.value = true
}

function viewDelete() {
  deleteConfirm.value = true
}
function hiddenDelete() {
  deleteConfirm.value = false
}

function savePost() {
  // diario.value.data.date_updated = new Date()
  loading.value = true
  API_90D.modificaDiario(diario.value)
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      router.push('/diario')
    })
}

function deletePost() {
  loading.value = true
  API_90D.eliminaDiario(id_pagina)
    .then(res => res.send(console.log('Page delete')))
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      router.push('/diario')
    })
}

function goDiary() {
  router.push('/diario')
}

function formatDate(date) {
  const newDate = new Date(date).toLocaleDateString('it-IT')
  return newDate
}
</script>
