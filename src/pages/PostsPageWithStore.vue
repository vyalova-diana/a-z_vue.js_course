<template>
  <div>
    <h1>Страница с постами (Store)</h1>
    <my-input v-focus :model-value="searchQuery" @update:model-value="setSearchQuery" placeholder="Поиск по названию"/>
    <div class="app__btns">
      <my-button @click="showDialog" >Создать пост</my-button>
      <my-select :model-value="selectedSort" @update:model-value="setSelectedSort" :options="sortOptions"/>
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
import {mapState,mapMutations,mapActions,mapGetters} from "vuex";

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
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
      addPost: 'post/addPost',
      removePost: 'post/removePost'
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      fetchMorePosts: 'post/fetchMorePosts'
    }),
    createPost(post){
      this.addPost(post);
      this.dialogVisible = false;
    },
    showDialog() {
      this.dialogVisible = true;
    },
    changePage(pageNumber) {
      this.setPage(pageNumber) ;
      this.fetchPosts();
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      searchAndSortedPosts: 'post/searchAndSortedPosts'
    })
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
