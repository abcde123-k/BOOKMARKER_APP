<template>
  <div>
    search
    <form action="">
      <div>
        <input type="text" placeholder="search here" v-model="searchBar" />
      </div>
    </form>
  </div>

  <div>
    <v-sheet class="d-flex justify-sm-space-around flex-wrap" justify="center">
      <v-sheet
        v-for="bookmark in sortFunc()"
        :key="bookmark.id"
        class="align-self-center"
      >
        <v-card
          v-if="filteredList(bookmark)"
          class="ma-7 pa-2"
          min-width="320"
          max-width="380"
          border
        >
          <v-card-title> {{ bookmark.title }}</v-card-title>

          <v-card-actions>
            <v-btn color="green-accent-4" variant="text"> Link </v-btn>

            <v-spacer></v-spacer>
              <v-icon icon="mdi-content-copy" @click="bookmark.showDesc = !bookmark.showDesc" class="ma-2" color="deep-purple-darken-3"></v-icon>
              <v-icon icon="mdi-book-edit" @click="bookmark.showDesc = !bookmark.showDesc" class="ma-2" color="deep-purple-darken-3"></v-icon>
              <v-icon icon="mdi-delete" size="28" @click="bookmark.showDesc = !bookmark.showDesc" class="ma-2" color="deep-purple-darken-3"></v-icon>

            <v-btn
              :text="bookmark.showDesc ? 'Collapse' : 'Expand'"
              :append-icon="bookmark.showDesc ? 'mdi-chevron-up' : 'mdi-chevron-down'"
              @click="bookmark.showDesc = !bookmark.showDesc"
              width="120"
            ></v-btn>
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
      searchBar: "",
    };
  },
  computed: {},

  setup() {
    const ABM = ref(inject("ABM"));
    return {
      ABM,
    };
  },

  methods: {
    sortFunc() {
      return this.ABM.slice().sort(function (a, b) {
        return a.title > b.title ? 1 : -1;
      });
    },

    filteredList(book) {
      return (
        book.title.toLowerCase().includes(this.searchBar.toLowerCase()) ||
        book.description.toLowerCase().includes(this.searchBar.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.box {
  height: 20px;
}
</style>
