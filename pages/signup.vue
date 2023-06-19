<template>
    <v-app>
      <toolBar v-if="!show" />
      <div v-if="!show">
        <form class="signup">
          <div class="middle">
            <v-text-field label="Username" v-model="username"></v-text-field><v-spacer></v-spacer>
            <v-text-field label="Enter Your Email" v-model="email"></v-text-field><v-spacer></v-spacer>
            <v-text-field label="Password" v-model="password"></v-text-field><v-spacer></v-spacer>
            <v-btn class="center" append-icon="" @click="newaccount">Create Account</v-btn>
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
  
  // for authentication setup 
  import {
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
  } from 'firebase/auth';
  // import {firestore} from "../plugins/firebase.client"
  // import { initializeApp } from "firebase/app";
  import { setupFirebase } from "../composables/firebasesetup.js";
  import{setupAuth} from "../composables/authsetup.js";
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
        const email = ref("");
        const password = ref("");
        const auth = setupAuth();
        // const auth = getAuth();
        provide('username', username);
  
      function newaccount() {
        createUserWithEmailAndPassword(auth, email.value, password.value)
          .then((cred) => {
            console.log('user created:', cred.user)
            show.value=true;
          })
          .catch((err) =>{
            console.log(err.message)
          })
      }
      return {
        show,
        username,
        email,
        password,
        newaccount,
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
  