<template>
  <div v-if="authStore.DirectusUser.gruppo === null">
    <WaitingList></WaitingList>
  </div>
  <div v-else>
    <div v-if="loading">
      Caricamento...
    </div>
    <div v-else>
      <div v-if="utente" class="profilo mt-3">
        <h1>{{ utente.nome }}</h1>
        <div class="level">
          <!-- <h4>Growth points&nbsp;<b>{{ utente.livello }}</b></h4> -->
        </div>
      </div>
    </div>
    <ObiettivoInfo></ObiettivoInfo>
    <hr>
    <Habit></Habit>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import WaitingList from '@/components/mastergroup/WaitingList.vue'
import ObiettivoInfo from '@/components/profilo/ObiettivoInfo.vue';
import Habit from '@/components/habit/Habit.vue'
import AxiosService from '@/axiosService/AxiosService';
const authStore = useAuthStore()
const loading = ref(false)
const utente = ref([])

const API_90D = new AxiosService
const id_utente = authStore.DirectusUser.is


async function getUtente() {
  loading.value = true
  API_90D.leggiUtenti('id', id_utente)
    .then(res => utente.value = res.data[0])
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getUtente()
</script>
