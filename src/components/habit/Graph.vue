<template>
  <div v-if="loading" class="mb-3">
    Caricamento progressi...
  </div>
  <div v-else-if="habit">
    <Chart type="line" :data="basicData" :options=basicOptions />
  </div>
  <div v-else class="mt-3 newLink">
    <button class="btn btn-primary" @click="goTo('/habit-tracker')">Crea un'abitudine</button>
    <span>Vedrai qui i tuoi progressi <i class="pi pi-chart-line"></i></span>
  </div>
</template>

<script setup>
// IMPORTS

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AxiosService from '@/axiosService/AxiosService';
import { useAuthStore } from '@/stores/auth';


// eslint-disable-next-line no-undef
const props = defineProps({
  id_utente: String
})

// USES
const authStore = useAuthStore()
const router = useRouter()
// CONTROLLING THE COMOPONENET
const loading = ref(false)
// HABIT
const habit = ref()

const API_90D = new AxiosService('directus')
const nome_gruppo = authStore.DirectusUser.gruppo

function goTo(next) {
  router.push(next)
}

async function getHabit() {
  loading.value = true
  API_90D.leggiAbitudini('user_id', props.id_utente)
    .then(res => {
      habit.value = res.data[0]
    })
    .catch(err => console.error(err))
    .finally(() => {
      habit.value ? buildGraphData() : false
      loading.value = false
    })
}

// GRAPH
const roughGraphData = ref()
const cumulativeGraphData = ref()
// const finalGraphData = ref(null)
const progress = ref()

function buildGraphData() {
  loading.value = true
  roughGraphData.value = habit.value.JSON_Data.map(x => {
    return x.Action == 1
      ? 1
      : 0
  })
  if (roughGraphData.value)
    cumulativeGraphData.value = roughGraphData.value.map((sum => value => sum += value)(0))
  getGroupStartDate()
}

const created = ref('')
const today = new Date()
const graphLabels = ref([])

function getGroupStartDate() {
  loading.value = true

  API_90D.leggiGruppi('nome', nome_gruppo)
    .then(res => {
      created.value = new Date(res.data[0].start)
      progress.value = Math.floor((today.getTime() - created.value.getTime()) / (1000 * 60 * 60 * 24))
    })
    .catch(err => console.error(err))
    .finally(() => {
      basicData.value.datasets[0].data = cumulativeGraphData.value.splice(0, progress.value + 1)
      loading.value = false
      basicData.value.datasets[0].label = habit.value.nome

      getDateLabels()
    })
}

function getDateLabels() {
  var getDaysArray = function (start, end) {

    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt).toLocaleDateString('it-IT', { month: 'short', day: 'numeric' }));
    }
    return arr;
  };
  graphLabels.value = getDaysArray(
    new Date(created.value),
    new Date(today));
}
const basicData = ref({
  labels: graphLabels,
  datasets: [
    {
      label: '',
      type: 'line',
      backgroundColor: '#ffd900',
      data: [],
      fill: false,
      borderColor: '#ffd900',
      tension: .0
    },
  ]
})

const basicOptions = ref({
  plugins: {
    legend: {
      labels: {
        color: '#ffffff'
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#495057'
      },
      grid: {
        color: '#495057'
      }
    },
    y: {
      ticks: {
        color: '#495057'
      },
      grid: {
        color: '#495057'
      }
    }
  }
})
getHabit()
</script>

