<template>
  <!-- Gruppo e meet -->
  <div class="form-group">
    <div class="information">
      <button type="button" class="btn btn-primary info" @click="pageGroup(authStore.DirectusUser.gruppo)">
        <img src="../../assets/icon/mastergroup.svg" width="25"> {{ authStore.DirectusUser.gruppo }}
      </button>
      <button type="button" class="btn btn-primary meet" @click="goMeet(gruppo.link)">
        <img src="../../assets/icon/chiamata.svg" width="25"> {{ gruppo.data }}
      </button>
    </div>
  </div>
  <!-- Messaggio -->
  <div class="texting">
    <form class="form-group" @submit.prevent="addChat">
      <input v-model="newChatContent" type="text" class="form-control" id="text" placeholder="Messaggio">
      <button class="btn btn-primary"><img src="../../assets/icon/chat.svg" width="25"></button>
    </form>
  </div>
  <!-- Chat -->
  <div class="mastergroup">
    <div v-for="chat in chats" :key="chat.id">
      <div v-if="chat.uid === authStore.DirectusUser.uid" class="group-message">
        <em class="small-text">{{ chat.name }} - {{ chat.date }}</em>
        <div class="message">{{ chat.content }}</div>
      </div>
      <div v-else>
        <em class="small-text">{{ chat.name }} - {{ chat.date }}</em>
        <div class="user">{{ chat.content }}</div>
      </div>
    </div>
    <div class="scroll"></div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue'
import { collection, onSnapshot, addDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../../firebaseConfig.js'
import router from '@/router';
import AxiosService from '@/axiosService/AxiosService';

const authStore = useAuthStore()
function getDirectusUser() {
  authStore.getDirectusUser()
}

const API_90D = new AxiosService('directus')
const nome_gruppo = authStore.DirectusUser.gruppo

getDirectusUser()

const loading = ref(false)
const gruppo = ref([])

const group = authStore.DirectusUser.gruppo
const collectionRef = collection(db, group)
const collectionQuery = query(collectionRef, orderBy('date', 'asc'))
const chats = ref([])

const firsttime = ref(true)

function scrollDown() {
  setTimeout(() => {
    document
      .querySelector(".mastergroup")
      .lastChild.scrollIntoView(firsttime.value ? { behavior: "smooth" } : {});
    firsttime.value = false
  }, 1);
}
scrollDown()

onMounted(() => {
  onSnapshot(collectionQuery, (querySnapshot) => {
    const collChats = []
    querySnapshot.forEach((doc) => {
      const chat = {
        id: doc.id,
        content: doc.data().content,
        name: doc.data().name,
        date: formatDate(doc.data().date),
        uid: doc.data().uid
      }
      collChats.push(chat)
    })
    chats.value = collChats
    scrollDown()
  })
})

const newChatContent = ref('')

const addChat = () => {
  addDoc(collectionRef, {
    name: authStore.DirectusUser.nome,
    uid: authStore.DirectusUser.uid,
    content: newChatContent.value,
    date: Date.now()
  })
  newChatContent.value = ''
  scrollDown()
}

function pageGroup(elem) {
  router.push(`/mastergroup/${elem}`)
}

function goMeet(elem) {
  window.open(
    elem,
    '_blank'
  );
}

function getGroup() {
  loading.value = true
  API_90D.leggiGruppi('nome', nome_gruppo)
    .then(res => {
      gruppo.value = res.data[0]
    })
    .catch(err => console.error(err))
    .finally(() => loading.value = false)
}
getGroup()

function formatDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const newDate = new Date(date).toLocaleDateString('it-IT', options)
  return newDate
}

</script>
