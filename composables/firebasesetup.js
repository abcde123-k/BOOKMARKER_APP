import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5lNSQ7CfJ9KcBl6YMS8ZgjEuCxPEZ020",
  authDomain: "bookmarker-ebe11.firebaseapp.com",
  projectId: "bookmarker-ebe11",
  storageBucket: "bookmarker-ebe11.appspot.com",
  messagingSenderId: "489154616765",
  appId: "1:489154616765:web:cce6d4d4ba179f7469c6d4"
};

export function setupFirebase(){
    // const config = useRuntimeConfig();

    const app =initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
    return firestore;

}
// export default defineNuxtPlugin(async(nuxtApp) => {
//   const config = useRuntimeConfig();


//   const app =await initializeApp(firebaseConfig);
//   const firestore = getFirestore(app);

//   nuxtApp.vueApp.provide("firestore", firestore);
//   nuxtApp.provide("firestore", firestore);
//   // return firestore;
// });
