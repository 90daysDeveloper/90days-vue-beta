<template>
  <div class="content">
    <div class="container router-view">
      <div class="register" style="padding: 0px;">

        <h1>Ultima domanda per te {{ authStore.DirectusUser.nome }}🎯</h1>
        <h3>Promesso!</h3>

        <hr>

        <p>In che orari sei disponibile per fare il Mastergroup?</p>
        <em class="small-text">Ricorda: cercheremo di trovare persone che hanno inserito le tue stesse disponibilità
          orarie. Per facilitare
          il
          processo <b>inserisci tutti gli orari in cui sei disponibile</b>. Questo ci aiuterà a fare un match ancora più
          allineato con il tuo obiettivo.</em>
        <div class="form-check mt-4">
          <input class="form-check-input" type="checkbox" inputId="orario_1" v-model="form.orario_1" />
          <label class="form-check-label" for="orario_1">7:00 - 8:00</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" inputId="orario_2" v-model="form.orario_2" />
          <label class="form-check-label" for="orario_2">13:00 - 14:00</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" inputId="orario_3" v-model="form.orario_3" />
          <label class="form-check-label" for="orario_3">18:30 - 19:30</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" inputId="orario_4" v-model="form.orario_4" />
          <label class="form-check-label" for="orario_4">21:00 - 22:00</label>
        </div>
        <div class="mt-4">
          <button class="btn btn-primary" type="submit" @click="newTime()">Portami al mio profilo</button>
        </div>

        <div class="counter-step mt-3">
          <div class="step"></div>
          <div class="step"></div>
          <div class="step"></div>
          <div class="step"></div>
          <div class="step active"></div>
        </div>

      </div>
    </div>
  </div>

</template>

<script setup>
import AxiosService from '@/axiosService/AxiosService';
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
const authStore = useAuthStore()
function getDirectusUser() {
  authStore.getDirectusUser()
}
getDirectusUser()

const API_90D = new AxiosService('directus')

const loading = ref(false)
// const router = useRouter()
const orario_1 = ref('')
const orario_2 = ref('')
const orario_3 = ref('')
const orario_4 = ref('')

const form = {
  user_uid: authStore.DirectusUser.uid,
  user_id: authStore.DirectusUser.id,
  orario_1: orario_1.value,
  orario_2: orario_2.value,
  orario_3: orario_3.value,
  orario_4: orario_4.value
}

function newTime() {
  loading.value = true
  API_90D.creaOrari(form)
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      window.location.href = '/'
    })
}

// function getName() {
// 	var emailItem = localStorage.getItem('userLogin90days')
//   if (emailItem) {
//     router.push('/')
//   }
// }
// getName()
</script>
