document.addEventListener('DOMContentLoaded', function () {
    let player;

    const app = Vue.createApp({
        data() {
            return {
                videos: [],
                currentVideoIndex: 0,
            }
        },
        mounted() {
            fetch('/api/videos/')
                .then(response => response.json())
                .then(data => {
                    this.videos = data;
                    this.$nextTick(() => {
                        this.initializePlayer();
                    });
                })
                .catch(error => console.error('Error fetching videos:', error));
        },
        methods: {
            initializePlayer() {
                if (this.videos.length > 0) {
                    player = videojs('video-player', {
                        controls: true,
                        autoplay: false,
                        fluid: false,
                        aspectRatio: '16:9',
                        preload: 'auto',
                        userActions: {
                            doubleClick: false
                        }
                    });

                    // Настраиваем события для двойного нажатия
                    player.on('dblclick', function (event) {
                        event.preventDefault();
                        const boundingRect = player.el().getBoundingClientRect();
                        const clickPosition = event.clientX - boundingRect.left;
                        const playerWidth = boundingRect.width;

                        if (clickPosition > playerWidth * 0.33 && clickPosition < playerWidth * 0.66) {
                            if (player.isFullscreen()) {
                                player.exitFullscreen();
                            } else {
                                player.requestFullscreen();
                            }
                        } else if (clickPosition > playerWidth / 2) {
                            player.currentTime(player.currentTime() + 5);
                        } else {
                            player.currentTime(player.currentTime() - 5);
                        }
                    });

                    let controlBar = player.getChild('ControlBar');
                    if (controlBar) {
                        player.on('userinactive', function () {
                            controlBar.addClass('fade-out');
                        });

                        player.on('useractive', function () {
                            controlBar.removeClass('fade-out');
                        });
                    }

                    this.loadVideo(this.currentVideoIndex);
                }
            },
            loadVideo(index) {
                if (index >= 0 && index < this.videos.length) {
                    this.currentVideoIndex = index;
                    const videoSrc = this.videos[index].file;

                    player.src({src: videoSrc, type: 'video/mp4'});

                    if (this.videos[index].poster) {
                        player.poster(this.videos[index].poster);
                    } else {
                        player.one('loadedmetadata', () => {
                            const duration = player.duration();
                            const randomTime = Math.random() * duration;
                            this.generatePoster(index, randomTime);
                        });
                    }

                    // player.one('loadedmetadata', () => {
                    //     this.updatePlayerSize();
                    //     this.resizeControlBar();
                    // });
                }
            },
            updatePlayerSize() {
                const videoWidth = player.videoWidth();
                const videoHeight = player.videoHeight();
                player.width(videoWidth);
                player.height(videoHeight);
            },
            resizeControlBar() {
                // Подстраиваем ширину и выравниваем control-bar
                const controlBar = player.el().querySelector('.vjs-control-bar');
                const playerContainer = player.el();

                if (controlBar && playerContainer) {
                    const videoWidth = player.videoWidth();
                    controlBar.style.width = videoWidth + 'px';
                    controlBar.style.margin = '0 auto'; // Центрируем control-bar
                    controlBar.style.left = '0';
                    controlBar.style.right = '0';
                }
            },
            generatePoster(index, time) {
                player.currentTime(time);

                player.one('seeked', () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    canvas.width = player.videoWidth();
                    canvas.height = player.videoHeight();

                    context.drawImage(player.el().querySelector('video'), 0, 0, canvas.width, canvas.height);

                    const dataUrl = canvas.toDataURL('image/jpeg');
                    this.videos[index].poster = dataUrl;
                    player.poster(dataUrl);

                    player.currentTime(0);
                });
            },
            nextVideo() {
                const nextIndex = (this.currentVideoIndex + 1) % this.videos.length;
                this.loadVideo(nextIndex);
            },
            prevVideo() {
                const prevIndex = (this.currentVideoIndex - 1 + this.videos.length) % this.videos.length;
                this.loadVideo(prevIndex);
            }
        }
    });

    app.mount('#app');
});
