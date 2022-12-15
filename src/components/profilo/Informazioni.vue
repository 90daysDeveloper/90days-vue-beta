<template>
  <div v-if="utente" class="profilo mt-3">
    <div class="account">
      <h1>{{ utente.nome }}</h1>
      <div v-if="authStore.DirectusUser.id == props.id_utente">
        <a class="account-link" @click="goTo('/account')"><img src="../../assets/icon/account.svg" width="30">
          Account</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import AxiosService from '@/axiosService/AxiosService';

const router = useRouter()
const authStore = useAuthStore()

// eslint-disable-next-line no-undef
const props = defineProps({
  id_utente: String
})

const API_90D = new AxiosService('directus')
const loading = ref(false)
const utente = ref([])

async function getUtente() {
  loading.value = true
  API_90D.leggiUtenti('id', props.id_utente)
    .then(res => utente.value = res.data[0])
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getUtente()

function goTo(to) {
  router.push(to)
}
</script>
