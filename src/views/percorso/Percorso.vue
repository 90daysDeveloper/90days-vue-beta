<template>

  <div class="diario">
    <div v-if="percorso">
      <div class="card text-bg-dark mt-3" v-for="tappa of percorso.slice().reverse()" :key="tappa.id">
        <div class="row single" @click="readPercorso(tappa.id)">
          <div class="col">
            <div class="card-body">
              <p class="card-text mb-2"><small class="text-muted">Settimana {{ tappa.settimana }}</small></p>
              <h3 class="card-title">{{ tappa.titolo }}</h3>
              <div class="read">
                <u>Leggi di più</u>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-md-flex justify-content-end align-items-center mt-4">
      <a class="annulla" @click="goProfilo()">Torna al profilo</a>
    </div>
  </div>

</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { ref } from 'vue'
import AxiosService from '@/axiosService/AxiosService';
const authStore = useAuthStore()
function getDirectusUser() {
  authStore.getDirectusUser()
}
getDirectusUser()

const loading = ref(false)
const data = ref()
const percorso = ref([])

const API_90D = new AxiosService('directus')
const nome_gruppo = authStore.DirectusUser.gruppo

async function getGroupStartDate() {
  loading.value = true
  API_90D.leggiGruppi('nome', nome_gruppo)
    .then(res => {
      let created = new Date(res.data[0].start).getTime()
      let today = new Date().getTime()
      data.value = Math.floor((today - created) / (1000 * 60 * 60 * 24))
    })
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      getPercorso(data.value)
    })
}
getGroupStartDate()

async function getPercorso(number) {
  loading.value = true
  API_90D.leggiPercorso('giorno', number)
    .then(res => {
      percorso.value = res.data
      console.log(res)
      console.log(percorso.value)
    })
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}

function readPercorso(elem) {
  router.push(`/percorso/${elem}`)
}

function goProfilo() {
  router.push('/')
}
</script>
