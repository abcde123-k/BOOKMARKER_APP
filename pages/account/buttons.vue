<template>
  <div>
    <v-container border="black 2px" align="center" class="mx-6 mt-8">
      <v-icon size="100" icon="mdi-bookmark-box-multiple"></v-icon>
      <v-container class="text-blue">
        <v-icon size="40" icon="mdi-link-box-variant"></v-icon>
        Keep all your important links at one place
        <v-icon size="40" icon="mdi-link-box-variant"></v-icon>
      </v-container>
    </v-container>
    <v-container border align="center" class="mx-10 my-0 pa-20">
      <div>
        <v-btn color="primary" @click="dialog = true" class="ma-4"> Add </v-btn>

        <v-dialog v-model="dialog" width="auto">
          <v-card>
            <v-toolbar color="primary" title="Add Bookmark"></v-toolbar>
            <v-card-text>
              <v-text-field label="Title" v-model="title"></v-text-field>
              <v-textarea
                label="Description"
                rows="2"
                cols="40"
                v-model="desc"
              ></v-textarea>
              <v-text-field label="Link" v-model="link"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <div>
                <v-btn
                  color="success"
                  width="250"
                  @click.prevent="addBookmark()"
                  >Add</v-btn
                >
                <!-- <v-spacer></v-spacer> -->
                <v-btn color="primary" width="250" @click="dialog = false"
                  >Close Dialog</v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn color="primary" @click="modifydialog = true" class="ma-4">
          modify
        </v-btn>

        <v-dialog v-model="modifydialog" width="auto">
          <v-card>
            <v-toolbar color="primary" title="Add Bookmark"></v-toolbar>
            <v-card-text>
              <v-text-field label="Title" v-model="title"></v-text-field>
              <v-textarea
                label="Description"
                rows="2"
                cols="40"
                v-model="desc"
              ></v-textarea>
              <v-text-field label="Link" v-model="link"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <div>
                <v-btn
                  color="success"
                  width="250"
                  @click.prevent="modifyBookmark()"
                  >Add</v-btn
                >
                <!-- <v-spacer></v-spacer> -->
                <v-btn color="primary" width="250" @click="modifydialog = false"
                  >Close Dialog</v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn color="primary" @click="searchdialog = true" class="ma-4">
          Search
        </v-btn>

        <v-dialog v-model="searchdialog" width="auto">
          <v-card>
            <v-toolbar color="primary" title="Add Bookmark"></v-toolbar>
            <v-card-text>
              <v-text-field label="Title" v-model="title"></v-text-field>
              <v-textarea
                label="Description"
                rows="2"
                cols="40"
                v-model="desc"
              ></v-textarea>
              <v-text-field label="Link" v-model="link"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <div>
                <v-btn
                  color="success"
                  width="250"
                  @click.prevent="searchBookmark()"
                  >Add</v-btn
                >
                <!-- <v-spacer></v-spacer> -->
                <v-btn color="primary" width="250" @click="searchdialog = false"
                  >Close Dialog</v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn color="primary" @click="deletedialog = true" class="ma-4">
          Delete
        </v-btn>

        <v-dialog v-model="deletedialog" width="auto">
          <v-card>
            <v-toolbar color="primary" title="Add Bookmark"></v-toolbar>
            <v-card-text>
              <v-text-field label="Title" v-model="title"></v-text-field>
              <v-textarea
                label="Description"
                rows="2"
                cols="40"
                v-model="desc"
              ></v-textarea>
              <v-text-field label="Link" v-model="link"></v-text-field>
            </v-card-text>
            <v-card-actions>
              <div>
                <v-btn
                  color="success"
                  width="250"
                  @click.prevent="deleteBookmark()"
                  >Add</v-btn
                >
                <!-- <v-spacer></v-spacer> -->
                <v-btn color="primary" width="250" @click="deletedialog = false"
                  >Close Dialog</v-btn
                >
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>

<script>
import { inject, ref } from "vue";
import { collection, doc, addDoc } from "firebase/firestore";
export default {
  name: "buttonS",
  setup() {
    const uname = inject("username");
    const dialog = ref(false);
    const modifydialog = ref(false);
    const searchdialog = ref(false);
    const deletedialog = ref(false);
    const title = ref("");
    const desc = ref("");
    const link = ref("");
    function addBookmark() {
      console.log(title.value, desc.value, link.value);
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
          title.value='';
          desc.value='';
          link.value='';
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
      // showAllBookmarks,
    };
  },
};
</script>

<style scoped></style>
