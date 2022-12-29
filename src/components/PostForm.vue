<template>
  <form @submit.prevent>
    <h4>Создание поста</h4>
    <input @input="post.title = $event.target.value" :value="post.title" class="input" type="text" placeholder="Название">
    <input @input="post.body = $event.target.value" :value="post.body" class="input" type="text" placeholder="Описание">
    <button class="btn">Создать</button>
<!--    <button class="btn" @click="createPost">Создать</button>-->
  </form>
</template>

<script>
export default {
  data() {
    return {
      post:{
        title:"",
        body:"",
      }
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.input {
  width: 100%;
  border: 1px solid teal;
  padding: 10px 15px;
  margin-top: 15px;
}

.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;

}
</style>