<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-focus v-model="searchQuery" placeholder="Поиск по названию"/>
    <div class="app__btns">
      <my-button @click="showDialog" >Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions"/>
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <div class="page__wrapper">
      <div class="page" v-for="pageNumber in totalPages" :key="pageNumber" :class="{'current-page': pageNumber === page}" @click="changePage(pageNumber)">
        {{pageNumber}}
      </div>
    </div>
    <div v-if="!isPostsLoading" class="posts__wrapper">
      <post-list :posts="searchAndSortedPosts" @remove="removePost"/>
      <div v-intersection="fetchMorePosts" class="observer"></div>
    </div>
    <h2 v-else style="color: yellow">Загрузка... </h2>


  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyDialog from "@/components/UI/MyDialog.vue";
import MyButton from "@/components/UI/MyButton.vue";
import MySelect from "@/components/UI/MySelect.vue";
import MyInput from "@/components/UI/MyInput.vue";
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSearchAndSortedPosts from "@/hooks/useSearchAndSortedPosts";

export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostList,PostForm
  },
  setup(props) {

    const {page,posts,isPostsLoading,dialogVisible,totalPages,fetchMorePosts,createPost,removePost,showDialog,changePage} = usePosts(10);
    const {selectedSort,sortedPosts,sortOptions} = useSortedPosts(posts);
    const {searchQuery,searchAndSortedPosts} = useSearchAndSortedPosts(sortedPosts);

    return {
      page,
      posts,
      isPostsLoading,
      dialogVisible,
      totalPages,
      fetchMorePosts,
      createPost,
      removePost,
      showDialog,
      changePage,
      selectedSort,
      sortedPosts,
      sortOptions,
      searchQuery,
      searchAndSortedPosts
    }
  }
};
</script>

<style>
.app__btns{
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid teal;
}
.observer {
  height:30px;
}
</style>
