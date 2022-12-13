<template>
  <div class="text-center mt-3">
    <h1>Ciao {{ gruppo.nome }}!</h1>
    <p>Il vostro prossimo appuntamento è: <b>{{ gruppo.data }}</b></p>
    <br>
    <div v-if="modifyInfo">
      <div class="form-group mt-3">
        <label class="form-label" for="titolo">Aggiorna la data di incontro</label>
        <input type="text" class="form-control" id="titolo" placeholder="" v-model="gruppo.data">
      </div>
      <div class="form-group mt-3">
        <label class="form-label" for="titolo">Aggiorna il link di Google Meet</label>
        <input type="text" class="form-control" id="titolo" placeholder="" v-model="gruppo.link">
      </div>
      <div class="d-md-flex justify-content-end align-items-center mt-4">
        <a class="annulla" @click="unPatchInfo">Annulla</a>
        <button class="btn btn-outline-light ms-3" type="submit" @click="saveInfo()">Aggiorna</button>
      </div>
    </div>
    <div v-else>
      <button class="btn btn-outline-light" @click="patchInfo">Aggiorna le informazioni</button>
    </div>
    <hr>
    <button class="btn btn-primary" @click="goMeet(gruppo.link)">Per partecipare alla riunione clicca qui</button>
    <hr>
  </div>
  <div class="utenti">
    <div v-for="utente of utenti" :key="utente.id" class="singolo" @click="goToProfile(utente.id)">
      <h1>{{ utente.nome }}</h1>
      <!-- <h4>Growth points&nbsp;<b>{{ utente.livello }}</b></h4> -->
    </div>
  </div>
  <div class="space"></div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import router from '@/router'
import AxiosService from '@/axiosService/AxiosService';

const route = useRoute()

const API_90D = new AxiosService
const id_gruppo = route.params.idGroup

const loading = ref(false)
const utenti = ref([])
const gruppo = ref([])
const modifyInfo = ref(false)

async function getGroup() {
  loading.value = true
  API_90D.leggiGruppi('nome', id_gruppo)
    .then(res => {
      gruppo.value = res.data[0]
      console.log(gruppo)
    })
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getGroup()

async function getUsers() {
  loading.value = true
  API_90D.leggiUtenti('gruppo', id_gruppo)
    .then(res => utenti.value = res.data)
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getUsers()

function patchInfo() {
  modifyInfo.value = true
}
function unPatchInfo() {
  modifyInfo.value = false
}

async function saveInfo() {
  loading.value = true
  API_90D.modificaGruppi(gruppo.value)
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      modifyInfo.value = false
    })
}

function goMeet(elem) {
  window.open(
    elem,
    '_blank'
  );
}

function goToProfile(idUtente) {
  router.push('/profilo/' + idUtente)
}
</script>
