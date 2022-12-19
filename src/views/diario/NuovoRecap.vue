<template>

  <div class="diario">

    <div v-if="loading">
      Caricamento nuova pagina...
    </div>
    <div v-else>
      <h1 class="text-center data">Settimana: {{ currentWeek }}</h1>
      <div class="form-group mt-3">
        <label class="form-label" for="meglio">Cosa ha funzionato e continuerò a fare?</label>
        <textarea rows="6" class="form-control" id="meglio" v-model="form.meglio"
          placeholder="Ho fatto...e ha funzionato perché..."></textarea>
      </div>
      <div class="form-group mt-3">
        <label class="form-label" for="peggio">Cosa è andato male?</label>
        <textarea rows="6" class="form-control" id="peggio" v-model="form.peggio"
          placeholder="Penso di aver..."></textarea>
      </div>
      <div class="form-group mt-3">
        <label class="form-label" for="migliorare">Cosa posso fare per ottenere un risultato migliore?</label>
        <textarea rows="6" class="form-control" id="migliorare" v-model="form.migliorare"
          placeholder="Se ricapiterà questa cosa mi impegnerò a..."></textarea>
      </div>
      <div class="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
        <button class="btn btn-outline-light" @click="goDiary()">Annulla</button>
        <button class="btn btn-primary" type="submit" @click="savePost()">Salva il recap</button>
      </div>
    </div>

  </div>

</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import router from '@/router'
import AxiosService from '@/axiosService/AxiosService';

const authStore = useAuthStore()
const loading = ref(false)

function getDirectusUser() {
  authStore.getDirectusUser()
}
getDirectusUser()

const API_90D = new AxiosService('directus')
const nome_gruppo = authStore.DirectusUser.gruppo

const form = ref({
  meglio: '',
  peggio: '',
  migliorare: '',
  settimana: null,
  user_uid: null,
  user_id: null
})

function savePost() {
  form.value.user_uid = authStore.DirectusUser.uid
  form.value.user_id = authStore.DirectusUser.id
  form.value.settimana = currentWeek.value
  loading.value = true
  API_90D.creaRecapSettimanale(form.value)
    .then(res => (res))
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      router.push('/diario')
    })
}

function goDiary() {
  router.push('/diario')
}

const currentWeek = ref(null)
async function getSettimanaCorrente() {
  loading.value = true
  API_90D.leggiGruppi('nome', nome_gruppo)
    .then(res => {
      let created = new Date(res.data[0].start)
      let today = new Date()
      let difference = (today.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
      if (difference < 7) currentWeek.value = 1
      if (difference >= 7 && difference < 14) currentWeek.value = 2
      if (difference >= 14 && difference < 21) currentWeek.value = 3
      if (difference >= 21 && difference < 28) currentWeek.value = 4
      if (difference >= 28 && difference < 35) currentWeek.value = 5
      if (difference >= 35 && difference < 42) currentWeek.value = 6
      if (difference >= 42 && difference < 49) currentWeek.value = 7
      if (difference >= 49 && difference < 56) currentWeek.value = 8
      if (difference >= 56 && difference < 63) currentWeek.value = 9
      if (difference >= 63 && difference < 70) currentWeek.value = 10
      if (difference >= 70 && difference < 77) currentWeek.value = 11
      if (difference >= 77 && difference < 84) currentWeek.value = 12
      if (difference >= 84 && difference < 91) currentWeek.value = 13
      if (difference >= 91) console.log('l\'avventura is over')
    })
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getSettimanaCorrente()


</script>
