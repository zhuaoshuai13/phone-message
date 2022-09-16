require("intersection-observer");
import LazyLoad from "vanilla-lazyload";
import { CanvasPlayer, PlayMode, ImageSequence } from '@zhinan-oppo/canvas-player';

var videoPath =
  "https://infinixmob.mez100.com.cn/fileadmin/assets/v/hot/hot20i/video";
  // "/fileadmin/assets/v/hot/hot20i/video";

!(function ($) {
  function visibleWatcher(opt) {
    function getCurrentSection() {
      for (
        var index = -1,
          pos = $(document).scrollTop(),
          i = 0,
          len = sectionPosArr.length;
        i < len && pos + options.viewport.height() > sectionPosArr[i];
        i += 1
      )
        index += 1;
      return index;
    }
    function refresh() {
      var viewIndex = getCurrentSection();
      curIndex !== viewIndex &&
        ((curIndex = viewIndex),
        $sections
          .filter(function (i) {
            return i <= curIndex && !$(this).hasClass(options.visibleClass);
          })
          .addClass(options.visibleClass)
          .trigger("visible.visibleWatcher"),
        options.onVisible($sections.eq(curIndex), curIndex));
    }
    function init() {
      $sections.each(function () {
        var offsetValue = $(this).attr("data-offset")
            ? Number($(this).attr("data-offset"))
            : options.offset,
          visibleOffset =
            offsetValue % 1 == 0
              ? offsetValue
              : offsetValue * options.viewport.height();
        sectionPosArr.push($(this).offset().top + visibleOffset);
      }),
        refresh(),
        options.onLoad();
    }
    var defaults,
      options,
      $sections = $(this),
      curIndex = -1,
      sectionPosArr = [];
    (defaults = {
      viewport: $(window),
      visibleClass: "is-visible",
      offset: 300,
      onLoad: $.noop,
      onVisible: $.noop,
    }),
      (options = $.extend({}, defaults, opt)),
      init(),
      options.viewport.on({
        "scroll.visibleWatcher": refresh,
        "resize.visibleWatcher": init,
      });
  }
  $.fn.visibleWatcher = function (opt) {
    return visibleWatcher.call(this, opt), this;
  };
})(jQuery);

$.fn.feature = function (n) {
  var o = {
    initLine: null,
    reinitLine: null,
    heightIgnore: ".fp-floating-nav",
    on: function () {},
    off: function () {},
    onVisible: function () {},
    offVisible: function () {},
    onLazyLoad: function () {},
  };

  o = $.extend({}, o, n);
  var i = $(this);
  var a = false;
  var r = false;
  var s = false;
  var u = false;
  var f = 0;
  var d = function () {
    return i.length
      ? !0
      : "container : " + i.selector + " => not found container";
  };

  var l = function () {
    $(window).on(
      "scroll",
      $.proxy(function () {
        var n = i;
        var d = $(window).height();
        var l = $(window).scrollTop();
        var c = change(n, d, l);
        l >= f
          ? (!c.down.isOnVisibleMotion ||
              r ||
              s ||
              (o.onVisible(n), (r = true)),
            !c.down.isOnMotion || a || s || (o.on(n), (a = true), (s = false)),
            c.down.isOffMotion &&
              a &&
              !s &&
              (o.off(n), (a = false), (s = true)),
            l > n.offset().top - (d + 1e3) &&
              !u &&
              (o.onLazyLoad(n), (u = true)))
          : f > l &&
            (c.up.isOnMotion &&
              !a &&
              s &&
              (o.on(n), o.onVisible(n), (a = true), (s = false)),
            c.up.isOffMotion && a && !s && (o.off(n), (a = false), (s = false)),
            !c.up.isOffVisibleMotion ||
              a ||
              s ||
              (o.offVisible(n), (r = false))),
          (f = l);
      })
    );
  };

  var change = function (n, i, a) {
    var r = 0;
    var s = 0;
    n.find(".fp-feature__figure");
    if (
      (null != o.initLine
        ? isNaN(o.initLine)
          ? n.find(o.initLine).length && (r = n.find(o.initLine).offset().top)
          : (r = o.initLine)
        : (r = n.offset().top - 0.5 * n.height()),
      "object" == typeof o.heightIgnore)
    ) {
      for (var u = 0, f = 0; f < o.heightIgnore.length; f++) {
        u += $(o.heightIgnore[f]).outerHeight();
      }
      r -= u;
    } else {
      "string" == typeof o.heightIgnore &&
        (r -= $(o.heightIgnore).length ? $(o.heightIgnore).outerHeight() : 0);
    }

    null != o.reinitLine
      ? isNaN(o.reinitLine)
        ? n.find(o.reinitLine).length && (s = n.find(o.reinitLine).offset().top)
        : (s = o.reinitLine)
      : (s = n.offset().top + 1.1 * n.height());
    // down: isOffMotion: a > n.offset().top + 1.1 * n.height() ? true : false
    var d = {
      down: {
        isOnMotion: a > r ? true : false,
        isOnVisibleMotion:
        // + 0.5 * n.height()这个数据可以控制滚动到屏幕那个距离触发onVisible()
        // +0.5就是n这个dom已经显示在屏幕一半的时候触发
          // a > n.offset().top - $(window).height() + 0.5 * n.height()
          a > n.offset().top - $(window).height() + 0.3 * $(window).height()
            ? true
            : false,
        isOffMotion: a > n.offset().top + 1.1 * n.height() ? true : false,
      },
      up: {
        isOnMotion: s > a ? true : false,
        isOffVisibleMotion: a < n.offset().top - 1.1 * i ? true : false,
        isOffMotion: a < n.offset().top - 1.1 * i ? true : false,
      },
    };
    return d;
  };

  var c = function () {
    l();
  };

  var g = d();
  g === !0 && c();
};

!(function ($) {
  function Ani(options) {
    var defaults = {
      container: "",
      animateObj: "", // 需要运动的对象
      easing: "easeIn", // 运动速度变化
      imgCompEvent: "", // 图片加载完执行
      addEvent: "",
      removeEvent: "",
      topHalf: 0.5, // 上半部分 漏出 多少 后执行
      bottomHalf: 0.5, // 下半部分 漏出 多少 后执行
      proportion: 1, // 整个页面的高宽比 ： 高/宽
      single: [],
    };

    this.opt = $.extend({}, defaults, options);
    this.gb = {
      container: this.opt.container || $(".container"),
      load: false,
      isHeight: false,
      hTimer: "",
      w: 0,
    };
    this.init();
  }

  Ani.prototype = {
    init: function () {
      var self = this;
      self.opt.container.find(self.opt.animateObj).each(function () {
        var css = new Object($(this).data("ani-start"));

        if (css.transform != undefined) {
          css["-webkit-transform"] = css.transform;
          css["-moz-transform"] = css.transform;
          css["-o-transform"] = css.transform;
          css["-ms-transform"] = css.transform;
        }

        $(this).css(css);
      });

      self.imgInit();

      $(window).scroll(function () {
        self.scrollEvent();
      });

      $(window).resize(function () {
        self.scrollEvent();
      });
    },
    // 图片初始化：预加载
    imgInit: function () {
      var self = this;

      function start() {
        self.gb.load = true;

        self.opt.container.find(self.opt.animateObj).each(function () {
          var elem = $(this);
          var delay = parseInt(elem.data("ani")["delay"]) + "ms" || "0s";
          var duration = parseInt(elem.data("ani")["duration"]) + "ms" || "2s";
          self.setCss(elem, delay, duration);
        });

        setTimeout(function () {
          self.scrollEvent();
          if (typeof self.opt.imgCompEvent === "function") {
            self.opt.imgCompEvent();
          }
        }, 500);
      }

      start();
    },
    setCss: function (el, delay, duration) {
      el.css({
        "transition-delay": delay,
        "-webkit-transition-delay": delay,
        "-moz-transition-delay": delay,
        "-o-transition-delay": delay,
        "-ms-transition-delay": delay,
        "transition-duration": duration,
        "-webkit-transition-duration": duration,
        "-moz-transition-duration": duration,
        "-o-transition-duration": duration,
        "-ms-transition-duration": duration,
      });
    },
    scrollEvent: function () {
      var self = this;
      if (!self.gb.load) {
        return;
      }

      var topArray = self.opt.container;

      topArray.each(function (i) {
        var elem = $(this);
        var top = elem.offset().top;
        var scrollTop = $(document).scrollTop();
        var winHeight = $(window).height();

        if (
          (top <= scrollTop &&
            top + elem.height() >=
              scrollTop + elem.height() * self.opt.topHalf) || //上半部分 多余 0.5 可见
          (top <= scrollTop + winHeight - elem.height() * self.opt.bottomHalf &&
            top + elem.height() >= scrollTop + winHeight) || //下班部分 多余 0.5 可见
          (top >= scrollTop && top + elem.height() <= scrollTop + winHeight)
        ) {
          // 完全可见
          if (!elem.hasClass("active")) {
            if (typeof self.opt.addEvent === "function") {
              self.opt.addEvent(elem);
            }

            elem.find(self.opt.animateObj).each(function () {
              self.imgAnimate($(this), true);
            });
          }
        } else {
          if (elem.hasClass("active")) {
            if (typeof self.opt.removeEvent === "function") {
              self.opt.removeEvent(elem);
            }

            elem.find(self.opt.animateObj).each(function () {
              self.imgAnimate($(this), false);
            });
          }
        }
      });
    },

    imgAnimate: function (el, StartOrEnd) {
      var self = this;
      var occur = el.data("ani")["reset"] || false;

      if (StartOrEnd || occur) {
        var singleCSS = new Object(
          StartOrEnd ? el.data("ani-end") : el.data("ani-start")
        );
        if (singleCSS.transform != undefined) {
          singleCSS["-webkit-transform"] = singleCSS.transform;
          singleCSS["-moz-transform"] = singleCSS.transform;
          singleCSS["-o-transform"] = singleCSS.transform;
          singleCSS["-ms-transform"] = singleCSS.transform;
        }

        if (el.is(":animated")) {
          el.stop();
        }

        if (!StartOrEnd) {
          var delay = "0s";
          var duration = "0.5s";
          self.setCss(el, delay, duration);
          el.css(singleCSS);
        } else {
          var delay = parseInt(el.data("ani")["delay"]) + "ms" || "0s";
          var duration = parseInt(el.data("ani")["duration"]) + "ms" || "2s";
          self.setCss(el, delay, duration);
          el.css(singleCSS);
        }
      }
    },
    events: function () {},
  };

  new Ani({
    container: $(".section-ani"),
    animateObj: ".ani-animate",
    easing: "easeIn",
    topHalf: 0.2,
    bottomHalf: 0.2,
    addEvent: function (self) {
      self.addClass("active");
    },
    removeEvent: function (self) {
      self.removeClass("active");
    },
    imgCompEvent: function () {},
  });
})(window.jQuery);

var utls = {
  getScrollX: function (t) {
    var e;
    if ((t = t || window) === window) {
      if ((e = window.pageXOffset)) return e;
      t = document.documentElement || document.body.parentNode || document.body;
    }
    return t.scrollLeft;
  },

  getScrollY: function (t) {
    var e;
    if ((t = t || window) === window) {
      if ((e = window.pageYOffset)) return e;
      t = document.documentElement || document.body.parentNode || document.body;
    }
    return t.scrollTop;
  },

  getClientHeight: function () {
    return (
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight
    );
  },
  isPc: $(window).width() > 768 ? true : false,
};

var overview = {
  lazy: function () {
    $("video.lazy").each(function () {
      var videoUrl = $(this).data("url");
      var surl = $(this).data("surl");
      if (!utls.isPc && surl) {
        videoUrl = surl;
      }
      $(this).attr("data-src", videoPath + videoUrl);
    });
    new LazyLoad({
      elements_selector: ".lazy",
      callback_enter: function (el) {},
    });
  },

  scroll: function () {
    $(".sec").each(function () {
      $(this).feature({
        on: function (n) {},
        off: function (n) {},
        onVisible: function (n) {
          n.addClass("active");
        },
        offVisible: function (n) {
          n.removeClass("active");
        },
      });
    });
  },

  createImg: function(elem, option) {
    const canvas = document.querySelector(elem + ' canvas');
    let i = 1
    let arr = [];

    while( i < option.len) {
      arr.push('<img class="lazy" data-src="/fileadmin/assets/v/note/note12/note12pro/images/'+ option.file +'pic__' +i + '_' + (option.type ? option.type : '.png') +'" alt="" />')
      i++;
    }

    $(canvas).html(arr.join(''));

    // this.elLazy.update();
  },

  play: function(elem) {
    const canvas = document.querySelector(elem + ' canvas');

    const imgs = canvas.querySelectorAll('img');
    const o = new ImageSequence(Array.from(imgs));

    o.load()
    imgs.forEach(function(item) {
      LazyLoad.load(item)
    })
    return new CanvasPlayer(canvas, o);
  },

  setScene: function (t, e) {
    this.controller = new ScrollMagic.Controller();
    var i, r;
    t
      ? (t.length > 1
          ? ((r = new TimelineMax()),
            t.forEach(function (t) {
              r.add(t, 0);
            }))
          : (r = t[0] || new TimelineMax()),
        (i = new ScrollMagic.Scene(e).setTween(r).addTo(this.controller)))
      : (i = new ScrollMagic.Scene(e).addTo(this.controller));
    return (
      window.debugEnable &&
        i.addIndicators({
          name: e.triggerElement || "div",
        }),
      i
    );
  },

  setSec9: function() {
    $('#brightSlider').on('input propertychange', function() {
      $('.sec9 .mask.bright').css('opacity', (1 - $(this).val()/$('.sec9 #brightSlider').attr('max')).toFixed(2))
    })

    if (!utls.isPc) {
      var times
      $(".sec9 .content").feature({
        on: function (n) {
          var min = $(".sec9 #brightSlider").attr('min')
          var max = $(".sec9 #brightSlider").attr('max')
          clearInterval(times);
          var num1 = min;
          times = setInterval(function () {
            num1++;
              if (num1 >= max) {
                clearInterval(times);
                num1 = max;
              }
              $('.sec9 #brightSlider').val(Number(num1))
              $('.sec9 .mask.bright').css('opacity', (1 - num1/max))
            }, 20)
        },
        off: function (n) {
          clearInterval(times);
          $('.sec9 #brightSlider').val(0)
          $('.sec9 .mask.bright').css('opacity', 1)
        },
        onVisible: function (n) {
        },
        offVisible: function (n) {},
      });
    }

    $('.sec9 .switch').click(function() {
      if($(this).hasClass('active')) {
        $(this).removeClass('active')
        $('.mask.eye').css('opacity', 0)
      }else {
        $(this).addClass('active')
        $('.mask.eye').css('opacity', 0.5)
      }
    })
  },

  setSec14: function() {
    var winHeight = $(window).height();

    if (utls.isPc) {
      this.setScene(
        [
          new TimelineMax()
        ],
        {
          triggerElement: ".sec14",
          duration: 2 * winHeight,
          offset: 150,
          triggerHook: 0,
        }
      ).setPin(".sec14")
      .on('progress',function(e){
        if(e.progress < 0.1){
          $('.sec14 .right .item').css('opacity', 1)
          $('.sec14 .item1').css('display', 'flex')
          $('.sec14 .item2').css('display', 'flex')
          $('.sec14 .item3').css('display', 'none')
          $('.sec14 .item4').css('display', 'none')
        }else if(0.1 < e.progress && e.progress < 0.4){
          $('.sec14 .f4').css('opacity', 0)
          $('.sec14 .f3').css('opacity', 1)
          $('.sec14 .f2').css('opacity', 1)
          $('.sec14 .f1').css('opacity', 1)
          $('.sec14 .item1').css('display', 'flex')
          $('.sec14 .item2').css('display', 'flex')
          $('.sec14 .item3').css('display', 'none')
          $('.sec14 .item4').css('display', 'none')
        }else if(0.4 < e.progress && e.progress  < 0.7){
          $('.sec14 .f4').css('opacity', 0)
          $('.sec14 .f3').css('opacity', 0)
          $('.sec14 .f2').css('opacity', 1)
          $('.sec14 .f1').css('opacity', 1)
          $('.sec14 .item1').css('display', 'none')
          $('.sec14 .item2').css('display', 'flex')
          $('.sec14 .item3').css('display', 'flex')
          $('.sec14 .item4').css('display', 'none')
        }else if(0.7 < e.progress && e.progress  < 1){
          $('.sec14 .f4').css('opacity', 0)
          $('.sec14 .f3').css('opacity', 0)
          $('.sec14 .f2').css('opacity', 0)
          $('.sec14 .f1').css('opacity', 1)
          $('.sec14 .item1').css('display', 'none')
          $('.sec14 .item2').css('display', 'none')
          $('.sec14 .item3').css('display', 'flex')
          $('.sec14 .item4').css('display', 'flex')
        }
      });
    } else {
      var sec14Swiper = new Swiper('.sec14-swiper', {
        autoplay: {
          delay: 1000
        },
        loop: true,
        initialSlide: 1,
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        slidesPerView: 'auto',
        direction: "horizontal",
        on: {
          setTransition: function(transition) {
            for (var i = 0; i < this.slides.length; i++) {
              var slide = this.slides.eq(i)
              slide.transition(transition);
            }
          },
        }
      })
      // this.setScene(
      //   [
      //     new TimelineMax()
      //       .to(".sec14 .f4", 1, {
      //         opacity: 0,
      //       })
      //       .to(".sec14 .f3", 1, {
      //         opacity: 0,
      //       })
      //       .to(".sec14 .f2", 1, {
      //         opacity: 0,
      //       })
      //   ],
      //   {
      //     triggerElement: ".sec14",
      //     // duration: winHeight,
      //     offset: -80,
      //     triggerHook: 0,
      //   }
      // )
    }
  },

  setSec15: function() {
    var winHeight = $(window).height();
    $('.sec15 .switch').click(function() {
      var index = $('.sec15 .switch').index(this)
      if($(this).hasClass('active')) {
        $(this).removeClass('active')
        $('.sec15 .battery').eq(index).removeClass('active')
      }else {
        $(this).addClass('active')
        $('.sec15 .battery').eq(index).addClass('active')
      }
    })

    if(!utls.isPc) {
      this.setScene(
        [
          new TimelineMax()
            .to(".sec15.mob .mask", 1.5, {
              height: 0
            }, 'same')
            .to(".sec15.mob .text-box", 1.5, {
              color: '#000'
            }, 'same')
        ],
        {
          triggerElement: ".sec15.mob .battery-box",
          offset: 600,
          // triggerHook: 0,
          triggerHook: 'onEnter',
        }
      );
    }
  },

  setSec20: function () {
    var sec20Swiper = new Swiper('.sec20-swiper', {
      // autoplay: true,
      // loop: true,
      initialSlide: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      slidesPerView: 'auto',
      direction: "horizontal",
      on: {
        setTransition: function(transition) {
          for (var i = 0; i < this.slides.length; i++) {
            var slide = this.slides.eq(i)
            slide.transition(transition);
          }
        },
      }
    })

    $('.sec20 .items .item').click(function() {
      var index = $(this).index();
      sec20Swiper.slideTo(index, 1000, false)
      $('.sec20 .items .item').css('opacity', 0.5)
      $(this).css('opacity', 1)
      if(index == 0) {
        $('.sec20 .triangle').css('transform', utls.isPc ? 'rotate(70deg)' : 'rotate(-32deg)')
        $('.sec20 .content-item').css('display', 'none')
        $('.sec20 .content1').css('display', 'block')
      }else if(index == 1) {
        $('.sec20 .triangle').css('transform', utls.isPc ? 'rotate(90deg)' : 'rotate(0)')
        $('.sec20 .content-item').css('display', 'none')
        $('.sec20 .content2').css('display', 'block')
      }else if(index == 2) {
        $('.sec20 .triangle').css('transform', utls.isPc ? 'rotate(105deg)' : 'rotate(32deg)')
        $('.sec20 .content-item').css('display', 'none')
        $('.sec20 .content3').css('display', 'block')
      }
    })
  },

  setSec22: function () {
    var sec22Swiper = new Swiper('.sec22-swiper', {
      autoplay: {
        delay: 1000,
      },
      
      loop: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      slidesPerView: 1,
      direction: "horizontal",
      on: {
        setTransition: function(transition) {
          for (var i = 0; i < this.slides.length; i++) {
            var slide = this.slides.eq(i)
            slide.transition(transition);
          }
        },
        slideChange: function(){
          $('.sec22 .btns .item').removeClass('active')
          $('.sec22 .btns .item').eq([this.realIndex]).addClass('active')
        }
      }
    })

    $('.sec22 .btns .item').click(function() {
      var index = $(this).index()+1 ;
      sec22Swiper.slideTo(index, 1000, false)
      $('.sec22 .btns .item').removeClass('active')
      $(this).addClass('active')
    })
  },
};

$(function () {
  overview.scroll();
  overview.lazy();
  overview.setSec9()
  overview.setSec14()
  overview.setSec15()
  overview.setSec20()
  overview.setSec22()
});
