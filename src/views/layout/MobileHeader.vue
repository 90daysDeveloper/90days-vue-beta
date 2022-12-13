<template>
  <div>
    <nav class="navbar fixed-top navigation">
      <Progress></Progress>
      <div class="container-fluid">
        <div class="container top">
					<a role="button" class="navbar-brand" @click="goTo('/')"><img src="@/assets/images/logo-dark.png" /></a>
					<a class="account-link" @click=" goTo( '/aiuto' ) "><img src="../../assets/icon/aiuto.svg" width="30"> Aiuto</a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import Progress from '@/components/Progress.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
function goTo(to) {
	router.push(to)
}
</script>
