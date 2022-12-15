<template>
  <p v-if="loading">Caricamento...</p>
  <div class="diario">
    <div v-if="recap">

      <div v-if="view">
        <div class="card text-bg-dark mb-3 mt-4">
          <div class="row">
            <div class="col">
              <div class="card-body">
                <h2 class="card-title mb-3">Settimana: {{ recap.data.settimana }}</h2>
                <h3 class="mt-3">Cosa ha funzionato e continuerò a fare:</h3>
                <p class="card-text">{{ recap.data.meglio }}</p>
                <h3 class="mt-3">Cosa è andato male:</h3>
                <p class="card-text">{{ recap.data.peggio }}</p>
                <h3 class="mt-3">Cosa posso fare per ottenere un risultato migliore:</h3>
                <p class="card-text">{{ recap.data.migliorare }}</p>
              </div>
            </div>
          </div>

        </div>
        <div class="d-md-flex justify-content-end align-items-center mt-2">
          <a class="annulla" @click="goDiary()">Torna al diario</a> <button class="btn btn-outline-light"
            @click="modifyRecap()">Modifica</button>
        </div>
      </div>


      <div v-else>
        <div v-if="deleteConfirm">
          <div class="alert alert-danger d-flex align-items-center justify-content-between" role="alert">
            <div><i class="fa-solid fa-triangle-exclamation"></i> Sei sicur* di voler cancellare il recap?</div>
            <div>
              <button class="btn btn-outline-danger me-2" type="submit" @click="deleteRecap()">Si</button>
            </div>
          </div>
          <div class="text-end">
            <a class="annulla" @click="hiddenDelete()">Annulla</a>
          </div>
        </div>
        <div class="form-group mt-3">
          <label class="form-label" for="recap">Cosa ha funzionato e continuerò a fare:</label>
          <textarea rows="6" class="form-control" id="recap" v-model="recap.data.meglio"></textarea>
        </div>
        <div class="form-group mt-3">
          <label class="form-label" for="recap">Cosa è andato male:</label>
          <textarea rows="6" class="form-control" id="recap" v-model="recap.data.peggio"></textarea>
        </div>
        <div class="form-group mt-3">
          <label class="form-label" for="recap">Cosa posso fare per ottenere un risultato diverso:</label>
          <textarea rows="6" class="form-control" id="recap" v-model="recap.data.migliorare"></textarea>
        </div>
        <div class="d-md-flex justify-content-end align-items-center mt-4">
          <a class="annulla" @click="unModifyRecap()">Annulla</a>
          <button class="btn btn-outline-light ms-2" type="submit" @click="viewDelete()">Elimina</button>
          <button class="btn btn-primary ms-3" type="submit" @click="saveRecap()">Aggiorna</button>
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

const loading = ref(false)
const recap = ref()

const API_90D = new AxiosService('directus')

async function getRecap() {
  loading.value = true
  API_90D.leggiById('RecapSettimanale', route.params.idRecap)
    .then(res => {
      recap.value = res
      console.log(recap)
    })
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getRecap()

function modifyRecap() {
  view.value = false
}
function unModifyRecap() {
  view.value = true
}

function viewDelete() {
  deleteConfirm.value = true
}
function hiddenDelete() {
  deleteConfirm.value = false
}

function saveRecap() {
  loading.value = true
  API_90D.modificaRecapSettimanale(recap.value.data)
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      router.push('/diario')
    })
}

function deleteRecap() {
  loading.value = true
  API_90D.eliminaRecapSettimanale(route.params.idRecap)
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

// function formatDate(date) {
// 	const newDate = new Date(date).toLocaleDateString('it-IT')
// 	return newDate
// }
</script>
