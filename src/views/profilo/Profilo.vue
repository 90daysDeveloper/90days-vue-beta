<template>
  <div v-if="authStore.DirectusUser.id == route.params.idUtente">
    <PrimoAppuntamento></PrimoAppuntamento>
    <RecapWeek></RecapWeek>
    <Canny></Canny>
  </div>
  <InputText v-model="prova"></InputText>
  <Button label="mail chimp" @click="getMailChimp"></Button>
  <Informazioni :id_utente="route.params.idUtente"></Informazioni>
  <Obiettivo :id_utente="route.params.idUtente"></Obiettivo>
  <Progressi v-if="authStore.DirectusUser.gruppo !== null" :id_utente="route.params.idUtente"></Progressi>
  <Percorso v-if="authStore.DirectusUser.id == route.params.idUtente"></Percorso>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import PrimoAppuntamento from '@/components/profilo/notifiche/PrimoAppuntamento.vue'
import RecapWeek from '@/components/profilo/notifiche/RecapWeek.vue'
import Canny from '@/components/profilo/notifiche/Canny.vue'
import Informazioni from '@/components/profilo/Informazioni.vue'
import Obiettivo from '@/components/profilo/Obiettivo.vue'
import Progressi from '@/components/profilo/Progressi.vue'
import Percorso from '@/components/percorso/Percorso.vue'
import { useRoute, useRouter } from 'vue-router'
import AxiosService from '@/axiosService/AxiosService'
import { ref } from 'vue'

import axios from 'axios'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const obiettivo = ref([])
const orari = ref([])
const helper = ref([])

const API_90D = new AxiosService('directus')
const uid_utente = authStore.DirectusUser.uid
const id_utente = authStore.DirectusUser.id

const prova = ref()
function getMailChimp() {
  axios.get('https://90days-vue-beta.vercel.app/api/handler?name=' + prova.value,).then(res => console.log(res))
}


function getPayment() {
  loading.value = true
  if (authStore.DirectusUser.payment == true) {
    console.log('ha pagato');
    getObiettivo();
  } else {
    console.log('non ha pagato');
    router.push('/register-payment');
  }
}

const getObiettivo = () => {
  console.log('get obiettivo')
  loading.value = true
  obiettivo.value = null
  API_90D.leggiObiettivi('user_id', id_utente)
    .then(res => obiettivo.value = res.data[0])
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      if (!obiettivo.value) {
        router.push('/register-target')
      } else {
        getHelper()
      }
    })
}

const getHelper = () => {
  loading.value = true
  helper.value = null
  API_90D.leggiHelper('user_uid', uid_utente)
    .then(res => helper.value = res.data[0])
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      if (!helper.value) {
        router.push('/register-helper')
      } else {
        getOrari()
      }
    })
}

const getOrari = () => {
  loading.value = true
  orari.value = null
  API_90D.leggiOrari('user_id', id_utente)
    .then(res => orari.value = res.data[0])
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      if (!orari.value) {
        router.push('/register-time')
      }
    })
}
getPayment()


API_90D.leggiById('Utenti', '2').then(res => console.log('leggi utenti by id 2 ', res))
</script>
