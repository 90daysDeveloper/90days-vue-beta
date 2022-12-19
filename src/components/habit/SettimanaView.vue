<template>
  <div v-if="settimana">

    <div class="week">
      <div @click="changeDayState(day)" v-for="(day, index) of settimana" :key="index" class="flex">
        <div v-if="day.Action == 0" class="habit null">
          <div class="single">
            <span>{{ day.label.slice(0, 2) }}</span>
            <span class="little">{{ day.label.slice(2) }}</span>
          </div>
        </div>
        <div v-if="day.Action == 1" class="habit true">
          <div class="single">
            <span>{{ day.label.slice(0, 2) }}</span>
            <span class="little">{{ day.label.slice(2) }}</span>
          </div>
        </div>
        <div v-if="day.Action == 2" class="habit false">
          <div class="single">
            <span>{{ day.label.slice(0, 2) }}</span>
            <span class="little">{{ day.label.slice(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showSalva" class="mt-3">
      <p v-if="loading" disabled>Salvataggio...</p>
      <button :disabled="disabilitato" class="btn btn-primary" v-else @click="salva">Salva</button>
    </div>

  </div>
  <div v-else>
    [Errore nel caricamento della settimana, prova a ricaricare la pagina o a contattare il supporto tecnico]
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import AxiosService from '@/axiosService/AxiosService';

const API_90D = new AxiosService('directus')
const disabilitato = ref(true)
// eslint-disable-next-line no-undef
const props = defineProps({
  habit: Object,
  currentWeek: Number,
  showSalva: {
    type: Boolean,
    default: true
  }
})

const tmpHabit = ref({ ...props.habit })
// eslint-disable-next-line no-undef
const emits = defineEmits(['newHabitTrackerLog'])

const loading = ref(false)
const settimana = ref(null)

function changeDayState(day) {
  disabilitato.value = false
  emits('newHabitTrackerLog', props.habit)
  switch (day.Action) {
    case 0:
      day.Action = 1
      day.Nome = tmpHabit.value.nome
      break
    case 1:
      day.Action = 2
      day.Nome = tmpHabit.value.nome
      break
    case 2:
      day.Action = 0
      day.Nome = tmpHabit.value.nome
      break
  }
}

function salva() {
  loading.value = true
  API_90D.modificaAbitudini(tmpHabit.value)
    .then(() => {
      disabilitato.value = true
    })
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}

// settimana.value = await props.habit.JSON_Data.filter(day => day.Settimana == props.currentWeek)
watch(() => props.habit.JSON_Data, () => {
  return settimana.value = props.habit.JSON_Data.filter(day => day.Settimana == props.currentWeek)
})

settimana.value = props.habit.JSON_Data.filter(day => day.Settimana == props.currentWeek)

async function setSettimana() {
  settimana.value = await props.habit.JSON_Data.filter(day => day.Settimana == props.currentWeek)
}

setSettimana()

watch(() => props.currentWeek, () => setSettimana())

</script>
