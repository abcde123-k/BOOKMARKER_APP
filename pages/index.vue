<template>
  <v-app>
    <toolBar v-if="!show" />
    <div v-if="!show">
      <NuxtLink to="./account/">index1</NuxtLink>
      <form>
        <div class="middle">
          <v-text-field label="Name" v-model="username"></v-text-field
          ><v-spacer></v-spacer>
          <v-btn class="center" append-icon="mdi-login" @click="showbookmarks"
            >Let Start</v-btn
          >
        </div>
      </form>
    </div>
    <index1 v-if="show" />
  </v-app>
</template>

<script lang="ts">
import toolBar from "./toolbar.vue";
import index1 from "./account/index.vue";
import { ref, provide } from "vue";
import { inject } from "vue";

import {
  collection,
  getDocs,
  doc,
  getFirestore,
  Firestore,
} from "firebase/firestore";
// import {firestore} from "../plugins/firebase.client"
// import { initializeApp } from "firebase/app";
import { setupFirebase } from "../composables/firebasesetup.js";
// import firebaseConfig from "../plugins/firebase.client.js"
// import  db  from "@/plugins/firebase.js"
export default {
  components: {
    toolBar,
    index1,
  },
  setup() {
      const show = ref(false);
      const username = ref("");
      provide('username', username);
    function showbookmarks() {
      
      // const firestore = setupFirebase();
      // const name = collection(firestore, 'name');
      // const d=doc(name,username.value);
      // const b=collection(d,'bookmarks');
      // getDocs(b)
      //   .then((snapshot)=>{
      //     let book=[]
      //     snapshot.docs.forEach((doc)=>{
      //       book.push({...doc.data(),id:doc.id})
      //     })
      //     console.log(book);
      //   })
      //   .catch((err)=>{
      //     console.log(err.message);
      //   })
      show.value=true;

    }
    return {
      show,
      username,
      showbookmarks,
    };
  },
};
</script>

<style scoped>
.middle {
  width: 250px;
  height: 300px;
  margin: auto;
  margin-top: 10%;
}
.center {
  margin: 25%;
  margin-top: 20px;
}
</style>
