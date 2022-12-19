<template>

  <VOffline @detected-condition="onNetworkChange"></VOffline>

  <div v-if="!isOnline" class="fullscreen-message p-4">
    <img class="mb-4" src="./assets/images/logo-dark.png" alt="Logo 90days"><br><br>
    <i class="pi pi-spin pi-exclamation-circle mb-4" style="font-size:2rem"></i><br><br>
    <span class="mb-2"> Sembra che tu sia offline... </span><br>
    <span>Potrai
      usare l'app quando tornerai ad avere una connessione</span>
  </div>
  <router-view v-if="isOnline" />
  <div v-if="updateExists" class="fullscreen-message">
    <img src="./assets/images/logo-dark.png" alt="Logo 90days">
    <h2>Aggiornamento disponibile</h2>
    <button class="btn btn-primary" @click="refreshApp">Aggiorna ora</button>
  </div>

</template>


<script>
import update from './mixin/update';
export default {
  mixins: [update],
  data() {
    return {
      isOnline: true
    }
  },
  methods: {
    onNetworkChange(status) {
      this.isOnline = status
    }
  }
}
</script>
