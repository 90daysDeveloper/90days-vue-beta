import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";
import { db, auth } from "../firebaseConfig";
import { defineStore } from "pinia";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [],
    loadingDoc: false,
  }),
  actions: {
    async getUsers() {
      if (this.documents.length !== 0) {
        return;
      }
      this.loadingDoc = true;
      try {
        const q = query(
          collection(db, "users"),
          where("uid", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.documents.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      } catch (e) {
        console.log(e);
      } finally {
        this.loadingDoc = false;
      }
    },
    async addUser(name, obiettivo, categoria, aiutare) {
      const object = {
        uid: auth.currentUser.uid,
        name: name,
        obiettivo: obiettivo,
        categoria: categoria,
        aiutare: aiutare,
      };
      try {
        const docRef = await addDoc(collection(db, "users"), object);
        console.log(docRef);
        this.documents.push({
          ...object,
          id: docRef.id,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(id) {
      this.loadingDoc = true;
      try {
        const docRef = doc(db, "users", id);
        await deleteDoc(docRef);
        this.documents = this.documents.filter((item) => item.id !== id);
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },
  },
});
