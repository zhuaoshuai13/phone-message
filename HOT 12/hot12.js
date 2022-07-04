require("intersection-observer");
import LazyLoad from "vanilla-lazyload";
var videoPath = "/assets/images/hot11-play/video/";


// var imagePath = "/assets/images/hot12/";



var videoPath = "/fileadmin/assets/v/hot/hot12/images/";
var imagePath = "/fileadmin/assets/v/hot/hot12/images/";
// var videoPath = "/assets/images/hot12/";


import { CanvasPlayer, PlayMode, ImageSequence } from '@zhinan-oppo/canvas-player';
// import { addScrollListener } from '@zhinan-oppo/scroll-handle';
// window.debugEnable = false;

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

$.fn.feature = function(n) {
  var o = {
    initLine: null,
    reinitLine: null,
    heightIgnore: '.fp-floating-nav',
    on: function() {},
    off: function() {},
    onVisible: function() {},
    offVisible: function() {},
    onLazyLoad: function() {}
  };

  o = $.extend({}, o, n);
  var i = $(this);
  var a = false;
  var r = false;
  var s = false;
  var u = false;
  var f = 0;
  var d = function() {
    return i.length ? !0 : 'container : ' + i.selector + ' => not found container';
  }

  var l = function() {
    $(window).on('scroll', $.proxy(function() {
      var n = i;
      var d = $(window).height();
      var l = $(window).scrollTop();
      var c = change(n, d, l);
      l >= f ? (!c.down.isOnVisibleMotion || r || s || (o.onVisible(n),
            r = true),
          !c.down.isOnMotion || a || s || (o.on(n),
            a = true,
            s = false),
          c.down.isOffMotion && a && !s && (o.off(n),
            a = false,
            s = true),
          l > n.offset().top - (d + 1e3) && !u && (o.onLazyLoad(n),
            u = true)) : f > l && (c.up.isOnMotion && !a && s && (o.on(n),
            o.onVisible(n),
            a = true,
            s = false),
          c.up.isOffMotion && a && !s && (o.off(n),
            a = false,
            s = false),
          !c.up.isOffVisibleMotion || a || s || (o.offVisible(n),
            r = false)),
        f = l
    }))
  }

  var change = function(n, i, a) {
    var r = 0
    var s = 0;
    n.find('.fp-feature__figure');
    if (null != o.initLine ? isNaN(o.initLine) ? n.find(o.initLine).length && (r = n.find(o.initLine).offset().top) : r = o.initLine : r = n.offset().top - .5 * n.height(),
      'object' == typeof o.heightIgnore) {
      for (var u = 0, f = 0; f < o.heightIgnore.length; f++) {
        u += $(o.heightIgnore[f]).outerHeight();
      }
      r -= u;
    } else {
      'string' == typeof o.heightIgnore && (r -= $(o.heightIgnore).length ? $(o.heightIgnore).outerHeight() : 0);
    }

    null != o.reinitLine ? isNaN(o.reinitLine) ? n.find(o.reinitLine).length && (s = n.find(o.reinitLine).offset().top) : s = o.reinitLine : s = n.offset().top + 1.1 * n.height();
    // down: isOffMotion: a > n.offset().top + 1.1 * n.height() ? true : false
    var d = {
      down: {
        isOnMotion: a > r ? true : false,
        isOnVisibleMotion: a > n.offset().top - $(window).height() + .1 * n.height() ? true : false,
        isOffMotion: a > n.offset().top + 1.1 * n.height() ? true : false
      },
      up: {
        isOnMotion: s > a ? true : false,
        isOffVisibleMotion: a < n.offset().top - 1.1 * i ? true : false,
        isOffMotion: a < n.offset().top - 1.1 * i ? true : false
      }
    };
    return d;
  }

  var c = function() {
    l();
  }

  var g = d();
  g === !0 && c();
};

!(function($) {
  function Ani(options) {
    var defaults = {
      container: '',
      animateObj: '', // 需要运动的对象
      easing: 'easeIn', // 运动速度变化
      imgCompEvent: '', // 图片加载完执行
      addEvent: '',
      removeEvent: '',
      topHalf: 0.5, // 上半部分 漏出 多少 后执行
      bottomHalf: 0.5, // 下半部分 漏出 多少 后执行
      proportion: 1, // 整个页面的高宽比 ： 高/宽
      single: []
    };

    this.opt = $.extend({}, defaults, options);
    this.gb = {
      container: this.opt.container || $('.container'),
      load: false,
      isHeight: false,
      hTimer: '',
      w: 0
    };
    this.init();
  };

  Ani.prototype = {
    init: function() {
      var self = this;
      self.opt.container.find(self.opt.animateObj).each(function() {
        var css = new Object($(this).data('ani-start'));

        if (css.transform != undefined) {
          css['-webkit-transform'] = css.transform;
          css['-moz-transform'] = css.transform;
          css['-o-transform'] = css.transform;
          css['-ms-transform'] = css.transform;
        }

        $(this).css(css);
      });

      self.imgInit();

      $(window).scroll(function() {
        self.scrollEvent();
      });

      $(window).resize(function() {
        self.scrollEvent();
      });
    },
    // 图片初始化：预加载
    imgInit: function() {
      var self = this;

      function start() {
        self.gb.load = true;

        self.opt.container.find(self.opt.animateObj).each(function() {
          var elem = $(this);
          var delay = parseInt(elem.data('ani')['delay']) + 'ms' || '0s';
          var duration = parseInt(elem.data('ani')['duration']) + 'ms' || '2s';
          self.setCss(elem, delay, duration);
        });

        setTimeout(function() {
          self.scrollEvent();
          if (typeof self.opt.imgCompEvent === 'function') {
            self.opt.imgCompEvent();
          }
        }, 500);
      }

      start();
    },
    setCss: function(el, delay, duration) {
      el.css({
        'transition-delay': delay,
        '-webkit-transition-delay': delay,
        '-moz-transition-delay': delay,
        '-o-transition-delay': delay,
        '-ms-transition-delay': delay,
        'transition-duration': duration,
        '-webkit-transition-duration': duration,
        '-moz-transition-duration': duration,
        '-o-transition-duration': duration,
        '-ms-transition-duration': duration
      });
    },
    scrollEvent: function() {
      var self = this;
      if (!self.gb.load) {
        return;
      }

      var topArray = self.opt.container;

      topArray.each(function(i) {
        var elem = $(this);
        var top = elem.offset().top;
        var scrollTop = $(document).scrollTop();
        var winHeight = $(window).height();

        if (
          (top <= scrollTop && top + elem.height() >= scrollTop + elem.height() * self.opt.topHalf) || //上半部分 多余 0.5 可见
          (top <= scrollTop + winHeight - elem.height() * self.opt.bottomHalf && top + elem.height() >= scrollTop + winHeight) || //下班部分 多余 0.5 可见
          (top >= scrollTop && top + elem.height() <= scrollTop + winHeight)
        ) {
          // 完全可见
          if (!elem.hasClass('active')) {
            if (typeof self.opt.addEvent === 'function') {
              self.opt.addEvent(elem);
            }

            elem.find(self.opt.animateObj).each(function() {
              self.imgAnimate($(this), true);
            });
          }
        } else {
          if (elem.hasClass('active')) {
            if (typeof self.opt.removeEvent === 'function') {
              self.opt.removeEvent(elem);
            }

            elem.find(self.opt.animateObj).each(function() {
              self.imgAnimate($(this), false);
            });
          }
        }
      });
    },

    imgAnimate: function(el, StartOrEnd) {
      var self = this;
      var occur = el.data('ani')['reset'] || false;

      if (StartOrEnd || occur) {
        var singleCSS = new Object(StartOrEnd ? el.data('ani-end') : el.data('ani-start'));
        if (singleCSS.transform != undefined) {
          singleCSS['-webkit-transform'] = singleCSS.transform;
          singleCSS['-moz-transform'] = singleCSS.transform;
          singleCSS['-o-transform'] = singleCSS.transform;
          singleCSS['-ms-transform'] = singleCSS.transform;
        }

        if (el.is(':animated')) {
          el.stop();
        }

        if (!StartOrEnd) {
          var delay = '0s';
          var duration = '0.5s';
          self.setCss(el, delay, duration);
          el.css(singleCSS);
        } else {
          var delay = parseInt(el.data('ani')['delay']) + 'ms' || '0s';
          var duration = parseInt(el.data('ani')['duration']) + 'ms' || '2s';
          self.setCss(el, delay, duration);
          el.css(singleCSS);
        }
      }
    },
    events: function() {}
  };

  new Ani({
      container: $('.section-ani'),
      animateObj: '.ani-animate',
      easing: 'easeIn',
      topHalf: 0.2,
      bottomHalf: 0.2,
      addEvent: function(self) {
          self.addClass('active');
      },
      removeEvent: function(self) {
          self.removeClass('active');
      },
      imgCompEvent: function() {
      }
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

    return new LazyLoad({
      elements_selector: ".lazy",
      callback_enter: function (el) {
      },
      callback_loading: function (el) {
        if ($(el).hasClass('startframe')) {
          $(el).parent().find('canvas .lazy').each(function(index, item) {
            $(item).attr('src', $(item).data('src'))
          })
        }
      }
    });

    // new LazyLoad({
    //   container: ".lazy",
    //   callback_enter: function (el) {
    //     // console.log(el)
    //     // $(el).removeClass("");
    //   },
    // });
  },

  initVideo: function () {
    if (!document.querySelector("video")) {
      return;
    }

    this.videoLink();
    this.bindCloseVideoWindow();
  },

  _saveScrollPosition: function () {
    this._scrollX = utls.getScrollX();
    this._scrollY = utls.getScrollY();
  },

  _restoreScrollPosition: function () {
    window.scrollTo(this._scrollX || 0, this._scrollY || 0);
  },

  videoLink: function () {
    var htmlEl = document.querySelector("html");
    var videoBtn = document.querySelectorAll(".play-video");
    var videoWindow = document.querySelector("#fullscreen-video");
    var videoWindowEl = videoWindow && videoWindow.querySelector("video");
    videoBtn.forEach(function (elem) {
      elem.onclick = function (e) {
        e.preventDefault();
        overview._saveScrollPosition();
        // videoWindowEl.setAttribute("poster", elem.getAttribute("data-poster"));
        videoWindowEl.setAttribute("src", elem.getAttribute("data-video"));
        videoWindowEl.load();

        htmlEl.classList.add("has-modal-full-viewport");
        videoWindow.classList.add("active", "in-transition");
        setTimeout(function () {
          videoWindow.classList.remove("in-transition");
        }, 500);
        videoWindowEl.play();
      };
    });
  },

  bindCloseVideoWindow: function () {
    var closeVideoBtn = document.querySelector("#fullscreen-close");
    closeVideoBtn.onclick = function (e) {
      e.preventDefault();
      overview.closeVideoWindow();
    };
  },

  closeVideoWindow: function () {
    var htmlEl = document.querySelector("html");
    var videoWindow = document.querySelector("#fullscreen-video");
    var videoWindowEl = videoWindow.querySelector("video");

    videoWindowEl.pause();
    videoWindow.classList.remove("active");
    htmlEl.classList.remove("has-modal-full-viewport");
    this._restoreScrollPosition();
  },

  setScene: function (t, e) {
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

  pageInit: function () {
    var self = this;
    window.addEventListener("resize", function () {
      window.innerWidth !== self.winWidth && window.location.reload();
    });
  },

  scroll: function () {
    $('.animate').each(function() {
      $(this).feature({
        on: function(n) {
          $(n).addClass('is-visible');
        },
        off: function(n) {
          $(n).removeClass('is-visible');
        },
      })
    })
  },

  setPart1: function() {
    if (utls.isPc) {
      this.setPart1Pc();
    } else {
      // this.setPart1Mb();
    }
  },
  setPart1Pc: function() {
    var elem = document.querySelector(".sec3");

    if (!elem) {
      return
    }
    var winHeight = $('.sec3').height();
    var tm = new TimelineMax({repeat: -1});
    tm.to("#myText", 2, {text:{value:"春眠不觉晓",newClass:"class2", oldClass:"class1"}, ease:Linear.easeNone})

    this.setScene([(new TimelineMax)
      .from(".test p",1,{opacity:0,y:40,ease:Back.easeOut},"a")
      .from(".test .description",1,{opacity:0,y:20,ease:Back.easeOut,delay:.3},"a")
      .to(".test #myText", 2, {text:{value:"春眠不觉晓",newClass:"class2", oldClass:"class1"}, ease:Linear.easeNone})
  ], {
      triggerElement: ".test",
      triggerHook: 0,
      // duration: winHeight
    })

  },


  setPart3: function() {
    if (utls.isPc) {
      this.setPart3Pc();
    } else {
      this.setPart3Mb();
    }
  },
  setPart3Pc: function() {
    var elem = document.querySelector(".sec3");

    if (!elem) {
      return
    }
    var winHeight = $('.sec3').height();

    this.setScene([(new TimelineMax)
      .to(".sec3 .video",1,{scale:1.5})
  ], {
      triggerElement: ".sec2 .list",
      triggerHook: 0,
      duration: winHeight/2
    })

  },
  setPart8: function() {
    if (utls.isPc) {
      this.setPart8Pc();
    } else {
      this.setPart8Mb();
    }
  },
  setPart8Pc: function() {
    var elem = document.querySelector(".sec8");

    if (!elem) {
      return
    }
    var winHeight = $('.sec8').height();

    this.setScene([(new TimelineMax)
      .to(".sec8 .left",5,{opacity:0, x: -40},"a")
      .to(".sec8 .right",5,{opacity:0, x: 40},"a")
      .from(".sec8 .mask",5,{opacity:0})
      .from(".sec8 .f1",5,{x:20,opacity:0})
      .from(".sec8 .f2",5,{x:20,opacity:0})
      .from(".sec8 .f3",5,{x:20,opacity:0})
      .from(".sec8 .f4",5,{x:20,opacity:0})
      .from(".sec8 .tip",5,{opacity:0, y: 20})
      .to(".sec8 ",1,{marginTop:0})

  ], {
      triggerElement: ".sec8",
      triggerHook: 0,
      duration: winHeight*2
    }).setPin('.sec8')

  },
  setPart8Mb: function() {
    var elem = document.querySelector(".sec8");

    if (!elem) {
      return
    }
    var winHeight = $('.sec8').height();

    this.setScene([(new TimelineMax)
      .to(".sec8 .left",5,{opacity:0, x: -40},"a")
      .to(".sec8 .right",5,{opacity:0, x: 40},"a")
      .from(".sec8 .mask",5,{opacity:0})
      .from(".sec8 .f1",5,{x:20,opacity:0})
      .from(".sec8 .f2",5,{x:20,opacity:0})
      .from(".sec8 .f3",5,{x:20,opacity:0})
      .from(".sec8 .f4",5,{x:20,opacity:0})
      // .from(".sec8 .tip",5,{opacity:0, y: 20})
      // .to(".sec8 ",1,{marginTop:0})

  ], {
      triggerElement: ".sec8",
      triggerHook: 0,
      duration: winHeight
    }).setPin('.sec8')

  },

  setPart10: function() {
    if (utls.isPc) {
      this.setPart10Pc();
    } else {
      // this.setPart10Mb();
    }
  },
  setPart10Pc: function() {
    var elem = document.querySelector(".sec10");

    if (!elem) {
      return
    }
    var winHeight = $('.sec10').height();

    this.setScene([(new TimelineMax)
      .to(".sec10 .bigimg",1,{marginTop:0},"a")
      .to(".sec10 .bigimg",2,{scale:.53,opacity:1,y:104},"b")
      .to(".sec10 .sphone",2,{scale:.7,y:122},"b")
      .to(".sec10 .wave1",2,{scale:.7,y:122},"b")
      .to(".sec10 .wave2",2,{scale:.7,y:122},"b")
      .to(".sec10 .wave3",2,{scale:.7,y:122},"b")
      .from(".sec10 p",2,{opacity:0,y:40},"c")
      .from(".sec10 .description",2,{opacity:0,y:40},"c")
  ], {
      triggerElement: ".sec10",
      triggerHook: 0,
      duration: winHeight
    }).setPin('.sec10').on("progress", function(e) {
      if (e.progress <= .25) {
       $('.sec10 .bigimg').removeClass('bigimgadd')
     }
     if(e.progress >= .53) {
      $('.sec10 .wave1').addClass('start1')
      $('.sec10 .wave2').addClass('start2')
      $('.sec10 .wave3').addClass('start3')
     }
     else if(e.progress <= .53) {
      $('.sec10 .wave1').removeClass('start1')
      $('.sec10 .wave2').removeClass('start2')
      $('.sec10 .wave3').removeClass('start3')
     }
     else if (e.progress > .25) {
       $('.sec10 .bigimg').addClass('bigimgadd')
     }
   })

  },

  setPartpart1: function() {
    if (utls.isPc) {
      this.setPartpart1Pc();
    } else {
      console.log('mb');
      this.setPartpart1Mb();
    }
  },
  setPartpart1Pc: function() {
    var elem = document.querySelector(".part1");

    if (!elem) {
      return
    }
    var winHeight = $('.part1').height();

    this.setScene([(new TimelineMax)
      .to(".sec11", 2,{marginTop:0})
      .from(".sec11 p", 5,{y:40,opacity:0},"a")
      .to(".sec11 p", 5,{opacity:0},"b")
      .from(".sec11 .description", 5,{y:40,opacity:0},"a")
      .to(".sec11 .description", 5,{opacity:0},"b")
      .from(".sec12 p", 5,{y:40,opacity:0},"c")
      .from(".sec12 .description", 5,{y:40,opacity:0},"c")
      .from(".sec12 .tip", 5,{y:40,opacity:0},"c")
  ], {
      triggerElement: ".part1",
      triggerHook: 0,
      duration: winHeight*3
    }).setPin('.part1').on("progress", function(e) {
       if (e.progress <= .65) {
        $('.sec11').removeClass('sec11add')
        $('.sec12').removeClass('sec12add')
      } else if (e.progress > .65 && e.progress <= .75) {
        $('.sec11').addClass('sec11add')
        $('.sec12').addClass('sec12add')
      }
    })

  },
  setPartpart1Mb: function() {
    var elem = document.querySelector(".part1");

    if (!elem) {
      return
    }
    var winHeight = $('.part1').height();

    this.setScene([(new TimelineMax)
      .to(".sec11", 2,{marginTop:0})
      .from(".sec11 p", 5,{y:40,opacity:0},"a")
      .to(".sec11 p", 5,{opacity:0},"b")
      .from(".sec11 .description", 5,{y:40,opacity:0},"a")
      .to(".sec11 .description", 5,{opacity:0},"b")
      .from(".sec12 p", 5,{y:40,opacity:0},"c")
      .from(".sec12 .description", 5,{y:40,opacity:0},"c")
      .from(".sec12 .tip", 5,{y:40,opacity:0},"c")
  ], {
      triggerElement: ".part1",
      triggerHook: 0,
      duration: winHeight*3
    }).setPin('.part1').on("progress", function(e) {
       if (e.progress <= .65) {
        $('.sec11').removeClass('sec11addmob')
        $('.sec12').removeClass('sec12addmob')
      } else if (e.progress > .65 && e.progress <= .75) {
        $('.sec11').addClass('sec11addmob')
        $('.sec12').addClass('sec12addmob')
      }
    })

  },
  setSec14: function () {
    if (utls.isPc) {
      this.setSec14Pc();
    } else {
      this.setSec14Mb();
    }
  },

  setSec14Pc: function () {
    var elem = document.querySelector(".sec14");

    if (!elem) {
      return
    }

    // !function changeImg(){
    //   for(let i = 0; i < $('.sec14 .btn div').length;i++){
    //     $('.sec14 .btn div').eq(i).click(function(){
    //       $('.sec14 .img').css('background-image',`url(${imagePath}pc/sec14/f${i+1}${i+1}.png)`)
    //     })
    //   }
    // }()
    function a(index){
      for(let i = 0;i < 4;i++){
       $('.sec14 .btn .bbox').eq(i).css('background-size','0')
      }
      if(index == 5){
        index = 1
      }
      $('.sec14 .btn .bbox').eq(index-1).css('background-size','100% 100%')
     }
    new Swiper(".sec14 .swiper-container", {
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      slidesPerView: "1",
      lazy: true,
      loop: true,
      speed: 800,
      autoplay : true,
      autoplay: {
        delay:2000
      },
      on:{
        slideNextTransitionStart: function(swiper){
          //Swiper初始化了
          // console.log('当前的slide序号是'+this.activeIndex);//或者swiper.activeIndex，swiper与this都可指代当前swiper实例
          // this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件，需要先设置transitionEnd
          a(this.activeIndex)
        },
      },
      pagination: {
        el: ".sec14 .pagination",
        // clickable: true,
      },
    });
  },
  setSec14Mb: function () {
    var elem = document.querySelector(".sec14");

    if (!elem) {
      return
    }

    // !function changeImg(){
    //   for(let i = 0; i < $('.sec14 .btn div').length;i++){
    //     $('.sec14 .btn div').eq(i).click(function(){
    //       $('.sec14 .img').css('background-image',`url(${imagePath}pc/sec14/f${i+1}${i+1}.png)`)
    //     })

    //   }
    // }()
    function a(index){
      for(let i = 0;i < 4;i++){
       $('.sec14 .btn .bbox').eq(i).css('background-size','0')
      }
      if(index == 5){
        index = 1
      }
      $('.sec14 .btn .bbox').eq(index-1).css('background-size','100% 100%')
     }
    new Swiper(".sec14 .swiper-container", {
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      slidesPerView: "1",
      lazy: true,
      loop: true,
      speed: 800,
      autoplay : true,
      autoplay: {
        delay:2000
      },
      on:{
        slideNextTransitionStart: function(swiper){
          //Swiper初始化了
          // console.log('当前的slide序号是'+this.activeIndex);//或者swiper.activeIndex，swiper与this都可指代当前swiper实例
          // this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件，需要先设置transitionEnd
          a(this.activeIndex)
        },
      },
      pagination: {
        el: ".sec14 .pagination",
        // clickable: true,
      },
    });
  },

  setPart15: function() {
    if (utls.isPc) {
      this.setPart15Pc();
    } else {
      // this.setPart15Mb();
    }
  },
  setPart15Pc: function() {
    var elem = document.querySelector(".sec15");

    if (!elem) {
      return
    }
    var winHeight = $('.sec15').height();

    this.setScene([(new TimelineMax)
      .to(".sec15 .text",2,{y:-40,opacity:0},"a")
      .to(".sec15 .img",4,{scale:2.5},"b")
      .to(".sec15 .description",1,{opacity:0},"b")
  ], {
      triggerElement: ".sec15",
      triggerHook: 0,
      duration: winHeight*5
    }).setPin('.sec15')
  },
  setPart15Mb: function() {
    var elem = document.querySelector(".sec15");

    if (!elem) {
      return
    }
    var winHeight = $('.sec15').height();

    this.setScene([(new TimelineMax)
      .to(".sec15 .text",2,{y:-40,opacity:0},"a")
      .to(".sec15 .img",4,{scale:4},"b")
      .to(".sec15 .img",4,{y:200},"b")
      .to(".sec15 .description",1,{opacity:0},"b")
  ], {
      triggerElement: ".sec15",
      triggerHook: 0,
      duration: winHeight*5
    }).setPin('.sec15')
  },

  setPart17: function() {
    if (utls.isPc) {
      this.setPart17Pc();
    } else {
      // this.setPart17Mb();
    }
  },
  setPart17Pc: function() {
    var elem = document.querySelector(".sec17");

    if (!elem) {
      return
    }
    var winHeight = $('.sec17').height();

    this.setScene([(new TimelineMax)
      .to(".sec17 .imgs", 1,{x:-220},"a")

  ], {
      triggerElement: ".sec17 .triger",
      triggerHook: 0,
      // duration: winHeight
    })

  },
  setPart18: function() {
    if (utls.isPc) {
      this.setPart18Pc();
    } else {
      this.setPart18Mb();
    }
  },
  setPart18Pc: function() {
    var elem = document.querySelector(".part2");

    if (!elem) {
      return
    }
    var winHeight = $('.sec18').height();

    this.setScene([(new TimelineMax)
      .to('.sec18 .logo',3,{opacity:0,y:-100})
      .from('.sec19',3,{opacity:0})
      .from('.sec19 .one',3,{opacity:0,y:40})
      .to('.sec19 .one',3,{opacity:0})
      .from('.sec19 .two',3,{opacity:0,y:40})
      .to('.sec19 .two',3,{opacity:0})
      .from('.sec19 .three',3,{opacity:0,y:40})
  ], {
      triggerElement: ".part2",
      triggerHook: 0,
      duration: winHeight * 4
    }).setPin('.part2')

  },
  setPart18Mb: function() {
    var elem = document.querySelector(".part2");

    if (!elem) {
      return
    }
    var winHeight = $('.sec18').height();

    this.setScene([(new TimelineMax)
      .to('.sec18 .logo',3,{opacity:0,y:-100})
      .from('.sec19',3,{opacity:0})
      .from('.sec19 .one',3,{opacity:0,y:40})
      .to('.sec19 .one',3,{opacity:0})
      .from('.sec19 .two',3,{opacity:0,y:40})
      .to('.sec19 .two',3,{opacity:0})
      .from('.sec19 .three',3,{opacity:0,y:40})
  ], {
      triggerElement: ".part2",
      triggerHook: 0,
      duration: winHeight * 4
    }).setPin('.part2')

  },





  init: function () {
    this.winWidth = window.innerWidth;
    this.controller = new ScrollMagic.Controller();
    // this.pageInit();
    // this.setPart9()
    this.setPart1();
    this.setPart8();
    this.setPart10();
    this.setPartpart1();

    this.setSec14();
    this.setPart15();
    this.setPart17();
    this.setPart18();

    this.elLazy = this.lazy();
    this.scroll();
  },
};

$(function () {
  overview.init();
});

