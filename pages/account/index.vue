<template>
  <v-app>
    <toolbar @showAllBookmarks="all=true" @home="all=false" @logout="$emit('logout')"></toolbar>
    <buttonS v-if="!all"/>

    <allBookmarks v-if="all" />
  </v-app>
</template>

<script>
import { collection, doc, addDoc, getDocs } from "firebase/firestore";
import { setupFirebase } from "../../composables/firebasesetup.js";
import toolbar from "./toolbar.vue";
import { inject, ref, provide} from "vue";
import buttonS from "./buttons.vue"
import allBookmarks from "./allBookmarks.vue"
export default {
  name: "index1",
  data() {
    return {};
  },
  setup() {
    const uname = inject("username");
    // console.log(uname.value);
    // onMounted(()=>{
    //   //
    // })
    const all=ref(false);
    const dialog = ref(false);
    const modifydialog = ref(false);
    const searchdialog = ref(false);
    const deletedialog = ref(false);
    const title = ref("");
    const desc = ref("");
    const link = ref("");
    const ABM = [];
      // console.log("All Bookmark pushed")
      // const uname = inject("username");
      const firestore = setupFirebase();
      const name = collection(firestore, "name");
      const d = doc(name, uname.value);
      const b = collection(d, "bookmarks");
      getDocs(b)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          ABM.push({ ...doc.data(), id:doc.id });
          });
        })
        .catch(() => {
          console.log("Error occured");
        });
        console.log(ABM)
    function addBookmark() {
      console.log(title, desc, link);
      // console.log(b);
      addDoc(b, {
        title: title.value,
        description: desc.value,
        link: link.value,
      })
        .then(() => {
          dialog.value = false;
        })
        .catch(() => {
          console.log("error");
        });
    }
    provide('ABM',ABM)
    return {
      dialog,
      modifydialog,
      deletedialog,
      searchdialog,
      addBookmark,
      title,
      link,
      desc,
      all,
    };
  },
  data(){
    return{
      emit:['logout'],
    }
  },
  components: {
    toolbar,
    buttonS,
    allBookmarks,
  },
};
</script>

<style scoped>
.len {
  width: 500px;
}
</style>
