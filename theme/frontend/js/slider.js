var SLIDER = {
    sliderPartner: function () {
        var slide = Tech.$('.slide-partner');
        var btnPrev = Tech.$('.partner__prev');
        var btnNext = Tech.$('.partner__next');
        if (typeof Tech.$('.slide-partner') === 'undefined') return;
        if (slide._element.length > 1) {
            for (i = 0; i < slide._element.length; i++) {
                slide._element[i].addClass('slide-partner-' + i);

                btnPrev._element[i].addClass('partner__prev-' + i);

                btnNext._element[i].addClass('partner__next-' + i);
                const swiperBanner = new Swiper('.slide-partner-' + i, {
                    slidesPerView: 3,
                    disableOnInteraction: true,
                    speed: 600,
                    spaceBetween: 8,
                    watchSlidesProgress: true,
                    navigation: {
                        nextEl: ".partner__next-" + i,
                        prevEl: ".partner__prev-" + i,
                    },
                    breakpoints: {
                        575: {
                            slidesPerView: 4,
                            spaceBetween: 8
                        },
                        991: {
                            slidesPerView: 6,
                            spaceBetween: 8
                        },

                        1023: {
                            slidesPerView: 8,
                            spaceBetween: 16,
                        },


                    }
                });

            }
        } else {
            const swiperBanner = new Swiper('.slide-partner', {
                slidesPerView: 3,
                disableOnInteraction: true,
                speed: 600,
                spaceBetween: 8,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: ".partner__next",
                    prevEl: ".partner__prev",
                },
                breakpoints: {
                    575: {
                        slidesPerView: 4,
                        spaceBetween: 8
                    },
                    991: {
                        slidesPerView: 6,
                        spaceBetween: 8
                    },

                    1023: {
                        slidesPerView: 8,
                        spaceBetween: 16,
                    },


                }

            });

        }
    },
    slideStatic: function () {
        if (typeof Tech.$('.slide-statis') === 'undefined') return;
        const swiperBanner = new Swiper('.slide-statis', {
            slidesPerView: 1.5,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 8,
            watchSlidesProgress: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            // navigation: {
            // 	nextEl: ".swiper-libbig__next",
            // 	prevEl: ".swiper-libbig__prev",
            // },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 8
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 8
                },
                991: {
                    slidesPerView: 2.3,
                    spaceBetween: 8
                },

                1023: {
                    slidesPerView: "auto",
                    spaceBetween: 0,
                },


            }

        });
    },
    slideFeedback: function () {
        if (typeof Tech.$('.slide-feedback') === 'undefined') return;
        const swiperBanner = new Swiper('.slide-feedback', {
            slidesPerView: 1,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 8,
            watchSlidesProgress: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".pagination-feedback",
                clickable: true,
            },
        });
    },
    sliderPartner: function () {
        var slide = Tech.$('.slide-partner');
        var btnPrev = Tech.$('.partner__prev');
        var btnNext = Tech.$('.partner__next');
        if (typeof Tech.$('.slide-partner') === 'undefined') return;
        if (slide._element.length > 1) {
            for (i = 0; i < slide._element.length; i++) {
                slide._element[i].addClass('slide-partner-' + i);

                btnPrev._element[i].addClass('partner__prev-' + i);

                btnNext._element[i].addClass('partner__next-' + i);
                const swiperBanner = new Swiper('.slide-partner-' + i, {
                    slidesPerView: 3,
                    disableOnInteraction: true,
                    speed: 600,
                    spaceBetween: 8,
                    watchSlidesProgress: true,
                    // autoplay: {
                    //     delay: 2500,
                    //     disableOnInteraction: false,
                    // },
                    navigation: {
                        nextEl: ".partner__next-" + i,
                        prevEl: ".partner__prev-" + i,
                    },
                    breakpoints: {
                        575: {
                            slidesPerView: 4,
                            spaceBetween: 8
                        },
                        991: {
                            slidesPerView: 6,
                            spaceBetween: 8
                        },

                        1023: {
                            slidesPerView: 8,
                            spaceBetween: 16,
                        },
                    }
                });
            }
        } else {
            const swiperBanner = new Swiper('.slide-partner', {
                slidesPerView: 3,
                disableOnInteraction: true,
                speed: 600,
                spaceBetween: 8,
                watchSlidesProgress: true,
                // autoplay: {
                //     delay: 2500,
                //     disableOnInteraction: false,
                // },
                navigation: {
                    nextEl: ".partner__next",
                    prevEl: ".partner__prev",
                },
                breakpoints: {
                    575: {
                        slidesPerView: 4,
                        spaceBetween: 8
                    },
                    991: {
                        slidesPerView: 6,
                        spaceBetween: 8
                    },

                    1023: {
                        slidesPerView: 8,
                        spaceBetween: 16,
                    },


                }
            });
        }

    },
    slideCertifi: function () {
        if (typeof Tech.$('.slide-certifi') === 'undefined') return;
        const swiperBanner = new Swiper('.slide-certifi', {
            slidesPerView: 1.2,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 8,
            watchSlidesProgress: true,
            pagination: {
                el: ".pagination-certifi",
                clickable: true,
            },
            navigation: {
                nextEl: ".certifi__next",
                prevEl: ".certifi__prev",
            },
            breakpoints: {
                576: {
                    slidesPerView: 1.5,
                    spaceBetween: 8
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 8
                },
                991: {
                    slidesPerView: 2,
                    spaceBetween: 8
                },

                1023: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },


            }
        });
    },
    slidePublications: function () {
        if (typeof Tech.$('.slide-publications') === 'undefined') return;
        const swiperBanner = new Swiper('.slide-publications', {
            slidesPerView: 1,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 8,
            watchSlidesProgress: true,
            freeMode: true,
            pagination: {
                el: ".pagination-publications",
                clickable: true,
            },
            breakpoints: {
                576: {
                    slidesPerView: 1,
                    spaceBetween: 8,
                    freeMode: false,

                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 8
                },
                991: {
                    slidesPerView: 3,
                    spaceBetween: 8
                },

                1023: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },


            }
        });
    },
    slideTeam: function () {
        if (typeof Tech.$('.slide-team') === 'undefined') return;
        const swiperBanner = new Swiper('.slide-team', {
            slidesPerView: 1.5,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 8,
            watchSlidesProgress: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".pagination-team",
                clickable: true,
            },
            navigation: {
                nextEl: ".team__next",
                prevEl: ".team__prev",
            },
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 8
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 8
                },
                991: {
                    slidesPerView: 3,
                    spaceBetween: 8
                },

                1023: {
                    slidesPerView: 4,
                    spaceBetween: 16,
                },


            }
        });
    },
    slideNewIndex: function () {
        if (typeof Tech.$('.slide-new__index') === 'undefined') return;
        const swiperBanner = new Swiper('.slide-new__index', {
            slidesPerView: 1.5,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 8,
            watchSlidesProgress: true,
            breakpoints: {
                576: {
                    slidesPerView: 2,
                    spaceBetween: 8
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 8
                },
                991: {
                    slidesPerView: 3,
                    spaceBetween: 8
                },

                1023: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                },


            }
        });
    },
    sliderPartnerDetail: function () {
        if (typeof Tech.$('.slide-partner-detail') === 'undefined') return;
        const swiperBanner = new Swiper('.slide-partner-detail', {
            slidesPerView: 2.5,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 8,
            watchSlidesProgress: true,
            slidesPerColumn: 2,

            pagination: {
                el: ".pagination-partner-detail",
                clickable: true,
            },
            breakpoints: {
                575: {
                    slidesPerView: 3,
                    spaceBetween: 8,
                    slidesPerColumn: 2,

                },
                991: {
                    slidesPerView: 4,
                    spaceBetween: 8,
                    slidesPerColumn: 2,

                },

                1023: {
                    slidesPerView: 5,
                    spaceBetween: 16,
                    slidesPerColumn: 2,
                },


            }
        });
    },
    slideAbout: function () {
        if (typeof Tech.$('.slide-about') === 'undefined') return;
        const swiperBanner = new Swiper('.slide-about', {
            slidesPerView: 1,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 8,
            watchSlidesProgress: true,
        });
    },
    slideBannerIndex: function () {
        if (typeof Tech.$('.slide-banner__index') === 'undefined') return;
        var swiperBanner = new Swiper('.slide-banner__index', {
            slidesPerView: 1,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 8,
            watchSlidesProgress: true,
            // autoplay: {
            //     delay: 6000,
            //     disableOnInteraction: false,
            // },
            pagination: {
                el: ".pagination-banner",
                clickable: true,
            },
            navigation: {
                nextEl: ".banner-next",
                prevEl: ".banner-prev",
            },
        });
        var slideIndex = swiperBanner.activeIndex;

        var itemSlideActive = swiperBanner.slides[slideIndex];

        var video = itemSlideActive.querySelector('video');



        if (video != null) {

            swiperBanner.autoplay.stop();

            video.onended = function () {

                swiperBanner.autoplay.start();

            };

        } else {

            swiperBanner.autoplay.start();

        }

        swiperBanner.on('slideChange', function () {

            slideIndex = swiperBanner.activeIndex;

            itemSlideActive = swiperBanner.slides[slideIndex];

            var videoExist = itemSlideActive.querySelector('video');

            if (videoExist != null) {

                swiperBanner.autoplay.stop();

                videoExist.currentTime = 0;

                videoExist.play();

                videoExist.onended = function () {

                    swiperBanner.autoplay.start();

                };

            }

        });
    },
    slideRoadmap: function () {
        if (typeof Tech.$('.slide-roadmap') === 'undefined') return;
        const swiperBanner = new Swiper('.slide-roadmap', {
            slidesPerView: 2,
            disableOnInteraction: true,
            speed: 600,
            spaceBetween: 10,
            freeMode: true,

            breakpoints: {
                576: {
                    slidesPerView: 2.5,
                    spaceBetween: 10,
                    freeMode: false,

                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },

                992: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1366: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                },



            }

        });
    },
    init: function () {
        SLIDER.slideStatic();
        SLIDER.slideFeedback();
        SLIDER.sliderPartner();
        SLIDER.slideCertifi();
        SLIDER.slidePublications();
        SLIDER.slideTeam();
        SLIDER.slideNewIndex();
        SLIDER.sliderPartnerDetail();
        SLIDER.slideAbout();
        SLIDER.slideRoadmap();
        SLIDER.slideBannerIndex();

    },
}
Tech.Query.ready(function () {
    setTimeout(function () {
        SLIDER.init();
    }, 100);
});

// var swiper_slide_banner = new Swiper(".slide-banner__index", {
//     autoplay: {
//         delay: 6000,
//         disableOnInteraction: false,
//     },
//     navigation: {
//         nextEl: ".button-next",
//         prevEl: ".button-prev",
//     },
// });