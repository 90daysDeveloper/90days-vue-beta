<template>
  <div id="head" class="header">
    <Progress></Progress>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid">

        <a role="button" class="navbar-brand" @click="goTo('/')"><img src="../../assets/images/logo-dark.png"></a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
          aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" @click="goTo('/')"><img src="../../assets/icon/profilo.svg" width="25"> Profilo</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="goTo('/diario')"><img src="../../assets/icon/diario.svg" width="25">
                Diario</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="goTo('/habit-tracker')"><img src="../../assets/icon/habit-traker.svg"
                  width="23"> Habit Tracker</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="goTo('/mastergroup')"><img src="../../assets/icon/mastergroup.svg" width="25">
                MasterGroup</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" @click="goTo('/account')"><img src="../../assets/icon/account.svg" width="25">
                Account</a>
            </li>
						<li class="nav-item">
							<a class="nav-link" @click="goTo('/aiuto')"><img src="../../assets/icon/aiuto.svg" width="25">
								Aiuto</a>
						</li>
          </ul>

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
