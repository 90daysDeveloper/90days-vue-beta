<template>

  <p v-if="loading">Caricamento...</p>
  <div v-else>
    <div v-if="authStore.DirectusUser.gruppo">
			<div v-if="authStore.DirectusUser.primo_appuntamento == false">
				<PrimoAppuntamento></PrimoAppuntamento>
			</div>
			<div v-else>
				<Chat></Chat>
			</div>
    </div>
    <div v-else>
      <WaitingList></WaitingList>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Chat from '@/components/mastergroup/Chat.vue'
import PrimoAppuntamento from '@/components/mastergroup/PrimoAppuntamento.vue'
import WaitingList from '@/components/mastergroup/WaitingList.vue'
const authStore = useAuthStore()

const loading = ref(false)

async function getDirectusUser() {
  loading.value = true
  await authStore.getDirectusUser()
  loading.value = false
}
getDirectusUser()
</script>
