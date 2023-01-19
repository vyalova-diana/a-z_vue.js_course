export default {
    name: 'intersection',
    mounted(el, binding, vnode) {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1.0
        };
        let callback = (entries, observer) => {
            //binding.value doesn't update dynamically, 'updated' hook doesn't fit => used vnode context
            if (entries[0].isIntersecting && vnode.ctx.data.page < vnode.ctx.data.totalPages ) {
                binding.value();
            }
        };
        let observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    }
}
