<template>
  <div v-if="posts.length !== 0">
    <h3>Список постов</h3>
    <post-item v-for="post in posts" :post="post" :key="post.id" @remove="$emit('remove',post)"/>
    <!--
    1)props can't be altered, should throw event to upper component
    2)v-show could be used instead of v-if to save element in DOM (display:none)
    -->
  </div>
  <h2 v-else style="color: red">Постов нет! </h2>
</template>

<script>
import PostItem from "@/components/PostItem.vue";

export default {
  components: {PostItem},
  props:{
    posts: {
      type: Array,
      required: true,
    }
  }
};
</script>

<style scoped>

</style>