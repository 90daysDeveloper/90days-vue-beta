<template>
  <div class="account mt-3">
    <a class="btn btn-primary" href="https://t.me/+CDZyZAZHzNwzNTA8" target="_blank">Entra nel canale Telegram della
      community</a>
    <hr>
    <h2>Account</h2>
    <div v-if="view">
      <div v-if="loading">
        Caricamento informazioni...
      </div>
      <div v-else>
        <div class="table-row">
          <div class="title-row">Email:</div>
          <div>{{ authStore.userData.email }}</div>
        </div>
        <div class="table-row">
          <div class="title-row">Nome:</div>
          <div>{{ utente.nome }}</div>
        </div>
        <div class="table-row">
          <div class="title-row">Cognome:</div>
          <div>{{ utente.cognome }}</div>
        </div>
        <div class="table-row">
          <div class="title-row">Profilo:</div>
          <div>{{ utente.pubblico ? 'Pubblico' : 'Privato' }}</div>
        </div>
        <div class="table-row">
          <div class="title-row">Gruppo:</div>
          <div>{{ utente.gruppo }}</div>
        </div>
        <div class="table-row">
          <div class="title-row">Data iscrizione:</div>
          <div>{{ formatDate(utente.date_created) }}</div>
        </div>
        <button class="btn btn-outline-light mt-3 mb-3" @click="modifyAccount()">Modifica account</button>
      </div>
    </div>
    <div v-else>
      <div class="form-group mt-3">
        <label class="form-label" for="titolo">Nome</label>
        <input type="text" class="form-control" id="titolo" placeholder="" v-model="utente.nome">
      </div>
      <div class="form-group mt-3">
        <label class="form-label" for="titolo">Cognome</label>
        <input type="text" class="form-control" id="titolo" placeholder="" v-model="utente.cognome">
      </div>
      <div class="form-group mt-3">
        <input class="form-check-input" type="checkbox" id="pubblicp" v-model="utente.pubblico" :binary="true" />
        <label class="form-check-label" for="pubblicp">&nbsp;Profilo pubblico</label>
      </div>
      <div class="text-end mt-3">
        <a class="annulla" @click="unModifyAccount()">Annulla</a>
        <button class="btn btn-primary ms-3" type="submit" @click="updateProfile()">Aggiorna</button>
      </div>
    </div>
    <hr>
    <h2>I tuoi orari</h2>
    <div v-if="orari">
      <div class="table-row">
        <div class="title-row">7:00 - 8:00</div>
        <div>{{ orari.orario_1 ? 'Selezionato' : '' }}</div>
      </div>
      <div class="table-row">
        <div class="title-row">13:00 - 14:00</div>
        <div>{{ orari.orario_2 ? 'Selezionato' : '' }}</div>
      </div>
      <div class="table-row">
        <div class="title-row">18:30 - 19:30</div>
        <div>{{ orari.orario_3 ? 'Selezionato' : '' }}</div>
      </div>
      <div class="table-row">
        <div class="title-row">21:00 - 22:00</div>
        <div>{{ orari.orario_4 ? 'Selezionato' : '' }}</div>
      </div>
    </div>
    <div v-else>
      Non hai inserito gli orari, vai sulla pagina profilo per inserirli.
    </div>
    <hr>
    <h2>Logout</h2>
    <button type="button" class="btn btn-danger mt-2" @click="logout">
      <i class="fa-solid fa-power-off"></i> Logout
    </button>
    <div class="container-fluid mt-5 mobile">
      <div class="container text-center">
        <div class="row">
          <div class="col">
            <div class="footer">
              Copyright © 2022 90days.<br>
              Tutti i diritti riservati.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import AxiosService from '@/axiosService/AxiosService';
import { ref } from 'vue'
const authStore = useAuthStore();

const API_90D = new AxiosService('directus')
const uid_utente = authStore.DirectusUser.uid

const loading = ref(false)
const utente = ref([])
const orari = ref([])
const view = ref(true)

async function getUtente() {
  loading.value = true
  API_90D.leggiUtenti('uid', uid_utente)
    .then(res => utente.value = res.data[0])
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getUtente()

function modifyAccount() {
  view.value = false
}
function unModifyAccount() {
  view.value = true
}
function updateProfile() {
  utente.value.date_updated = new Date()
  loading.value = true
  API_90D.modificaUtenti(utente.value)
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      view.value = true
    })
}

function formatDate(date) {
  const newDate = new Date(date).toLocaleDateString('it-IT')
  return newDate
}

async function getOrari() {
  loading.value = true
  orari.value = null
  API_90D.leggiOrari('user_uid', uid_utente)
    .then(res => orari.value = res.data[0])
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getOrari()

function logout() {
  localStorage.removeItem('userLogin90days')
  authStore.logoutUser()
}
</script>
