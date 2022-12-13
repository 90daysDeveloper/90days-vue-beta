<template>
  Caricamento...
</template>
<script setup>
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()
router.push('/profilo/' + authStore.DirectusUser.id)
</script>
