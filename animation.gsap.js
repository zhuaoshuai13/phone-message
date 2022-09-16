/*!
 * ScrollMagic v2.0.6 (2018-10-08)
 * The javascript library for magical scroll interactions.
 * (c) 2018 Jan Paepke (@janpaepke)
 * Project Website: http://scrollmagic.io
 *
 * @version 2.0.6
 * @license Dual licensed under MIT license and GPL.
 * @author Jan Paepke - e-mail@janpaepke.de
 *
 * @file ScrollMagic GSAP Animation Plugin.
 *
 * requires: GSAP ~1.14
 * Powered by the Greensock Animation Platform (GSAP): http://www.greensock.com/js
 * Greensock License info at http://www.greensock.com/licensing/
 */
(function (a, b) {
  if (typeof define === 'function' && define.amd) {
    define(['ScrollMagic', 'TweenMax', 'TimelineMax'], b);
  } else {
    if (typeof exports === 'object') {
      require('gsap');
      b(require('scrollmagic'), TweenMax, TimelineMax);
    } else {
      b(
        a.ScrollMagic || (a.jQuery && a.jQuery.ScrollMagic),
        a.TweenMax || a.TweenLite,
        a.TimelineMax || a.TimelineLite,
      );
    }
  }
})(this, function (e, f, d) {
  var a = 'animation.gsap';
  var b = window.console || {},
    c = Function.prototype.bind.call(b.error || b.log || function () {}, b);
  if (!e) {
    c(
      '(' +
        a +
        ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs.",
    );
  }
  if (!f) {
    c(
      '(' +
        a +
        ') -> ERROR: TweenLite or TweenMax could not be found. Please make sure GSAP is loaded before ScrollMagic or use an asynchronous loader like requirejs.',
    );
  }
  e.Scene.addOption('tweenChanges', false, function (g) {
    return !!g;
  });
  e.Scene.extend(function () {
    var g = this,
      j;
    var h = function () {
      if (g._log) {
        Array.prototype.splice.call(arguments, 1, 0, '(' + a + ')', '->');
        g._log.apply(this, arguments);
      }
    };
    g.on('progress.plugin_gsap', function () {
      i();
    });
    g.on('destroy.plugin_gsap', function (k) {
      g.removeTween(k.reset);
    });
    var i = function () {
      if (j) {
        var k = g.progress(),
          l = g.state();
        if (j.repeat && j.repeat() === -1) {
          if (l === 'DURING' && j.paused()) {
            j.play();
          } else {
            if (l !== 'DURING' && !j.paused()) {
              j.pause();
            }
          }
        } else {
          if (k != j.progress()) {
            if (g.duration() === 0) {
              if (k > 0) {
                j.play();
              } else {
                j.reverse();
              }
            } else {
              if (g.tweenChanges() && j.tweenTo) {
                j.tweenTo(k * j.duration());
              } else {
                j.progress(k).pause();
              }
            }
          }
        }
      }
    };
    g.setTween = function (u, o, n) {
      var l;
      if (arguments.length > 1) {
        if (arguments.length < 3) {
          n = o;
          o = 1;
        }
        u = f.to(u, o, n);
      }
      try {
        if (d) {
          l = new d({ smoothChildTiming: true }).add(u);
        } else {
          l = u;
        }
        l.pause();
      } catch (s) {
        h(1, "ERROR calling method 'setTween()': Supplied argument is not a valid TweenObject");
        return g;
      }
      if (j) {
        g.removeTween();
      }
      j = l;
      if (u.repeat && u.repeat() === -1) {
        j.repeat(-1);
        j.yoyo(u.yoyo());
      }
      if (g.tweenChanges() && !j.tweenTo) {
        h(
          2,
          'WARNING: tweenChanges will only work if the TimelineMax object is available for ScrollMagic.',
        );
      }
      if (j && g.controller() && g.triggerElement() && g.loglevel() >= 2) {
        var k = f.getTweensOf(g.triggerElement()),
          m = g.controller().info('vertical');
        k.forEach(function (y, w) {
          var x = y.vars.css || y.vars,
            z = m
              ? x.top !== undefined || x.bottom !== undefined
              : x.left !== undefined || x.right !== undefined;
          if (z) {
            h(
              2,
              'WARNING: Tweening the position of the trigger element affects the scene timing and should be avoided!',
            );
            return false;
          }
        });
      }
      if (parseFloat(TweenLite.version) >= 1.14) {
        var t = j.getChildren ? j.getChildren(true, true, false) : [j],
          v = function () {
            h(
              2,
              'WARNING: tween was overwritten by another. To learn how to avoid this issue see here: https://github.com/janpaepke/ScrollMagic/wiki/WARNING:-tween-was-overwritten-by-another',
            );
          };
        for (var q = 0, p, r; q < t.length; q++) {
          p = t[q];
          if (r !== v) {
            r = p.vars.onOverwrite;
            p.vars.onOverwrite = function () {
              if (r) {
                r.apply(this, arguments);
              }
              v.apply(this, arguments);
            };
          }
        }
      }
      h(3, 'added tween');
      i();
      return g;
    };
    g.removeTween = function (k) {
      if (j) {
        if (k) {
          j.progress(0).pause();
        }
        j.kill();
        j = undefined;
        h(3, 'removed tween (reset: ' + (k ? 'true' : 'false') + ')');
      }
      return g;
    };
  });
});
