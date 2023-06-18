<template>
  <v-app>
    <toolbar @showAllBookmarks="all=true"></toolbar>
    <buttonS v-if="!all"/>

    <allBookmarks v-if="all" />
  </v-app>
</template>

<script>
import { collection, doc, addDoc } from "firebase/firestore";
import { setupFirebase } from "../../composables/firebasesetup.js";
import toolbar from "./toolbar.vue";
import { inject, ref } from "vue";
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
    function addBookmark() {
      console.log(title, desc, link);
      const firestore = setupFirebase();
      const name = collection(firestore, "name");
      const d = doc(name, uname.value);
      const b = collection(d, "bookmarks");
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
