<template>
  <div class="app">
    <post-form/>
    <post-list :posts="posts"/>


  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
export default {
  components: {
    PostList,PostForm
  },
  data() {
    return {
      posts: [
        {id: 1, title: "Пост о javascript", body: "Javascript - язык программирования"},
        {id: 2, title: "Пост о javascript 2", body: "Javascript - язык программирования 2"},
        {id: 3, title: "Пост о javascript 3", body: "Javascript - язык программирования 3"}
      ],
      title: "",
      body: ""
    };
  },
  methods: {
    createPost() {
      const newPost = {
        id: Date.now(),
        title: this.title,
        body: this.body,
      }
      this.posts.push(newPost);
      this.title="";
      this.body = "";
    },

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





</style>
