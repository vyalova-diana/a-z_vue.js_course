<template>
  <div class="app">
    <h1>Страница с постами</h1>
    <my-button @click="showDialog" style="margin: 15px 0;">Создать пост</my-button>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <post-list :posts="posts" @remove="removePost"/>


  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
export default {
  components: {
    MyButton,
    MyDialog,
    PostList,PostForm
  },
  data() {
    return {
      posts: [
        {id: 1, title: "Пост о javascript", body: "Javascript - язык программирования"},
        {id: 2, title: "Пост о javascript 2", body: "Javascript - язык программирования 2"},
        {id: 3, title: "Пост о javascript 3", body: "Javascript - язык программирования 3"}
      ],
      dialogVisible: false
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





</style>
