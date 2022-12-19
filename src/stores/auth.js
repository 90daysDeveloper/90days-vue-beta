import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import router from "../router/index.js";
import { useDatabaseStore } from "./database";
import axios from "axios";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    userData: null,
    loadingAuth: false,
    loadingSession: false,
    emailVerified: false,
    authError: "",
    DirectusUser: {},
  }),
  actions: {
    async registerUser(email, password) {
      this.loadingAuth = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = {
          email: user.email,
          uid: user.uid,
        };
        console.log("registered: ", user.email);
        sendEmailVerification(auth.currentUser).then(() => {
          console.log("email verification sent");
        });
        router.push("/");
      } catch (error) {
        console.log("UsersStore - Register User error: ", error);
      } finally {
        this.loadingAuth = false;
      }
    },
    async loginUser(email, password) {
      this.loadingAuth = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = {
          email: user.email,
          uid: user.uid,
        };
        this.getDirectusUser();
        this.emailVerified = user.emailVerified;
        console.log("logged in: ", user.email);
        router.push("/");
      } catch (error) {
        console.log("UsersStore - Login User error: ", error);
        this.authError = error.message.slice(10, error.message.length);
      } finally {
        this.loadingAuth = false;
      }
    },
    async logoutUser() {
      const databaseStore = useDatabaseStore();
      databaseStore.$reset();
      try {
        this.loadingAuth = true;
        await signOut(auth);
        this.userData = null;
        router.push("/login");
      } catch (error) {
        console.log("UsersStore - Logout User error: ", error);
        this.authError = error.message.slice(10, error.message.length);
      } finally {
        this.loadingAuth = false;
      }
    },
    currentUser() {
      return new Promise((res, rej) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          async (user) => {
            if (user) {
              this.userData = {
                email: user.email,
                uid: user.uid,
              };
              this.emailVerified = user.emailVerified;
              await this.getDirectusUser();
            } else {
              const databaseStore = useDatabaseStore();
              databaseStore.$reset();
              this.userData = null;
            }
            res(user);
          },
          (e) => rej(e)
        );
        unsubscribe();
      });
    },
    async getDirectusUser() {
      console.log('GET get directus user')
      await axios
        .get(
           process.env.VUE_APP_API_BASE + "Utenti?filter[email]=" +
            this.userData.email,
          {
            headers: {
              Authorization: "Bearer "+process.env.VUE_APP_BEARER_DIRECTUS,
            },
          }
        )
        .then((res) => {
          console.log('RES get directus user', res)
          this.DirectusUser = res.data.data[0];
        })
        .catch((err) => console.error('CATCH get directus user', err));
    },
    async resetEmail(email) {
      try {
        const { user } = await sendPasswordResetEmail(auth, email);
        this.userData = {
          email: user.email,
        };
        router.push("/");
      } catch (error) {
        console.log("Reset password - User error: ", error);
        this.authError = error.message.slice(10, error.message.length);
      }
    },
  },
});
