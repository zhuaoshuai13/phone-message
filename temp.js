require("intersection-observer");
import LazyLoad from "vanilla-lazyload";
var videoPath = "/assets/images/hot11-play/video/";


// var imagePath = "/assets/images/hot12/";



var videoPath = "/fileadmin/assets/v/note/note12/note12g96/images/";
var imagePath = "/fileadmin/assets/v/note/note12/note12g96/images/";
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


  setPart2: function() {
    if (utls.isPc) {
      this.setPart2Pc();
    } else {
      // this.setPart12Mb();
    }
  },
  setPart2Pc: function() {

    var elem = document.querySelector(".sec2");

    if (!elem) {
      return
    }
    var winHeight = $('.sec2').height();

    this.setScene([(new TimelineMax)
      .from('.sec2 .f1',.5,{opacity:0,x:80},"a")
      .from('.sec2 .f2',.5,{opacity:0,x:80},"a")
      .from('.sec2 .f3',.5,{opacity:0,x:80},"a")
      .from('.sec2 .f4',.5,{opacity:0,x:80,delay:.2},"a")
      .from('.sec2 .f5',.5,{opacity:0,x:80,delay:.2},"a")
      .from('.sec2 .f6',.5,{opacity:0,x:80,delay:.2},"a")
      .from('.sec2 .f7',.5,{opacity:0,x:80,delay:.4},"a")
      .from('.sec2 .f8',.5,{opacity:0,x:80,delay:.4},"a")

  ], {
      triggerElement: ".sec2 .triger ",
      triggerHook: 0,
      // duration: winHeight/3
    })
  },
  setPart5: function() {
    if (utls.isPc) {
      this.setPart5Pc();
    } else {
      this.setPart5Mb();
    }
  },
  setPart5Pc: function() {

    var elem = document.querySelector(".sec5");

    if (!elem) {
      return
    }
    var winHeight = $('.sec5').height();

    this.setScene([(new TimelineMax)
      .to('.sec5 .item',1,{x:"-33.33%"},'a')
      .to('.sec5 ',.3,{marginTop:0},'b')


  ], {
      triggerElement: ".sec5 ",
      triggerHook: 0,
      duration: winHeight*1.3
    }).setPin('.sec5')
  },
  setPart5Mb: function() {

    var elem = document.querySelector(".sec5");

    if (!elem) {
      return
    }
    var winHeight = $('.sec5').height();

    this.setScene([(new TimelineMax)
      .to('.sec5 .item',1,{x:"-33.33%"},'a')
      .to('.sec5',1,{marginTop:0},'b')
      .to('.sec5 .item',1,{x:"-66.66%"},'c')
      .to('.sec5 ',.3,{marginTop:0},'d')


  ], {
      triggerElement: ".sec5 ",
      triggerHook: 0,
      duration: winHeight*2
    }).setPin('.sec5')
  },
  setPartA: function() {
    if (utls.isPc) {
      this.setPartAPc();
    } else {
      // this.setPartAMb();
    }
  },
  setPartAPc: function() {

    var elem = document.querySelector(".partA");

    if (!elem) {
      return
    }
    var winHeight = $('.partA').height();

    this.setScene([(new TimelineMax)
      .from('.sec3 ',1,{opacity: .5},'a')
      .to('.sec3',1,{opacity: 0},'b')
      .from('.sec4',1,{opacity: 0},'c')
  ], {
      triggerElement: ".partA",
      triggerHook: 0,
      duration: winHeight*2
    }).setPin('.partA').on("progress",(e)=>{
      if(e.progress<.6){
        $('.sec4').removeClass('is-visible');
      }
      if(e.progress>.8){
        $('.sec4').addClass('is-visible');
      }
    })
  },
  setPartAMb: function() {

    var elem = document.querySelector(".partA");

    if (!elem) {
      return
    }
    var winHeight = $('.partA').height();

    this.setScene([(new TimelineMax)
      .from('.sec3 ',1,{opacity: .5},'a')
      .to('.sec3',1,{opacity: 0},'b')
      .from('.sec4',1,{opacity: 0},'c')
  ], {
      triggerElement: ".partA",
      triggerHook: 0,
      duration: winHeight*2
    }).setPin('.partA').on("progress",(e)=>{
      if(e.progress<.6){
        $('.sec4').removeClass('is-visible');
      }
      if(e.progress>.8){
        $('.sec4').addClass('is-visible');
      }
    })
  },

  setPartB: function() {
    if (utls.isPc) {
      this.setPartBPc();
    } else {
      // this.setPart12Mb();
    }
  },
  setPartBPc: function() {

    var elem = document.querySelector(".partB");

    if (!elem) {
      return
    }
    var winHeight = $('.partB').height();

    function a() {
      if($('.sec7 video')[0].currentTime===0){
        console.log('aaa');
        console.log($('.sec7 video')[0]);
        $('.sec7 video')[0].play()
      }
    }
    function b() {
      $('.sec7 video')[0].currentTime = 0 ;
    }

    this.setScene([(new TimelineMax)
      .from('.sec6 ',1,{opacity: .5},'a')
      .to('.sec6',1,{opacity: 0},'b')
      .from('.sec7',1,{opacity: 0},'c')
      .to('.partB',2,{marginTop:0},'d')
  ], {
      triggerElement: ".partB",
      triggerHook: 0,
      duration: winHeight*2
    }).setPin('.partB')
    .on("progress",(e)=>{
      if(e.progress<.3){
        $('.sec7 .des').removeClass('is-visible');
        $('.sec7 .icon-box').removeClass('is-visible');
        b()
      }
      if(e.progress>.75){
        a()
        $('.sec7 .des').addClass('is-visible');
      }
      if(e.progress===1){
        $('.sec7 .icon-box').addClass('is-visible');
        // $('.sec7').addClass('is-visible');
      }
      // if(e.progress<.6){
      //   $('.sec4').removeClass('is-visible');
      // }
      // if(e.progress>.8){
      //   $('.sec4').addClass('is-visible');
      // }
    })
  },

  setPartC: function() {
    if (utls.isPc) {
      this.setPartCPc();
    } else {
      // this.setPart12Mb();
    }
  },
  setPartCPc: function() {

    var elem = document.querySelector(".partC");

    if (!elem) {
      return
    }
    var winHeight = $('.partC').height();

    this.setScene([(new TimelineMax)
      .from('.sec8 ',1,{opacity: .5},'a')
      .to('.sec8',1,{opacity: 0},'b')
      .from('.addA',1,{opacity: 0},'c')
  ], {
      triggerElement: ".partC",
      triggerHook: 0,
      duration: winHeight*2
    }).setPin('.partC').on("progress",(e)=>{
      if(e.progress<.6){
        $('.addA .des').removeClass('is-visible');
      }
      if(e.progress>.8){
        $('.addA .des').addClass('is-visible');
      }
    })
  },
  setPartD: function() {
    if (utls.isPc) {
      this.setPartDPc();
    } else {
      // this.setPart12Mb();
    }
  },
  setPartDPc: function() {

    var elem = document.querySelector(".partD");

    if (!elem) {
      return
    }
    var winHeight = $('.partD').height();

    this.setScene([(new TimelineMax)
      .from('.sec10 ',1,{opacity: .5},'a')
      .to('.sec10',1,{opacity: 0},'b')
      .from('.sec11',1,{opacity: 0},'c')
  ], {
      triggerElement: ".partD",
      triggerHook: 0,
      duration: winHeight*2
    }).setPin('.partD').on("progress",(e)=>{
      if(e.progress<.6){
        $('.sec11').removeClass('is-visible');
      }
      if(e.progress>.8){
        $('.sec11').addClass('is-visible');
      }
    })
  },
  setPartE: function() {
    if (utls.isPc) {
      this.setPartEPc();
    } else {
      // this.setPart12Mb();
    }
  },
  setPartEPc: function() {

    var elem = document.querySelector(".partE");

    if (!elem) {
      return
    }
    var winHeight = $('.partE').height();

    this.setScene([(new TimelineMax)
      .from('.sec15 ',1,{opacity: .5},'a')
      .to('.sec15',1,{opacity: 0},'b')
      .from('.sec16',1,{opacity: 0},'c')
  ], {
      triggerElement: ".partE",
      triggerHook: 0,
      duration: winHeight*2
    }).setPin('.partE').on("progress",(e)=>{
      if(e.progress<.6){
        $('.sec16').removeClass('is-visible');
      }
      if(e.progress>.8){
        $('.sec16').addClass('is-visible');
      }
    })
  },

  setPart7: function() {
    if (utls.isPc) {
      this.setPart7Pc();
    } else {
      // this.setPart12Mb();
    }
  },
  setPart7Pc: function() {

    var elem = document.querySelector(".sec2");

    if (!elem) {
      return
    }

    var winHeight = $('.sec7').height();
    function a() {
        if($('.sec7 video')[0].currentTime===0){
          $('.sec7 video')[0].play();
        }
    }
    function b() {
      $('.sec7 video')[0].currentTime = 0 ;
    }

    this.setScene([(new TimelineMax)

  ], {
      triggerElement: ".sec7 .triger",
      triggerHook: 0,
      duration: winHeight
    }).on("progress", function(e) {
      if (e.progress > 0.01 ) {
        a()
      }
      else if (e.progress <= 0){
        b()
      }
  }
)
},
setPart11: function() {
  if (utls.isPc) {
    this.setPart11Pc();
  } else {
    // this.setPart12Mb();
  }
},
setPart11Pc: function() {

  var elem = document.querySelector(".sec11");

  if (!elem) {
    return
  }
  var winHeight = $('.sec11').height();
  function a() {
    if($('.sec11 video')[0].currentTime===0){
      $('.sec11 video')[0].play();
    }
}
function b() {
  $('.sec11 video')[0].currentTime = 0 ;
  $('.sec11 video')[0].pause();
}

  this.setScene([(new TimelineMax)


], {
    triggerElement: ".sec11 .triger",
    triggerHook: 0,
    duration: winHeight
  })
},


  setPart12: function() {
    if (utls.isPc) {
      this.setPart12Pc();
    } else {
      this.setPart12Mb();
    }
  },
  setPart12Pc: function() {

    var elem = document.querySelector(".sec12");

    if (!elem) {
      return
    }
    var winHeight = $('.sec12').height();

    this.setScene([(new TimelineMax)
      .to('.sec12 .peoplein',2,{scale:2})

  ], {
      triggerElement: ".sec12 .triger",
      triggerHook: 0,
      duration: winHeight/3.5
    })
  },
  setPart12Mb: function() {

    var elem = document.querySelector(".sec12");

    if (!elem) {
      return
    }
    var winHeight = $('.sec12').height();

    this.setScene([(new TimelineMax)
      .to('.sec12 .peoplein',2,{scale:2})

  ], {
      triggerElement: ".sec12 .triger",
      triggerHook: 0,
      duration: winHeight/3.5
    })
  },

  setPart17: function() {
    if (utls.isPc) {
      this.setPart17Pc();
    } else {
      this.setPart17Mb();
    }
  },
  setPart17Pc: function() {

    var elem = document.querySelector(".sec17");

    if (!elem) {
      return
    }
    var winHeight = $('.sec17').height();

    function a() {
      if($('.sec17 video')[0].currentTime===0){
        $('.sec17 video')[0].play();
      }else{
        if($('.sec17 video')[0].currentTime===$('.sec17 video')[0].duration){
          $('.sec17 video')[0].currentTime = 0
          $('.sec17 video')[0].play();
        }
      }
  }


    this.setScene([(new TimelineMax)
      .to('.sec17 .box',3,{x:"-25%"},'a')
      .to('.sec17',2,{marginTop:"0"},'b')
      .to('.sec17 .box',3,{x:"-50%"},'c')
      .to('.sec17',2,{marginTop:"0"},'d')
      .to('.sec17 .box',3,{x:"-75%"},'e')


  ], {
      triggerElement: ".sec17 ",
      triggerHook: 0,
      duration: winHeight*4
    }).setPin('.sec17').on("progress", function(e) {
      if (e.progress > .25) {
        a()
      }
  }
)
  },
  setPart17Mb: function() {
    var elem = document.querySelector(".sec17");

    if (!elem) {
      return
    }
    var winHeight = $('.sec17').height();

    this.setScene([(new TimelineMax)
      .to('.sec17 .box',3,{x:"-25%"},'a')
      .to('.sec17',2,{marginTop:"0"},'b')
      .to('.sec17 .box',3,{x:"-50%"},'c')
      .to('.sec17',2,{marginTop:"0"},'d')
      .to('.sec17 .box',3,{x:"-75%"},'e')


  ], {
      triggerElement: ".sec17 ",
      triggerHook: 0,
      duration: winHeight*3
    }).setPin('.sec17')
  },

  setPartgroup: function() {
    if (utls.isPc) {
      this.setPartgroupPc();
    } else {
      // this.setPart17Mb();
    }
  },
  setPartgroupPc: function() {

    var elem = document.querySelector(".group");

    if (!elem) {
      return
    }
    var winHeight = $('.group').height();

    function a() {
      if($('.sec22 video')[0].currentTime===0){
        $('.sec22 video')[0].currentTime=0
        $('.sec22 video')[0].play();
      }else{
        if($('.sec22 video')[0].currentTime===$('.sec22 video')[0].duration){
          $('.sec22 video')[0].currentTime = 0
          $('.sec22 video')[0].play();
        }
      }
  }


    this.setScene([(new TimelineMax)
      .to('.group',1,{marginTop:0},'a')
      .to('.group',1,{x:"-20%"},'b')
      .to('.group',1,{marginTop:0},'c')
      .to('.group',1,{x:"-40%"},'d')
      .to('.group',1,{marginTop:0},'e')
      .to('.group',1,{x:"-60%"},'f')
      .to('.group',1,{marginTop:0},'g')
      .to('.group',1,{x:"-80%"},'h')
      .to('.group',1,{marginTop:0},'i')
  ], {
      triggerElement: ".group ",
      triggerHook: 0,
      duration: winHeight*8
    }).setPin('.group').on("progress", function(e) {
      if (e.progress >= .6) {
        a()
      }
    }
    )
  },







  init: function () {
    this.winWidth = window.innerWidth;
    this.controller = new ScrollMagic.Controller();
    this.setPart2();
    this.setPart5();
    this.setPartA();
    this.setPartB();
    this.setPartC();
    this.setPartD();
    this.setPartE();
    // this.setPart7();
    this.setPart11();
    this.setPart12();
    this.setPart17();
    this.setPartgroup();

    this.elLazy = this.lazy();
    this.scroll();
  },
};

$(function () {
  overview.init();
});


