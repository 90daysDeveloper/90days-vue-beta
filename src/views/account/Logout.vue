<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()


function logout() {
  localStorage.removeItem('userLogin90days')
  authStore.logoutUser()
}

logout()
</script>