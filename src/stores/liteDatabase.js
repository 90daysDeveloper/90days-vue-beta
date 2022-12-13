import { defineStore } from "pinia";

export const useLiteDatabaseStore = defineStore("LiteDatabaseStore", {
  state: () => ({
    categories:[
      {
        id:1,
        name: 'Studio',
        active: true
      },
      {
        id:2,
        name: 'Fitness e alimentazione',
        active: true
      },
      {
        id:3,
				name: 'Benessere Psicologico',
        active: true
      },
      {
        id:4,
				name: 'Lavoro',
        active: true
      }
    ],

  }),
  actions: {

    getActiveCategories(){
      return this.categories.filter(x => x.active)
    }

  },
});
