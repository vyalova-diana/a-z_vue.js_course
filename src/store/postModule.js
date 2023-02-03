import axios from "axios";

export const postModule = {
    state: () => ({
        posts: [],
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
    }),
    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1,post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
        },
        searchAndSortedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        }
    },
    mutations: {
        setPosts (state,posts) {
            state.posts = posts;
        },
        addPost(state,post){
            state.posts.push(post);
        },
        removePost(state,post){
            state.posts= state.posts.filter(p => p.id !== post.id )
        },
        setPostsLoading (state, bool) {
            state.isPostsLoading = bool;
        },
        setPage (state,page) {
            state.page = page;
        },
        setTotalPages (state,total) {
            state.totalPages = total;
        },
        setSelectedSort (state,sort) {
            state.selectedSort = sort;
        },
        setSearchQuery (state,query) {
            state.searchQuery = query;
        },

    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setPostsLoading',true);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages',Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts',response.data);
            }
            catch (e) {
                alert("Ошибка запроса!")
            }
            finally {
                commit('setPostsLoading',false);
            }
        },
        async fetchMorePosts({state, commit}) {
            try {
                commit('setPage',state.page + 1);
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: state.page,
                        _limit: state.limit
                    }
                });
                commit('setTotalPages',Math.ceil(response.headers['x-total-count'] / state.limit));
                commit('setPosts',[...state.posts, ...response.data]);
            }
            catch (e) {
                alert("Ошибка запроса!")
            }

        },
    },
    namespaced: true

}
