<template>
  <div class="progress">
    <div class="in" :style="{ 'width': progress + '%' }">
      &nbsp;
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

import AxiosService from '@/axiosService/AxiosService';


const authStore = useAuthStore()
function getDirectusUser() {
  authStore.getDirectusUser()
}

const API_90D = new AxiosService('directus')
const nome_gruppo = authStore.DirectusUser.gruppo

getDirectusUser()

const loading = ref(false)
const progress = ref()

async function getGroupStartDate() {
  loading.value = true
  API_90D.leggiGruppi('nome', nome_gruppo)
    .then(res => {
      if (res.data[0]) {
        let created = new Date(res.data[0].start).getTime()
        let today = new Date().getTime()
        progress.value = (today - created) / (1000 * 60 * 60 * 24) / .9
      }
    })
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getGroupStartDate()

</script>
