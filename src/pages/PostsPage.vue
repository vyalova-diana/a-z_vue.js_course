<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="Поиск по названию"/>
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
      <div v-intersection="{func:fetchMorePosts, page: this.page, totalPages: this.totalPages}" class="observer"></div>
    </div>
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
      page: 1,
      limit: 10,
      totalPages: 0,
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
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      }
      catch (e) {
        alert("Ошибка запроса!")
      }
      finally {
        this.isPostsLoading = false;
      }
    },
    async fetchMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      }
      catch (e) {
        alert("Ошибка запроса!")
      }

    },
    changePage(pageNumber) {
      this.page = pageNumber;
      this.fetchPosts();
    }
  },
  mounted() {
    this.fetchPosts();

    // const options = {
    //   root: null,
    //   rootMargin: '-250px 0px 0px 0px',
    //   threshold: 1.0
    // };
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages ){
    //     console.log(entries);
    //     this.fetchMorePosts();
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);

  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1,post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    searchAndSortedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  watch: {

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
