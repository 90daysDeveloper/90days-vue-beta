<template>
  <div class="content">
    <div class="container router-view">
      <div class="register" style="padding: 0px;">

        <div class="text-center">
          <h1 class="mb-3">😍 {{ authStore.DirectusUser.nome }} sei ufficialmente dentro!</h1>
          <img src="../../../public/img/Thanks.gif" />
          <hr>
          <button class="btn btn-primary btn-lg" @click="updateProfile()">Completa il tuo profilo per iniziare</button>
          <hr>
          <h3 class="mt-3">Come funziona</h3>
          <div class="istruction-desktop">
            <hr>
            <img src="./../../assets/Istruzioni.png" style="width: 100%;">
          </div>
          <div class="istruction-mobile">
            <img src="./../../assets/Istruzioni-mobile.png" style="width: 100%;">
          </div>
          <hr>
          <button class="btn btn-primary btn-lg" @click="updateProfile()">Completa il tuo profilo per iniziare</button>
        </div>
        <hr>
        <div class="counter-step mt-3">
          <div class="step"></div>
          <div class="step active"></div>
          <div class="step"></div>
          <div class="step"></div>
          <div class="step"></div>
        </div>

      </div>
    </div>
  </div>

</template>

<script setup>
import AxiosService from '@/axiosService/AxiosService';
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import axios from 'axios'
import { ref } from 'vue'

const loading = ref(false)

const authStore = useAuthStore()
const user = {
	"id": authStore.DirectusUser.id,
  "date_updated": new Date(),
  "payment": true
}

function postTag() {
	loading.value = true
	axios.post('https://90days-vue-beta.vercel.app/api/posttag?id=' + authStore.DirectusUser.mailchimp + '&tag=payment',)
		.then(res => console.log(res))
		.finally(loading.value = false)
}
postTag()

const API_90D = new AxiosService('directus')

function updateUser() {

  API_90D.modificaUtenti(user)
    .then(res => console.log(res))
    .catch(err => console.error(err))
}
updateUser()

function updateProfile() {
  router.push('/register-target')
}
</script>
