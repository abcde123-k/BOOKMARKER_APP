<template>
  <v-app>
    <toolBar v-if="!show" />
    <div v-if="!show">
      <form class="signup">
        <div class="middle">
          <v-text-field label="Email" v-model="email"></v-text-field><v-spacer></v-spacer>
          <v-text-field label="Password" v-model="password"></v-text-field><v-spacer></v-spacer>
          <v-btn class="center" append-icon="mdi-login" @click="login">Login</v-btn>
          <!-- <v-container>New User?</v-container> -->
        </div>
        <v-container class="center">New User?<NuxtLink to="/signup">Signup</NuxtLink></v-container>
      </form>
    </div>
    <index1 v-if="show" @logout="logoutfunction"/>
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

// for authentication setup 
import {
  getAuth, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

import { setupFirebase } from "../composables/firebasesetup.js";
import{setupAuth} from "../composables/authsetup.js";

export default {
  components: {
    toolBar,
    index1,
  },
  setup() {
      const show = ref(false);
      const username = ref("");
      const email = ref("");
      const password = ref("");
      const auth = setupAuth();
      provide('username', username);
      
      function login() {

        signInWithEmailAndPassword(auth, email.value, password.value)
          .then((cred) => {
            console.log('user created:', cred.user);
            show.value=true;
          })
          .catch((err) =>{
            console.log(err.message)
          })
          
          onAuthStateChanged(auth, (user)=>{
            if (user) {
      
          } else {
          
          }
        })     
      }
    function logoutfunction(){
      signOut(auth)
      .then(() => {
    
        show.value = false;
        email.value = "";
        password.value = "";
        console.log("logout success")
      })
      .catch((error) => {
            // An error happened.
      });
    }

    return {
      show,
      username,
      email,
      password,
      login,
      logoutfunction,
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
