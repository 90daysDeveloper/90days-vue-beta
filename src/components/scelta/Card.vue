<!-- eslint-disable no-undef -->
<template>
  <div class="scelta">
    <a>
      <div class="card">
        <div @click="openDescription" class="card-header text-center flex flex-wrap align-items-center ">
          <span class="font-bold m-2">Orari disponibili</span>
          <span class="px-1" style="background-color: mintcream; border-radius: 5px; margin: 0 .3rem; color: black"
            v-for="(orario, index) in group.orari_disponibili" :key="index">{{ orario
            }}</span>

        </div>
        <div class="card-body">
          <h3 @click="openDescription" class="card-title">{{ group.nome }}
            <img v-for="(user, index) in group.partecipanti" :key="index" src="../../assets/icon/profilo.svg">
            <img v-for="(user, index) in (4 - group.partecipanti.length)" :key="index"
              src="../../assets/icon/profilo.svg" style="opacity:.2">
          </h3>
          <div @click="goTo('/informazioni')" v-if="descriptionVisible" class="row">
            <div v-for="partecipante in partecipanti" :key="partecipante.id" class="col-md-4 col-sm-6 mb-2">
              <h4>{{ partecipante.nome }}</h4>
              <p>Obiettivo</p>
              <div class="alert alert-work">{{ partecipante.obiettivo }}</div>
              <p>Può aiutarti in</p>
              <div class="alert alert-fitness">{{ partecipante.helper }}</div>
            </div>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>

<script setup>
import AxiosService from '@/axiosService/AxiosService';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
function goTo(next) {
  router.push(next)
}

const loading = ref(false)

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  group: Object
})

const descriptionVisible = ref(false)
function openDescription() {
  descriptionVisible.value = !descriptionVisible.value
}


const partecipanti = ref([])
function getUsers() {
  loading.value = true
  const API_90D = new AxiosService('directus')
  props.group.partecipanti.forEach(idPartecipante => {
    API_90D.leggiUtenti("id", idPartecipante)
      .then(async res => {
        const tempUser = { ...res.data[0], obiettivo: '', helper: '' }
        tempUser.obiettivo = await getObiettivo(res.data[0])
        tempUser.helper = await getHelper(res.data[0])
        partecipanti.value.push(tempUser)
      })
      .finally(() => {
        loading.value = false
      })
  })

}

async function getObiettivo(utente) {
  const API_90D = new AxiosService('directus')
  API_90D.leggiObiettivi('user_id', utente.id)
    .then(res => {
      return res.data[0].categoria
    })
}

async function getHelper(utente) {
  const API_90D = new AxiosService('directus')
  API_90D.leggiHelper('user_id', utente.id)
    .then(res => {

      return res.data[0]
    })
}

getUsers()
</script>
