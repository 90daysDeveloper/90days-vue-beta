<template>
  <div v-if="loading">Caricamento...</div>
  <div v-else>
    <div v-if="authStore.DirectusUser.gruppo == null || currentWeek > 1">
    </div>
    <div v-else>
      <div class="canny mt-2">
        <div class="alert alert-warning fade show" role="alert">
          <div v-if="appointment.length < 4">
            <span>
              Ciao {{ authStore.DirectusUser.nome }}, il tuo MasterGroup è pronto! Da oggi iniziano i tuoi 90
              giorni🚀<br><br>
              <b>Se non hai scelto i giorni per la prima call fallo subito.</b><br>
              Se vedi la chat: presentati💜
              <hr>
              <button class="btn btn-dark" @click="goTo('/mastergroup')">Scegli i giorni</button>
            </span>
          </div>
          <div v-else>
            <!-- Martedì -->
            <div
              v-if="appointment[0].martedi === true && appointment[1].martedi === true && appointment[2].martedi === true && appointment[3].martedi === true">
              <h5><b>{{ utenti[0].nome }}, {{ utenti[1].nome }}, {{ utenti[2].nome }} e {{
                  utenti[3].nome
              }}..benvenuti
                  nel MasterGroup {{ gruppo[0].nome }}!</b></h5>
              La vostra prima call sarà <b>questo martedì</b> ore <b>{{ gruppo[0].orario }} 🎉</b>
              <hr>
              <b>{{ utenti[0].nome }}</b> hai appena vinto la creazione del link per la prima call🔥<br>
              Ti consigliamo di crearlo subito. Se hai dubbi scrivi pure in chat, è un buon modo per rompere il
              ghiaccio🧊
              <br><br>
              <a class="btn btn-dark" href="https://www.90days.it/mastergroup.php" target="_blank">Segui questo
                tutorial</a>
              <hr>
              <b>Vi ricordiamo di essere puntuali!</b>
              <em class="small-text">Questo messaggio si auto-distruggerà settimana prossima.</em>
            </div>
            <!-- Mercoledì -->
            <div
              v-else-if="appointment[0].mercoledi === true && appointment[1].mercoledi === true && appointment[2].mercoledi === true && appointment[3].mercoledi === true">
              <h5><b>{{ utenti[0].nome }}, {{ utenti[1].nome }}, {{ utenti[2].nome }} e {{ utenti[3].nome }}..benvenuti
                  nel
                  MasterGroup {{ gruppo[0].nome }}!</b></h5>
              La vostra prima call sarà <b>questo mercoledì</b> ore <b>{{ gruppo[0].orario }} 🎉</b>
              <hr>
              <b>{{ utenti[0].nome }}</b> hai appena vinto la creazione del link per la prima call🔥<br>
              Ti consigliamo di crearlo subito. Se hai dubbi scrivi pure in chat, è un buon modo per rompere il
              ghiaccio🧊
              <br><br>
              <a class="btn btn-dark" href="https://www.90days.it/mastergroup.php" target="_blank">Segui questo
                tutorial</a>
              <hr>
              <em class="small-text">Questo messaggio si auto-distruggerà domenica.</em>
            </div>
            <!-- Giovedì -->
            <div
              v-else-if="appointment[0].giovedi === true && appointment[1].giovedi === true && appointment[2].giovedi === true && appointment[3].giovedi === true">
              <h5><b>{{ utenti[0].nome }}, {{ utenti[1].nome }}, {{ utenti[2].nome }} e {{ utenti[3].nome }}..benvenuti
                  nel MasterGroup {{ gruppo[0].nome }}!</b></h5>
              La vostra prima call sarà <b>questo giovedì</b> ore <b>{{ gruppo[0].orario }} 🎉</b>
              <hr>
              <b>{{ utenti[0].nome }}</b> hai appena vinto la creazione del link per la prima call🔥<br>
              Ti consigliamo di crearlo subito. Se hai dubbi scrivi pure in chat, è un buon modo per rompere il
              ghiaccio🧊
              <br><br>
              <a class="btn btn-dark" href="https://www.90days.it/mastergroup.php" target="_blank">Segui questo
                tutorial</a>
              <hr>
              <em class="small-text">Questo messaggio si auto-distruggerà domenica.</em>
            </div>
            <!-- Venerdì -->
            <div
              v-else-if="appointment[0].venerdi === true && appointment[1].venerdi === true && appointment[2].venerdi === true && appointment[3].venerdi === true">
              <h5><b>{{ utenti[0].nome }}, {{ utenti[1].nome }}, {{ utenti[2].nome }} e {{ utenti[3].nome }}..benvenuti
                  nel MasterGroup {{ gruppo[0].nome }}!</b></h5>
              La vostra prima call sarà <b>questo venerdì</b> ore <b>{{ gruppo[0].orario }} 🎉</b>
              <hr>
              <b>{{ utenti[0].nome }}</b> hai appena vinto la creazione del link per la prima call🔥<br>
              Ti consigliamo di crearlo subito. Se hai dubbi scrivi pure in chat, è un buon modo per rompere il
              ghiaccio🧊
              <br><br>
              <a class="btn btn-dark" href="https://www.90days.it/mastergroup.php" target="_blank">Segui questo
                tutorial</a>
              <hr>
              <em class="small-text">Questo messaggio si auto-distruggerà domenica.</em>
            </div>
            <!-- Sabato -->
            <div
              v-else-if="appointment[0].sabato === true && appointment[1].sabato === true && appointment[2].sabato === true && appointment[3].sabato === true">
              <h5><b>{{ utenti[0].nome }}, {{ utenti[1].nome }}, {{ utenti[2].nome }} e {{ utenti[3].nome }}..benvenuti
                  nel MasterGroup {{ gruppo[0].nome }}!</b></h5>
              La vostra prima call sarà <b>questo sabato</b> ore <b>{{ gruppo[0].orario }} 🎉</b>
              <hr>
              <b>{{ utenti[0].nome }}</b> hai appena vinto la creazione del link per la prima call🔥<br>
              Ti consigliamo di crearlo subito. Se hai dubbi scrivi pure in chat, è un buon modo per rompere il
              ghiaccio🧊
              <br><br>
              <a class="btn btn-dark" href="https://www.90days.it/mastergroup.php" target="_blank">Segui questo
                tutorial</a>
              <hr>
              <em class="small-text">Questo messaggio si auto-distruggerà domenica.</em>
            </div>
            <!-- Domenica -->
            <div
              v-else-if="appointment[0].domenica === true && appointment[1].domenica === true && appointment[2].domenica === true && appointment[3].domenica === true">
              <h5><b>{{ utenti[0].nome }}, {{ utenti[1].nome }}, {{ utenti[2].nome }} e {{ utenti[3].nome }}..benvenuti
                  nel MasterGroup {{ gruppo[0].nome }}!</b></h5>
              La vostra prima call sarà <b>questa domenica</b> ore <b>{{ gruppo[0].orario }} 🎉</b>
              <hr>
              <b>{{ utenti[0].nome }}</b> hai appena vinto la creazione del link per la prima call🔥<br>
              Ti consigliamo di crearlo subito. Se hai dubbi scrivi pure in chat, è un buon modo per rompere il
              ghiaccio🧊
              <br><br>
              <a class="btn btn-dark" href="https://www.90days.it/mastergroup.php" target="_blank">Segui questo
                tutorial</a>
              <hr>
              <em class="small-text">Questo messaggio si auto-distruggerà domenica.</em>
            </div>
            <div v-else>
              <span>
                Ciao {{ authStore.DirectusUser.nome }} sei pront* per la tua prima call? <b>A breve troverai qui la
                  data!</b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup >
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import AxiosService from '@/axiosService/AxiosService';


const router = useRouter()
const loading = ref(false)
const appointment = ref([])
const gruppo = ref([])
const utenti = ref([])
const authStore = useAuthStore()
const currentWeek = ref(null)

const API_90D = new AxiosService
const nome_gruppo = authStore.DirectusUser.gruppo

function getDirectusUser() {
  authStore.getDirectusUser()
}
getDirectusUser()

async function getAppointment() {
  loading.value = true
  API_90D.leggiPrimoAppuntamento('gruppo', nome_gruppo)
    .then(res => appointment.value = res.data)
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getAppointment()

async function getUsers() {
  loading.value = true
  API_90D.leggiUtenti('gruppo', nome_gruppo)
    .then(res => utenti.value = res.data)
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getUsers()

async function getGruppoInfo() {
  loading.value = true
  API_90D.leggiGruppi('nome', nome_gruppo)
    .then(res => {
      if (res.data) {
        gruppo.value = res.data
        let start = new Date(res.data[0].start)
        let today = new Date()
        let difference = (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
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
        if (difference >= 91) console.log('l\'avventura is over')
      }
    })
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getGruppoInfo()

function goTo(to) {
  router.push(to)
}

</script>
