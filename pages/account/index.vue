<template>
  <v-app>
    <toolbar
      @showAllBookmarks="all = true"
      @home="all = false"
      @logout="$emit('logout')"
    ></toolbar>
    <buttonS v-if="!all" />

    <allBookmarks v-if="all" @deletebookmark="deletecard" />
  </v-app>
</template>

<script>
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { setupFirebase } from "../../composables/firebasesetup.js";
import toolbar from "./toolbar.vue";
import { inject, ref, provide } from "vue";
import buttonS from "./buttons.vue";
import allBookmarks from "./allBookmarks.vue";
// import structuredClone from '@ungap/structured-clone';
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
    const all = ref(false);
    const title = ref("");
    const desc = ref("");
    const link = ref("");
    let ABM = [];

    // firebase setup
    const firestore = setupFirebase();
    const name = collection(firestore, "name");
    const d = doc(name, uname.value);
    const group = collection(d, "group");

    // group items
    let items = [];
    onSnapshot(group, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        const Title = { ...doc.data() };
        if (items.find((gname) => gname === Title.title) == undefined) {
          items.push(Title.title);
        }
      });
    });

    
    // all bookmark array
    onSnapshot(d, (s) => {
      getDocs(group).then((snap) => {
        snap.docs.forEach((docu) => {
          const Title = { ...docu.data() };
          const g = collection(d, Title.title);
          getDocs(g)
            .then((snapshot) => {
              snapshot.docs.forEach((doc) => {
                let count = 0;
                ABM.forEach((book) => {
                  if (book.id === doc.id) {
                    count += 1;
                  }
                });
                if (count == 0) {
                  ABM.push({
                    ...doc.data(),
                    id: doc.id,
                    group: Title.title,
                    showDesc: false,
                  });
                }
              });
            })
            .catch(() => {
              console.log("error in storing data");
            });
        });
      });
    });
    provide("ABM", ABM);

    // deleting bookmark
    function deletecard(id, group) {
      console.log(id);
      // const docref = doc(firestore, "name/" + uname.value +"/bookmarks", id);
      const col = collection(d, group);

      const docref = doc(col, id);

      console.log(docref);
      deleteDoc(docref)
        .then((e) => {
          // e.preventDefault();
          console.log("delete success");
        })
        .catch(() => {
          console.log("error");
        });
    }
    provide("items", items);

    return {
      deletecard,
      title,
      link,
      desc,
      all,
    };
  },
  data() {
    return {
      emit: ["logout"],
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
