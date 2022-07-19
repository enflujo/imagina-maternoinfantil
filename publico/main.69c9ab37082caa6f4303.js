!(function () {
  var e = {
      757: function (e, t, i) {
        e.exports = i(666);
      },
      727: function (e) {
        e.exports = (function () {
          'use strict';
          function e(t) {
            return (e =
              'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                      ? 'symbol'
                      : typeof e;
                  })(t);
          }
          function t(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          }
          function i(e, t) {
            for (var i = 0; i < t.length; i++) {
              var n = t[i];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                'value' in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          function n(e, t, n) {
            return t && i(e.prototype, t), n && i(e, n), e;
          }
          var s = Date.now();
          function r() {
            var e = {},
              t = !0,
              i = 0,
              n = arguments.length;
            '[object Boolean]' === Object.prototype.toString.call(arguments[0]) && ((t = arguments[0]), i++);
            for (
              var s = function (i) {
                for (var n in i)
                  Object.prototype.hasOwnProperty.call(i, n) &&
                    (t && '[object Object]' === Object.prototype.toString.call(i[n])
                      ? (e[n] = r(!0, e[n], i[n]))
                      : (e[n] = i[n]));
              };
              i < n;
              i++
            )
              s(arguments[i]);
            return e;
          }
          function o(e, t) {
            if (((k(e) || e === window || e === document) && (e = [e]), A(e) || L(e) || (e = [e]), 0 != O(e)))
              if (A(e) && !L(e)) for (var i = e.length, n = 0; n < i && !1 !== t.call(e[n], e[n], n, e); n++);
              else if (L(e)) for (var s in e) if (M(e, s) && !1 === t.call(e[s], e[s], s, e)) break;
          }
          function a(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
              i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
              n = (e[s] = e[s] || []),
              r = { all: n, evt: null, found: null };
            return (
              t &&
                i &&
                O(n) > 0 &&
                o(n, function (e, n) {
                  if (e.eventName == t && e.fn.toString() == i.toString()) return (r.found = !0), (r.evt = n), !1;
                }),
              r
            );
          }
          function l(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              i = t.onElement,
              n = t.withCallback,
              s = t.avoidDuplicate,
              r = void 0 === s || s,
              l = t.once,
              c = void 0 !== l && l,
              d = t.useCapture,
              h = void 0 !== d && d,
              u = arguments.length > 2 ? arguments[2] : void 0,
              g = i || [];
            function f(e) {
              T(n) && n.call(u, e, this), c && f.destroy();
            }
            return (
              E(g) && (g = document.querySelectorAll(g)),
              (f.destroy = function () {
                o(g, function (t) {
                  var i = a(t, e, f);
                  i.found && i.all.splice(i.evt, 1), t.removeEventListener && t.removeEventListener(e, f, h);
                });
              }),
              o(g, function (t) {
                var i = a(t, e, f);
                ((t.addEventListener && r && !i.found) || !r) &&
                  (t.addEventListener(e, f, h), i.all.push({ eventName: e, fn: f }));
              }),
              f
            );
          }
          function c(e, t) {
            o(t.split(' '), function (t) {
              return e.classList.add(t);
            });
          }
          function d(e, t) {
            o(t.split(' '), function (t) {
              return e.classList.remove(t);
            });
          }
          function h(e, t) {
            return e.classList.contains(t);
          }
          function u(e, t) {
            for (; e !== document.body; ) {
              if (!(e = e.parentElement)) return !1;
              if ('function' == typeof e.matches ? e.matches(t) : e.msMatchesSelector(t)) return e;
            }
          }
          function g(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '',
              i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            if (!e || '' === t) return !1;
            if ('none' === t) return T(i) && i(), !1;
            var n = b(),
              s = t.split(' ');
            o(s, function (t) {
              c(e, 'g' + t);
            }),
              l(n, {
                onElement: e,
                avoidDuplicate: !1,
                once: !0,
                withCallback: function (e, t) {
                  o(s, function (e) {
                    d(t, 'g' + e);
                  }),
                    T(i) && i();
                },
              });
          }
          function f(e) {
            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : '';
            if ('' === t)
              return (
                (e.style.webkitTransform = ''),
                (e.style.MozTransform = ''),
                (e.style.msTransform = ''),
                (e.style.OTransform = ''),
                (e.style.transform = ''),
                !1
              );
            (e.style.webkitTransform = t),
              (e.style.MozTransform = t),
              (e.style.msTransform = t),
              (e.style.OTransform = t),
              (e.style.transform = t);
          }
          function p(e) {
            e.style.display = 'block';
          }
          function v(e) {
            e.style.display = 'none';
          }
          function m(e) {
            var t = document.createDocumentFragment(),
              i = document.createElement('div');
            for (i.innerHTML = e; i.firstChild; ) t.appendChild(i.firstChild);
            return t;
          }
          function y() {
            return {
              width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
              height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
            };
          }
          function b() {
            var e,
              t = document.createElement('fakeelement'),
              i = {
                animation: 'animationend',
                OAnimation: 'oAnimationEnd',
                MozAnimation: 'animationend',
                WebkitAnimation: 'webkitAnimationEnd',
              };
            for (e in i) if (void 0 !== t.style[e]) return i[e];
          }
          function x(e, t, i, n) {
            if (e()) t();
            else {
              var s;
              i || (i = 100);
              var r = setInterval(function () {
                e() && (clearInterval(r), s && clearTimeout(s), t());
              }, i);
              n &&
                (s = setTimeout(function () {
                  clearInterval(r);
                }, n));
            }
          }
          function w(e, t, i) {
            if (I(e)) console.error('Inject assets error');
            else if ((T(t) && ((i = t), (t = !1)), E(t) && t in window)) T(i) && i();
            else {
              var n;
              if (-1 !== e.indexOf('.css')) {
                if ((n = document.querySelectorAll('link[href="' + e + '"]')) && n.length > 0)
                  return void (T(i) && i());
                var s = document.getElementsByTagName('head')[0],
                  r = s.querySelectorAll('link[rel="stylesheet"]'),
                  o = document.createElement('link');
                return (
                  (o.rel = 'stylesheet'),
                  (o.type = 'text/css'),
                  (o.href = e),
                  (o.media = 'all'),
                  r ? s.insertBefore(o, r[0]) : s.appendChild(o),
                  void (T(i) && i())
                );
              }
              if ((n = document.querySelectorAll('script[src="' + e + '"]')) && n.length > 0) {
                if (T(i)) {
                  if (E(t))
                    return (
                      x(
                        function () {
                          return void 0 !== window[t];
                        },
                        function () {
                          i();
                        }
                      ),
                      !1
                    );
                  i();
                }
              } else {
                var a = document.createElement('script');
                (a.type = 'text/javascript'),
                  (a.src = e),
                  (a.onload = function () {
                    if (T(i)) {
                      if (E(t))
                        return (
                          x(
                            function () {
                              return void 0 !== window[t];
                            },
                            function () {
                              i();
                            }
                          ),
                          !1
                        );
                      i();
                    }
                  }),
                  document.body.appendChild(a);
              }
            }
          }
          function S() {
            return (
              'navigator' in window &&
              window.navigator.userAgent.match(
                /(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i
              )
            );
          }
          function T(e) {
            return 'function' == typeof e;
          }
          function E(e) {
            return 'string' == typeof e;
          }
          function k(e) {
            return !(!e || !e.nodeType || 1 != e.nodeType);
          }
          function C(e) {
            return Array.isArray(e);
          }
          function A(e) {
            return e && e.length && isFinite(e.length);
          }
          function L(t) {
            return 'object' === e(t) && null != t && !T(t) && !C(t);
          }
          function I(e) {
            return null == e;
          }
          function M(e, t) {
            return null !== e && hasOwnProperty.call(e, t);
          }
          function O(e) {
            if (L(e)) {
              if (e.keys) return e.keys().length;
              var t = 0;
              for (var i in e) M(e, i) && t++;
              return t;
            }
            return e.length;
          }
          function P(e) {
            return !isNaN(parseFloat(e)) && isFinite(e);
          }
          function N() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1,
              t = document.querySelectorAll('.gbtn[data-taborder]:not(.disabled)');
            if (!t.length) return !1;
            if (1 == t.length) return t[0];
            'string' == typeof e && (e = parseInt(e));
            var i = [];
            o(t, function (e) {
              i.push(e.getAttribute('data-taborder'));
            });
            var n = Math.max.apply(
                Math,
                i.map(function (e) {
                  return parseInt(e);
                })
              ),
              s = e < 0 ? 1 : e + 1;
            s > n && (s = '1');
            var r = i.filter(function (e) {
                return e >= parseInt(s);
              }),
              a = r.sort()[0];
            return document.querySelector('.gbtn[data-taborder="'.concat(a, '"]'));
          }
          function z(e) {
            if (e.events.hasOwnProperty('keyboard')) return !1;
            e.events.keyboard = l('keydown', {
              onElement: window,
              withCallback: function (t, i) {
                var n = (t = t || window.event).keyCode;
                if (9 == n) {
                  var s = document.querySelector('.gbtn.focused');
                  if (!s) {
                    var r =
                      !(!document.activeElement || !document.activeElement.nodeName) &&
                      document.activeElement.nodeName.toLocaleLowerCase();
                    if ('input' == r || 'textarea' == r || 'button' == r) return;
                  }
                  t.preventDefault();
                  var o = document.querySelectorAll('.gbtn[data-taborder]');
                  if (!o || o.length <= 0) return;
                  if (!s) {
                    var a = N();
                    return void (a && (a.focus(), c(a, 'focused')));
                  }
                  var l = N(s.getAttribute('data-taborder'));
                  d(s, 'focused'), l && (l.focus(), c(l, 'focused'));
                }
                39 == n && e.nextSlide(), 37 == n && e.prevSlide(), 27 == n && e.close();
              },
            });
          }
          function j(e) {
            return Math.sqrt(e.x * e.x + e.y * e.y);
          }
          var X = (function () {
            function e(i) {
              t(this, e), (this.handlers = []), (this.el = i);
            }
            return (
              n(e, [
                {
                  key: 'add',
                  value: function (e) {
                    this.handlers.push(e);
                  },
                },
                {
                  key: 'del',
                  value: function (e) {
                    e || (this.handlers = []);
                    for (var t = this.handlers.length; t >= 0; t--)
                      this.handlers[t] === e && this.handlers.splice(t, 1);
                  },
                },
                {
                  key: 'dispatch',
                  value: function () {
                    for (var e = 0, t = this.handlers.length; e < t; e++) {
                      var i = this.handlers[e];
                      'function' == typeof i && i.apply(this.el, arguments);
                    }
                  },
                },
              ]),
              e
            );
          })();
          function q(e, t) {
            var i = new X(e);
            return i.add(t), i;
          }
          var Y = (function () {
            function e(i, n) {
              t(this, e),
                (this.element = 'string' == typeof i ? document.querySelector(i) : i),
                (this.start = this.start.bind(this)),
                (this.move = this.move.bind(this)),
                (this.end = this.end.bind(this)),
                (this.cancel = this.cancel.bind(this)),
                this.element.addEventListener('touchstart', this.start, !1),
                this.element.addEventListener('touchmove', this.move, !1),
                this.element.addEventListener('touchend', this.end, !1),
                this.element.addEventListener('touchcancel', this.cancel, !1),
                (this.preV = { x: null, y: null }),
                (this.pinchStartLen = null),
                (this.zoom = 1),
                (this.isDoubleTap = !1);
              var s = function () {};
              (this.rotate = q(this.element, n.rotate || s)),
                (this.touchStart = q(this.element, n.touchStart || s)),
                (this.multipointStart = q(this.element, n.multipointStart || s)),
                (this.multipointEnd = q(this.element, n.multipointEnd || s)),
                (this.pinch = q(this.element, n.pinch || s)),
                (this.swipe = q(this.element, n.swipe || s)),
                (this.tap = q(this.element, n.tap || s)),
                (this.doubleTap = q(this.element, n.doubleTap || s)),
                (this.longTap = q(this.element, n.longTap || s)),
                (this.singleTap = q(this.element, n.singleTap || s)),
                (this.pressMove = q(this.element, n.pressMove || s)),
                (this.twoFingerPressMove = q(this.element, n.twoFingerPressMove || s)),
                (this.touchMove = q(this.element, n.touchMove || s)),
                (this.touchEnd = q(this.element, n.touchEnd || s)),
                (this.touchCancel = q(this.element, n.touchCancel || s)),
                (this.translateContainer = this.element),
                (this._cancelAllHandler = this.cancelAll.bind(this)),
                window.addEventListener('scroll', this._cancelAllHandler),
                (this.delta = null),
                (this.last = null),
                (this.now = null),
                (this.tapTimeout = null),
                (this.singleTapTimeout = null),
                (this.longTapTimeout = null),
                (this.swipeTimeout = null),
                (this.x1 = this.x2 = this.y1 = this.y2 = null),
                (this.preTapPosition = { x: null, y: null });
            }
            return (
              n(e, [
                {
                  key: 'start',
                  value: function (e) {
                    if (e.touches)
                      if (
                        e.target &&
                        e.target.nodeName &&
                        ['a', 'button', 'input'].indexOf(e.target.nodeName.toLowerCase()) >= 0
                      )
                        console.log('ignore drag for this touched element', e.target.nodeName.toLowerCase());
                      else {
                        (this.now = Date.now()),
                          (this.x1 = e.touches[0].pageX),
                          (this.y1 = e.touches[0].pageY),
                          (this.delta = this.now - (this.last || this.now)),
                          this.touchStart.dispatch(e, this.element),
                          null !== this.preTapPosition.x &&
                            ((this.isDoubleTap =
                              this.delta > 0 &&
                              this.delta <= 250 &&
                              Math.abs(this.preTapPosition.x - this.x1) < 30 &&
                              Math.abs(this.preTapPosition.y - this.y1) < 30),
                            this.isDoubleTap && clearTimeout(this.singleTapTimeout)),
                          (this.preTapPosition.x = this.x1),
                          (this.preTapPosition.y = this.y1),
                          (this.last = this.now);
                        var t = this.preV;
                        if (e.touches.length > 1) {
                          this._cancelLongTap(), this._cancelSingleTap();
                          var i = { x: e.touches[1].pageX - this.x1, y: e.touches[1].pageY - this.y1 };
                          (t.x = i.x),
                            (t.y = i.y),
                            (this.pinchStartLen = j(t)),
                            this.multipointStart.dispatch(e, this.element);
                        }
                        (this._preventTap = !1),
                          (this.longTapTimeout = setTimeout(
                            function () {
                              this.longTap.dispatch(e, this.element), (this._preventTap = !0);
                            }.bind(this),
                            750
                          ));
                      }
                  },
                },
                {
                  key: 'move',
                  value: function (e) {
                    if (e.touches) {
                      var t = this.preV,
                        i = e.touches.length,
                        n = e.touches[0].pageX,
                        s = e.touches[0].pageY;
                      if (((this.isDoubleTap = !1), i > 1)) {
                        var r = e.touches[1].pageX,
                          o = e.touches[1].pageY,
                          a = { x: e.touches[1].pageX - n, y: e.touches[1].pageY - s };
                        null !== t.x &&
                          (this.pinchStartLen > 0 &&
                            ((e.zoom = j(a) / this.pinchStartLen), this.pinch.dispatch(e, this.element)),
                          (e.angle = (function (e, t) {
                            var i = (function (e, t) {
                              var i = j(e) * j(t);
                              if (0 === i) return 0;
                              var n =
                                (function (e, t) {
                                  return e.x * t.x + e.y * t.y;
                                })(e, t) / i;
                              return n > 1 && (n = 1), Math.acos(n);
                            })(e, t);
                            return (
                              (function (e, t) {
                                return e.x * t.y - t.x * e.y;
                              })(e, t) > 0 && (i *= -1),
                              (180 * i) / Math.PI
                            );
                          })(a, t)),
                          this.rotate.dispatch(e, this.element)),
                          (t.x = a.x),
                          (t.y = a.y),
                          null !== this.x2 && null !== this.sx2
                            ? ((e.deltaX = (n - this.x2 + r - this.sx2) / 2),
                              (e.deltaY = (s - this.y2 + o - this.sy2) / 2))
                            : ((e.deltaX = 0), (e.deltaY = 0)),
                          this.twoFingerPressMove.dispatch(e, this.element),
                          (this.sx2 = r),
                          (this.sy2 = o);
                      } else {
                        if (null !== this.x2) {
                          (e.deltaX = n - this.x2), (e.deltaY = s - this.y2);
                          var l = Math.abs(this.x1 - this.x2),
                            c = Math.abs(this.y1 - this.y2);
                          (l > 10 || c > 10) && (this._preventTap = !0);
                        } else (e.deltaX = 0), (e.deltaY = 0);
                        this.pressMove.dispatch(e, this.element);
                      }
                      this.touchMove.dispatch(e, this.element),
                        this._cancelLongTap(),
                        (this.x2 = n),
                        (this.y2 = s),
                        i > 1 && e.preventDefault();
                    }
                  },
                },
                {
                  key: 'end',
                  value: function (e) {
                    if (e.changedTouches) {
                      this._cancelLongTap();
                      var t = this;
                      e.touches.length < 2 &&
                        (this.multipointEnd.dispatch(e, this.element), (this.sx2 = this.sy2 = null)),
                        (this.x2 && Math.abs(this.x1 - this.x2) > 30) || (this.y2 && Math.abs(this.y1 - this.y2) > 30)
                          ? ((e.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2)),
                            (this.swipeTimeout = setTimeout(function () {
                              t.swipe.dispatch(e, t.element);
                            }, 0)))
                          : ((this.tapTimeout = setTimeout(function () {
                              t._preventTap || t.tap.dispatch(e, t.element),
                                t.isDoubleTap && (t.doubleTap.dispatch(e, t.element), (t.isDoubleTap = !1));
                            }, 0)),
                            t.isDoubleTap ||
                              (t.singleTapTimeout = setTimeout(function () {
                                t.singleTap.dispatch(e, t.element);
                              }, 250))),
                        this.touchEnd.dispatch(e, this.element),
                        (this.preV.x = 0),
                        (this.preV.y = 0),
                        (this.zoom = 1),
                        (this.pinchStartLen = null),
                        (this.x1 = this.x2 = this.y1 = this.y2 = null);
                    }
                  },
                },
                {
                  key: 'cancelAll',
                  value: function () {
                    (this._preventTap = !0),
                      clearTimeout(this.singleTapTimeout),
                      clearTimeout(this.tapTimeout),
                      clearTimeout(this.longTapTimeout),
                      clearTimeout(this.swipeTimeout);
                  },
                },
                {
                  key: 'cancel',
                  value: function (e) {
                    this.cancelAll(), this.touchCancel.dispatch(e, this.element);
                  },
                },
                {
                  key: '_cancelLongTap',
                  value: function () {
                    clearTimeout(this.longTapTimeout);
                  },
                },
                {
                  key: '_cancelSingleTap',
                  value: function () {
                    clearTimeout(this.singleTapTimeout);
                  },
                },
                {
                  key: '_swipeDirection',
                  value: function (e, t, i, n) {
                    return Math.abs(e - t) >= Math.abs(i - n)
                      ? e - t > 0
                        ? 'Left'
                        : 'Right'
                      : i - n > 0
                      ? 'Up'
                      : 'Down';
                  },
                },
                {
                  key: 'on',
                  value: function (e, t) {
                    this[e] && this[e].add(t);
                  },
                },
                {
                  key: 'off',
                  value: function (e, t) {
                    this[e] && this[e].del(t);
                  },
                },
                {
                  key: 'destroy',
                  value: function () {
                    return (
                      this.singleTapTimeout && clearTimeout(this.singleTapTimeout),
                      this.tapTimeout && clearTimeout(this.tapTimeout),
                      this.longTapTimeout && clearTimeout(this.longTapTimeout),
                      this.swipeTimeout && clearTimeout(this.swipeTimeout),
                      this.element.removeEventListener('touchstart', this.start),
                      this.element.removeEventListener('touchmove', this.move),
                      this.element.removeEventListener('touchend', this.end),
                      this.element.removeEventListener('touchcancel', this.cancel),
                      this.rotate.del(),
                      this.touchStart.del(),
                      this.multipointStart.del(),
                      this.multipointEnd.del(),
                      this.pinch.del(),
                      this.swipe.del(),
                      this.tap.del(),
                      this.doubleTap.del(),
                      this.longTap.del(),
                      this.singleTap.del(),
                      this.pressMove.del(),
                      this.twoFingerPressMove.del(),
                      this.touchMove.del(),
                      this.touchEnd.del(),
                      this.touchCancel.del(),
                      (this.preV =
                        this.pinchStartLen =
                        this.zoom =
                        this.isDoubleTap =
                        this.delta =
                        this.last =
                        this.now =
                        this.tapTimeout =
                        this.singleTapTimeout =
                        this.longTapTimeout =
                        this.swipeTimeout =
                        this.x1 =
                        this.x2 =
                        this.y1 =
                        this.y2 =
                        this.preTapPosition =
                        this.rotate =
                        this.touchStart =
                        this.multipointStart =
                        this.multipointEnd =
                        this.pinch =
                        this.swipe =
                        this.tap =
                        this.doubleTap =
                        this.longTap =
                        this.singleTap =
                        this.pressMove =
                        this.touchMove =
                        this.touchEnd =
                        this.touchCancel =
                        this.twoFingerPressMove =
                          null),
                      window.removeEventListener('scroll', this._cancelAllHandler),
                      null
                    );
                  },
                },
              ]),
              e
            );
          })();
          function _(e) {
            var t = (function () {
                var e,
                  t = document.createElement('fakeelement'),
                  i = {
                    transition: 'transitionend',
                    OTransition: 'oTransitionEnd',
                    MozTransition: 'transitionend',
                    WebkitTransition: 'webkitTransitionEnd',
                  };
                for (e in i) if (void 0 !== t.style[e]) return i[e];
              })(),
              i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
              n = h(e, 'gslide-media') ? e : e.querySelector('.gslide-media'),
              s = u(n, '.ginner-container'),
              r = e.querySelector('.gslide-description');
            i > 769 && (n = s),
              c(n, 'greset'),
              f(n, 'translate3d(0, 0, 0)'),
              l(t, {
                onElement: n,
                once: !0,
                withCallback: function (e, t) {
                  d(n, 'greset');
                },
              }),
              (n.style.opacity = ''),
              r && (r.style.opacity = '');
          }
          function D(e) {
            if (e.events.hasOwnProperty('touch')) return !1;
            var t,
              i,
              n,
              s = y(),
              r = s.width,
              o = s.height,
              a = !1,
              l = null,
              g = null,
              p = null,
              v = !1,
              m = 1,
              b = 1,
              x = !1,
              w = !1,
              S = null,
              T = null,
              E = null,
              k = null,
              C = 0,
              A = 0,
              L = !1,
              I = !1,
              M = {},
              O = {},
              P = 0,
              N = 0,
              z = document.getElementById('glightbox-slider'),
              j = document.querySelector('.goverlay'),
              X = new Y(z, {
                touchStart: function (t) {
                  if (
                    ((a = !0),
                    (h(t.targetTouches[0].target, 'ginner-container') ||
                      u(t.targetTouches[0].target, '.gslide-desc') ||
                      'a' == t.targetTouches[0].target.nodeName.toLowerCase()) &&
                      (a = !1),
                    u(t.targetTouches[0].target, '.gslide-inline') &&
                      !h(t.targetTouches[0].target.parentNode, 'gslide-inline') &&
                      (a = !1),
                    a)
                  ) {
                    if (
                      ((O = t.targetTouches[0]),
                      (M.pageX = t.targetTouches[0].pageX),
                      (M.pageY = t.targetTouches[0].pageY),
                      (P = t.targetTouches[0].clientX),
                      (N = t.targetTouches[0].clientY),
                      (l = e.activeSlide),
                      (g = l.querySelector('.gslide-media')),
                      (n = l.querySelector('.gslide-inline')),
                      (p = null),
                      h(g, 'gslide-image') && (p = g.querySelector('img')),
                      (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 769 &&
                        (g = l.querySelector('.ginner-container')),
                      d(j, 'greset'),
                      t.pageX > 20 && t.pageX < window.innerWidth - 20)
                    )
                      return;
                    t.preventDefault();
                  }
                },
                touchMove: function (s) {
                  if (a && ((O = s.targetTouches[0]), !x && !w)) {
                    if (n && n.offsetHeight > o) {
                      var l = M.pageX - O.pageX;
                      if (Math.abs(l) <= 13) return !1;
                    }
                    v = !0;
                    var c,
                      d = s.targetTouches[0].clientX,
                      h = s.targetTouches[0].clientY,
                      u = P - d,
                      m = N - h;
                    if (
                      (Math.abs(u) > Math.abs(m) ? ((L = !1), (I = !0)) : ((I = !1), (L = !0)),
                      (t = O.pageX - M.pageX),
                      (C = (100 * t) / r),
                      (i = O.pageY - M.pageY),
                      (A = (100 * i) / o),
                      L &&
                        p &&
                        ((c = 1 - Math.abs(i) / o), (j.style.opacity = c), e.settings.touchFollowAxis && (C = 0)),
                      I && ((c = 1 - Math.abs(t) / r), (g.style.opacity = c), e.settings.touchFollowAxis && (A = 0)),
                      !p)
                    )
                      return f(g, 'translate3d('.concat(C, '%, 0, 0)'));
                    f(g, 'translate3d('.concat(C, '%, ').concat(A, '%, 0)'));
                  }
                },
                touchEnd: function () {
                  if (a) {
                    if (((v = !1), w || x)) return (E = S), void (k = T);
                    var t = Math.abs(parseInt(A)),
                      i = Math.abs(parseInt(C));
                    if (!(t > 29 && p))
                      return t < 29 && i < 25 ? (c(j, 'greset'), (j.style.opacity = 1), _(g)) : void 0;
                    e.close();
                  }
                },
                multipointEnd: function () {
                  setTimeout(function () {
                    x = !1;
                  }, 50);
                },
                multipointStart: function () {
                  (x = !0), (m = b || 1);
                },
                pinch: function (e) {
                  if (!p || v) return !1;
                  (x = !0), (p.scaleX = p.scaleY = m * e.zoom);
                  var t = m * e.zoom;
                  if (((w = !0), t <= 1))
                    return (
                      (w = !1),
                      (t = 1),
                      (k = null),
                      (E = null),
                      (S = null),
                      (T = null),
                      void p.setAttribute('style', '')
                    );
                  t > 4.5 && (t = 4.5), (p.style.transform = 'scale3d('.concat(t, ', ').concat(t, ', 1)')), (b = t);
                },
                pressMove: function (e) {
                  if (w && !x) {
                    var t = O.pageX - M.pageX,
                      i = O.pageY - M.pageY;
                    E && (t += E), k && (i += k), (S = t), (T = i);
                    var n = 'translate3d('.concat(t, 'px, ').concat(i, 'px, 0)');
                    b && (n += ' scale3d('.concat(b, ', ').concat(b, ', 1)')), f(p, n);
                  }
                },
                swipe: function (t) {
                  if (!w)
                    if (x) x = !1;
                    else {
                      if ('Left' == t.direction) {
                        if (e.index == e.elements.length - 1) return _(g);
                        e.nextSlide();
                      }
                      if ('Right' == t.direction) {
                        if (0 == e.index) return _(g);
                        e.prevSlide();
                      }
                    }
                },
              });
            e.events.touch = X;
          }
          var B = (function () {
              function e(i, n) {
                var s = this,
                  r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
                if ((t(this, e), (this.img = i), (this.slide = n), (this.onclose = r), this.img.setZoomEvents))
                  return !1;
                (this.active = !1),
                  (this.zoomedIn = !1),
                  (this.dragging = !1),
                  (this.currentX = null),
                  (this.currentY = null),
                  (this.initialX = null),
                  (this.initialY = null),
                  (this.xOffset = 0),
                  (this.yOffset = 0),
                  this.img.addEventListener(
                    'mousedown',
                    function (e) {
                      return s.dragStart(e);
                    },
                    !1
                  ),
                  this.img.addEventListener(
                    'mouseup',
                    function (e) {
                      return s.dragEnd(e);
                    },
                    !1
                  ),
                  this.img.addEventListener(
                    'mousemove',
                    function (e) {
                      return s.drag(e);
                    },
                    !1
                  ),
                  this.img.addEventListener(
                    'click',
                    function (e) {
                      return s.slide.classList.contains('dragging-nav')
                        ? (s.zoomOut(), !1)
                        : s.zoomedIn
                        ? void (s.zoomedIn && !s.dragging && s.zoomOut())
                        : s.zoomIn();
                    },
                    !1
                  ),
                  (this.img.setZoomEvents = !0);
              }
              return (
                n(e, [
                  {
                    key: 'zoomIn',
                    value: function () {
                      var e = this.widowWidth();
                      if (!(this.zoomedIn || e <= 768)) {
                        var t = this.img;
                        if (
                          (t.setAttribute('data-style', t.getAttribute('style')),
                          (t.style.maxWidth = t.naturalWidth + 'px'),
                          (t.style.maxHeight = t.naturalHeight + 'px'),
                          t.naturalWidth > e)
                        ) {
                          var i = e / 2 - t.naturalWidth / 2;
                          this.setTranslate(this.img.parentNode, i, 0);
                        }
                        this.slide.classList.add('zoomed'), (this.zoomedIn = !0);
                      }
                    },
                  },
                  {
                    key: 'zoomOut',
                    value: function () {
                      this.img.parentNode.setAttribute('style', ''),
                        this.img.setAttribute('style', this.img.getAttribute('data-style')),
                        this.slide.classList.remove('zoomed'),
                        (this.zoomedIn = !1),
                        (this.currentX = null),
                        (this.currentY = null),
                        (this.initialX = null),
                        (this.initialY = null),
                        (this.xOffset = 0),
                        (this.yOffset = 0),
                        this.onclose && 'function' == typeof this.onclose && this.onclose();
                    },
                  },
                  {
                    key: 'dragStart',
                    value: function (e) {
                      e.preventDefault(),
                        this.zoomedIn
                          ? ('touchstart' === e.type
                              ? ((this.initialX = e.touches[0].clientX - this.xOffset),
                                (this.initialY = e.touches[0].clientY - this.yOffset))
                              : ((this.initialX = e.clientX - this.xOffset),
                                (this.initialY = e.clientY - this.yOffset)),
                            e.target === this.img && ((this.active = !0), this.img.classList.add('dragging')))
                          : (this.active = !1);
                    },
                  },
                  {
                    key: 'dragEnd',
                    value: function (e) {
                      var t = this;
                      e.preventDefault(),
                        (this.initialX = this.currentX),
                        (this.initialY = this.currentY),
                        (this.active = !1),
                        setTimeout(function () {
                          (t.dragging = !1), (t.img.isDragging = !1), t.img.classList.remove('dragging');
                        }, 100);
                    },
                  },
                  {
                    key: 'drag',
                    value: function (e) {
                      this.active &&
                        (e.preventDefault(),
                        'touchmove' === e.type
                          ? ((this.currentX = e.touches[0].clientX - this.initialX),
                            (this.currentY = e.touches[0].clientY - this.initialY))
                          : ((this.currentX = e.clientX - this.initialX), (this.currentY = e.clientY - this.initialY)),
                        (this.xOffset = this.currentX),
                        (this.yOffset = this.currentY),
                        (this.img.isDragging = !0),
                        (this.dragging = !0),
                        this.setTranslate(this.img, this.currentX, this.currentY));
                    },
                  },
                  {
                    key: 'onMove',
                    value: function (e) {
                      if (this.zoomedIn) {
                        var t = e.clientX - this.img.naturalWidth / 2,
                          i = e.clientY - this.img.naturalHeight / 2;
                        this.setTranslate(this.img, t, i);
                      }
                    },
                  },
                  {
                    key: 'setTranslate',
                    value: function (e, t, i) {
                      e.style.transform = 'translate3d(' + t + 'px, ' + i + 'px, 0)';
                    },
                  },
                  {
                    key: 'widowWidth',
                    value: function () {
                      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                    },
                  },
                ]),
                e
              );
            })(),
            W = (function () {
              function e() {
                var i = this,
                  n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                t(this, e);
                var s = n.dragEl,
                  r = n.toleranceX,
                  o = void 0 === r ? 40 : r,
                  a = n.toleranceY,
                  l = void 0 === a ? 65 : a,
                  c = n.slide,
                  d = void 0 === c ? null : c,
                  h = n.instance,
                  u = void 0 === h ? null : h;
                (this.el = s),
                  (this.active = !1),
                  (this.dragging = !1),
                  (this.currentX = null),
                  (this.currentY = null),
                  (this.initialX = null),
                  (this.initialY = null),
                  (this.xOffset = 0),
                  (this.yOffset = 0),
                  (this.direction = null),
                  (this.lastDirection = null),
                  (this.toleranceX = o),
                  (this.toleranceY = l),
                  (this.toleranceReached = !1),
                  (this.dragContainer = this.el),
                  (this.slide = d),
                  (this.instance = u),
                  this.el.addEventListener(
                    'mousedown',
                    function (e) {
                      return i.dragStart(e);
                    },
                    !1
                  ),
                  this.el.addEventListener(
                    'mouseup',
                    function (e) {
                      return i.dragEnd(e);
                    },
                    !1
                  ),
                  this.el.addEventListener(
                    'mousemove',
                    function (e) {
                      return i.drag(e);
                    },
                    !1
                  );
              }
              return (
                n(e, [
                  {
                    key: 'dragStart',
                    value: function (e) {
                      if (this.slide.classList.contains('zoomed')) this.active = !1;
                      else {
                        'touchstart' === e.type
                          ? ((this.initialX = e.touches[0].clientX - this.xOffset),
                            (this.initialY = e.touches[0].clientY - this.yOffset))
                          : ((this.initialX = e.clientX - this.xOffset), (this.initialY = e.clientY - this.yOffset));
                        var t = e.target.nodeName.toLowerCase();
                        e.target.classList.contains('nodrag') ||
                        u(e.target, '.nodrag') ||
                        -1 !== ['input', 'select', 'textarea', 'button', 'a'].indexOf(t)
                          ? (this.active = !1)
                          : (e.preventDefault(),
                            (e.target === this.el || ('img' !== t && u(e.target, '.gslide-inline'))) &&
                              ((this.active = !0),
                              this.el.classList.add('dragging'),
                              (this.dragContainer = u(e.target, '.ginner-container'))));
                      }
                    },
                  },
                  {
                    key: 'dragEnd',
                    value: function (e) {
                      var t = this;
                      e && e.preventDefault(),
                        (this.initialX = 0),
                        (this.initialY = 0),
                        (this.currentX = null),
                        (this.currentY = null),
                        (this.initialX = null),
                        (this.initialY = null),
                        (this.xOffset = 0),
                        (this.yOffset = 0),
                        (this.active = !1),
                        this.doSlideChange &&
                          ((this.instance.preventOutsideClick = !0),
                          'right' == this.doSlideChange && this.instance.prevSlide(),
                          'left' == this.doSlideChange && this.instance.nextSlide()),
                        this.doSlideClose && this.instance.close(),
                        this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, !0),
                        setTimeout(function () {
                          (t.instance.preventOutsideClick = !1),
                            (t.toleranceReached = !1),
                            (t.lastDirection = null),
                            (t.dragging = !1),
                            (t.el.isDragging = !1),
                            t.el.classList.remove('dragging'),
                            t.slide.classList.remove('dragging-nav'),
                            (t.dragContainer.style.transform = ''),
                            (t.dragContainer.style.transition = '');
                        }, 100);
                    },
                  },
                  {
                    key: 'drag',
                    value: function (e) {
                      if (this.active) {
                        e.preventDefault(),
                          this.slide.classList.add('dragging-nav'),
                          'touchmove' === e.type
                            ? ((this.currentX = e.touches[0].clientX - this.initialX),
                              (this.currentY = e.touches[0].clientY - this.initialY))
                            : ((this.currentX = e.clientX - this.initialX),
                              (this.currentY = e.clientY - this.initialY)),
                          (this.xOffset = this.currentX),
                          (this.yOffset = this.currentY),
                          (this.el.isDragging = !0),
                          (this.dragging = !0),
                          (this.doSlideChange = !1),
                          (this.doSlideClose = !1);
                        var t = Math.abs(this.currentX),
                          i = Math.abs(this.currentY);
                        if (
                          t > 0 &&
                          t >= Math.abs(this.currentY) &&
                          (!this.lastDirection || 'x' == this.lastDirection)
                        ) {
                          (this.yOffset = 0),
                            (this.lastDirection = 'x'),
                            this.setTranslate(this.dragContainer, this.currentX, 0);
                          var n = this.shouldChange();
                          if (
                            (!this.instance.settings.dragAutoSnap && n && (this.doSlideChange = n),
                            this.instance.settings.dragAutoSnap && n)
                          )
                            return (
                              (this.instance.preventOutsideClick = !0),
                              (this.toleranceReached = !0),
                              (this.active = !1),
                              (this.instance.preventOutsideClick = !0),
                              this.dragEnd(null),
                              'right' == n && this.instance.prevSlide(),
                              void ('left' == n && this.instance.nextSlide())
                            );
                        }
                        if (
                          this.toleranceY > 0 &&
                          i > 0 &&
                          i >= t &&
                          (!this.lastDirection || 'y' == this.lastDirection)
                        ) {
                          (this.xOffset = 0),
                            (this.lastDirection = 'y'),
                            this.setTranslate(this.dragContainer, 0, this.currentY);
                          var s = this.shouldClose();
                          return (
                            !this.instance.settings.dragAutoSnap && s && (this.doSlideClose = !0),
                            void (this.instance.settings.dragAutoSnap && s && this.instance.close())
                          );
                        }
                      }
                    },
                  },
                  {
                    key: 'shouldChange',
                    value: function () {
                      var e = !1;
                      if (Math.abs(this.currentX) >= this.toleranceX) {
                        var t = this.currentX > 0 ? 'right' : 'left';
                        (('left' == t && this.slide !== this.slide.parentNode.lastChild) ||
                          ('right' == t && this.slide !== this.slide.parentNode.firstChild)) &&
                          (e = t);
                      }
                      return e;
                    },
                  },
                  {
                    key: 'shouldClose',
                    value: function () {
                      var e = !1;
                      return Math.abs(this.currentY) >= this.toleranceY && (e = !0), e;
                    },
                  },
                  {
                    key: 'setTranslate',
                    value: function (e, t, i) {
                      var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                      (e.style.transition = n ? 'all .2s ease' : ''),
                        (e.style.transform = 'translate3d('.concat(t, 'px, ').concat(i, 'px, 0)'));
                    },
                  },
                ]),
                e
              );
            })();
          function H(e, t, i, n) {
            var s = e.querySelector('.gslide-media'),
              r = new Image(),
              o = 'gSlideTitle_' + i,
              a = 'gSlideDesc_' + i;
            r.addEventListener(
              'load',
              function () {
                T(n) && n();
              },
              !1
            ),
              (r.src = t.href),
              '' != t.sizes && '' != t.srcset && ((r.sizes = t.sizes), (r.srcset = t.srcset)),
              (r.alt = ''),
              I(t.alt) || '' === t.alt || (r.alt = t.alt),
              '' !== t.title && r.setAttribute('aria-labelledby', o),
              '' !== t.description && r.setAttribute('aria-describedby', a),
              t.hasOwnProperty('_hasCustomWidth') && t._hasCustomWidth && (r.style.width = t.width),
              t.hasOwnProperty('_hasCustomHeight') && t._hasCustomHeight && (r.style.height = t.height),
              s.insertBefore(r, s.firstChild);
          }
          function V(e, t, i, n) {
            var s = this,
              r = e.querySelector('.ginner-container'),
              o = 'gvideo' + i,
              a = e.querySelector('.gslide-media'),
              l = this.getAllPlayers();
            c(r, 'gvideo-container'), a.insertBefore(m('<div class="gvideo-wrapper"></div>'), a.firstChild);
            var d = e.querySelector('.gvideo-wrapper');
            w(this.settings.plyr.css, 'Plyr');
            var h = t.href,
              u = null == t ? void 0 : t.videoProvider,
              g = !1;
            (a.style.maxWidth = t.width),
              w(this.settings.plyr.js, 'Plyr', function () {
                if (
                  (!u && h.match(/vimeo\.com\/([0-9]*)/) && (u = 'vimeo'),
                  !u &&
                    (h.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) ||
                      h.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) ||
                      h.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) &&
                    (u = 'youtube'),
                  'local' === u || !u)
                ) {
                  u = 'local';
                  var r = '<video id="' + o + '" ';
                  (r += 'style="background:#000; max-width: '.concat(t.width, ';" ')),
                    (r += 'preload="metadata" '),
                    (r += 'x-webkit-airplay="allow" '),
                    (r += 'playsinline '),
                    (r += 'controls '),
                    (r += 'class="gvideo-local">'),
                    (r += '<source src="'.concat(h, '">')),
                    (g = m((r += '</video>')));
                }
                var a =
                  g ||
                  m(
                    '<div id="'
                      .concat(o, '" data-plyr-provider="')
                      .concat(u, '" data-plyr-embed-id="')
                      .concat(h, '"></div>')
                  );
                c(d, ''.concat(u, '-video gvideo')),
                  d.appendChild(a),
                  d.setAttribute('data-id', o),
                  d.setAttribute('data-index', i);
                var f = M(s.settings.plyr, 'config') ? s.settings.plyr.config : {},
                  p = new Plyr('#' + o, f);
                p.on('ready', function (e) {
                  (l[o] = e.detail.plyr), T(n) && n();
                }),
                  x(
                    function () {
                      return e.querySelector('iframe') && 'true' == e.querySelector('iframe').dataset.ready;
                    },
                    function () {
                      s.resize(e);
                    }
                  ),
                  p.on('enterfullscreen', F),
                  p.on('exitfullscreen', F);
              });
          }
          function F(e) {
            var t = u(e.target, '.gslide-media');
            'enterfullscreen' === e.type && c(t, 'fullscreen'), 'exitfullscreen' === e.type && d(t, 'fullscreen');
          }
          function G(e, t, i, n) {
            var s,
              r = this,
              o = e.querySelector('.gslide-media'),
              a = !(!M(t, 'href') || !t.href) && t.href.split('#').pop().trim(),
              d = !(!M(t, 'content') || !t.content) && t.content;
            if (d && (E(d) && (s = m('<div class="ginlined-content">'.concat(d, '</div>'))), k(d))) {
              'none' == d.style.display && (d.style.display = 'block');
              var h = document.createElement('div');
              (h.className = 'ginlined-content'), h.appendChild(d), (s = h);
            }
            if (a) {
              var u = document.getElementById(a);
              if (!u) return !1;
              var g = u.cloneNode(!0);
              (g.style.height = t.height), (g.style.maxWidth = t.width), c(g, 'ginlined-content'), (s = g);
            }
            if (!s) return console.error('Unable to append inline slide content', t), !1;
            (o.style.height = t.height),
              (o.style.width = t.width),
              o.appendChild(s),
              (this.events['inlineclose' + a] = l('click', {
                onElement: o.querySelectorAll('.gtrigger-close'),
                withCallback: function (e) {
                  e.preventDefault(), r.close();
                },
              })),
              T(n) && n();
          }
          function R(e, t, i, n) {
            var s = e.querySelector('.gslide-media'),
              r = (function (e) {
                var t = e.url,
                  i = e.allow,
                  n = e.callback,
                  s = e.appendTo,
                  r = document.createElement('iframe');
                return (
                  (r.className = 'vimeo-video gvideo'),
                  (r.src = t),
                  (r.style.width = '100%'),
                  (r.style.height = '100%'),
                  i && r.setAttribute('allow', i),
                  (r.onload = function () {
                    (r.onload = null), c(r, 'node-ready'), T(n) && n();
                  }),
                  s && s.appendChild(r),
                  r
                );
              })({ url: t.href, callback: n });
            (s.parentNode.style.maxWidth = t.width), (s.parentNode.style.height = t.height), s.appendChild(r);
          }
          var Z = (function () {
              function e() {
                var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                t(this, e),
                  (this.defaults = {
                    href: '',
                    sizes: '',
                    srcset: '',
                    title: '',
                    type: '',
                    videoProvider: '',
                    description: '',
                    alt: '',
                    descPosition: 'bottom',
                    effect: '',
                    width: '',
                    height: '',
                    content: !1,
                    zoomable: !0,
                    draggable: !0,
                  }),
                  L(i) && (this.defaults = r(this.defaults, i));
              }
              return (
                n(e, [
                  {
                    key: 'sourceType',
                    value: function (e) {
                      var t = e;
                      return null !== (e = e.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/)
                        ? 'image'
                        : e.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) ||
                          e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) ||
                          e.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/) ||
                          e.match(/vimeo\.com\/([0-9]*)/) ||
                          null !== e.match(/\.(mp4|ogg|webm|mov)/)
                        ? 'video'
                        : null !== e.match(/\.(mp3|wav|wma|aac|ogg)/)
                        ? 'audio'
                        : e.indexOf('#') > -1 && '' !== t.split('#').pop().trim()
                        ? 'inline'
                        : e.indexOf('goajax=true') > -1
                        ? 'ajax'
                        : 'external';
                    },
                  },
                  {
                    key: 'parseConfig',
                    value: function (e, t) {
                      var i = this,
                        n = r({ descPosition: t.descPosition }, this.defaults);
                      if (L(e) && !k(e)) {
                        M(e, 'type') ||
                          (M(e, 'content') && e.content
                            ? (e.type = 'inline')
                            : M(e, 'href') && (e.type = this.sourceType(e.href)));
                        var s = r(n, e);
                        return this.setSize(s, t), s;
                      }
                      var a = '',
                        l = e.getAttribute('data-glightbox'),
                        c = e.nodeName.toLowerCase();
                      if (
                        ('a' === c && (a = e.href),
                        'img' === c && ((a = e.src), (n.alt = e.alt)),
                        (n.href = a),
                        o(n, function (s, r) {
                          M(t, r) && 'width' !== r && (n[r] = t[r]);
                          var o = e.dataset[r];
                          I(o) || (n[r] = i.sanitizeValue(o));
                        }),
                        n.content && (n.type = 'inline'),
                        !n.type && a && (n.type = this.sourceType(a)),
                        I(l))
                      ) {
                        if (!n.title && 'a' == c) {
                          var d = e.title;
                          I(d) || '' === d || (n.title = d);
                        }
                        if (!n.title && 'img' == c) {
                          var h = e.alt;
                          I(h) || '' === h || (n.title = h);
                        }
                      } else {
                        var u = [];
                        o(n, function (e, t) {
                          u.push(';\\s?' + t);
                        }),
                          (u = u.join('\\s?:|')),
                          '' !== l.trim() &&
                            o(n, function (e, t) {
                              var s = l,
                                r = new RegExp('s?' + t + 's?:s?(.*?)(' + u + 's?:|$)'),
                                o = s.match(r);
                              if (o && o.length && o[1]) {
                                var a = o[1].trim().replace(/;\s*$/, '');
                                n[t] = i.sanitizeValue(a);
                              }
                            });
                      }
                      if (n.description && '.' === n.description.substring(0, 1)) {
                        var g;
                        try {
                          g = document.querySelector(n.description).innerHTML;
                        } catch (e) {
                          if (!(e instanceof DOMException)) throw e;
                        }
                        g && (n.description = g);
                      }
                      if (!n.description) {
                        var f = e.querySelector('.glightbox-desc');
                        f && (n.description = f.innerHTML);
                      }
                      return this.setSize(n, t, e), (this.slideConfig = n), n;
                    },
                  },
                  {
                    key: 'setSize',
                    value: function (e, t) {
                      var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                        n = 'video' == e.type ? this.checkSize(t.videosWidth) : this.checkSize(t.width),
                        s = this.checkSize(t.height);
                      return (
                        (e.width = M(e, 'width') && '' !== e.width ? this.checkSize(e.width) : n),
                        (e.height = M(e, 'height') && '' !== e.height ? this.checkSize(e.height) : s),
                        i &&
                          'image' == e.type &&
                          ((e._hasCustomWidth = !!i.dataset.width), (e._hasCustomHeight = !!i.dataset.height)),
                        e
                      );
                    },
                  },
                  {
                    key: 'checkSize',
                    value: function (e) {
                      return P(e) ? ''.concat(e, 'px') : e;
                    },
                  },
                  {
                    key: 'sanitizeValue',
                    value: function (e) {
                      return 'true' !== e && 'false' !== e ? e : 'true' === e;
                    },
                  },
                ]),
                e
              );
            })(),
            U = (function () {
              function e(i, n, s) {
                t(this, e), (this.element = i), (this.instance = n), (this.index = s);
              }
              return (
                n(e, [
                  {
                    key: 'setContent',
                    value: function () {
                      var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                        i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                      if (h(t, 'loaded')) return !1;
                      var n = this.instance.settings,
                        s = this.slideConfig,
                        r = S();
                      T(n.beforeSlideLoad) && n.beforeSlideLoad({ index: this.index, slide: t, player: !1 });
                      var o = s.type,
                        a = s.descPosition,
                        l = t.querySelector('.gslide-media'),
                        d = t.querySelector('.gslide-title'),
                        u = t.querySelector('.gslide-desc'),
                        g = t.querySelector('.gdesc-inner'),
                        f = i,
                        p = 'gSlideTitle_' + this.index,
                        v = 'gSlideDesc_' + this.index;
                      if (
                        (T(n.afterSlideLoad) &&
                          (f = function () {
                            T(i) && i(),
                              n.afterSlideLoad({
                                index: e.index,
                                slide: t,
                                player: e.instance.getSlidePlayerInstance(e.index),
                              });
                          }),
                        '' == s.title && '' == s.description
                          ? g && g.parentNode.parentNode.removeChild(g.parentNode)
                          : (d && '' !== s.title ? ((d.id = p), (d.innerHTML = s.title)) : d.parentNode.removeChild(d),
                            u && '' !== s.description
                              ? ((u.id = v),
                                r && n.moreLength > 0
                                  ? ((s.smallDescription = this.slideShortDesc(
                                      s.description,
                                      n.moreLength,
                                      n.moreText
                                    )),
                                    (u.innerHTML = s.smallDescription),
                                    this.descriptionEvents(u, s))
                                  : (u.innerHTML = s.description))
                              : u.parentNode.removeChild(u),
                            c(l.parentNode, 'desc-'.concat(a)),
                            c(g.parentNode, 'description-'.concat(a))),
                        c(l, 'gslide-'.concat(o)),
                        c(t, 'loaded'),
                        'video' !== o)
                      ) {
                        if ('external' !== o)
                          return 'inline' === o
                            ? (G.apply(this.instance, [t, s, this.index, f]),
                              void (
                                s.draggable &&
                                new W({
                                  dragEl: t.querySelector('.gslide-inline'),
                                  toleranceX: n.dragToleranceX,
                                  toleranceY: n.dragToleranceY,
                                  slide: t,
                                  instance: this.instance,
                                })
                              ))
                            : void ('image' !== o
                                ? T(f) && f()
                                : H(t, s, this.index, function () {
                                    var i = t.querySelector('img');
                                    s.draggable &&
                                      new W({
                                        dragEl: i,
                                        toleranceX: n.dragToleranceX,
                                        toleranceY: n.dragToleranceY,
                                        slide: t,
                                        instance: e.instance,
                                      }),
                                      s.zoomable &&
                                        i.naturalWidth > i.offsetWidth &&
                                        (c(i, 'zoomable'),
                                        new B(i, t, function () {
                                          e.instance.resize();
                                        })),
                                      T(f) && f();
                                  }));
                        R.apply(this, [t, s, this.index, f]);
                      } else V.apply(this.instance, [t, s, this.index, f]);
                    },
                  },
                  {
                    key: 'slideShortDesc',
                    value: function (e) {
                      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50,
                        i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        n = document.createElement('div');
                      n.innerHTML = e;
                      var s = i;
                      if ((e = n.innerText.trim()).length <= t) return e;
                      var r = e.substr(0, t - 1);
                      return s ? ((n = null), r + '... <a href="#" class="desc-more">' + i + '</a>') : r;
                    },
                  },
                  {
                    key: 'descriptionEvents',
                    value: function (e, t) {
                      var i = this,
                        n = e.querySelector('.desc-more');
                      if (!n) return !1;
                      l('click', {
                        onElement: n,
                        withCallback: function (e, n) {
                          e.preventDefault();
                          var s = document.body,
                            r = u(n, '.gslide-desc');
                          if (!r) return !1;
                          (r.innerHTML = t.description), c(s, 'gdesc-open');
                          var o = l('click', {
                            onElement: [s, u(r, '.gslide-description')],
                            withCallback: function (e, n) {
                              'a' !== e.target.nodeName.toLowerCase() &&
                                (d(s, 'gdesc-open'),
                                c(s, 'gdesc-closed'),
                                (r.innerHTML = t.smallDescription),
                                i.descriptionEvents(r, t),
                                setTimeout(function () {
                                  d(s, 'gdesc-closed');
                                }, 400),
                                o.destroy());
                            },
                          });
                        },
                      });
                    },
                  },
                  {
                    key: 'create',
                    value: function () {
                      return m(this.instance.settings.slideHTML);
                    },
                  },
                  {
                    key: 'getConfig',
                    value: function () {
                      k(this.element) ||
                        this.element.hasOwnProperty('draggable') ||
                        (this.element.draggable = this.instance.settings.draggable);
                      var e = new Z(this.instance.settings.slideExtraAttributes);
                      return (this.slideConfig = e.parseConfig(this.element, this.instance.settings)), this.slideConfig;
                    },
                  },
                ]),
                e
              );
            })(),
            $ = S(),
            J =
              null !== S() ||
              void 0 !== document.createTouch ||
              'ontouchstart' in window ||
              'onmsgesturechange' in window ||
              navigator.msMaxTouchPoints,
            K = document.getElementsByTagName('html')[0],
            Q = {
              selector: '.glightbox',
              elements: null,
              skin: 'clean',
              theme: 'clean',
              closeButton: !0,
              startAt: null,
              autoplayVideos: !0,
              autofocusVideos: !0,
              descPosition: 'bottom',
              width: '900px',
              height: '506px',
              videosWidth: '960px',
              beforeSlideChange: null,
              afterSlideChange: null,
              beforeSlideLoad: null,
              afterSlideLoad: null,
              slideInserted: null,
              slideRemoved: null,
              slideExtraAttributes: null,
              onOpen: null,
              onClose: null,
              loop: !1,
              zoomable: !0,
              draggable: !0,
              dragAutoSnap: !1,
              dragToleranceX: 40,
              dragToleranceY: 65,
              preload: !0,
              oneSlidePerOpen: !1,
              touchNavigation: !0,
              touchFollowAxis: !0,
              keyboardNavigation: !0,
              closeOnOutsideClick: !0,
              plugins: !1,
              plyr: {
                css: 'https://cdn.plyr.io/3.6.12/plyr.css',
                js: 'https://cdn.plyr.io/3.6.12/plyr.js',
                config: {
                  ratio: '16:9',
                  fullscreen: { enabled: !0, iosNative: !0 },
                  youtube: { noCookie: !0, rel: 0, showinfo: 0, iv_load_policy: 3 },
                  vimeo: { byline: !1, portrait: !1, title: !1, transparent: !1 },
                },
              },
              openEffect: 'zoom',
              closeEffect: 'zoom',
              slideEffect: 'slide',
              moreText: 'See more',
              moreLength: 60,
              cssEfects: {
                fade: { in: 'fadeIn', out: 'fadeOut' },
                zoom: { in: 'zoomIn', out: 'zoomOut' },
                slide: { in: 'slideInRight', out: 'slideOutLeft' },
                slideBack: { in: 'slideInLeft', out: 'slideOutRight' },
                none: { in: 'none', out: 'none' },
              },
              svg: {
                close:
                  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',
                next: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
                prev: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>',
              },
              slideHTML:
                '<div class="gslide">\n    <div class="gslide-inner-content">\n        <div class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <div class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>',
              lightboxHTML:
                '<div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-hidden="false">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gclose gbtn" aria-label="Close" data-taborder="3">{closeSVG}</button>\n    <button class="gprev gbtn" aria-label="Previous" data-taborder="2">{prevSVG}</button>\n    <button class="gnext gbtn" aria-label="Next" data-taborder="1">{nextSVG}</button>\n</div>\n</div>',
            },
            ee = (function () {
              function e() {
                var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                t(this, e),
                  (this.customOptions = i),
                  (this.settings = r(Q, i)),
                  (this.effectsClasses = this.getAnimationClasses()),
                  (this.videoPlayers = {}),
                  (this.apiEvents = []),
                  (this.fullElementsList = !1);
              }
              return (
                n(e, [
                  {
                    key: 'init',
                    value: function () {
                      var e = this,
                        t = this.getSelector();
                      t &&
                        (this.baseEvents = l('click', {
                          onElement: t,
                          withCallback: function (t, i) {
                            t.preventDefault(), e.open(i);
                          },
                        })),
                        (this.elements = this.getElements());
                    },
                  },
                  {
                    key: 'open',
                    value: function () {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                      if (0 === this.elements.length) return !1;
                      (this.activeSlide = null), (this.prevActiveSlideIndex = null), (this.prevActiveSlide = null);
                      var i = P(t) ? t : this.settings.startAt;
                      if (k(e)) {
                        var n = e.getAttribute('data-gallery');
                        n &&
                          ((this.fullElementsList = this.elements),
                          (this.elements = this.getGalleryElements(this.elements, n))),
                          I(i) && (i = this.getElementIndex(e)) < 0 && (i = 0);
                      }
                      P(i) || (i = 0),
                        this.build(),
                        g(this.overlay, 'none' === this.settings.openEffect ? 'none' : this.settings.cssEfects.fade.in);
                      var s = document.body,
                        r = window.innerWidth - document.documentElement.clientWidth;
                      if (r > 0) {
                        var o = document.createElement('style');
                        (o.type = 'text/css'),
                          (o.className = 'gcss-styles'),
                          (o.innerText = '.gscrollbar-fixer {margin-right: '.concat(r, 'px}')),
                          document.head.appendChild(o),
                          c(s, 'gscrollbar-fixer');
                      }
                      c(s, 'glightbox-open'),
                        c(K, 'glightbox-open'),
                        $ && (c(document.body, 'glightbox-mobile'), (this.settings.slideEffect = 'slide')),
                        this.showSlide(i, !0),
                        1 === this.elements.length
                          ? (c(this.prevButton, 'glightbox-button-hidden'),
                            c(this.nextButton, 'glightbox-button-hidden'))
                          : (d(this.prevButton, 'glightbox-button-hidden'),
                            d(this.nextButton, 'glightbox-button-hidden')),
                        (this.lightboxOpen = !0),
                        this.trigger('open'),
                        T(this.settings.onOpen) && this.settings.onOpen(),
                        J && this.settings.touchNavigation && D(this),
                        this.settings.keyboardNavigation && z(this);
                    },
                  },
                  {
                    key: 'openAt',
                    value: function () {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
                      this.open(null, e);
                    },
                  },
                  {
                    key: 'showSlide',
                    value: function () {
                      var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                        i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                      p(this.loader), (this.index = parseInt(t));
                      var n = this.slidesContainer.querySelector('.current');
                      n && d(n, 'current'), this.slideAnimateOut();
                      var s = this.slidesContainer.querySelectorAll('.gslide')[t];
                      if (h(s, 'loaded')) this.slideAnimateIn(s, i), v(this.loader);
                      else {
                        p(this.loader);
                        var r = this.elements[t],
                          o = {
                            index: this.index,
                            slide: s,
                            slideNode: s,
                            slideConfig: r.slideConfig,
                            slideIndex: this.index,
                            trigger: r.node,
                            player: null,
                          };
                        this.trigger('slide_before_load', o),
                          r.instance.setContent(s, function () {
                            v(e.loader), e.resize(), e.slideAnimateIn(s, i), e.trigger('slide_after_load', o);
                          });
                      }
                      (this.slideDescription = s.querySelector('.gslide-description')),
                        (this.slideDescriptionContained =
                          this.slideDescription && h(this.slideDescription.parentNode, 'gslide-media')),
                        this.settings.preload && (this.preloadSlide(t + 1), this.preloadSlide(t - 1)),
                        this.updateNavigationClasses(),
                        (this.activeSlide = s);
                    },
                  },
                  {
                    key: 'preloadSlide',
                    value: function (e) {
                      var t = this;
                      if (e < 0 || e > this.elements.length - 1) return !1;
                      if (I(this.elements[e])) return !1;
                      var i = this.slidesContainer.querySelectorAll('.gslide')[e];
                      if (h(i, 'loaded')) return !1;
                      var n = this.elements[e],
                        s = n.type,
                        r = {
                          index: e,
                          slide: i,
                          slideNode: i,
                          slideConfig: n.slideConfig,
                          slideIndex: e,
                          trigger: n.node,
                          player: null,
                        };
                      this.trigger('slide_before_load', r),
                        'video' === s || 'external' === s
                          ? setTimeout(function () {
                              n.instance.setContent(i, function () {
                                t.trigger('slide_after_load', r);
                              });
                            }, 200)
                          : n.instance.setContent(i, function () {
                              t.trigger('slide_after_load', r);
                            });
                    },
                  },
                  {
                    key: 'prevSlide',
                    value: function () {
                      this.goToSlide(this.index - 1);
                    },
                  },
                  {
                    key: 'nextSlide',
                    value: function () {
                      this.goToSlide(this.index + 1);
                    },
                  },
                  {
                    key: 'goToSlide',
                    value: function () {
                      var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                      if (
                        ((this.prevActiveSlide = this.activeSlide),
                        (this.prevActiveSlideIndex = this.index),
                        !this.loop() && (e < 0 || e > this.elements.length - 1))
                      )
                        return !1;
                      e < 0 ? (e = this.elements.length - 1) : e >= this.elements.length && (e = 0), this.showSlide(e);
                    },
                  },
                  {
                    key: 'insertSlide',
                    value: function () {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
                      t < 0 && (t = this.elements.length);
                      var i = new U(e, this, t),
                        n = i.getConfig(),
                        s = r({}, n),
                        o = i.create(),
                        a = this.elements.length - 1;
                      (s.index = t),
                        (s.node = !1),
                        (s.instance = i),
                        (s.slideConfig = n),
                        this.elements.splice(t, 0, s);
                      var l = null,
                        c = null;
                      if (this.slidesContainer) {
                        if (t > a) this.slidesContainer.appendChild(o);
                        else {
                          var d = this.slidesContainer.querySelectorAll('.gslide')[t];
                          this.slidesContainer.insertBefore(o, d);
                        }
                        ((this.settings.preload && 0 == this.index && 0 == t) ||
                          this.index - 1 == t ||
                          this.index + 1 == t) &&
                          this.preloadSlide(t),
                          0 === this.index && 0 === t && (this.index = 1),
                          this.updateNavigationClasses(),
                          (l = this.slidesContainer.querySelectorAll('.gslide')[t]),
                          (c = this.getSlidePlayerInstance(t)),
                          (s.slideNode = l);
                      }
                      this.trigger('slide_inserted', {
                        index: t,
                        slide: l,
                        slideNode: l,
                        slideConfig: n,
                        slideIndex: t,
                        trigger: null,
                        player: c,
                      }),
                        T(this.settings.slideInserted) &&
                          this.settings.slideInserted({ index: t, slide: l, player: c });
                    },
                  },
                  {
                    key: 'removeSlide',
                    value: function () {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
                      if (e < 0 || e > this.elements.length - 1) return !1;
                      var t = this.slidesContainer && this.slidesContainer.querySelectorAll('.gslide')[e];
                      t &&
                        (this.getActiveSlideIndex() == e &&
                          (e == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()),
                        t.parentNode.removeChild(t)),
                        this.elements.splice(e, 1),
                        this.trigger('slide_removed', e),
                        T(this.settings.slideRemoved) && this.settings.slideRemoved(e);
                    },
                  },
                  {
                    key: 'slideAnimateIn',
                    value: function (e, t) {
                      var i = this,
                        n = e.querySelector('.gslide-media'),
                        s = e.querySelector('.gslide-description'),
                        r = {
                          index: this.prevActiveSlideIndex,
                          slide: this.prevActiveSlide,
                          slideNode: this.prevActiveSlide,
                          slideIndex: this.prevActiveSlide,
                          slideConfig: I(this.prevActiveSlideIndex)
                            ? null
                            : this.elements[this.prevActiveSlideIndex].slideConfig,
                          trigger: I(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
                          player: this.getSlidePlayerInstance(this.prevActiveSlideIndex),
                        },
                        o = {
                          index: this.index,
                          slide: this.activeSlide,
                          slideNode: this.activeSlide,
                          slideConfig: this.elements[this.index].slideConfig,
                          slideIndex: this.index,
                          trigger: this.elements[this.index].node,
                          player: this.getSlidePlayerInstance(this.index),
                        };
                      if ((n.offsetWidth > 0 && s && (v(s), (s.style.display = '')), d(e, this.effectsClasses), t))
                        g(e, this.settings.cssEfects[this.settings.openEffect].in, function () {
                          i.settings.autoplayVideos && i.slidePlayerPlay(e),
                            i.trigger('slide_changed', { prev: r, current: o }),
                            T(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [r, o]);
                        });
                      else {
                        var a = this.settings.slideEffect,
                          l = 'none' !== a ? this.settings.cssEfects[a].in : a;
                        this.prevActiveSlideIndex > this.index &&
                          'slide' == this.settings.slideEffect &&
                          (l = this.settings.cssEfects.slideBack.in),
                          g(e, l, function () {
                            i.settings.autoplayVideos && i.slidePlayerPlay(e),
                              i.trigger('slide_changed', { prev: r, current: o }),
                              T(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [r, o]);
                          });
                      }
                      setTimeout(function () {
                        i.resize(e);
                      }, 100),
                        c(e, 'current');
                    },
                  },
                  {
                    key: 'slideAnimateOut',
                    value: function () {
                      if (!this.prevActiveSlide) return !1;
                      var e = this.prevActiveSlide;
                      d(e, this.effectsClasses), c(e, 'prev');
                      var t = this.settings.slideEffect,
                        i = 'none' !== t ? this.settings.cssEfects[t].out : t;
                      this.slidePlayerPause(e),
                        this.trigger('slide_before_change', {
                          prev: {
                            index: this.prevActiveSlideIndex,
                            slide: this.prevActiveSlide,
                            slideNode: this.prevActiveSlide,
                            slideIndex: this.prevActiveSlideIndex,
                            slideConfig: I(this.prevActiveSlideIndex)
                              ? null
                              : this.elements[this.prevActiveSlideIndex].slideConfig,
                            trigger: I(this.prevActiveSlideIndex)
                              ? null
                              : this.elements[this.prevActiveSlideIndex].node,
                            player: this.getSlidePlayerInstance(this.prevActiveSlideIndex),
                          },
                          current: {
                            index: this.index,
                            slide: this.activeSlide,
                            slideNode: this.activeSlide,
                            slideIndex: this.index,
                            slideConfig: this.elements[this.index].slideConfig,
                            trigger: this.elements[this.index].node,
                            player: this.getSlidePlayerInstance(this.index),
                          },
                        }),
                        T(this.settings.beforeSlideChange) &&
                          this.settings.beforeSlideChange.apply(this, [
                            {
                              index: this.prevActiveSlideIndex,
                              slide: this.prevActiveSlide,
                              player: this.getSlidePlayerInstance(this.prevActiveSlideIndex),
                            },
                            {
                              index: this.index,
                              slide: this.activeSlide,
                              player: this.getSlidePlayerInstance(this.index),
                            },
                          ]),
                        this.prevActiveSlideIndex > this.index &&
                          'slide' == this.settings.slideEffect &&
                          (i = this.settings.cssEfects.slideBack.out),
                        g(e, i, function () {
                          var t = e.querySelector('.ginner-container'),
                            i = e.querySelector('.gslide-media'),
                            n = e.querySelector('.gslide-description');
                          (t.style.transform = ''),
                            (i.style.transform = ''),
                            d(i, 'greset'),
                            (i.style.opacity = ''),
                            n && (n.style.opacity = ''),
                            d(e, 'prev');
                        });
                    },
                  },
                  {
                    key: 'getAllPlayers',
                    value: function () {
                      return this.videoPlayers;
                    },
                  },
                  {
                    key: 'getSlidePlayerInstance',
                    value: function (e) {
                      var t = 'gvideo' + e,
                        i = this.getAllPlayers();
                      return !(!M(i, t) || !i[t]) && i[t];
                    },
                  },
                  {
                    key: 'stopSlideVideo',
                    value: function (e) {
                      if (k(e)) {
                        var t = e.querySelector('.gvideo-wrapper');
                        t && (e = t.getAttribute('data-index'));
                      }
                      console.log('stopSlideVideo is deprecated, use slidePlayerPause');
                      var i = this.getSlidePlayerInstance(e);
                      i && i.playing && i.pause();
                    },
                  },
                  {
                    key: 'slidePlayerPause',
                    value: function (e) {
                      if (k(e)) {
                        var t = e.querySelector('.gvideo-wrapper');
                        t && (e = t.getAttribute('data-index'));
                      }
                      var i = this.getSlidePlayerInstance(e);
                      i && i.playing && i.pause();
                    },
                  },
                  {
                    key: 'playSlideVideo',
                    value: function (e) {
                      if (k(e)) {
                        var t = e.querySelector('.gvideo-wrapper');
                        t && (e = t.getAttribute('data-index'));
                      }
                      console.log('playSlideVideo is deprecated, use slidePlayerPlay');
                      var i = this.getSlidePlayerInstance(e);
                      i && !i.playing && i.play();
                    },
                  },
                  {
                    key: 'slidePlayerPlay',
                    value: function (e) {
                      var t;
                      if (!$ || (null !== (t = this.settings.plyr.config) && void 0 !== t && t.muted)) {
                        if (k(e)) {
                          var i = e.querySelector('.gvideo-wrapper');
                          i && (e = i.getAttribute('data-index'));
                        }
                        var n = this.getSlidePlayerInstance(e);
                        n && !n.playing && (n.play(), this.settings.autofocusVideos && n.elements.container.focus());
                      }
                    },
                  },
                  {
                    key: 'setElements',
                    value: function (e) {
                      var t = this;
                      this.settings.elements = !1;
                      var i = [];
                      e &&
                        e.length &&
                        o(e, function (e, n) {
                          var s = new U(e, t, n),
                            o = s.getConfig(),
                            a = r({}, o);
                          (a.slideConfig = o), (a.instance = s), (a.index = n), i.push(a);
                        }),
                        (this.elements = i),
                        this.lightboxOpen &&
                          ((this.slidesContainer.innerHTML = ''),
                          this.elements.length &&
                            (o(this.elements, function () {
                              var e = m(t.settings.slideHTML);
                              t.slidesContainer.appendChild(e);
                            }),
                            this.showSlide(0, !0)));
                    },
                  },
                  {
                    key: 'getElementIndex',
                    value: function (e) {
                      var t = !1;
                      return (
                        o(this.elements, function (i, n) {
                          if (M(i, 'node') && i.node == e) return (t = n), !0;
                        }),
                        t
                      );
                    },
                  },
                  {
                    key: 'getElements',
                    value: function () {
                      var e = this,
                        t = [];
                      (this.elements = this.elements ? this.elements : []),
                        !I(this.settings.elements) &&
                          C(this.settings.elements) &&
                          this.settings.elements.length &&
                          o(this.settings.elements, function (i, n) {
                            var s = new U(i, e, n),
                              o = s.getConfig(),
                              a = r({}, o);
                            (a.node = !1), (a.index = n), (a.instance = s), (a.slideConfig = o), t.push(a);
                          });
                      var i = !1;
                      return (
                        this.getSelector() && (i = document.querySelectorAll(this.getSelector())),
                        i
                          ? (o(i, function (i, n) {
                              var s = new U(i, e, n),
                                o = s.getConfig(),
                                a = r({}, o);
                              (a.node = i),
                                (a.index = n),
                                (a.instance = s),
                                (a.slideConfig = o),
                                (a.gallery = i.getAttribute('data-gallery')),
                                t.push(a);
                            }),
                            t)
                          : t
                      );
                    },
                  },
                  {
                    key: 'getGalleryElements',
                    value: function (e, t) {
                      return e.filter(function (e) {
                        return e.gallery == t;
                      });
                    },
                  },
                  {
                    key: 'getSelector',
                    value: function () {
                      return (
                        !this.settings.elements &&
                        (this.settings.selector && 'data-' == this.settings.selector.substring(0, 5)
                          ? '*['.concat(this.settings.selector, ']')
                          : this.settings.selector)
                      );
                    },
                  },
                  {
                    key: 'getActiveSlide',
                    value: function () {
                      return this.slidesContainer.querySelectorAll('.gslide')[this.index];
                    },
                  },
                  {
                    key: 'getActiveSlideIndex',
                    value: function () {
                      return this.index;
                    },
                  },
                  {
                    key: 'getAnimationClasses',
                    value: function () {
                      var e = [];
                      for (var t in this.settings.cssEfects)
                        if (this.settings.cssEfects.hasOwnProperty(t)) {
                          var i = this.settings.cssEfects[t];
                          e.push('g'.concat(i.in)), e.push('g'.concat(i.out));
                        }
                      return e.join(' ');
                    },
                  },
                  {
                    key: 'build',
                    value: function () {
                      var e = this;
                      if (this.built) return !1;
                      var t = document.body.childNodes,
                        i = [];
                      o(t, function (e) {
                        e.parentNode == document.body &&
                          '#' !== e.nodeName.charAt(0) &&
                          e.hasAttribute &&
                          !e.hasAttribute('aria-hidden') &&
                          (i.push(e), e.setAttribute('aria-hidden', 'true'));
                      });
                      var n = M(this.settings.svg, 'next') ? this.settings.svg.next : '',
                        s = M(this.settings.svg, 'prev') ? this.settings.svg.prev : '',
                        r = M(this.settings.svg, 'close') ? this.settings.svg.close : '',
                        a = this.settings.lightboxHTML;
                      (a = m(
                        (a = (a = (a = a.replace(/{nextSVG}/g, n)).replace(/{prevSVG}/g, s)).replace(/{closeSVG}/g, r))
                      )),
                        document.body.appendChild(a);
                      var d = document.getElementById('glightbox-body');
                      this.modal = d;
                      var g = d.querySelector('.gclose');
                      (this.prevButton = d.querySelector('.gprev')),
                        (this.nextButton = d.querySelector('.gnext')),
                        (this.overlay = d.querySelector('.goverlay')),
                        (this.loader = d.querySelector('.gloader')),
                        (this.slidesContainer = document.getElementById('glightbox-slider')),
                        (this.bodyHiddenChildElms = i),
                        (this.events = {}),
                        c(this.modal, 'glightbox-' + this.settings.skin),
                        this.settings.closeButton &&
                          g &&
                          (this.events.close = l('click', {
                            onElement: g,
                            withCallback: function (t, i) {
                              t.preventDefault(), e.close();
                            },
                          })),
                        g && !this.settings.closeButton && g.parentNode.removeChild(g),
                        this.nextButton &&
                          (this.events.next = l('click', {
                            onElement: this.nextButton,
                            withCallback: function (t, i) {
                              t.preventDefault(), e.nextSlide();
                            },
                          })),
                        this.prevButton &&
                          (this.events.prev = l('click', {
                            onElement: this.prevButton,
                            withCallback: function (t, i) {
                              t.preventDefault(), e.prevSlide();
                            },
                          })),
                        this.settings.closeOnOutsideClick &&
                          (this.events.outClose = l('click', {
                            onElement: d,
                            withCallback: function (t, i) {
                              e.preventOutsideClick ||
                                h(document.body, 'glightbox-mobile') ||
                                u(t.target, '.ginner-container') ||
                                u(t.target, '.gbtn') ||
                                h(t.target, 'gnext') ||
                                h(t.target, 'gprev') ||
                                e.close();
                            },
                          })),
                        o(this.elements, function (t, i) {
                          e.slidesContainer.appendChild(t.instance.create()),
                            (t.slideNode = e.slidesContainer.querySelectorAll('.gslide')[i]);
                        }),
                        J && c(document.body, 'glightbox-touch'),
                        (this.events.resize = l('resize', {
                          onElement: window,
                          withCallback: function () {
                            e.resize();
                          },
                        })),
                        (this.built = !0);
                    },
                  },
                  {
                    key: 'resize',
                    value: function () {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
                      if ((e = e || this.activeSlide) && !h(e, 'zoomed')) {
                        var t = y(),
                          i = e.querySelector('.gvideo-wrapper'),
                          n = e.querySelector('.gslide-image'),
                          s = this.slideDescription,
                          r = t.width,
                          o = t.height;
                        if (
                          (r <= 768 ? c(document.body, 'glightbox-mobile') : d(document.body, 'glightbox-mobile'),
                          i || n)
                        ) {
                          var a = !1;
                          if (
                            (s &&
                              (h(s, 'description-bottom') || h(s, 'description-top')) &&
                              !h(s, 'gabsolute') &&
                              (a = !0),
                            n)
                          )
                            if (r <= 768) n.querySelector('img');
                            else if (a) {
                              var l = s.offsetHeight,
                                u = n.querySelector('img');
                              u.setAttribute('style', 'max-height: calc(100vh - '.concat(l, 'px)')),
                                s.setAttribute('style', 'max-width: '.concat(u.offsetWidth, 'px;'));
                            }
                          if (i) {
                            var g = M(this.settings.plyr.config, 'ratio') ? this.settings.plyr.config.ratio : '';
                            if (!g) {
                              var f = i.clientWidth,
                                p = i.clientHeight,
                                v = f / p;
                              g = ''.concat(f / v, ':').concat(p / v);
                            }
                            var m = g.split(':'),
                              b = this.settings.videosWidth,
                              x = this.settings.videosWidth,
                              w =
                                (x =
                                  P(b) || -1 !== b.indexOf('px')
                                    ? parseInt(b)
                                    : -1 !== b.indexOf('vw')
                                    ? (r * parseInt(b)) / 100
                                    : -1 !== b.indexOf('vh')
                                    ? (o * parseInt(b)) / 100
                                    : -1 !== b.indexOf('%')
                                    ? (r * parseInt(b)) / 100
                                    : parseInt(i.clientWidth)) /
                                (parseInt(m[0]) / parseInt(m[1]));
                            if (((w = Math.floor(w)), a && (o -= s.offsetHeight), x > r || w > o || (o < w && r > x))) {
                              var S = i.offsetWidth,
                                T = i.offsetHeight,
                                E = o / T,
                                k = { width: S * E, height: T * E };
                              i.parentNode.setAttribute('style', 'max-width: '.concat(k.width, 'px')),
                                a && s.setAttribute('style', 'max-width: '.concat(k.width, 'px;'));
                            } else
                              (i.parentNode.style.maxWidth = ''.concat(b)),
                                a && s.setAttribute('style', 'max-width: '.concat(b, ';'));
                          }
                        }
                      }
                    },
                  },
                  {
                    key: 'reload',
                    value: function () {
                      this.init();
                    },
                  },
                  {
                    key: 'updateNavigationClasses',
                    value: function () {
                      var e = this.loop();
                      d(this.nextButton, 'disabled'),
                        d(this.prevButton, 'disabled'),
                        0 == this.index && this.elements.length - 1 == 0
                          ? (c(this.prevButton, 'disabled'), c(this.nextButton, 'disabled'))
                          : 0 !== this.index || e
                          ? this.index !== this.elements.length - 1 || e || c(this.nextButton, 'disabled')
                          : c(this.prevButton, 'disabled');
                    },
                  },
                  {
                    key: 'loop',
                    value: function () {
                      var e = M(this.settings, 'loopAtEnd') ? this.settings.loopAtEnd : null;
                      return M(this.settings, 'loop') ? this.settings.loop : e;
                    },
                  },
                  {
                    key: 'close',
                    value: function () {
                      var e = this;
                      if (!this.lightboxOpen) {
                        if (this.events) {
                          for (var t in this.events) this.events.hasOwnProperty(t) && this.events[t].destroy();
                          this.events = null;
                        }
                        return !1;
                      }
                      if (this.closing) return !1;
                      (this.closing = !0),
                        this.slidePlayerPause(this.activeSlide),
                        this.fullElementsList && (this.elements = this.fullElementsList),
                        this.bodyHiddenChildElms.length &&
                          o(this.bodyHiddenChildElms, function (e) {
                            e.removeAttribute('aria-hidden');
                          }),
                        c(this.modal, 'glightbox-closing'),
                        g(this.overlay, 'none' == this.settings.openEffect ? 'none' : this.settings.cssEfects.fade.out),
                        g(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, function () {
                          if (
                            ((e.activeSlide = null),
                            (e.prevActiveSlideIndex = null),
                            (e.prevActiveSlide = null),
                            (e.built = !1),
                            e.events)
                          ) {
                            for (var t in e.events) e.events.hasOwnProperty(t) && e.events[t].destroy();
                            e.events = null;
                          }
                          var i = document.body;
                          d(K, 'glightbox-open'),
                            d(
                              i,
                              'glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer'
                            ),
                            e.modal.parentNode.removeChild(e.modal),
                            e.trigger('close'),
                            T(e.settings.onClose) && e.settings.onClose();
                          var n = document.querySelector('.gcss-styles');
                          n && n.parentNode.removeChild(n), (e.lightboxOpen = !1), (e.closing = null);
                        });
                    },
                  },
                  {
                    key: 'destroy',
                    value: function () {
                      this.close(), this.clearAllEvents(), this.baseEvents && this.baseEvents.destroy();
                    },
                  },
                  {
                    key: 'on',
                    value: function (e, t) {
                      var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                      if (!e || !T(t)) throw new TypeError('Event name and callback must be defined');
                      this.apiEvents.push({ evt: e, once: i, callback: t });
                    },
                  },
                  {
                    key: 'once',
                    value: function (e, t) {
                      this.on(e, t, !0);
                    },
                  },
                  {
                    key: 'trigger',
                    value: function (e) {
                      var t = this,
                        i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                        n = [];
                      o(this.apiEvents, function (t, s) {
                        var r = t.evt,
                          o = t.once,
                          a = t.callback;
                        r == e && (a(i), o && n.push(s));
                      }),
                        n.length &&
                          o(n, function (e) {
                            return t.apiEvents.splice(e, 1);
                          });
                    },
                  },
                  {
                    key: 'clearAllEvents',
                    value: function () {
                      this.apiEvents.splice(0, this.apiEvents.length);
                    },
                  },
                  {
                    key: 'version',
                    value: function () {
                      return '3.1.0';
                    },
                  },
                ]),
                e
              );
            })();
          return function () {
            var e = new ee(arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {});
            return e.init(), e;
          };
        })();
      },
      666: function (e) {
        var t = (function (e) {
          'use strict';
          var t,
            i = Object.prototype,
            n = i.hasOwnProperty,
            s = 'function' == typeof Symbol ? Symbol : {},
            r = s.iterator || '@@iterator',
            o = s.asyncIterator || '@@asyncIterator',
            a = s.toStringTag || '@@toStringTag';
          function l(e, t, i) {
            return Object.defineProperty(e, t, { value: i, enumerable: !0, configurable: !0, writable: !0 }), e[t];
          }
          try {
            l({}, '');
          } catch (e) {
            l = function (e, t, i) {
              return (e[t] = i);
            };
          }
          function c(e, t, i, n) {
            var s = t && t.prototype instanceof v ? t : v,
              r = Object.create(s.prototype),
              o = new L(n || []);
            return (
              (r._invoke = (function (e, t, i) {
                var n = h;
                return function (s, r) {
                  if (n === g) throw new Error('Generator is already running');
                  if (n === f) {
                    if ('throw' === s) throw r;
                    return M();
                  }
                  for (i.method = s, i.arg = r; ; ) {
                    var o = i.delegate;
                    if (o) {
                      var a = k(o, i);
                      if (a) {
                        if (a === p) continue;
                        return a;
                      }
                    }
                    if ('next' === i.method) i.sent = i._sent = i.arg;
                    else if ('throw' === i.method) {
                      if (n === h) throw ((n = f), i.arg);
                      i.dispatchException(i.arg);
                    } else 'return' === i.method && i.abrupt('return', i.arg);
                    n = g;
                    var l = d(e, t, i);
                    if ('normal' === l.type) {
                      if (((n = i.done ? f : u), l.arg === p)) continue;
                      return { value: l.arg, done: i.done };
                    }
                    'throw' === l.type && ((n = f), (i.method = 'throw'), (i.arg = l.arg));
                  }
                };
              })(e, i, o)),
              r
            );
          }
          function d(e, t, i) {
            try {
              return { type: 'normal', arg: e.call(t, i) };
            } catch (e) {
              return { type: 'throw', arg: e };
            }
          }
          e.wrap = c;
          var h = 'suspendedStart',
            u = 'suspendedYield',
            g = 'executing',
            f = 'completed',
            p = {};
          function v() {}
          function m() {}
          function y() {}
          var b = {};
          l(b, r, function () {
            return this;
          });
          var x = Object.getPrototypeOf,
            w = x && x(x(I([])));
          w && w !== i && n.call(w, r) && (b = w);
          var S = (y.prototype = v.prototype = Object.create(b));
          function T(e) {
            ['next', 'throw', 'return'].forEach(function (t) {
              l(e, t, function (e) {
                return this._invoke(t, e);
              });
            });
          }
          function E(e, t) {
            function i(s, r, o, a) {
              var l = d(e[s], e, r);
              if ('throw' !== l.type) {
                var c = l.arg,
                  h = c.value;
                return h && 'object' == typeof h && n.call(h, '__await')
                  ? t.resolve(h.__await).then(
                      function (e) {
                        i('next', e, o, a);
                      },
                      function (e) {
                        i('throw', e, o, a);
                      }
                    )
                  : t.resolve(h).then(
                      function (e) {
                        (c.value = e), o(c);
                      },
                      function (e) {
                        return i('throw', e, o, a);
                      }
                    );
              }
              a(l.arg);
            }
            var s;
            this._invoke = function (e, n) {
              function r() {
                return new t(function (t, s) {
                  i(e, n, t, s);
                });
              }
              return (s = s ? s.then(r, r) : r());
            };
          }
          function k(e, i) {
            var n = e.iterator[i.method];
            if (n === t) {
              if (((i.delegate = null), 'throw' === i.method)) {
                if (e.iterator.return && ((i.method = 'return'), (i.arg = t), k(e, i), 'throw' === i.method)) return p;
                (i.method = 'throw'), (i.arg = new TypeError("The iterator does not provide a 'throw' method"));
              }
              return p;
            }
            var s = d(n, e.iterator, i.arg);
            if ('throw' === s.type) return (i.method = 'throw'), (i.arg = s.arg), (i.delegate = null), p;
            var r = s.arg;
            return r
              ? r.done
                ? ((i[e.resultName] = r.value),
                  (i.next = e.nextLoc),
                  'return' !== i.method && ((i.method = 'next'), (i.arg = t)),
                  (i.delegate = null),
                  p)
                : r
              : ((i.method = 'throw'),
                (i.arg = new TypeError('iterator result is not an object')),
                (i.delegate = null),
                p);
          }
          function C(e) {
            var t = { tryLoc: e[0] };
            1 in e && (t.catchLoc = e[1]),
              2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
              this.tryEntries.push(t);
          }
          function A(e) {
            var t = e.completion || {};
            (t.type = 'normal'), delete t.arg, (e.completion = t);
          }
          function L(e) {
            (this.tryEntries = [{ tryLoc: 'root' }]), e.forEach(C, this), this.reset(!0);
          }
          function I(e) {
            if (e) {
              var i = e[r];
              if (i) return i.call(e);
              if ('function' == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var s = -1,
                  o = function i() {
                    for (; ++s < e.length; ) if (n.call(e, s)) return (i.value = e[s]), (i.done = !1), i;
                    return (i.value = t), (i.done = !0), i;
                  };
                return (o.next = o);
              }
            }
            return { next: M };
          }
          function M() {
            return { value: t, done: !0 };
          }
          return (
            (m.prototype = y),
            l(S, 'constructor', y),
            l(y, 'constructor', m),
            (m.displayName = l(y, a, 'GeneratorFunction')),
            (e.isGeneratorFunction = function (e) {
              var t = 'function' == typeof e && e.constructor;
              return !!t && (t === m || 'GeneratorFunction' === (t.displayName || t.name));
            }),
            (e.mark = function (e) {
              return (
                Object.setPrototypeOf ? Object.setPrototypeOf(e, y) : ((e.__proto__ = y), l(e, a, 'GeneratorFunction')),
                (e.prototype = Object.create(S)),
                e
              );
            }),
            (e.awrap = function (e) {
              return { __await: e };
            }),
            T(E.prototype),
            l(E.prototype, o, function () {
              return this;
            }),
            (e.AsyncIterator = E),
            (e.async = function (t, i, n, s, r) {
              void 0 === r && (r = Promise);
              var o = new E(c(t, i, n, s), r);
              return e.isGeneratorFunction(i)
                ? o
                : o.next().then(function (e) {
                    return e.done ? e.value : o.next();
                  });
            }),
            T(S),
            l(S, a, 'Generator'),
            l(S, r, function () {
              return this;
            }),
            l(S, 'toString', function () {
              return '[object Generator]';
            }),
            (e.keys = function (e) {
              var t = [];
              for (var i in e) t.push(i);
              return (
                t.reverse(),
                function i() {
                  for (; t.length; ) {
                    var n = t.pop();
                    if (n in e) return (i.value = n), (i.done = !1), i;
                  }
                  return (i.done = !0), i;
                }
              );
            }),
            (e.values = I),
            (L.prototype = {
              constructor: L,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = t),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = 'next'),
                  (this.arg = t),
                  this.tryEntries.forEach(A),
                  !e)
                )
                  for (var i in this) 't' === i.charAt(0) && n.call(this, i) && !isNaN(+i.slice(1)) && (this[i] = t);
              },
              stop: function () {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ('throw' === e.type) throw e.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var i = this;
                function s(n, s) {
                  return (a.type = 'throw'), (a.arg = e), (i.next = n), s && ((i.method = 'next'), (i.arg = t)), !!s;
                }
                for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                  var o = this.tryEntries[r],
                    a = o.completion;
                  if ('root' === o.tryLoc) return s('end');
                  if (o.tryLoc <= this.prev) {
                    var l = n.call(o, 'catchLoc'),
                      c = n.call(o, 'finallyLoc');
                    if (l && c) {
                      if (this.prev < o.catchLoc) return s(o.catchLoc, !0);
                      if (this.prev < o.finallyLoc) return s(o.finallyLoc);
                    } else if (l) {
                      if (this.prev < o.catchLoc) return s(o.catchLoc, !0);
                    } else {
                      if (!c) throw new Error('try statement without catch or finally');
                      if (this.prev < o.finallyLoc) return s(o.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (e, t) {
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var s = this.tryEntries[i];
                  if (s.tryLoc <= this.prev && n.call(s, 'finallyLoc') && this.prev < s.finallyLoc) {
                    var r = s;
                    break;
                  }
                }
                r && ('break' === e || 'continue' === e) && r.tryLoc <= t && t <= r.finallyLoc && (r = null);
                var o = r ? r.completion : {};
                return (
                  (o.type = e),
                  (o.arg = t),
                  r ? ((this.method = 'next'), (this.next = r.finallyLoc), p) : this.complete(o)
                );
              },
              complete: function (e, t) {
                if ('throw' === e.type) throw e.arg;
                return (
                  'break' === e.type || 'continue' === e.type
                    ? (this.next = e.arg)
                    : 'return' === e.type
                    ? ((this.rval = this.arg = e.arg), (this.method = 'return'), (this.next = 'end'))
                    : 'normal' === e.type && t && (this.next = t),
                  p
                );
              },
              finish: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var i = this.tryEntries[t];
                  if (i.finallyLoc === e) return this.complete(i.completion, i.afterLoc), A(i), p;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var i = this.tryEntries[t];
                  if (i.tryLoc === e) {
                    var n = i.completion;
                    if ('throw' === n.type) {
                      var s = n.arg;
                      A(i);
                    }
                    return s;
                  }
                }
                throw new Error('illegal catch attempt');
              },
              delegateYield: function (e, i, n) {
                return (
                  (this.delegate = { iterator: I(e), resultName: i, nextLoc: n }),
                  'next' === this.method && (this.arg = t),
                  p
                );
              },
            }),
            e
          );
        })(e.exports);
        try {
          regeneratorRuntime = t;
        } catch (e) {
          'object' == typeof globalThis
            ? (globalThis.regeneratorRuntime = t)
            : Function('r', 'regeneratorRuntime = r')(t);
        }
      },
    },
    t = {};
  function i(n) {
    var s = t[n];
    if (void 0 !== s) return s.exports;
    var r = (t[n] = { exports: {} });
    return e[n].call(r.exports, r, r.exports, i), r.exports;
  }
  (i.n = function (e) {
    var t =
      e && e.__esModule
        ? function () {
            return e.default;
          }
        : function () {
            return e;
          };
    return i.d(t, { a: t }), t;
  }),
    (i.d = function (e, t) {
      for (var n in t) i.o(t, n) && !i.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }),
    (i.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (function () {
      'use strict';
      function e(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var i = 0, n = new Array(t); i < t; i++) n[i] = e[i];
        return n;
      }
      function t(t, i) {
        return (
          (function (e) {
            if (Array.isArray(e)) return e;
          })(t) ||
          (function (e, t) {
            var i = null == e ? null : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
            if (null != i) {
              var n,
                s,
                r = [],
                o = !0,
                a = !1;
              try {
                for (i = i.call(e); !(o = (n = i.next()).done) && (r.push(n.value), !t || r.length !== t); o = !0);
              } catch (e) {
                (a = !0), (s = e);
              } finally {
                try {
                  o || null == i.return || i.return();
                } finally {
                  if (a) throw s;
                }
              }
              return r;
            }
          })(t, i) ||
          (function (t, i) {
            if (t) {
              if ('string' == typeof t) return e(t, i);
              var n = Object.prototype.toString.call(t).slice(8, -1);
              return (
                'Object' === n && t.constructor && (n = t.constructor.name),
                'Map' === n || 'Set' === n
                  ? Array.from(t)
                  : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                  ? e(t, i)
                  : void 0
              );
            }
          })(t, i) ||
          (function () {
            throw new TypeError(
              'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            );
          })()
        );
      }
      function n(e) {
        return (
          (n =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          n(e)
        );
      }
      function s(e, t, i, n, s, r, o) {
        try {
          var a = e[r](o),
            l = a.value;
        } catch (e) {
          return void i(e);
        }
        a.done ? t(l) : Promise.resolve(l).then(n, s);
      }
      function r(e) {
        return function () {
          var t = this,
            i = arguments;
          return new Promise(function (n, r) {
            var o = e.apply(t, i);
            function a(e) {
              s(o, n, r, a, l, 'next', e);
            }
            function l(e) {
              s(o, n, r, a, l, 'throw', e);
            }
            a(void 0);
          });
        };
      }
      var o = i(757),
        a = i.n(o),
        l =
          (i(727),
          function (e, i) {
            var n = 1 / 0,
              s = -1 / 0,
              r = 1 / 0,
              o = -1 / 0,
              a = 1 / 0,
              l = -1 / 0;
            return (
              (e.features = e.features.map(function (e) {
                var c,
                  d = e.properties.codigo;
                if (
                  (i.find(function (e) {
                    var t = e.municipios.find(function (e) {
                      return e.mun === d;
                    });
                    return !!t && ((c = t), !0);
                  }),
                  e.geometry.coordinates.forEach(function (e) {
                    e.forEach(function (e) {
                      var i = t(e, 2),
                        n = i[0],
                        s = i[1];
                      (a = a > n ? n : a), (l = l < n ? n : l), (r = r > s ? s : r), (o = o < s ? s : o);
                    });
                  }),
                  c)
                ) {
                  for (var h in c.agregados) {
                    var u = c.agregados[h][2];
                    (n = n > u ? u : n), (s = s < u ? u : s);
                  }
                  e.datos = c.agregados;
                }
                return e;
              })),
              {
                municipios: e,
                porcentajeMin: n,
                porcentajeMax: s,
                latitudMin: r,
                latitudMax: o,
                longitudMin: a,
                longitudMax: l,
              }
            );
          }),
        c = function (e, i) {
          var n = 1 / 0,
            s = -1 / 0,
            r = 1 / 0,
            o = -1 / 0,
            a = 1 / 0,
            l = -1 / 0;
          return (
            (e.features = e.features.map(function (e) {
              var c = e.properties.codigo,
                d = i.find(function (e) {
                  return c === e.dep;
                });
              if (
                (e.geometry.coordinates.forEach(function (e) {
                  e.forEach(function (e) {
                    var i = t(e, 2),
                      n = i[0],
                      s = i[1];
                    (a = a > n ? n : a), (l = l < n ? n : l), (r = r > s ? s : r), (o = o < s ? s : o);
                  });
                }),
                d)
              ) {
                for (var h in d.agregados) {
                  var u = d.agregados[h][2];
                  (n = n > u ? u : n), (s = s < u ? u : s);
                }
                e.datos = d.agregados;
              }
              return e;
            })),
            {
              departamentos: e,
              porcentajeMin: n,
              porcentajeMax: s,
              latitudMin: r,
              latitudMax: o,
              longitudMin: a,
              longitudMax: l,
            }
          );
        };
      const d = (e, t, i, n, s) => ((e - t) * (s - n)) / (i - t) + n;
      var h,
        u,
        g = Math.PI / 4,
        f = function (e) {
          return (e * Math.PI) / 180;
        },
        p = function (e) {
          return Math.log(Math.tan(e / 2 + g));
        },
        v = function (e) {
          3 === (e = e.includes('#') ? e.replace('#', '') : e).length && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
            6 != e.length && console.log('No se puede convertir el color '.concat(e));
          var i = t(e.match(/.{1,2}/g), 3),
            n = i[0],
            s = i[1],
            r = i[2];
          return [parseInt(n, 16), parseInt(s, 16), parseInt(r, 16)];
        },
        m = function (e, i, n, s) {
          var r = t(v(n), 3),
            o = r[0],
            a = r[1],
            l = r[2],
            c = t(v(s), 3),
            h = c[0],
            u = c[1],
            g = c[2];
          return function (t) {
            var n = d(t, e, i, o, h),
              s = d(t, e, i, a, u),
              r = d(t, e, i, l, g);
            return 'rgb('.concat(n, ',').concat(s, ',').concat(r, ')');
          };
        },
        y = function (e, i, n, s) {
          var r = f(e),
            o = f(i),
            a = f(s),
            l = f(n),
            c = p(r),
            d = p(o);
          return function (e, i, n) {
            var s = t(e, 2),
              r = s[0],
              o = s[1],
              h = f(o),
              u = f(r),
              g = n / (d - c);
            return { x: (i / (a - l)) * (u - l), y: (d - p(h)) * g };
          };
        },
        b = {
          'muerte fetoinfantil': {
            descripcion: 'Muerte fetoinfantil',
            nombreArchivo: 'muerte-fetoinfantil',
            notas: '',
          },
          'nacidos vivos bajo peso': {
            descripcion: 'Porcentaje de nacidos vivos a término con bajo peso al nacer',
            nombreArchivo: 'nacidos-bajo-peso',
            notas: '',
          },
          'nacidos vivos < 4 cp': {
            descripcion: 'Porcentaje de nacidos vivos con cuatro o más consultas de control prenatal',
            nombreArchivo: 'nacidos-vivos-4-cp',
            notas: '',
          },
          'nacidos padres 4 años >': {
            descripcion:
              'Porcentaje de nacidos vivos de mujeres entre 15 a 18 años donde el padre es mayor 4 o más años de edad',
            nombreArchivo: 'nacidos-padres-4',
            notas: '',
          },
          'nacidos < 15 padres 4 años >': {
            descripcion:
              'Porcentaje de nacidos vivos de mujeres menores de 15 años donde el padre es mayor 4 o más años de edad',
            nombreArchivo: 'nacidos-15-padres-4',
            notas: '',
          },
          'partos atendidos personal calif': {
            descripcion: 'Porcentaje de partos atendidos por personal calificado',
            nombreArchivo: 'partos-personal-calif',
            notas: '',
          },
          partos: { descripcion: 'Porcentaje de partos institucionales', nombreArchivo: 'partos', notas: '' },
          'partos por cesarea': {
            descripcion: 'Porcentaje de partos por cesárea',
            nombreArchivo: 'partos-cesarea',
            notas: '',
          },
          'nacidos de <14': {
            descripcion: 'Porporción de nacidos vivos hijos de mujeres menores de 14 años',
            nombreArchivo: 'nacidos-14',
            notas: '',
          },
          'controles prenatales': {
            descripcion: 'Promedio de controles prenatales',
            nombreArchivo: 'controles-prenatales',
            notas: '',
          },
          'nacidos de 14 a 17': {
            descripcion: 'Proporción de nacidos vivos hijos de mujeres de 14 a 17 años',
            nombreArchivo: 'nacidos-14-17',
            notas: '',
          },
          'nacidos de 18 a 26': {
            descripcion: 'Proporción de nacidos vivos hijos de mujeres de 18 a 26 años',
            nombreArchivo: 'nacidos-18-26',
            notas: '',
          },
          'mortalidad materna 1 año': {
            descripcion: 'Razón de mortalidad materna a 1 año',
            nombreArchivo: 'mortalidad-materna-1',
            notas: '',
          },
          'mortalidad materna 42 dias': {
            descripcion: 'Razón de mortalidad materna a 42 días',
            nombreArchivo: 'mortalidad-materna-42',
            notas: '',
          },
          'fecundidad 10 a 14': {
            descripcion: 'Tasa de fecundidad específica en mujeres de 10 a 14 años',
            nombreArchivo: 'fecundidad-10-14',
            notas: '',
          },
          'fecundidad 10 a 19': {
            descripcion: 'Tasa de fecundidad específica en mujeres de 10 a 19 años',
            nombreArchivo: 'fecundidad-10-19',
            notas: '',
          },
          'fecundidad 15 a 19': {
            descripcion: 'Tasa de fecundidad específica en mujeres de 15 a 19 años',
            nombreArchivo: 'fecundidad-15-19',
            notas: '',
          },
          'mortalidad menores de 5 años': {
            descripcion: 'Tasa de mortalidad en la niñez (menores de 5 años de edad)',
            nombreArchivo: 'mortalidad-menores-5',
            notas: '',
          },
          'mortalidad menores de 1 año': {
            descripcion: 'Tasa de mortalidad en la niñez (menores de un año de edad)',
            nombreArchivo: 'mortalidad-menores-1',
            notas: '',
          },
          'mortalidad < 5 eda': {
            descripcion: 'Tasa de mortalidad en niños menores de 5 años por enfermedad diarreica aguda',
            nombreArchivo: 'mortalidad-5-eda',
            notas: '',
          },
          'mortalidad <5 era': {
            descripcion: 'Tasa de mortalidad en niños menores de 5 años por infección respiratoria aguda',
            nombreArchivo: 'mortalidad-5-era',
            notas: '',
          },
          'mortalidad fetal': { descripcion: 'tasa de mortalidad fetal', nombreArchivo: 'mortalidad-fetal', notas: '' },
          'mortalidad neonatal': {
            descripcion: 'Tasa de mortalidad neonatal',
            nombreArchivo: 'mortalidad-neonatal',
            notas: '',
          },
          'mortalidad neonatal tardia': {
            descripcion: 'Tasa de mortalidad neonatal tardía',
            nombreArchivo: 'mortalidad-neonatal-tardia',
            notas: '',
          },
          'mortalidad neonatal temprana': {
            descripcion: 'Tasa de mortalidad neonatal temprana',
            nombreArchivo: 'mortalidad-neonatal-temprana',
            notas: '',
          },
          'mortalidad perinatal': {
            descripcion: 'tasa de mortalidad perinatal',
            nombreArchivo: 'mortalidad-perinatal',
            notas: '',
          },
          'mortalidad desnutricion <5': {
            descripcion: 'Tasa de mortalidad por desnutrición en menores de 5 años',
            nombreArchivo: 'mortalidad-neonatal',
            notas: '',
          },
          'mortalidad postneonatal': {
            descripcion: 'tasa de mortalidad postneonatal',
            nombreArchivo: 'mortalidad-postneonatal',
            notas: '',
          },
        },
        x = document.getElementById('menu'),
        w = document.getElementById('menuDeptos'),
        S = document.getElementById('contenedorMapaDeptos'),
        T = document.getElementById('contenedorMapaMun'),
        E = document.getElementById('informacion'),
        k = E.querySelector('#municipio'),
        C = E.querySelector('#numerador'),
        A = E.querySelector('#denominador'),
        L = E.querySelector('#porcentaje'),
        I = document.getElementById('descripcionIndicador'),
        M = document.getElementById('descripcionIndicadorDeptos'),
        O = 0,
        P = 0,
        N = '';
      function z(e) {
        return j.apply(this, arguments);
      }
      function j() {
        return (j = r(
          a().mark(function e(t) {
            var i;
            return a().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), fetch('https://juanca.ml/mi/'.concat(t, '.json'));
                  case 2:
                    return (i = e.sent), (e.next = 5), i.json();
                  case 5:
                    return e.abrupt('return', e.sent);
                  case 6:
                  case 'end':
                    return e.stop();
                }
            }, e);
          })
        )).apply(this, arguments);
      }
      function X() {
        return (X = r(
          a().mark(function e() {
            var t, i, n, s, r, o, d, g, f, p, v, x, w, S;
            return a().wrap(function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (e.next = 2), z('municipios');
                  case 2:
                    return (t = e.sent), (e.next = 5), z('departamentos');
                  case 5:
                    return (
                      (i = e.sent),
                      (n = Object.keys(b)[2]),
                      (I.innerText = b[n].descripcion),
                      (M.innerText = b[n].descripcion),
                      (e.next = 11),
                      z(n)
                    );
                  case 11:
                    (s = e.sent),
                      (r = c(i, s)),
                      (o = r.departamentos),
                      (d = r.porcentajeMin),
                      (g = r.porcentajeMax),
                      (f = r.latitudMin),
                      (p = r.latitudMax),
                      (v = r.longitudMin),
                      (x = r.longitudMax),
                      (w = l(t, s)),
                      (S = w.municipios),
                      Y(Object.keys(s[0].agregados), S),
                      q(Object.keys(s[0].agregados), o),
                      (h = m(d, g, '#BEEFED', '#0042BF')),
                      (u = y(f, p, v, x)),
                      B(f, p, v, x),
                      D(S, 'municipios'),
                      D(o, 'departamentos'),
                      window.addEventListener('resize', function () {
                        B(f, p, v, x), D(S, 'municipios'), D(o, 'departamentos');
                      });
                  case 22:
                  case 'end':
                    return e.stop();
                }
            }, e);
          })
        )).apply(this, arguments);
      }
      function q(e, t) {
        e.forEach(function (i) {
          var n = document.createElement('span');
          (n.className = 'boton'),
            (n.innerText = i),
            i === e[0] && (n.classList.add('seleccionado'), (N = i)),
            (n.onclick = function () {
              var e = document.querySelector('.seleccionado');
              e.innerText !== i &&
                (e.classList.remove('seleccionado'),
                n.classList.add('seleccionado'),
                (N = i),
                (S.innerHTML = ''),
                D(t, 'departamentos'));
            }),
            w.appendChild(n);
        });
      }
      function Y(e, t) {
        e.forEach(function (e) {
          var i = document.createElement('span');
          (i.className = 'boton'),
            (i.innerText = e),
            (i.onclick = function () {
              var n = document.querySelector('.seleccionado');
              n.innerText !== e &&
                (n.classList.remove('seleccionado'),
                i.classList.add('seleccionado'),
                (N = e),
                (T.innerHTML = ''),
                D(t, 'municipios'));
            }),
            x.appendChild(i);
        });
      }
      function _(e, t) {
        var i = u(e, O, P);
        return ''.concat(t).concat(i.x, ' ').concat(i.y, ' ');
      }
      function D(e, i) {
        e.features.forEach(function (e) {
          var s,
            r,
            o = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          if (
            (o.setAttributeNS(
              null,
              'd',
              ((s = e.geometry.coordinates),
              (r = ''),
              s.forEach(function (e) {
                e.forEach(function (t, i) {
                  var s = 0 === i ? 'M' : 'L';
                  'object' === n(t[0])
                    ? t.forEach(function (e) {
                        r += _(e, s);
                      })
                    : (r += _(t, s)),
                    (r += i === e.length - 1 ? 'Z' : '');
                });
              }),
              r)
            ),
            e.datos && e.datos[N])
          ) {
            var a = t(e.datos[N], 3),
              l = a[0],
              c = a[1],
              d = a[2],
              u = h(d);
            o.setAttributeNS(null, 'fill', u),
              (o.onmouseenter = function () {
                (E.style.opacity = 1),
                  (k.innerText = e.properties.nombre),
                  (C.innerText = l),
                  (A.innerText = c),
                  (L.innerText = ''.concat(d.toFixed(2), '%'));
              }),
              (o.onmouseout = function () {
                E.style.opacity = 0;
              }),
              'departamentos' === i && S.appendChild(o),
              'municipios' === i && T.appendChild(o);
          }
        });
      }
      !(function () {
        X.apply(this, arguments);
      })();
      var B = function (e, t, i, n) {
        (O = window.innerWidth), (P = window.innerHeight / 1.4);
        var s = n - i,
          r = t - e;
        s > r ? (P = O * (r / s)) : (O = P * (s / r)),
          (O |= 0),
          (P |= 0),
          T.setAttributeNS(null, 'width', O),
          T.setAttributeNS(null, 'height', P),
          S.setAttributeNS(null, 'width', O),
          S.setAttributeNS(null, 'height', P),
          (T.innerHTML = ''),
          (S.innerHTML = '');
      };
      (T.onmousemove = function (e) {
        Object.assign(E.style, { top: ''.concat(e.pageY, 'px'), left: ''.concat(e.pageX, 'px') });
      }),
        (S.onmousemove = function (e) {
          Object.assign(E.style, { top: ''.concat(e.pageY, 'px'), left: ''.concat(e.pageX, 'px') });
        });
    })();
})();
