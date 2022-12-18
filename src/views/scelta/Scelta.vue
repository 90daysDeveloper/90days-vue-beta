<template>
  <div class="scelta">
    <h3 class="mb-3">I MasterGroup pensati per te</h3>
    <Card v-for="group in groupList" :key="group.id" :group="group"></Card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AxiosService from '@/axiosService/AxiosService';
import Card from '@/components/scelta/Card.vue'

const API_90D = new AxiosService('directus')
const loading = ref(false)

const groupList = ref([])

function getGroupList() {
  loading.value = true
  API_90D.leggiGruppi()
    .then(res => {
      groupList.value = res.data
    })
    .finally(() => {
      loading.value = false
    })
}

getGroupList()
</script>
