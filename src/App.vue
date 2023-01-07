<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="Поиск по названию"/>
    <div class="app__btns">
      <my-button @click="showDialog" >Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"/>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <post-list v-if="!isPostsLoading" :posts="searchAndSortedPosts" @remove="removePost"/>
    <h2 v-else style="color: yellow">Загрузка... </h2>
  </div>
</template>

<script>
import axios from "axios";

import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostList,PostForm
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      sortOptions: [
          {value:'title', title:'По названию'},
          {value:'body', title:'По описанию'},
      ],
      searchQuery: "",
    };
  },
  methods: {
    createPost(post){
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post){
      this.posts= this.posts.filter(p => p.id !== post.id )
    },
    showDialog() {
      this.dialogVisible = true;
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
        this.posts = response.data;
      }
      catch (e) {
        alert("Ошибка запроса!")
      }
      finally {
        this.isPostsLoading = false;
      }
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1,post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    searchAndSortedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.app__btns{
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
</style>
