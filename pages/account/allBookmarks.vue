<template>
  <div>search
    <form action="">
      <div>
        <input type="text" placeholder="search here" v-model="searchBar">
      </div>
    </form>
  </div>




  <div>
    <v-sheet class="d-flex flex-wrap">
      <v-sheet v-for="bookmark in sortFunc()" :key="bookmark.id"  class="ma-2 pa-2 align-self-center">
        <v-card v-if="filteredList(bookmark)" class="mx-auto" width="350">
          <v-card-title> {{ bookmark.title }}</v-card-title>

          <v-card-actions>
            <v-btn color="orange-lighten-2" variant="text"> Link </v-btn>

            <v-spacer></v-spacer>

            <v-btn :icon="bookmark.showDesc ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="bookmark.showDesc = !bookmark.showDesc"></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="bookmark.showDesc">
              <v-divider></v-divider>

              <v-card-text>
                {{ bookmark.description }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-sheet>
    </v-sheet>
  </div>
</template>

<script>
import { inject, ref, onUpdated } from "vue";
import { collection, doc, getDocs } from "firebase/firestore";

export default {
  name: "allBookmarks",
  data() {
    return {
      searchBar: '',
      sorted: []
    }
  },
  computed: {
    
  },

  setup() {
    const ABM = ref(inject("ABM"));
    const show = ref(false);
    return {
      ABM,
      show
    };
  },


  methods: {
    sortFunc() {
      return this.ABM.slice().sort(function (a, b) {
        return a.title > b.title ? 1 : -1;
      });
    },

    filteredList(book) {
      console.log(book)
        return (book.title.toLowerCase().includes(this.searchBar.toLowerCase()) || book.description.toLowerCase().includes(this.searchBar.toLowerCase()))
    
    }

  },
};
</script>

<style scoped>
.box {
  height: 20px
}
</style>
