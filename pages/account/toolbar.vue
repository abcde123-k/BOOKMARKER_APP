<template>
    <nav>
    <v-toolbar color="cyan-darken-3" app>
      <v-icon class="ma-3" icon="mdi-menu" @click="navDrawer = !navDrawer"></v-icon>
      <v-toolbar-title>
        <span class="text-h3 font-weight-bold">BookMarker.com</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
            variant="text"
            color="white-text"
            size="large"
            class="ma-3 "
            prepend-icon="mdi-bookmark-multiple-outline"
            @click="$emit('showAllBookmarks')"
            >All bookmarks</v-btn
          >
      <v-btn size="large" append-icon="mdi-logout">Logout</v-btn>
    </v-toolbar>
    
    <v-navigation-drawer  color="deep-purple" v-model="navDrawer" app>
      <!-- <img src="../assets/Srilaprabhupada.jpeg"> -->
      <v-list align="center">
        <v-icon
          size="100"
          color="black"
          icon="mdi-bookmark-multiple"
          class="ma-10"
        ></v-icon>
        <v-list>
          <v-btn
            variant="text"
            color="blue-grey-darken-4"
            class="ma-3"
            prepend-icon="mdi-bookmark-multiple-outline"
            @click="$emit('showAllBookmarks'),navDrawer=!navDrawer"
            >All bookmarks</v-btn
          >
        </v-list>
        <v-list v-for="item in menucontent" :key="item.content">
          <v-btn
            variant="text"
            color="blue-grey-darken-4"
            class="ma-3"
            :prepend-icon="item.icon"
            >{{ item.content }}</v-btn
          >
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "navigatorTop",
  setup(){
    onBeforeMount:{
      console.log("toolbar2.onBeforeMount");
    }
    onMounted:{
      console.log("toolbar2.onMounted");
    }
    
  },
  data() {
    return {
      navDrawer: false,
      emit:['showAllBookmarks'],
      menucontent: [
        {
          icon: "mdi-plus",
          content: "Add Bookmark",
        },
        {
          icon: "mdi-square-edit-outline",
          content: "Modify",
        },
        {
          icon: "mdi-magnify",
          content: "Search",
        },
        {
          icon: "mdi-delete",
          content: "Delete",
        },
        {
          icon: "mdi-star",
          content: "Rate Us",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>

</style>