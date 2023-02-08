export default {
    name: 'intersection',
    mounted(el, binding, vnode) {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };
        let callback = (entries, observer) => {
            if (entries[0].isIntersecting && binding.instance.page < binding.instance.totalPages ) {
                binding.value();
            }
        };
        let observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    }
}
