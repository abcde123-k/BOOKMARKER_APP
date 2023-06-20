<template>
  <v-app>
    <toolBar v-if="!show" @showlogin="showloginpage = true, showsignuppage = false" @showsignup="showloginpage = false, showsignuppage = true"/>
    
    <!-- login page  -->
    <div v-if="showloginpage">
      <form class="signup">
        <div class="middle">
          <v-text-field label="Email" v-model="email"></v-text-field><v-spacer></v-spacer>
          <v-text-field label="Password" v-model="password"></v-text-field><v-spacer></v-spacer>
          <v-btn variant="outlined" class="center" append-icon="mdi-login" @click="login">Login</v-btn>
          <!-- <v-btn class="ml-8 mt-n15" @click="showloginpage = false, showsignuppage = true">New User? -->
            <v-btn variant="outlined" class="ml-13 mt-n15" @click="showloginpage = false, showsignuppage = true">
              New User?
              <v-tooltip
                activator="parent"
                location="bottom"
              >Signup Here</v-tooltip>
            </v-btn>
          
        </div>
      </form>
    </div>


    <!-- for signup page -->
    <div v-if="showsignuppage">
        <form class="signup">
          <div class="middle">
            <v-text-field label="Username" v-model="username"></v-text-field><v-spacer></v-spacer>
            <v-text-field label="Enter Your Email" v-model="email"></v-text-field><v-spacer></v-spacer>
            <v-text-field label="Password" v-model="password"></v-text-field><v-spacer></v-spacer>
            <v-btn variant="outlined" class="ml-8 mt-4" append-icon="" @click="newaccount">Create Account</v-btn>
          </div>
        </form>
      </div>
    <index1 v-if="show" @logout="logoutfunction"/>
  </v-app>
</template>

<script lang="ts">
import toolBar from "./toolbar.vue";
import index1 from "./account/index.vue";
import { ref, provide } from "vue";



// for authentication setup 
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from 'firebase/auth';

import{setupAuth} from "../composables/authsetup.js";

export default {
  components: {
    toolBar,
    index1,
  },
  setup() {
      const show = ref(false);
      const showloginpage = ref(true);
      const showsignuppage = ref(false);
      const username = ref("");
      const email = ref("");
      const password = ref("");
      const auth = setupAuth();
      provide('username', username);
      

      // login function 
      function login() {

        signInWithEmailAndPassword(auth, email.value, password.value)
          .then((cred) => {
            console.log('user created:', cred.user);
            show.value=true;
            showloginpage.value = false;
            username.value = email.value.split('@')[0];
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

      // signout function 
      function logoutfunction(){
        console.log("logout success")
        signOut(auth)
        .then(() => {
      
          show.value = false;
          email.value = "";
          password.value = "";
          showloginpage.value = true;
        })
        .catch((error) => {
              // An error happened.
        });
      }

      // signup function 
      function newaccount() {
        createUserWithEmailAndPassword(auth, email.value, password.value)
          .then((cred) => {
            console.log('user created:', cred.user);
              
              signInWithEmailAndPassword(auth, email.value, password.value)
              .then((cred) => {
                console.log('user created:', cred.user);
                show.value=true;
                showsignuppage.value = false;
                username.value = email.value.split('@')[0];
              })
              .catch((err) =>{
                console.log(err.message)
              })
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
      login,
      logoutfunction,
      newaccount,
      showloginpage,
      showsignuppage,
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
