import axios from "axios";
import {ref, onMounted} from "vue";

export function usePosts (limit) {
    const page = ref(1);
    const posts = ref([]);
    const totalPages = ref(0);
    const isPostsLoading = ref(false);
    const dialogVisible = ref(false);
    const fetchPosts = async () => {
        try {
            isPostsLoading.value = true;
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: page.value,
                    _limit: limit
                }
            });
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
            posts.value = response.data;
        }
        catch (e) {
            alert("Ошибка запроса!")
        }
        finally {
            isPostsLoading.value = false;
        }
    }
    const fetchMorePosts = async  () => {
        try {
            page.value += 1;
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                params: {
                    _page: page.value,
                    _limit: limit
                }
            });
            totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
            posts.value = [...posts.value, ...response.data];
        }
        catch (e) {
            alert("Ошибка запроса!")
        }
    }

    const createPost = (post) => {
        posts.value.push(post);
        dialogVisible.value = false;
    }
    const removePost = (post) => {
        posts.value= posts.value.filter(p => p.id !== post.id )
    }
    const showDialog = () => {
        dialogVisible.value = true;
    }
    const changePage = (pageNumber) => {
        page.value = pageNumber;
        const res = fetchPosts();
    }
    onMounted(fetchPosts)

    return {
        page,posts,isPostsLoading,dialogVisible,totalPages,fetchMorePosts,createPost,removePost,showDialog,changePage
    }

}