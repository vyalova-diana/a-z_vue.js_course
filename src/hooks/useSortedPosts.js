import {computed, ref} from "vue";

export default function useSortedPosts(posts) {
    const sortOptions = ref( [
        {value:'title', title:'По названию'},
        {value:'body', title:'По описанию'},
    ])
    const selectedSort = ref("");

    const sortedPosts = computed(() => {
        return [...posts.value].sort((post1,post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]))

    })


    return {
        selectedSort,sortedPosts,sortOptions
    }
}