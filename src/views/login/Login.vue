<template>
  <div class="login d-flex justify-content-center align-items-center">
    <form @submit.prevent="handleSubmit">
      <img class="d-grid mx-auto mb-2" src="../../assets/images/logo-dark.png" alt="Logo 90days">
      <p class="text-center mb-3">Inserisci l'email e password che hai usato durante la registrazione per accedere a
        <b>90days</b>
      </p>
      <div class="form-group mb-3">
        <label class="form-label" for="email">Email</label>
        <input type="email" class="form-control" id="email" v-model="email" placeholder="Email">
      </div>
      <div class="form-group password">
        <a class="hidden" role="button" @click.prevent="toggleVisible"><i class="fa-solid fa-eye"></i></a>
        <label class="form-label" for="password">Password</label>
        <input class="form-control" id="password" v-model="password" placeholder="Password" :feedback="false"
          :type="visible ? 'text' : 'password'">
      </div>
      <div class="mt-2 mb-4 small-text">
        <a href="/reset">Hai dimenticato la password?</a>
      </div>

      <div class="d-grid mx-auto mt-2 mb-4">
        <button class="btn btn-primary" id="login" type="submit" :loading="loadingLogin"
          @click="connect()">ACCEDI</button>
      </div>
      <div class="mt-2 mb-4 small-text">
        <p class="text-center">
          Non sei registrato?<br>
          <a class="btn btn-outline-light mt-2" href="/register">REGISTRATI ORA</a>
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()

const email = ref()
const password = ref()

const loadingLogin = computed(() => {
  return authStore.loadingAuth ? true : false
})

async function handleSubmit() {
  await authStore.loginUser(email.value, password.value)
}

const visible = ref(false)
function toggleVisible() {
  visible.value = !visible.value
}
</script>
