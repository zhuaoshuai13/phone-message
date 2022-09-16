$(function () {
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      reverse: true,
    },
  });
  const isPc = $(window).width() > 768 ? true : false;

  var overview = {
    sellingPoint: function (elem) {
      var sec = $(elem).attr('class');
      var section = '.' + sec + ' ';
      var triggerId = '#' + $(elem).find('.trigger').attr('id');

      var mermaidScroll = new TimelineMax()
        .from(section + '.f2', 0.5, { x: 50 }, 'a')
        .from(section + '.f3', 0.5, { x: 50 }, 'a')
        .from(section + '.f4', 0.5, { x: 100 }, 'a')
        .from(section + '.f7', 0.5, { x: 50 }, 'a');
      new ScrollMagic.Scene({
        offset: 0,
        triggerElement: triggerId,
        triggerHook: 0,
        //  duration: '30%'
      })
        .setTween(mermaidScroll)
        .addTo(controller);
    },
    designAppearance: function (elem) {
      var mobileRatio = window.matchMedia('(max-aspect-ratio: 678/669)'),
        viewportWidth = window.innerWidth,
        viewportHeight = window.innerHeight;

      var section = '.' + $(elem).attr('class') + ' ';
      var triggerId = '#' + $(elem).find('.trigger').attr('id');
      var tlSection = new TimelineMax();
      // 1076 为手机宽度
      var section3X1 = -viewportWidth / 2,
        section3X2 = (-1076 / 1920) * viewportWidth - viewportWidth / 2,
        section3X3 = (-800 / 1920) * viewportWidth,
        section3X4 = (288 / 1920) * viewportWidth,
        section3X5 = (48 / 1920) * viewportWidth,
        section3X6 = (28 / 1920) * viewportWidth,
        section3X7 = (-260 / 1920) * viewportWidth,
        section3X8 = (220 / 1920) * viewportWidth,
        section3Y1 = (-255 / 1920) * viewportWidth,
        section3Y2 = viewportHeight / 2 + (270 / 1920) * viewportWidth,
        section3Y3 = (265 / 1920) * viewportWidth,
        section3Y4 = (265 / 1920) * viewportWidth,
        section3Y5 = (100 / 1920) * viewportWidth;

      if (mobileRatio.matches) {
        (section3X2 = (-375 / 375) * viewportWidth - viewportWidth / 2),
          (section3X3 = (-170 / 375) * viewportWidth),
          (section3X4 = (288 / 375) * viewportWidth),
          (section3X5 = (48 / 375) * viewportWidth),
          (section3X6 = (10 / 375) * viewportWidth),
          (section3X7 = (-260 / 375) * viewportWidth),
          (section3X8 = (220 / 375) * viewportWidth),
          (section3Y1 = (-255 / 375) * viewportWidth),
          (section3Y2 = viewportHeight / 2 + (270 / 375) * viewportWidth),
          (section3Y3 = (265 / 375) * viewportWidth),
          (section3Y4 = (265 / 375) * viewportWidth),
          (section3Y5 = (100 / 375) * viewportWidth);

        tlSection
          .add(
            TweenMax.fromTo(
              section + '.bg',
              0.35,
              {
                x: '-50%',
                y: '-50%',
                scale: 1,
              },
              {
                x: '-50%',
                y: '-50%',
                scale: 0.3,
              },
            ),
            0,
          )
          .add(
            TweenMax.fromTo(
              section + '.title',
              0.35,
              {
                x: 0,
                y: 0,
              },
              {
                x: 0,
                y: '-150%',
                delay: 0.2,
              },
            ),
            0,
          )
          .add(
            TweenMax.fromTo(
              section + '.second-phone',
              0.35,
              {
                x: section3X2,
                y: '-50%',
              },
              {
                x: section3X3,
                y: '-50%',
              },
            ),
          )
          .add(
            TweenMax.to(section + '.bg', 0.3, {
              alpha: 0,
            }),
            0.4,
          )
          .add(
            TweenMax.fromTo(
              section + '.second-textWrapper.wrapper1',
              0.05,
              {
                alpha: 0,
              },
              {
                alpha: 1,
              },
            ),
            1.15,
          )
          .add(
            TweenMax.to(section + '.second-phone', 0.3, {
              rotation: '-45deg',
            }),
            1.4,
          )
          .add(
            TweenMax.to(section + '.second-textWrapper.wrapper1', 0.15, {
              x: section3X4,
              alpha: 0,
            }),
            1.4,
          )
          .add(
            TweenMax.fromTo(
              section + '.second-textWrapper.wrapper2',
              0.15,
              {
                x: section3X5,
                alpha: 0,
              },
              {
                x: section3X6,
                alpha: 1,
              },
            ),
            1.55,
          )
          .add(
            TweenMax.to(section + ' .second-textWrapper.wrapper2', 0.1, {
              alpha: 0,
            }),
            2,
          )
          .add(
            TweenMax.to(section + ' .second-phone img', 0.3, {
              y: section3Y4,
              rotation: '-45deg',
              transformOrigin: 'right',
            }),
          )
          .add(
            TweenMax.fromTo(
              section + '.phone-back',
              0.15,
              {
                x: section3Y5,
                alpha: 0,
              },
              {
                x: 0,
                alpha: 1,
              },
            ),
            2.2,
          )
          .add(
            TweenMax.fromTo(
              section + '.feature',
              0.15,
              {
                alpha: 0,
              },
              {
                alpha: 1,
              },
            ),
            2.4,
          )
          .add(function () {
            $(section + '.feature').removeClass('active');
          }, 2.4)
          .add(function () {
            $(section + '.feature').addClass('active');
          }, 2.5)
          .add(
            TweenMax.to(section + '.feature', 0.1, {
              alpha: 0,
            }),
            2.6,
          )
          .add(
            TweenMax.fromTo(
              section + '.second-phone',
              0.15,
              {
                alpha: 1,
              },
              {
                alpha: 0,
              },
            ),
            2.7,
          )
          .add(
            TweenMax.fromTo(
              section + '.phone-front',
              0.2,
              {
                y: '0',
                alpha: 0,
              },
              {
                y: '20%',
                alpha: 1,
              },
            ),
            2.7,
          )
          .add(
            TweenMax.fromTo(
              section + '.phone-back',
              0.15,
              {
                y: '0',
              },
              {
                y: '10%',
              },
            ),
            2.75,
          )
          .add(function () {
            $(section + '.thirdWrapper').removeClass('show');
          }, 2.8)
          .add(function () {
            $(section + '.thirdWrapper').addClass('show');
          }, 2.82)
          .add(function () {}, 4);

        new ScrollMagic.Scene({
          triggerElement: triggerId,
          duration: '1000%',
          triggerHook: 0,
        })
          .setTween(tlSection)
          .addTo(controller);
      } else {
        tlSection
          .add(
            TweenMax.fromTo(
              section + '.bg',
              0.35,
              {
                x: '-50%',
                y: '-50%',
                scale: 1,
              },
              {
                x: '-50%',
                y: '-50%',
                scale: 0.3,
              },
            ),
            0,
          )
          .add(
            TweenMax.fromTo(
              section + '.title',
              0.35,
              {
                x: 0,
                y: 0,
              },
              {
                x: 0,
                y: '-150%',
                delay: 0.2,
              },
            ),
            0,
          )
          .add(
            TweenMax.fromTo(
              section + '.second-phone',
              0.35,
              {
                x: section3X2,
                y: '-50%',
              },
              {
                x: section3X3,
                y: '-50%',
              },
            ),
          )
          .add(
            TweenMax.to(section + '.bg', 0.3, {
              alpha: 0,
            }),
            0.4,
          )
          .add(
            TweenMax.fromTo(
              section + '.second-textWrapper.wrapper1',
              0.05,
              {
                alpha: 0,
              },
              {
                alpha: 1,
              },
            ),
            1.15,
          )
          .add(
            TweenMax.to(section + '.second-phone', 0.3, {
              rotation: '-45deg',
            }),
            1.4,
          )
          .add(
            TweenMax.to(section + '.second-textWrapper.wrapper1', 0.15, {
              x: section3X4,
              alpha: 0,
            }),
            1.4,
          )
          .add(
            TweenMax.fromTo(
              section + '.second-textWrapper.wrapper2',
              0.15,
              {
                x: section3X5,
                alpha: 0,
              },
              {
                x: section3X6,
                alpha: 1,
              },
            ),
            1.55,
          )
          .add(
            TweenMax.to(section + ' .second-textWrapper.wrapper2', 0.1, {
              alpha: 0,
            }),
            2,
          )
          .add(
            TweenMax.to(section + ' .second-phone img', 0.3, {
              y: section3Y4,
              rotation: '-45deg',
              transformOrigin: 'right',
            }),
          )
          .add(
            TweenMax.fromTo(
              section + '.phone-back',
              0.15,
              {
                x: section3Y5,
                alpha: 0,
              },
              {
                x: 0,
                alpha: 1,
              },
            ),
            2.2,
          )
          .add(
            TweenMax.fromTo(
              section + '.feature',
              0.15,
              {
                alpha: 0,
              },
              {
                alpha: 1,
              },
            ),
            2.4,
          )
          .add(function () {
            $(section + '.feature').removeClass('active');
          }, 2.4)
          .add(function () {
            $(section + '.feature').addClass('active');
          }, 2.5)
          .add(
            TweenMax.to(section + '.feature', 0.1, {
              alpha: 0,
            }),
            2.6,
          )
          .add(
            TweenMax.fromTo(
              section + '.second-phone',
              0.15,
              {
                alpha: 1,
              },
              {
                alpha: 0,
              },
            ),
            2.7,
          )
          .add(
            TweenMax.fromTo(
              section + '.phone-front',
              0.2,
              {
                y: '0',
                alpha: 0,
              },
              {
                y: '20%',
                alpha: 1,
              },
            ),
            2.7,
          )
          .add(
            TweenMax.fromTo(
              section + '.phone-back',
              0.15,
              {
                y: '0',
              },
              {
                y: '10%',
              },
            ),
            2.75,
          )
          .add(function () {
            $(section + '.thirdWrapper').removeClass('show');
          }, 2.8)
          .add(function () {
            $(section + '.thirdWrapper').addClass('show');
          }, 2.82)
          .add(function () {}, 4);

        new ScrollMagic.Scene({
          triggerElement: triggerId,
          duration: '1000%',
          triggerHook: 0,
        })
          .setTween(tlSection)
          .addTo(controller);
      }

      $(section + '.color-select li').click(function () {
        var index = $(this).index();
        $(this).addClass('current');
        $(section + '.bgd')
          .eq(index)
          .addClass('current')
          .siblings()
          .removeClass('current');
      });
    },
    featuresSwiper: function (elem) {
      var sec = $(elem).attr('class');
      var section = '.' + sec + ' ';
      var triggerId = '#' + $(elem).find('.trigger').attr('id');

      var mySwiperSection = new Swiper(section + '.swiper', {
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        allowTouchMove: false,
        pagination: {
          el: '#swiper-pagination-' + sec,
          clickable: true,
        },
        navigation: {
          nextEl: '#swiper-' + sec + '-next',
          prevEl: '#swiper-' + sec + '-prev',
        },
      });

      var mobileRatio = window.matchMedia('(max-aspect-ratio: 678/669)'),
        viewportWidth = window.innerWidth,
        viewportHeight = window.innerHeight;

      var section10X1 = (-295 / 1920) * viewportWidth;
      var tlSection10 = new TimelineMax();
      tlSection10
        .add(
          TweenMax.fromTo(
            section + '.first-bgWrapper',
            0.3,
            {
              width: '100%',
              height: '100%',
              x: 0,
            },
            {
              width: '45.8%',
              height: '48%',
              x: section10X1,
            },
          ),
        )
        // .add(
        //     TweenMax.fromTo(section + '.first-bgWrapper .swiper-slide', 0.3, {
        //         width: '100%',
        //         height: '100%',
        //     }, {
        //         width: '100%',
        //         height: '100%',
        //     }), 2
        // )
        // .add(
        //     TweenMax.fromTo(section + '.first-bgWrapper .swiper-slide img', 0.3, {
        //         x: '-50%',
        //         y: '-50%',
        //         scale: 1.2
        //     }, {
        //         x: '-50%',
        //         y: '-50%',
        //         scale: 1
        //     }), 2
        // )
        .add(
          TweenMax.fromTo(
            section + '.first-textWrapper',
            0.2,
            {
              alpha: 0,
            },
            {
              alpha: 1,
            },
          ),
          2.5,
        )
        .add(function () {
          $(section + '.firstWrapper').removeClass('active');
        })
        .add(function () {
          $(section + '.firstWrapper').addClass('active');
        })
        .add(function () {
          mySwiperSection.slideTo(0);
        })
        .add(function () {}, 4);
      var animationSection10 = new ScrollMagic.Scene({
        triggerElement: triggerId,
        duration: '300%',
        triggerHook: 0,
      })
        .setTween(tlSection10)
        .addTo(controller);
    },
    featuresPhoto: function (elem) {
      var sec = $(elem).attr('class');
      var section = '.' + sec + ' ';
      var triggerId = '#' + $(elem).find('.trigger').attr('id');
    },
    featuresCarousel1: function () {
      new Swiper('.sec15 .swiper', {
        slidesPerView: 2,
        centeredSlides: true,
        loop: true,
      });
    },
    featuresCarousel: function (elem) {
      var sec = $(elem).attr('class');
      var section = '.' + sec + ' ';
      new Swiper(section + '.swiper', {
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        loop: true,
        loopedSlides: 3,
        autoplay: false,
        navigation: {
          nextEl: section + '.swiper-next',
          prevEl: section + '.swiper-prev',
        },
        // pagination: {
        //     el: '.swiper-pagination',
        //     //clickable :true,
        // },
        on: {
          progress: function (progress) {
            for (i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i);
              var slideProgress = this.slides[i].progress;
              modify = 1;
              if (Math.abs(slideProgress) > 1) {
                modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
              }
              translate =
                (slideProgress * modify * $(section + '.swiper-slide-active').width() * 850) /
                  1200 +
                'px';
              scale = 1 - Math.abs(slideProgress) / 4;
              zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
              slide.transform('translateX(' + translate + ') scale(' + scale + ')');
              slide.css('zIndex', zIndex);
              slide.css('opacity', 1);
              if (Math.abs(slideProgress) > 3) {
                slide.css('opacity', 0);
              }
            }
          },
          setTransition: function (transition) {
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i);
              slide.transition(transition);
            }
          },
        },
      });
    },
    featuresSlider: function (elem) {
      var el = $(elem).find('.controller input');
      $(el)
        .slider({
          id: el.attr('id'),
          formatter: function (value) {
            return value;
          },
        })
        .on('slide', function (slideEvt) {
          $(elem)
            .find('.wrapper')
            .css('width', slideEvt.value + '%');
        });
    },
    featuresScreen: function (elem) {
      var mobileRatio = window.matchMedia('(max-aspect-ratio: 678/669)'),
        viewportWidth = window.innerWidth,
        viewportHeight = window.innerHeight;

      var section = '.' + $(elem).attr('class') + ' ';
      var triggerId = '#' + $(elem).find('.trigger').attr('id');
      var tlSection = new TimelineMax();
      // 1076 为手机宽度
      var section3X1 = -viewportWidth / 2,
        section3X2 = (-1076 / 1920) * viewportWidth - viewportWidth / 2,
        section3X3 = (-800 / 1920) * viewportWidth,
        section3X4 = (288 / 1920) * viewportWidth,
        section3X5 = (48 / 1920) * viewportWidth,
        section3X6 = (28 / 1920) * viewportWidth,
        section3X7 = (-260 / 1920) * viewportWidth,
        section3X8 = (220 / 1920) * viewportWidth,
        section3Y1 = (-255 / 1920) * viewportWidth,
        section3Y2 = viewportHeight / 2 + (270 / 1920) * viewportWidth,
        section3Y3 = (265 / 1920) * viewportWidth;
      section3Y4 = (265 / 1920) * viewportWidth;
      section3Y5 = (100 / 1920) * viewportWidth;
      tlSection
        .add(function () {
          $(section + '.f2').css('opacity', 0);
        })
        .add(function () {
          $(section + '.f2').css('opacity', 1);
        }, 0.1)
        .add(
          TweenMax.fromTo(
            section + '.f1',
            0.35,
            {
              x: '-50%',
              y: '-50%',
              scale: 1,
            },
            {
              x: '-50%',
              y: '-50%',
              scale: 0.6,
            },
          ),
          0.2,
        )
        .add(
          TweenMax.fromTo(
            section + '.f2',
            0.35,
            {
              x: '-50%',
              y: '-50%',
              scale: 1,
            },
            {
              x: '-50%',
              y: '-50%',
              scale: 0.6,
            },
          ),
          0.2,
        )
        .add(
          TweenMax.to(section + '.f3', 0.2, {
            alpha: 1,
          }),
          1,
        )
        .add(function () {}, 4.5);
      new ScrollMagic.Scene({
        triggerElement: triggerId,
        duration: '400%',
        triggerHook: 0,
      })
        .setTween(tlSection)
        .addTo(controller);
    },
    featuresPerformance: function (elem) {
      var mobileRatio = window.matchMedia('(max-aspect-ratio: 678/669)'),
        viewportWidth = window.innerWidth,
        viewportHeight = window.innerHeight;

      var section = '.' + $(elem).attr('class') + ' ';
      var triggerId = '#' + $(elem).find('.trigger').attr('id');
      var tlSection = new TimelineMax();
      // 1076 为手机宽度
      var section3X1 = -viewportWidth / 2,
        section3X2 = (-1076 / 1920) * viewportWidth - viewportWidth / 2,
        section3X3 = (-800 / 1920) * viewportWidth,
        section3X4 = (288 / 1920) * viewportWidth,
        section3X5 = (48 / 1920) * viewportWidth,
        section3X6 = (28 / 1920) * viewportWidth,
        section3X7 = (-260 / 1920) * viewportWidth,
        section3X8 = (220 / 1920) * viewportWidth,
        section3Y1 = (-255 / 1920) * viewportWidth,
        section3Y2 = viewportHeight / 2 + (270 / 1920) * viewportWidth,
        section3Y3 = (265 / 1920) * viewportWidth;
      section3Y4 = (265 / 1920) * viewportWidth;
      section3Y5 = (100 / 1920) * viewportWidth;
      tlSection
        .add(
          TweenMax.fromTo(
            section + '.textWrapper',
            0.35,
            {
              y: '0',
              opacity: 1,
            },
            {
              y: '-40%',
              opacity: 0,
            },
          ),
          0.2,
        )
        .add(
          TweenMax.fromTo(
            section + '.f1',
            0.35,
            {
              x: '0',
              y: '0',
              scale: 1,
            },
            {
              x: '-20%',
              y: '0',
              scale: 0.6,
            },
          ),
          0.4,
        )
        .add(
          TweenMax.fromTo(
            section + '.cards',
            0.35,
            {
              alpha: 0,
            },
            {
              alpha: 1,
            },
          ),
          0.6,
        )
        .add(
          TweenMax.fromTo(
            section + '.cards',
            0.35,
            {
              x: '0',
              y: '0',
              scale: 1,
            },
            {
              x: '0',
              y: '-50%',
            },
          ),
          1,
        )
        .add(function () {}, 4.5);
      new ScrollMagic.Scene({
        triggerElement: triggerId,
        duration: '400%',
        triggerHook: 0.5,
      })
        .setTween(tlSection)
        .addTo(controller);
    },
    featuresMemory: function (elem) {
      var mobileRatio = window.matchMedia('(max-aspect-ratio: 678/669)'),
        viewportWidth = window.innerWidth,
        viewportHeight = window.innerHeight;
      var sec = $(elem).attr('class');
      var section = '.' + $(elem).attr('class') + ' ';
      var triggerId = '#' + $(elem).find('.trigger').attr('id');
      var tlSection = new TimelineMax();

      var section8Y1 = (-100 / 1920) * viewportWidth;
      var tlSection8 = new TimelineMax();
      tlSection8
        .add(
          TweenMax.fromTo(
            section + '.first-bgWrapper',
            0.3,
            {
              scale: 2.5,
              alpha: 0.3,
            },
            {
              scale: 2,
              alpha: 1,
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail1',
            0.5,
            {
              x: '-100%',
              y: '-30%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail2',
            0.5,
            {
              x: '-140%',
              y: '-80%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail3',
            0.5,
            {
              x: '-100%',
              y: '-200%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail4',
            0.5,
            {
              x: '-20%',
              y: '-60%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail5',
            0.5,
            {
              x: '20%',
              y: '-20%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail6',
            0.5,
            {
              x: '120%',
              y: '-30%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail7',
            0.5,
            {
              x: '170%',
              y: '-80%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail8',
            0.5,
            {
              x: '200%',
              y: '0%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail9',
            0.5,
            {
              x: '-200%',
              y: '10%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail10',
            0.5,
            {
              x: '-170%',
              y: '30%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail11',
            0.5,
            {
              x: '-120%',
              y: '-20%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail12',
            0.5,
            {
              x: '-75%',
              y: '30%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail13',
            0.5,
            {
              x: '-15%',
              y: '15%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail14',
            0.5,
            {
              x: '45%',
              y: '55%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail15',
            0.5,
            {
              x: '105%',
              y: '15%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail16',
            0.5,
            {
              x: '105%',
              y: '5%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail17',
            0.5,
            {
              x: '155%',
              y: '35%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail18',
            0.5,
            {
              x: '-155%',
              y: '105%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail19',
            0.5,
            {
              x: '-155%',
              y: '105%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail20',
            0.5,
            {
              x: '-25%',
              y: '155%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail21',
            0.5,
            {
              x: '65%',
              y: '155%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail22',
            0.5,
            {
              x: '85%',
              y: '355%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail23',
            0.5,
            {
              x: '85%',
              y: '355%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail24',
            0.5,
            {
              x: '145%',
              y: '355%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail25',
            0.5,
            {
              x: '445%',
              y: '255%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail26',
            0.5,
            {
              x: '345%',
              y: '425%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.fromTo(
            section + '.first-detail.detail27',
            0.5,
            {
              x: '445%',
              y: '425%',
            },
            {
              x: '0%',
              y: '0%',
            },
          ),
          0,
        )
        .add(
          TweenMax.to(section + '.first-bgWrapper', 0.3, {
            scale: 1,
          }),
          0.3,
        )
        .add(
          TweenMax.fromTo(
            section + '#' + sec + '-svg',
            0.1,
            {
              alpha: 0,
            },
            {
              alpha: 1,
            },
          ),
          0.25,
        )
        .add(
          TweenMax.fromTo(
            section + '#' + sec + '-svg',
            0.29,
            {
              scale: 5,
            },
            {
              scale: 1,
            },
          ),
          0.25,
        )
        .add(
          TweenMax.fromTo(
            section + '.copy-wrapper',
            0.3,
            {
              alpha: 0,
              x: 0,
              y: '30px',
            },
            {
              alpha: 1,
              x: 0,
              y: '0',
            },
          ),
          0.5,
        );
      new ScrollMagic.Scene({
        triggerElement: triggerId,
        duration: '700%',
        triggerHook: 0,
      })
        .setTween(tlSection8)
        .addTo(controller);
    },
    smilePhoto: function (elem) {
      var sec = $(elem).attr('class');
      var section = '.' + sec + ' ';
      var triggerId = '#' + $(elem).find('.trigger').attr('id');
      var tlSection = new TimelineMax();
      var screen = section + '.secondWrapper';
      var mobileRatio = window.matchMedia('(max-aspect-ratio: 678/669)'),
        viewportWidth = window.innerWidth,
        // viewportWidth = document.documentElement.clientWidth
        viewportHeight = window.innerHeight;
      var section10X1 = ((1920 / 2 - 600 / 2) / 1920) * viewportWidth;
      var section10X2 = (-(600 * 6 - 1920) / 1920) * viewportWidth;

      tlSection
        .to(section + '.imgWrapper', 1, {
          x: '-50%',
          y: '-50%',
          scale: 1,
        })
        .to(
          section + '.imgWrapper',
          1,
          {
            x: '-50%',
            y: '-50%',
            scale: 0.5,
          },
          'a',
        )
        .to(
          section + '.f2',
          0,
          {
            opacity: 1,
          },
          'a',
        )
        .to(section + '.imgWrapper', 0.3, {
          y: '-80%',
          opacity: 0,
        })
        .to(section + '.secondWrapper', 0, {
          opacity: 1,
        })
        .to(section + '.pics', 0, {
          x: section10X1,
        })
        .to(
          section + '.f3',
          2,
          {
            y: 0,
            scale: 1,
          },
          2,
        )
        .to(section + '.line, ' + section + '.text', 0, {
          opacity: 1,
        })
        .to(section + '.f4', 0, {
          opacity: 1,
        })
        .to(section + '.pics', 2, {
          x: section10X2,
        })
        .to(section + '.secondWrapper', 2, {
          // x: "-1620vw"
        });
      new ScrollMagic.Scene({
        duration: '500%',
        triggerHook: 1,
        triggerElement: triggerId,
      })
        .setTween(tlSection)
        .addTo(controller);
    },
    featuresCharge: function (elem) {
      var section = '.' + $(elem).attr('class') + ' ';
      var triggerId = '#' + $(elem).find('.trigger').attr('id');
      var tlSection = new TimelineMax();
      var mobileRatio = window.matchMedia('(max-aspect-ratio: 678/669)'),
        viewportWidth = window.innerWidth,
        viewportHeight = window.innerHeight;
      var section10X1 = (-524 / 1920) * viewportWidth;
      var section10X2 = (-2800 / 1920) * viewportWidth;
      var section10Y1 = (0 / 1920) * viewportWidth;
      var section10Y2 = (760 / 1920) * viewportWidth;

      tlSection
        .to(section + '.copy-wrapper', 1, {
          y: section10Y1,
          // y: '-50%',
        })
        .to(
          section + '.pic-text',
          2,
          {
            left: section10X1,
          },
          'a',
        )
        .to(
          section + '.f3',
          1,
          {
            top: section10Y2,
          },
          'a',
        )
        .to(section + '.f2', 0.3, {
          opacity: 0,
        });
      new ScrollMagic.Scene({
        duration: '300%',
        triggerHook: 1,
        triggerElement: triggerId,
      })
        .setTween(tlSection)
        .addTo(controller);
    },
    featuresCamera: function (elem) {
      var sec = $(elem).attr('class');
      var section = '.' + sec + ' ';
      var triggerId = '#' + $(elem).find('.trigger').attr('id');
      var tlSection = new TimelineMax();
      var mobileRatio = window.matchMedia('(max-aspect-ratio: 678/669)'),
        viewportWidth = window.innerWidth,
        viewportHeight = window.innerHeight;
      var section10X1 = (-524 / 1920) * viewportWidth;
      var section10X2 = (-2800 / 1920) * viewportWidth;
      var section10Y1 = (-275 / 1920) * viewportWidth;
      var section10Y2 = (760 / 1920) * viewportWidth;

      if (mobileRatio.matches) {
        tlSection
          .to(section + '.textWrapper', 1, {
            opacity: 1,
            y: '10%',
          })
          .to(section + '.mask', 1, {})
          .to(section + '.f2', 1, {
            opacity: 1,
          })
          .to(section + '.f1, ' + section + '.f2', 1, {
            x: '10%',
            scale: 1.2,
          })
          .to(section + '.f3', 1, {
            opacity: 1,
          })
          .to(section + '.f3', 5, {});
        new ScrollMagic.Scene({
          duration: '300%',
          triggerHook: 0.3,
          triggerElement: triggerId,
        })
          .setTween(tlSection)
          .addTo(controller);
      } else {
        tlSection
          .to(section + '.textWrapper', 1, {
            opacity: 1,
            y: '10%',
          })
          .to(section + '.mask', 1, {})
          .to(section + '.f2', 1, {
            opacity: 1,
          })
          .to(section + '.f1, ' + section + '.f2', 1, {
            x: '10%',
            scale: 1.2,
          })
          .to(section + '.f3', 1, {
            opacity: 1,
          })
          .to(section + '.f3', 5, {});
        new ScrollMagic.Scene({
          duration: '300%',
          triggerHook: 0.3,
          triggerElement: triggerId,
        })
          .setTween(tlSection)
          .addTo(controller);
      }
    },
    featuresApplication: function (elem) {
      var section = '.' + $(elem).attr('class') + ' ';
      var triggerId = '#' + $(elem).find('.trigger').attr('id');
      var tlSection = new TimelineMax();
      var mobileRatio = window.matchMedia('(max-aspect-ratio: 678/669)'),
        viewportWidth = window.innerWidth,
        viewportHeight = window.innerHeight;
      var section10X1 = (-524 / 1920) * viewportWidth;
      var section10X2 = (-2800 / 1920) * viewportWidth;
      var section10Y1 = (-275 / 1920) * viewportWidth;
      var section10Y2 = (760 / 1920) * viewportWidth;

      tlSection
        .to(section + '.pic', 1, {
          opacity: 1,
        })
        .to(
          section + '.f1',
          1,
          {
            top: '69%',
            left: '50%',
            scale: 1,
          },
          'a',
        )
        .to(
          section + '.f2',
          1,
          {
            top: '50%',
            left: '35%',
            scale: 1,
          },
          'a',
        )
        .to(
          section + '.f3',
          1,
          {
            top: '72%',
            left: '35%',
            scale: 1,
          },
          'a',
        )
        .to(
          section + '.f4',
          1,
          {
            top: '15%',
            left: '56%',
            scale: 1,
          },
          'a',
        )
        .to(
          section + '.f5',
          1,
          {
            top: '56%',
            left: '58%',
            scale: 1,
          },
          'a',
        )
        .to(
          section + '.f6',
          1,
          {
            top: '74%',
            left: '60%',
            scale: 1,
          },
          'a',
        )
        .to(
          section + '.f7',
          1,
          {
            top: '25%',
            left: '33%',
            scale: 1,
          },
          'a',
        )
        .to(section + '.pic', 0, {
          opacity: 0,
        })
        .to(
          section + '.bg',
          3,
          {
            opacity: 1,
            scale: 1,
            x: '-50%',
            y: '-50%',
          },
          'b',
        )
        .to(section + '.pic', 5, {});
      new ScrollMagic.Scene({
        duration: '300%',
        triggerHook: 0.5,
        triggerElement: triggerId,
      })
        .setTween(tlSection)
        .addTo(controller);
    },
    fingerPrintUnlock: function (elem) {},
    accessories: function (elem) {
      var sec = $(elem).attr('class');
      var section = '.' + sec + ' ';
      var el = elem.querySelector('.swiper');
      new Swiper(el, {
        slidesPerView: 'auto',
        navigation: {
          prevEl: section + '.pager-prev',
          nextEl: section + '.pager-next',
        },
      });
    },
    video: function () {
      var mobileRatio = window.matchMedia('(max-width: 768px)');
      $('video').each(function () {
        if (mobileRatio.matches) {
          // $(this).attr('poster', $(this).data('poster-m'));
          $(this).attr('src', $(this).find('source').data('src-m'));
        } else {
          // $(this).attr('poster', $(this).data('poster-p'));
          $(this).attr('src', $(this).find('source').data('src-p'));
        }
        this.load();
      });
    },
    init: function () {
      var componentList = Array.from(document.querySelectorAll('[data-component-list]'));
      var self = this;

      componentList.forEach(function (elem) {
        var componentName = elem.getAttribute('data-component-list');
        if (overview[componentName] && $.isFunction(overview[componentName])) {
          overview[componentName].call(self, elem);
        }
      });
    },
  };

  overview.init();
});
