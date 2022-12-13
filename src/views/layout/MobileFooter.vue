<template>
  <div>
    <nav class="navbar fixed-bottom navigation">
      <div class="container-fluid">
        <div class="container text-center" style="padding: 5px 25px 20px;">
          <div class="row">
            <div class="col">
              <a role="button" @click="goTo('/account')">
								<div v-if="position == '/account'">
									<img src="../../assets/icon/account-select.svg" width="25">
								</div>
								<div v-else>
									<img src="../../assets/icon/account.svg" width="25">
								</div>
                <span>Account</span>
              </a>
            </div>
            <div class="col">
							<a role="button" @click="goTo('/diario')">
								<div v-if="position == '/diario'">
									<img src="../../assets/icon/diario-select.svg" width="25">
								</div>
								<div v-else>
									<img src="../../assets/icon/diario.svg" width="25">
								</div>
                <span>Diario</span>
              </a>
            </div>
            <div class="col">
							<a role="button" @click="goTo('/')">
								<div v-if="position == '/'">
									<img src="../../assets/icon/profilo-select.svg" width="25">
								</div>
								<div v-else>
									<img src="../../assets/icon/profilo.svg" width="25">
								</div>
                <span>Profilo</span>
              </a>
            </div>
            <div class="col">
							<a role="button" @click="goTo('/mastergroup')">
								<div v-if=" position == '/mastergroup'">
									<img src="../../assets/icon/mastergroup-select.svg" width="25">
								</div>
								<div v-else>
									<img src="../../assets/icon/mastergroup.svg" width="25">
								</div>
                <span>Chat</span>
              </a>
            </div>
            <div class="col">
							<a role="button" @click="goTo('/habit-tracker')">
								<div v-if=" position == '/habit-tracker'">
									<img src="../../assets/icon/habit-traker-select.svg" width="25">
								</div>
								<div v-else>
									<img src="../../assets/icon/habit-traker.svg" width="25">
								</div>
                <span>Task</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup >
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const position = ref()
function goTo(to) {
	router.push(to)
	position.value = to
}
</script>
