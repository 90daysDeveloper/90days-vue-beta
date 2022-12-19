<template>

  <div v-for="(week, index) of weeks" :key="index">
    <SettimanaView @newHabitTrackerLog="newHabitTrackerLog" :habit="habit" :currentWeek="index++" :showSalva="false"
      class="mb-2">
    </SettimanaView>
  </div>

  <div class="mt-3">
    <p v-if="loading" disabled>Salvataggio...</p>
    <button :disabled="disabilitato" class="btn btn-primary" v-else @click="salva">Salva</button>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import AxiosService from '@/axiosService/AxiosService';
import SettimanaView from './SettimanaView.vue'

// eslint-disable-next-line no-undef, no-unused-vars
const props = defineProps({
  habit: Object,
  currentWeek: Number
})

const loading = ref(false)
const disabilitato = ref(true)

const API_90D = new AxiosService('directus')

// Accepts the array and key
const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result;
  }, {}); // empty object is the initial value for result object
};

// Group by color as key to the person array
const weeks = ref(groupBy(props.habit.JSON_Data, 'Settimana'));


const tmpHabit = ref(null)
function newHabitTrackerLog(event) {
  disabilitato.value = false
  tmpHabit.value = null
  tmpHabit.value = event
}

function salva() {
  loading.value = true
  API_90D.modificaAbitudini(tmpHabit.value)
    .then(res => res)
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      disabilitato.value = true
    })
}
</script>
