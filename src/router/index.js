import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: '/perform-logout',
    component: () => import('@/views/account/Logout.vue')
  },
  {
    path: "/reset",
    component: () => import("@/views/login/ResetPassword.vue"),
  },
  {
    path: "/register",
    component: () => import("@/views/registrazione/Register.vue"),
  },
  {
    path: "/share/:idUtente",
    name: "sharePage",
    component: () => import("@/views/share/Share.vue"),
  },
  {
    path: "/",
    component: () => import("@/views/layout/appMain.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/profilo/LoadPersonalProfilo.vue"),
      },
      {
        path: "/profilo/:idUtente",
        component: () => import("@/views/profilo/Profilo.vue"),
      },
      {
        path: "/percorso",
        component: () => import("@/views/percorso/Percorso.vue"),
      },
      {
        path: "/percorso/:idTappa",
        component: () => import("@/views/percorso/Tappa.vue"),
      },
      {
        path: "/account",
        component: () => import("@/views/account/Account.vue"),
      },
      {
        path: "/aiuto",
        component: () => import("@/views/aiuto/Aiuto.vue"),
      },
      {
        path: "/diario",
        component: () => import("@/views/diario/Diario.vue"),
      },
      {
        path: "/diario/:idPagina",
        component: () => import("@/views/diario/Pagina.vue"),
      },
      {
        path: "/nuova-pagina",
        component: () => import("@/views/diario/NuovaPagina.vue"),
      },
      {
        path: "/recap/:idRecap",
        component: () => import("@/views/diario/Recap.vue"),
      },
      {
        path: "/nuovo-recap",
        component: () => import("@/views/diario/NuovoRecap.vue"),
      },
      {
        path: "/habit-tracker",
        component: () => import("@/views/habit/HabitTracker.vue"),
      },
      {
        path: "/scelta",
        component: () => import("@/views/scelta/Scelta.vue"),
      },
      {
        path: "/informazioni",
        component: () => import("@/views/scelta/Informazioni.vue"),
      },
      {
        path: "/informazionidue",
        component: () => import("@/views/scelta/InformazioniDue.vue"),
      },
      {
        path: "/conferma",
        component: () => import("@/views/scelta/Conferma.vue"),
      },
      {
        path: "/confermadue",
        component: () => import("@/views/scelta/ConfermaDue.vue"),
      },
      {
        path: "/mastergroup",
        component: () => import("@/views/mastergroup/MasterGroup.vue"),
      },
      {
        path: "/mastergroup/:idGroup",
        component: () => import("@/views/mastergroup/Group.vue"),
      },
    ],
  },
  {
    path: "/register-info",
    component: () => import("@/views/registrazione/RegisterInfo.vue"),
  },
  {
    path: "/register-payment",
    component: () => import("@/views/registrazione/RegisterPayment.vue"),
  },
  {
    path: "/register-thanks",
    component: () => import("@/views/registrazione/RegisterThanks.vue"),
  },
  {
    path: "/register-target",
    component: () => import("@/views/registrazione/RegisterTarget.vue"),
  },
  {
    path: "/register-helper",
    component: () => import("@/views/registrazione/RegisterHelper.vue"),
  },
  {
    path: "/register-time",
    component: () => import("@/views/registrazione/RegisterTime.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  useAuthStore.loadingSession = true;
  const currentUser = await authStore.currentUser();
  if (
    !currentUser &&
    to.path !== "/login" &&
    to.path !== "/register" &&
    to.path !== "/reset" &&
    to.name !== "sharePage" &&
    to.path !== "/register-payment"
  ) {
    authStore.loadingSession = false;
    next({ path: "/login" });
  } else {
    authStore.loadingSession = false;

    next();
  }
});

export default router;
