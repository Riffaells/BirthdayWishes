const app = Vue.createApp({
    data() {
        return {
            videos: []
        }
    },
    mounted() {
        fetch('/api/videos/')
            .then(response => response.json())
            .then(data => {
                this.videos = data;
            })
            .catch(error => console.error('Error fetching videos:', error));
    }
});

app.mount('#app');