require("intersection-observer");
import LazyLoad from "vanilla-lazyload";
var videoPath = "/fileadmin/assets/v/smart/smart6plus/images/";


var imagePath = "/fileadmin/assets/v/smart/smart6plus/images/";



// var videoPath = "/fileadmin/assets/v/hot/hot12/images/";
// var imagePath = "https://infinixmob.mez100.com.cn/fileadmin/assets/v/smart/smart6hd/images/";
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

  createImg: function(elem, option) {
    const canvas = document.querySelector(elem + ' canvas');
    let i = 0
    let arr = [];

    while( i < option.len) {
      arr.push('<img class="lazy" data-src="'+ imagePath + option.file + i + '.' + (option.ext ? option.ext : 'png') +'" alt="" />')
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
  setSec3: function () {
    if (utls.isPc) {
      this.setSec3Pc();
    } else {
      this.setSec3Mb();
    }
  },
  setSec3Pc: function () {
    var elem = document.querySelector(".sec3");

    if (!elem) {
      return
    }
    var winHeight = $('.sec3').height();
     function a() {
      $('.active video')[0].play();
    }

    this.setScene([(new TimelineMax)

  ], {
      triggerElement: ".sec3",
      triggerHook: 0,
      duration: winHeight
    }).on("progress", function(e) {
        if (e.progress <= .25) {
        a()
      }
    }
  )


  },
  setSec3Mb: function () {
    var elem = document.querySelector(".sec3");

    if (!elem) {
      return
    }
    var winHeight = $('.sec3').height();
     function a() {
      $('.active video')[0].play();
    }

    this.setScene([(new TimelineMax)

  ], {
      triggerElement: ".sec3",
      triggerHook: 0,
      duration: winHeight
    }).on("progress", function(e) {
        if (e.progress > .25) {
        a()
      }
    }
  )
  },
  setSec4: function () {
    if (utls.isPc) {
      this.setSec4Pc();
    } else {
      this.setSec4Mb();
    }
  },
  setSec4Pc: function () {
    var elem = document.querySelector(".sec4");

    if (!elem) {
      return
    }
    var winHeight = $('.sec4').height();

    this.setScene([(new TimelineMax)
      .to(".sec4 .group",2,{opacity:0},"a")
      .to('.sec4 .phone',2,{top:0,bottom:0},"a")
      .to('.sec4 .ptext',2,{top:0,bottom:0},"a")
      .to('.sec4 .ptext',2,{opacity:0},"b")
      .to('.sec4 .phone',2,{scale:"1.5%"},"c")
      .to('.sec4',2,{background:"#D8D8F7"},"b")
      .to('.sec4 .phone',0,{backgroundImage:"url('https://infinixmob.mez100.com.cn/fileadmin/assets/v/smart/smart6plus/images/pc/sec4/nphone.png')"},"b")
  ], {
      triggerElement: ".sec4",
      triggerHook: 0,
      duration: winHeight*3
    }).setPin(".sec4")


  },
  setSec4Mb: function () {
    var elem = document.querySelector(".sec4");

    if (!elem) {
      return
    }
    var winHeight = $('.sec3').height();

    this.setScene([(new TimelineMax)
      .to(".sec4 .group",1,{opacity:0},"a")
      .to('.sec4 .phone',1,{top:0,bottom:"1.5rem"},"a")
      .to('.sec4 .ptext',1,{top:0,bottom:"1.5rem"},"a")
      .to('.sec4 .ptext',1,{opacity:0},"b")
      .to('.sec4 .phone',2,{scale:"1.4%",top:"-.25rem"},"c")
      .to('.sec4',2,{background:"#D8D8F7"},"b")
      // .to('.sec4 .f1',2,{top:"-2.75rem"},"b")
      // .to('.sec4 .f2',2,{top:"2.75rem"},"b")
      .to('.sec4 .phone',0,{backgroundImage:"url('https://infinixmob.mez100.com.cn/fileadmin/assets/v/smart/smart6plus/images/mob/sec4/nphone.png')"},"b")


  ], {
      triggerElement: ".sec4",
      triggerHook: 0,
      duration: winHeight*3
    }).setPin(".sec4")


  },

  setSec6: function () {
    if (utls.isPc) {
      this.setSec6Pc();
    } else {
      // this.setSec6Mb();
    }
  },
  setSec6Pc: function () {
    var elem = document.querySelector(".sec6");

    if (!elem) {
      return
    }
    var winHeight = $('.sec6').height();

    this.setScene([(new TimelineMax)
      .to(".sec6 .left",1,{backgroundPosition: "9rem,0",ease:Sine.easeInOut},"a")
      .to(".sec6 .son",1,{y:"-600",ease:Sine.easeInOut},"a")
      .from(".sec6 .ga",.5,{y:"100",opacity:0,ease:Sine.easeInOut },"b")
      .from(".sec6 .gb",.5,{y:"100",opacity:0,ease:Sine.easeInOut ,delay:.1},"b")


  ], {
      triggerElement: ".sec6 .tirger",
      triggerHook: 0,
    })


  },
  setSec6Mb: function () {
    var elem = document.querySelector(".sec6");

    if (!elem) {
      return
    }
    var winHeight = $('.sec6').height();

    this.setScene([(new TimelineMax)

  ], {
      triggerElement: ".sec6",
      triggerHook: 0,
    }).setPin(".sec6")


  },

  setSec8: function () {
    if (utls.isPc) {
      this.setSec8Pc();
    } else {
      this.setSec8Mb();
    }
  },
  setSec8Pc: function () {
    var elem = document.querySelector(".sec8");

    if (!elem) {
      return
    }
    var winHeight = $('.sec8').height();

    this.setScene([(new TimelineMax)
    .to('.sec8 .add1',1,{width:"25%"},"a")
    .to('.sec8 .add2',1,{width:"30%"},"a")
    .to('.sec8 .add3',1,{width:"100%"},"a")
  ], {
      triggerElement: ".sec8 .tirger",
      triggerHook: 0,
    })


  },
  setSec8Mb: function () {
    var elem = document.querySelector(".sec8");

    if (!elem) {
      return
    }
    var winHeight = $('.sec8').height();


    this.setScene([(new TimelineMax)
    .to('.sec8 .add1',.5,{width:"25%"},"a")
    .to('.sec8 .add2',.5,{width:"30%"},"a")
    .to('.sec8 .add3',.5,{width:"100%"},"a")

  ], {
      triggerElement: ".sec8 .tirger",
      triggerHook: 0,
    })


  },
  setSec13: function () {
    if (utls.isPc) {
      this.setSec13Pc();
    } else {
      this.setSec13Mb();
    }
  },
  setSec13Pc: function () {
    var elem = document.querySelector(".sec13");
    if (!elem) {
      return
    }
    !function changeImg(){
      for(let i = 0; i < $('.sec13 .btn_box .com').length;i++){
        $('.sec13 .btn_box .com').eq(i).click(function(){
          // 改变选择状态
          $('.sec13 .btn_box .com').css('background-size',0)
          $('.sec13 .btn_box .com').eq(i).css('background-size',"contain")
          // 改变图片
          $('.sec13').css('background-image',`url(${imagePath}pc/sec13/f${i+1}${i+1}.png)`)
        })
      }
    }()

    var winHeight = $('.sec13').height();

    this.setScene([(new TimelineMax)

  ], {
      triggerElement: ".sec13",
      triggerHook: 0,
    })
  },
  setSec13Mb: function () {
    var elem = document.querySelector(".sec13");

    if (!elem) {
      return
    }
    !function changeImg(){
      for(let i = 0; i < $('.sec13 .top .cen').length;i++){
        $('.sec13 .top .cen').eq(i).click(function(){
          // 改变选择状态

          $('.sec13 .bottom .com').css('opacity',0)
          $('.sec13 .bottom .com').eq(i).css('opacity',1)

          $('.sec13 .btn-box .same').css('background-size',0)
          $('.sec13 .btn-box .same').eq(i).css('background-size',".175rem .175rem")
          // $('.sec13 .btn_box .cen').eq(i).css('background-size',".125rem .125rem")
          // $('.sec13 .btn_box .com').css('background-size',0)
          // $('.sec13 .btn_box .com').eq(i).css('background-size',"contain")
          // 改变图片
          $('.sec13 .phone').css('background-image',`url(${imagePath}mob/sec13/f${i+1}${i+1}.png)`)
        })
      }
    }()


    var winHeight = $('.sec13').height();

    this.setScene([(new TimelineMax)

  ], {
      triggerElement: ".sec13",
      triggerHook: 0,
    })


  },

  init: function () {
    this.winWidth = window.innerWidth;
    this.controller = new ScrollMagic.Controller();
    // this.pageInit();
    // this.setPart9()
    this.setSec3()
    this.setSec4()
    this.setSec6()
    this.setSec8()
    this.setSec13()
    // this.setSec15()

    this.elLazy = this.lazy();
    this.scroll();
  },
};

$(function () {
  overview.init();
});

