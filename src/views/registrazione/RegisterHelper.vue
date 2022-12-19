<template>
  <div class="content">
    <div class="container router-view">
      <div class="register" style="padding: 0px;">

        <h1>Alla grande {{ authStore.DirectusUser.nome }}🔥</h1>
        <h3>Manca poco!</h3>

        <hr>

        <p>In cosa ti senti di poter aiutare gli altri in questi 90 giorni?</p>
        <div class="form-check mt-4">
          <input class="form-check-input" type="checkbox" inputId="studio" v-model="form.studio" />
          <label class="form-check-label" for="studio">Studio</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" inputId="fitness_alimentazione"
            v-model="form.fitness_alimentazione" />
          <label class="form-check-label" for="fitness_alimentazione">Fitness e alimentazione</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" inputId="benessere_psicologico"
            v-model="form.benessere_psicologico" />
          <label class="form-check-label" for="benessere_psicologico">Benessere psicologico</label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" inputId="lavoro" v-model="form.lavoro" />
          <label class="form-check-label" for="lavoro">Lavoro</label>
        </div>
        <div class="mt-4">
          <button class="btn btn-primary" type="submit" @click="newHelper()">Portami all'ultimo step!</button>
        </div>

        <div class="counter-step mt-3">
          <div class="step"></div>
          <div class="step"></div>
          <div class="step"></div>
          <div class="step active"></div>
          <div class="step"></div>
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

const studio = ref(null)
const fitness_alimentazione = ref(null)
const benessere_psicologico = ref(null)
const lavoro = ref(null)
// const router = useRouter()
const form = {
  user_uid: authStore.DirectusUser.uid,
  user_id: authStore.DirectusUser.id,
  studio: studio.value,
  fitness_alimentazione: fitness_alimentazione.value,
  benessere_psicologico: benessere_psicologico.value,
  lavoro: lavoro.value
}

function newHelper() {
  loading.value = true
  API_90D.creaHelper(form)
    .then(res => console.log(res))
    .catch(err => console.error(err))
    .finally(() => {
      loading.value = false
      window.location.href = '/register-time'
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
