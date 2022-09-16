/*!
 * ScrollMagic v2.0.3 (2015-04-07)
 * The javascript library for magical scroll interactions.
 * (c) 2015 Jan Paepke (@janpaepke)
 * Project Website: http://janpaepke.github.io/ScrollMagic
 *
 * @version 2.0.3
 * @license Dual licensed under MIT license and GPL.
 * @author Jan Paepke - e-mail@janpaepke.de
 *
 * @file ScrollMagic main library.
 */
(function (a, b) {
  if (typeof define === 'function' && define.amd) {
    define(b);
  } else {
    if (typeof exports === 'object') {
      module.exports = b();
    } else {
      a.ScrollMagic = b();
    }
  }
})(this, function () {
  var b = function () {
    e.log(
      2,
      "(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use 'new ScrollMagic.Controller()' to create a new controller instance. Use 'new ScrollMagic.Scene()' to instance a scene.",
    );
  };
  b.version = '2.0.3';
  window.addEventListener('mousewheel', function () {});
  var d = 'data-scrollmagic-pin-spacer';
  b.Controller = function (k) {
    var n = 'ScrollMagic.Controller',
      C = { f: 'FORWARD', r: 'REVERSE', p: 'PAUSED' },
      j = a.defaults;
    var E = this,
      w = e.extend({}, j, k),
      D = [],
      z = false,
      l = 0,
      i = C.p,
      o = true,
      s = 0,
      B = true,
      A,
      v;
    var u = function () {
      for (var F in w) {
        if (!j.hasOwnProperty(F)) {
          p(2, 'WARNING: Unknown option "' + F + '"');
          delete w[F];
        }
      }
      w.container = e.get.elements(w.container)[0];
      if (!w.container) {
        p(1, 'ERROR creating object ' + n + ': No valid scroll container supplied');
        throw n + ' init failed.';
      }
      o =
        w.container === window ||
        w.container === document.body ||
        !document.body.contains(w.container);
      if (o) {
        w.container = window;
      }
      s = t();
      w.container.addEventListener('resize', x);
      w.container.addEventListener('scroll', x);
      w.refreshInterval = parseInt(w.refreshInterval) || j.refreshInterval;
      f();
      p(3, 'added new ' + n + ' controller (v' + b.version + ')');
    };
    var f = function () {
      if (w.refreshInterval > 0) {
        v = window.setTimeout(m, w.refreshInterval);
      }
    };
    var g = function () {
      return w.vertical ? e.get.scrollTop(w.container) : e.get.scrollLeft(w.container);
    };
    var t = function () {
      return w.vertical ? e.get.height(w.container) : e.get.width(w.container);
    };
    var h = (this._setScrollPos = function (F) {
      if (w.vertical) {
        if (o) {
          window.scrollTo(e.get.scrollLeft(), F);
        } else {
          w.container.scrollTop = F;
        }
      } else {
        if (o) {
          window.scrollTo(F, e.get.scrollTop());
        } else {
          w.container.scrollLeft = F;
        }
      }
    });
    var r = function () {
      if (B && z) {
        var F = e.type.Array(z) ? z : D.slice(0);
        z = false;
        var G = l;
        l = E.scrollPos();
        var H = l - G;
        if (H !== 0) {
          i = H > 0 ? C.f : C.r;
        }
        if (i === C.r) {
          F.reverse();
        }
        F.forEach(function (J, I) {
          p(3, 'updating Scene ' + (I + 1) + '/' + F.length + ' (' + D.length + ' total)');
          J.update(true);
        });
        if (F.length === 0 && w.loglevel >= 3) {
          p(3, 'updating 0 Scenes (nothing added to controller)');
        }
      }
    };
    var y = function () {
      A = e.rAF(r);
    };
    var x = function (F) {
      p(3, 'event fired causing an update:', F.type);
      if (F.type == 'resize') {
        s = t();
        i = C.p;
      }
      if (z !== true) {
        z = true;
        y();
      }
    };
    var m = function () {
      if (!o) {
        if (s != t()) {
          var F;
          try {
            F = new Event('resize', { bubbles: false, cancelable: false });
          } catch (G) {
            F = document.createEvent('Event');
            F.initEvent('resize', false, false);
          }
          w.container.dispatchEvent(F);
        }
      }
      D.forEach(function (I, H) {
        I.refresh();
      });
      f();
    };
    var p = (this._log = function (G, F) {
      if (w.loglevel >= G) {
        Array.prototype.splice.call(arguments, 1, 0, '(' + n + ') ->');
        e.log.apply(window, arguments);
      }
    });
    this._options = w;
    var q = function (G) {
      if (G.length <= 1) {
        return G;
      } else {
        var F = G.slice(0);
        F.sort(function (I, H) {
          return I.scrollOffset() > H.scrollOffset() ? 1 : -1;
        });
        return F;
      }
    };
    this.addScene = function (G) {
      if (e.type.Array(G)) {
        G.forEach(function (I, H) {
          E.addScene(I);
        });
      } else {
        if (G instanceof b.Scene) {
          if (G.controller() !== E) {
            G.addTo(E);
          } else {
            if (D.indexOf(G) < 0) {
              D.push(G);
              D = q(D);
              G.on('shift.controller_sort', function () {
                D = q(D);
              });
              for (var F in w.globalSceneOptions) {
                if (G[F]) {
                  G[F].call(G, w.globalSceneOptions[F]);
                }
              }
              p(3, 'adding Scene (now ' + D.length + ' total)');
            }
          }
        } else {
          p(1, "ERROR: invalid argument supplied for '.addScene()'");
        }
      }
      return E;
    };
    this.removeScene = function (G) {
      if (e.type.Array(G)) {
        G.forEach(function (I, H) {
          E.removeScene(I);
        });
      } else {
        var F = D.indexOf(G);
        if (F > -1) {
          G.off('shift.controller_sort');
          D.splice(F, 1);
          p(3, 'removing Scene (now ' + D.length + ' left)');
          G.remove();
        }
      }
      return E;
    };
    this.updateScene = function (G, F) {
      if (e.type.Array(G)) {
        G.forEach(function (I, H) {
          E.updateScene(I, F);
        });
      } else {
        if (F) {
          G.update(true);
        } else {
          if (z !== true && G instanceof b.Scene) {
            z = z || [];
            if (z.indexOf(G) == -1) {
              z.push(G);
            }
            z = q(z);
            y();
          }
        }
      }
      return E;
    };
    this.update = function (F) {
      x({ type: 'resize' });
      if (F) {
        r();
      }
      return E;
    };
    this.scrollTo = function (F, J) {
      if (e.type.Number(F)) {
        h.call(w.container, F, J);
      } else {
        if (F instanceof b.Scene) {
          if (F.controller() === E) {
            E.scrollTo(F.scrollOffset(), J);
          } else {
            p(
              2,
              'scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.',
              F,
            );
          }
        } else {
          if (e.type.Function(F)) {
            h = F;
          } else {
            var I = e.get.elements(F)[0];
            if (I) {
              while (I.parentNode.hasAttribute(d)) {
                I = I.parentNode;
              }
              var K = w.vertical ? 'top' : 'left',
                H = e.get.offset(w.container),
                G = e.get.offset(I);
              if (!o) {
                H[K] -= E.scrollPos();
              }
              E.scrollTo(G[K] - H[K], J);
            } else {
              p(2, 'scrollTo(): The supplied argument is invalid. Scroll cancelled.', F);
            }
          }
        }
      }
      return E;
    };
    this.scrollPos = function (F) {
      if (!arguments.length) {
        return g.call(E);
      } else {
        if (e.type.Function(F)) {
          g = F;
        } else {
          p(
            2,
            "Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'.",
          );
        }
      }
      return E;
    };
    this.info = function (G) {
      var F = {
        size: s,
        vertical: w.vertical,
        scrollPos: l,
        scrollDirection: i,
        container: w.container,
        isDocument: o,
      };
      if (!arguments.length) {
        return F;
      } else {
        if (F[G] !== undefined) {
          return F[G];
        } else {
          p(1, 'ERROR: option "' + G + '" is not available');
          return;
        }
      }
    };
    this.loglevel = function (F) {
      if (!arguments.length) {
        return w.loglevel;
      } else {
        if (w.loglevel != F) {
          w.loglevel = F;
        }
      }
      return E;
    };
    this.enabled = function (F) {
      if (!arguments.length) {
        return B;
      } else {
        if (B != F) {
          B = !!F;
          E.updateScene(D, true);
        }
      }
      return E;
    };
    this.destroy = function (F) {
      window.clearTimeout(v);
      var G = D.length;
      while (G--) {
        D[G].destroy(F);
      }
      w.container.removeEventListener('resize', x);
      w.container.removeEventListener('scroll', x);
      e.cAF(A);
      p(3, 'destroyed ' + n + ' (reset: ' + (F ? 'true' : 'false') + ')');
      return null;
    };
    u();
    return E;
  };
  var a = {
    defaults: {
      container: window,
      vertical: true,
      globalSceneOptions: {},
      loglevel: 2,
      refreshInterval: 100,
    },
  };
  b.Controller.addOption = function (g, f) {
    a.defaults[g] = f;
  };
  b.Controller.extend = function (g) {
    var f = this;
    b.Controller = function () {
      f.apply(this, arguments);
      this.$super = e.extend({}, this);
      return g.apply(this, arguments) || this;
    };
    e.extend(b.Controller, f);
    b.Controller.prototype = f.prototype;
    b.Controller.prototype.constructor = b.Controller;
  };
  b.Scene = function (o) {
    var p = 'ScrollMagic.Scene',
      l = c.defaults;
    var k = this,
      z = e.extend({}, l, o),
      F = 'BEFORE',
      u = 0,
      I = { start: 0, end: 0 },
      K = 0,
      G = true,
      h,
      t;
    var y = function () {
      for (var M in z) {
        if (!l.hasOwnProperty(M)) {
          r(2, 'WARNING: Unknown option "' + M + '"');
          delete z[M];
        }
      }
      for (var L in l) {
        B(L);
      }
      i();
      k.on('change.internal', function (N) {
        if (N.what !== 'loglevel' && N.what !== 'tweenChanges') {
          if (N.what === 'triggerElement') {
            J();
          } else {
            if (N.what === 'reverse') {
              k.update();
            }
          }
        }
      }).on('shift.internal', function (N) {
        q();
        k.update();
      });
    };
    var r = (this._log = function (M, L) {
      if (z.loglevel >= M) {
        Array.prototype.splice.call(arguments, 1, 0, '(' + p + ') ->');
        e.log.apply(window, arguments);
      }
    });
    this.addTo = function (L) {
      if (!(L instanceof b.Controller)) {
        r(1, "ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller");
      } else {
        if (t != L) {
          if (t) {
            t.removeScene(k);
          }
          t = L;
          i();
          j(true);
          J(true);
          q();
          t.info('container').addEventListener('resize', n);
          L.addScene(k);
          k.trigger('add', { controller: t });
          r(3, 'added ' + p + ' to controller');
          k.update();
        }
      }
      return k;
    };
    this.enabled = function (L) {
      if (!arguments.length) {
        return G;
      } else {
        if (G != L) {
          G = !!L;
          k.update(true);
        }
      }
      return k;
    };
    this.remove = function () {
      if (t) {
        t.info('container').removeEventListener('resize', n);
        var L = t;
        t = undefined;
        L.removeScene(k);
        k.trigger('remove');
        r(3, 'removed ' + p + ' from controller');
      }
      return k;
    };
    this.destroy = function (L) {
      k.trigger('destroy', { reset: L });
      k.remove();
      k.off('*.*');
      r(3, 'destroyed ' + p + ' (reset: ' + (L ? 'true' : 'false') + ')');
      return null;
    };
    this.update = function (L) {
      if (t) {
        if (L) {
          if (t.enabled() && G) {
            var N = t.info('scrollPos'),
              M;
            if (z.duration > 0) {
              M = (N - I.start) / (I.end - I.start);
            } else {
              M = N >= I.start ? 1 : 0;
            }
            k.trigger('update', { startPos: I.start, endPos: I.end, scrollPos: N });
            k.progress(M);
          } else {
            if (v && F === 'DURING') {
              A(true);
            }
          }
        } else {
          t.updateScene(k, false);
        }
      }
      return k;
    };
    this.refresh = function () {
      j();
      J();
      return k;
    };
    this.progress = function (O) {
      if (!arguments.length) {
        return u;
      } else {
        var S = false,
          N = F,
          R = t ? t.info('scrollDirection') : 'PAUSED',
          Q = z.reverse || O >= u;
        if (z.duration === 0) {
          S = u != O;
          u = O < 1 && Q ? 0 : 1;
          F = u === 0 ? 'BEFORE' : 'DURING';
        } else {
          if (O <= 0 && F !== 'BEFORE' && Q) {
            u = 0;
            F = 'BEFORE';
            S = true;
          } else {
            if (O > 0 && O < 1 && Q) {
              u = O;
              F = 'DURING';
              S = true;
            } else {
              if (O >= 1 && F !== 'AFTER') {
                u = 1;
                F = 'AFTER';
                S = true;
              } else {
                if (F === 'DURING' && !Q) {
                  A();
                }
              }
            }
          }
        }
        if (S) {
          var P = { progress: u, state: F, scrollDirection: R },
            M = F != N;
          var L = function (T) {
            k.trigger(T, P);
          };
          if (M) {
            if (N !== 'DURING') {
              L('enter');
              L(N === 'BEFORE' ? 'start' : 'end');
            }
          }
          L('progress');
          if (M) {
            if (F !== 'DURING') {
              L(F === 'BEFORE' ? 'start' : 'end');
              L('leave');
            }
          }
        }
        return k;
      }
    };
    var q = function () {
      I = { start: K + z.offset };
      if (t && z.triggerElement) {
        I.start -= t.info('size') * z.triggerHook;
      }
      I.end = I.start + z.duration;
    };
    var j = function (M) {
      if (h) {
        var L = 'duration';
        if (g(L, h.call(k)) && !M) {
          k.trigger('change', { what: L, newval: z[L] });
          k.trigger('shift', { reason: L });
        }
      }
    };
    var J = function (P) {
      var N = 0,
        S = z.triggerElement;
      if (t && S) {
        var L = t.info(),
          O = e.get.offset(L.container),
          R = L.vertical ? 'top' : 'left';
        while (S.parentNode.hasAttribute(d)) {
          S = S.parentNode;
        }
        var M = e.get.offset(S);
        if (!L.isDocument) {
          O[R] -= t.scrollPos();
        }
        N = M[R] - O[R];
      }
      var Q = N != K;
      K = N;
      if (Q && !P) {
        k.trigger('shift', { reason: 'triggerElementPosition' });
      }
    };
    var n = function (L) {
      if (z.triggerHook > 0) {
        k.trigger('shift', { reason: 'containerResize' });
      }
    };
    var C = e.extend(c.validate, {
      duration: function (N) {
        if (e.type.String(N) && N.match(/^(\.|\d)*\d+%$/)) {
          var L = parseFloat(N) / 100;
          N = function () {
            return t ? t.info('size') * L : 0;
          };
        }
        if (e.type.Function(N)) {
          h = N;
          try {
            N = parseFloat(h());
          } catch (M) {
            N = -1;
          }
        }
        N = parseFloat(N);
        if (!e.type.Number(N) || N < 0) {
          if (h) {
            h = undefined;
            throw ['Invalid return value of supplied function for option "duration":', N];
          } else {
            throw ['Invalid value for option "duration":', N];
          }
        }
        return N;
      },
    });
    var i = function (L) {
      L = arguments.length ? [L] : Object.keys(C);
      L.forEach(function (O, N) {
        var P;
        if (C[O]) {
          try {
            P = C[O](z[O]);
          } catch (Q) {
            P = l[O];
            var M = e.type.String(Q) ? [Q] : Q;
            if (e.type.Array(M)) {
              M[0] = 'ERROR: ' + M[0];
              M.unshift(1);
              r.apply(this, M);
            } else {
              r(
                1,
                "ERROR: Problem executing validation callback for option '" + O + "':",
                Q.message,
              );
            }
          } finally {
            z[O] = P;
          }
        }
      });
    };
    var g = function (L, N) {
      var O = false,
        M = z[L];
      if (z[L] != N) {
        z[L] = N;
        i(L);
        O = M != z[L];
      }
      return O;
    };
    var B = function (L) {
      if (!k[L]) {
        k[L] = function (M) {
          if (!arguments.length) {
            return z[L];
          } else {
            if (L === 'duration') {
              h = undefined;
            }
            if (g(L, M)) {
              k.trigger('change', { what: L, newval: z[L] });
              if (c.shifts.indexOf(L) > -1) {
                k.trigger('shift', { reason: L });
              }
            }
          }
          return k;
        };
      }
    };
    this.controller = function () {
      return t;
    };
    this.state = function () {
      return F;
    };
    this.scrollOffset = function () {
      return I.start;
    };
    this.triggerPosition = function () {
      var L = z.offset;
      if (t) {
        if (z.triggerElement) {
          L += K;
        } else {
          L += t.info('size') * k.triggerHook();
        }
      }
      return L;
    };
    var f = {};
    this.on = function (L, M) {
      if (e.type.Function(M)) {
        L = L.trim().split(' ');
        L.forEach(function (N) {
          var Q = N.split('.'),
            P = Q[0],
            O = Q[1];
          if (P != '*') {
            if (!f[P]) {
              f[P] = [];
            }
            f[P].push({ namespace: O || '', callback: M });
          }
        });
      } else {
        r(
          1,
          "ERROR when calling '.on()': Supplied callback for '" + L + "' is not a valid function!",
        );
      }
      return k;
    };
    this.off = function (L, M) {
      if (!L) {
        r(1, 'ERROR: Invalid event name supplied.');
        return k;
      }
      L = L.trim().split(' ');
      L.forEach(function (N, O) {
        var R = N.split('.'),
          Q = R[0],
          P = R[1] || '',
          S = Q === '*' ? Object.keys(f) : [Q];
        S.forEach(function (T) {
          var W = f[T] || [],
            U = W.length;
          while (U--) {
            var V = W[U];
            if (V && (P === V.namespace || P === '*') && (!M || M == V.callback)) {
              W.splice(U, 1);
            }
          }
          if (!W.length) {
            delete f[T];
          }
        });
      });
      return k;
    };
    this.trigger = function (L, Q) {
      if (L) {
        var P = L.trim().split('.'),
          O = P[0],
          N = P[1],
          M = f[O];
        r(3, 'event fired:', O, Q ? '->' : '', Q || '');
        if (M) {
          M.forEach(function (S, R) {
            if (!N || N === S.namespace) {
              S.callback.call(k, new b.Event(O, S.namespace, k, Q));
            }
          });
        }
      } else {
        r(1, 'ERROR: Invalid event name supplied.');
      }
      return k;
    };
    var v, H;
    k.on('shift.internal', function (M) {
      var L = M.reason === 'duration';
      if ((F === 'AFTER' && L) || (F === 'DURING' && z.duration === 0)) {
        A();
      }
      if (L) {
        x();
      }
    })
      .on('progress.internal', function (L) {
        A();
      })
      .on('add.internal', function (L) {
        x();
      })
      .on('destroy.internal', function (L) {
        k.removePin(L.reset);
      });
    var A = function (Q) {
      if (v && t) {
        var N = t.info();
        if (!Q && F === 'DURING') {
          if (e.css(v, 'position') != 'fixed') {
            e.css(v, { position: 'fixed' });
            x();
          }
          var M = e.get.offset(H.spacer, true),
            L =
              z.reverse || z.duration === 0
                ? N.scrollPos - I.start
                : Math.round(u * z.duration * 10) / 10;
          M[N.vertical ? 'top' : 'left'] += L;
          e.css(v, { top: M.top, left: M.left });
        } else {
          var P = { position: H.inFlow ? 'relative' : 'absolute', top: 0, left: 0 },
            O = e.css(v, 'position') != P.position;
          if (!H.pushFollowers) {
            P[N.vertical ? 'top' : 'left'] = z.duration * u;
          } else {
            if (z.duration > 0) {
              if (F === 'AFTER' && parseFloat(e.css(H.spacer, 'padding-top')) === 0) {
                O = true;
              } else {
                if (F === 'BEFORE' && parseFloat(e.css(H.spacer, 'padding-bottom')) === 0) {
                  O = true;
                }
              }
            }
          }
          e.css(v, P);
          if (O) {
            x();
          }
        }
      }
    };
    var x = function () {
      if (v && t && H.inFlow) {
        var Q = F === 'AFTER',
          P = F === 'BEFORE',
          M = F === 'DURING',
          L = t.info('vertical'),
          R = H.spacer.children[0],
          O = e.isMarginCollapseType(e.css(H.spacer, 'display')),
          N = {};
        if (H.relSize.width || H.relSize.autoFullWidth) {
          if (M) {
            e.css(v, { width: e.get.width(H.spacer) });
          } else {
            e.css(v, { width: '100%' });
          }
        } else {
          N['min-width'] = e.get.width(L ? v : R, true, true);
          N.width = M ? N['min-width'] : 'auto';
        }
        if (H.relSize.height) {
          if (M) {
            e.css(v, { height: e.get.height(H.spacer) - (H.pushFollowers ? z.duration : 0) });
          } else {
            e.css(v, { height: '100%' });
          }
        } else {
          N['min-height'] = e.get.height(L ? R : v, true, !O);
          N.height = M ? N['min-height'] : 'auto';
        }
        if (H.pushFollowers) {
          N['padding' + (L ? 'Top' : 'Left')] = z.duration * u;
          N['padding' + (L ? 'Bottom' : 'Right')] = z.duration * (1 - u);
        }
        e.css(H.spacer, N);
      }
    };
    var D = function () {
      if (t && v && F === 'DURING' && !t.info('isDocument')) {
        A();
      }
    };
    var E = function () {
      if (
        t &&
        v &&
        F === 'DURING' &&
        (((H.relSize.width || H.relSize.autoFullWidth) &&
          e.get.width(window) != e.get.width(H.spacer.parentNode)) ||
          (H.relSize.height && e.get.height(window) != e.get.height(H.spacer.parentNode)))
      ) {
        x();
      }
    };
    var s = function (L) {
      if (t && v && F === 'DURING' && !t.info('isDocument')) {
        L.preventDefault();
        t._setScrollPos(
          t.info('scrollPos') -
            ((L.wheelDelta || L[t.info('vertical') ? 'wheelDeltaY' : 'wheelDeltaX']) / 3 ||
              -L.detail * 30),
        );
      }
    };
    this.setPin = function (R, O) {
      var S = { pushFollowers: true, spacerClass: 'scrollmagic-pin-spacer' };
      O = e.extend({}, S, O);
      R = e.get.elements(R)[0];
      if (!R) {
        r(1, "ERROR calling method 'setPin()': Invalid pin element supplied.");
        return k;
      } else {
        if (e.css(R, 'position') === 'fixed') {
          r(
            1,
            "ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'.",
          );
          return k;
        }
      }
      if (v) {
        if (v === R) {
          return k;
        } else {
          k.removePin();
        }
      }
      v = R;
      var Q = v.parentNode.style.display,
        N = [
          'top',
          'left',
          'bottom',
          'right',
          'margin',
          'marginLeft',
          'marginRight',
          'marginTop',
          'marginBottom',
        ];
      v.parentNode.style.display = 'none';
      var L = e.css(v, 'position') != 'absolute',
        U = e.css(v, N.concat(['display'])),
        V = e.css(v, ['width', 'height']);
      v.parentNode.style.display = Q;
      if (!L && O.pushFollowers) {
        r(
          2,
          'WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled.',
        );
        O.pushFollowers = false;
      }
      window.setTimeout(function () {
        if (v && z.duration === 0 && O.pushFollowers) {
          r(2, 'WARNING: pushFollowers =', true, 'has no effect, when scene duration is 0.');
        }
      }, 0);
      var W = v.parentNode.insertBefore(document.createElement('div'), v),
        M = e.extend(U, {
          position: L ? 'relative' : 'absolute',
          boxSizing: 'content-box',
          mozBoxSizing: 'content-box',
          webkitBoxSizing: 'content-box',
        });
      if (!L) {
        e.extend(M, e.css(v, ['width', 'height']));
      }
      e.css(W, M);
      W.setAttribute(d, '');
      e.addClass(W, O.spacerClass);
      H = {
        spacer: W,
        relSize: {
          width: V.width.slice(-1) === '%',
          height: V.height.slice(-1) === '%',
          autoFullWidth: V.width === 'auto' && L && e.isMarginCollapseType(U.display),
        },
        pushFollowers: O.pushFollowers,
        inFlow: L,
      };
      if (!v.___origStyle) {
        v.___origStyle = {};
        var T = v.style,
          P = N.concat([
            'width',
            'height',
            'position',
            'boxSizing',
            'mozBoxSizing',
            'webkitBoxSizing',
          ]);
        P.forEach(function (X) {
          v.___origStyle[X] = T[X] || '';
        });
      }
      if (H.relSize.width) {
        e.css(W, { width: V.width });
      }
      if (H.relSize.height) {
        e.css(W, { height: V.height });
      }
      W.appendChild(v);
      e.css(v, {
        position: L ? 'relative' : 'absolute',
        margin: 'auto',
        top: 'auto',
        left: 'auto',
        bottom: 'auto',
        right: 'auto',
      });
      if (H.relSize.width || H.relSize.autoFullWidth) {
        e.css(v, {
          boxSizing: 'border-box',
          mozBoxSizing: 'border-box',
          webkitBoxSizing: 'border-box',
        });
      }
      window.addEventListener('scroll', D);
      window.addEventListener('resize', D);
      window.addEventListener('resize', E);
      v.addEventListener('mousewheel', s);
      v.addEventListener('DOMMouseScroll', s);
      r(3, 'added pin');
      A();
      return k;
    };
    this.removePin = function (N) {
      if (v) {
        if (F === 'DURING') {
          A(true);
        }
        if (N || !t) {
          var O = H.spacer.children[0];
          if (O.hasAttribute(d)) {
            var M = H.spacer.style,
              L = ['margin', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom'];
            margins = {};
            L.forEach(function (P) {
              margins[P] = M[P] || '';
            });
            e.css(O, margins);
          }
          H.spacer.parentNode.insertBefore(O, H.spacer);
          H.spacer.parentNode.removeChild(H.spacer);
          if (!v.parentNode.hasAttribute(d)) {
            e.css(v, v.___origStyle);
            delete v.___origStyle;
          }
        }
        window.removeEventListener('scroll', D);
        window.removeEventListener('resize', D);
        window.removeEventListener('resize', E);
        v.removeEventListener('mousewheel', s);
        v.removeEventListener('DOMMouseScroll', s);
        v = undefined;
        r(3, 'removed pin (reset: ' + (N ? 'true' : 'false') + ')');
      }
      return k;
    };
    var w,
      m = [];
    k.on('destroy.internal', function (L) {
      k.removeClassToggle(L.reset);
    });
    this.setClassToggle = function (N, M) {
      var L = e.get.elements(N);
      if (L.length === 0 || !e.type.String(M)) {
        r(
          1,
          "ERROR calling method 'setClassToggle()': Invalid " +
            (L.length === 0 ? 'element' : 'classes') +
            ' supplied.',
        );
        return k;
      }
      if (m.length > 0) {
        k.removeClassToggle();
      }
      w = M;
      m = L;
      k.on('enter.internal_class leave.internal_class', function (P) {
        var O = P.type === 'enter' ? e.addClass : e.removeClass;
        m.forEach(function (R, Q) {
          O(R, w);
        });
      });
      return k;
    };
    this.removeClassToggle = function (L) {
      if (L) {
        m.forEach(function (N, M) {
          e.removeClass(N, w);
        });
      }
      k.off('start.internal_class end.internal_class');
      w = undefined;
      m = [];
      return k;
    };
    y();
    return k;
  };
  var c = {
    defaults: {
      duration: 0,
      offset: 0,
      triggerElement: undefined,
      triggerHook: 0.5,
      reverse: true,
      loglevel: 2,
    },
    validate: {
      offset: function (f) {
        f = parseFloat(f);
        if (!e.type.Number(f)) {
          throw ['Invalid value for option "offset":', f];
        }
        return f;
      },
      triggerElement: function (g) {
        g = g || undefined;
        if (g) {
          var f = e.get.elements(g)[0];
          if (f) {
            g = f;
          } else {
            throw ['Element defined in option "triggerElement" was not found:', g];
          }
        }
        return g;
      },
      triggerHook: function (g) {
        var f = { onCenter: 0.5, onEnter: 1, onLeave: 0 };
        if (e.type.Number(g)) {
          g = Math.max(0, Math.min(parseFloat(g), 1));
        } else {
          if (g in f) {
            g = f[g];
          } else {
            throw ['Invalid value for option "triggerHook": ', g];
          }
        }
        return g;
      },
      reverse: function (f) {
        return !!f;
      },
      loglevel: function (f) {
        f = parseInt(f);
        if (!e.type.Number(f) || f < 0 || f > 3) {
          throw ['Invalid value for option "loglevel":', f];
        }
        return f;
      },
    },
    shifts: ['duration', 'offset', 'triggerHook'],
  };
  b.Scene.addOption = function (i, g, f, h) {
    if (!(i in c.defaults)) {
      c.defaults[i] = g;
      c.validate[i] = f;
      if (h) {
        c.shifts.push(i);
      }
    } else {
      b._util.log(
        1,
        "[static] ScrollMagic.Scene -> Cannot add Scene option '" +
          i +
          "', because it already exists.",
      );
    }
  };
  b.Scene.extend = function (g) {
    var f = this;
    b.Scene = function () {
      f.apply(this, arguments);
      this.$super = e.extend({}, this);
      return g.apply(this, arguments) || this;
    };
    e.extend(b.Scene, f);
    b.Scene.prototype = f.prototype;
    b.Scene.prototype.constructor = b.Scene;
  };
  b.Event = function (h, g, j, i) {
    i = i || {};
    for (var f in i) {
      this[f] = i[f];
    }
    this.type = h;
    this.target = this.currentTarget = j;
    this.namespace = g || '';
    this.timeStamp = this.timestamp = Date.now();
    return this;
  };
  var e = (b._util = (function (q) {
    var j = {},
      o;
    var u = function (i) {
      return parseFloat(i) || 0;
    };
    var s = function (i) {
      return i.currentStyle ? i.currentStyle : q.getComputedStyle(i);
    };
    var k = function (A, y, w, i) {
      y = y === document ? q : y;
      if (y === q) {
        i = false;
      } else {
        if (!n.DomElement(y)) {
          return 0;
        }
      }
      A = A.charAt(0).toUpperCase() + A.substr(1).toLowerCase();
      var z = (w ? y['offset' + A] || y['outer' + A] : y['client' + A] || y['inner' + A]) || 0;
      if (w && i) {
        var x = s(y);
        z +=
          A === 'Height' ? u(x.marginTop) + u(x.marginBottom) : u(x.marginLeft) + u(x.marginRight);
      }
      return z;
    };
    var p = function (i) {
      return i.replace(/^[^a-z]+([a-z])/g, '$1').replace(/-([a-z])/g, function (w) {
        return w[1].toUpperCase();
      });
    };
    j.extend = function (w) {
      w = w || {};
      for (o = 1; o < arguments.length; o++) {
        if (!arguments[o]) {
          continue;
        }
        for (var i in arguments[o]) {
          if (arguments[o].hasOwnProperty(i)) {
            w[i] = arguments[o][i];
          }
        }
      }
      return w;
    };
    j.isMarginCollapseType = function (i) {
      return ['block', 'flex', 'list-item', 'table', '-webkit-box'].indexOf(i) > -1;
    };
    var g = 0,
      v = ['ms', 'moz', 'webkit', 'o'];
    var h = q.requestAnimationFrame;
    var t = q.cancelAnimationFrame;
    for (o = 0; !h && o < v.length; ++o) {
      h = q[v[o] + 'RequestAnimationFrame'];
      t = q[v[o] + 'CancelAnimationFrame'] || q[v[o] + 'CancelRequestAnimationFrame'];
    }
    if (!h) {
      h = function (y) {
        var i = new Date().getTime(),
          w = Math.max(0, 16 - (i - g)),
          x = q.setTimeout(function () {
            y(i + w);
          }, w);
        g = i + w;
        return x;
      };
    }
    if (!t) {
      t = function (i) {
        q.clearTimeout(i);
      };
    }
    j.rAF = h.bind(q);
    j.cAF = t.bind(q);
    var r = ['error', 'warn', 'log'],
      l = q.console || {};
    l.log = l.log || function () {};
    for (o = 0; o < r.length; o++) {
      var f = r[o];
      if (!l[f]) {
        l[f] = l.log;
      }
    }
    j.log = function (x) {
      if (x > r.length || x <= 0) {
        x = r.length;
      }
      var w = new Date(),
        z =
          ('0' + w.getHours()).slice(-2) +
          ':' +
          ('0' + w.getMinutes()).slice(-2) +
          ':' +
          ('0' + w.getSeconds()).slice(-2) +
          ':' +
          ('00' + w.getMilliseconds()).slice(-3),
        A = r[x - 1],
        i = Array.prototype.splice.call(arguments, 1),
        y = Function.prototype.bind.call(l[A], l);
      i.unshift(z);
      y.apply(l, i);
    };
    var n = (j.type = function (i) {
      return Object.prototype.toString
        .call(i)
        .replace(/^\[object (.+)\]$/, '$1')
        .toLowerCase();
    });
    n.String = function (i) {
      return n(i) === 'string';
    };
    n.Function = function (i) {
      return n(i) === 'function';
    };
    n.Array = function (i) {
      return Array.isArray(i);
    };
    n.Number = function (i) {
      return !n.Array(i) && i - parseFloat(i) + 1 >= 0;
    };
    n.DomElement = function (i) {
      return typeof HTMLElement === 'object'
        ? i instanceof HTMLElement
        : i &&
            typeof i === 'object' &&
            i !== null &&
            i.nodeType === 1 &&
            typeof i.nodeName === 'string';
    };
    var m = (j.get = {});
    m.elements = function (x) {
      var w = [];
      if (n.String(x)) {
        try {
          x = document.querySelectorAll(x);
        } catch (B) {
          return w;
        }
      }
      if (n(x) === 'nodelist' || n.Array(x)) {
        for (var y = 0, A = (w.length = x.length); y < A; y++) {
          var z = x[y];
          w[y] = n.DomElement(z) ? z : m.elements(z);
        }
      } else {
        if (n.DomElement(x) || x === document || x === q) {
          w = [x];
        }
      }
      return w;
    };
    m.scrollTop = function (i) {
      return i && typeof i.scrollTop === 'number' ? i.scrollTop : q.pageYOffset || 0;
    };
    m.scrollLeft = function (i) {
      return i && typeof i.scrollLeft === 'number' ? i.scrollLeft : q.pageXOffset || 0;
    };
    m.width = function (x, w, i) {
      return k('width', x, w, i);
    };
    m.height = function (x, w, i) {
      return k('height', x, w, i);
    };
    m.offset = function (x, i) {
      var y = { top: 0, left: 0 };
      if (x && x.getBoundingClientRect) {
        var w = x.getBoundingClientRect();
        y.top = w.top;
        y.left = w.left;
        if (!i) {
          y.top += m.scrollTop();
          y.left += m.scrollLeft();
        }
      }
      return y;
    };
    j.addClass = function (i, w) {
      if (w) {
        if (i.classList) {
          i.classList.add(w);
        } else {
          i.className += ' ' + w;
        }
      }
    };
    j.removeClass = function (i, w) {
      if (w) {
        if (i.classList) {
          i.classList.remove(w);
        } else {
          i.className = i.className.replace(
            new RegExp('(^|\\b)' + w.split(' ').join('|') + '(\\b|$)', 'gi'),
            ' ',
          );
        }
      }
    };
    j.css = function (y, i) {
      if (n.String(i)) {
        return s(y)[p(i)];
      } else {
        if (n.Array(i)) {
          var z = {},
            x = s(y);
          i.forEach(function (C, B) {
            z[C] = x[p(C)];
          });
          return z;
        } else {
          for (var w in i) {
            var A = i[w];
            if (A == parseFloat(A)) {
              A += 'px';
            }
            y.style[p(w)] = A;
          }
        }
      }
    };
    return j;
  })(window || {}));
  b.Scene.prototype.addIndicators = function () {
    b._util.log(
      1,
      "(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js",
    );
    return this;
  };
  b.Scene.prototype.removeIndicators = function () {
    b._util.log(
      1,
      "(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin 'debug.addIndicators'. Please make sure to include plugins/debug.addIndicators.js",
    );
    return this;
  };
  b.Scene.prototype.setTween = function () {
    b._util.log(
      1,
      "(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js",
    );
    return this;
  };
  b.Scene.prototype.removeTween = function () {
    b._util.log(
      1,
      "(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin 'animation.gsap'. Please make sure to include plugins/animation.gsap.js",
    );
    return this;
  };
  b.Scene.prototype.setVelocity = function () {
    b._util.log(
      1,
      "(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js",
    );
    return this;
  };
  b.Scene.prototype.removeVelocity = function () {
    b._util.log(
      1,
      "(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin 'animation.velocity'. Please make sure to include plugins/animation.velocity.js",
    );
    return this;
  };
  return b;
});
