<template>
  <div class="navbar">
    <div @click="$router.push('/')">VUE 3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Посты</my-button>
      <my-button @click="$router.push('/about')">О приложении</my-button>
    </div>
  </div>
</template>

<script>
import router from "@/router/router";

export default {
  methods: {
    router() {
      return router
    }
  }

};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background: lightblue;
  box-shadow: 2px 2px 4px gray;
  padding: 0 15px;
}
.navbar__btns{
  display: flex;
  gap:20px;
}
</style>