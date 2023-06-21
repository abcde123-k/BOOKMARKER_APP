<template>
  <!-- <div> -->

    <form action="">
      <v-sheet class="d-flex justify-sm-space-around flex-wrap mt-5" justify="center">
      <div>

        <!-- search bar -->
        <v-icon icon="mdi-magnify"></v-icon>
        <input  size="30" class="ma-2 pa-2 border" type="text" placeholder="search here" v-model="searchBar" />
        <!-- combo box -->
        <v-combobox
            v-model:search="search"
            :hide-no-data="false"
            v-model="model"
            :items="group"
            hide-selected
            label="Group"
            persistent-hint
            small-chips
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-title>
                  No results matching "<strong>{{ search }}</strong
                    >". Press <kbd>enter</kbd> to create a new one
                </v-list-item-title>
              </v-list-item>
            </template>
            </v-combobox>
      </div>
    </v-sheet>
    </form>

     <!-- All Book Marks or searched bookmarks -->
  <div>
    <v-sheet class="d-flex justify-sm-space-around flex-wrap" justify="center">
      <v-sheet
        v-for="bookmark in sortFunc()"
        :key="bookmark.id"
        class="align-self-center"
      >
        <v-card
          v-if="filteredList(bookmark) && (search===bookmark.group || search=='All')"
          class="ma-7 pa-2"
          min-width="320"
          max-width="380"
          border
        >
          <v-card-title class="text-decoration-underline font-weight-bold"> {{ bookmark.title }}</v-card-title>

          <v-card-subtitle> group: {{ bookmark.group }} </v-card-subtitle>

          <v-card-actions>
            <a :href="bookmark.link">
              <v-btn color="green-accent-4" variant="text"> Link </v-btn>
            </a>

            <v-spacer></v-spacer>
            <v-btn
              prepend-icon="mdi-content-copy"
              size="28"
              @click="copylink(bookmark.link)"
              class="ma-2"
              color="deep-purple-darken-3"
            >
              <v-tooltip activator="parent" location="top">Copy Link</v-tooltip>
            </v-btn>
            <v-btn
              prepend-icon="mdi-square-edit-outline"
              size="28"
              class="ma-2"
              color="deep-purple-darken-3"
            >
              <v-tooltip activator="parent" location="top">Edit</v-tooltip>
            </v-btn>

            <v-btn
              prepend-icon="mdi-delete"
              size="28"
              @click="$emit('deletebookmark', bookmark.id, bookmark.group)"
              class="ma-2"
              color="deep-purple-darken-3"
            >
              <v-tooltip activator="parent" location="top">Delete</v-tooltip>
            </v-btn>

            <v-btn
              :text="bookmark.showDesc ? 'Collapse' : 'Expand'"
              :append-icon="
                bookmark.showDesc ? 'mdi-chevron-up' : 'mdi-chevron-down'
              "
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
import { inject, ref} from "vue";

export default {
  name: "allBookmarks",
  emits: ["deletebookmark"],
  data() {
    return {
      searchBar: "",
      model:['All']
    };
  },

  setup() {
    const ABM = inject("ABM");
    const items = inject('items');
    const group=items
    if(group.find((e)=> e=='All')==undefined)
    group.push('All');

    const search=ref('All');
    return {
      ABM,
      search,
      group,
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

    copylink(link) {
      const storage = document.createElement("textarea");
      storage.value = link;
      document.getElementById("extra").appendChild(storage);
      storage.select();
      storage.setSelectionRange(0, 99999);
      document.execCommand("copy");
      console.log("link copied");
      document.getElementById("extra").removeChild(storage);
    },
  },
};
</script>

<style scoped>
.box {
  height: 20px;
}
</style>
