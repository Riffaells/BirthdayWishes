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
                        this.generateAllPosters();
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
                            doubleClick: false,
                            click: true,
                            tap: true
                        },
                        html5: {
                            vhs: {
                                overrideNative: true
                            },
                            nativeAudioTracks: false,
                            nativeVideoTracks: false
                        },
                        playbackRates: [0.25, 0.5, 1, 1.5, 1.75, 2, 2.5, 3]

                    });

                    // Настраиваем события для двойного нажатия
                    player.on('dblclick', (event) => {
                        const boundingRect = player.el().getBoundingClientRect();
                        const clickPosition = event.clientX - boundingRect.left;
                        const playerWidth = boundingRect.width;

                        if (clickPosition > playerWidth / 2) {
                            player.currentTime(player.currentTime() + 10);
                        } else {
                            player.currentTime(player.currentTime() - 10);
                        }
                    });

                    let lastTapTime = 0;
                    player.on('touchend', (event) => {
                        const currentTime = new Date().getTime();
                        const tapLength = currentTime - lastTapTime;
                        if (tapLength < 300 && tapLength > 0) {
                            // Обработка двойного касания
                            const boundingRect = player.el().getBoundingClientRect();
                            const touch = event.changedTouches[0];
                            const touchPosition = touch.clientX - boundingRect.left;
                            const playerWidth = boundingRect.width;

                            if (touchPosition > playerWidth / 2) {
                                player.currentTime(player.currentTime() + 10);
                            } else {
                                player.currentTime(player.currentTime() - 10);
                            }
                        }
                        lastTapTime = currentTime;
                    });

                    // Настройка Control Bar
                    // let controlBar = player.getChild('ControlBar');
                    // if (controlBar) {
                    //     player.on('userinactive', () => controlBar.addClass('fade-out'));
                    //     player.on('useractive', () => controlBar.removeClass('fade-out'));
                    // }

                    this.loadVideo(this.currentVideoIndex);
                }
            },
            loadVideo(index) {
                if (index >= 0 && index < this.videos.length) {
                    this.currentVideoIndex = index;
                    const videoSrc = this.videos[index].hls_playlist;


                    player.src({
                        src: videoSrc,
                        type: 'application/x-mpegURL'
                    });
                    if (this.videos[index].poster) {
                        player.poster(this.videos[index].poster);
                    } else {
                        player.one('loadedmetadata', () => {
                            const duration = player.duration();
                            const randomTime = Math.random() * duration;
                            this.generatePoster(index, randomTime);
                        });
                    }

                    // player.play(); // Автоматически запускаем новое видео
                    player.play().catch(function (error) {
                        console.error('Error attempting to play:', error);
                    });
                }
            },

            generateAllPosters() {
                // Для каждого видео запускаем генерацию постера
                this.videos.forEach((video, index) => {
                    this.generatePosterForVideo(video, index);
                });
            },
            generatePosterForVideo(video, index) {
                // Создаем экземпляр Video.js для каждого видео
                const videoElement = document.createElement('video');
                videoElement.setAttribute('id', `video-${index}`);
                document.body.appendChild(videoElement);  // Временно добавляем видео на страницу

                const player = videojs(videoElement, {
                    controls: false,
                    autoplay: false,
                    preload: 'auto',
                    fluid: false,
                    muted: true,
                    sources: [{src: video.hls_playlist, type: 'application/x-mpegURL'}]
                });

                // Ждем загрузки метаданных
                player.on('loadedmetadata', () => {
                    const duration = player.duration();
                    const randomTime = Math.random() * duration;
                    player.currentTime(randomTime);
                });

                // Когда видео достигло случайного кадра, создаем постер
                player.on('seeked', () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = player.videoWidth();
                    canvas.height = player.videoHeight();

                    const context = canvas.getContext('2d');
                    context.drawImage(player.el().querySelector('video'), 0, 0, canvas.width, canvas.height);

                    const dataURL = canvas.toDataURL('image/jpeg');
                    this.videos[index].poster = dataURL; // Присваиваем сгенерированный постер видео

                    // Очищаем ресурсы
                    player.dispose();
                    videoElement.remove();
                });

                // Обрабатываем ошибки при загрузке видео
                player.on('error', (e) => {
                    console.error('Ошибка при загрузке видео:', e);
                    player.dispose();
                    videoElement.remove();
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
