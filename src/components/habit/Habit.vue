<template>

  <p v-if="loading">Caricamento...</p>

  <div v-else-if="habit">
    <div v-if="modify">
      <h4>Per riuscirci mi impegno a <b>{{ habit.nome }}</b></h4>
      <div class="mt-3">
        <a class="annulla" @click="modifyHabit()">Modifica abitudine</a>
      </div>
    </div>
    <div v-else>
      <div class="form-group mb-2">
        <h4>Per riuscirci mi impegno a </h4>
        <input type="text" class="form-control mt-3" id="titolo" :placeholder="habit.nome" v-model="habit.nome">
      </div>
      <button @click="updateHabit" class="btn btn-primary mb-3">Modifica la tua abitudine</button>
      <br>
      <a class="annulla mt-3" @click="unModifyHabit()">Annulla</a>
    </div>
    <hr>
    <button v-if="view == 'calendario'" class="btn btn-outline-light mb-5" @click="switchToSettimana">La settimana
      corrente</button>
    <button v-if="view == 'settimana'" class="btn btn-outline-light mb-3" @click="switchToCalendar">I miei 90
      giorni</button>
    <h4 v-if="view == 'settimana'" class="mt-3 mb-3"> Settimana: {{ currentWeek }}</h4>
    <SettimanaView v-if="view == 'settimana'" :habit="habit" :currentWeek="currentWeek">
    </SettimanaView>
    <CalendarView v-if="view == 'calendario'" :habit="habit" :currentWeek="currentWeek"></CalendarView>
  </div>

  <div v-else>
    <h3>Sei pront*?</h3>
    <p>Metti in pratica tutto quello che hai imparato durante l'onboarding e crea la tua abitudine!</p>
    <div class="form-group mt-4 mb-2">
      <textarea rows="4" type="text" class="form-control" id="titolo"
        :placeholder="(obiettivo ? obiettivo.obiettivo : '') + ' Per raggiungerlo mi impegno a...'"
        v-model="newHabit.nome"></textarea>
    </div>
    <button @click="showPageSection" class="btn btn-primary">Crea la tua abitudine</button>
  </div>
</template>

<script setup >
import { ref } from 'vue'
import AxiosService from '@/axiosService/AxiosService'
import { useAuthStore } from '@/stores/auth'
import SettimanaView from './SettimanaView.vue'
import CalendarView from './CalendarView.vue'

const loading = ref(true)
const authStore = useAuthStore()

const API_90D = new AxiosService('directus')
const uid_utente = authStore.DirectusUser.uid
const nome_gruppo = authStore.DirectusUser.gruppo

const view = ref('settimana')
const modify = ref(true)

const adventureStart = ref()

function modifyHabit() {
  modify.value = false
}
function unModifyHabit() {
  modify.value = true
}

const habit = ref(null)
const currentWeek = ref(null)

async function getHabit() {
  loading.value = true
  API_90D.leggiAbitudini('user_uid', uid_utente)
    .then(res => {
      habit.value = res.data[0]
    })
    .catch(err => console.error(err))
    .finally(() => {
      getSettimanaCorrente()
    })
}

async function getSettimanaCorrente() {
  loading.value = true
  API_90D.leggiGruppi('nome', nome_gruppo)
    .then(res => {
      adventureStart.value = new Date(res.data[0].start)
      let today = new Date()
      let difference = (today.getTime() - adventureStart.value.getTime()) / (1000 * 60 * 60 * 24)
      if (difference < 7) currentWeek.value = 1
      if (difference >= 7 && difference < 14) currentWeek.value = 2
      if (difference >= 14 && difference < 21) currentWeek.value = 3
      if (difference >= 21 && difference < 28) currentWeek.value = 4
      if (difference >= 28 && difference < 35) currentWeek.value = 5
      if (difference >= 35 && difference < 42) currentWeek.value = 6
      if (difference >= 42 && difference < 49) currentWeek.value = 7
      if (difference >= 49 && difference < 56) currentWeek.value = 8
      if (difference >= 56 && difference < 63) currentWeek.value = 9
      if (difference >= 63 && difference < 70) currentWeek.value = 10
      if (difference >= 70 && difference < 77) currentWeek.value = 11
      if (difference >= 77 && difference < 84) currentWeek.value = 12
      if (difference >= 84 && difference < 91) currentWeek.value = 13
      if (difference >= 91) console.log("l'avventura is over")
    })
    .catch(err => console.log(err))
    .finally(() => getLabelsForCalendar())
}

// getSettimanaCorrente()

const labelsForCalendar = ref([])
function getLabelsForCalendar() {
  loading.value = false
  let adventureEnd = new Date(adventureStart.value);
  adventureEnd.setDate(adventureEnd.getDate() + 91);

  var getDaysArray = function (start, end) {
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt).toLocaleDateString('it-IT', { month: 'short', day: 'numeric' }));
    }
    return arr;
  };

  labelsForCalendar.value = getDaysArray(
    new Date(adventureStart.value),
    new Date(adventureEnd));

  for (let day = 0; day < habit.value.JSON_Data.length; day++) {
    habit.value.JSON_Data[day].label = labelsForCalendar.value[day]
  }
}

const newHabit = ref({
  nome: '',
  JSON_data: [],
  perc_completamento: 0,
  user_uid: authStore.DirectusUser.uid,
  user_id: authStore.DirectusUser.id,
  attiva: true,
  gruppo: authStore.DirectusUser.gruppo
})

async function showPageSection() {
  loading.value = true
  API_90D.creaAbitudini(newHabit.value)
    .catch(err => console.error(err))
    .finally(() => {
      getHabit()
      loading.value = false
    })
}

function switchToCalendar() {
  view.value = 'calendario'
}

function switchToSettimana() {
  view.value = 'settimana'
}

const obiettivo = ref('')
function getObiettivo() {
  loading.value = true
  API_90D.leggiObiettivi('user_uid', uid_utente)
    .then(res => obiettivo.value = res.data[0])
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getObiettivo()
getHabit()

function updateHabit() {
  habit.value.date_updated = new Date()
  loading.value = true
  API_90D.modificaAbitudini(habit.value)
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      modify.value = true
    })
}
</script>
