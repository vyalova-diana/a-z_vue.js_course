export default {
    name: 'intersection',
    mounted(el, binding) {
        const options = {
              root: null,
              rootMargin: '0px',
              threshold: 1.0
            };
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && binding.value.page < binding.value.totalPages ){
        console.log(entries);
        binding.value.func();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
    }
}
