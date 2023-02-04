import {computed, ref} from "vue";

export default function useSearchAndSortedPosts(sortedPosts) {
    const searchQuery = ref("");

    const searchAndSortedPosts = computed(() => {
        return sortedPosts.value.filter(post => post.title.toLowerCase().includes(searchQuery.value.toLowerCase()));
    });

    // const totalPages = computed(() => {
    //     return Math.ceil(searchAndSortedPosts.value.length / limit);
    // });

    return {
        searchQuery,searchAndSortedPosts
    };
}