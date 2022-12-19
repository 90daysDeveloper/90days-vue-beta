<template>
  <div class="content">
    <div class="container router-view">
      <div class="register" style="padding: 0px;">

        <div v-for="utente of utente" :key="utente.id">
          <h1>Ci siamo {{ utente.nome }}❤️</h1>
        </div>
        <h3>Crea il tuo obiettivo</h3>

        <hr>

        <div class="form-group mt-3">
          <label class="form-label" for="obiettivo">Obiettivo</label>
          <textarea rows="6" class="form-control" id="obiettivo" v-model="form.obiettivo"
            placeholder="Il mio obiettivo è...e per me è importante perché..."></textarea>
        </div>
        <div class="form-group mt-3">
          <label class="form-label" for="categoria">In che categoria identifichi il tuo obiettivo?</label>
          <select @change="populateForm" name="categoria" id="categoria" v-model="form.categoria" class="form-select">
            <option v-for="category of activeCategories" :key="category.id" :value="category.name">{{ category.name
            }}</option>
          </select>
        </div>
        <div class="mt-4">
          <button class="btn btn-primary" type="submit" @click="createTarget()">Crea il mio obiettivo</button>
        </div>

        <div class="counter-step mt-3">
          <div class="step"></div>
          <div class="step"></div>
          <div class="step active"></div>
          <div class="step"></div>
          <div class="step"></div>
        </div>

      </div>
    </div>
  </div>

</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useLiteDatabaseStore } from '@/stores/liteDatabase'
import { ref } from 'vue'
import router from '@/router'
import AxiosService from '@/axiosService/AxiosService'

const authStore = useAuthStore()
function getDirectusUser() {
  authStore.getDirectusUser()
}
getDirectusUser()

const liteDatabase = useLiteDatabaseStore()
const activeCategories = liteDatabase.getActiveCategories()

const utente = ref([])
const loading = ref(false)

const API_90D = new AxiosService('directus')
const uid_utente = authStore.userData.uid

const form = ref({
  user_uid: null,
  user_id: null,
  obiettivo: '',
  categoria: ''
})

async function createTarget() {
  form.value.user_uid = authStore.DirectusUser.uid
  form.value.user_id = authStore.DirectusUser.id
  loading.value = true
  API_90D.creaObiettivi(form.value)
    .then(res => res)
    .catch(err => console.error('errore, ', err))
    .finally(() => {
      loading.value = false
      router.push('/register-helper')
    })
}

async function getUser() {
  loading.value = true
  API_90D.leggiUtenti('uid', uid_utente)
    .then(res => {
      utente.value = res.data
    })
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getUser()

// function getName() {
// 	var emailItem = localStorage.getItem('userLogin90days')
//   if (emailItem) {
//     router.push('/')
//   }
// }
// getName()
</script>
