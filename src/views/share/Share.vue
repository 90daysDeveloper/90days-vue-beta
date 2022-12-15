<template>
  <div class="login mt-4">
    <div v-if="utente.data[0].pubblico">
      <img class="d-grid mx-auto mb-4" src="../../assets/images/logo-dark.png" alt="Logo 90days">
      <Informazioni class="mb-4" :id_utente="route.params.idUtente"></Informazioni>
      <Obiettivo class="mb-4" :id_utente="route.params.idUtente"></Obiettivo>
      <Progressi class="mb-4" :id_utente="route.params.idUtente"></Progressi>
      <hr>
      <div v-if="authStore.DirectusUser.id != route.params.idUtente">
        <p>Sto partecipando a 90days. Un percorso che sfrutta la leva della responsabilità condivisa per aiutare le
          persone a essere costanti e raggiungere i propri obiettivi. Salva questa pagina per seguire i miei progressi!
        </p>
        <hr>
        <a href="https://90days.it/" target="_blank" class="btn btn-primary">Per saperne di più</a>
      </div>
      <div v-else>
        <ShareNetwork network="linkedin" :url="shareLink" title="Sto partecipando a 90days! Supportami nella sfida 🎯"
          description="90days è un percorso che sfrutta la leva della responsabilità condivisa per aiutare le persone a essere costanti e raggiungere i propri obiettivi. Salva questa pagina per seguire i miei progressi!"
          quote="Condividi, impara, cresci." hashtags="90days,community,crescitapersonale">
          <button class="btn btn-primary" style="padding: 15px 20px; margin-right: 20px;">
            <i class="pi pi-linkedin" style="width:auto"></i>
          </button>
        </ShareNetwork>
        <ShareNetwork network="facebook" :url="shareLink" title="Sto partecipando a 90days! Supportami nella sfida 🎯"
          description="90days è un percorso che sfrutta la leva della responsabilità condivisa per aiutare le persone a essere costanti e raggiungere i propri obiettivi. Salva questa pagina per seguire i miei progressi!"
          quote="Condividi, impara, cresci." hashtags="90days,community,crescitapersonale">
          <button class="btn btn-primary" style="padding: 15px 20px; margin-right: 20px;">
            <i class="pi pi-facebook" style="width:auto"></i>
          </button>
        </ShareNetwork>
        <ShareNetwork network="whatsapp" :url="shareLink" title="Sto partecipando a 90days! Supportami nella sfida 🎯"
          description="90days è un percorso che sfrutta la leva della responsabilità condivisa per aiutare le persone a essere costanti e raggiungere i propri obiettivi. Salva questa pagina per seguire i miei progressi!"
          quote="Condividi, impara, cresci." hashtags="90days,community,crescitapersonale">
          <button class="btn btn-primary" style="padding: 15px 20px; margin-right: 20px;">
            <i class="pi pi-whatsapp" style="width:auto"></i>
          </button>
        </ShareNetwork>
        <ShareNetwork network="twitter" :url="shareLink" title="Sto partecipando a 90days! Supportami nella sfida 🎯"
          description="90days è un percorso che sfrutta la leva della responsabilità condivisa per aiutare le persone a essere costanti e raggiungere i propri obiettivi. Salva questa pagina per seguire i miei progressi!"
          quote="Condividi, impara, cresci." hashtags="90days,community,crescitapersonale">
          <button class="btn btn-primary" style="padding: 15px 20px; margin-right: 20px;">
            <i class="pi pi-twitter"></i>
          </button>
        </ShareNetwork>
        <hr>
        <a @click="goTo('/')" style="cursor: pointer;">
          &#8249; Torna al profilo
        </a>
      </div>
    </div>
    <div v-else>
      <img class="d-grid mx-auto mb-4" src="../../assets/images/logo-dark.png" alt="Logo 90days">
      <h3 class="mt-2 mb-4 ">Il profilo che stai cercando è privato o non esiste.</h3>
      <p>Se invece dovessi essere il proprietario di questo profilo ti ricordiamo che per renderlo pubblico dovrai
        andare sull'app nella pagina Account e aggiornare le impostazioni.</p>
      <hr>
      <a class="btn btn-primary" href="/account">Aggiorna le impostazioni</a>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import Informazioni from '@/components/share/Informazioni.vue'
import Obiettivo from '@/components/share/Obiettivo.vue'
import Progressi from '@/components/share/Progressi.vue'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AxiosService from '@/axiosService/AxiosService'

const route = useRoute()
const authStore = useAuthStore()
const loading = ref(false)
const utente = ref([])
const shareLink = 'https://community.90days.it/share/' + route.params.idUtente
const router = useRouter()

const API_90D = new AxiosService('directus')
const id_utente = route.params.idUtente

async function getUtente() {
  loading.value = true
  API_90D.leggiUtenti('id', id_utente)
    .then(res => utente.value = res)
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getUtente()

function goTo(next) {
  router.push(next)
}
</script>
