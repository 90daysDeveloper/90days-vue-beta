<template>
  <div class="percorso">
    <div v-if="authStore.DirectusUser.gruppo === null">
      <div v-if="percorso">
        <h3 class="mt-3">Le tue guide</h3>
        <div v-for="tappa of percorso.data" :key="tappa.id">
          <div class="card text-bg-dark mt-3 tappa">
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
      </div>
      <div>
        <h3 class="mt-5">I prossimi passi</h3>
        <img src="./../../assets/Istruzioni-login.png" width="500" class="istruction-desktop" style="margin: 20px 0px;">
        <img src="./../../assets/Istruzioni-mobile-login.png" class="istruction-mobile"
          style="margin: 20px 0px; width: 100%;">
      </div>
    </div>
    <div v-else>
      <div v-if="percorso.data">
        <h3 class="mt-3">Le tue guide</h3>
        <div v-if="currentWeek == 1">
          <div class="card text-bg-dark mt-3 tappa">
            <div class="row single" @click="readPercorso(percorso.data[0].id)">
              <div class="col">
                <div class="card-body">
                  <p class="card-text mb-2"><small class="text-muted">Settimana {{ percorso.data[0].settimana }}</small>
                  </p>
                  <h3 class="card-title">{{ percorso.data[0].titolo }}</h3>
                  <div class="read">
                    <u>Leggi di più</u>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card text-bg-dark mt-3 tappa">
            <div class="row single" @click="readPercorso(percorso.data[1].id)">
              <div class="col">
                <div class="card-body">
                  <p class="card-text mb-2"><small class="text-muted">Settimana {{ percorso.data[1].settimana }}</small>
                  </p>
                  <h3 class="card-title">{{ percorso.data[1].titolo }}</h3>
                  <div class="read">
                    <u>Leggi di più</u>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="card text-bg-dark mt-3 tappa">
            <div class="row single" @click="readPercorso(percorso.data[0].id)">
              <div class="col">
                <div class="card-body">
                  <p class="card-text mb-2"><small class="text-muted">Settimana {{ percorso.data[0].settimana }}</small>
                  </p>
                  <h3 class="card-title">{{ percorso.data[0].titolo }}</h3>
                  <div class="read">
                    <u>Leggi di più</u>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button @click="goTo('/percorso')" class="btn btn-outline-light mt-3">Leggi tutte le tappe passate</button>
      </div>
      <div v-else>
        <i class="pi pi-spin pi-spinner mt-4 mr-4"></i> Caricamento percorso...
      </div>
    </div>
  </div>
</template>

<script setup>
import router from '@/router'
import AxiosService from '@/axiosService/AxiosService';
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
function getDirectusUser() {
  authStore.getDirectusUser()
}
getDirectusUser()

const API_90D = new AxiosService('directus')
const nome_gruppo = authStore.DirectusUser.gruppo

const loading = ref(false)
const percorso = ref([])

const currentWeek = ref(null)
async function getGroupStartDate() {
  loading.value = true
  API_90D.leggiGruppi('nome', nome_gruppo)
    .then(res => {
      if (res.data.data[0]) {
        let created = new Date(res.data.data[0].start).getTime()
        let today = new Date().getTime()
        let progress = Math.floor((today - created) / (1000 * 60 * 60 * 24))
        if (progress < 7) currentWeek.value = 1
        if (progress >= 7 && progress < 14) currentWeek.value = 2
        if (progress >= 14 && progress < 21) currentWeek.value = 3
        if (progress >= 21 && progress < 28) currentWeek.value = 4
        if (progress >= 28 && progress < 35) currentWeek.value = 5
        if (progress >= 35 && progress < 42) currentWeek.value = 6
        if (progress >= 42 && progress < 49) currentWeek.value = 7
        if (progress >= 49 && progress < 56) currentWeek.value = 8
        if (progress >= 56 && progress < 63) currentWeek.value = 9
        if (progress >= 63 && progress < 70) currentWeek.value = 10
        if (progress >= 70 && progress < 77) currentWeek.value = 11
        if (progress >= 77 && progress < 84) currentWeek.value = 12
        if (progress >= 84 && progress < 91) currentWeek.value = 13
        if (progress >= 91) console.log('l\'avventura is over')
      }
    })
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      getPercorso()
    })
}
getGroupStartDate()


async function getPercorso() {
  loading.value = true
  API_90D.leggiPercorso('settimana', nome_gruppo ? currentWeek.value : '0')
    .then(res => percorso.value = res)
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}

function readPercorso(elem) {
  router.push(`/percorso/${elem}`)
}

function goTo(to) {
  router.push(to)
}

</script>
