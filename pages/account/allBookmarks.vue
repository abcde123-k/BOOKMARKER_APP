<template>
  <div>search</div>
  <div>
    <v-card
      class="mx-auto my-4"
      max-width="500"
      variant="outlined"
      v-for="bookmark in ABM"
      :key="bookmark.id"
    >
      <v-card-item>
        <div class="text-h6 mb-1">{{ bookmark.title }}</div>
        <div class="text-caption">
          {{ bookmark.description }}
        </div>
      </v-card-item>

      <v-card-actions>
        <div>
          <a :href="bookmark.link"
            ><v-btn variant="outlined"> Button </v-btn></a
          >
        </div>
      </v-card-actions>
    </v-card>
  </div>
  <div>
    <v-sheet class="d-flex flex-wrap">
      <v-card
        class="mx-auto my-4"
        variant="outlined"
        width="300"
        height="130"
        v-for="bookmark in ABM"
        :key="bookmark.id"
      >
        <v-card-item>
          <div class="text-h6 mb-1">{{ bookmark.title }} </div>
          <div class="text-caption box" >
            {{ bookmark.description }}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam quos
            saepe minima possimus tenetur est ea a sed dolorum beatae mollitia
            ex sint deserunt, ut labore voluptates aspernatur dignissimos
            eligendi. Beatae debitis labore provident repellat sapiente mollitia
            deserunt enim. Dignissimos aliquam soluta aliquid voluptas dolorum
            ipsa neque repudiandae assumenda unde?
          </div>
          <!-- <div><a :href="bookmark.link"></a></div> -->
        </v-card-item>

        <footer>
          <v-card-actions>
            <v-btn variant="outlined"> Button </v-btn>
          </v-card-actions>
        </footer>
      </v-card>
    </v-sheet>
  </div>

  <div>
    <v-sheet class="d-flex flex-wrap">

      <v-card
      class="mx-auto my-5"
    width="350"
    max-height="250"
    
    v-for="bookmark in ABM"
        :key="bookmark.id"
  >

    <v-card-title>
      {{ bookmark.title }}
    </v-card-title>

    
    <v-card-actions>
      <a :href="bookmark.link"
            ><v-btn variant="outlined"> Button </v-btn></a
          >
    
    <v-spacer></v-spacer>
    
    <v-btn
    :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
    @click="show = !show"
    ></v-btn>
  </v-card-actions>
  
  <v-expand-transition>
    <div v-show="show">
      <v-divider></v-divider>
      
      <v-card-text>
        {{ bookmark.description }}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam quos
            saepe minima possimus tenetur est ea a sed dolorum beatae mollitia
            ex sint deserunt, ut labore voluptates aspernatur dignissimos
            eligendi. Beatae debitis labore provident repellat sapiente mollitia
            deserunt enim. Dignissimos aliquam soluta aliquid voluptas dolorum
            ipsa neque repudiandae assumenda unde?
      </v-card-text>
    </div>
  </v-expand-transition>
</v-card>
</v-sheet>
</div>
</template>

<script>
import { inject, ref, onUpdated } from "vue";
import { collection, doc, getDocs } from "firebase/firestore";

export default {
  name: "allBookmarks",
  setup() {
    const ABM = inject("ABM");
    const show=ref(false);
    return {
      ABM,
      show
    };
  },
};
</script>

<style scoped>
.box{
  height: 20px
}
</style>
