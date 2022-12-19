<template>
  <h2>Benvenut* nel MasterGroup <b class="purple">{{ authStore.DirectusUser.gruppo }}</b>!</h2>
  <h3>Aiutaci ad organizzare il vostro primo incontro.</h3>
  <hr>
  <h3>Per il tuo gruppo l'orario selezionato è <b class="purple">{{ gruppo.orario }}</b></h3>
  <hr>
  <p>Ora inizia il bello! Per organizzare il primo incontro abbiamo bisogno che indichi almeno 5 disponibilità...ma se
    vuoi segnarle tutte ancora meglio!</p>
  <br>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" inputId="martedi" v-model="form.martedi" />
    <label class="form-check-label" for="martedi">Martedì</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" inputId="mercoledi" v-model="form.mercoledi" />
    <label class="form-check-label" for="mercoledi">Mercoledì</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" inputId="giovedi" v-model="form.giovedi" />
    <label class="form-check-label" for="giovedi">Giovedì</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" inputId="venerdi" v-model="form.venerdi" />
    <label class="form-check-label" for="venerdi">Venerdì</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" inputId="sabato" v-model="form.sabato" />
    <label class="form-check-label" for="sabato">Sabato</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" inputId="domenica" v-model="form.domenica" />
    <label class="form-check-label" for="domenica">Domenica</label>
  </div>
  <div class="d-md-flex justify-content-end align-items-center mt-4">
    <button class="btn btn-primary" type="submit" @click="updateUser(); registerAppointment()">Invia le
      disponibilità</button>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import AxiosService from '@/axiosService/AxiosService';
import { ref } from 'vue'

const authStore = useAuthStore()
function getDirectusUser() {
  authStore.getDirectusUser()
}
getDirectusUser()

const API_90D = new AxiosService('directus')
const nome_gruppo = authStore.DirectusUser.gruppo

const loading = ref(false)
const gruppo = ref([])
const user = {
  "id": authStore.DirectusUser.id,
  "date_updated": new Date(),
  "primo_appuntamento": true
}

const form = ref({
  martedi: null,
  mercoledi: null,
  giovedi: null,
  venerdi: null,
  sabato: null,
  domenica: null,
  gruppo: null,
  user_uid: null
})

async function getGroup() {
  loading.value = true
  API_90D.leggiGruppi('nome', nome_gruppo)
    .then(res => gruppo.value = res.data[0])
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getGroup()

async function registerAppointment() {
  form.value.user_uid = authStore.DirectusUser.uid
  form.value.gruppo = authStore.DirectusUser.gruppo
  loading.value = true
  API_90D.creaPrimoAppuntamento(form.value)
    .then(res => (console.log('appuntamento: ', res)))
    .catch(err => console.error('errore: ', err))
    .finally(() => {
      updateUser()
    })
}

function updateUser() {
  loading.value = true
  API_90D.modificaUtenti(user)
    .then(res => (res))
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      location.reload()
    })
}

</script>
