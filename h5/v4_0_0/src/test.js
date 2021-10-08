define("utils/DebugUtils", ["require", "exports", "module"], function (e, t, n) {
  "use strict";
  function u(e, t) {
    for (var n = []; t > 0; n[--t] = e)
      ;
    return n.join("")
  }
  var r = {};
  r.log = function () {
    console.log.apply(console, arguments)
  }
    ;
  var i = null;
  r.browserPrefixes = function () {
    if (null !== i)
      return i;
    var e = window.getComputedStyle(document.documentElement, "")
      , t = Array.prototype.slice.call(e).join("").match(/-(moz|webkit|ms)-/);
    t = t || e.OLink === "" && ["", "o"],
      t = t[1];
    var n = "WebKit|Moz|MS|O".match(new RegExp("(" + t + ")", "i"))[1];
    return i = {
      dom: n,
      lowercase: t,
      css: "-" + t + "-",
      js: t[0].toUpperCase() + t.substr(1)
    }
  }
    ;
  var s = null;
  r.isTouchDevice = function () {
    if (null === s)
      if (window.GlobalData.isMicroApp)
        s = !0;
      else if (window.GlobalData.forceTouch)
        s = !0;
      else if (document.documentElement.ontouchstart)
        s = !0;
      else {
        var e = navigator.userAgent.toLowerCase();
        s = e.match(/(iphone|ipod|ipad)/) || e.match(/(android)/) || e.match(/(iemobile)/) || e.match(/iphone/i) || e.match(/ipad/i) || e.match(/ipod/i) || e.match(/blackberry/i) || e.match(/bada/i),
          s !== null ? s = !0 : s = !1
      }
    return s
  }
    ;
  var o = null;
  r.isAndroidDevice = function () {
    if (null === o) {
      var e = navigator.userAgent.toLowerCase();
      o = e.match(/(android)/),
        o !== null ? o = !0 : o = !1
    }
    return o
  }
    ,
    r.hasOverflowBug = function () {
      return r.isAndroidDevice() && !r.isWeiXin()
    }
    ,
    r.sprintf = function () {
      var e = 0, t, n = arguments[e++], i = [], s, o, a, f, l = "";
      while (n) {
        if (s = /^[^\x25]+/.exec(n))
          i.push(s[0]);
        else if (s = /^\x25{2}/.exec(n))
          i.push("%");
        else {
          if (!(s = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(n)))
            throw "Huh ?!";
          if ((t = arguments[s[1] || e++]) === null || t === undefined)
            t = 0,
              r.log("Too few arguments. make do with 0 here.");
          /[^s]/.test(s[7]) && typeof t != "number";
          switch (s[7]) {
            case "b":
              t = t.toString(2);
              break;
            case "c":
              t = String.fromCharCode(t);
              break;
            case "d":
              t = parseInt(t);
              break;
            case "e":
              t = s[6] ? t.toExponential(s[6]) : t.toExponential();
              break;
            case "f":
              t = s[6] ? parseFloat(t).toFixed(s[6]) : parseFloat(t);
              break;
            case "o":
              t = t.toString(8);
              break;
            case "s":
              t = (t = String(t)) && s[6] ? t.substring(0, s[6]) : t;
              break;
            case "u":
              t = Math.abs(t);
              break;
            case "x":
              t = t.toString(16);
              break;
            case "X":
              t = t.toString(16).toUpperCase()
          }
          t = /[def]/.test(s[7]) && s[2] && t >= 0 ? "+" + t : t,
            a = s[3] ? s[3] === "0" ? "0" : s[3].charAt(1) : " ",
            f = s[5] - String(t).length - l.length,
            o = s[5] ? u(a, f) : "",
            i.push(l + (s[4] ? t + o : o + t))
        }
        n = n.substring(s[0].length)
      }
      return i.join("")
    }
    ,
    r.valueOrDefault = function (e, t) {
      return t ? e !== undefined ? e : t : e || t
    }
    ;
  var a = null;
  r.gestureMovingSet = function (e) {
    a = e
  }
    ,
    r.isGestureMovingRefuse = function (e) {
      return e ? null !== a && e !== a : null !== a
    }
    ;
  var f = !1;
  r.setIsTouchDown = function (e) {
    f = e
  }
    ,
    r.isTouchDown = function () {
      return f
    }
    ;
  var l = !1;
  r.setIsRangePagingRefuse = function (e) {
    l = e
  }
    ,
    r.isRangePagingRefuse = function () {
      return l
    }
    ,
    r.getCurrentUrlParam = function (e) {
      if (!e)
        return undefined;
      e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var t = "[\\?&]" + e + "=([^&#]*)"
        , n = new RegExp(t)
        , r = n.exec(window.location.href);
      return r === null ? undefined : r[1]
    }
    ,
    r.isWeiXin = function () {
      return navigator.userAgent.indexOf("MicroMessenger") >= 0
    }
    ,
    r.isWeiXinReady = function () {
      return typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function"
    }
    ,
    r.isInIframe = function () {
      try {
        return window.self !== window.top
      } catch (e) {
        return !0
      }
    }
    ,
    r.isNativeApp = function () {
      return navigator.userAgent.indexOf("MciCellzApp") >= 0
    }
    ,
    r.checkURL = function (e) {
      return e ? e.match(/^(http[s]?|ftp|wxfile):\/\/.*$/i) === null ? !1 : !0 : !1
    }
    ,
    r.normalizeUrl = function (e) {
      return r.checkURL(e) || (!e || e.length <= 0 ? e = "" : e.indexOf("data:") === -1 && (e = window.GlobalData.homePath + "zres/" + e)),
        e
    }
    ,
    r.rgba2ColorString = function (e) {
      if (!e)
        return "rgba(0, 0, 0, 0)";
      if ((e & 255) === 255) {
        var t = (e >> 8 & 16777215).toString(16).toUpperCase();
        return "#" + "000000".substr(0, 6 - t.length) + t
      }
      return "rgba(" + (e >> 24 & 255) + "," + (e >> 16 & 255) + "," + (e >> 8 & 255) + "," + ((e & 255) * 1 / 255 + "").substr(0, 4) + ")"
    }
    ,
    r.rgba2ColorArray = function (e, t) {
      if (!e)
        return [0, 0, 0, 0];
      var n = e >> 24 & 255
        , r = e >> 16 & 255
        , i = e >> 8 & 255
        , s = e >> 0 & 255;
      return t ? [n / 255, r / 255, i / 255, s / 255] : [n, r, i, s]
    }
    ,
    r.requestFullscreen = function (e) {
      if (!e)
        return !1;
      var t = e instanceof HTMLElement ? e : document.documentElement
        , n = t.requestFullscreen || t.webkitRequestFullscreen || t.mozRequestFullScreen || t.msRequestFullscreen;
      return n ? (n.call(t),
        !0) : !1
    }
    ,
    r.fullscreenEnabled = function () {
      return document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled
    }
    ,
    r.fullscreenElement = function () {
      return document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement || document.mozFullScreenElement
    }
    ,
    r.mediaPlay = function (e) {
      if (r.isWeiXin() && !r.isAndroidDevice()) {
        if (r.isWeiXinReady()) {
          var t = function () {
            var t = e.play();
            t !== undefined && t.catch(function (e) { })
          };
          wx.getNetworkType({
            success: t,
            fail: t
          })
        }
      } else {
        var n = e.play();
        n !== undefined && n.catch(function (e) { })
      }
    }
    ,
    r.mergeOptionsInto = function (e, t) {
      for (var n in e)
        t[n] = e[n]
    }
    ;
  var c = {};
  r.setConfigValueForKey = function (e, t) {
    c[t] = e
  }
    ,
    r.configValueForKey = function (e) {
      return c[e]
    }
    ,
    n.exports = r
}),
  define("famous/core/Entity", ["require", "exports", "module"], function (e, t, n) {
    function i(e) {
      return r[e]
    }
    function s(e, t) {
      r[e] = t
    }
    function o(e) {
      var t = r.length;
      return s(t, e),
        t
    }
    function u(e) {
      s(e, null)
    }
    var r = [];
    n.exports = {
      register: o,
      unregister: u,
      get: i,
      set: s
    }
  }),
  define("famous/core/Transform", ["require", "exports", "module"], function (e, t, n) {
    function i(e) {
      return e.length === 2 ? e[0] * e[0] + e[1] * e[1] : e[0] * e[0] + e[1] * e[1] + e[2] * e[2]
    }
    function s(e) {
      return Math.sqrt(i(e))
    }
    function o(e) {
      return e < 0 ? -1 : 1
    }
    var r = {};
    r.precision = 1e-6,
      r.identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      r.multiply4x4 = function (t, n) {
        return [t[0] * n[0] + t[4] * n[1] + t[8] * n[2] + t[12] * n[3], t[1] * n[0] + t[5] * n[1] + t[9] * n[2] + t[13] * n[3], t[2] * n[0] + t[6] * n[1] + t[10] * n[2] + t[14] * n[3], t[3] * n[0] + t[7] * n[1] + t[11] * n[2] + t[15] * n[3], t[0] * n[4] + t[4] * n[5] + t[8] * n[6] + t[12] * n[7], t[1] * n[4] + t[5] * n[5] + t[9] * n[6] + t[13] * n[7], t[2] * n[4] + t[6] * n[5] + t[10] * n[6] + t[14] * n[7], t[3] * n[4] + t[7] * n[5] + t[11] * n[6] + t[15] * n[7], t[0] * n[8] + t[4] * n[9] + t[8] * n[10] + t[12] * n[11], t[1] * n[8] + t[5] * n[9] + t[9] * n[10] + t[13] * n[11], t[2] * n[8] + t[6] * n[9] + t[10] * n[10] + t[14] * n[11], t[3] * n[8] + t[7] * n[9] + t[11] * n[10] + t[15] * n[11], t[0] * n[12] + t[4] * n[13] + t[8] * n[14] + t[12] * n[15], t[1] * n[12] + t[5] * n[13] + t[9] * n[14] + t[13] * n[15], t[2] * n[12] + t[6] * n[13] + t[10] * n[14] + t[14] * n[15], t[3] * n[12] + t[7] * n[13] + t[11] * n[14] + t[15] * n[15]]
      }
      ,
      r.multiply = function (t, n) {
        return [t[0] * n[0] + t[4] * n[1] + t[8] * n[2], t[1] * n[0] + t[5] * n[1] + t[9] * n[2], t[2] * n[0] + t[6] * n[1] + t[10] * n[2], 0, t[0] * n[4] + t[4] * n[5] + t[8] * n[6], t[1] * n[4] + t[5] * n[5] + t[9] * n[6], t[2] * n[4] + t[6] * n[5] + t[10] * n[6], 0, t[0] * n[8] + t[4] * n[9] + t[8] * n[10], t[1] * n[8] + t[5] * n[9] + t[9] * n[10], t[2] * n[8] + t[6] * n[9] + t[10] * n[10], 0, t[0] * n[12] + t[4] * n[13] + t[8] * n[14] + t[12], t[1] * n[12] + t[5] * n[13] + t[9] * n[14] + t[13], t[2] * n[12] + t[6] * n[13] + t[10] * n[14] + t[14], 1]
      }
      ,
      r.thenMove = function (t, n) {
        return n[2] || (n[2] = 0),
          [t[0], t[1], t[2], 0, t[4], t[5], t[6], 0, t[8], t[9], t[10], 0, t[12] + n[0], t[13] + n[1], t[14] + n[2], 1]
      }
      ,
      r.moveThen = function (t, n) {
        t[2] || (t[2] = 0);
        var i = t[0] * n[0] + t[1] * n[4] + t[2] * n[8]
          , s = t[0] * n[1] + t[1] * n[5] + t[2] * n[9]
          , o = t[0] * n[2] + t[1] * n[6] + t[2] * n[10];
        return r.thenMove(n, [i, s, o])
      }
      ,
      r.translate = function (t, n, r) {
        return r === undefined && (r = 0),
          [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, n, r, 1]
      }
      ,
      r.thenScale = function (t, n) {
        return [n[0] * t[0], n[1] * t[1], n[2] * t[2], 0, n[0] * t[4], n[1] * t[5], n[2] * t[6], 0, n[0] * t[8], n[1] * t[9], n[2] * t[10], 0, n[0] * t[12], n[1] * t[13], n[2] * t[14], 1]
      }
      ,
      r.scale = function (t, n, r) {
        return r === undefined && (r = 1),
          n === undefined && (n = t),
          [t, 0, 0, 0, 0, n, 0, 0, 0, 0, r, 0, 0, 0, 0, 1]
      }
      ,
      r.rotateX = function (t) {
        var n = Math.cos(t)
          , r = Math.sin(t);
        return [1, 0, 0, 0, 0, n, r, 0, 0, -r, n, 0, 0, 0, 0, 1]
      }
      ,
      r.rotateY = function (t) {
        var n = Math.cos(t)
          , r = Math.sin(t);
        return [n, 0, -r, 0, 0, 1, 0, 0, r, 0, n, 0, 0, 0, 0, 1]
      }
      ,
      r.rotateZ = function (t) {
        var n = Math.cos(t)
          , r = Math.sin(t);
        return [n, r, 0, 0, -r, n, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
      }
      ,
      r.rotate = function (t, n, r) {
        var i = Math.cos(t)
          , s = Math.sin(t)
          , o = Math.cos(n)
          , u = Math.sin(n)
          , a = Math.cos(r)
          , f = Math.sin(r)
          , l = [o * a, i * f + s * u * a, s * f - i * u * a, 0, -o * f, i * a - s * u * f, s * a + i * u * f, 0, u, -s * o, i * o, 0, 0, 0, 0, 1];
        return l
      }
      ,
      r.rotateAxis = function (t, n) {
        var r = Math.sin(n)
          , i = Math.cos(n)
          , s = 1 - i
          , o = t[0] * t[0] * s
          , u = t[0] * t[1] * s
          , a = t[0] * t[2] * s
          , f = t[1] * t[1] * s
          , l = t[1] * t[2] * s
          , c = t[2] * t[2] * s
          , h = t[0] * r
          , p = t[1] * r
          , d = t[2] * r
          , v = [o + i, u + d, a - p, 0, u - d, f + i, l + h, 0, a + p, l - h, c + i, 0, 0, 0, 0, 1];
        return v
      }
      ,
      r.aboutOrigin = function (t, n) {
        var i = t[0] - (t[0] * n[0] + t[1] * n[4] + t[2] * n[8])
          , s = t[1] - (t[0] * n[1] + t[1] * n[5] + t[2] * n[9])
          , o = t[2] - (t[0] * n[2] + t[1] * n[6] + t[2] * n[10]);
        return r.thenMove(n, [i, s, o])
      }
      ,
      r.skew = function (t, n, r) {
        return [1, Math.tan(n), 0, 0, Math.tan(r), 1, 0, 0, 0, Math.tan(t), 1, 0, 0, 0, 0, 1]
      }
      ,
      r.skewX = function (t) {
        return [1, 0, 0, 0, Math.tan(t), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
      }
      ,
      r.skewY = function (t) {
        return [1, Math.tan(t), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
      }
      ,
      r.perspective = function (t) {
        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -1 / t, 0, 0, 0, 1]
      }
      ,
      r.getTranslate = function (t) {
        return [t[12], t[13], t[14]]
      }
      ,
      r.inverse = function (t) {
        var n = t[5] * t[10] - t[6] * t[9]
          , r = t[4] * t[10] - t[6] * t[8]
          , i = t[4] * t[9] - t[5] * t[8]
          , s = t[1] * t[10] - t[2] * t[9]
          , o = t[0] * t[10] - t[2] * t[8]
          , u = t[0] * t[9] - t[1] * t[8]
          , a = t[1] * t[6] - t[2] * t[5]
          , f = t[0] * t[6] - t[2] * t[4]
          , l = t[0] * t[5] - t[1] * t[4]
          , c = t[0] * n - t[1] * r + t[2] * i
          , h = 1 / c
          , p = [h * n, -h * s, h * a, 0, -h * r, h * o, -h * f, 0, h * i, -h * u, h * l, 0, 0, 0, 0, 1];
        return p[12] = -t[12] * p[0] - t[13] * p[4] - t[14] * p[8],
          p[13] = -t[12] * p[1] - t[13] * p[5] - t[14] * p[9],
          p[14] = -t[12] * p[2] - t[13] * p[6] - t[14] * p[10],
          p
      }
      ,
      r.transpose = function (t) {
        return [t[0], t[4], t[8], t[12], t[1], t[5], t[9], t[13], t[2], t[6], t[10], t[14], t[3], t[7], t[11], t[15]]
      }
      ,
      r.interpret = function (t) {
        var n = [t[0], t[1], t[2]]
          , u = o(n[0])
          , a = s(n)
          , f = [n[0] + u * a, n[1], n[2]]
          , l = 2 / i(f);
        if (l >= Infinity)
          return {
            translate: r.getTranslate(t),
            rotate: [0, 0, 0],
            scale: [0, 0, 0],
            skew: [0, 0, 0]
          };
        var c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
        c[0] = 1 - l * f[0] * f[0],
          c[5] = 1 - l * f[1] * f[1],
          c[10] = 1 - l * f[2] * f[2],
          c[1] = -l * f[0] * f[1],
          c[2] = -l * f[0] * f[2],
          c[6] = -l * f[1] * f[2],
          c[4] = c[1],
          c[8] = c[2],
          c[9] = c[6];
        var h = r.multiply(c, t)
          , p = [h[5], h[6]]
          , d = o(p[0])
          , v = s(p)
          , m = [p[0] + d * v, p[1]]
          , g = 2 / i(m)
          , y = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
        y[5] = 1 - g * m[0] * m[0],
          y[10] = 1 - g * m[1] * m[1],
          y[6] = -g * m[0] * m[1],
          y[9] = y[6];
        var b = r.multiply(y, c)
          , w = r.multiply(b, t)
          , E = r.scale(w[0] < 0 ? -1 : 1, w[5] < 0 ? -1 : 1, w[10] < 0 ? -1 : 1);
        w = r.multiply(w, E),
          b = r.multiply(E, b);
        var S = {};
        return S.translate = r.getTranslate(t),
          S.rotate = [Math.atan2(-b[6], b[10]), Math.asin(b[2]), Math.atan2(-b[1], b[0])],
          S.rotate[0] || (S.rotate[0] = 0,
            S.rotate[2] = Math.atan2(b[4], b[5])),
          S.scale = [w[0], w[5], w[10]],
          S.skew = [Math.atan2(w[9], S.scale[2]), Math.atan2(w[8], S.scale[2]), Math.atan2(w[4], S.scale[0])],
          Math.abs(S.rotate[0]) + Math.abs(S.rotate[2]) > 1.5 * Math.PI && (S.rotate[1] = Math.PI - S.rotate[1],
            S.rotate[1] > Math.PI && (S.rotate[1] -= 2 * Math.PI),
            S.rotate[1] < -Math.PI && (S.rotate[1] += 2 * Math.PI),
            S.rotate[0] < 0 ? S.rotate[0] += Math.PI : S.rotate[0] -= Math.PI,
            S.rotate[2] < 0 ? S.rotate[2] += Math.PI : S.rotate[2] -= Math.PI),
          S
      }
      ,
      r.average = function (t, n, i) {
        i = i === undefined ? .5 : i;
        var s = r.interpret(t)
          , o = r.interpret(n)
          , u = {
            translate: [0, 0, 0],
            rotate: [0, 0, 0],
            scale: [0, 0, 0],
            skew: [0, 0, 0]
          };
        for (var a = 0; a < 3; a++)
          u.translate[a] = (1 - i) * s.translate[a] + i * o.translate[a],
            u.rotate[a] = (1 - i) * s.rotate[a] + i * o.rotate[a],
            u.scale[a] = (1 - i) * s.scale[a] + i * o.scale[a],
            u.skew[a] = (1 - i) * s.skew[a] + i * o.skew[a];
        return r.build(u)
      }
      ,
      r.build = function (t) {
        var n = r.scale(t.scale[0], t.scale[1], t.scale[2])
          , i = r.skew(t.skew[0], t.skew[1], t.skew[2])
          , s = r.rotate(t.rotate[0], t.rotate[1], t.rotate[2]);
        return r.thenMove(r.multiply(r.multiply(s, i), n), t.translate)
      }
      ,
      r.equals = function (t, n) {
        return !r.notEquals(t, n)
      }
      ,
      r.notEquals = function (t, n) {
        return t === n ? !1 : !t || !n || t[12] !== n[12] || t[13] !== n[13] || t[14] !== n[14] || t[0] !== n[0] || t[1] !== n[1] || t[2] !== n[2] || t[4] !== n[4] || t[5] !== n[5] || t[6] !== n[6] || t[8] !== n[8] || t[9] !== n[9] || t[10] !== n[10]
      }
      ,
      r.normalizeRotation = function (t) {
        var n = t.slice(0);
        if (n[0] === Math.PI * .5 || n[0] === -Math.PI * .5)
          n[0] = -n[0],
            n[1] = Math.PI - n[1],
            n[2] -= Math.PI;
        n[0] > Math.PI * .5 && (n[0] = n[0] - Math.PI,
          n[1] = Math.PI - n[1],
          n[2] -= Math.PI),
          n[0] < -Math.PI * .5 && (n[0] = n[0] + Math.PI,
            n[1] = -Math.PI - n[1],
            n[2] -= Math.PI);
        while (n[1] < -Math.PI)
          n[1] += 2 * Math.PI;
        while (n[1] >= Math.PI)
          n[1] -= 2 * Math.PI;
        while (n[2] < -Math.PI)
          n[2] += 2 * Math.PI;
        while (n[2] >= Math.PI)
          n[2] -= 2 * Math.PI;
        return n
      }
      ,
      r.inFront = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, .001, 1],
      r.behind = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -0.001, 1],
      n.exports = r
  }),
  define("famous/core/SpecParser", ["require", "exports", "module", "./Transform"], function (e, t, n) {
    function i() {
      this.result = {}
    }
    function s(e, t) {
      return [e[0] * t[0] + e[1] * t[4] + e[2] * t[8], e[0] * t[1] + e[1] * t[5] + e[2] * t[9], e[0] * t[2] + e[1] * t[6] + e[2] * t[10]]
    }
    var r = e("./Transform");
    i._instance = new i,
      i.parse = function (t, n) {
        return i._instance.parse(t, n)
      }
      ,
      i.prototype.parse = function (t, n) {
        return this.reset(),
          this._parseSpec(t, n, r.identity),
          this.result
      }
      ,
      i.prototype.reset = function () {
        this.result = {}
      }
      ;
    var o = [0, 0];
    i.prototype._parseSpec = function (t, n, i) {
      var u, a, f, l, c, h, p;
      if (typeof t == "number") {
        u = t,
          f = n.transform,
          h = n.align || o;
        if (n.size && h && (h[0] || h[1])) {
          var d = [h[0] * n.size[0], h[1] * n.size[1], 0];
          f = r.thenMove(f, s(d, i))
        }
        this.result[u] = {
          transform: f,
          opacity: n.opacity,
          origin: n.origin || o,
          align: n.align || o,
          size: n.size
        }
      } else {
        if (!t)
          return;
        if (t instanceof Array)
          for (var v = 0; v < t.length; v++)
            this._parseSpec(t[v], n, i);
        else {
          a = t.target,
            f = n.transform,
            l = n.opacity,
            c = n.origin,
            h = n.align,
            p = n.size;
          var m = i;
          t.opacity !== undefined && (l = n.opacity * t.opacity),
            t.transform && (f = r.multiply(n.transform, t.transform)),
            t.origin && (c = t.origin,
              m = n.transform),
            t.align && (h = t.align);
          if (t.size || t.proportions) {
            var g = p;
            p = [p[0], p[1]],
              t.size && (t.size[0] !== undefined && (p[0] = t.size[0]),
                t.size[1] !== undefined && (p[1] = t.size[1])),
              t.proportions && (t.proportions[0] !== undefined && (p[0] = p[0] * t.proportions[0]),
                t.proportions[1] !== undefined && (p[1] = p[1] * t.proportions[1])),
              g && (h && (h[0] || h[1]) && (f = r.thenMove(f, s([h[0] * g[0], h[1] * g[1], 0], i))),
                c && (c[0] || c[1]) && (f = r.moveThen([-c[0] * p[0], -c[1] * p[1], 0], f))),
              m = n.transform,
              c = null,
              h = null
          }
          this._parseSpec(a, {
            transform: f,
            opacity: l,
            origin: c,
            align: h,
            size: p
          }, m)
        }
      }
    }
      ,
      n.exports = i
  }),
  define("famous/core/RenderNode", ["require", "exports", "module", "./Entity", "./SpecParser"], function (e, t, n) {
    function s(e) {
      this._object = null,
        this._child = null,
        this._hasMultipleChildren = !1,
        this._isRenderable = !1,
        this._isModifier = !1,
        this._resultCache = {},
        this._prevResults = {},
        this._childResult = null,
        e && this.set(e)
    }
    function o(e, t, n) {
      var s = i.parse(e, t)
        , u = Object.keys(s);
      for (var a = 0, f = u.length; a < f; a++) {
        var l = u[a]
          , c = r.get(l)
          , h = s[l];
        h.allocator = t.allocator;
        var p = c.commit(h);
        p ? o(p, t, n) : n[l] = h
      }
    }
    var r = e("./Entity")
      , i = e("./SpecParser");
    s.prototype.add = function (t) {
      var n = t instanceof s ? t : new s(t);
      return this._child instanceof Array ? this._child.push(n) : this._child ? (this._child = [this._child, n],
        this._hasMultipleChildren = !0,
        this._childResult = []) : this._child = n,
        n
    }
      ,
      s.prototype.get = function () {
        return this._object || (this._hasMultipleChildren ? null : this._child ? this._child.get() : null)
      }
      ,
      s.prototype.set = function (t) {
        return this._childResult = null,
          this._hasMultipleChildren = !1,
          this._isRenderable = t.render ? !0 : !1,
          this._isModifier = t.modify ? !0 : !1,
          this._object = t,
          this._child = null,
          t instanceof s ? t : this
      }
      ,
      s.prototype.getSize = function () {
        var t = null
          , n = this.get();
        return n && n.getSize && (t = n.getSize()),
          !t && this._child && this._child.getSize && (t = this._child.getSize()),
          t
      }
      ,
      s.prototype.commit = function (t) {
        var n = Object.keys(this._prevResults);
        for (var i = 0, s = n.length; i < s; i++) {
          var u = n[i];
          if (this._resultCache[u] === undefined) {
            var a = r.get(u);
            a.cleanup && a.cleanup(t.allocator)
          }
        }
        this._prevResults = this._resultCache,
          this._resultCache = {},
          o(this.render(), t, this._resultCache)
      }
      ,
      s.prototype.render = function () {
        if (this._isRenderable)
          return this._object.render();
        var t = null;
        if (this._hasMultipleChildren) {
          t = this._childResult;
          var n = this._child;
          for (var r = 0, i = n.length; r < i; r++)
            t[r] = n[r].render()
        } else
          this._child && (t = this._child.render());
        return this._isModifier ? this._object.modify(t) : t
      }
      ,
      n.exports = s
  }),
  define("famous/core/EventEmitter", ["require", "exports", "module"], function (e, t, n) {
    function r() {
      this.listeners = {},
        this._owner = this
    }
    r.prototype.emit = function (t, n) {
      var r = this.listeners[t];
      if (r) {
        var i = [];
        for (var s = 0, o = r.length; s < o; s++)
          i.push(r[s]);
        for (var s = 0, o = i.length; s < o; s++)
          i[s].call(this._owner, n)
      }
      return this
    }
      ,
      r.prototype.on = function (t, n) {
        t in this.listeners || (this.listeners[t] = []);
        var r = this.listeners[t].indexOf(n);
        return r < 0 && this.listeners[t].push(n),
          this
      }
      ,
      r.prototype.addListener = r.prototype.on,
      r.prototype.removeListener = function (t, n) {
        var r = this.listeners[t];
        if (r !== undefined) {
          var i = r.indexOf(n);
          i >= 0 && r.splice(i, 1)
        }
        return this
      }
      ,
      r.prototype.bindThis = function (t) {
        this._owner = t
      }
      ,
      n.exports = r
  }),
  define("famous/core/EventHandler", ["require", "exports", "module", "./EventEmitter"], function (e, t, n) {
    function i() {
      r.apply(this, arguments),
        this.downstream = [],
        this.downstreamFn = [],
        this.upstream = [],
        this.upstreamListeners = {}
    }
    var r = e("./EventEmitter");
    i.prototype = Object.create(r.prototype),
      i.prototype.constructor = i,
      i.setInputHandler = function (t, n) {
        t.trigger = n.trigger.bind(n),
          n.subscribe && n.unsubscribe && (t.subscribe = n.subscribe.bind(n),
            t.unsubscribe = n.unsubscribe.bind(n))
      }
      ,
      i.setOutputHandler = function (t, n) {
        n instanceof i && n.bindThis(t),
          t.pipe = n.pipe.bind(n),
          t.unpipe = n.unpipe.bind(n),
          t.on = n.on.bind(n),
          t.addListener = t.on,
          t.removeListener = n.removeListener.bind(n)
      }
      ,
      i.prototype.emit = function (t, n) {
        r.prototype.emit.apply(this, arguments);
        var i = 0;
        for (i = 0; i < this.downstream.length; i++)
          this.downstream[i].trigger && this.downstream[i].trigger(t, n);
        for (i = 0; i < this.downstreamFn.length; i++)
          this.downstreamFn[i](t, n);
        return this
      }
      ,
      i.prototype.trigger = i.prototype.emit,
      i.prototype.pipe = function (t) {
        if (t.subscribe instanceof Function)
          return t.subscribe(this);
        var n = t instanceof Function ? this.downstreamFn : this.downstream
          , r = n.indexOf(t);
        return r < 0 && n.push(t),
          t instanceof Function ? t("pipe", null) : t.trigger && t.trigger("pipe", null),
          t
      }
      ,
      i.prototype.unpipe = function (t) {
        if (t.unsubscribe instanceof Function)
          return t.unsubscribe(this);
        var n = t instanceof Function ? this.downstreamFn : this.downstream
          , r = n.indexOf(t);
        return r >= 0 ? (n.splice(r, 1),
          t instanceof Function ? t("unpipe", null) : t.trigger && t.trigger("unpipe", null),
          t) : !1
      }
      ,
      i.prototype.on = function (t, n) {
        r.prototype.on.apply(this, arguments);
        if (!(t in this.upstreamListeners)) {
          var i = this.trigger.bind(this, t);
          this.upstreamListeners[t] = i;
          for (var s = 0; s < this.upstream.length; s++)
            this.upstream[s].on(t, i)
        }
        return this
      }
      ,
      i.prototype.addListener = i.prototype.on,
      i.prototype.subscribe = function (t) {
        var n = this.upstream.indexOf(t);
        if (n < 0) {
          this.upstream.push(t);
          for (var r in this.upstreamListeners)
            t.on(r, this.upstreamListeners[r])
        }
        return this
      }
      ,
      i.prototype.unsubscribe = function (t) {
        var n = this.upstream.indexOf(t);
        if (n >= 0) {
          this.upstream.splice(n, 1);
          for (var r in this.upstreamListeners)
            t.removeListener(r, this.upstreamListeners[r])
        }
        return this
      }
      ,
      n.exports = i
  }),
  define("famous/core/ElementAllocator", ["require", "exports", "module"], function (e, t, n) {
    function r(e) {
      e || (e = document.createDocumentFragment()),
        this.container = e,
        this.detachedNodes = {},
        this.nodeCount = 0
    }
    r.prototype.migrate = function (t) {
      var n = this.container;
      if (t === n)
        return;
      if (n instanceof DocumentFragment)
        t.appendChild(n);
      else
        while (n.hasChildNodes())
          t.appendChild(n.firstChild);
      this.container = t
    }
      ,
      r.prototype.allocate = function (t) {
        t = t.toLowerCase(),
          t in this.detachedNodes || (this.detachedNodes[t] = []);
        var n = this.detachedNodes[t], r;
        return n.length > 0 ? (r = n.pop(),
          this.container.insertBefore(r, null)) : (r = document.createElement(t),
            this.container.appendChild(r)),
          this.nodeCount++,
          r
      }
      ,
      r.prototype.deallocate = function (t) {
        var n = t.nodeName.toLowerCase()
          , r = this.detachedNodes[n];
        r.push(t),
          this.nodeCount--
      }
      ,
      r.prototype.getNodeCount = function () {
        return this.nodeCount
      }
      ,
      n.exports = r
  }),
  define("famous/utilities/Utility", ["require", "exports", "module"], function (e, t, n) {
    var r = {};
    r.Direction = {
      X: 0,
      Y: 1,
      Z: 2
    },
      r.after = function (e, t) {
        var n = e;
        return function () {
          n--,
            n === 0 && t.apply(this, arguments)
        }
      }
      ,
      r.loadURL = function (e, t, n, i) {
        var s = new XMLHttpRequest;
        s.onreadystatechange = function (s) {
          this.readyState === 4 && (this.status === 200 ? (n && n(this.responseText),
            i && i(1)) : 0 !== t && (t < 0 ? window.setTimeout(function () {
              r.loadURL(e, -1, n)
            }, 10) : window.setTimeout(function () {
              r.loadURL(e, t - 1, n)
            }, 10)))
        }
          ,
          i && (s.onprogress = function (e) {
            e.lengthComputable && i && i((e.loaded || 0) / (e.total || 1))
          }
          ),
          s.open("GET", e),
          s.send()
      }
      ,
      r.postURL = function (e, t, n, i) {
        var s = new XMLHttpRequest;
        s.onreadystatechange = function (s) {
          this.readyState === 4 && (this.status === 200 ? i && i(this.responseText) : 0 !== n && (n < 0 ? window.setTimeout(function () {
            r.postURL(e, t, -1, i)
          }, 10) : window.setTimeout(function () {
            r.postURL(e, t, n - 1, i)
          }, 10)))
        }
          ,
          s.open("POST", e),
          s.setRequestHeader("Content-Type", "application/json"),
          s.send(t)
      }
      ,
      r.createDocumentFragmentFromHTML = function (e) {
        var t = document.createElement("div");
        t.innerHTML = e;
        var n = document.createDocumentFragment();
        while (t.hasChildNodes())
          n.appendChild(t.firstChild);
        return n
      }
      ,
      r.clone = function (e) {
        var t;
        if (typeof e == "object") {
          t = e instanceof Array ? [] : {};
          for (var n in e)
            if (typeof e[n] == "object" && e[n] !== null)
              if (e[n] instanceof Array) {
                t[n] = new Array(e[n].length);
                for (var i = 0; i < e[n].length; i++)
                  t[n][i] = r.clone(e[n][i])
              } else
                t[n] = r.clone(e[n]);
            else
              t[n] = e[n]
        } else
          t = e;
        return t
      }
      ,
      n.exports = r
  }),
  define("famous/transitions/MultipleTransition", ["require", "exports", "module", "../utilities/Utility"], function (e, t, n) {
    function i(e) {
      this.method = e,
        this._instances = [],
        this.state = []
    }
    var r = e("../utilities/Utility");
    i.SUPPORTS_MULTIPLE = !0,
      i.prototype.get = function () {
        for (var t = 0; t < this._instances.length; t++)
          this.state[t] = this._instances[t].get();
        return this.state
      }
      ,
      i.prototype.set = function (t, n, i) {
        var s = r.after(t.length, i);
        for (var o = 0; o < t.length; o++)
          this._instances[o] || (this._instances[o] = new this.method),
            this._instances[o].set(t[o], n, s)
      }
      ,
      i.prototype.reset = function (t) {
        for (var n = 0; n < t.length; n++)
          this._instances[n] || (this._instances[n] = new this.method),
            this._instances[n].reset(t[n])
      }
      ,
      n.exports = i
  }),
  define("famous/transitions/TweenTransition", ["require", "exports", "module"], function (e, t, n) {
    function r(e) {
      this.options = Object.create(r.DEFAULT_OPTIONS),
        e && this.setOptions(e),
        this._startTime = 0,
        this._startValue = 0,
        this._updateTime = 0,
        this._endValue = 0,
        this._curve = undefined,
        this._duration = 0,
        this._active = !1,
        this._callback = undefined,
        this.state = 0,
        this.velocity = undefined
    }
    function s(e, t, n) {
      return (1 - n) * e + n * t
    }
    function o(e) {
      return e instanceof Object ? e instanceof Array ? e.slice(0) : Object.create(e) : e
    }
    function u(e, t) {
      var n = {
        curve: t.curve
      };
      return t.duration && (n.duration = t.duration),
        t.speed && (n.speed = t.speed),
        e instanceof Object && (e.duration !== undefined && (n.duration = e.duration),
          e.curve && (n.curve = e.curve),
          e.speed && (n.speed = e.speed)),
        typeof n.curve == "string" && (n.curve = r.getCurve(n.curve)),
        n
    }
    function a(e, t, n, r, i) {
      var s, o = 1e-7, u = (n(i) - n(i - o)) / o;
      if (e instanceof Array) {
        s = [];
        for (var a = 0; a < e.length; a++)
          typeof e[a] == "number" ? s[a] = u * (e[a] - t[a]) / r : s[a] = 0
      } else
        s = u * (e - t) / r;
      return s
    }
    function f(e, t, n) {
      var r;
      if (e instanceof Array) {
        r = [];
        for (var i = 0; i < e.length; i++)
          typeof e[i] == "number" ? r[i] = s(e[i], t[i], n) : r[i] = e[i]
      } else
        r = s(e, t, n);
      return r
    }
    r.Curves = {
      linear: function (e) {
        return e
      },
      easeIn: function (e) {
        return e * e
      },
      easeOut: function (e) {
        return e * (2 - e)
      },
      easeInOut: function (e) {
        return e <= .5 ? 2 * e * e : -2 * e * e + 4 * e - 1
      },
      easeOutBounce: function (e) {
        return e * (3 - 2 * e)
      },
      spring: function (e) {
        return (1 - e) * Math.sin(6 * Math.PI * e) + e
      }
    },
      r.SUPPORTS_MULTIPLE = !0,
      r.DEFAULT_OPTIONS = {
        curve: r.Curves.linear,
        duration: 500,
        speed: 0
      };
    var i = {};
    r.registerCurve = function (t, n) {
      return i[t] ? !1 : (i[t] = n,
        !0)
    }
      ,
      r.unregisterCurve = function (t) {
        return i[t] ? (delete i[t],
          !0) : !1
      }
      ,
      r.getCurve = function (t) {
        var n = i[t];
        if (n !== undefined)
          return n;
        throw new Error("curve not registered")
      }
      ,
      r.getCurves = function () {
        return i
      }
      ,
      r.prototype.setOptions = function (t) {
        t.curve !== undefined && (this.options.curve = t.curve),
          t.duration !== undefined && (this.options.duration = t.duration),
          t.speed !== undefined && (this.options.speed = t.speed)
      }
      ,
      r.prototype.set = function (t, n, r) {
        if (!n) {
          this.reset(t),
            r && r();
          return
        }
        this._startValue = o(this.get()),
          n = u(n, this.options);
        if (n.speed) {
          var i = this._startValue;
          if (i instanceof Object) {
            var s = 0;
            for (var a in i)
              s += (t[a] - i[a]) * (t[a] - i[a]);
            n.duration = Math.sqrt(s) / n.speed
          } else
            n.duration = Math.abs(t - i) / n.speed
        }
        this._startTime = Date.now(),
          this._endValue = o(t),
          this._startVelocity = o(n.velocity),
          this._duration = n.duration,
          this._curve = n.curve,
          this._active = !0,
          this._callback = r
      }
      ,
      r.prototype.reset = function (t, n) {
        if (this._callback) {
          var r = this._callback;
          this._callback = undefined,
            r()
        }
        this.state = o(t),
          this.velocity = o(n),
          this._startTime = 0,
          this._duration = 0,
          this._updateTime = 0,
          this._startValue = this.state,
          this._startVelocity = this.velocity,
          this._endValue = this.state,
          this._active = !1
      }
      ,
      r.prototype.getVelocity = function () {
        return this.velocity
      }
      ,
      r.prototype.get = function (t) {
        return this.update(t),
          this.state
      }
      ,
      r.prototype.update = function (t) {
        if (!this._active) {
          if (this._callback) {
            var n = this._callback;
            this._callback = undefined,
              n()
          }
          return
        }
        t || (t = Date.now());
        if (this._updateTime >= t)
          return;
        this._updateTime = t;
        var r = t - this._startTime;
        if (r >= this._duration)
          this.state = this._endValue,
            this.velocity = a(this.state, this._startValue, this._curve, this._duration, 1),
            this._active = !1;
        else if (r < 0)
          this.state = this._startValue,
            this.velocity = this._startVelocity;
        else {
          var i = r / this._duration;
          this.state = f(this._startValue, this._endValue, this._curve(i)),
            this.velocity = a(this.state, this._startValue, this._curve, this._duration, i)
        }
      }
      ,
      r.prototype.isActive = function () {
        return this._active
      }
      ,
      r.prototype.halt = function () {
        this.reset(this.get())
      }
      ,
      r.registerCurve("linear", r.Curves.linear),
      r.registerCurve("easeIn", r.Curves.easeIn),
      r.registerCurve("easeOut", r.Curves.easeOut),
      r.registerCurve("easeInOut", r.Curves.easeInOut),
      r.registerCurve("easeOutBounce", r.Curves.easeOutBounce),
      r.registerCurve("spring", r.Curves.spring),
      r.customCurve = function (t, n) {
        return t = t || 0,
          n = n || 0,
          function (e) {
            return t * e + (-2 * t - n + 3) * e * e + (t + n - 2) * e * e * e
          }
      }
      ,
      n.exports = r
  }),
  define("famous/transitions/Transitionable", ["require", "exports", "module", "./MultipleTransition", "./TweenTransition"], function (e, t, n) {
    function s(e) {
      this.currentAction = null,
        this.actionQueue = [],
        this.callbackQueue = [],
        this.state = 0,
        this.velocity = undefined,
        this._callback = undefined,
        this._engineInstance = null,
        this._currentMethod = null,
        this.set(e)
    }
    function u() {
      if (this._callback) {
        var e = this._callback;
        this._callback = undefined,
          e()
      }
      if (this.actionQueue.length <= 0) {
        this.set(this.get());
        return
      }
      this.currentAction = this.actionQueue.shift(),
        this._callback = this.callbackQueue.shift();
      var t = null
        , n = this.currentAction[0]
        , s = this.currentAction[1];
      s instanceof Object && s.method ? (t = s.method,
        typeof t == "string" && (t = o[t])) : t = i,
        this._currentMethod !== t && (!(n instanceof Object) || t.SUPPORTS_MULTIPLE === !0 || n.length <= t.SUPPORTS_MULTIPLE ? this._engineInstance = new t : this._engineInstance = new r(t),
          this._currentMethod = t),
        this._engineInstance.reset(this.state, this.velocity),
        this.velocity !== undefined && (s.velocity = this.velocity),
        this._engineInstance.set(n, s, u.bind(this))
    }
    var r = e("./MultipleTransition")
      , i = e("./TweenTransition")
      , o = {};
    s.register = function (t) {
      var n = !0;
      for (var r in t)
        s.registerMethod(r, t[r]) || (n = !1);
      return n
    }
      ,
      s.registerMethod = function (t, n) {
        return t in o ? !1 : (o[t] = n,
          !0)
      }
      ,
      s.unregisterMethod = function (t) {
        return t in o ? (delete o[t],
          !0) : !1
      }
      ,
      s.prototype.set = function (t, n, r) {
        this._final = t;
        if (!n)
          return this.reset(t),
            r && r(),
            this;
        var i = [t, n];
        return this.actionQueue.push(i),
          this.callbackQueue.push(r),
          this.currentAction || u.call(this),
          this
      }
      ,
      s.prototype.reset = function (t, n) {
        this._currentMethod = null,
          this._engineInstance = null,
          this._callback = undefined,
          this.state = t,
          this.velocity = n,
          this.currentAction = null,
          this.actionQueue = [],
          this.callbackQueue = []
      }
      ,
      s.prototype.delay = function (t, n) {
        var r;
        return this.actionQueue.length ? r = this.actionQueue[this.actionQueue.length - 1][0] : this.currentAction ? r = this.currentAction[0] : r = this.get(),
          this.set(r, {
            duration: t,
            curve: function () {
              return 0
            }
          }, n)
      }
      ,
      s.prototype.get = function (t) {
        return this._engineInstance && (this._engineInstance.getVelocity && (this.velocity = this._engineInstance.getVelocity()),
          this.state = this._engineInstance.get(t)),
          this.state
      }
      ,
      s.prototype.isActive = function () {
        return !!this.currentAction
      }
      ,
      s.prototype.halt = function () {
        return this.set(this.get())
      }
      ,
      n.exports = s
  }),
  define("famous/core/Context", ["require", "exports", "module", "./RenderNode", "./EventHandler", "./ElementAllocator", "./Transform", "../transitions/Transitionable"], function (e, t, n) {
    function l() {
      var e = this.container;
      return [e.clientWidth, e.clientHeight]
    }
    function h(e) {
      this.container = e,
        this._allocator = new s(e),
        this._node = new r,
        this._eventOutput = new i,
        this._size = l.call(this),
        this._perspectiveState = new u(0),
        this._perspective = undefined,
        this._nodeContext = {
          allocator: this._allocator,
          transform: o.identity,
          opacity: 1,
          origin: a,
          align: a,
          size: this._size
        },
        this._eventOutput.on("resize", function () {
          this.setSize(l.call(this))
        }
          .bind(this))
    }
    var r = e("./RenderNode")
      , i = e("./EventHandler")
      , s = e("./ElementAllocator")
      , o = e("./Transform")
      , u = e("../transitions/Transitionable")
      , a = [0, 0]
      , f = !("perspective" in document.documentElement.style)
      , c = f ? function (e, t) {
        e.style.webkitPerspective = t ? t.toFixed() + "px" : ""
      }
        : function (e, t) {
          e.style.perspective = t ? t.toFixed() + "px" : ""
        }
      ;
    h.prototype.getAllocator = function () {
      return this._allocator
    }
      ,
      h.prototype.add = function (t) {
        return this._node.add(t)
      }
      ,
      h.prototype.migrate = function (t) {
        if (t === this.container)
          return;
        this.container = t,
          this._allocator.migrate(t)
      }
      ,
      h.prototype.getSize = function () {
        return this._size
      }
      ,
      h.prototype.setSize = function (t) {
        t || (t = l.call(this)),
          this._size[0] = t[0],
          this._size[1] = t[1]
      }
      ,
      h.prototype.update = function (t) {
        t && (t.transform && (this._nodeContext.transform = t.transform),
          t.opacity && (this._nodeContext.opacity = t.opacity),
          t.origin && (this._nodeContext.origin = t.origin),
          t.align && (this._nodeContext.align = t.align),
          t.size && (this._nodeContext.size = t.size));
        var n = this._perspectiveState.get();
        n !== this._perspective && (c(this.container, n),
          this._perspective = n),
          this._node.commit(this._nodeContext)
      }
      ,
      h.prototype.getPerspective = function () {
        return this._perspectiveState.get()
      }
      ,
      h.prototype.setPerspective = function (t, n, r) {
        return this._perspectiveState.set(t, n, r)
      }
      ,
      h.prototype.emit = function (t, n) {
        return this._eventOutput.emit(t, n)
      }
      ,
      h.prototype.on = function (t, n) {
        return this._eventOutput.on(t, n)
      }
      ,
      h.prototype.removeListener = function (t, n) {
        return this._eventOutput.removeListener(t, n)
      }
      ,
      h.prototype.pipe = function (t) {
        return this._eventOutput.pipe(t)
      }
      ,
      h.prototype.unpipe = function (t) {
        return this._eventOutput.unpipe(t)
      }
      ,
      n.exports = h
  }),
  define("famous/core/OptionsManager", ["require", "exports", "module", "./EventHandler"], function (e, t, n) {
    function i(e) {
      this._value = e,
        this.eventOutput = null
    }
    function s() {
      this.eventOutput = new r,
        this.eventOutput.bindThis(this),
        r.setOutputHandler(this, this.eventOutput)
    }
    var r = e("./EventHandler");
    i.patch = function (t, n) {
      var r = new i(t);
      for (var s = 1, o = arguments.length; s < o; s++)
        r.patch(arguments[s]);
      return t
    }
      ,
      i.prototype.patch = function () {
        var t = this._value;
        for (var n = 0, r = arguments.length; n < r; n++) {
          var i = arguments[n];
          for (var s in i)
            s in t && i[s] && i[s].constructor === Object && t[s] && t[s].constructor === Object ? (t.hasOwnProperty(s) || (t[s] = Object.create(t[s])),
              this.key(s).patch(i[s]),
              this.eventOutput && this.eventOutput.emit("change", {
                id: s,
                value: this.key(s).value()
              })) : this.set(s, i[s])
        }
        return this
      }
      ,
      i.prototype.setOptions = i.prototype.patch,
      i.prototype.key = function (t) {
        var n = new i(this._value[t]);
        if (!(n._value instanceof Object) || n._value instanceof Array)
          n._value = {};
        return n
      }
      ,
      i.prototype.get = function (t) {
        return t ? this._value[t] : this._value
      }
      ,
      i.prototype.getOptions = i.prototype.get,
      i.prototype.set = function (t, n) {
        var r = this.get(t);
        return this._value[t] = n,
          this.eventOutput && n !== r && this.eventOutput.emit("change", {
            id: t,
            value: n
          }),
          this
      }
      ,
      i.prototype.on = function () {
        return s.call(this),
          this.on.apply(this, arguments)
      }
      ,
      i.prototype.removeListener = function () {
        return s.call(this),
          this.removeListener.apply(this, arguments)
      }
      ,
      i.prototype.pipe = function () {
        return s.call(this),
          this.pipe.apply(this, arguments)
      }
      ,
      i.prototype.unpipe = function () {
        return s.call(this),
          this.unpipe.apply(this, arguments)
      }
      ,
      n.exports = i
  }),
  define("famous/core/Engine", ["require", "exports", "module", "./Context", "./EventHandler", "./OptionsManager"], function (e, t, n) {
    function S() {
      b.runLoop ? (o.step(),
        E && (E.style.display = "none",
          E.offsetHeight,
          E.style.display = "block"),
        window.requestAnimationFrame(S)) : m = !1
    }
    function x(e) {
      for (var t = 0; t < u.length; t++)
        u[t].emit("resize");
      y.emit("resize")
    }
    function T() {
      window.addEventListener("touchmove", function (e) {
        var t = e.srcElement.nodeName.toLowerCase();
        if (t !== "textarea" && t !== "input") {
          var n = e.srcElement.getAttribute("ease_scroll");
          n || e.preventDefault()
        }
      }, {
        passive: !1,
        capture: !0
      }),
        C()
    }
    function C() {
      if (!document.body) {
        o.nextTick(C);
        return
      }
      document.body.classList.add("famous-root")
    }
    function k(e, t) {
      if (!document.body) {
        o.nextTick(addEventListener.bind(this, e, t));
        return
      }
      document.body.addEventListener(e, t)
    }
    function L(e, t) {
      if (!document.body) {
        o.nextTick(L.bind(this, e, t));
        return
      }
      document.body.appendChild(t),
        e.emit("resize")
    }
    function A(e) { }
    var r = e("./Context"), i = e("./EventHandler"), s = e("./OptionsManager"), o = {}, u = [], a = [], f = 0, l = 0, c = null, h = [], p = Date.now(), d, v, m = !0, g = {}, y = new i, b = {
      containerType: "div",
      containerClass: "famous-container",
      fpsCap: undefined,
      runLoop: !0,
      appMode: !0
    }, w = new s(b);
    o.step = function () {
      f++,
        l = f,
        c = Date.now();
      if (v && c - p < v)
        return;
      var t = 0;
      d = c - p,
        p = c,
        y.emit("prerender");
      var n = a.length;
      while (n--)
        a.shift()(f);
      for (t = 0; t < u.length; t++)
        u[t].update();
      var r = h.length;
      while (r--)
        h.shift()(f);
      y.emit("postrender")
    }
      ;
    var E = undefined;
    o.setForceRepainting = function (e) {
      e ? E || (E = document.createElement("DIV"),
        E.style.cssText = "position:absolute;background-color:red;width:10px;height:10px;",
        document.body.appendChild(E)) : E && (document.body.removeChild(E),
          E = undefined)
    }
      ,
      window.requestAnimationFrame(S),
      window.addEventListener("resize", x, !1),
      x();
    var N = !1;
    o.pipe = function (t) {
      return t.subscribe instanceof Function ? t.subscribe(o) : y.pipe(t)
    }
      ,
      o.unpipe = function (t) {
        return t.unsubscribe instanceof Function ? t.unsubscribe(o) : y.unpipe(t)
      }
      ,
      o.on = function (t, n) {
        return t in g || (g[t] = y.emit.bind(y, t),
          k(t, g[t])),
          y.on(t, n)
      }
      ,
      o.emit = function (t, n) {
        return y.emit(t, n)
      }
      ,
      o.removeListener = function (t, n) {
        return y.removeListener(t, n)
      }
      ,
      o.getFPS = function () {
        return 1e3 / d
      }
      ,
      o.setFPSCap = function (t) {
        v = Math.floor(1e3 / t)
      }
      ,
      o.getOptions = function (t) {
        return w.getOptions(t)
      }
      ,
      o.setOptions = function (t) {
        return w.setOptions.apply(w, arguments)
      }
      ,
      o.createContext = function (t) {
        !N && b.appMode && o.nextTick(T);
        var n = !1;
        t || (t = document.createElement(b.containerType),
          t.classList.add(b.containerClass),
          n = !0);
        var i = new r(t);
        return o.registerContext(i),
          n && L(i, t),
          i
      }
      ,
      o.registerContext = function (t) {
        return u.push(t),
          t
      }
      ,
      o.getContexts = function () {
        return u
      }
      ,
      o.deregisterContext = function (t) {
        var n = u.indexOf(t);
        n >= 0 && u.splice(n, 1)
      }
      ,
      o.nextTick = function (t) {
        a.push(t)
      }
      ,
      o.defer = function (t) {
        h.push(t)
      }
      ,
      o.removeTick = function (e) {
        for (var t = 0, n = a.length; t < n; t++)
          a[t] === e && (a[t] = A)
      }
      ,
      o.removeDefer = function (e) {
        for (var t = 0, n = h.length; t < n; t++)
          h[t] === e && (h[t] = A)
      }
      ,
      o.getCurrentFrame = function () {
        return f
      }
      ,
      o.getCurrentFrameTime = function () {
        return null === c && (c = Date.now()),
          c
      }
      ,
      w.on("change", function (e) {
        e.id === "fpsCap" ? o.setFPSCap(e.value) : e.id === "runLoop" && !m && e.value && (m = !0,
          window.requestAnimationFrame(S))
      }),
      n.exports = o
  }),
  define("famous/utilities/Timer", ["require", "exports", "module", "../core/Engine"], function (e, t, n) {
    function o(e) {
      return r.on(i, e),
        e
    }
    function u(e, t) {
      var n = s()
        , u = function () {
          var o = s();
          o - n >= t && (e.apply(this, arguments),
            r.removeListener(i, u))
        };
      return o(u)
    }
    function a(e, t) {
      var n = s()
        , r = function () {
          var r = s();
          r - n >= t && (e.apply(this, arguments),
            n = s())
        };
      return o(r)
    }
    function f(e, t) {
      if (t === undefined)
        return undefined;
      var n = function () {
        t--,
          t <= 0 && (e.apply(this, arguments),
            c(n))
      };
      return o(n)
    }
    function l(e, t) {
      t = t || 1;
      var n = t
        , r = function () {
          t--,
            t <= 0 && (e.apply(this, arguments),
              t = n)
        };
      return o(r)
    }
    function c(e) {
      r.removeListener(i, e)
    }
    function h(e, t) {
      var n, r, i, o, a;
      return function () {
        r = this,
          a = arguments,
          i = s();
        var f = function () {
          var l = s - i;
          l < t ? n = u(f, t - l) : (n = null,
            o = e.apply(r, a))
        };
        return c(n),
          n = u(f, t),
          o
      }
    }
    var r = e("../core/Engine")
      , i = "prerender"
      , s = function () {
        return r.getCurrentFrameTime()
      };
    n.exports = {
      setTimeout: u,
      setInterval: a,
      debounce: h,
      after: f,
      every: l,
      clear: c,
      getTime: s
    }
  }),
  define("famous/transitions/Easing", ["require", "exports", "module"], function (e, t, n) {
    var r = {
      inQuad: function (e) {
        return e * e
      },
      outQuad: function (e) {
        return -(e -= 1) * e + 1
      },
      inOutQuad: function (e) {
        return (e /= .5) < 1 ? .5 * e * e : -0.5 * (--e * (e - 2) - 1)
      },
      inCubic: function (e) {
        return e * e * e
      },
      outCubic: function (e) {
        return --e * e * e + 1
      },
      inOutCubic: function (e) {
        return (e /= .5) < 1 ? .5 * e * e * e : .5 * ((e -= 2) * e * e + 2)
      },
      inQuart: function (e) {
        return e * e * e * e
      },
      outQuart: function (e) {
        return -(--e * e * e * e - 1)
      },
      inOutQuart: function (e) {
        return (e /= .5) < 1 ? .5 * e * e * e * e : -0.5 * ((e -= 2) * e * e * e - 2)
      },
      inQuint: function (e) {
        return e * e * e * e * e
      },
      outQuint: function (e) {
        return --e * e * e * e * e + 1
      },
      inOutQuint: function (e) {
        return (e /= .5) < 1 ? .5 * e * e * e * e * e : .5 * ((e -= 2) * e * e * e * e + 2)
      },
      inSine: function (e) {
        return -1 * Math.cos(e * (Math.PI / 2)) + 1
      },
      outSine: function (e) {
        return Math.sin(e * (Math.PI / 2))
      },
      inOutSine: function (e) {
        return -0.5 * (Math.cos(Math.PI * e) - 1)
      },
      inExpo: function (e) {
        return e === 0 ? 0 : Math.pow(2, 10 * (e - 1))
      },
      outExpo: function (e) {
        return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1
      },
      inOutExpo: function (e) {
        return e === 0 ? 0 : e === 1 ? 1 : (e /= .5) < 1 ? .5 * Math.pow(2, 10 * (e - 1)) : .5 * (-Math.pow(2, -10 * --e) + 2)
      },
      inCirc: function (e) {
        return -(Math.sqrt(1 - e * e) - 1)
      },
      outCirc: function (e) {
        return Math.sqrt(1 - --e * e)
      },
      inOutCirc: function (e) {
        return (e /= .5) < 1 ? -0.5 * (Math.sqrt(1 - e * e) - 1) : .5 * (Math.sqrt(1 - (e -= 2) * e) + 1)
      },
      inElastic: function (e) {
        var t = 1.70158
          , n = 0
          , r = 1;
        return e === 0 ? 0 : e === 1 ? 1 : (n || (n = .3),
          t = n / (2 * Math.PI) * Math.asin(1 / r),
          -(r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / n)))
      },
      outElastic: function (e) {
        var t = 1.70158
          , n = 0
          , r = 1;
        return e === 0 ? 0 : e === 1 ? 1 : (n || (n = .3),
          t = n / (2 * Math.PI) * Math.asin(1 / r),
          r * Math.pow(2, -10 * e) * Math.sin((e - t) * 2 * Math.PI / n) + 1)
      },
      inOutElastic: function (e) {
        var t = 1.70158
          , n = 0
          , r = 1;
        return e === 0 ? 0 : (e /= .5) === 2 ? 1 : (n || (n = .3 * 1.5),
          t = n / (2 * Math.PI) * Math.asin(1 / r),
          e < 1 ? -0.5 * r * Math.pow(2, 10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / n) : r * Math.pow(2, -10 * (e -= 1)) * Math.sin((e - t) * 2 * Math.PI / n) * .5 + 1)
      },
      inBack: function (e, t) {
        return t === undefined && (t = 1.70158),
          e * e * ((t + 1) * e - t)
      },
      outBack: function (e, t) {
        return t === undefined && (t = 1.70158),
          --e * e * ((t + 1) * e + t) + 1
      },
      inOutBack: function (e, t) {
        return t === undefined && (t = 1.70158),
          (e /= .5) < 1 ? .5 * e * e * (((t *= 1.525) + 1) * e - t) : .5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2)
      },
      inBounce: function (e) {
        return 1 - r.outBounce(1 - e)
      },
      outBounce: function (e) {
        return e < 1 / 2.75 ? 7.5625 * e * e : e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375
      },
      inOutBounce: function (e) {
        return e < .5 ? r.inBounce(e * 2) * .5 : r.outBounce(e * 2 - 1) * .5 + .5
      }
    };
    n.exports = r
  }),
  define("famous/core/ElementOutput", ["require", "exports", "module", "./Entity", "./EventHandler", "./Transform"], function (e, t, n) {
    function a(e) {
      this._matrix = null,
        this._opacity = 1,
        this._origin = null,
        this._size = null,
        this._eventOutput = new i,
        this._eventOutput.bindThis(this),
        this.eventForwarder = function (t) {
          this._eventOutput.emit(t.type, t)
        }
          .bind(this),
        this.id = r.register(this),
        this._element = null,
        this._sizeDirty = !1,
        this._originDirty = !1,
        this._transformDirty = !1,
        this._invisible = !1,
        e && this.attach(e)
    }
    function f(e) {
      for (var t in this._eventOutput.listeners)
        e.addEventListener(t, this.eventForwarder)
    }
    function l(e) {
      for (var t in this._eventOutput.listeners)
        e.removeEventListener(t, this.eventForwarder, !1)
    }
    function h() {
      if (c === null) {
        var e = navigator.userAgent;
        (e.indexOf("Opera") || e.indexOf("OPR")) !== -1 ? c = !1 : navigator.userAgent.indexOf("Chrome") !== -1 ? c = !1 : navigator.userAgent.indexOf("Safari") !== -1 ? c = !0 : navigator.userAgent.indexOf("Firefox") !== -1 ? c = !1 : navigator.userAgent.indexOf("MSIE") !== -1 || !!document.documentMode == 1 ? c = !1 : c = !1
      }
      return c
    }
    function p(e, t) {
      if (s.equals(e, s.identity))
        return "";
      if (e[2] !== 0 || e[3] !== 0 || e[6] !== 0 || e[7] !== 0 || e[11] !== 0 || e[8] !== 0 || e[9] !== 0 || e[14] !== 0 || e[10] !== 1) {
        var n = "";
        h() ? t ? n += "scaleZ(0) perspective(3000px) matrix3d(" : n += "matrix3d(" : t ? n += "perspective(3000px) matrix3d(" : n += "matrix3d(";
        for (var r = 0; r < 15; r++)
          n += e[r] < 1e-6 && e[r] > -0.000001 ? "0" : e[r],
            n += ",";
        return n += e[15],
          n += ")",
          n
      }
      var n = "matrix(";
      return n += e[0] < 1e-6 && e[0] > -0.000001 ? "0" : e[0],
        n += ",",
        n += e[1] < 1e-6 && e[1] > -0.000001 ? "0" : e[1],
        n += ",",
        n += e[4] < 1e-6 && e[4] > -0.000001 ? "0" : e[4],
        n += ",",
        n += e[5] < 1e-6 && e[5] > -0.000001 ? "0" : e[5],
        n += ",",
        n += e[12] < 1e-6 && e[12] > -0.000001 ? "0" : e[12],
        n += ",",
        n += e[13] < 1e-6 && e[13] > -0.000001 ? "0" : e[13],
        n += ")",
        n
    }
    function v(e) {
      return e[0] === .5 && e[1] === .5 ? "" : 100 * e[0] + "% " + 100 * e[1] + "%"
    }
    function y(e, t) {
      return e && t ? e[0] !== t[0] || e[1] !== t[1] : e !== t
    }
    var r = e("./Entity")
      , i = e("./EventHandler")
      , s = e("./Transform")
      , o = !("transform" in document.documentElement.style)
      , u = window.devicePixelRatio || 1;
    a.prototype.on = function (t, n) {
      this._element && this._element.addEventListener(t, this.eventForwarder),
        this._eventOutput.on(t, n)
    }
      ,
      a.prototype.removeListener = function (t, n) {
        this._eventOutput.removeListener(t, n)
      }
      ,
      a.prototype.emit = function (t, n) {
        n && !n.origin && (n.origin = this);
        var r = this._eventOutput.emit(t, n);
        return r && n && n.stopPropagation && n.stopPropagation(),
          r
      }
      ,
      a.prototype.pipe = function (t) {
        return this._eventOutput.pipe(t)
      }
      ,
      a.prototype.unpipe = function (t) {
        return this._eventOutput.unpipe(t)
      }
      ,
      a.prototype.render = function () {
        return this.id
      }
      ;
    var c = null, d;
    o ? d = function (e, t) {
      e.style.webkitTransform = p(t, !e.getAttribute("no_pp"))
    }
      : d = function (e, t) {
        e.style.transform = p(t, !e.getAttribute("no_pp"))
      }
      ;
    var m = o ? function (e, t) {
      e.style.webkitTransformOrigin = v(t)
    }
      : function (e, t) {
        e.style.transformOrigin = v(t)
      }
      , g = o ? function (e) {
        e.style.webkitTransform = "scale3d(0.0001,0.0001,0.0001)",
          e.style.opacity = 0
      }
        : function (e) {
          e.style.transform = "scale3d(0.0001,0.0001,0.0001)",
            e.style.opacity = 0
        }
      ;
    a.prototype.commit = function (t) {
      var n = this._element;
      if (!n)
        return;
      var r = t.transform
        , i = t.opacity
        , o = t.origin
        , u = t.size;
      if (!r && this._matrix) {
        this._matrix = null,
          this._opacity = 0,
          g(n);
        return
      }
      y(this._origin, o) && (this._originDirty = !0),
        s.notEquals(this._matrix, r) && (this._transformDirty = !0),
        this._invisible && (this._invisible = !1,
          this._element.style.display = ""),
        this._opacity !== i && (this._opacity = i,
          n.style.opacity = i >= 1 ? "" : i > 1e-6 ? i : 0);
      if (this._transformDirty || this._originDirty || this._sizeDirty) {
        this._sizeDirty && (this._sizeDirty = !1),
          this._originDirty && (o ? (this._origin || (this._origin = [0, 0]),
            this._origin[0] = o[0],
            this._origin[1] = o[1]) : this._origin = null,
            n.getAttribute("klass") === "kf" ? m(n, [.5, .5]) : m(n, this._origin),
            this._originDirty = !1),
          r || (r = s.identity),
          this._matrix = r;
        var a = this._size ? s.thenMove(r, [-this._size[0] * o[0], -this._size[1] * o[1], 0]) : r;
        d(n, a),
          this._transformDirty = !1
      }
    }
      ,
      a.prototype.cleanup = function () {
        this._element && (this._invisible = !0,
          this._element.style.cssText = "display:none")
      }
      ,
      a.prototype.attach = function (t) {
        this._element = t,
          f.call(this, t)
      }
      ,
      a.prototype.detach = function () {
        var t = this._element;
        return t && (l.call(this, t),
          this._invisible && (this._invisible = !1,
            this._element.style.display = "")),
          this._element = null,
          t
      }
      ,
      n.exports = a
  }),
  define("famous/core/Surface", ["require", "exports", "module", "./ElementOutput"], function (e, t, n) {
    function i(e) {
      r.call(this),
        this.options = {},
        this.properties = {},
        this.attributes = {},
        this.content = "",
        this.classList = [],
        this.size = null,
        this._classesDirty = !0,
        this._stylesDirty = !0,
        this._attributesDirty = !0,
        this._sizeDirty = !0,
        this._contentDirty = !0,
        this._trueSizeCheck = !0,
        this._dirtyClasses = [],
        e && this.setOptions(e),
        this._currentTarget = null
    }
    function s(e) {
      for (var t = 0, n = this._dirtyClasses.length; t < n; t++)
        e.classList.remove(this._dirtyClasses[t]);
      this._dirtyClasses = []
    }
    function o(e) {
      for (var t in this.properties)
        e.style[t] = this.properties[t]
    }
    function u(e) {
      for (var t in this.properties)
        e.style[t] = ""
    }
    function a(e) {
      for (var t in this.attributes)
        e.setAttribute(t, this.attributes[t])
    }
    function f(e) {
      for (var t in this.attributes)
        e.removeAttribute(t)
    }
    function l(e, t) {
      return e && t ? e[0] !== t[0] || e[1] !== t[1] : e !== t
    }
    var r = e("./ElementOutput");
    i.prototype = Object.create(r.prototype),
      i.prototype.constructor = i,
      i.prototype.elementType = "div",
      i.prototype.elementClass = "famous-surface",
      i.prototype.setAttributes = function (t) {
        for (var n in t) {
          if (n === "style")
            throw new Error('Cannot set styles via "setAttributes" as it will break Famo.us.  Use "setProperties" instead.');
          this.attributes[n] = t[n]
        }
        this._attributesDirty = !0
      }
      ,
      i.prototype.deleteAttribute = function (e) {
        this._currentTarget && this._currentTarget.removeAttribute(e),
          delete this.attributes[e],
          this._attributesDirty = !0
      }
      ,
      i.prototype.getAttributes = function () {
        return this.attributes
      }
      ,
      i.prototype.setProperties = function (t) {
        for (var n in t)
          this.properties[n] = t[n];
        return this._stylesDirty = !0,
          this
      }
      ,
      i.prototype.setPropertiesCheckDirty = function (e) {
        var t = !1;
        for (var n in e)
          this.properties[n] !== e[n] && (this.properties[n] = e[n],
            t || (t = !0));
        return t && (this._stylesDirty = !0),
          this
      }
      ,
      i.prototype.deleteProperty = function (e) {
        this._currentTarget && (this._currentTarget.style[e] = ""),
          delete this.properties[e],
          this._stylesDirty = !0
      }
      ,
      i.prototype.getProperties = function () {
        return this.properties
      }
      ,
      i.prototype.addClass = function (t) {
        return this.classList.indexOf(t) < 0 && (this.classList.push(t),
          this._classesDirty = !0),
          this
      }
      ,
      i.prototype.removeClass = function (t) {
        var n = this.classList.indexOf(t);
        return n >= 0 && (this._dirtyClasses.push(this.classList.splice(n, 1)[0]),
          this._classesDirty = !0),
          this
      }
      ,
      i.prototype.toggleClass = function (t) {
        var n = this.classList.indexOf(t);
        return n >= 0 ? this.removeClass(t) : this.addClass(t),
          this
      }
      ,
      i.prototype.setClasses = function (t) {
        var n = 0
          , r = [];
        for (n = 0,
          ilen = this.classList.length; n < ilen; n++)
          t.indexOf(this.classList[n]) < 0 && r.push(this.classList[n]);
        for (n = 0,
          ilen = r.length; n < ilen; n++)
          this.removeClass(r[n]);
        for (n = 0,
          ilen = t.length; n < ilen; n++)
          this.addClass(t[n]);
        return this
      }
      ,
      i.prototype.getClassList = function () {
        return this.classList
      }
      ,
      i.prototype.setContent = function (t) {
        return this.content !== t && (this.content = t,
          this._contentDirty = !0),
          this
      }
      ,
      i.prototype.getContent = function () {
        return this.content
      }
      ,
      i.prototype.setOptions = function (t) {
        return t.size && this.setSize(t.size),
          t.classes && this.setClasses(t.classes),
          t.properties && this.setProperties(t.properties),
          t.attributes && this.setAttributes(t.attributes),
          t.content && this.setContent(t.content),
          this
      }
      ,
      i.prototype.setup = function (t) {
        var n = t.allocate(this.elementType);
        if (this.elementClass)
          if (this.elementClass instanceof Array)
            for (var r = 0, i = this.elementClass.length; r < i; r++)
              n.classList.add(this.elementClass[r]);
          else
            n.classList.add(this.elementClass);
        n.style.display = "",
          this.attach(n),
          this._opacity = null,
          this._currentTarget = n,
          this._stylesDirty = !0,
          this._classesDirty = !0,
          this._attributesDirty = !0,
          this._sizeDirty = !0,
          this._contentDirty = !0,
          this._originDirty = !0,
          this._transformDirty = !0
      }
      ,
      i.prototype.commit = function (t) {
        this._currentTarget || this.setup(t.allocator);
        var n = this._currentTarget
          , i = t.size;
        if (this._classesDirty) {
          s.call(this, n);
          var u = this.getClassList();
          for (var f = 0, c = u.length; f < c; f++)
            n.classList.add(u[f]);
          this._classesDirty = !1,
            this._trueSizeCheck = !0
        }
        this._stylesDirty && (o.call(this, n),
          this._stylesDirty = !1,
          this._trueSizeCheck = !0),
          this._attributesDirty && (a.call(this, n),
            this._attributesDirty = !1,
            this._trueSizeCheck = !0);
        if (this.size) {
          var h = t.size;
          i = [this.size[0], this.size[1]],
            i[0] === undefined && (i[0] = h[0]),
            i[1] === undefined && (i[1] = h[1]);
          if (i[0] === !0 || i[1] === !0) {
            if (i[0] === !0)
              if (this._trueSizeCheck || this._size[0] === 0) {
                var p = n.offsetWidth;
                this._size && this._size[0] !== p && (this._size[0] = p,
                  this._sizeDirty = !0),
                  i[0] = p
              } else
                this._size && (i[0] = this._size[0]);
            if (i[1] === !0)
              if (this._trueSizeCheck || this._size[1] === 0) {
                var d = n.offsetHeight;
                this._size && this._size[1] !== d && (this._size[1] = d,
                  this._sizeDirty = !0),
                  i[1] = d
              } else
                this._size && (i[1] = this._size[1]);
            this._trueSizeCheck = !1
          }
        }
        l(this._size, i) && (this._size || (this._size = [0, 0]),
          this._size[0] = i[0],
          this._size[1] = i[1],
          this._sizeDirty = !0),
          this._sizeDirty && (this._size && (n.style.width = this.size && this.size[0] === !0 ? "" : this._size[0] + "px",
            n.style.height = this.size && this.size[1] === !0 ? "" : this._size[1] + "px"),
            this._eventOutput.emit("resize")),
          this._contentDirty && (this.deploy(n),
            this._eventOutput.emit("deploy"),
            this._contentDirty = !1,
            this._trueSizeCheck = !0),
          r.prototype.commit.call(this, t)
      }
      ,
      i.prototype.cleanup = function (t) {
        var n = 0
          , r = this._currentTarget;
        this._eventOutput.emit("recall"),
          this.recall(r),
          r.style.display = "none",
          r.style.opacity = "",
          r.style.width = "",
          r.style.height = "",
          u.call(this, r),
          f.call(this, r);
        var i = this.getClassList();
        s.call(this, r);
        for (n = 0,
          ilen = i.length; n < ilen; n++)
          r.classList.remove(i[n]);
        if (this.elementClass)
          if (this.elementClass instanceof Array)
            for (n = 0,
              ilen = this.elementClass.length; n < ilen; n++)
              r.classList.remove(this.elementClass[n]);
          else
            r.classList.remove(this.elementClass);
        this.detach(r),
          this._currentTarget = null,
          t.deallocate(r)
      }
      ,
      i.prototype.deploy = function (t) {
        var n = this.getContent();
        if (n instanceof Node) {
          while (t.hasChildNodes())
            t.removeChild(t.firstChild);
          t.appendChild(n)
        } else
          t.innerHTML = n
      }
      ,
      i.prototype.recall = function (t) {
        var n = document.createDocumentFragment();
        while (t.hasChildNodes())
          n.appendChild(t.firstChild);
        this.setContent(n)
      }
      ,
      i.prototype.getSize = function () {
        return this._size ? this._size : this.size
      }
      ,
      i.prototype.setSize = function (t) {
        return this.size = t ? [t[0], t[1]] : null,
          this._sizeDirty = !0,
          this
      }
      ,
      n.exports = i
  }),
  define("famous/surfaces/ImageSurface", ["require", "exports", "module", "../core/Surface"], function (e, t, n) {
    function i(e) {
      this._imageUrl = undefined,
        r.apply(this, arguments)
    }
    var r = e("../core/Surface")
      , s = []
      , o = []
      , u = []
      , a = !0;
    i.enableCache = function () {
      a = !0
    }
      ,
      i.disableCache = function () {
        a = !1
      }
      ,
      i.clearCache = function () {
        s = [],
          o = [],
          u = []
      }
      ,
      i.getCache = function () {
        return {
          urlCache: s,
          countCache: o,
          nodeCache: u
        }
      }
      ,
      i.prototype = Object.create(r.prototype),
      i.prototype.constructor = i,
      i.prototype.elementType = "img",
      i.prototype.elementClass = "famous-surface",
      i.prototype.setContent = function (t) {
        var n = s.indexOf(this._imageUrl);
        n !== -1 && (o[n] === 1 ? (s.splice(n, 1),
          o.splice(n, 1),
          u.splice(n, 1)) : o[n]--),
          n = s.indexOf(t),
          n === -1 ? (s.push(t),
            o.push(1)) : o[n]++,
          this._imageUrl = t,
          this._contentDirty = !0
      }
      ,
      i.prototype.deploy = function (t) {
        var n = s.indexOf(this._imageUrl);
        if (u[n] === undefined && a) {
          var r = new Image;
          r.src = this._imageUrl || "",
            u[n] = r
        }
        t.src = this._imageUrl || ""
      }
      ,
      i.prototype.recall = function (t) {
        t.src = ""
      }
      ,
      n.exports = i
  }),
  define("famous/transitions/TransitionableTransform", ["require", "exports", "module", "./Transitionable", "../core/Transform", "../utilities/Utility"], function (e, t, n) {
    function o(e) {
      this._final = i.identity.slice(),
        this._finalTranslate = [0, 0, 0],
        this._finalRotate = [0, 0, 0],
        this._finalSkew = [0, 0, 0],
        this._finalScale = [1, 1, 1],
        this.translate = new r(this._finalTranslate),
        this.rotate = new r(this._finalRotate),
        this.skew = new r(this._finalSkew),
        this.scale = new r(this._finalScale),
        e && this.set(e)
    }
    function u() {
      return i.build({
        translate: this.translate.get(),
        rotate: this.rotate.get(),
        skew: this.skew.get(),
        scale: this.scale.get()
      })
    }
    function a() {
      return i.build({
        translate: this._finalTranslate,
        rotate: this._finalRotate,
        skew: this._finalSkew,
        scale: this._finalScale
      })
    }
    var r = e("./Transitionable")
      , i = e("../core/Transform")
      , s = e("../utilities/Utility");
    o.prototype.setTranslate = function (t, n, r) {
      return this._finalTranslate = t,
        this._final = a.call(this),
        this.translate.set(t, n, r),
        this
    }
      ,
      o.prototype.setScale = function (t, n, r) {
        return this._finalScale = t,
          this._final = a.call(this),
          this.scale.set(t, n, r),
          this
      }
      ,
      o.prototype.setRotate = function (t, n, r) {
        return this._finalRotate = t,
          this._final = a.call(this),
          this.rotate.set(t, n, r),
          this
      }
      ,
      o.prototype.setSkew = function (t, n, r) {
        return this._finalSkew = t,
          this._final = a.call(this),
          this.skew.set(t, n, r),
          this
      }
      ,
      o.prototype.set = function (t, n, r) {
        var o;
        if (t instanceof Array)
          o = i.interpret(t);
        else if (t instanceof Object) {
          var u = t;
          o = {},
            o.translate = u.translate || [0, 0, 0],
            o.rotate = u.rotate || [0, 0, 0],
            o.skew = u.skew || [0, 0, 0],
            o.scale = u.scale || [1, 1, 1],
            t = i.build(o)
        }
        this._finalTranslate = o.translate,
          this._finalRotate = o.rotate,
          this._finalSkew = o.skew,
          this._finalScale = o.scale,
          this._final = t;
        var a = r ? s.after(4, r) : null;
        return this.translate.set(o.translate, n, a),
          this.rotate.set(o.rotate, n, a),
          this.skew.set(o.skew, n, a),
          this.scale.set(o.scale, n, a),
          this
      }
      ,
      o.prototype.setDefaultTransition = function (t) {
        this.translate.setDefault(t),
          this.rotate.setDefault(t),
          this.skew.setDefault(t),
          this.scale.setDefault(t)
      }
      ,
      o.prototype.get = function () {
        return this.isActive() ? u.call(this) : this._final
      }
      ,
      o.prototype.getFinal = function () {
        return this._final
      }
      ,
      o.prototype.isActive = function () {
        return this.translate.isActive() || this.rotate.isActive() || this.scale.isActive() || this.skew.isActive()
      }
      ,
      o.prototype.halt = function () {
        return this.translate.halt(),
          this.rotate.halt(),
          this.skew.halt(),
          this.scale.halt(),
          this._final = this.get(),
          this._finalTranslate = this.translate.get(),
          this._finalRotate = this.rotate.get(),
          this._finalSkew = this.skew.get(),
          this._finalScale = this.scale.get(),
          this
      }
      ,
      n.exports = o
  }),
  define("famous/core/Modifier", ["require", "exports", "module", "./Transform", "../transitions/Transitionable", "../transitions/TransitionableTransform"], function (e, t, n) {
    function o(e) {
      this._transformGetter = null,
        this._opacityGetter = null,
        this._originGetter = null,
        this._alignGetter = null,
        this._sizeGetter = null,
        this._proportionGetter = null,
        this._legacyStates = {},
        this._output = {
          transform: r.identity,
          opacity: 1,
          origin: null,
          align: null,
          size: null,
          proportions: null,
          target: null
        },
        e && (e.transform && this.transformFrom(e.transform),
          e.opacity !== undefined && this.opacityFrom(e.opacity),
          e.origin && this.originFrom(e.origin),
          e.align && this.alignFrom(e.align),
          e.size && this.sizeFrom(e.size),
          e.proportions && this.proportionsFrom(e.proportions))
    }
    function u() {
      this._transformGetter && (this._output.transform = this._transformGetter()),
        this._opacityGetter && (this._output.opacity = this._opacityGetter()),
        this._originGetter && (this._output.origin = this._originGetter()),
        this._alignGetter && (this._output.align = this._alignGetter()),
        this._sizeGetter && (this._output.size = this._sizeGetter()),
        this._proportionGetter && (this._output.proportions = this._proportionGetter())
    }
    var r = e("./Transform")
      , i = e("../transitions/Transitionable")
      , s = e("../transitions/TransitionableTransform");
    o.prototype.transformFrom = function (t) {
      return t instanceof Function ? this._transformGetter = t : t instanceof Object && t.get ? this._transformGetter = t.get.bind(t) : (this._transformGetter = null,
        this._output.transform = t),
        this
    }
      ,
      o.prototype.opacityFrom = function (t) {
        return t instanceof Function ? this._opacityGetter = t : t instanceof Object && t.get ? this._opacityGetter = t.get.bind(t) : (this._opacityGetter = null,
          this._output.opacity = t),
          this
      }
      ,
      o.prototype.originFrom = function (t) {
        return t instanceof Function ? this._originGetter = t : t instanceof Object && t.get ? this._originGetter = t.get.bind(t) : (this._originGetter = null,
          this._output.origin = t),
          this
      }
      ,
      o.prototype.alignFrom = function (t) {
        return t instanceof Function ? this._alignGetter = t : t instanceof Object && t.get ? this._alignGetter = t.get.bind(t) : (this._alignGetter = null,
          this._output.align = t),
          this
      }
      ,
      o.prototype.sizeFrom = function (t) {
        return t instanceof Function ? this._sizeGetter = t : t instanceof Object && t.get ? this._sizeGetter = t.get.bind(t) : (this._sizeGetter = null,
          this._output.size = t),
          this
      }
      ,
      o.prototype.proportionsFrom = function (t) {
        return t instanceof Function ? this._proportionGetter = t : t instanceof Object && t.get ? this._proportionGetter = t.get.bind(t) : (this._proportionGetter = null,
          this._output.proportions = t),
          this
      }
      ,
      o.prototype.setTransform = function (t, n, r) {
        return n || this._legacyStates.transform ? (this._legacyStates.transform || (this._legacyStates.transform = new s(this._output.transform)),
          this._transformGetter || this.transformFrom(this._legacyStates.transform),
          this._legacyStates.transform.set(t, n, r),
          this) : this.transformFrom(t)
      }
      ,
      o.prototype.setOpacity = function (t, n, r) {
        return n || this._legacyStates.opacity ? (this._legacyStates.opacity || (this._legacyStates.opacity = new i(this._output.opacity)),
          this._opacityGetter || this.opacityFrom(this._legacyStates.opacity),
          this._legacyStates.opacity.set(t, n, r)) : this.opacityFrom(t)
      }
      ,
      o.prototype.setOrigin = function (t, n, r) {
        return n || this._legacyStates.origin ? (this._legacyStates.origin || (this._legacyStates.origin = new i(this._output.origin || [0, 0])),
          this._originGetter || this.originFrom(this._legacyStates.origin),
          this._legacyStates.origin.set(t, n, r),
          this) : this.originFrom(t)
      }
      ,
      o.prototype.setAlign = function (t, n, r) {
        return n || this._legacyStates.align ? (this._legacyStates.align || (this._legacyStates.align = new i(this._output.align || [0, 0])),
          this._alignGetter || this.alignFrom(this._legacyStates.align),
          this._legacyStates.align.set(t, n, r),
          this) : this.alignFrom(t)
      }
      ,
      o.prototype.setSize = function (t, n, r) {
        return t && (n || this._legacyStates.size) ? (this._legacyStates.size || (this._legacyStates.size = new i(this._output.size || [0, 0])),
          this._sizeGetter || this.sizeFrom(this._legacyStates.size),
          this._legacyStates.size.set(t, n, r),
          this) : this.sizeFrom(t)
      }
      ,
      o.prototype.setProportions = function (t, n, r) {
        return t && (n || this._legacyStates.proportions) ? (this._legacyStates.proportions || (this._legacyStates.proportions = new i(this._output.proportions || [0, 0])),
          this._proportionGetter || this.proportionsFrom(this._legacyStates.proportions),
          this._legacyStates.proportions.set(t, n, r),
          this) : this.proportionsFrom(t)
      }
      ,
      o.prototype.halt = function () {
        this._legacyStates.transform && this._legacyStates.transform.halt(),
          this._legacyStates.opacity && this._legacyStates.opacity.halt(),
          this._legacyStates.origin && this._legacyStates.origin.halt(),
          this._legacyStates.align && this._legacyStates.align.halt(),
          this._legacyStates.size && this._legacyStates.size.halt(),
          this._legacyStates.proportions && this._legacyStates.proportions.halt(),
          this._transformGetter = null,
          this._opacityGetter = null,
          this._originGetter = null,
          this._alignGetter = null,
          this._sizeGetter = null,
          this._proportionGetter = null
      }
      ,
      o.prototype.getTransform = function () {
        return this._transformGetter()
      }
      ,
      o.prototype.getFinalTransform = function () {
        return this._legacyStates.transform ? this._legacyStates.transform.getFinal() : this._output.transform
      }
      ,
      o.prototype.getOpacity = function () {
        return this._opacityGetter()
      }
      ,
      o.prototype.getOrigin = function () {
        return this._originGetter()
      }
      ,
      o.prototype.getAlign = function () {
        return this._alignGetter()
      }
      ,
      o.prototype.getSize = function () {
        return this._sizeGetter ? this._sizeGetter() : this._output.size
      }
      ,
      o.prototype.getProportions = function () {
        return this._proportionGetter ? this._proportionGetter() : this._output.proportions
      }
      ,
      o.prototype.modify = function (t) {
        return u.call(this),
          this._output.target = t,
          this._output
      }
      ,
      n.exports = o
  }),
  define("famous/views/RenderController", ["require", "exports", "module", "famous/core/Transform", "famous/core/Modifier", "famous/core/RenderNode", "famous/utilities/Utility", "famous/core/OptionsManager", "famous/transitions/Transitionable", "famous/transitions/TransitionableTransform"], function (e, t, n) {
    function l() {
      this.renderables = [],
        this.nodes = [],
        this.transforms = [],
        this.states = []
    }
    function c(e) {
      return e || (e = {}),
        e = {
          opacity: e.opacity === undefined ? 1 : e.opacity,
          origin: e.origin || [.5, .5],
          align: e.align || [.5, .5],
          transform: e.transform || r.identity,
          visible: e.visible === undefined ? !0 : e.visible,
          zIndex: e.zIndex === undefined ? 1 : e.zIndex
        },
        e
    }
    var r = e("famous/core/Transform")
      , i = e("famous/core/Modifier")
      , s = e("famous/core/RenderNode")
      , o = e("famous/utilities/Utility")
      , u = e("famous/core/OptionsManager")
      , a = e("famous/transitions/Transitionable")
      , f = e("famous/transitions/TransitionableTransform");
    l.prototype.addRenderable = function (e, t) {
      if (!e)
        return;
      var n = this.renderables.indexOf(e);
      if (n !== -1) {
        this.modifyRenderableWithOptions(e, t);
        return
      }
      t = c(t);
      var r = {
        transform: new f(t.transform),
        origin: new a(t.origin),
        align: new a(t.align),
        opacity: new a(t.opacity)
      }
        , o = new i({
          transform: r.transform,
          opacity: r.opacity,
          origin: r.origin,
          align: r.align
        })
        , u = new s;
      u.add(o).add(e),
        this.renderables.push(e),
        this.nodes.push(u),
        this.states.push(r),
        this.transforms.push(o)
    }
      ,
      l.prototype.insertRenderable = function (e, t, n) {
        if (!e)
          return;
        var r = this.renderables.indexOf(e);
        if (r !== -1)
          return;
        t = c(t);
        var o = {
          transform: new f(t.transform),
          origin: new a(t.origin),
          align: new a(t.align),
          opacity: new a(t.opacity)
        }
          , u = new i({
            transform: o.transform,
            opacity: o.opacity,
            origin: o.origin,
            align: o.align
          })
          , l = new s;
        l.add(u).add(e),
          this.renderables.splice(n, 0, e),
          this.nodes.splice(n, 0, l),
          this.states.splice(n, 0, o),
          this.transforms.splice(n, 0, u)
      }
      ,
      l.prototype.removeRenderable = function (e) {
        if (!e)
          return;
        var t = this.renderables.indexOf(e);
        if (t === -1)
          return;
        this.renderables.splice(t, 1),
          this.nodes.splice(t, 1),
          this.states.splice(t, 1),
          this.transforms.splice(t, 1)
      }
      ,
      l.prototype.removeAllRenderablesExcept = function (e) {
        var t = [];
        for (var n = 0, r = this.renderables.length; n < r; n++) {
          var i = this.renderables[n];
          i !== e && t.push(i)
        }
        for (var n = 0, r = t.length; n < r; n++) {
          var i = t[n];
          this.removeRenderable(i)
        }
        return t
      }
      ,
      l.prototype.removeAllRenderablesExceptSome = function (e) {
        var t = [];
        for (var n = 0, r = this.renderables.length; n < r; n++) {
          var i = this.renderables[n]
            , s = !1;
          for (var o = 0, u = e.length; o < u; o++) {
            var a = e[o];
            if (i === a) {
              s = !0;
              break
            }
          }
          s || t.push(i)
        }
        for (var n = 0, r = t.length; n < r; n++) {
          var i = t[n];
          this.removeRenderable(i)
        }
        return t
      }
      ,
      l.prototype.foreachRenderableExceptSome = function (e, t) {
        if (!t)
          return;
        var n = [];
        for (var r = 0, i = this.renderables.length; r < i; r++) {
          var s = this.renderables[r]
            , o = !1;
          for (var u = 0, a = e.length; u < a; u++) {
            var f = e[u];
            if (s === f) {
              o = !0;
              break
            }
          }
          o || n.push(s)
        }
        for (var r = 0, i = n.length; r < i; r++) {
          var s = n[r];
          t(s, r)
        }
        return n
      }
      ,
      l.prototype.animateRenderableWithFromToOptions = function (e, t, n, r, i) {
        if (!e)
          return;
        var s = this.renderables.indexOf(e);
        if (s === -1)
          return;
        null !== n && (n = c(n)),
          r = c(r);
        var u = this.states[s];
        null !== n && (u.transform.set(n.transform),
          u.opacity.set(n.opacity),
          u.origin.set(n.origin),
          u.align.set(n.align));
        var a = i ? o.after(3, i) : undefined;
        u.transform.set(r.transform, t, a),
          u.opacity.set(r.opacity, t, a),
          u.origin.set(r.origin, t, a),
          u.align.set(r.align, t, a)
      }
      ,
      l.prototype.modifyRenderableWithOptions = function (e, t) {
        if (!e)
          return;
        var n = this.renderables.indexOf(e);
        if (n === -1)
          return;
        t = c(t);
        var r = this.states[n];
        r.transform.set(t.transform),
          r.opacity.set(t.opacity),
          r.origin.set(t.origin),
          r.align.set(t.align)
      }
      ,
      l.prototype.stateItem4Renderable = function (e) {
        if (!e)
          return null;
        var t = this.renderables.indexOf(e);
        return -1 !== t ? this.states[t] : null
      }
      ,
      l.prototype.hasRenderable = function (e) {
        if (!e)
          return !1;
        var t = this.renderables.indexOf(e);
        return -1 !== t
      }
      ,
      l.prototype.indexOfRenderable = function (e) {
        return e ? this.renderables.indexOf(e) : -1
      }
      ,
      l.prototype.render = function () {
        var t = [];
        for (var n = 0; n < this.nodes.length; n++)
          t.push(this.nodes[n].render());
        return t.length > 0 ? t : "."
      }
      ,
      n.exports = l
  }),
  define("famous/core/View", ["require", "exports", "module", "./EventHandler", "./OptionsManager", "./RenderNode", "../utilities/Utility"], function (e, t, n) {
    function u(e) {
      this._node = new s,
        this._eventInput = new r,
        this._eventOutput = new r,
        r.setInputHandler(this, this._eventInput),
        r.setOutputHandler(this, this._eventOutput),
        this.options = o.clone(this.constructor.DEFAULT_OPTIONS || u.DEFAULT_OPTIONS),
        this._optionsManager = new i(this.options),
        e && this.setOptions(e)
    }
    var r = e("./EventHandler")
      , i = e("./OptionsManager")
      , s = e("./RenderNode")
      , o = e("../utilities/Utility");
    u.DEFAULT_OPTIONS = {},
      u.prototype.getOptions = function (t) {
        return this._optionsManager.getOptions(t)
      }
      ,
      u.prototype.setOptions = function (t) {
        this._optionsManager.patch(t)
      }
      ,
      u.prototype.add = function () {
        return this._node.add.apply(this._node, arguments)
      }
      ,
      u.prototype._add = u.prototype.add,
      u.prototype.render = function () {
        return this._node.render()
      }
      ,
      u.prototype.getSize = function () {
        return this._node && this._node.getSize ? this._node.getSize.apply(this._node, arguments) || this.options.size : this.options.size
      }
      ,
      n.exports = u
  }),
  define("famous/surfaces/ContainerSurface", ["require", "exports", "module", "../core/Surface", "../core/Context"], function (e, t, n) {
    function s(e) {
      r.call(this, e),
        this._container = document.createElement("div"),
        this._container.classList.add("famous-group"),
        this._container.classList.add("famous-container-group"),
        this._shouldRecalculateSize = !1;
      var t = e.hasInnerStatic;
      t ? (this._inner_container = document.createElement("div"),
        this._inner_container.classList.add("famous-static"),
        this._container.appendChild(this._inner_container),
        this.context = new i(this._inner_container)) : this.context = new i(this._container),
        this.setContent(this._container)
    }
    var r = e("../core/Surface")
      , i = e("../core/Context");
    s.prototype = Object.create(r.prototype),
      s.prototype.constructor = s,
      s.prototype.elementType = "div",
      s.prototype.elementClass = "famous-surface",
      s.prototype.setOptions = function (t) {
        r.prototype.setOptions.call(this, t);
        if (this._inner_container) {
          var n = t.properties;
          n && (n = n.overflow,
            n === "hidden" ? this._inner_container.style.overflow = "hidden" : this._inner_container.style.overflow = "visible")
        }
        return this
      }
      ,
      s.prototype.add = function () {
        return this.context.add.apply(this.context, arguments)
      }
      ,
      s.prototype.render = function () {
        return this._sizeDirty && (this._shouldRecalculateSize = !0),
          r.prototype.render.apply(this, arguments)
      }
      ,
      s.prototype.deploy = function () {
        return this._shouldRecalculateSize = !0,
          r.prototype.deploy.apply(this, arguments)
      }
      ,
      s.prototype.commit = function (t, n, i, s, o) {
        var u = this._size ? [this._size[0], this._size[1]] : null
          , a = r.prototype.commit.apply(this, arguments);
        if (this._shouldRecalculateSize || u && (this._size[0] !== u[0] || this._size[1] !== u[1]))
          this.context.setSize(),
            this._shouldRecalculateSize = !1;
        return this.context.update(),
          a
      }
      ,
      n.exports = s
  }),
  define("famous/modifiers/StateModifier", ["require", "exports", "module", "../core/Modifier", "../core/Transform", "../transitions/Transitionable", "../transitions/TransitionableTransform"], function (e, t, n) {
    function u(e) {
      this._transformState = new o(i.identity),
        this._opacityState = new s(1),
        this._originState = new s([0, 0]),
        this._alignState = new s([0, 0]),
        this._sizeState = new s([0, 0]),
        this._proportionsState = new s([0, 0]),
        this._modifier = new r({
          transform: this._transformState,
          opacity: this._opacityState,
          origin: null,
          align: null,
          size: null,
          proportions: null
        }),
        this._hasOrigin = !1,
        this._hasAlign = !1,
        this._hasSize = !1,
        this._hasProportions = !1,
        e && (e.transform && this.setTransform(e.transform),
          e.opacity !== undefined && this.setOpacity(e.opacity),
          e.origin && this.setOrigin(e.origin),
          e.align && this.setAlign(e.align),
          e.size && this.setSize(e.size),
          e.proportions && this.setProportions(e.proportions))
    }
    var r = e("../core/Modifier")
      , i = e("../core/Transform")
      , s = e("../transitions/Transitionable")
      , o = e("../transitions/TransitionableTransform");
    u.prototype.setTransform = function (t, n, r) {
      return this._transformState.set(t, n, r),
        this
    }
      ,
      u.prototype.setOpacity = function (t, n, r) {
        return this._opacityState.set(t, n, r),
          this
      }
      ,
      u.prototype.setOrigin = function (t, n, r) {
        return t === null ? (this._hasOrigin && (this._modifier.originFrom(null),
          this._hasOrigin = !1),
          this) : (this._hasOrigin || (this._hasOrigin = !0,
            this._modifier.originFrom(this._originState)),
            this._originState.set(t, n, r),
            this)
      }
      ,
      u.prototype.setAlign = function (t, n, r) {
        return t === null ? (this._hasAlign && (this._modifier.alignFrom(null),
          this._hasAlign = !1),
          this) : (this._hasAlign || (this._hasAlign = !0,
            this._modifier.alignFrom(this._alignState)),
            this._alignState.set(t, n, r),
            this)
      }
      ,
      u.prototype.setSize = function (t, n, r) {
        return t === null ? (this._hasSize && (this._modifier.sizeFrom(null),
          this._hasSize = !1),
          this) : (this._hasSize || (this._hasSize = !0,
            this._modifier.sizeFrom(this._sizeState)),
            this._sizeState.set(t, n, r),
            this)
      }
      ,
      u.prototype.setProportions = function (t, n, r) {
        return t === null ? (this._hasProportions && (this._modifier.proportionsFrom(null),
          this._hasProportions = !1),
          this) : (this._hasProportions || (this._hasProportions = !0,
            this._modifier.proportionsFrom(this._proportionsState)),
            this._proportionsState.set(t, n, r),
            this)
      }
      ,
      u.prototype.halt = function () {
        this._transformState.halt(),
          this._opacityState.halt(),
          this._originState.halt(),
          this._alignState.halt(),
          this._sizeState.halt(),
          this._proportionsState.halt()
      }
      ,
      u.prototype.getTransform = function () {
        return this._transformState.get()
      }
      ,
      u.prototype.getFinalTransform = function () {
        return this._transformState.getFinal()
      }
      ,
      u.prototype.getOpacity = function () {
        return this._opacityState.get()
      }
      ,
      u.prototype.getOrigin = function () {
        return this._hasOrigin ? this._originState.get() : null
      }
      ,
      u.prototype.getAlign = function () {
        return this._hasAlign ? this._alignState.get() : null
      }
      ,
      u.prototype.getSize = function () {
        return this._hasSize ? this._sizeState.get() : null
      }
      ,
      u.prototype.getProportions = function () {
        return this._hasProportions ? this._proportionsState.get() : null
      }
      ,
      u.prototype.modify = function (t) {
        return this._modifier.modify(t)
      }
      ,
      n.exports = u
  }),
  define("famous/modifiers/ModifierChain", ["require", "exports", "module"], function (e, t, n) {
    function r() {
      this._chain = [],
        arguments.length && this.addModifier.apply(this, arguments)
    }
    r.prototype.addModifier = function (t) {
      Array.prototype.push.apply(this._chain, arguments)
    }
      ,
      r.prototype.removeModifier = function (t) {
        var n = this._chain.indexOf(t);
        if (n < 0)
          return;
        this._chain.splice(n, 1)
      }
      ,
      r.prototype.modify = function (t) {
        var n = this._chain
          , r = t;
        for (var i = 0, s = n.length; i < s; i++)
          r = n[i].modify(r);
        return r
      }
      ,
      n.exports = r
  }),
  define("utils/MotionPath", ["require", "exports", "module"], function (e, t, n) {
    "use strict";
    function r() {
      this.paths = [],
        this.start = 0,
        this.end = NaN,
        this.strength = 0
    }
    function i(e, t) {
      this.control = 0,
        this.end = e,
        this.strength = typeof t == "undefined" ? 1 : t
    }
    function s(e, t, n) {
      this.control = e,
        this.end = t,
        this.strength = typeof n == "undefined" ? 1 : n
    }
    function o(e, t, n, r) {
      this.control1 = e,
        this.control2 = t,
        this.end = n,
        this.strength = typeof r == "undefined" ? 1 : r
    }
    r.prototype.addPath = function (e) {
      return this.paths.push(e),
        this.end = e.end,
        this.strength += e.strength,
        this
    }
      ,
      r.prototype.interpolate = function (e) {
        if (this.paths.length === 1)
          return this.paths[0].interpolate(this.start, e);
        var t = e * this.strength
          , n = this.start;
        for (var r = 0, i = this.paths.length, s; r < i; r++) {
          s = this.paths[r];
          if (!(t > s.strength))
            return s.interpolate(n, t / s.strength);
          t -= s.strength,
            n = s.end
        }
        return 0
      }
      ,
      r.prototype.lineTo = function (e, t) {
        return this.addPath(new i(e, t))
      }
      ,
      r.prototype.quadraticCurveTo = function (e, t, n) {
        return this.addPath(new s(e, t, n))
      }
      ,
      r.prototype.bezierCurveTo = function (e, t, n, r) {
        return this.addPath(new o(e, t, n, r))
      }
      ,
      r.prototype.closePath = function () {
        return this.lineTo(this.start)
      }
      ,
      i.prototype.interpolate = function (e, t) {
        return e + t * (this.end - e)
      }
      ,
      s.prototype.interpolate = function (e, t) {
        return (1 - t) * (1 - t) * e + 2 * (1 - t) * t * this.control + t * t * this.end
      }
      ,
      o.prototype.interpolate = function (e, t) {
        return Math.pow(1 - t, 3) * e + 3 * Math.pow(1 - t, 2) * t * this.control1 + 3 * Math.pow(1 - t, 1) * Math.pow(t, 2) * this.control2 + Math.pow(t, 3) * this.end
      }
      ,
      n.exports = r
  }),
  define("utils/EasingUtils", ["require", "exports", "module", "famous/transitions/Easing", "famous/transitions/TweenTransition"], function (e, t, n) {
    "use strict";
    var r = e("famous/transitions/Easing")
      , i = e("famous/transitions/TweenTransition")
      , s = {};
    s.EaseInstant = 0,
      s.EaseLinear = 1,
      s.EaseInSine = 2,
      s.EaseOutSine = 3,
      s.EaseInOutSine = 4,
      s.EaseInQuad = 5,
      s.EaseOutQuad = 6,
      s.EaseInOutQuad = 7,
      s.EaseInCubic = 8,
      s.EaseOutCubic = 9,
      s.EaseInOutCubic = 10,
      s.EaseInQuart = 11,
      s.EaseOutQuart = 12,
      s.EaseInOutQuart = 13,
      s.EaseInQuint = 14,
      s.EaseOutQuint = 15,
      s.EaseInOutQuint = 16,
      s.EaseInExpo = 17,
      s.EaseOutExpo = 18,
      s.EaseInOutExpo = 19,
      s.EaseInCirc = 20,
      s.EaseOutCirc = 21,
      s.EaseInOutCirc = 22,
      s.EaseInBack = 23,
      s.EaseOutBack = 24,
      s.EaseInOutBack = 25,
      s.EaseInElastic = 26,
      s.EaseOutElastic = 27,
      s.EaseInOutElastic = 28,
      s.EaseInBounce = 29,
      s.EaseOutBounce = 30,
      s.EaseInOutBounce = 31,
      s.easingFuncBy = function (e) {
        switch (e) {
          case s.EaseLinear:
            return i.Curves.linear;
          case s.EaseInSine:
            return r.inSine;
          case s.EaseOutSine:
            return r.outSine;
          case s.EaseInOutSine:
            return r.inOutSine;
          case s.EaseInQuad:
            return r.inQuad;
          case s.EaseOutQuad:
            return r.outQuad;
          case s.EaseInOutQuad:
            return r.inOutQuad;
          case s.EaseInCubic:
            return r.inCubic;
          case s.EaseOutCubic:
            return r.outCubic;
          case s.EaseInOutCubic:
            return r.inOutCubic;
          case s.EaseInQuart:
            return r.inQuart;
          case s.EaseOutQuart:
            return r.outQuart;
          case s.EaseInoutQuart:
            return r.inOutQuart;
          case s.EaseInQuint:
            return r.inQuint;
          case s.EaseOutQuint:
            return r.outQuint;
          case s.EaseInOutQuint:
            return r.inOutQuint;
          case s.EaseInExpo:
            return r.inExpo;
          case s.EaseOutExpo:
            return r.outExpo;
          case s.EaseInOutExpo:
            return r.inOutExpo;
          case s.EaseInCirc:
            return r.inCirc;
          case s.EaseOutCirc:
            return r.outCirc;
          case s.EaseInOutCirc:
            return r.inOutCirc;
          case s.EaseInBack:
            return r.inBack;
          case s.EaseOutBack:
            return r.outBack;
          case s.EaseInOutBack:
            return r.inOutBack;
          case s.EaseInElastic:
            return r.inElastic;
          case s.EaseOutElastic:
            return r.outElastic;
          case s.EaseInOutElastic:
            return r.inOutElastic;
          case s.EaseInBounce:
            return r.inBounce;
          case s.EaseOutBounce:
            return r.outBounce;
          case s.EaseInOutBounce:
            return r.inOutBounce;
          default:
        }
        return i.Curves.linear
      }
      ,
      s.easingCssStyleClauseBy = function (e) {
        switch (e) {
          case s.EaseLinear:
            return "-webkit-animation-timing-function: linear; animation-timing-function: linear;";
          case s.EaseInSine:
            return "-webkit-animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715); animation-timing-function: cubic-bezier(0.47, 0, 0.745, 0.715);";
          case s.EaseOutSine:
            return "-webkit-animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1); animation-timing-function: cubic-bezier(0.39, 0.575, 0.565, 1);";
          case s.EaseInOutSine:
            return "-webkit-animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95); animation-timing-function: cubic-bezier(0.445, 0.05, 0.55, 0.95);";
          case s.EaseInQuad:
            return "-webkit-animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53); animation-timing-function: cubic-bezier(0.55, 0.085, 0.68, 0.53);";
          case s.EaseOutQuad:
            return "-webkit-animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94); animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);";
          case s.EaseInOutQuad:
            return "-webkit-animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955); animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);";
          case s.EaseInCubic:
            return "-webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);";
          case s.EaseOutCubic:
            return "-webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);";
          case s.EaseInOutCubic:
            return "-webkit-animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1); animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);";
          case s.EaseInQuart:
            return "-webkit-animation-timing-function: cubic-bezier(0.895, 0.03, 0.685, 0.22); animation-timing-function: cubic-bezier(0.895, 0.03, 0.685, 0.22);";
          case s.EaseOutQuart:
            return "-webkit-animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1); animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);";
          case s.EaseInoutQuart:
            return "-webkit-animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1); animation-timing-function: cubic-bezier(0.77, 0, 0.175, 1);";
          case s.EaseInQuint:
            return "-webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06); animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);";
          case s.EaseOutQuint:
            return "-webkit-animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1); animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);";
          case s.EaseInOutQuint:
            return "-webkit-animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1); animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);";
          case s.EaseInExpo:
            return "-webkit-animation-timing-function: cubic-bezier(0.95, 0.05, 0.795, 0.035); animation-timing-function: cubic-bezier(0.95, 0.05, 0.795, 0.035);";
          case s.EaseOutExpo:
            return "-webkit-animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1); animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1);";
          case s.EaseInOutExpo:
            return "-webkit-animation-timing-function: cubic-bezier(1, 0, 0, 1); animation-timing-function: cubic-bezier(1, 0, 0, 1);";
          case s.EaseInCirc:
            return "-webkit-animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335); animation-timing-function: cubic-bezier(0.6, 0.04, 0.98, 0.335);";
          case s.EaseOutCirc:
            return "-webkit-animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1); animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);";
          case s.EaseInOutCirc:
            return "-webkit-animation-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86); animation-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);";
          case s.EaseInBack:
            return "-webkit-animation-timing-function: cubic-bezier(0.6, -0.28, 0.735, 0.045); animation-timing-function: cubic-bezier(0.6, -0.28, 0.735, 0.045);";
          case s.EaseOutBack:
            return "-webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275); animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);";
          case s.EaseInOutBack:
            return "-webkit-animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);";
          case s.EaseInElastic:
          case s.EaseOutElastic:
          case s.EaseInOutElastic:
          case s.EaseInBounce:
          case s.EaseOutBounce:
          case s.EaseInOutBounce:
          default:
        }
        return "-webkit-animation-timing-function: linear; animation-timing-function: linear;"
      }
      ,
      n.exports = s
  }),
  define("animations/KeyFrameAnim", ["require", "exports", "module", "famous/core/Engine", "famous/utilities/Timer", "utils/MotionPath", "utils/EasingUtils", "utils/DebugUtils"], function (e, t, n) {
    "use strict";
    function f(e) {
      this.actor = e,
        this.keyFrames = e.nodeDesc.keyframes,
        this.keyFramesCount = this.keyFrames.length,
        this.srcFrameIdx = 0,
        this.dstFrameIdx = 0,
        this.srcFrameTime = 0,
        this.dstFrameTime = 0,
        this.curAnimTime = 0,
        this.curveFn = null,
        this.loopCount = 0,
        this.totalAnimTime = e.nodeDesc.duration * 1e3,
        this.delayTime = (e.nodeDesc.delay || 0) * 1e3,
        this.intervalTime = (e.nodeDesc.interval || 0) * 1e3,
        this.isReversePlay = !1,
        this.animTimer = null,
        this.animStartTime = null,
        this.rangeFromTime = null,
        this.rangeToTime = null,
        this.rangeTimes = null,
        this.initTime = 0,
        this.initOffsetX = 0,
        this.initOffsetY = 0,
        this.x_path = null,
        this.y_path = null,
        this.curveArgs = null,
        this.initTangent = null;
      if (this.keyFrames.length > 0) {
        var t = this.keyFrames[0];
        this.initTime = t.time;
        var n = u.valueOrDefault(e.nodeDesc.anchorX, .5)
          , r = u.valueOrDefault(e.nodeDesc.anchorY, .5)
          , i = u.valueOrDefault(t.anchorX, .5)
          , s = u.valueOrDefault(t.anchorY, .5);
        this.initOffsetX = t.positionX + (n - i) * e.nodeDesc.sizeX,
          this.initOffsetY = t.positionY + (r - s) * e.nodeDesc.sizeY
      }
      this.keyframeConfigs = a.parseKeyframesFromArray(e.nodeDesc.keyframes),
        this.actor.createDisplacementModifier();
      var o = a.hasScrollOneInActions(e.nodeActions);
      !e.nodeDesc.autoplay && o && l.call(this, e.containerSurface)
    }
    function l(e) { }
    function c(e, t) {
      var n = null !== this.curveFn
        , r = this.keyFrames
        , i = this.srcFrameIdx !== e || this.dstFrameIdx !== t;
      if (n && !i)
        return;
      this.srcFrameIdx = e,
        this.srcFrameTime = (r[e].time - this.initTime) * 1e3,
        this.dstFrameIdx = t,
        this.dstFrameTime = (r[t].time - this.initTime) * 1e3,
        this.curveFn = o.easingFuncBy(r[Math.max(e, t)].easing),
        this.readyDisplacement(),
        this.readyAnchor(),
        this.readyScale(),
        this.readyRotation(),
        this.readyOpacity()
    }
    function h() {
      if (!this.actor.initialized || !this.actor.actived)
        return;
      var e = this.srcFrameIdx > this.dstFrameIdx
        , t = [[0, 1, 0, 0], [0, 0, 0, 0], [0, 1, 0, 1], [0, 1, 1, 0]]
        , n = 1
        , r = this.keyframeConfigs;
      for (var i = 0, s = r.length; i < s; i++) {
        var o = r[i];
        if (o.performs.length <= 0)
          continue;
        var u = o.at || 0
          , a = (this.keyFrames[i].time - this.initTime) * 1e3;
        a > this.curAnimTime + n ? o.at = 3 : a < this.curAnimTime - n ? o.at = 2 : o.at = 1;
        if (e && i !== 0 && i !== s - 1)
          continue;
        if (t[u][o.at] === 1)
          for (var f = 0, l = o.performs.length; f < l; f++) {
            var c = o.performs[f];
            c.execute()
          }
      }
    }
    function p() {
      var e = this.keyframeConfigs;
      for (var t = 0, n = e.length; t < n; t++) {
        var r = e[t];
        r.at = 0
      }
    }
    function d(e) {
      if (!this.actor.initialized || !this.actor.actived)
        return;
      var t = this.keyframeConfigs
        , n = this.srcFrameIdx
        , r = null
        , i = null;
      this.srcFrameIdx > this.dstFrameIdx ? (r = (n + t.length - 1) % t.length,
        i = (n + 1) % t.length) : (r = n > 0 ? n - 1 : null,
          i = n < t.length - 1 ? n + 1 : null);
      for (var s = 0, o = t.length; s < o; s++) {
        var u = t[s]
          , a = 0;
        s === n ? a = Math.max(-1, Math.min(1, e)) : s === r ? a = Math.max(-1, Math.min(1, e + 1)) : s === i ? a = Math.max(-1, Math.min(1, e - 1)) : a = s < n ? -1 : 1;
        for (var f = 0; f < u.hooks.length; f++) {
          var l = u.hooks[f];
          l.executeStep(1 - Math.abs(a))
        }
      }
    }
    function v(e) {
      var t = this.curveFn((e - this.srcFrameTime) / (this.dstFrameTime - this.srcFrameTime))
        , n = this.x_path.interpolate(t)
        , r = this.y_path.interpolate(t);
      this.actor.setDisplacementPos(n - this.initOffsetX, r - this.initOffsetY);
      var i = this.destAnchorX - this.startAnchorX;
      this.actor.setMetNodeAnchorX(this.startAnchorX + i * t);
      var s = this.destAnchorY - this.startAnchorY;
      this.actor.setMetNodeAnchorY(this.startAnchorY + s * t);
      var o = this.destScaleX - this.startScaleX;
      this.actor.setMetNodeScaleX(this.startScaleX + o * t);
      var u = this.destScaleY - this.startScaleY;
      this.actor.setMetNodeScaleY(this.startScaleY + u * t);
      var a = this.destRotationX - this.startRotationX;
      this.actor.setMetNodeRotateX(this.startRotationX + a * t);
      var f = this.destRotationY - this.startRotationY;
      this.actor.setMetNodeRotateY(this.startRotationY + f * t);
      var l = this.destRotationZ - this.startRotationZ
        , c = 0;
      null !== this.initTangent && (c = m.call(this, t) - this.initTangent),
        this.actor.setMetNodeRotateZ(this.startRotationZ + l * t + c);
      var h = this.destOpacity - this.startOpacity;
      this.actor.setMetNodeOpacity(this.startOpacity + h * t),
        d.call(this, t)
    }
    function m(e) {
      if (null === this.curveArgs)
        return 0;
      var t = [this.curveArgs[0], this.curveArgs[2], this.curveArgs[4], this.curveArgs[6]]
        , n = [this.curveArgs[1], this.curveArgs[3], this.curveArgs[5], this.curveArgs[7]]
        , r = [t[0], 0, 0, 0]
        , i = [n[0], 0, 0, 0]
        , s = [0, 0, 0, t[3]]
        , o = [0, 0, 0, n[3]];
      for (var u = 1; u <= 3; u++) {
        for (var a = 0; a <= 3 - u; a++)
          t[a] = (1 - e) * t[a] + e * t[a + 1],
            n[a] = (1 - e) * n[a] + e * n[a + 1];
        r[u] = t[0],
          i[u] = n[0],
          s[3 - u] = t[3 - u],
          o[3 - u] = n[3 - u]
      }
      var f = Math.atan2(o[1] - i[2], s[1] - r[2]);
      return f
    }
    var r = e("famous/core/Engine")
      , i = e("famous/utilities/Timer")
      , s = e("utils/MotionPath")
      , o = e("utils/EasingUtils")
      , u = e("utils/DebugUtils")
      , a = null;
    e(["actions/MetNodeAction"], function (e) {
      a = e
    }),
      f.prototype.startAnimAfterDelay = function (e) {
        null === e && (e = this.delayTime),
          this.isPlaying() && this.stopAnim(),
          this.animTimer = i.setTimeout(function () {
            this.isReversePlay ? this.animStartTime = r.getCurrentFrameTime() + this.curAnimTime - this.totalAnimTime : this.animStartTime = r.getCurrentFrameTime() - this.curAnimTime,
              this.animTimer = i.every(function () {
                this.updateAnim()
              }
                .bind(this), 1)
          }
            .bind(this), e)
      }
      ,
      f.prototype.rangePlay = function (e, t, n) {
        this.stopAnim(),
          this.gotoTime(e),
          e !== t && (this.isReversePlay = e > t,
            this.rangeFromTime = e,
            this.rangeToTime = t,
            this.rangeTimes = n,
            this.startAnimAfterDelay(0))
      }
      ,
      f.prototype.stopAnim = function () {
        this.animTimer && (i.clear(this.animTimer),
          delete this.animTimer,
          this.animTimer = null),
          this.animStartTime && (this.animStartTime = null),
          this.rangeFromTime && (this.rangeFromTime = null),
          this.rangeToTime && (this.rangeToTime = null),
          this.rangeTimes && (this.rangeTimes = null),
          this.loopCount = 0,
          this.isReversePlay = !1
      }
      ,
      f.prototype.isPlaying = function () {
        return null !== this.animTimer
      }
      ,
      f.prototype.resetTimeProgress = function (e) {
        if (!this.actor.nodeDesc.reversePlay) {
          if (e || this.curAnimTime >= this.totalAnimTime)
            this.isReversePlay = !1,
              p.call(this),
              this.gotoTime(0)
        } else if (e || this.curAnimTime <= 0)
          this.isReversePlay = !0,
            p.call(this),
            this.gotoTime(this.totalAnimTime)
      }
      ,
      f.prototype.readyDisplacement = function () {
        var e = this.keyFrames[this.srcFrameIdx]
          , t = this.keyFrames[this.dstFrameIdx]
          , n = e.positionX
          , r = e.positionY
          , i = t.positionX
          , o = t.positionY
          , u = {
            x: n + (e.controlAX || 0),
            y: r + (e.controlAY || 0)
          }
          , a = {
            x: i + (t.controlBX || 0),
            y: o + (t.controlBY || 0)
          };
        this.x_path = new s,
          this.x_path.start = n,
          e.controlAX || t.controlBX ? this.x_path.bezierCurveTo(u.x, a.x, i) : this.x_path.lineTo(i),
          this.x_path.end = i,
          this.y_path = new s,
          this.y_path.start = r,
          e.controlAY || t.controlBY ? this.y_path.bezierCurveTo(u.y, a.y, o) : this.y_path.lineTo(o),
          this.y_path.end = o,
          this.curveArgs = [n, r, u.x, u.y, a.x, a.y, i, o],
          this.actor.nodeDesc.autoRotate && null === this.initTangent && (this.initTangent = m.call(this, 0))
      }
      ,
      f.prototype.readyAnchor = function () {
        var e = this.keyFrames[this.srcFrameIdx]
          , t = this.keyFrames[this.dstFrameIdx];
        this.startAnchorX = u.valueOrDefault(e.anchorX, .5),
          this.startAnchorY = u.valueOrDefault(e.anchorY, .5),
          this.destAnchorX = u.valueOrDefault(t.anchorX, .5),
          this.destAnchorY = u.valueOrDefault(t.anchorY, .5)
      }
      ,
      f.prototype.readyScale = function () {
        var e = this.keyFrames[this.srcFrameIdx]
          , t = this.keyFrames[this.dstFrameIdx];
        this.startScaleX = u.valueOrDefault(e.scaleX, 1),
          this.startScaleY = u.valueOrDefault(e.scaleY, 1),
          this.destScaleX = u.valueOrDefault(t.scaleX, 1),
          this.destScaleY = u.valueOrDefault(t.scaleY, 1)
      }
      ,
      f.prototype.readyRotation = function () {
        var e = this.keyFrames[this.srcFrameIdx]
          , t = this.keyFrames[this.dstFrameIdx];
        this.startRotationX = e.rotationX || 0,
          this.startRotationY = e.rotationY || 0,
          this.startRotationZ = e.rotation || 0,
          this.destRotationX = t.rotationX || 0,
          this.destRotationY = t.rotationY || 0,
          this.destRotationZ = t.rotation || 0
      }
      ,
      f.prototype.readyOpacity = function () {
        var e = this.keyFrames[this.srcFrameIdx]
          , t = this.keyFrames[this.dstFrameIdx];
        this.startOpacity = u.valueOrDefault(e.opacity, 1),
          this.destOpacity = u.valueOrDefault(t.opacity, 1)
      }
      ,
      f.prototype.gotoTime = function (e) {
        var t = this.keyFrames
          , n = null
          , r = null;
        if (e > this.totalAnimTime)
          n = t.length - 1,
            r = 0,
            e = this.totalAnimTime * 2 - Math.min(e, this.totalAnimTime * 2);
        else if (e < 0)
          n = t.length - 1,
            r = 0,
            e = -e;
        else if (t.length <= 2)
          n = 0;
        else
          for (var i = 0, s = t.length; i < s - 1; i++) {
            var o = t[i]
              , u = t[i + 1];
            if (i === 0) {
              if (e < (o.time - this.initTime) * 1e3) {
                n = i;
                break
              }
            } else if (i === s - 2 && e >= (u.time - this.initTime) * 1e3) {
              n = i;
              break
            }
            if (e >= (o.time - this.initTime) * 1e3 && e < (u.time - this.initTime) * 1e3) {
              n = i;
              break
            }
          }
        if (null !== n) {
          null === r && (r = n + 1),
            c.call(this, n, r);
          var a = e !== this.curAnimTime;
          v.call(this, this.curAnimTime = e),
            a && h.call(this)
        }
      }
      ,
      f.prototype.gotoDefaultKeyframe = function () {
        var e = this.keyFrames[this.actor.nodeDesc.beginningKeyframe || 0]
          , t = (e.time - this.initTime) * 1e3;
        t = Math.min(this.totalAnimTime, Math.max(0, t)),
          this.gotoTime(t),
          this.isReversePlay = this.actor.nodeDesc.reversePlay || !1
      }
      ,
      f.prototype.updateAnim = function () {
        if (!this.isPlaying())
          return;
        var e = this.curAnimTime
          , t = r.getCurrentFrameTime()
          , n = t - this.animStartTime;
        n < 0 ? n = 0 : n > this.totalAnimTime && (n = this.totalAnimTime),
          this.curAnimTime = this.isReversePlay ? this.totalAnimTime - n : n;
        var i = !1
          , s = !1;
        if (this.isReversePlay) {
          var o = (this.keyFrames[0].time - this.initTime) * 1e3;
          this.curAnimTime <= o + .001 ? (this.curAnimTime = o,
            s = !0) : this.curAnimTime <= this.srcFrameTime && (this.curAnimTime = this.srcFrameTime,
              i = !0)
        } else {
          var a = (this.keyFrames[this.keyFramesCount - 1].time - this.initTime) * 1e3;
          this.curAnimTime >= a - .001 ? (this.curAnimTime = a,
            s = !0) : this.curAnimTime >= this.dstFrameTime && (this.curAnimTime = this.dstFrameTime,
              i = !0)
        }
        var f = e !== this.curAnimTime;
        v.call(this, this.curAnimTime),
          f && h.call(this),
          i && (this.isReversePlay ? c.call(this, this.srcFrameIdx - 1, this.srcFrameIdx) : c.call(this, this.srcFrameIdx + 1, this.srcFrameIdx + 2));
        if (null !== this.rangeFromTime && null !== this.rangeToTime) {
          if (this.rangeFromTime < this.rangeToTime && this.curAnimTime >= this.rangeToTime || this.rangeFromTime > this.rangeToTime && this.curAnimTime <= this.rangeToTime)
            this.rangeTimes > 0 && this.loopCount++,
              r.defer(function () {
                this.rangeTimes <= 0 || this.loopCount < this.rangeTimes ? (this.gotoTime(this.rangeFromTime),
                  p.call(this),
                  this.animStartTime = t - this.curAnimTime) : (this.gotoTime(this.rangeToTime),
                    p.call(this),
                    this.stopAnim())
              }
                .bind(this))
        } else
          s && (this.actor.nodeDesc.endlessLoop || (this.actor.nodeDesc.autoreverses ? this.curAnimTime <= 0 && this.loopCount++ : this.loopCount++),
            this.actor.nodeDesc.endlessLoop || this.loopCount < u.valueOrDefault(this.actor.nodeDesc.repeatCount, 1) ? (this.actor.nodeDesc.autoreverses && (this.isReversePlay = !this.isReversePlay),
              r.defer(function () {
                this.isReversePlay ? (this.curAnimTime = (this.keyFrames[this.keyFramesCount - 1].time - this.initTime) * 1e3,
                  c.call(this, this.keyFramesCount - 2, this.keyFramesCount - 1),
                  p.call(this)) : (this.curAnimTime = (this.keyFrames[0].time - this.initTime) * 1e3,
                    c.call(this, 0, 1),
                    p.call(this)),
                  this.animStartTime = t + this.intervalTime
              }
                .bind(this))) : this.stopAnim())
      }
      ,
      n.exports = f
  }),
  define("utils/CssStyleSheet", ["require", "exports", "module"], function (e, t, n) {
    "use strict";
    function s() {
      if (i)
        return i;
      var e = 0
        , t = undefined;
      while (t = document.styleSheets.item(e++))
        try {
          var n = t.cssRules || t.rules;
          if (n)
            return i = t
        } catch (r) { }
      var s = document.createElement("style");
      return s.type = "text/css",
        document.getElementsByTagName("head")[0].appendChild(s),
        i = s.sheet
    }
    var r = {}
      , i = undefined;
    r.addRule = function (e, t) {
      s().insertRule(e + "{\n" + t + "}\n")
    }
      ,
      r.removeRule = function (e) {
        s().deleteRule(e)
      }
      ,
      r.removeRuleBySel = function (e) {
        var t = r.getRules();
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          if (i.selectorText === e) {
            r.removeRule(n);
            break
          }
        }
      }
      ,
      r.removeRuleByName = function (e) {
        var t = r.getRules();
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          if (i.name === e) {
            r.removeRule(n);
            break
          }
        }
      }
      ,
      r.getRules = function () {
        var e = s();
        return e.cssRules || e.rules
      }
      ,
      r.getRuleBySel = function (e) {
        var t = r.getRules();
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          if (i.selectorText === e)
            return i
        }
        return null
      }
      ,
      r.addStyleSheet = function (e, t) {
        var n = document.createElement("link");
        n && (n.setAttribute("rel", "stylesheet"),
          n.setAttribute("type", "text/css"),
          n.setAttribute("id", e),
          n.setAttribute("href", t)),
          document.getElementsByTagName("head")[0].appendChild(n)
      }
      ,
      r.removeStyleSheet = function (e) {
        var t = document.getElementById(e);
        t && t.parentNode.removeChild(t)
      }
      ,
      r.updateStyleSheet = function (e, t) {
        r.removeStyleSheet(e),
          r.addStyleSheet(e, t)
      }
      ,
      n.exports = r
  }),
  define("animations/Css3Anim", ["require", "exports", "module", "famous/core/Engine", "famous/utilities/Timer", "utils/EasingUtils", "utils/DebugUtils", "utils/CssStyleSheet"], function (e, t, n) {
    "use strict";
    function f(e) {
      this.actor = e;
      var t = e.nodeDesc;
      this.keyFrames = e.nodeDesc.keyframes,
        this.keyFramesCount = this.keyFrames.length,
        this.srcFrameIdx = 0,
        this.dstFrameIdx = this.keyFramesCount - 1,
        this.srcFrameTime = 0,
        this.dstFrameTime = 0,
        this.curveFn = null,
        this.smartAnimData = t.smartAnimData,
        this.totalAnimTime = t.duration;
      var n = "X_" + t.id_
        , r = "Y_" + t.id_
        , i = "M_" + t.id_
        , s = "R_" + t.id_;
      e.containerSurface.setAttributes({
        id: n
      }),
        e.innerContainerSurfaceA.setAttributes({
          id: r
        }),
        e.innerContainerSurfaceB.setAttributes({
          id: i
        }),
        e.inner3DSurface.setAttributes({
          id: s
        }),
        this.cssAnimNameSpace = {
          animX: "anim" + n,
          animY: "anim" + r,
          animM: "anim" + i,
          animR: "anim" + s,
          keyframesSelX: "@keyframes anim" + n,
          keyframesSelY: "@keyframes anim" + r,
          keyframesSelM: "@keyframes anim" + i,
          keyframesSelR: "@keyframes anim" + s,
          selX: "#" + n,
          selY: "#" + r,
          selM: "#" + i,
          selR: "#" + s
        },
        this.initTime = 0,
        this.initOffsetX = 0,
        this.initOffsetY = 0;
      if (this.keyFrames.length > 0) {
        var u = this.keyFrames[0];
        this.initTime = u.time;
        var a = o.valueOrDefault(t.anchorX, .5)
          , f = o.valueOrDefault(t.anchorY, .5)
          , l = o.valueOrDefault(u.anchorX, .5)
          , c = o.valueOrDefault(u.anchorY, .5);
        this.initOffsetX = u.positionX + (a - l) * t.sizeX,
          this.initOffsetY = u.positionY + (f - c) * t.sizeY
      }
    }
    function l(e, t) {
      var n = null !== this.curveFn
        , r = this.keyFrames
        , i = this.srcFrameIdx !== e || this.dstFrameIdx !== t;
      if (n && !i)
        return;
      this.srcFrameIdx = e,
        this.srcFrameTime = (r[e].time - this.initTime) * 1e3,
        this.dstFrameIdx = t,
        this.dstFrameTime = (r[t].time - this.initTime) * 1e3,
        this.curveFn = "ez_" + r[Math.max(e, t)].easing,
        this.readyDisplacement(),
        this.readyAnchorScaleRotationOpacity()
    }
    var r = e("famous/core/Engine")
      , i = e("famous/utilities/Timer")
      , s = e("utils/EasingUtils")
      , o = e("utils/DebugUtils")
      , u = e("utils/CssStyleSheet")
      , a = null;
    e(["actions/MetNodeAction"], function (e) {
      a = e
    }),
      f.prototype.startAnimAfterDelay = function (e) {
        var t = this;
        t.readyDisplacement(),
          t.readyAnchorScaleRotationOpacity();
        var n = t.totalAnimTime
          , r = t.cssAnimNameSpace
          , i = function (e, t) {
            var n = "";
            return n += "animation-name:" + e + ";-webkit-animation-name:" + e + ";",
              n += "animation-duration:" + t + "s;-webkit-animation-duration:" + t + "s;",
              n += "animation-fill-mode:forwards;-webkit-animation-fill-mode:forwards;",
              n
          }
          , s = i(r.animX, n)
          , o = i(r.animY, n)
          , a = i(r.animM, n)
          , f = i(r.animR, n);
        u.removeRuleBySel(r.selX),
          u.removeRuleBySel(r.selY),
          u.removeRuleBySel(r.selM),
          u.removeRuleBySel(r.selR),
          t.actor.containerSurface._currentTarget.offsetWidth,
          t.actor.innerContainerSurfaceA._currentTarget.offsetWidth,
          t.actor.innerContainerSurfaceB._currentTarget.offsetWidth,
          t.actor.inner3DSurface._currentTarget.offsetWidth,
          u.addRule(r.selX, s),
          u.addRule(r.selY, o),
          u.addRule(r.selM, a),
          u.addRule(r.selR, f)
      }
      ,
      f.prototype.rangePlay = function (e, t, n) {
        this.startAnimAfterDelay(0)
      }
      ,
      f.prototype.stopAnim = function () { }
      ,
      f.prototype.isPlaying = function () { }
      ,
      f.prototype.resetTimeProgress = function (e) { }
      ,
      f.prototype.readyDisplacement = function () {
        var e = this
          , t = e.smartAnimData
          , n = t.xpathAnim.times;
        if (n.length < 2)
          return;
        var r = t.xpathAnim.timingFunctions
          , i = t.xpathAnim.values
          , s = t.ypathAnim.timingFunctions
          , o = t.ypathAnim.values
          , a = e.totalAnimTime
          , f = e.cssAnimNameSpace
          , l = ""
          , c = "";
        for (var h = 0, p = n.length; h < p; h++) {
          var d = "0%";
          h === p - 1 ? d = "100%" : d = (n[h] * 100 / a).toFixed(4) + "%";
          var v = ""
            , m = "";
          h < p - 1 && (v = "animation-timing-function:cubic-bezier(" + r[h * 4] + "," + r[h * 4 + 1] + "," + r[h * 4 + 2] + "," + r[h * 4 + 3] + ")" + ";",
            m = "animation-timing-function:cubic-bezier(" + s[h * 4] + "," + s[h * 4 + 1] + "," + s[h * 4 + 2] + "," + s[h * 4 + 3] + ")" + ";");
          var g = "transform: translate(" + i[h] + "px, 0px);"
            , y = "transform: translate(0px, " + o[h] + "px);";
          l += d + " {" + g + v + "}\n",
            c += d + " {" + y + m + "}\n"
        }
        u.removeRuleByName(f.animX),
          u.removeRuleByName(f.animY),
          u.addRule(f.keyframesSelX, l),
          u.addRule(f.keyframesSelY, c)
      }
      ,
      f.prototype.readyAnchorScaleRotationOpacity = function () {
        var e = this
          , t = e.smartAnimData
          , n = t.mAnim.times;
        if (n.length < 2)
          return;
        var r = t.mAnim.timingFunctions
          , i = t.mAnim.values
          , s = e.totalAnimTime
          , a = e.cssAnimNameSpace
          , f = e.keyFrames
          , l = ""
          , c = ""
          , h = 0;
        for (var p = 0, d = n.length; p < d; p++) {
          var v = n[p]
            , m = "0%";
          p === d - 1 ? m = "100%" : m = (v * 100 / s).toFixed(4) + "%";
          while (h < this.keyFramesCount - 2 && v > f[h + 1].time - e.initTime)
            h++;
          var g = e.keyFrames[h]
            , y = e.keyFrames[h + 1]
            , b = o.valueOrDefault(g.anchorX, .5)
            , w = o.valueOrDefault(y.anchorX, .5)
            , E = o.valueOrDefault(g.anchorY, .5)
            , S = o.valueOrDefault(y.anchorY, .5)
            , x = o.valueOrDefault(g.scaleX, 1)
            , T = o.valueOrDefault(y.scaleX, 1)
            , N = o.valueOrDefault(g.scaleY, 1)
            , C = o.valueOrDefault(y.scaleY, 1)
            , k = g.rotation || 0
            , L = y.rotation || 0
            , A = o.valueOrDefault(g.opacity, 1)
            , O = o.valueOrDefault(y.opacity, 1)
            , M = g.rotationX || 0
            , _ = y.rotationX || 0
            , D = g.rotationY || 0
            , P = y.rotationY || 0
            , H = "";
          p < d - 1 && (H = "animation-timing-function:cubic-bezier(" + r[p * 4] + "," + r[p * 4 + 1] + "," + r[p * 4 + 2] + "," + r[p * 4 + 3] + ")" + ";");
          var B = i[p] || 0
            , j = "transform-origin: " + (b * (1 - B) + w * B) + " " + (E * (1 - B) + S * B) + ";"
            , F = "transform: rotate(" + (k * (1 - B) * 180 / Math.PI + L * B * 180 / Math.PI) + "deg) scale3d(" + (x * (1 - B) + T * B) + "," + (N * (1 - B) + C * B) + ",1);"
            , I = "opacity: " + (A * (1 - B) + O * B) + ";";
          l += m + " {" + j + F + I + H + "}\n";
          var q = "transform: rotate3d(1,0,0," + (M * (1 - B) * 180 / Math.PI + _ * B * 180 / Math.PI) + "deg) rotate3d(0,1,0," + (D * (1 - B) * 180 / Math.PI + P * B * 180 / Math.PI) + "deg);";
          c += m + " {" + q + H + "}\n"
        }
        u.removeRuleByName(a.animM),
          u.removeRuleByName(a.animR),
          u.addRule(a.keyframesSelM, l),
          u.addRule(a.keyframesSelR, c)
      }
      ,
      f.prototype.ready3DRotation = function () { }
      ,
      f.prototype.gotoTime = function (e) { }
      ,
      f.prototype.gotoDefaultKeyframe = function () { }
      ,
      f.prototype.updateAnim = function () { }
      ,
      n.exports = f
  }),
  define("utils/TransitionUtils", ["require", "exports", "module", "famous/core/Transform", "famous/transitions/Easing", "famous/transitions/TweenTransition"], function (e, t, n) {
    "use strict";
    var r = e("famous/core/Transform")
      , i = e("famous/transitions/Easing")
      , s = e("famous/transitions/TweenTransition")
      , o = {};
    o.synthesizeAnimateOptions = function (e, t, n, i, s, o) {
      var u = {
        opacity: 1,
        origin: [.5, .5],
        align: [.5, .5],
        transform: r.identity,
        visible: !0,
        zIndex: 1
      };
      if (e === 0)
        n > 0 ? u.visible = t <= -1 : n < 0 ? u.visible = t >= 1 : u.visible = t !== 1 && t !== -1;
      else if (e === 1)
        u.opacity = 1 - Math.abs(t + n),
          n > 0 ? u.visible = t < 0 : n < 0 ? u.visible = t > 0 : u.visible = !0;
      else if (e === 2)
        u.transform = r.translate(0, (t + n) * i[1] * s[1], 0);
      else if (e === 3)
        u.transform = r.translate((t + n) * i[0] * s[0], 0, 0);
      else if (e === 4) {
        var a = r.translate(0, i[1] / 2, 0);
        a = r.multiply4x4(r.rotateX(-Math.PI * (t + n) * s[1]), a),
          a = r.multiply4x4(r.translate(0, -i[1] / 2, 0), a),
          u.transform = a,
          n > 0 ? u.visible = t < -0.5 : n < 0 ? u.visible = t > .5 : u.visible = t >= -0.5 && t <= .5
      } else if (e === 5) {
        var a = r.translate(i[0] / 2, 0, 0);
        a = r.multiply4x4(r.rotateY(Math.PI * (t + n) * s[0]), a),
          a = r.multiply4x4(r.translate(-i[0] / 2, 0, 0), a),
          u.transform = a,
          n > 0 ? u.visible = t < -0.5 : n < 0 ? u.visible = t > .5 : u.visible = t >= -0.5 && t <= .5
      } else if (e === 6)
        u.transform = r.scale(.001 + (1 - Math.abs(t + n)) * .999, .001 + (1 - Math.abs(t + n)) * .999, 1),
          n > 0 ? u.visible = t < -0.5 : n < 0 ? u.visible = t > .5 : u.visible = t >= -0.5 && t <= .5;
      else if (e === 7)
        u.transform = r.scale(.001 + (1 - Math.abs(t + n)) * .999, .001 + (1 - Math.abs(t + n)) * .999, 1),
          n > 0 ? u.visible = t < -0.5 : n < 0 ? u.visible = t > .5 : u.visible = t >= -0.5 && t <= .5;
      else if (e === 8)
        t < 0 || t === 0 && n >= 0 ? n > 0 ? (u.transform = r.scale(.8 + (1 - Math.abs(t + n)) * .2, .8 + (1 - Math.abs(t + n)) * .2, 1),
          u.zIndex = 0) : n < 0 ? u.visible = !1 : u.transform = r.translate(0, (t + n) * i[1] * s[1], 0) : n > 0 ? u.visible = !1 : n < 0 ? u.transform = r.translate(0, (t + n) * i[1] * s[1], 0) : (u.transform = r.scale(.8 + (1 - Math.abs(t + n)) * .2, .8 + (1 - Math.abs(t + n)) * .2, 1),
            u.zIndex = 0);
      else if (e === 9)
        t < 0 || t === 0 && n >= 0 ? n > 0 ? (u.transform = r.scale(.8 + (1 - Math.abs(t + n)) * .2, .8 + (1 - Math.abs(t + n)) * .2, 1),
          u.zIndex = 0) : n < 0 ? u.visible = !1 : u.transform = r.translate((t + n) * i[0] * s[0], 0, 0) : n > 0 ? u.visible = !1 : n < 0 ? u.transform = r.translate((t + n) * i[0] * s[0], 0, 0) : (u.transform = r.scale(.8 + (1 - Math.abs(t + n)) * .2, .8 + (1 - Math.abs(t + n)) * .2, 1),
            u.zIndex = 0);
      else if (e === 10)
        t < 0 || t === 0 && n >= 0 ? n > 0 ? (u.transform = r.translate(0, (t + n) * i[1] * s[1], 0),
          u.zIndex = 2) : n < 0 ? (u.visible = !1,
            u.zIndex = 0) : (u.transform = r.scale(.8 + (1 - Math.abs(t + n)) * .2, .8 + (1 - Math.abs(t + n)) * .2, 1),
              u.zIndex = 1) : n > 0 ? (u.visible = !1,
                u.zIndex = 2) : n < 0 ? (u.transform = r.scale(.8 + (1 - Math.abs(t + n)) * .2, .8 + (1 - Math.abs(t + n)) * .2, 1),
                  u.zIndex = 0) : (u.transform = r.translate(0, (t + n) * i[1] * s[1], 0),
                    u.zIndex = 1);
      else if (e === 11)
        t < 0 || t === 0 && n >= 0 ? n > 0 ? (u.transform = r.translate((t + n) * i[0] * s[0], 0, 0),
          u.zIndex = 2) : n < 0 ? (u.visible = !1,
            u.zIndex = 0) : (u.transform = r.scale(.8 + (1 - Math.abs(t + n)) * .2, .8 + (1 - Math.abs(t + n)) * .2, 1),
              u.zIndex = 1) : n > 0 ? (u.visible = !1,
                u.zIndex = 2) : n < 0 ? (u.transform = r.scale(.8 + (1 - Math.abs(t + n)) * .2, .8 + (1 - Math.abs(t + n)) * .2, 1),
                  u.zIndex = 0) : (u.transform = r.translate((t + n) * i[0] * s[0], 0, 0),
                    u.zIndex = 1);
      else if (e === 12) {
        if (n !== 0) {
          var a = Math.abs(.5 - Math.max(0, Math.min(1, Math.abs(t)))) / .5;
          n = n * .8 + n * .2 * a,
            u.zIndex = 2
        } else
          u.zIndex = 1;
        u.transform = r.translate(0, (t + n) * i[1] * s[1], 0)
      } else if (e === 13) {
        if (n !== 0) {
          var a = Math.abs(.5 - Math.max(0, Math.min(1, Math.abs(t)))) / .5;
          n = n * .6 + n * .4 * a,
            u.zIndex = 2
        } else
          u.zIndex = 1;
        u.transform = r.translate((t + n) * i[0] * s[0], 0, 0)
      } else if (e === 14) {
        var f = -Math.PI / 2 * t * s[1]
          , l = i[1] / 2 / Math.sin(Math.PI / 4);
        l = Math.max(Math.abs(l * Math.sin(f - Math.PI / 4)), Math.abs(l * Math.sin(f + Math.PI / 4))),
          t + n === 0 && (l = i[1] / 2);
        var a = r.translate(0, i[1] / 2, i[1] / 2);
        a = r.multiply4x4(r.rotateX(-Math.PI / 2 * (t + n) * s[1]), a),
          a = r.multiply4x4(r.translate(0, -i[1] / 2, -l), a),
          u.transform = a,
          n > 0 ? u.visible = t < 0 : n < 0 ? u.visible = t > 0 : u.visible = !0,
          u.zIndex = n !== 0 ? 0 : 1
      } else if (e === 15) {
        var f = Math.PI / 2 * t * s[0]
          , l = i[0] / 2 / Math.sin(Math.PI / 4);
        l = Math.max(Math.abs(l * Math.sin(f - Math.PI / 4)), Math.abs(l * Math.sin(f + Math.PI / 4))),
          t + n === 0 && (l = i[0] / 2);
        var a = r.translate(i[0] / 2, 0, i[0] / 2);
        a = r.multiply4x4(r.rotateY(Math.PI / 2 * (t + n) * s[0]), a),
          a = r.multiply4x4(r.translate(-i[0] / 2, 0, -l), a),
          u.transform = a,
          n > 0 ? u.visible = t < 0 : n < 0 ? u.visible = t > 0 : u.visible = !0,
          u.zIndex = n !== 0 ? 0 : 1
      } else if (e === 16) {
        var f = Math.PI / 2 * t * s[1]
          , l = i[1] / 2 / Math.sin(Math.PI / 4);
        l = Math.max(Math.abs(l * Math.sin(f - Math.PI / 4)), Math.abs(l * Math.sin(f + Math.PI / 4))),
          t + n === 0 && (l = i[1] / 2);
        var a = r.translate(0, i[1] / 2, -i[1] / 2);
        a = r.multiply4x4(r.rotateX(Math.PI / 2 * (t + n) * s[1]), a),
          a = r.multiply4x4(r.translate(0, -i[1] / 2, l), a),
          u.transform = a,
          n > 0 ? u.visible = t < 0 : n < 0 ? u.visible = t > 0 : u.visible = !0,
          u.zIndex = n !== 0 ? 1 : 0
      } else if (e === 17) {
        var f = -Math.PI / 2 * t * s[0]
          , l = i[0] / 2 / Math.sin(Math.PI / 4);
        l = Math.max(Math.abs(l * Math.sin(f - Math.PI / 4)), Math.abs(l * Math.sin(f + Math.PI / 4))),
          t + n === 0 && (l = i[0] / 2);
        var a = r.translate(i[0] / 2, 0, -i[0] / 2);
        a = r.multiply4x4(r.rotateY(-Math.PI / 2 * (t + n) * s[0]), a),
          a = r.multiply4x4(r.translate(-i[0] / 2, 0, l), a),
          u.transform = a,
          n > 0 ? u.visible = t < 0 : n < 0 ? u.visible = t > 0 : u.visible = !0,
          u.zIndex = n !== 0 ? 1 : 0
      } else if (e === 18)
        u.opacity = 1 - Math.abs(t + n),
          u.transform = r.translate(0, (t + n) * i[1] * s[1], 0);
      else if (e === 19)
        u.opacity = 1 - Math.abs(t + n),
          u.transform = r.translate((t + n) * i[0] * s[0], 0, 0);
      else if (e === 24) {
        var c = o && o.earSize ? o.earSize : [i[0], i[1] / 4]
          , h = c[1] / 2
          , f = -Math.PI * (t + n) * s[1]
          , l = i[1] / 2 / Math.cos(Math.atan2(c[1], c[0]));
        l = Math.abs(l * Math.sin(f)),
          t + n === 0 && (l = 0);
        var a = r.translate(0, i[1] / 2, h);
        a = r.multiply4x4(r.rotateX(-Math.PI * (t + n) * s[1]), a),
          a = r.multiply4x4(r.translate(0, -i[1] / 2, -l - h), a),
          u.transform = a,
          n > 0 ? u.visible = t < -0.5 : n < 0 ? u.visible = t > .5 : u.visible = t >= -0.5 && t <= .5,
          !u.visible || t + n === 0 ? u.cuboic = {
            showA: !1,
            showB: !1
          } : n > 0 ? u.cuboic = {
            showA: t < 0,
            showB: t > 0
          } : n < 0 ? u.cuboic = {
            showA: t < 0,
            showB: t > 0
          } : u.cuboic = {
            showA: t > 0,
            showB: t < 0
          }
      } else if (e === 25) {
        var c = o && o.earSize ? o.earSize : [i[0] / 4, i[1]]
          , h = c[0] / 2
          , f = Math.PI * (t + n) * s[0]
          , l = i[0] / 2 / Math.cos(Math.atan2(c[0], c[1]));
        l = Math.abs(l * Math.sin(f)),
          t + n === 0 && (l = 0);
        var a = r.translate(i[0] / 2, 0, h);
        a = r.multiply4x4(r.rotateY(Math.PI * (t + n) * s[0]), a),
          a = r.multiply4x4(r.translate(-i[0] / 2, 0, -l - h), a),
          u.transform = a,
          n > 0 ? u.visible = t < -0.5 : n < 0 ? u.visible = t > .5 : u.visible = t >= -0.5 && t <= .5,
          !u.visible || t + n === 0 ? u.cuboic = {
            showA: !1,
            showB: !1
          } : n > 0 ? u.cuboic = {
            showA: t < 0,
            showB: t > 0
          } : n < 0 ? u.cuboic = {
            showA: t < 0,
            showB: t > 0
          } : u.cuboic = {
            showA: t > 0,
            showB: t < 0
          }
      }
      return (e === 14 || e === 15) && Math.abs(t + n) > .95 && (u.visible = !1),
        (e === 24 || e === 25) && Math.abs(t + n) < .05 && (u.cuboic = {
          showA: !1,
          showB: !1
        }),
        u
    }
      ,
      n.exports = o
  }),
  define("utils/TransformUtils", ["require", "exports", "module", "famous/core/Transform"], function (e, t, n) {
    "use strict";
    function s(e, t) {
      if (e.getAttribute("klass") === "flex_inner") {
        var n = i.elementSize(e)
          , s = i.elementTransform(e)
          , o = r.interpret(s)
          , u = o.scale;
        return s = r.multiply4x4(r.translate(-n[0] * (1 - u[0]) / 2, -n[1] * (1 - u[1]) / 2, 0), s),
          s
      }
      var a = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
        , f = i.elementAnchorLocation(e)
        , l = i.elementPosition(e)
        , c = i.elementTransform(e)
        , h = i.elementTransform(t);
      a = r.multiply4x4(a, r.translate(-f[0], -f[1], 0)),
        a = r.multiply4x4(c, a),
        c = r.interpret(c),
        h = r.interpret(h);
      var p = c.scale
        , d = h.scale
        , v = c.rotate;
      return c = r.rotate(v[0], v[1], v[2]),
        c = r.thenScale(c, [p[0] / d[0], p[1] / d[1], p[2] / d[2]]),
        l = i.vectorApplyTransform(l, c),
        a = r.multiply4x4(r.translate(l[0], l[1], 0), a),
        a
    }
    function o(e, t) {
      var n = [];
      while (null !== e)
        n.push(e),
          e = e.offsetParent;
      while (null !== t) {
        if (-1 !== n.indexOf(t))
          return t;
        t = t.offsetParent
      }
      return null
    }
    var r = e("famous/core/Transform")
      , i = {};
    i.transformFromElement = function (e, t) {
      var n = o(e, t);
      if (null === n)
        return r.identity;
      var i = r.identity;
      while (t !== n) {
        var u = s(t, t.offsetParent);
        i = r.multiply4x4(u, i),
          t = t.offsetParent
      }
      var a = r.identity;
      while (e !== n) {
        var u = s(e, e.offsetParent);
        a = r.multiply4x4(u, a),
          e = e.offsetParent
      }
      return r.multiply4x4(r.inverse(a), i)
    }
      ,
      i.transformToElement = function (e, t) {
        var n = o(e, t);
        if (null === n)
          return r.identity;
        var i = r.identity;
        while (t !== n) {
          var u = s(t, t.offsetParent);
          i = r.multiply4x4(u, i),
            t = t.offsetParent
        }
        var a = r.identity;
        while (e !== n) {
          var u = s(e, e.offsetParent);
          a = r.multiply4x4(u, a),
            e = e.offsetParent
        }
        return r.multiply4x4(r.inverse(i), a)
      }
      ,
      i.elementSize = function (e) {
        return [e.clientWidth, e.clientHeight]
      }
      ,
      i.elementBounds = function (e) {
        return [0, 0, e.clientWidth, e.clientHeight]
      }
      ,
      i.elementPosition = function (e) {
        return [e.offsetLeft + e.offsetWidth / 2, e.offsetTop + e.offsetHeight / 2]
      }
      ,
      i.elementAnchorLocation = function (e) {
        return [e.clientWidth / 2, e.clientHeight / 2]
      }
      ,
      i.elementTransform = function (e) {
        var t = e.style.transform || e.style.webkitTransform;
        if (t) {
          t = t.toLowerCase();
          var n = t.indexOf("matrix");
          n !== -1 ? t = t.substring(n) : t = null
        }
        var i = !1;
        if (!t)
          return r.identity;
        if (-1 !== t.indexOf("matrix3d"))
          i = !0;
        else {
          if (-1 === t.indexOf("matrix"))
            return r.identity;
          i = !1
        }
        var s = t.indexOf("(")
          , o = t.lastIndexOf(")");
        t = t.substring(s + 1, o);
        var u = t.split(",")
          , a = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        if (i)
          for (var f = 0; f < 16; f++)
            a[f] = parseFloat(u[f]);
        else
          a[0] = parseFloat(u[0]),
            a[1] = parseFloat(u[1]),
            a[4] = parseFloat(u[2]),
            a[5] = parseFloat(u[3]),
            a[12] = parseFloat(u[4]),
            a[13] = parseFloat(u[5]);
        return a
      }
      ,
      i.pointApplyTransform = function (e, t) {
        e[2] || (e[2] = 0);
        var n = [e[0], e[1], e[2], 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        return n = r.multiply4x4(t, n),
          [n[0], n[1], n[2]]
      }
      ,
      i.vectorApplyTransform = function (e, t) {
        e[2] || (e[2] = 0);
        var n = [0, 0, 0];
        return n = i.pointApplyTransform(n, t),
          e = i.pointApplyTransform(e, t),
          [e[0] - n[0], e[1] - n[1], e[2] - n[2]]
      }
      ,
      i.relativePos4Event = function (e) {
        var t = i.absolutePos4Event(e)
          , n = i.transformFromElement(e.srcElement, document.body);
        return i.pointApplyTransform(t, n)
      }
      ,
      i.absolutePos4Event = function (e) {
        var t = 0
          , n = 0;
        return e.changedTouches && e.changedTouches.length > 0 ? t = e.changedTouches[0].pageX : e.pageX !== undefined && (t = e.pageX),
          e.changedTouches && e.changedTouches.length > 0 ? n = e.changedTouches[0].pageY : e.pageY !== undefined && (n = e.pageY),
          [t, n]
      }
      ,
      i.isEventOutsideOfElement = function (e, t) {
        while (t) {
          var n = i.transformFromElement(t, document.body)
            , r = i.absolutePos4Event(e);
          r = i.pointApplyTransform(r, n);
          var s = i.elementBounds(t);
          if (s[2] > 0 || s[3] > 0)
            if (r[0] < s[0] || r[1] < s[1] || r[0] > s[2] || r[1] > s[3])
              return !0;
          t = t.offsetParent
        }
        return !1
      }
      ,
      i.isValidTransform = function (e) {
        for (var t = 0; t < 16; t++)
          if (isNaN(e[t]))
            return !1;
        return !0
      }
      ,
      i.logTransform = function (e) {
        var t = function (e) {
          e = Math.floor(e * 1e3) / 1e3,
            e = "" + e;
          while (e.length < 12)
            e += " ";
          return e
        };
        for (var n = 0; n < 16; n += 4)
          console.log(t(e[n]), t(e[n + 1]), t(e[n + 2]), t(e[n + 3]))
      }
      ,
      n.exports = i
  }),
  define("animations/StateAnim", ["require", "exports", "module", "famous/core/Engine", "famous/utilities/Timer", "famous/utilities/Utility", "famous/transitions/Transitionable", "famous/core/Transform", "famous/views/RenderController", "famous/transitions/Easing", "utils/EasingUtils", "utils/TransitionUtils", "utils/TransformUtils", "utils/DebugUtils"], function (e, t, n) {
    "use strict";
    function m(e, t) {
      this.actor = e,
        this.curStateIdx = t || 0,
        this.totalStates = e.metNodes.length,
        this.prevStateIdx = null,
        this.nextStateIdx = null,
        this.animTimer = null,
        this.hookTimer = null,
        this.movingFlagTimer = null,
        this.forceTimer = null,
        this.forceTrans = null,
        this.stateConfigs = d.parseStatesFromArray(e.nodeDesc.nodes),
        this.progressCache = new o(this.curStateIdx / Math.max(1, this.totalStates - 1)),
        this.movingDir = 0,
        this.scrollDirection = null,
        g.call(this, e);
      var n = e.nodeDesc.transition || 0
        , r = d.findInActionsByActionType(e.nodeActions, d.MetNodeActionTypeScroll);
      !e.nodeDesc.autoplay && n !== 0 && null !== r && (w.call(this, e.containerSurface),
        this.scrollDirection = r.i1),
        (n === 4 || n === 5 || n === 7) && e.containerSurface.setPropertiesCheckDirty({
          overflow: "visible"
        }),
        P.call(this) && D.call(this)
    }
    function g(e) {
      this.stateViewPlayer = new a,
        e.containerSurface ? e.containerSurface.add(this.stateViewPlayer) : e.add(this.stateViewPlayer)
    }
    function y(e) {
      return e === 3 || e === 5 || e === 9 || e === 11 || e === 13 || e === 15 || e === 17 || e === 19 || e === 25 ? 1 : 0
    }
    function b(e, t, n, r, i, s) {
      var o = this
        , u = o.stateViewPlayer
        , a = o.actor.containerSurface.getSize()
        , f = o.actor.nodeDesc.transition || 0
        , l = y(f);
      if (null !== t) {
        var h = c.synthesizeAnimateOptions(f, r, i, a, [l, 1 - l], t)
          , p = h.visible
          , d = h.zIndex;
        p ? (M(u, t, h),
          t.containerSurface.setPropertiesCheckDirty({
            zIndex: d
          }),
          t.cuboic_update_by_options && t.cuboic_update_by_options(h)) : t.isAway || L(u, t)
      }
      if (null !== n) {
        var v = c.synthesizeAnimateOptions(f, r, s, a, [l, 1 - l], n)
          , p = v.visible
          , d = v.zIndex;
        p ? (M(u, n, v),
          n.containerSurface.setPropertiesCheckDirty({
            zIndex: d
          }),
          n.cuboic_update_by_options && n.cuboic_update_by_options(v)) : n.isAway || L(u, n)
      }
      var m = c.synthesizeAnimateOptions(f, r, 0, a, [l, 1 - l], e)
        , p = m.visible
        , d = m.zIndex;
      p ? (M(u, e, m),
        e.containerSurface.setPropertiesCheckDirty({
          zIndex: d
        }),
        e.cuboic_update_by_options && e.cuboic_update_by_options(m)) : e.isAway || L(u, e),
        o.progressCache.set((o.curStateIdx - r) / Math.max(1, o.totalStates - 1)),
        this.movingDir = r < 0 ? 1 : -1
    }
    function w(e) {
      var t = this
        , n = t.stateViewPlayer
        , s = t.actor.nodeDesc.endToEnd || !1
        , u = e.getSize()
        , a = t.actor.nodeDesc.transition || 0
        , l = null
        , c = null
        , d = null
        , v = 0
        , m = null
        , g = null
        , y = null
        , w = null
        , S = function (e) {
          e.preventDefault();
          if (null !== l)
            return;
          if (null !== d)
            return;
          if (null !== t.forceTimer)
            return;
          l = h.absolutePos4Event(e),
            m = r.getCurrentFrameTime(),
            g = t.actor.metNodes[t.curStateIdx],
            e.logic === "instantDown" && (l = null)
        }
        , O = function (n) {
          n.preventDefault();
          if (null === l)
            return;
          if (p.isGestureMovingRefuse(t.actor.metNodeId))
            return;
          t.actor.nodeDesc.notTriggerPageFlip && p.setIsRangePagingRefuse(!0);
          var r = h.transformFromElement(e._currentTarget, document.body)
            , i = h.absolutePos4Event(n)
            , o = [i[0] - l[0], i[1] - l[1]];
          o = h.vectorApplyTransform(o, r);
          var f = !1;
          if (null === c) {
            Math.abs(o[0]) + Math.abs(o[1]) > 12 ? (Math.abs(o[1]) > Math.abs(o[0]) ? t.scrollDirection === 0 && (c = 0) : t.scrollDirection === 1 && (c = 1),
              null === c && p.gestureMovingSet(null)) : (p.gestureMovingSet(t.actor.metNodeId),
                n.stopPropagation()),
              null !== c && (f = !0);
            if (c === null)
              return;
            if (t.scrollDirection !== c)
              return
          }
          null === d && t.scrollDirection === c && (o[1 - c] > 0 ? null !== t.getStateViewByIndex(t.curStateIdx - 1, s) && (d = a) : null !== t.getStateViewByIndex(t.curStateIdx + 1, s) && (d = a));
          if (null === d) {
            p.gestureMovingSet(null);
            return
          }
          n.stopPropagation();
          if (d === 0)
            return;
          p.gestureMovingSet(t.actor.metNodeId);
          var m = Math.max(-1, Math.min(1, o[1 - c] / u[1 - c]));
          E.call(t),
            f && (y = t.getStateViewByIndex(t.curStateIdx - 1, s),
              w = t.getStateViewByIndex(t.curStateIdx + 1, s),
              y === w && (o[1 - c] < 0 ? y = null : w = null),
              t.prevStateIdx = y ? t.actor.metNodes.indexOf(y) : -1,
              t.nextStateIdx = w ? t.actor.metNodes.indexOf(w) : -1),
            b.call(t, g, y, w, v = m, -1, 1)
        }
        , M = function (s) {
          s.preventDefault();
          if (c === null) {
            l = null;
            return
          }
          if (null === l)
            return;
          if (s.type === "mouseout" && !h.isEventOutsideOfElement(s, e._currentTarget))
            return;
          var a = h.transformFromElement(e._currentTarget, document.body)
            , E = h.absolutePos4Event(s)
            , S = [E[0] - l[0], E[1] - l[1]];
          S = h.vectorApplyTransform(S, a);
          var O = r.getCurrentFrameTime()
            , M = S[1 - c] / Math.max(1, O - m)
            , D = function (e, r, s, u, a, l) {
              if (null !== t.forceTimer)
                return;
              var c = null !== r && r !== e
                , h = 0;
              c && (h = t.movingDir === 1 ? -1 : 1);
              var d = p.valueOrDefault(t.actor.nodeDesc.duration, .4);
              d *= Math.min(1, Math.abs(v - h));
              var m = {
                duration: d * 1e3,
                curve: f.outSine
              };
              null !== t.forceTrans && t.forceTrans.halt(),
                t.forceTrans = new o(v),
                t.forceTimer = i.every(function () {
                  if (!t.actor)
                    return;
                  var n = t.forceTrans.get();
                  t.forceTimer && (r ? b.call(t, e, r, null, n, -h, 0) : b.call(t, e, s[0], s[1], n, -1, 1))
                }, 1),
                t.forceTrans.set(h, m, function () {
                  t.curStateIdx = l,
                    t.progressCache.set(t.curStateIdx / Math.max(1, t.totalStates - 1)),
                    t.prevStateIdx = null,
                    t.nextStateIdx = null,
                    N.call(t),
                    p.gestureMovingSet(null),
                    x.call(t),
                    r !== g && C.call(t),
                    c ? (e && (e.deactiveMetSubNode(),
                      e.setIframesVisiblity(!1)),
                      t.actor.actived && (r.activeMetSubNode(),
                        r.setIframesVisiblity(!0)),
                      A(n, r),
                      r.containerSurface.setPropertiesCheckDirty({
                        zIndex: 1
                      })) : (A(n, e),
                        e.containerSurface.setPropertiesCheckDirty({
                          zIndex: 1
                        })),
                    P.call(t) || _.call(t)
                }),
                T.call(t),
                t.movingFlagTimer = i.after(function () {
                  t.actor && p.gestureMovingSet(t.actor.metNodeId),
                    t.movingFlagTimer = null
                }, 1)
            };
          S[1 - c] >= 0 && w && (w.deactiveMetSubNode(),
            w.setIframesVisiblity(!1),
            w !== y && L(n, w),
            w = null),
            S[1 - c] <= 0 && y && (y.deactiveMetSubNode(),
              y.setIframesVisiblity(!1),
              y !== w && L(n, y),
              y = null);
          var H = !1
            , B = null
            , j = .333;
          !H && t.scrollDirection === c && (s.type === "mousewheel" && (M > 0 ? M = j * 2 : M < 0 && (M = -j * 2)),
            M > j || S[1 - c] > u[1 - c] * .15 ? null !== y && (B = (t.actor.metNodes.length + t.curStateIdx - 1) % t.actor.metNodes.length,
              t.movingDir = -1,
              D(g, y, null, 1, d, B),
              H = !0) : (M < -j || S[1 - c] < -u[1 - c] * .15) && null !== w && (B = (t.curStateIdx + 1) % t.actor.metNodes.length,
                t.movingDir = 1,
                D(g, w, null, -1, d, B),
                H = !0)),
            H || D(g, null, [y, w], 0, d, t.curStateIdx),
            H && B && k.call(t, B),
            l = null,
            d = null,
            m = null,
            v = 0,
            g = null,
            y = null,
            w = null,
            c = null
        };
      e.on("_e_down", S),
        e.on("_e_move", O),
        e.on("_e_out", M),
        e.on("_e_up", M)
    }
    function E() {
      if (null !== this.hookTimer)
        return;
      this.hookTimer = i.every(S.bind(this), 1)
    }
    function S() {
      if (!this.actor)
        return;
      if (!this.actor.initialized || !this.actor.actived)
        return;
      var e = Math.max(this.totalStates - 1, 1)
        , t = this.progressCache.get();
      for (var n = 0, r = this.stateConfigs.length; n < r; n++) {
        var i = this.stateConfigs[n]
          , s = 0;
        n < this.curStateIdx - 1 ? s = -1 : n > this.curStateIdx + 1 ? s = 1 : s = Math.max(-1, Math.min(1, t * e - n));
        for (var o = 0; o < i.hooks.length; o++) {
          var u = i.hooks[o];
          u.executeStep(1 - Math.abs(s))
        }
      }
    }
    function x() {
      this.hookTimer && (i.clear(this.hookTimer),
        this.hookTimer = null)
    }
    function T() {
      this.movingFlagTimer && (i.clear(this.movingFlagTimer),
        this.movingFlagTimer = null)
    }
    function N() {
      this.forceTimer && (i.clear(this.forceTimer),
        this.forceTimer = null),
        this.forceTrans && (this.forceTrans.halt(),
          this.forceTrans = null)
    }
    function C() {
      if (!this.actor.initialized || !this.actor.actived)
        return;
      var e = this.stateConfigs[this.curStateIdx];
      if (null === e)
        return;
      for (var t = 0, n = e.performs.length; t < n; t++) {
        var r = e.performs[t];
        r.execute()
      }
    }
    function k(e) {
      var t = this.actor.nodeDesc.endToEnd || !1
        , n = this.getStateViewByIndex(e, t)
        , r = this.getStateViewByIndex(e - 1, t)
        , i = this.getStateViewByIndex(e + 1, t);
      i === r && (i = null),
        n && n.preloadMetSubNode(!0),
        r && r.preloadMetSubNode(!0),
        i && i.preloadMetSubNode(!0)
    }
    function L(e, t) {
      t.isAway = !0,
        t.deactiveMetSubNode(),
        t.setIframesVisiblity(!1),
        t.containerSurface.setPropertiesCheckDirty({
          visibility: "hidden"
        })
    }
    function A(e, t) {
      return O(e, [t])
    }
    function O(e, t) {
      return e.foreachRenderableExceptSome(t, function (e, t) {
        e.isAway = !0,
          e.deactiveMetSubNode(),
          e.setIframesVisiblity(!1),
          e.containerSurface.setPropertiesCheckDirty({
            visibility: "hidden"
          })
      })
    }
    function M(e, t, n) {
      t.isAway = !1,
        t.setIframesVisiblity(!0),
        t.actived || t.requestDeploy4NodeView(!0),
        t.containerSurface.setPropertiesCheckDirty({
          visibility: "inherit"
        }),
        e.addRenderable(t, n)
    }
    function _() {
      var e = this.stateViewPlayer
        , t = this.curStateIdx
        , n = this.actor.nodeDesc.endToEnd || !1
        , r = this.getStateViewByIndex(t, n)
        , i = this.getStateViewByIndex(t - 1, n)
        , s = this.getStateViewByIndex(t + 1, n)
        , o = [i, r, s];
      e.foreachRenderableExceptSome(o, function (t, n) {
        t.deactiveMetSubNode(),
          t.setIframesVisiblity(!1),
          t.containerSurface.setPropertiesCheckDirty({
            visibility: "hidden"
          }),
          e.removeRenderable(t)
      })
    }
    function D() {
      var e = this.stateViewPlayer
        , t = this.actor.metNodes;
      for (var n = 0, r = t.length; n < r; n++) {
        var i = t[n];
        i.isAway = !0,
          i.containerSurface.setPropertiesCheckDirty({
            visibility: "hidden"
          }),
          e.addRenderable(i, {})
      }
    }
    function P() {
      return this.actor.nodeDesc.autoplay
    }
    var r = e("famous/core/Engine")
      , i = e("famous/utilities/Timer")
      , s = e("famous/utilities/Utility")
      , o = e("famous/transitions/Transitionable")
      , u = e("famous/core/Transform")
      , a = e("famous/views/RenderController")
      , f = e("famous/transitions/Easing")
      , l = e("utils/EasingUtils")
      , c = e("utils/TransitionUtils")
      , h = e("utils/TransformUtils")
      , p = e("utils/DebugUtils")
      , d = null;
    e(["actions/MetNodeAction"], function (e) {
      d = e
    });
    var v = null;
    e(["tools/MetNodeFactory"], function (e) {
      v = e
    }),
      m.prototype.showState = function (e, t, n) {
        var r = this;
        if (null !== r.forceTimer)
          return;
        if (r.actor === null || r.actor === undefined)
          return;
        var s = r.stateViewPlayer
          , u = r.actor.metNodes
          , a = s.renderables.length > 0
          , l = r.curStateIdx !== e
          , c = u[r.curStateIdx]
          , h = 0;
        l && (n || (n = e > r.curStateIdx ? 1 : -1),
          r.movingDir = n,
          h = r.movingDir === 1 ? -1 : 1,
          E.call(r));
        var d = u[e];
        n > 0 ? (r.prevStateIdx = null,
          r.nextStateIdx = r.actor.metNodes.indexOf(d)) : (r.prevStateIdx = r.actor.metNodes.indexOf(d),
            r.nextStateIdx = null);
        var v = function () {
          r.curStateIdx = e,
            r.progressCache.set(r.curStateIdx / Math.max(1, r.totalStates - 1)),
            r.prevStateIdx = null,
            r.nextStateIdx = null,
            x.call(r),
            l && C.call(r);
          if (l || !a) {
            for (var t = 0, n = u.length; t < n; t++) {
              var i = u[t];
              if (!r.actor.actived || d !== i)
                i.deactiveMetSubNode(),
                  i.setIframesVisiblity(!1)
            }
            r.actor.actived && (d.activeMetSubNode(),
              d.setIframesVisiblity(!0)),
              A(s, d),
              d.containerSurface.setPropertiesCheckDirty({
                zIndex: 1
              })
          } else
            A(s, c),
              c.containerSurface.setPropertiesCheckDirty({
                zIndex: 1
              });
          N.call(r),
            P.call(r) || _.call(r)
        };
        O(s, [c, d]);
        if (t) {
          var m = p.valueOrDefault(r.actor.nodeDesc.duration, .4)
            , g = {
              duration: m * 1e3,
              curve: f.outSine
            };
          null !== r.forceTrans && r.forceTrans.halt(),
            r.forceTrans = new o(0),
            r.forceTimer = i.every(function () {
              if (!r.actor)
                return;
              var e = r.forceTrans.get();
              r.forceTimer && b.call(r, c, d, null, e, -h, 0)
            }, 1),
            r.forceTrans.set(h, g, function () {
              v()
            })
        } else
          M(s, d, {}),
            b.call(r, c, d, null, h, -h, 0),
            v();
        k.call(this, e)
      }
      ,
      m.prototype.showNextState = function () {
        var e = this.actor.metNodes
          , t = (this.curStateIdx + 1) % e.length;
        this.showState(t, !0, 1)
      }
      ,
      m.prototype.showPrevState = function () {
        var e = this.actor.metNodes
          , t = (this.curStateIdx + e.length - 1) % e.length;
        this.showState(t, !0, -1)
      }
      ,
      m.prototype.hasNextState = function () {
        var e = this.actor.metNodes;
        return this.curStateIdx < e.length - 1
      }
      ,
      m.prototype.hasPrevState = function () {
        var e = this.actor.metNodes;
        return this.curStateIdx > 0
      }
      ,
      m.prototype.autoPlay = function () {
        this.stopPlay();
        var e = this.actor.metNodes;
        if (e.length <= 1)
          return;
        var t = this.actor.nodeDesc.delay || 0
          , n = p.valueOrDefault(this.actor.nodeDesc.duration, .4)
          , r = this.actor.nodeDesc.interval || 0
          , s = this.actor.nodeDesc.autoreverses || !1
          , o = this.actor.nodeDesc.endlessLoop || !1
          , u = p.valueOrDefault(this.actor.nodeDesc.repeatCount, 1)
          , a = !0
          , l = 0
          , c = s ? 1 : null
          , h = function () {
            if (!this.actor)
              return;
            var t = null === this.forceTimer;
            if (!t) {
              this.animTimer = i.after(h.bind(this), 1);
              return
            }
            s && (a ? this.curStateIdx >= e.length - 1 && (a = !1) : this.curStateIdx <= 0 && (a = !0));
            var p = t;
            o || (l >= u && (p = !1),
              p && (s ? c === null && this.curStateIdx === 0 && (p = !1) : c === null && (a ? this.curStateIdx >= this.totalStates - 1 && (p = !1) : this.curStateIdx <= 0 && (p = !1))));
            if (p) {
              var d = this.progressCache.get();
              a ? (this.showNextState(),
                this.movingDir = 1) : (this.showPrevState(),
                  this.movingDir = -1);
              var v = !1
                , m = this.curStateIdx / Math.max(1, this.totalStates - 1);
              if (this.movingDir === 1)
                while (m < d)
                  d -= 1,
                    v = !0;
              else if (this.movingDir === -1)
                while (m > d)
                  d += 1,
                    v = !0;
              if (v) {
                this.progressCache.set(d);
                var g = {
                  duration: n * 1e3,
                  curve: f.outSine
                };
                this.progressCache.set(m, g, null)
              }
            }
            o || (c !== null ? c === this.curStateIdx && (c = null) : s ? 0 === this.curStateIdx && (l++,
              l >= u ? this.stopPlay() : c = 1) : e.length - 1 === this.curStateIdx && (l++,
                l >= u ? this.stopPlay() : c = 0));
            if (null !== this.animTimer) {
              var y = p ? n + r : r;
              this.animTimer = i.setTimeout(h.bind(this), Math.floor(y * 1e3))
            }
          };
        this.animTimer = i.setTimeout(h.bind(this), t * 1e3)
      }
      ,
      m.prototype.rangePlay = function (e, t, n) {
        this.stopPlay(),
          this.showState(e, !1, 1);
        var r = p.valueOrDefault(this.actor.nodeDesc.duration, .4)
          , s = this.actor.nodeDesc.interval || 0
          , o = 0
          , u = function () {
            e === t ? this.stopPlay() : a.call(this)
          }
          , a = function () {
            if (!this.actor)
              return;
            var u = null === this.forceTimer;
            if (!u) {
              this.animTimer = i.after(a.bind(this), 1);
              return
            }
            this.curStateIdx === t ? (n > 0 && o++,
              n <= 0 || o < n ? this.showState(e, !0, e < t ? 1 : -1) : this.stopPlay()) : e < t ? this.showNextState() : this.showPrevState(),
              null !== this.animTimer && (this.animTimer = i.setTimeout(a.bind(this), Math.floor((r + s) * 1e3)))
          };
        this.animTimer = i.setTimeout(u.bind(this), 0)
      }
      ,
      m.prototype.stopPlay = function () {
        this.animTimer && (i.clear(this.animTimer),
          this.animTimer = null)
      }
      ,
      m.prototype.isPlaying = function () {
        return null !== this.animTimer
      }
      ,
      m.prototype.getStateViewByIndex = function (e, t) {
        var n = this.actor.metNodes
          , r = n.length;
        if (t) {
          while (e < 0)
            e += r;
          while (e >= r)
            e -= r
        }
        return e < 0 || e > r - 1 ? null : n[e]
      }
      ,
      m.prototype.getAnimProcess = function () {
        return this.progressCache.get()
      }
      ,
      m.prototype.getMovingDir = function () {
        return this.movingDir
      }
      ,
      m.prototype.updateAnimByProcess = function (e, t, n, r, i, s) {
        var o = this
          , u = o.curStateIdx
          , a = o.totalStates - 1;
        if (!i) {
          var f = Math.min(a, Math.max(0, Math.floor(e * a + .5)));
          o.showState(f, !1, null)
        } else if (!r) {
          var f = Math.min(a, Math.max(0, Math.floor(e * a + .5)));
          if (f !== u && !o.forceTimer) {
            var l = t || (f > u ? 1 : -1);
            l === -1 ? o.showPrevState() : o.showNextState()
          }
        } else {
          var c = o.stateViewPlayer
            , h = null
            , p = null
            , d = null
            , f = Math.min(a, Math.max(0, Math.floor(e * a)))
            , v = f - 1
            , m = f + 1;
          !s || (s[3] ? (f = null !== s[0] ? a - s[0] : f,
            v = null !== s[2] ? a - s[2] : f - 1,
            m = null !== s[1] ? a - s[1] : f + 1) : (f = null !== s[0] ? s[0] : f,
              v = null !== s[1] ? s[1] : f - 1,
              m = null !== s[2] ? s[2] : f + 1)),
            o.curStateIdx !== f && k.call(o, f),
            o.curStateIdx = f,
            h = o.getStateViewByIndex(f, n),
            p = o.getStateViewByIndex(v, n),
            d = o.getStateViewByIndex(m, n);
          var g = f - e * a;
          g >= 0 && d && (d.deactiveMetSubNode(),
            d.setIframesVisiblity(!1),
            d !== p && L(c, d),
            d = null),
            g <= 0 && p && (p.deactiveMetSubNode(),
              p.setIframesVisiblity(!1),
              p !== d && L(c, p),
              p = null),
            h.activeMetSubNode(),
            h.setIframesVisiblity(!0),
            b.call(o, h, p, d, g, -1, 1),
            O(c, [h, p, d])
        }
      }
      ,
      m.prototype.silentTimers = function () {
        N.call(this),
          this.stopPlay(),
          x.call(this),
          T.call(this)
      }
      ,
      n.exports = m
  }),
  define("animations/FilmStateAnim", ["require", "exports", "module", "famous/core/Engine", "famous/utilities/Timer", "famous/utilities/Utility", "famous/transitions/Transitionable", "famous/core/Transform", "famous/views/RenderController", "utils/EasingUtils", "utils/TransitionUtils", "utils/TransformUtils", "utils/DebugUtils"], function (e, t, n) {
    "use strict";
    function v(e, t) {
      this.actor = e,
        this.curStateIdx = t || 0,
        this.totalStates = e.metNodes.length,
        this.prevStateIdx = null,
        this.nextStateIdx = null,
        this.animTimer = null,
        this.hookTimer = null,
        this.movingFlagTimer = null,
        this.forceTimer = null,
        this.forceTrans = null,
        this.stateConfigs = p.parseStatesFromArray(e.nodeDesc.nodes),
        this.progressCache = new o(this.curStateIdx / Math.max(1, this.totalStates - 1)),
        this.movingDir = 0,
        this.scrollDirection = null,
        m.call(this, e);
      var n = e.nodeDesc.transition || 0
        , r = p.findInActionsByActionType(e.nodeActions, p.MetNodeActionTypeScroll);
      !e.nodeDesc.autoplay && n !== 0 && null !== r && (y.call(this, e.containerSurface),
        this.scrollDirection = r.i1),
        A.call(this)
    }
    function m(e) {
      this.stateViewPlayer = new a,
        e.containerSurface ? e.containerSurface.add(this.stateViewPlayer) : e.add(this.stateViewPlayer)
    }
    function g(e) {
      var t = this
        , n = t.stateViewPlayer;
      k(n, [e]),
        L(n, e, {}),
        t.progressCache.set(t.curStateIdx / Math.max(1, t.totalStates - 1))
    }
    function y(e) {
      var t = this
        , n = t.stateViewPlayer
        , s = t.actor.nodeDesc.endToEnd || !1
        , o = e.getSize()
        , u = t.actor.nodeDesc.transition || 0
        , a = null
        , f = null
        , l = null
        , p = null
        , d = 0
        , v = null
        , m = function (e) {
          e.preventDefault();
          if (null !== a)
            return;
          if (null !== p)
            return;
          null !== t.forceTimer && x.call(t),
            a = c.absolutePos4Event(e),
            f = t.curStateIdx,
            v = r.getCurrentFrameTime(),
            e.logic === "instantDown" && (a = null)
        }
        , y = function (n) {
          n.preventDefault();
          if (null === a)
            return;
          if (h.isGestureMovingRefuse(t.actor.metNodeId))
            return;
          t.actor.nodeDesc.notTriggerPageFlip && h.setIsRangePagingRefuse(!0);
          var r = c.transformFromElement(e._currentTarget, document.body)
            , i = c.absolutePos4Event(n)
            , v = [i[0] - a[0], i[1] - a[1]];
          v = c.vectorApplyTransform(v, r);
          if (null === l) {
            Math.abs(v[0]) + Math.abs(v[1]) > 12 ? (Math.abs(v[1]) > Math.abs(v[0]) ? t.scrollDirection === 0 && (l = 0) : t.scrollDirection === 1 && (l = 1),
              null === l && h.gestureMovingSet(null)) : (h.gestureMovingSet(t.actor.metNodeId),
                n.stopPropagation());
            if (l === null)
              return;
            if (t.scrollDirection !== l)
              return
          }
          null === p && t.scrollDirection === l && (v[1 - l] > 0 ? null !== t.getStateViewByIndex(t.curStateIdx - 1, s) && (p = u) : null !== t.getStateViewByIndex(t.curStateIdx + 1, s) && (p = u));
          if (null === p) {
            h.gestureMovingSet(null);
            return
          }
          n.stopPropagation();
          if (p === 0)
            return;
          h.gestureMovingSet(t.actor.metNodeId);
          var m = Math.max(-1, Math.min(1, v[1 - l] / o[1 - l]));
          b.call(t),
            d = m;
          var y = f + (t.totalStates - 1) * -m / 2;
          y > 0 ? y = Math.floor(y) : y = Math.ceil(y);
          if (s) {
            while (y < 0)
              y += t.totalStates;
            while (y > t.totalStates - 1)
              y -= t.totalStates
          } else
            y = Math.max(0, Math.min(t.totalStates - 1, y));
          if (y !== t.curStateIdx) {
            t.curStateIdx = y;
            var w = t.getStateViewByIndex(t.curStateIdx, s)
              , E = t.getStateViewByIndex(t.curStateIdx - 1, s)
              , S = t.getStateViewByIndex(t.curStateIdx + 1, s);
            E === S && (v[1 - l] < 0 ? E = null : S = null),
              t.prevStateIdx = E ? t.actor.metNodes.indexOf(E) : -1,
              t.nextStateIdx = S ? t.actor.metNodes.indexOf(S) : -1,
              g.call(t, w),
              T.call(t)
          }
        }
        , w = function (u) {
          u.preventDefault();
          if (l === null) {
            a = null;
            return
          }
          if (null === a)
            return;
          if (u.type === "_e_out" && !c.isEventOutsideOfElement(u, e._currentTarget))
            return;
          var m = c.transformFromElement(e._currentTarget, document.body)
            , y = c.absolutePos4Event(u)
            , b = [y[0] - a[0], y[1] - a[1]];
          b = c.vectorApplyTransform(b, m);
          var w = r.getCurrentFrameTime()
            , N = b[1 - l] / Math.max(1, w - v)
            , k = function (e, u, a) {
              var c = f
                , p = d
                , v = l;
              if (null !== t.forceTimer)
                return;
              null !== t.forceTrans && t.forceTrans.halt(),
                t.forceTrans = null,
                t.forceTimer = i.every(function () {
                  if (!t.actor)
                    return;
                  var i = r.getCurrentFrameTime() - u
                    , f = e + a * i;
                  if (e >= 0 && f <= 0 || e < 0 && f >= 0) {
                    x.call(t),
                      t.prevStateIdx = null,
                      t.nextStateIdx = null,
                      h.gestureMovingSet(null),
                      E.call(t);
                    var l = t.getStateViewByIndex(t.curStateIdx, s);
                    C(n, l),
                      t.curStateIdx !== c && t.actor.actived && (l.activeMetSubNode(),
                        l.setIframesVisiblity(!0))
                  } else {
                    var d = e * i + .5 * a * i * i
                      , m = Math.max(-1, Math.min(1, p + d / o[1 - v]))
                      , y = c + (t.totalStates - 1) * -m / 2;
                    y > 0 ? y = Math.floor(y) : y = Math.ceil(y);
                    if (s) {
                      while (y < 0)
                        y += t.totalStates;
                      while (y > t.totalStates - 1)
                        y -= t.totalStates
                    } else
                      y = Math.max(0, Math.min(t.totalStates - 1, y));
                    if (y !== t.curStateIdx) {
                      t.curStateIdx = y;
                      var l = t.getStateViewByIndex(t.curStateIdx, s)
                        , w = t.getStateViewByIndex(t.curStateIdx - 1, s)
                        , S = t.getStateViewByIndex(t.curStateIdx + 1, s);
                      w === S && (b[1 - v] < 0 ? w = null : S = null),
                        t.prevStateIdx = w ? t.actor.metNodes.indexOf(w) : -1,
                        t.nextStateIdx = S ? t.actor.metNodes.indexOf(S) : -1,
                        g.call(t, l),
                        T.call(t)
                    }
                    t.movingDir = t.curStateIdx > c ? 1 : -1
                  }
                }, 2),
                S.call(t),
                t.movingFlagTimer = i.after(function () {
                  t.actor && h.gestureMovingSet(t.actor.metNodeId),
                    t.movingFlagTimer = null
                }, 1)
            };
          k(N, w, N > 0 ? -0.0005 : 5e-4),
            a = null,
            f = null,
            p = null,
            v = null,
            d = 0,
            l = null
        };
      e.on("_e_down", m),
        e.on("_e_move", y),
        e.on("_e_out", w),
        e.on("_e_up", w)
    }
    function b() {
      if (null !== this.hookTimer)
        return;
      this.hookTimer = i.every(w.bind(this), 1)
    }
    function w() {
      if (!this.actor)
        return;
      if (!this.actor.initialized || !this.actor.actived)
        return;
      var e = Math.max(this.totalStates - 1, 1)
        , t = this.progressCache.get();
      for (var n = 0, r = this.stateConfigs.length; n < r; n++) {
        var i = this.stateConfigs[n]
          , s = 0;
        n < this.curStateIdx - 1 ? s = -1 : n > this.curStateIdx + 1 ? s = 1 : s = Math.max(-1, Math.min(1, t * e - n));
        for (var o = 0; o < i.hooks.length; o++) {
          var u = i.hooks[o];
          u.executeStep(1 - Math.abs(s))
        }
      }
    }
    function E() {
      this.hookTimer && (i.clear(this.hookTimer),
        this.hookTimer = null)
    }
    function S() {
      this.movingFlagTimer && (i.clear(this.movingFlagTimer),
        this.movingFlagTimer = null)
    }
    function x() {
      this.forceTimer && (i.clear(this.forceTimer),
        this.forceTimer = null),
        this.forceTrans && (this.forceTrans.halt(),
          this.forceTrans = null)
    }
    function T() {
      if (!this.actor.initialized || !this.actor.actived)
        return;
      var e = this.stateConfigs[this.curStateIdx];
      if (null === e)
        return;
      for (var t = 0, n = e.performs.length; t < n; t++) {
        var r = e.performs[t];
        r.execute()
      }
    }
    function N(e, t) {
      t.isAway = !0,
        t.deactiveMetSubNode(),
        t.setIframesVisiblity(!1),
        t.containerSurface.setPropertiesCheckDirty({
          visibility: "hidden"
        })
    }
    function C(e, t) {
      return k(e, [t])
    }
    function k(e, t) {
      return e.foreachRenderableExceptSome(t, function (e, t) {
        e.isAway = !0,
          e.deactiveMetSubNode(),
          e.setIframesVisiblity(!1),
          e.containerSurface.setPropertiesCheckDirty({
            visibility: "hidden"
          })
      })
    }
    function L(e, t, n) {
      t.isAway = !1,
        t.setIframesVisiblity(!0),
        t.actived || t.requestDeploy4NodeView(!0),
        t.containerSurface.setPropertiesCheckDirty({
          visibility: "inherit"
        }),
        e.addRenderable(t, n)
    }
    function A() {
      var e = this.stateViewPlayer
        , t = this.actor.metNodes;
      for (var n = 0, r = t.length; n < r; n++) {
        var i = t[n];
        i.isAway = !0,
          i.containerSurface.setPropertiesCheckDirty({
            visibility: "hidden"
          }),
          e.addRenderable(i, {})
      }
    }
    var r = e("famous/core/Engine")
      , i = e("famous/utilities/Timer")
      , s = e("famous/utilities/Utility")
      , o = e("famous/transitions/Transitionable")
      , u = e("famous/core/Transform")
      , a = e("famous/views/RenderController")
      , f = e("utils/EasingUtils")
      , l = e("utils/TransitionUtils")
      , c = e("utils/TransformUtils")
      , h = e("utils/DebugUtils")
      , p = null;
    e(["actions/MetNodeAction"], function (e) {
      p = e
    });
    var d = null;
    e(["tools/MetNodeFactory"], function (e) {
      d = e
    }),
      v.prototype.showState = function (e, t, n) {
        var r = this;
        if (null !== r.forceTimer)
          return;
        if (r.actor === null || r.actor === undefined)
          return;
        var i = r.stateViewPlayer
          , s = r.actor.metNodes
          , o = i.renderables.length > 0
          , u = r.curStateIdx !== e
          , a = 0;
        u && (n || (n = e > r.curStateIdx ? 1 : -1),
          r.movingDir = n,
          a = r.movingDir === 1 ? -1 : 1,
          b.call(r));
        var f = s[e];
        n > 0 ? (r.prevStateIdx = null,
          r.nextStateIdx = r.actor.metNodes.indexOf(f)) : (r.prevStateIdx = r.actor.metNodes.indexOf(f),
            r.nextStateIdx = null);
        var l = function () {
          r.curStateIdx = e,
            r.progressCache.set(r.curStateIdx / Math.max(1, r.totalStates - 1)),
            r.prevStateIdx = null,
            r.nextStateIdx = null,
            E.call(r),
            u && T.call(r);
          if (u || !o) {
            for (var t = 0, n = s.length; t < n; t++) {
              var i = s[t];
              if (!r.actor.actived || f !== i)
                i.deactiveMetSubNode(),
                  i.setIframesVisiblity(!1)
            }
            r.actor.actived && (f.activeMetSubNode(),
              f.setIframesVisiblity(!0))
          }
        };
        k(i, [f]),
          L(i, f, {}),
          l()
      }
      ,
      v.prototype.showNextState = function () {
        var e = this.actor.metNodes
          , t = (this.curStateIdx + 1) % e.length;
        this.showState(t, !1, 1)
      }
      ,
      v.prototype.showPrevState = function () {
        var e = this.actor.metNodes
          , t = (this.curStateIdx + e.length - 1) % e.length;
        this.showState(t, !1, -1)
      }
      ,
      v.prototype.hasNextState = function () {
        var e = this.actor.metNodes;
        return this.curStateIdx < e.length - 1
      }
      ,
      v.prototype.hasPrevState = function () {
        var e = this.actor.metNodes;
        return this.curStateIdx > 0
      }
      ,
      v.prototype.autoPlay = function () {
        this.stopPlay();
        var e = this.actor.metNodes;
        if (e.length <= 1)
          return;
        var t = this.actor.nodeDesc.delay || 0
          , n = h.valueOrDefault(this.actor.nodeDesc.duration, .4)
          , r = 0
          , s = this.actor.nodeDesc.autoreverses || !1
          , o = this.actor.nodeDesc.endlessLoop || !1
          , u = h.valueOrDefault(this.actor.nodeDesc.repeatCount, 1)
          , a = !0
          , f = 0
          , l = s ? 1 : null
          , c = function () {
            if (!this.actor)
              return;
            var t = null === this.forceTimer;
            if (!t) {
              this.animTimer = i.after(c.bind(this), 1);
              return
            }
            s && (a ? this.curStateIdx >= e.length - 1 && (a = !1) : this.curStateIdx <= 0 && (a = !0));
            var h = t;
            o || (f >= u && (h = !1),
              h && (s ? l === null && this.curStateIdx === 0 && (h = !1) : l === null && (a ? this.curStateIdx >= this.totalStates - 1 && (h = !1) : this.curStateIdx <= 0 && (h = !1))));
            if (h) {
              var p = this.progressCache.get();
              a ? (this.showNextState(),
                this.movingDir = 1) : (this.showPrevState(),
                  this.movingDir = -1);
              var d = !1
                , v = this.curStateIdx / Math.max(1, this.totalStates - 1);
              if (this.movingDir === 1)
                while (v <= p)
                  p -= 1,
                    d = !0;
              else if (this.movingDir === -1)
                while (v >= p)
                  p += 1,
                    d = !0;
              if (d) {
                this.progressCache.set(p);
                var m = {
                  duration: n * 1e3
                };
                this.progressCache.set(v, m, null)
              }
            }
            o || (l !== null ? l === this.curStateIdx && (l = null) : s ? 0 === this.curStateIdx && (f++,
              f >= u ? this.stopPlay() : l = 1) : e.length - 1 === this.curStateIdx && (f++,
                f >= u ? this.stopPlay() : l = 0));
            if (null !== this.animTimer) {
              var g = h ? n + r : r;
              this.animTimer = i.setTimeout(c.bind(this), Math.floor(g * 1e3))
            }
          };
        this.animTimer = i.setTimeout(c.bind(this), (n + t) * 1e3)
      }
      ,
      v.prototype.rangePlay = function (e, t, n) {
        this.stopPlay(),
          this.showState(e, !1, 1);
        var r = h.valueOrDefault(this.actor.nodeDesc.duration, .4)
          , s = 0
          , o = 0
          , u = function () {
            e === t ? this.stopPlay() : a.call(this)
          }
          , a = function () {
            if (!this.actor)
              return;
            var u = null === this.forceTimer;
            if (!u) {
              this.animTimer = i.after(a.bind(this), 1);
              return
            }
            this.curStateIdx === t ? (n > 0 && o++,
              n <= 0 || o < n ? this.showState(e, !0, e < t ? 1 : -1) : this.stopPlay()) : e < t ? this.showNextState() : this.showPrevState(),
              null !== this.animTimer && (this.animTimer = i.setTimeout(a.bind(this), Math.floor((r + s) * 1e3)))
          };
        this.animTimer = i.setTimeout(u.bind(this), r * 1e3)
      }
      ,
      v.prototype.stopPlay = function () {
        this.animTimer && (i.clear(this.animTimer),
          this.animTimer = null)
      }
      ,
      v.prototype.isPlaying = function () {
        return null !== this.animTimer
      }
      ,
      v.prototype.getStateViewByIndex = function (e, t) {
        var n = this.actor.metNodes
          , r = n.length;
        if (t) {
          while (e < 0)
            e += r;
          while (e >= r)
            e -= r
        }
        return e < 0 || e > r - 1 ? null : n[e]
      }
      ,
      v.prototype.getAnimProcess = function () {
        return this.progressCache.get()
      }
      ,
      v.prototype.getMovingDir = function () {
        return this.movingDir
      }
      ,
      v.prototype.updateAnimByProcess = function (e, t, n, r, i, s) {
        var o = this
          , u = o.curStateIdx
          , a = o.totalStates - 1
          , f = e * a;
        f > 0 ? f = Math.floor(f) : f = Math.ceil(f);
        while (f < 0)
          f += a + 1;
        while (f > a)
          f -= a + 1;
        if (!i)
          o.showState(f, !1, null);
        else if (f !== u && !o.forceTimer) {
          var l = t || (f > u ? 1 : -1);
          l === -1 ? o.showPrevState() : o.showNextState()
        }
      }
      ,
      v.prototype.silentTimers = function () {
        x.call(this),
          this.stopPlay(),
          E.call(this),
          S.call(this)
      }
      ,
      n.exports = v
  }),
  define("animations/ScrollStateAnim", ["require", "exports", "module", "famous/core/Engine", "famous/utilities/Timer", "famous/utilities/Utility", "famous/transitions/Transitionable", "famous/core/Transform", "famous/views/RenderController", "famous/transitions/Easing", "utils/EasingUtils", "utils/TransitionUtils", "utils/TransformUtils", "famous/core/Transform", "utils/DebugUtils"], function (e, t, n) {
    "use strict";
    function m(e, t) {
      this.actor = e,
        this.curStateIdx = t || 0,
        this.totalStates = e.metNodes.length,
        this.prevStateIdx = null,
        this.nextStateIdx = null,
        this.animTimer = null,
        this.hookTimer = null,
        this.movingFlagTimer = null,
        this.forceTimer = null,
        this.forceTrans = null,
        this.stateConfigs = d.parseStatesFromArray(e.nodeDesc.nodes),
        this.movingDir = 0,
        this.gestureScrollDirection = null,
        this.contentScrollDirection = null,
        this.scrollOffset = 0,
        this.scrollContentSize = 0,
        this.scrollMaxOffset = 0,
        this.subInfos = [],
        g.call(this, e);
      var n = e.nodeDesc.transition || 0
        , r = d.findInActionsByActionType(e.nodeActions, d.MetNodeActionTypeScroll);
      !e.nodeDesc.autoplay && n !== 0 && null !== r && (y.call(this, e.containerSurface),
        this.gestureScrollDirection = r.i1),
        this.contentScrollDirection = n === 23 ? 1 : 0,
        A.call(this)
    }
    function g(e) {
      this.stateViewPlayer = new a,
        e.containerSurface ? e.containerSurface.add(this.stateViewPlayer) : e.add(this.stateViewPlayer)
    }
    function y(e) {
      var t = this
        , n = t.actor.nodeDesc.transition || 0
        , s = null
        , u = null
        , a = null
        , f = null
        , l = null
        , c = function (e) {
          e.preventDefault();
          if (null !== s)
            return;
          if (null !== a)
            return;
          null !== t.forceTimer && x.call(t),
            s = h.absolutePos4Event(e),
            f = r.getCurrentFrameTime(),
            l = t.scrollOffset,
            e.logic === "instantDown" && (s = null)
        }
        , d = function (r) {
          r.preventDefault();
          if (null === s)
            return;
          if (p.isGestureMovingRefuse(t.actor.metNodeId))
            return;
          t.actor.nodeDesc.notTriggerPageFlip && p.setIsRangePagingRefuse(!0);
          var i = h.transformFromElement(e._currentTarget, document.body)
            , o = h.absolutePos4Event(r)
            , f = [o[0] - s[0], o[1] - s[1]];
          f = h.vectorApplyTransform(f, i);
          if (null === u) {
            Math.abs(f[0]) + Math.abs(f[1]) > 12 ? (Math.abs(f[1]) > Math.abs(f[0]) ? t.gestureScrollDirection === 0 && (u = 0) : t.gestureScrollDirection === 1 && (u = 1),
              null === u && p.gestureMovingSet(null)) : (p.gestureMovingSet(t.actor.metNodeId),
                r.stopPropagation());
            if (u === null)
              return;
            if (t.gestureScrollDirection !== u)
              return
          }
          null === a && t.gestureScrollDirection === u && (f[1 - u] > 0 ? t.scrollOffset > 0 && (a = n) : t.scrollOffset < t.scrollMaxOffset && (a = n));
          if (null === a) {
            p.gestureMovingSet(null);
            return
          }
          r.stopPropagation();
          if (a === 0)
            return;
          p.gestureMovingSet(t.actor.metNodeId),
            b.call(t),
            C.call(t, l - f[1 - u])
        }
        , v = function (n) {
          n.preventDefault();
          if (u === null) {
            s = null;
            return
          }
          if (null === s)
            return;
          if (n.type === "mouseout" && !h.isEventOutsideOfElement(n, e._currentTarget))
            return;
          var c = h.transformFromElement(e._currentTarget, document.body)
            , d = h.absolutePos4Event(n)
            , v = [d[0] - s[0], d[1] - s[1]];
          v = h.vectorApplyTransform(v, c);
          var m = r.getCurrentFrameTime()
            , g = 1.5
            , y = v[1 - u] / Math.max(1, m - f);
          y = Math.max(-g, Math.min(g, y));
          var b = function (e) {
            if (null !== t.forceTimer)
              return;
            null !== t.forceTrans && t.forceTrans.halt();
            var n = .003
              , r = {
                duration: Math.abs(e) / n
              }
              , s = t.scrollOffset;
            t.forceTrans = new o(e),
              t.forceTimer = i.every(function () {
                if (!t.actor)
                  return;
                var r = t.forceTrans.get();
                if (t.forceTimer) {
                  var i = (e * e - r * r) / n / 2;
                  e < 0 && (i = -i),
                    C.call(t, s - i)
                }
              }, 1),
              t.forceTrans.set(0, r, function () {
                x.call(t),
                  p.gestureMovingSet(null),
                  L.call(t),
                  E.call(t),
                  T.call(t)
              }),
              S.call(t),
              t.movingFlagTimer = i.after(function () {
                t.actor && p.gestureMovingSet(t.actor.metNodeId),
                  t.movingFlagTimer = null
              }, 1)
          };
          b(y),
            s = null,
            a = null,
            f = null,
            l = null,
            u = null
        };
      e.on("_e_down", c),
        e.on("_e_move", d),
        e.on("_e_out", v),
        e.on("_e_up", v)
    }
    function b() {
      if (null !== this.hookTimer)
        return;
      this.hookTimer = i.every(w.bind(this), 1)
    }
    function w() {
      if (!this.actor)
        return;
      if (!this.actor.initialized || !this.actor.actived)
        return;
      var e = this.contentScrollDirection === 1
        , t = this.subInfos[this.curStateIdx]
        , n = 0;
      e ? n = Math.abs(t.y - this.scrollOffset) / t.h : n = Math.abs(t.x - this.scrollOffset) / t.w,
        n > 1 && (n = 1);
      for (var r = 0, i = this.stateConfigs.length; r < i; r++) {
        var s = this.stateConfigs[r]
          , o = 0;
        r < this.curStateIdx - 1 ? o = -1 : r > this.curStateIdx + 1 ? o = 1 : o = n;
        for (var u = 0; u < s.hooks.length; u++) {
          var a = s.hooks[u];
          a.executeStep(1 - Math.abs(o))
        }
      }
    }
    function E() {
      this.hookTimer && (i.clear(this.hookTimer),
        this.hookTimer = null)
    }
    function S() {
      this.movingFlagTimer && (i.clear(this.movingFlagTimer),
        this.movingFlagTimer = null)
    }
    function x() {
      this.forceTimer && (i.clear(this.forceTimer),
        this.forceTimer = null),
        this.forceTrans && (this.forceTrans.halt(),
          this.forceTrans = null)
    }
    function T() {
      if (!this.actor.initialized || !this.actor.actived)
        return;
      if (this.__lastPerformStateIdx === this.curStateIdx)
        return;
      this.__lastPerformStateIdx = this.curStateIdx;
      var e = this.stateConfigs[this.curStateIdx];
      if (null === e)
        return;
      for (var t = 0, n = e.performs.length; t < n; t++) {
        var r = e.performs[t];
        r.execute()
      }
    }
    function N(e, t, n) {
      t.isAway = !1,
        t.setIframesVisiblity(!0),
        t.actived || t.requestDeploy4NodeView(!0),
        t.containerSurface.setPropertiesCheckDirty({
          visibility: "inherit"
        }),
        e.addRenderable(t, n)
    }
    function C(e) {
      var t = this;
      e < 0 ? e = 0 : e > t.scrollMaxOffset && (e = t.scrollMaxOffset),
        e > t.scrollOffset ? t.movingDir = 1 : e < t.scrollOffset ? t.movingDir = -1 : t.movingDir = 0,
        t.scrollOffset = e,
        L.call(t)
    }
    function k(e, t, n) {
      var r = this
        , s = r.contentScrollDirection === 1
        , u = r.scrollOffset
        , a = r.subInfos[e]
        , l = 0;
      if (0 === t)
        l = s ? a.y : a.x;
      else {
        var c = r.actor.size;
        l = s ? a.ymax - c[1] : a.xmax - c[0]
      }
      var h = function () {
        x.call(r),
          T.call(r),
          E.call(r)
      };
      if (n) {
        var d = p.valueOrDefault(r.actor.nodeDesc.duration, .4)
          , v = {
            duration: d * 1e3,
            curve: f.outSine
          };
        null !== r.forceTrans && r.forceTrans.halt(),
          r.forceTrans = new o(u),
          r.forceTimer = i.every(function () {
            if (!r.actor)
              return;
            var e = r.forceTrans.get();
            r.forceTimer && C.call(r, e)
          }, 1),
          r.forceTrans.set(l, v, function () {
            h()
          })
      } else
        C.call(r, l),
          h()
    }
    function L() {
      var e = this
        , t = e.stateViewPlayer
        , n = this.contentScrollDirection === 1
        , r = this.actor.nodeDesc.endToEnd || !1
        , i = O.call(e, e.scrollOffset)
        , s = [];
      if (i) {
        e.curStateIdx = i[0];
        for (var o = i[0]; o <= i[1]; o++) {
          var a = e.getStateViewByIndex(o, r);
          s.push(a);
          var f = e.subInfos[o]
            , l = 0
            , c = 0;
          n ? (l = f.x,
            c = f.y - e.scrollOffset - a.positionY + a.size[1] / 2) : (l = f.x - e.scrollOffset - a.positionX + a.size[0] / 2,
              c = f.y),
            N(t, a, {
              transform: u.translate(l, c, 0)
            }),
            e.actor.actived && (a.activeMetSubNode(),
              a.setIframesVisiblity(!0))
        }
        var h = this.getStateViewByIndex(i[0] - 1, r)
          , p = this.getStateViewByIndex(i[1] + 1, r);
        h && h.preloadMetSubNode(!0),
          p && p.preloadMetSubNode(!0);
        for (var d = 0, v = s.length; d < v; d++) {
          var m = s[d];
          m.preloadMetSubNode(!0)
        }
      } else
        e.curStateIdx = 0;
      e.curStateIdx > 0 ? e.prevStateIdx = e.curStateIdx - 1 : r ? e.prevStateIdx = e.totalStates - 1 : e.prevStateIdx = null,
        e.curStateIdx < e.totalStates - 1 ? e.nextStateIdx = e.curStateIdx + 1 : r ? e.nextStateIdx = 0 : e.nextStateIdx = null,
        t.foreachRenderableExceptSome(s, function (e, n) {
          e.deactiveMetSubNode(),
            e.setIframesVisiblity(!1),
            e.containerSurface.setPropertiesCheckDirty({
              visibility: "hidden"
            }),
            t.removeRenderable(e)
        })
    }
    function A() {
      var e = this.contentScrollDirection === 1
        , t = this.actor.size
        , n = this.actor.metNodes
        , r = 0
        , i = [];
      for (var s = 0, o = n.length; s < o; s++) {
        var u = n[s]
          , a = {
            i: s,
            x: 0,
            y: 0,
            w: t[0],
            h: t[1],
            xmax: t[0],
            ymax: t[1]
          };
        e ? (a.y = r,
          a.h = u.size[1],
          r += u.size[1]) : (a.x = r,
            a.w = u.size[0],
            r += u.size[0]),
          a.xmax = a.x + a.w,
          a.ymax = a.y + a.h,
          i.push(a),
          u.containerSurface.setSize(u.size)
      }
      this.subInfos = i,
        i.length > 0 && (e ? (this.scrollContentSize = i[i.length - 1].ymax,
          this.scrollMaxOffset = this.scrollContentSize - t[1]) : (this.scrollContentSize = i[i.length - 1].xmax,
            this.scrollMaxOffset = this.scrollContentSize - t[0]))
    }
    function O(e) {
      var t = this
        , n = t.contentScrollDirection === 1
        , r = t.actor.size
        , i = t.subInfos.length
        , s = undefined;
      for (var o = 0; o < i; o++) {
        var u = t.subInfos[o];
        if (undefined === s) {
          var a = n ? u.ymax : u.xmax;
          if (a > e) {
            s = o;
            break
          }
        }
      }
      var f = undefined;
      for (var o = i - 1; o >= 0; o--) {
        var u = t.subInfos[o];
        if (undefined === f) {
          var l = n ? u.y : u.x;
          if (l < e + r[n ? 1 : 0]) {
            f = o;
            break
          }
        }
      }
      return s !== undefined && f !== undefined ? [s, f] : undefined
    }
    var r = e("famous/core/Engine")
      , i = e("famous/utilities/Timer")
      , s = e("famous/utilities/Utility")
      , o = e("famous/transitions/Transitionable")
      , u = e("famous/core/Transform")
      , a = e("famous/views/RenderController")
      , f = e("famous/transitions/Easing")
      , l = e("utils/EasingUtils")
      , c = e("utils/TransitionUtils")
      , h = e("utils/TransformUtils")
      , u = e("famous/core/Transform")
      , p = e("utils/DebugUtils")
      , d = null;
    e(["actions/MetNodeAction"], function (e) {
      d = e
    });
    var v = null;
    e(["tools/MetNodeFactory"], function (e) {
      v = e
    }),
      m.prototype.showState = function (e, t, n) {
        var r = this;
        if (null !== r.forceTimer)
          return;
        if (r.actor === null || r.actor === undefined)
          return;
        k.call(r, e, 0, t)
      }
      ,
      m.prototype.showNextState = function () {
        var e = this.actor.metNodes
          , t = (this.curStateIdx + 1) % e.length;
        this.showState(t, !0, 1)
      }
      ,
      m.prototype.showPrevState = function () {
        var e = this.actor.metNodes
          , t = (this.curStateIdx + e.length - 1) % e.length;
        this.showState(t, !0, -1)
      }
      ,
      m.prototype.hasNextState = function () {
        var e = this.actor.metNodes;
        return this.curStateIdx < e.length - 1
      }
      ,
      m.prototype.hasPrevState = function () {
        return this.curStateIdx > 0
      }
      ,
      m.prototype.autoPlay = function () {
        var e = this;
        e.stopPlay();
        var t = p.valueOrDefault(e.actor.nodeDesc.duration, .4)
          , n = e.actor.nodeDesc.interval || 0
          , r = e.actor.nodeDesc.delay || 0
          , s = e.actor.nodeDesc.autoreverses || !1
          , u = e.actor.nodeDesc.endlessLoop || !1
          , a = p.valueOrDefault(e.actor.nodeDesc.repeatCount, 1)
          , f = e.contentScrollDirection === 1
          , l = e.actor.size
          , c = e.scrollContentSize - l[f ? 1 : 0]
          , h = 0
          , d = function (r, p) {
            var v = e.subInfos[r]
              , m = e.subInfos[p]
              , g = 0
              , y = 0;
            r < p ? (g = f ? v.y : v.x,
              y = f ? m.ymax - l[1] : m.xmax - l[0]) : (g = f ? v.ymax - l[1] : v.xmax - l[0],
                y = f ? m.y : m.x);
            var b = e.totalStates * (t + n) * Math.abs(y - g) / c
              , w = {
                duration: b * 1e3
              };
            null !== e.forceTrans && e.forceTrans.halt(),
              e.forceTrans = new o(g),
              e.forceTimer = i.every(function () {
                if (!e.actor)
                  return;
                var t = e.forceTrans.get();
                e.forceTimer && C.call(e, t)
              }, 1),
              e.forceTrans.set(y, w, function () {
                x.call(e),
                  u || h++,
                  u || h < a ? e.animTimer = i.setTimeout(function () {
                    var t = e.curStateIdx
                      , n = e.totalStates - 1;
                    s && t === n && (n = 0),
                      d(t, n)
                  }, 0) : e.stopPlay()
              })
          };
        e.animTimer = i.setTimeout(function () {
          var t = e.curStateIdx
            , n = e.totalStates - 1;
          s && t === n && (n = 0),
            d(t, n)
        }, r * 1e3)
      }
      ,
      m.prototype.rangePlay = function (e, t, n) {
        var r = this;
        r.stopPlay();
        if (e === t)
          return;
        var s = p.valueOrDefault(r.actor.nodeDesc.duration, .4)
          , u = r.actor.nodeDesc.interval || 0
          , a = r.contentScrollDirection === 1
          , f = r.subInfos[e]
          , l = r.subInfos[t]
          , c = r.actor.size
          , h = r.scrollContentSize - c[a ? 1 : 0]
          , d = 0
          , v = 0;
        e < t ? (d = a ? f.y : f.x,
          v = a ? l.ymax - c[1] : l.xmax - c[0]) : (d = a ? f.ymax - c[1] : f.xmax - c[0],
            v = a ? l.y : l.x);
        var m = 0
          , g = function () {
            var e = r.totalStates * (s + u) * Math.abs(v - d) / h
              , t = {
                duration: e * 1e3
              };
            null !== r.forceTrans && r.forceTrans.halt(),
              r.forceTrans = new o(d),
              r.forceTimer = i.every(function () {
                if (!r.actor)
                  return;
                var e = r.forceTrans.get();
                r.forceTimer && C.call(r, e)
              }, 1),
              r.forceTrans.set(v, t, function () {
                x.call(r),
                  n > 0 && m++,
                  n <= 0 || m < n ? r.animTimer = i.setTimeout(g, 0) : r.stopPlay()
              })
          };
        r.animTimer = i.setTimeout(g, 0)
      }
      ,
      m.prototype.stopPlay = function () {
        this.animTimer && (i.clear(this.animTimer),
          this.animTimer = null)
      }
      ,
      m.prototype.isPlaying = function () {
        return null !== this.animTimer
      }
      ,
      m.prototype.getStateViewByIndex = function (e, t) {
        var n = this.actor.metNodes
          , r = n.length;
        if (t) {
          while (e < 0)
            e += r;
          while (e >= r)
            e -= r
        }
        return e < 0 || e > r - 1 ? null : n[e]
      }
      ,
      m.prototype.getAnimProcess = function () {
        var e = this
          , t = e.scrollMaxOffset;
        return t <= 0 ? 0 : Math.min(1, e.scrollOffset / t)
      }
      ,
      m.prototype.getMovingDir = function () {
        return this.movingDir
      }
      ,
      m.prototype.updateAnimByProcess = function (e, t, n, r, i, s) {
        var o = this
          , u = o.scrollMaxOffset;
        u < 0 && (u = 0),
          C.call(o, u * e)
      }
      ,
      m.prototype.silentTimers = function () {
        x.call(this),
          this.stopPlay(),
          E.call(this),
          S.call(this)
      }
      ,
      n.exports = m
  }),
  define("famous/physics/PhysicsEngine", ["require", "exports", "module", "../core/EventHandler", "famous/core/Engine"], function (e, t, n) {
    function s(e) {
      this.options = Object.create(s.DEFAULT_OPTIONS),
        e && this.setOptions(e),
        this._particles = [],
        this._bodies = [],
        this._agentData = {},
        this._forces = [],
        this._constraints = [],
        this._prevTime = a(),
        this._isSleeping = !1,
        this._eventHandler = null,
        this._currAgentId = 0,
        this._hasBodies = !1,
        this._eventHandler = null
    }
    function l(e) {
      if (e.applyForce)
        return this._forces;
      if (e.applyConstraint)
        return this._constraints
    }
    function c(e, t, n) {
      return t === undefined && (t = this.getParticlesAndBodies()),
        t instanceof Array || (t = [t]),
        e.on("change", this.wake.bind(this)),
        this._agentData[this._currAgentId] = {
          agent: e,
          id: this._currAgentId,
          targets: t,
          source: n
        },
        l.call(this, e).push(this._currAgentId),
        this._currAgentId++
    }
    function h(e) {
      return this._agentData[e]
    }
    function p(e) {
      var t = h.call(this, this._forces[e]);
      t.agent.applyForce(t.targets, t.source)
    }
    function d() {
      for (var e = this._forces.length - 1; e > -1; e--)
        p.call(this, e)
    }
    function v(e, t) {
      var n = this._agentData[this._constraints[e]];
      return n.agent.applyConstraint(n.targets, n.source, t)
    }
    function m(e) {
      var t = 0;
      while (t < this.options.constraintSteps) {
        for (var n = this._constraints.length - 1; n > -1; n--)
          v.call(this, n, e);
        t++
      }
    }
    function g(e, t) {
      e.integrateVelocity(t),
        this.options.velocityCap && e.velocity.cap(this.options.velocityCap).put(e.velocity)
    }
    function y(e, t) {
      e.integrateAngularMomentum(t),
        e.updateAngularVelocity(),
        this.options.angularVelocityCap && e.angularVelocity.cap(this.options.angularVelocityCap).put(e.angularVelocity)
    }
    function b(e, t) {
      e.integrateOrientation(t)
    }
    function w(e, t) {
      e.integratePosition(t),
        e.emit(f.update, e)
    }
    function E(e) {
      d.call(this, e),
        this.forEach(g, e),
        this.forEachBody(y, e),
        m.call(this, e),
        this.forEachBody(b, e),
        this.forEach(w, e)
    }
    function S() {
      var e = 0
        , t = 0;
      return this.forEach(function (n) {
        t = n.getEnergy(),
          e += t
      }),
        e
    }
    function x() {
      var e = 0;
      for (var t in this._agentData)
        e += this.getAgentEnergy(t);
      return e
    }
    var r = e("../core/EventHandler")
      , i = e("famous/core/Engine")
      , o = 1e3 / 120
      , u = 1e3 / 60
      , a = i.getCurrentFrameTime
      , f = {
        start: "start",
        update: "update",
        end: "end"
      };
    s.DEFAULT_OPTIONS = {
      constraintSteps: 1,
      sleepTolerance: 1e-7,
      velocityCap: undefined,
      angularVelocityCap: undefined
    },
      s.prototype.setOptions = function (t) {
        for (var n in t)
          this.options[n] && (this.options[n] = t[n])
      }
      ,
      s.prototype.addBody = function (t) {
        return t._engine = this,
          t.isBody ? (this._bodies.push(t),
            this._hasBodies = !0) : this._particles.push(t),
          t.on("start", this.wake.bind(this)),
          t
      }
      ,
      s.prototype.removeBody = function (t) {
        var n = t.isBody ? this._bodies : this._particles
          , r = n.indexOf(t);
        if (r > -1) {
          for (var i in this._agentData)
            this._agentData.hasOwnProperty(i) && this.detachFrom(this._agentData[i].id, t);
          n.splice(r, 1)
        }
        this.getBodies().length === 0 && (this._hasBodies = !1)
      }
      ,
      s.prototype.attach = function (t, n, r) {
        this.wake();
        if (t instanceof Array) {
          var i = [];
          for (var s = 0; s < t.length; s++)
            i[s] = c.call(this, t[s], n, r);
          return i
        }
        return c.call(this, t, n, r)
      }
      ,
      s.prototype.attachTo = function (t, n) {
        h.call(this, t).targets.push(n)
      }
      ,
      s.prototype.detach = function (t) {
        var n = this.getAgent(t)
          , r = l.call(this, n)
          , i = r.indexOf(t);
        r.splice(i, 1),
          delete this._agentData[t]
      }
      ,
      s.prototype.detachFrom = function (t, n) {
        var r = h.call(this, t);
        if (r.source === n)
          this.detach(t);
        else {
          var i = r.targets
            , s = i.indexOf(n);
          s > -1 && i.splice(s, 1)
        }
      }
      ,
      s.prototype.detachAll = function () {
        this._agentData = {},
          this._forces = [],
          this._constraints = [],
          this._currAgentId = 0
      }
      ,
      s.prototype.getAgent = function (t) {
        return h.call(this, t).agent
      }
      ,
      s.prototype.getParticles = function () {
        return this._particles
      }
      ,
      s.prototype.getBodies = function () {
        return this._bodies
      }
      ,
      s.prototype.getParticlesAndBodies = function () {
        return this.getParticles().concat(this.getBodies())
      }
      ,
      s.prototype.forEachParticle = function (t, n) {
        var r = this.getParticles();
        for (var i = 0, s = r.length; i < s; i++)
          t.call(this, r[i], n)
      }
      ,
      s.prototype.forEachBody = function (t, n) {
        if (!this._hasBodies)
          return;
        var r = this.getBodies();
        for (var i = 0, s = r.length; i < s; i++)
          t.call(this, r[i], n)
      }
      ,
      s.prototype.forEach = function (t, n) {
        this.forEachParticle(t, n),
          this.forEachBody(t, n)
      }
      ,
      s.prototype.getAgentEnergy = function (e) {
        var t = h.call(this, e);
        return t.agent.getEnergy(t.targets, t.source)
      }
      ,
      s.prototype.getEnergy = function () {
        return S.call(this) + x.call(this)
      }
      ,
      s.prototype.step = function () {
        if (this.isSleeping())
          return;
        var t = a()
          , n = t - this._prevTime;
        this._prevTime = t;
        if (n < o)
          return;
        n > u && (n = u),
          E.call(this, n),
          this.emit(f.update, this),
          this.getEnergy() < this.options.sleepTolerance && this.sleep()
      }
      ,
      s.prototype.isSleeping = function () {
        return this._isSleeping
      }
      ,
      s.prototype.isActive = function () {
        return !this._isSleeping
      }
      ,
      s.prototype.sleep = function () {
        if (this._isSleeping)
          return;
        this.forEach(function (e) {
          e.sleep()
        }),
          this.emit(f.end, this),
          this._isSleeping = !0
      }
      ,
      s.prototype.wake = function () {
        if (!this._isSleeping)
          return;
        this._prevTime = a(),
          this.emit(f.start, this),
          this._isSleeping = !1
      }
      ,
      s.prototype.emit = function (t, n) {
        if (this._eventHandler === null)
          return;
        this._eventHandler.emit(t, n)
      }
      ,
      s.prototype.on = function (t, n) {
        this._eventHandler === null && (this._eventHandler = new r),
          this._eventHandler.on(t, n)
      }
      ,
      n.exports = s
  }),
  define("famous/math/Vector", ["require", "exports", "module"], function (e, t, n) {
    function r(e, t, n) {
      return arguments.length === 1 && e !== undefined ? this.set(e) : (this.x = e || 0,
        this.y = t || 0,
        this.z = n || 0),
        this
    }
    function s(e, t, n) {
      return this.x = e,
        this.y = t,
        this.z = n,
        this
    }
    function o(e) {
      return s.call(this, e[0], e[1], e[2] || 0)
    }
    function u(e) {
      return s.call(this, e.x, e.y, e.z)
    }
    function a(e) {
      return s.call(this, e, 0, 0)
    }
    var i = new r(0, 0, 0);
    r.prototype.add = function (t) {
      return s.call(i, this.x + t.x, this.y + t.y, this.z + t.z)
    }
      ,
      r.prototype.sub = function (t) {
        return s.call(i, this.x - t.x, this.y - t.y, this.z - t.z)
      }
      ,
      r.prototype.mult = function (t) {
        return s.call(i, t * this.x, t * this.y, t * this.z)
      }
      ,
      r.prototype.div = function (t) {
        return this.mult(1 / t)
      }
      ,
      r.prototype.cross = function (t) {
        var n = this.x
          , r = this.y
          , o = this.z
          , u = t.x
          , a = t.y
          , f = t.z;
        return s.call(i, o * a - r * f, n * f - o * u, r * u - n * a)
      }
      ,
      r.prototype.equals = function (t) {
        return t.x === this.x && t.y === this.y && t.z === this.z
      }
      ,
      r.prototype.rotateX = function (t) {
        var n = this.x
          , r = this.y
          , o = this.z
          , u = Math.cos(t)
          , a = Math.sin(t);
        return s.call(i, n, r * u - o * a, r * a + o * u)
      }
      ,
      r.prototype.rotateY = function (t) {
        var n = this.x
          , r = this.y
          , o = this.z
          , u = Math.cos(t)
          , a = Math.sin(t);
        return s.call(i, o * a + n * u, r, o * u - n * a)
      }
      ,
      r.prototype.rotateZ = function (t) {
        var n = this.x
          , r = this.y
          , o = this.z
          , u = Math.cos(t)
          , a = Math.sin(t);
        return s.call(i, n * u - r * a, n * a + r * u, o)
      }
      ,
      r.prototype.dot = function (t) {
        return this.x * t.x + this.y * t.y + this.z * t.z
      }
      ,
      r.prototype.normSquared = function () {
        return this.dot(this)
      }
      ,
      r.prototype.norm = function () {
        return Math.sqrt(this.normSquared())
      }
      ,
      r.prototype.normalize = function (t) {
        arguments.length === 0 && (t = 1);
        var n = this.norm();
        return n > 1e-7 ? u.call(i, this.mult(t / n)) : s.call(i, t, 0, 0)
      }
      ,
      r.prototype.clone = function () {
        return new r(this)
      }
      ,
      r.prototype.isZero = function () {
        return !(this.x || this.y || this.z)
      }
      ,
      r.prototype.set = function (t) {
        return t instanceof Array ? o.call(this, t) : typeof t == "number" ? a.call(this, t) : u.call(this, t)
      }
      ,
      r.prototype.setXYZ = function (e, t, n) {
        return s.apply(this, arguments)
      }
      ,
      r.prototype.set1D = function (e) {
        return a.call(this, e)
      }
      ,
      r.prototype.put = function (t) {
        this === i ? u.call(t, i) : u.call(t, this)
      }
      ,
      r.prototype.clear = function () {
        return s.call(this, 0, 0, 0)
      }
      ,
      r.prototype.cap = function f(f) {
        if (f === Infinity)
          return u.call(i, this);
        var e = this.norm();
        return e > f ? u.call(i, this.mult(f / e)) : u.call(i, this)
      }
      ,
      r.prototype.project = function (t) {
        return t.mult(this.dot(t))
      }
      ,
      r.prototype.reflectAcross = function (t) {
        return t.normalize().put(t),
          u(i, this.sub(this.project(t).mult(2)))
      }
      ,
      r.prototype.get = function () {
        return [this.x, this.y, this.z]
      }
      ,
      r.prototype.get1D = function () {
        return this.x
      }
      ,
      n.exports = r
  }),
  define("famous/physics/integrators/SymplecticEuler", ["require", "exports", "module"], function (e, t, n) {
    var r = {};
    r.integrateVelocity = function (t, n) {
      var r = t.velocity
        , i = t.inverseMass
        , s = t.force;
      if (s.isZero())
        return;
      r.add(s.mult(n * i)).put(r),
        s.clear()
    }
      ,
      r.integratePosition = function (t, n) {
        var r = t.position
          , i = t.velocity;
        r.add(i.mult(n)).put(r)
      }
      ,
      r.integrateAngularMomentum = function (t, n) {
        var r = t.angularMomentum
          , i = t.torque;
        if (i.isZero())
          return;
        r.add(i.mult(n)).put(r),
          i.clear()
      }
      ,
      r.integrateOrientation = function (t, n) {
        var r = t.orientation
          , i = t.angularVelocity;
        if (i.isZero())
          return;
        r.add(r.multiply(i).scalarMultiply(.5 * n)).put(r)
      }
      ,
      n.exports = r
  }),
  define("famous/physics/bodies/Particle", ["require", "exports", "module", "../../math/Vector", "../../core/Transform", "../../core/EventHandler", "../integrators/SymplecticEuler"], function (e, t, n) {
    function u(e) {
      e = e || {};
      var t = u.DEFAULT_OPTIONS;
      this.position = new r,
        this.velocity = new r,
        this.force = new r,
        this._engine = null,
        this._isSleeping = !0,
        this._eventOutput = null,
        this.mass = e.mass !== undefined ? e.mass : t.mass,
        this.inverseMass = 1 / this.mass,
        this.setPosition(e.position || t.position),
        this.setVelocity(e.velocity || t.velocity),
        this.force.set(e.force || [0, 0, 0]),
        this.transform = i.identity.slice(),
        this._spec = {
          size: [!0, !0],
          target: {
            transform: this.transform,
            origin: [.5, .5],
            target: null
          }
        }
    }
    function l() {
      this._eventOutput = new s,
        this._eventOutput.bindThis(this),
        s.setOutputHandler(this, this._eventOutput)
    }
    var r = e("../../math/Vector")
      , i = e("../../core/Transform")
      , s = e("../../core/EventHandler")
      , o = e("../integrators/SymplecticEuler");
    u.DEFAULT_OPTIONS = {
      position: [0, 0, 0],
      velocity: [0, 0, 0],
      mass: 1
    };
    var a = {
      start: "start",
      update: "update",
      end: "end"
    }
      , f = Date.now;
    u.prototype.isBody = !1,
      u.prototype.isActive = function () {
        return !this._isSleeping
      }
      ,
      u.prototype.sleep = function () {
        if (this._isSleeping)
          return;
        this.emit(a.end, this),
          this._isSleeping = !0
      }
      ,
      u.prototype.wake = function () {
        if (!this._isSleeping)
          return;
        this.emit(a.start, this),
          this._isSleeping = !1,
          this._prevTime = f(),
          this._engine && this._engine.wake()
      }
      ,
      u.prototype.setPosition = function (t) {
        this.position.set(t)
      }
      ,
      u.prototype.setPosition1D = function (t) {
        this.position.x = t
      }
      ,
      u.prototype.getPosition = function () {
        return this._engine.step(),
          this.position.get()
      }
      ,
      u.prototype.getPosition1D = function () {
        return this._engine.step(),
          this.position.x
      }
      ,
      u.prototype.setVelocity = function (t) {
        this.velocity.set(t),
          (t[0] !== 0 || t[1] !== 0 || t[2] !== 0) && this.wake()
      }
      ,
      u.prototype.setVelocity1D = function (t) {
        this.velocity.x = t,
          t !== 0 && this.wake()
      }
      ,
      u.prototype.getVelocity = function () {
        return this.velocity.get()
      }
      ,
      u.prototype.setForce = function (t) {
        this.force.set(t),
          this.wake()
      }
      ,
      u.prototype.getVelocity1D = function () {
        return this.velocity.x
      }
      ,
      u.prototype.setMass = function (t) {
        this.mass = t,
          this.inverseMass = 1 / t
      }
      ,
      u.prototype.getMass = function () {
        return this.mass
      }
      ,
      u.prototype.reset = function (t, n) {
        this.setPosition(t || [0, 0, 0]),
          this.setVelocity(n || [0, 0, 0])
      }
      ,
      u.prototype.applyForce = function (t) {
        if (t.isZero())
          return;
        this.force.add(t).put(this.force),
          this.wake()
      }
      ,
      u.prototype.applyImpulse = function (t) {
        if (t.isZero())
          return;
        var n = this.velocity;
        n.add(t.mult(this.inverseMass)).put(n)
      }
      ,
      u.prototype.integrateVelocity = function (t) {
        o.integrateVelocity(this, t)
      }
      ,
      u.prototype.integratePosition = function (t) {
        o.integratePosition(this, t)
      }
      ,
      u.prototype._integrate = function (t) {
        this.integrateVelocity(t),
          this.integratePosition(t)
      }
      ,
      u.prototype.getEnergy = function () {
        return .5 * this.mass * this.velocity.normSquared()
      }
      ,
      u.prototype.getTransform = function () {
        this._engine.step();
        var t = this.position
          , n = this.transform;
        return n[12] = t.x,
          n[13] = t.y,
          n[14] = t.z,
          n
      }
      ,
      u.prototype.modify = function (t) {
        var n = this._spec.target;
        return n.transform = this.getTransform(),
          n.target = t,
          this._spec
      }
      ,
      u.prototype.emit = function (t, n) {
        if (!this._eventOutput)
          return;
        this._eventOutput.emit(t, n)
      }
      ,
      u.prototype.on = function () {
        return l.call(this),
          this.on.apply(this, arguments)
      }
      ,
      u.prototype.removeListener = function () {
        return l.call(this),
          this.removeListener.apply(this, arguments)
      }
      ,
      u.prototype.pipe = function () {
        return l.call(this),
          this.pipe.apply(this, arguments)
      }
      ,
      u.prototype.unpipe = function () {
        return l.call(this),
          this.unpipe.apply(this, arguments)
      }
      ,
      n.exports = u
  }),
  define("famous/physics/forces/Force", ["require", "exports", "module", "../../math/Vector", "../../core/EventHandler"], function (e, t, n) {
    function s(e) {
      this.force = new r(e),
        this._eventOutput = new i,
        i.setOutputHandler(this, this._eventOutput)
    }
    var r = e("../../math/Vector")
      , i = e("../../core/EventHandler");
    s.prototype.setOptions = function (t) {
      this._eventOutput.emit("change", t)
    }
      ,
      s.prototype.applyForce = function (t) {
        var n = t.length;
        while (n--)
          t[n].applyForce(this.force)
      }
      ,
      s.prototype.getEnergy = function () {
        return 0
      }
      ,
      n.exports = s
  }),
  define("famous/physics/forces/Drag", ["require", "exports", "module", "./Force"], function (e, t, n) {
    function i(e) {
      this.options = Object.create(this.constructor.DEFAULT_OPTIONS),
        e && this.setOptions(e),
        r.call(this)
    }
    var r = e("./Force");
    i.prototype = Object.create(r.prototype),
      i.prototype.constructor = i,
      i.FORCE_FUNCTIONS = {
        LINEAR: function (e) {
          return e
        },
        QUADRATIC: function (e) {
          return e.mult(e.norm())
        }
      },
      i.DEFAULT_OPTIONS = {
        strength: .01,
        forceFunction: i.FORCE_FUNCTIONS.LINEAR
      },
      i.prototype.applyForce = function (t) {
        var n = this.options.strength, r = this.options.forceFunction, i = this.force, s, o;
        for (s = 0; s < t.length; s++)
          o = t[s],
            r(o.velocity).mult(-n).put(i),
            o.applyForce(i)
      }
      ,
      i.prototype.setOptions = function (t) {
        for (var n in t)
          this.options[n] = t[n]
      }
      ,
      n.exports = i
  }),
  define("famous/physics/forces/Spring", ["require", "exports", "module", "./Force", "../../math/Vector"], function (e, t, n) {
    function s(e) {
      r.call(this),
        this.options = Object.create(this.constructor.DEFAULT_OPTIONS),
        e && this.setOptions(e),
        this.disp = new i(0, 0, 0),
        l.call(this)
    }
    function a() {
      var e = this.options;
      e.stiffness = Math.pow(2 * o / e.period, 2)
    }
    function f() {
      var e = this.options;
      e.damping = 4 * o * e.dampingRatio / e.period
    }
    function l() {
      a.call(this),
        f.call(this)
    }
    var r = e("./Force")
      , i = e("../../math/Vector");
    s.prototype = Object.create(r.prototype),
      s.prototype.constructor = s;
    var o = Math.PI
      , u = 150;
    s.FORCE_FUNCTIONS = {
      FENE: function (e, t) {
        var n = t * .99
          , r = Math.max(Math.min(e, n), -n);
        return r / (1 - r * r / (t * t))
      },
      HOOK: function (e) {
        return e
      }
    },
      s.DEFAULT_OPTIONS = {
        period: 300,
        dampingRatio: .1,
        length: 0,
        maxLength: Infinity,
        anchor: undefined,
        forceFunction: s.FORCE_FUNCTIONS.HOOK
      },
      s.prototype.setOptions = function (t) {
        t.anchor !== undefined && (t.anchor.position instanceof i && (this.options.anchor = t.anchor.position),
          t.anchor instanceof i && (this.options.anchor = t.anchor),
          t.anchor instanceof Array && (this.options.anchor = new i(t.anchor))),
          t.period !== undefined && (t.period < u && (t.period = u,
            console.warn("The period of a SpringTransition is capped at " + u + " ms. Use a SnapTransition for faster transitions")),
            this.options.period = t.period),
          t.dampingRatio !== undefined && (this.options.dampingRatio = t.dampingRatio),
          t.length !== undefined && (this.options.length = t.length),
          t.forceFunction !== undefined && (this.options.forceFunction = t.forceFunction),
          t.maxLength !== undefined && (this.options.maxLength = t.maxLength),
          l.call(this),
          r.prototype.setOptions.call(this, t)
      }
      ,
      s.prototype.applyForce = function (t, n) {
        var r = this.force, i = this.disp, s = this.options, o = s.stiffness, u = s.damping, a = s.length, f = s.maxLength, l = s.anchor || n.position, c = s.forceFunction, h, p, d, v, m, g;
        for (h = 0; h < t.length; h++) {
          p = t[h],
            d = p.position,
            v = p.velocity,
            l.sub(d).put(i),
            m = i.norm() - a;
          if (m === 0)
            return;
          g = p.mass,
            o *= g,
            u *= g,
            i.normalize(o * c(m, f)).put(r),
            u && (n ? r.add(v.sub(n.velocity).mult(-u)).put(r) : r.add(v.mult(-u)).put(r)),
            p.applyForce(r),
            n && n.applyForce(r.mult(-1))
        }
      }
      ,
      s.prototype.getEnergy = function (t, n) {
        var r = this.options
          , i = r.length
          , s = n ? n.position : r.anchor
          , o = r.stiffness
          , u = 0;
        for (var a = 0; a < t.length; a++) {
          var f = t[a]
            , l = s.sub(f.position).norm() - i;
          u += .5 * o * l * l
        }
        return u
      }
      ,
      n.exports = s
  }),
  define("famous/core/ViewSequence", ["require", "exports", "module"], function (e, t, n) {
    function r(e) {
      e || (e = []),
        e instanceof Array && (e = {
          array: e
        }),
        this._ = null,
        this.index = e.index || 0,
        e.array ? this._ = new this.constructor.Backing(e.array) : e._ && (this._ = e._),
        this.index === this._.firstIndex && (this._.firstNode = this),
        this.index === this._.firstIndex + this._.array.length - 1 && (this._.lastNode = this),
        e.loop !== undefined && (this._.loop = e.loop),
        e.trackSize !== undefined && (this._.trackSize = e.trackSize),
        this._previousNode = null,
        this._nextNode = null
    }
    r.Backing = function (t) {
      this.array = t,
        this.firstIndex = 0,
        this.loop = !1,
        this.firstNode = null,
        this.lastNode = null,
        this.cumulativeSizes = [[0, 0]],
        this.sizeDirty = !0,
        this.trackSize = !1
    }
      ,
      r.Backing.prototype.getValue = function (t) {
        var n = t - this.firstIndex;
        return n < 0 || n >= this.array.length ? null : this.array[n]
      }
      ,
      r.Backing.prototype.setValue = function (t, n) {
        this.array[t - this.firstIndex] = n
      }
      ,
      r.Backing.prototype.getSize = function (t) {
        return this.cumulativeSizes[t]
      }
      ,
      r.Backing.prototype.calculateSize = function (t) {
        t = t || this.array.length;
        var n = [0, 0];
        for (var r = 0; r < t; r++) {
          var i = this.array[r].getSize();
          if (!i)
            return undefined;
          n[0] !== undefined && (i[0] === undefined ? n[0] = undefined : n[0] += i[0]),
            n[1] !== undefined && (i[1] === undefined ? n[1] = undefined : n[1] += i[1]),
            this.cumulativeSizes[r + 1] = n.slice()
        }
        return this.sizeDirty = !1,
          n
      }
      ,
      r.Backing.prototype.reindex = function (t, n, r) {
        if (!this.array[0])
          return;
        var i = 0
          , s = this.firstIndex
          , o = r - n
          , u = this.firstNode;
        while (s < t - 1)
          u = u.getNext(),
            s++;
        var a = u;
        for (i = 0; i < n; i++)
          u = u.getNext(),
            u && (u._previousNode = a);
        var f = u ? u.getNext() : null;
        a._nextNode = null,
          u = a;
        for (i = 0; i < r; i++)
          u = u.getNext();
        s += r,
          u !== f && (u._nextNode = f,
            f && (f._previousNode = u));
        if (f) {
          u = f,
            s++;
          while (u && s < this.array.length + this.firstIndex)
            u._nextNode ? u.index += o : u.index = s,
              u = u.getNext(),
              s++
        }
        this.trackSize && (this.sizeDirty = !0)
      }
      ,
      r.prototype.getPrevious = function () {
        var t = this._.array.length;
        return t ? this.index === this._.firstIndex ? this._.loop ? (this._previousNode = this._.lastNode || new this.constructor({
          _: this._,
          index: this._.firstIndex + t - 1
        }),
          this._previousNode._nextNode = this) : this._previousNode = null : this._previousNode || (this._previousNode = new this.constructor({
            _: this._,
            index: this.index - 1
          }),
            this._previousNode._nextNode = this) : this._previousNode = null,
          this._previousNode
      }
      ,
      r.prototype.getNext = function () {
        var t = this._.array.length;
        return t ? this.index === this._.firstIndex + t - 1 ? this._.loop ? (this._nextNode = this._.firstNode || new this.constructor({
          _: this._,
          index: this._.firstIndex
        }),
          this._nextNode._previousNode = this) : this._nextNode = null : this._nextNode || (this._nextNode = new this.constructor({
            _: this._,
            index: this.index + 1
          }),
            this._nextNode._previousNode = this) : this._nextNode = null,
          this._nextNode
      }
      ,
      r.prototype.indexOf = function (t) {
        return this._.array.indexOf(t)
      }
      ,
      r.prototype.getIndex = function () {
        return this.index
      }
      ,
      r.prototype.toString = function i() {
        return "" + this.index
      }
      ,
      r.prototype.unshift = function (t) {
        this._.array.unshift.apply(this._.array, arguments),
          this._.firstIndex -= arguments.length,
          this._.trackSize && (this._.sizeDirty = !0)
      }
      ,
      r.prototype.push = function (t) {
        this._.array.push.apply(this._.array, arguments),
          this._.trackSize && (this._.sizeDirty = !0)
      }
      ,
      r.prototype.splice = function (t, n) {
        var r = Array.prototype.slice.call(arguments, 2);
        this._.array.splice.apply(this._.array, [t - this._.firstIndex, n].concat(r)),
          this._.reindex(t, n, r.length)
      }
      ,
      r.prototype.swap = function (t) {
        var n = t.get()
          , r = this.get();
        this._.setValue(this.index, n),
          this._.setValue(t.index, r);
        var i = this._previousNode
          , s = this._nextNode
          , o = this.index
          , u = t._previousNode
          , a = t._nextNode
          , f = t.index;
        this.index = f,
          this._previousNode = u === this ? t : u,
          this._previousNode && (this._previousNode._nextNode = this),
          this._nextNode = a === this ? t : a,
          this._nextNode && (this._nextNode._previousNode = this),
          t.index = o,
          t._previousNode = i === t ? this : i,
          t._previousNode && (t._previousNode._nextNode = t),
          t._nextNode = s === t ? this : s,
          t._nextNode && (t._nextNode._previousNode = t),
          this.index === this._.firstIndex ? this._.firstNode = this : this.index === this._.firstIndex + this._.array.length - 1 && (this._.lastNode = this),
          t.index === this._.firstIndex ? this._.firstNode = t : t.index === this._.firstIndex + this._.array.length - 1 && (this._.lastNode = t),
          this._.trackSize && (this._.sizeDirty = !0)
      }
      ,
      r.prototype.get = function () {
        return this._.getValue(this.index)
      }
      ,
      r.prototype.getSize = function () {
        var t = this.get();
        return t ? t.getSize() : null
      }
      ,
      r.prototype.render = function () {
        this._.trackSize && this._.sizeDirty && this._.calculateSize();
        var t = this.get();
        return t ? t.render.apply(t, arguments) : null
      }
      ,
      n.exports = r
  }),
  define("famous/core/Group", ["require", "exports", "module", "./Context", "./Transform", "./Surface"], function (e, t, n) {
    function o(e) {
      s.call(this, e),
        this._shouldRecalculateSize = !1,
        this._container = document.createDocumentFragment(),
        this.context = new r(this._container),
        this.setContent(this._container),
        this._groupSize = [undefined, undefined]
    }
    var r = e("./Context")
      , i = e("./Transform")
      , s = e("./Surface");
    o.SIZE_ZERO = [0, 0],
      o.prototype = Object.create(s.prototype),
      o.prototype.elementType = "div",
      o.prototype.elementClass = "famous-group",
      o.prototype.add = function () {
        return this.context.add.apply(this.context, arguments)
      }
      ,
      o.prototype.render = function () {
        return s.prototype.render.call(this)
      }
      ,
      o.prototype.deploy = function (t) {
        this.context.migrate(t)
      }
      ,
      o.prototype.recall = function (t) {
        this._container = document.createDocumentFragment(),
          this.context.migrate(this._container)
      }
      ,
      o.prototype.commit = function (t) {
        var n = t.transform
          , r = t.origin
          , u = t.opacity
          , a = t.size
          , f = s.prototype.commit.call(this, {
            allocator: t.allocator,
            transform: i.thenMove(n, [-r[0] * a[0], -r[1] * a[1], 0]),
            opacity: u,
            origin: r,
            size: o.SIZE_ZERO
          });
        if (a[0] !== this._groupSize[0] || a[1] !== this._groupSize[1])
          this._groupSize[0] = a[0],
            this._groupSize[1] = a[1],
            this.context.setSize(a);
        return this.context.update({
          transform: i.translate(-r[0] * a[0], -r[1] * a[1], 0),
          origin: r,
          size: a
        }),
          f
      }
      ,
      n.exports = o
  }),
  define("famous/views/Scroller", ["require", "exports", "module", "../core/Entity", "../core/Group", "../core/OptionsManager", "../core/Transform", "../utilities/Utility", "../core/ViewSequence", "../core/EventHandler"], function (e, t, n) {
    function l(e) {
      this.options = Object.create(this.constructor.DEFAULT_OPTIONS),
        this._optionsManager = new s(this.options),
        e && this._optionsManager.setOptions(e),
        this._node = null,
        this._position = 0,
        this._positionOffset = 0,
        this._positionGetter = null,
        this._outputFunction = null,
        this._masterOutputFunction = null,
        this.outputFrom(),
        this._onEdge = 0,
        this.group = new i,
        this.group.add({
          render: v.bind(this)
        }),
        this._entityId = r.register(this),
        this._size = [undefined, undefined],
        this._contextSize = [undefined, undefined],
        this._eventInput = new f,
        this._eventOutput = new f,
        f.setInputHandler(this, this._eventInput),
        f.setOutputHandler(this, this._eventOutput)
    }
    function h(e) {
      e || (e = this._contextSize);
      var t = this.options.direction;
      return e[t] === undefined ? this._contextSize[t] : e[t]
    }
    function p(e, t, n) {
      var r = e.getSize ? e.getSize() : this._contextSize
        , i = this._outputFunction(t);
      return n.push({
        transform: i,
        target: e.render()
      }),
        h.call(this, r)
    }
    function d() {
      return this.options.clipSize !== undefined ? this.options.clipSize : this._contextSize[this.options.direction] > this.getCumulativeSize()[this.options.direction] ? h.call(this, this.getCumulativeSize()) : h.call(this, this._contextSize)
    }
    function v() {
      var e = null
        , t = this._position
        , n = []
        , r = -this._positionOffset
        , i = d.call(this)
        , s = this._node;
      while (s && r - t < i + this.options.margin)
        r += p.call(this, s, r, n),
          s = s.getNext ? s.getNext() : null;
      var o = this._node
        , u = h.call(this, o.getSize());
      if (r < i) {
        while (o && u < i)
          o = o.getPrevious(),
            o && (u += h.call(this, o.getSize()));
        o = this._node;
        while (o && u < i)
          o = o.getNext(),
            o && (u += h.call(this, o.getSize()))
      }
      !s && r - t < i - c ? this._onEdge !== 1 && (this._onEdge = 1,
        this._eventOutput.emit("onEdge", {
          position: r - i
        })) : !this._node.getPrevious() && t < -c ? this._onEdge !== -1 && (this._onEdge = -1,
          this._eventOutput.emit("onEdge", {
            position: 0
          })) : this._onEdge !== 0 && (this._onEdge = 0,
            this._eventOutput.emit("offEdge")),
        s = this._node && this._node.getPrevious ? this._node.getPrevious() : null,
        r = -this._positionOffset,
        s && (e = s.getSize ? s.getSize() : this._contextSize,
          r -= h.call(this, e));
      while (s && r - t > -(i + this.options.margin))
        p.call(this, s, r, n),
          s = s.getPrevious ? s.getPrevious() : null,
          s && (e = s.getSize ? s.getSize() : this._contextSize,
            r -= h.call(this, e));
      return this._node.render()
    }
    var r = e("../core/Entity")
      , i = e("../core/Group")
      , s = e("../core/OptionsManager")
      , o = e("../core/Transform")
      , u = e("../utilities/Utility")
      , a = e("../core/ViewSequence")
      , f = e("../core/EventHandler");
    l.DEFAULT_OPTIONS = {
      direction: u.Direction.Y,
      margin: 0,
      clipSize: undefined,
      groupScroll: !1
    };
    var c = 0;
    l.prototype.getCumulativeSize = function (e) {
      return e === undefined && (e = this._node._.cumulativeSizes.length - 1),
        this._node._.getSize(e)
    }
      ,
      l.prototype.setOptions = function (t) {
        t.groupScroll !== this.options.groupScroll && (t.groupScroll ? this.group.pipe(this._eventOutput) : this.group.unpipe(this._eventOutput)),
          this._optionsManager.setOptions(t)
      }
      ,
      l.prototype.onEdge = function () {
        return this._onEdge
      }
      ,
      l.prototype.outputFrom = function (t, n) {
        t || (t = function (e) {
          return this.options.direction === u.Direction.X ? o.translate(e, 0) : o.translate(0, e)
        }
          .bind(this),
          n || (n = t)),
          this._outputFunction = t,
          this._masterOutputFunction = n ? n : function (e) {
            return o.inverse(t(-e))
          }
      }
      ,
      l.prototype.positionFrom = function (t) {
        t instanceof Function ? this._positionGetter = t : t && t.get ? this._positionGetter = t.get.bind(t) : (this._positionGetter = null,
          this._position = t),
          this._positionGetter && (this._position = this._positionGetter.call(this))
      }
      ,
      l.prototype.sequenceFrom = function (t) {
        t instanceof Array && (t = new a({
          array: t
        })),
          this._node = t,
          this._positionOffset = 0
      }
      ,
      l.prototype.getSize = function (t) {
        return t ? this._contextSize : this._size
      }
      ,
      l.prototype.render = function () {
        return this._node ? (this._positionGetter && (this._position = this._positionGetter.call(this)),
          this._entityId) : null
      }
      ,
      l.prototype.commit = function (t) {
        var n = t.transform
          , r = t.opacity
          , i = t.origin
          , s = t.size;
        !this.options.clipSize && (s[0] !== this._contextSize[0] || s[1] !== this._contextSize[1]) && (this._onEdge = 0,
          this._contextSize[0] = s[0],
          this._contextSize[1] = s[1],
          this.options.direction === u.Direction.X ? (this._size[0] = d.call(this),
            this._size[1] = undefined) : (this._size[0] = undefined,
              this._size[1] = d.call(this)));
        var a = this._masterOutputFunction(-this._position);
        return {
          transform: o.multiply(n, a),
          size: s,
          opacity: r,
          origin: i,
          target: v.call(this)
        }
      }
      ,
      n.exports = l
  }),
  define("views/Scrollview", ["require", "exports", "module", "famous/physics/PhysicsEngine", "famous/physics/bodies/Particle", "famous/physics/forces/Drag", "famous/physics/forces/Spring", "famous/core/EventHandler", "famous/core/OptionsManager", "famous/core/ViewSequence", "famous/views/Scroller", "famous/utilities/Utility", "utils/TransformUtils", "utils/DebugUtils", "famous/utilities/Timer", "famous/transitions/Easing", "utils/EasingUtils", "famous/transitions/Transitionable"], function (e, t, n) {
    function w(e) {
      this.options = Object.create(w.DEFAULT_OPTIONS),
        this._optionsManager = new a(this.options),
        this._scroller = new l(this.options),
        this._physicsEngine = new r,
        this._particle = new i,
        this._physicsEngine.addBody(this._particle),
        this.spring = new o({
          anchor: [0, 0, 0],
          period: this.options.edgePeriod,
          dampingRatio: this.options.edgeDamp
        }),
        this.drag = new s({
          forceFunction: s.FORCE_FUNCTIONS.QUADRATIC,
          strength: this.options.drag
        }),
        this.friction = new s({
          forceFunction: s.FORCE_FUNCTIONS.LINEAR,
          strength: this.options.friction
        }),
        this._node = null,
        this._touchCount = 0,
        this._springState = y.NONE,
        this._onEdge = b.NONE,
        this._partSpringPosition = 0,
        this._pageSpringPosition = 0,
        this._edgeSpringPosition = 0,
        this._touchVelocity = 0,
        this._needsPaginationCheck = !1,
        this._needsPartCheck = !1,
        this._cachedIndex = 0,
        this._footprints = null,
        this._footprintFreezing = !1,
        this._footprintForceTrans = null,
        this._footprintForceTimer = null,
        this._parts = null,
        this.nodeID = null,
        this._scroller.positionFrom(this.getPosition.bind(this)),
        this._eventInput = new u,
        this._eventOutput = new u,
        u.setInputHandler(this, this._eventInput),
        u.setOutputHandler(this, this._eventOutput),
        T.call(this),
        e && this.setOptions(e)
    }
    function S(e) {
      var t = [];
      for (var n = 0, r = e.length; n < r; n++)
        t.push(e[n]);
      return t
    }
    function x(e) {
      var t = this
        , n = null
        , r = null
        , i = null
        , s = null
        , o = function (e) {
          e.preventDefault();
          if (null !== n)
            return;
          t._touchCount = 1,
            C.call(t),
            t.setVelocity(0),
            t._touchVelocity = 0,
            E.call(this),
            n = h.absolutePos4Event(e),
            r = n,
            i = d.getTime(),
            e.logic === "instantDown" && (t._touchCount = 0,
              n = null)
        }
        , u = function (o) {
          o.preventDefault();
          if (null === n)
            return;
          var u = h.absolutePos4Event(o)
            , a = d.getTime()
            , f = 0
            , l = 0;
          if (!p.isGestureMovingRefuse(t.nodeID) && !t._footprintFreezing) {
            var v = h.transformFromElement(e._currentTarget, document.body)
              , m = u;
            if (null === s) {
              var g = [m[0] - n[0], m[1] - n[1]];
              g = h.vectorApplyTransform(g, v),
                Math.abs(g[0]) + Math.abs(g[1]) > 12 ? (Math.abs(g[1]) > Math.abs(g[0]) ? t.options.direction === c.Direction.Y && (s = 0) : t.options.direction === c.Direction.X && (s = 1),
                  null === s ? p.gestureMovingSet(null) : (p.gestureMovingSet(t.nodeID),
                    t.nodeRangePagingRefuse && p.setIsRangePagingRefuse(!0))) : (p.gestureMovingSet(t.nodeID),
                      t.nodeRangePagingRefuse && p.setIsRangePagingRefuse(!0))
            }
            if (null !== s) {
              var g = [m[0] - r[0], m[1] - r[1]];
              g = h.vectorApplyTransform(g, v),
                l = -g[1 - s],
                f = l / Math.max(1, a - i),
                p.gestureMovingSet(t.nodeID),
                t.nodeRangePagingRefuse && p.setIsRangePagingRefuse(!0)
            }
          }
          var w = t.options.dragSpeedLimit;
          f < -w ? (f = -w,
            l = f * Math.max(1, a - i)) : f > w && (f = w,
              l = f * Math.max(1, a - i)),
            r = u,
            i = a;
          if (!t.options.bounce) {
            var E = t.getPosition()
              , S = L.call(t)
              , x = k.call(t, t._node);
            E + l >= x - S ? (l = x - S - E,
              f = 0,
              t._edgeSpringPosition = x - S,
              t._onEdge = t._scroller._onEdge = b.BOTTOM) : E + l <= 0 ? (l = -E,
                f = 0,
                t._edgeSpringPosition = 0,
                t._onEdge = t._scroller._onEdge = b.TOP) : t._onEdge !== b.NONE && (t._onEdge = t._scroller._onEdge = b.NONE)
          } else {
            var E = t.getPosition()
              , S = L.call(t)
              , x = k.call(t, t._node)
              , T = Math.min(20, S * .15);
            E + l >= x - S + T ? (l = x - S + T - E,
              f = 0,
              t._edgeSpringPosition = x - S,
              t._onEdge = t._scroller._onEdge = b.BOTTOM,
              p.gestureMovingSet(null)) : E + l <= 0 - T && (l = -T - E,
                f = 0,
                t._edgeSpringPosition = 0,
                t._onEdge = t._scroller._onEdge = b.TOP,
                p.gestureMovingSet(null))
          }
          t._touchVelocity = f,
            t.setPosition(t.getPosition() + l),
            t._springState === y.NONE && P.call(t)
        }
        , a = function (e) {
          e.preventDefault(),
            t._touchCount = 0;
          if (s === null) {
            n = null;
            return
          }
          if (null === n)
            return;
          var o = t._touchVelocity;
          if (p.isGestureMovingRefuse(t.nodeID) || t._footprintFreezing)
            o = 0;
          if (!t.options.bounce) {
            var u = t.getPosition()
              , a = L.call(t)
              , f = k.call(t, t._node);
            u >= f - a ? (o = 0,
              t.setPosition(f - a),
              t._edgeSpringPosition = f - a,
              t._onEdge = t._scroller._onEdge = b.BOTTOM) : u <= 0 ? (o = 0,
                t.setPosition(0),
                t._edgeSpringPosition = 0,
                t._onEdge = t._scroller._onEdge = b.TOP) : t._onEdge !== b.NONE && (t._onEdge = t._scroller._onEdge = b.NONE)
          }
          C.call(t),
            t._onEdge !== b.NONE && D.call(t, t._edgeSpringPosition, y.EDGE),
            N.call(t),
            e.type === "mousewheel" && (o !== 0 && (o = o > 0 ? .5 : -0.5),
              p.gestureMovingSet(null));
          var l = t.options.autoSpeedLimit;
          o < -l ? o = -l : o > l && (o = l),
            t.setVelocity(o),
            t._touchVelocity = 0,
            t._needsPaginationCheck = !0,
            t._needsPartCheck = !0,
            t._footprintFreezing = !1,
            n = null,
            r = null,
            i = null,
            s = null
        };
      e.on("_e_down", o),
        e.on("_e_move", u),
        e.on("_e_out", a),
        e.on("_e_up", a)
    }
    function T() {
      this._eventInput.bindThis(this),
        this._eventInput.on("resize", function () {
          this._node._.calculateSize()
        }
          .bind(this)),
        this._scroller.on("onEdge", function (e) {
          this._edgeSpringPosition = e.position,
            A.call(this, this._scroller.onEdge()),
            this._eventOutput.emit("onEdge")
        }
          .bind(this)),
        this._scroller.on("offEdge", function () {
          this._onEdge = this._scroller.onEdge(),
            this._eventOutput.emit("offEdge")
        }
          .bind(this)),
        this._particle.on("update", function (e) {
          this._springState === y.NONE && P.call(this),
            _.call(this)
        }
          .bind(this)),
        this._particle.on("end", function () {
          (!this.options.paginated || this.options.paginated && this._springState !== y.NONE) && this._eventOutput.emit("settle")
        }
          .bind(this))
    }
    function N() {
      this._springState ? this._physicsEngine.attach([this.spring], this._particle) : this._physicsEngine.attach([this.drag, this.friction], this._particle)
    }
    function C() {
      this._springState = y.NONE,
        this._physicsEngine.detachAll()
    }
    function k(e) {
      var t = this.options.direction
        , n = e.getSize();
      return n ? n[t] : this._scroller.getSize()[t]
    }
    function L() {
      var e = this.options.direction
        , t = this.getSize();
      return t ? t[e] : 0
    }
    function A(e) {
      this._onEdge = e,
        !this._touchCount && this._springState !== y.EDGE && D.call(this, this._edgeSpringPosition, y.EDGE),
        this._springState && Math.abs(this.getVelocity()) < .001 && (C.call(this),
          N.call(this))
    }
    function O() {
      if (this._touchCount)
        return;
      if (this._springState === y.EDGE)
        return;
      var e = this.getVelocity();
      if (Math.abs(e) >= this.options.pageStopSpeed)
        return;
      var t = this.getPosition()
        , n = Math.abs(e) > this.options.pageSwitchSpeed
        , r = k.call(this, this._node)
        , i = t > .5 * r
        , s = t < .5 * r
        , o = e > 0
        , u = e < 0;
      this._needsPaginationCheck = !1,
        i && !n || n && o ? this.goToNextPage() : n && u ? this.goToPreviousPage() : D.call(this, 0, y.PAGE)
    }
    function M() {
      if (this._touchCount)
        return;
      if (this._springState === y.EDGE)
        return;
      if (!(this._parts instanceof Array && this._parts.length > 0))
        return;
      var e = this.getVelocity();
      if (Math.abs(e) >= this.options.partStopSpeed)
        return;
      var t = this.getPosition()
        , n = Math.abs(e) > this.options.partSwitchSpeed
        , r = L.call(this)
        , i = S(this._parts)
        , s = null;
      for (var o = 0, u = i.length; o < u; o++)
        null === s ? s = o : Math.abs(i[s].loc - (t + r / 2)) > Math.abs(i[o].loc - (t + r / 2)) && (s = o);
      if (s === null)
        return;
      var a = i[s].loc - r / 2
        , f = null;
      s < i.length - 1 && (f = i[s + 1].loc - r / 2);
      var l = null;
      s > 0 && (l = i[s - 1].loc - r / 2);
      var c = null !== f && t > f * .15 + a * .85
        , h = null !== l && t < l * .15 + a * .85
        , p = null !== f && e > 0
        , d = null !== l && e < 0;
      this._needsPartCheck = !1,
        c && !n || n && p ? D.call(this, f, y.PART) : h && !n || n && d ? D.call(this, l, y.PART) : D.call(this, a, y.PART)
    }
    function _() {
      var e = this;
      if (!(e._footprints instanceof Array && e._footprints.length > 0))
        return;
      var t = L.call(e);
      if (!t)
        return;
      var n = [[0, 1, 0, 0], [0, 0, 0, 0], [0, 1, 0, 1], [0, 1, 1, 0]]
        , r = 1
        , i = e.getOffset()
        , s = [];
      for (var o = 0, u = e._footprints.length; o < u; o++) {
        var a = e._footprints[o]
          , f = i - (a.loc - t / 2)
          , l = a.at;
        f > r ? a.at = 3 : f < -r ? a.at = 2 : a.at = 1,
          n[l][a.at] === 1 ? (e._eventOutput.emit("onFootprint", {
            location: a.loc,
            at: a.at
          }),
            s.push(!0)) : s.push(!1),
          f < -t / 2 ? e._eventOutput.emit("hookFootprint", {
            location: a.loc,
            offset: "u"
          }) : f > t / 2 ? e._eventOutput.emit("hookFootprint", {
            location: a.loc,
            offset: "d"
          }) : e._eventOutput.emit("hookFootprint", {
            location: a.loc,
            offset: f
          })
      }
      if (e.options.footprinted && null === e._footprintForceTimer) {
        var c = 24
          , h = e.getVelocity();
        for (var o = 0, u = e._footprints.length; o < u; o++) {
          var a = e._footprints[o];
          if (a.at === 1)
            continue;
          var f = i - (a.loc - t / 2);
          if (s[o] || Math.abs(f) < c) {
            if (!s[o])
              if (f > 0 && h >= 0 || f < 0 && h <= 0)
                continue;
            e.setVelocity(0),
              e._footprintForceTrans = new g(i),
              e._footprintForceTimer = d.every(function () {
                var t = e._footprintForceTrans.get();
                e._footprintForceTimer && e._particle.setPosition1D(t)
              }, 1);
            var p = m.easingFuncBy(m.EaseOutSine);
            e._footprintForceTrans.set(a.loc - t / 2, {
              duration: 200,
              curve: p
            }, function () {
              d.clear(e._footprintForceTimer),
                e._footprintForceTimer = null,
                v()
            });
            var v = function () {
              e._footprintForceTrans.halt(),
                e._footprintForceTrans = null,
                e._particle.setPosition1D(a.loc - t / 2),
                a.at = 1,
                s[o] || e._eventOutput.emit("onFootprint", {
                  location: a.loc,
                  at: a.at
                })
            };
            e._touchCount ? e._footprintFreezing = !0 : e._footprintFreezing = !1;
            break
          }
        }
      }
    }
    function D(e, t) {
      var n;
      t === y.EDGE ? (this._edgeSpringPosition = e,
        n = {
          anchor: [this._edgeSpringPosition, 0, 0],
          period: this.options.edgePeriod,
          dampingRatio: this.options.edgeDamp
        }) : t === y.PAGE ? (this._pageSpringPosition = e,
          n = {
            anchor: [this._pageSpringPosition, 0, 0],
            period: this.options.pagePeriod,
            dampingRatio: this.options.pageDamp
          }) : t === y.PART && (this._partSpringPosition = e,
            n = {
              anchor: [this._partSpringPosition, 0, 0],
              period: this.options.partPeriod,
              dampingRatio: this.options.partDamp
            }),
        this.spring.setOptions(n),
        t && !this._springState && (C.call(this),
          this._springState = t,
          N.call(this)),
        this._springState = t
    }
    function P() {
      var e = 0
        , t = this.getPosition();
      t += (t < 0 ? -0.5 : .5) >> 0;
      var n = k.call(this, this._node)
        , r = this._node.getNext();
      while (e + t >= n && r)
        e -= n,
          this._scroller.sequenceFrom(r),
          this._node = r,
          r = this._node.getNext(),
          n = k.call(this, this._node);
      var i = this._node.getPrevious(), s;
      while (e + t <= 0 && i)
        s = k.call(this, i),
          this._scroller.sequenceFrom(i),
          this._node = i,
          e += s,
          i = this._node.getPrevious();
      e && H.call(this, e),
        this._node && (this._node.index !== this._cachedIndex ? this.getPosition() < .5 * n && (this._cachedIndex = this._node.index,
          this._eventOutput.emit("pageChange", {
            direction: -1,
            index: this._cachedIndex
          })) : this.getPosition() > .5 * n && (this._cachedIndex = this._node.index + 1,
            this._eventOutput.emit("pageChange", {
              direction: 1,
              index: this._cachedIndex
            })))
    }
    function H(e) {
      this._edgeSpringPosition += e,
        this._pageSpringPosition += e,
        this.setPosition(this.getPosition() + e),
        this._springState === y.EDGE ? this.spring.setOptions({
          anchor: [this._edgeSpringPosition, 0, 0]
        }) : this._springState === y.PAGE && this.spring.setOptions({
          anchor: [this._pageSpringPosition, 0, 0]
        })
    }
    var r = e("famous/physics/PhysicsEngine")
      , i = e("famous/physics/bodies/Particle")
      , s = e("famous/physics/forces/Drag")
      , o = e("famous/physics/forces/Spring")
      , u = e("famous/core/EventHandler")
      , a = e("famous/core/OptionsManager")
      , f = e("famous/core/ViewSequence")
      , l = e("famous/views/Scroller")
      , c = e("famous/utilities/Utility")
      , h = e("utils/TransformUtils")
      , p = e("utils/DebugUtils")
      , d = e("famous/utilities/Timer")
      , v = e("famous/transitions/Easing")
      , m = e("utils/EasingUtils")
      , g = e("famous/transitions/Transitionable")
      , y = {
        NONE: 0,
        EDGE: 1,
        PAGE: 2,
        PART: 3
      }
      , b = {
        TOP: -1,
        NONE: 0,
        BOTTOM: 1
      };
    w.DEFAULT_OPTIONS = {
      direction: c.Direction.Y,
      friction: .003,
      drag: 1e-4,
      edgePeriod: 300,
      edgeDamp: 1,
      margin: 1e3,
      paginated: !1,
      pagePeriod: 500,
      pageDamp: .8,
      pageStopSpeed: 10,
      pageSwitchSpeed: .333,
      parted: !1,
      partPeriod: 500,
      partDamp: .8,
      partStopSpeed: 10,
      partSwitchSpeed: .333,
      footprinted: !1,
      bounce: !0,
      dragSpeedLimit: 4,
      autoSpeedLimit: 6,
      groupScroll: !1
    };
    var E = function () {
      this._footprintForceTimer && (d.clear(this._footprintForceTimer),
        this._footprintForceTimer = null),
        this._footprintForceTrans && (this._footprintForceTrans.halt(),
          this._footprintForceTrans = null)
    };
    w.prototype.setupScrollEventHandling = function () {
      x.call(this, this.containerSurface)
    }
      ,
      w.prototype.getCurrentIndex = function () {
        return this._node.index
      }
      ,
      w.prototype.goToPreviousPage = function () {
        if (!this._node || this._onEdge === b.TOP)
          return null;
        if (this.getPosition() > 1 && this._springState === y.NONE)
          return D.call(this, 0, y.PAGE),
            this._node;
        var t = this._node.getPrevious();
        if (t) {
          var n = k.call(this, t);
          this._scroller.sequenceFrom(t),
            this._node = t,
            H.call(this, n),
            D.call(this, 0, y.PAGE)
        }
        return t
      }
      ,
      w.prototype.goToNextPage = function () {
        if (!this._node || this._onEdge === b.BOTTOM)
          return null;
        var t = this._node.getNext();
        if (t) {
          var n = k.call(this, this._node);
          this._scroller.sequenceFrom(t),
            this._node = t,
            H.call(this, -n),
            D.call(this, 0, y.PAGE)
        }
        return t
      }
      ,
      w.prototype.goToPage = function (t) {
        var n = this.getCurrentIndex(), r;
        if (n > t)
          for (r = 0; r < n - t; r++)
            this.goToPreviousPage();
        if (n < t)
          for (r = 0; r < t - n; r++)
            this.goToNextPage()
      }
      ,
      w.prototype.outputFrom = function () {
        return this._scroller.outputFrom.apply(this._scroller, arguments)
      }
      ,
      w.prototype.setupFootprints = function (e) {
        var t = [];
        for (var n = 0, r = e.length; n < r; n++)
          t.push({
            loc: e[n],
            at: 0
          });
        this._footprints = t
      }
      ,
      w.prototype.setupParts = function (e) {
        var t = [];
        for (var n = 0, r = e.length; n < r; n++)
          t.push({
            loc: e[n],
            at: 0
          });
        this._parts = t
      }
      ,
      w.prototype.isOnTopEdge = function () {
        return this._onEdge === b.TOP
      }
      ,
      w.prototype.isOnBottomEdge = function () {
        return this._onEdge === b.BOTTOM
      }
      ,
      w.prototype.getViewSizeForDirection = function () {
        return L.call(this)
      }
      ,
      w.prototype.getContentSizeForDirection = function () {
        return k.call(this, this._node)
      }
      ,
      w.prototype.resetToPosition = function (e) {
        this.setOffset(e),
          C.call(this),
          this.setVelocity(0),
          this._touchVelocity = 0,
          E.call(this)
      }
      ,
      w.prototype.getPosition = function () {
        return this._particle.getPosition1D()
      }
      ,
      w.prototype.getAbsolutePosition = function () {
        return this._scroller.getCumulativeSize(this.getCurrentIndex())[this.options.direction] + this.getPosition()
      }
      ,
      w.prototype.getOffset = w.prototype.getPosition,
      w.prototype.setPosition = function (t) {
        this._particle.setPosition1D(t),
          _.call(this)
      }
      ,
      w.prototype.setOffset = w.prototype.setPosition,
      w.prototype.getVelocity = function () {
        return this._touchCount ? this._touchVelocity : this._particle.getVelocity1D()
      }
      ,
      w.prototype.setVelocity = function (t) {
        this._particle.setVelocity1D(t)
      }
      ,
      w.prototype.setOptions = function (t) {
        t.direction !== undefined && (t.direction === "x" ? t.direction = c.Direction.X : t.direction === "y" && (t.direction = c.Direction.Y)),
          t.groupScroll !== this.options.groupScroll && (t.groupScroll ? this.subscribe(this._scroller) : this.unsubscribe(this._scroller)),
          this._optionsManager.setOptions(t),
          this._scroller.setOptions(t),
          t.drag !== undefined && this.drag.setOptions({
            strength: this.options.drag
          }),
          t.friction !== undefined && this.friction.setOptions({
            strength: this.options.friction
          }),
          (t.edgePeriod !== undefined || t.edgeDamp !== undefined) && this.spring.setOptions({
            period: this.options.edgePeriod,
            dampingRatio: this.options.edgeDamp
          })
      }
      ,
      w.prototype.sequenceFrom = function (t) {
        return t instanceof Array && (t = new f({
          array: t,
          trackSize: !0
        })),
          this._node = t,
          this._scroller.sequenceFrom(t)
      }
      ,
      w.prototype.getSize = function () {
        return this._scroller.getSize.apply(this._scroller, arguments)
      }
      ,
      w.prototype.render = function () {
        return this.options.paginated && this._needsPaginationCheck ? O.call(this) : this.options.parted && this._needsPartCheck && M.call(this),
          this._scroller.render()
      }
      ,
      n.exports = w
  }),
  define("actions/MetHook", ["require", "exports", "module", "famous/core/Engine"], function (e, t, n) {
    "use strict";
    function o() {
      this.id_ = "",
        this.source = {
          nodeID: "",
          pageID: "",
          propKeyPath: ""
        },
        this.target = {
          nodeID: "",
          pageID: "",
          propKeyPath: ""
        },
        this.actionType = -1,
        this.srcType = "",
        this.dstType = ""
    }
    function u(e, t, n) {
      return !e || !e.initialized || !t && !e.actived ? !1 : "MetScrollNode" === e.type || "MetAnimNode" === e.type || "MetStateNode" === e.type ? !0 : "AudioNode" === e.type || "VideoNode" === e.type ? !0 : i.hasSlideOneInActions(e.nodeActions) ? !0 : !1
    }
    function a(e, t, n) {
      return i.MetNodeActionTypeMaskClip === n && e ? !0 : !e || !e.initialized || !t && !e.actived ? !1 : "MetScrollNode" === e.type || "MetAnimNode" === e.type || "MetStateNode" === e.type || "MetMaskNode" === e.type ? !0 : "AudioNode" === e.type || "VideoNode" === e.type ? !0 : i.hasSlideOneInActions(e.nodeActions) ? !0 : !1
    }
    function f(e) {
      if ("MetScrollNode" === e.type) {
        var t = e.scrollView
          , n = t.getOffset()
          , r = Math.max(1, t.getContentSizeForDirection() - t.getViewSizeForDirection());
        return [n / r, null, e]
      }
      if ("MetAnimNode" === e.type) {
        var s = e.curKeyframeAnim
          , n = s.curAnimTime
          , r = Math.max(1, s.totalAnimTime);
        return [n / r, null, e]
      }
      if ("MetStateNode" === e.type) {
        var o = e.curStateAnim;
        if (!o)
          return null;
        var u = o.actor.nodeDesc.endToEnd || !1
          , a = ["MetStateNode", o.curStateIdx, o.prevStateIdx, o.nextStateIdx, o.totalStates, o.getMovingDir(), u];
        return [o.getAnimProcess(), a, e]
      }
      if ("AudioNode" === e.type) {
        var n = e.mainSurface.getCurrentTime() || 0
          , r = e.mainSurface.getDuration() || 1;
        return [Math.min(1, n / r), null, e]
      }
      if ("VideoNode" === e.type) {
        var n = e.mainSurface.getCurrentTime() || 0
          , r = e.mainSurface.getDuration() || 1;
        return [Math.min(1, n / r), null, e]
      }
      if (i.hasSlideOneInActions(e.nodeActions)) {
        var f = i.findInActionsByActionType(e.nodeActions, i.MetNodeActionTypeSlide);
        if (null !== f) {
          var l = e.nodeDesc.positionX || 0
            , c = e.nodeDesc.positionY || 0
            , h = f.f2 + l
            , p = f.f4 + c
            , d = Math.max(1, Math.sqrt((h - l) * (h - l) + (p - c) * (p - c)))
            , v = e.getPositionPixels()
            , m = ((v[0] - l) * (h - l) + (v[1] - c) * (p - c)) / d;
          return [m / d, null, e]
        }
      }
      return null
    }
    function l(e, t, n, r) {
      if (!t)
        return;
      if (c(e, t, n, r))
        return;
      var s = t[0]
        , o = t[1];
      if ("MetStateNode" !== e.type || e.nodeDesc.transition === 20)
        if ("MetAnimNode" === e.type)
          if (o) {
            if (o[0] === "MetStateNode") {
              var u = 1 / (o[4] - 1);
              s >= 1 + u ? s = 0 : s <= -u ? s = 1 : s > 1 ? s = Math.min(2, Math.max(1, 1 + (s - 1) / u)) : s < 0 && (s = 2 + Math.min(0, Math.max(-1, s / u)))
            }
          } else
            s = Math.max(0, Math.min(1, s));
        else
          s = Math.max(0, Math.min(1, s));
      n && (s = 1 - s,
        o && o[0] === "MetStateNode" && (o[5] || (o[5] = -o[5])));
      if ("MetScrollNode" === e.type) {
        var a = e.scrollView
          , f = Math.max(1, a.getContentSizeForDirection() - a.getViewSizeForDirection());
        a.setOffset(s * f)
      } else if ("MetAnimNode" === e.type) {
        var l = e.curKeyframeAnim
          , f = Math.max(1, l.totalAnimTime);
        l.gotoTime(s * f)
      } else if ("MetStateNode" === e.type) {
        var h = e.curStateAnim
          , p = !1
          , d = null
          , v = !1
          , m = !0
          , g = null;
        o && (o[0] === "MetStateNode" ? (o[4] === h.totalStates && (p = !0),
          d = o[5],
          v = o[6],
          g = [o[1], o[2], o[3], n]) : o[0] === "SingleStep" && (m = !1)),
          !v && h.actor.nodeDesc.autoplay && (v = !0),
          h.updateAnimByProcess(s, d, v, p, m, g)
      } else if ("AudioNode" === e.type) {
        var f = e.mainSurface.getDuration() || 1;
        e.mainSurface.seek(s * f),
          e.mainSurface.isPlaying() && e.mainSurface.pause()
      } else if ("VideoNode" === e.type) {
        var f = e.mainSurface.getDuration() || 1;
        e.mainSurface.seek(s * f),
          e.mainSurface.isPlaying() && e.mainSurface.pause()
      } else if (i.hasSlideOneInActions(e.nodeActions)) {
        var y = i.findInActionsByActionType(e.nodeActions, i.MetNodeActionTypeSlide);
        if (null !== y) {
          var b = e.nodeDesc.positionX || 0
            , w = e.nodeDesc.positionY || 0
            , E = y.f2 + b
            , S = y.f4 + w
            , x = s * (E - b) + b
            , T = s * (S - w) + w;
          e.setPositionPixels(x, T)
        }
      }
    }
    function c(e, t, n, s) {
      if ("MetMaskNode" === e.type) {
        var o = t[2];
        if (o && "MetAnimNode" !== o.type)
          for (var u = 0, a = d.length; u < a; u++) {
            var f = d[u];
            if (f.target.nodeID === e.metNodeId) {
              var l = r.sharedInstance();
              o = l.getMetNode(f.source.nodeID);
              break
            }
          }
        if (o && "MetAnimNode" === o.type) {
          var c = [o.displacementPosX, o.displacementPosY]
            , h = [o.scaleX - (o.nodeDesc.scaleX || 1), o.scaleY - (o.nodeDesc.scaleY || 1)];
          return e.updateMasking(c, h, n, !1),
            !0
        }
      }
      if (s === i.MetNodeActionTypeMaskClip) {
        var o = t[2];
        if (o && "MetAnimNode" !== o.type)
          for (var u = 0, a = d.length; u < a; u++) {
            var f = d[u];
            if (f.target.nodeID === e.metNodeId) {
              var l = r.sharedInstance();
              o = l.getMetNode(f.source.nodeID);
              break
            }
          }
        if (o && "MetAnimNode" === o.type)
          return e.updateMaskCliping(o, n),
            !0
      }
      return !1
    }
    function m(e, t) {
      var n = null
        , s = [e];
      while (s.length > 0) {
        var o = [];
        for (var u = 0, a = s.length; u < a; u++) {
          var f = s[u]
            , l = 0;
          while (l < t.length) {
            var c = t[l];
            c.source.nodeID === f ? (c.target.nodeID !== f && "" !== c.target.nodeID && (null === n && (n = r.sharedInstance().getMetNode(e)),
              c.executeSync(n, !0),
              i.MetNodeActionTypeMaskClip !== c.actionType && o.push(c.target.nodeID)),
              t.splice(l, 1),
              l--) : c.target.nodeID === f && (c.source.nodeID !== f && "" !== c.source.nodeID && (null === n && (n = r.sharedInstance().getMetNode(e)),
                c.executeSync(n, !1),
                i.MetNodeActionTypeMaskClip !== c.actionType && o.push(c.source.nodeID)),
                t.splice(l, 1),
                l--),
              l++
          }
        }
        s = o
      }
      return t
    }
    function g(e, t) {
      return t = m(e, t),
        t
    }
    function y() {
      var e = [];
      for (var t = 0, n = d.length; t < n; t++)
        e.push(d[t]);
      for (var t = 0, n = v.length; t < n; t++)
        e = m(v[t], e);
      var r = [];
      for (var t = 0, n = e.length; t < n; t++) {
        var i = e[t];
        if (i.getSrcType() === "MetAnimNode") {
          var o = i.getSrcNodeView();
          o.nodeDesc.autoplay && r.push(i.source.nodeID)
        } else if (i.getSrcType() === "MetStateNode") {
          var o = i.getSrcNodeView();
          o.nodeDesc.autoplay && r.push(i.source.nodeID)
        } else if (i.getSrcType() === "VideoNode") {
          var o = i.getSrcNodeView();
          o.mainSurface.isPlaying() && r.push(i.source.nodeID)
        } else if (i.getSrcType() === "AudioNode") {
          var o = i.getSrcNodeView();
          o.mainSurface.isPlaying() && r.push(i.source.nodeID)
        }
        if (i.getDstType() === "MetAnimNode") {
          var u = i.getDstNodeView();
          u.nodeDesc.autoplay && r.push(i.target.nodeID)
        } else if (i.getDstType() === "MetStateNode") {
          var u = i.getDstNodeView();
          u.nodeDesc.autoplay && r.push(i.target.nodeID)
        } else if (i.getDstType() === "VideoNode") {
          var u = i.getDstNodeView();
          u.mainSurface.isPlaying() && r.push(i.target.nodeID)
        } else if (i.getDstType() === "AudioNode") {
          var u = i.getDstNodeView();
          u.mainSurface.isPlaying() && r.push(i.target.nodeID)
        }
      }
      for (var t = 0, n = r.length; t < n; t++) {
        var a = r[t];
        e = g(a, e)
      }
      s.nextTick(y)
    }
    function b() {
      if (h)
        return;
      if (p.length === 0)
        return;
      s.nextTick(y),
        h = !0
    }
    function w() {
      if (!h)
        return;
      if (p.length > 0)
        return;
      s.removeTick(y),
        h = !1
    }
    var r = null;
    e(["tools/MetNodeFactory"], function (e) {
      r = e
    });
    var i = null;
    e(["actions/MetNodeAction"], function (e) {
      i = e
    });
    var s = e("famous/core/Engine");
    o.prototype.parseByDic = function (e) {
      this.id_ = e.id_ || "",
        this.inverse = e.inverse || !1,
        this.source.nodeID = e.source.nodeID || "",
        this.source.pageID = e.source.pageID || "",
        this.source.propKeyPath = e.source.propKeyPath || "",
        this.target.nodeID = e.target.nodeID || "",
        this.target.pageID = e.target.pageID || "",
        this.target.propKeyPath = e.target.propKeyPath || ""
    }
      ,
      o.prototype.executeSync = function (e, t) {
        if (!e)
          return;
        var n = this.getSrcNodeView()
          , r = this.getDstNodeView();
        if (!n || !r)
          return;
        if (!u(e, !1, this.actionType))
          return;
        if (!u(n, !1, this.actionType) || !a(r, !1, this.actionType))
          return;
        var i = e
          , s = t ? r : n;
        l(s, f(i), this.inverse, this.actionType)
      }
      ,
      o.prototype.executeStep = function (e) {
        var t = this.getDstNodeView();
        if (!t)
          return;
        var n = this.source.pageID !== "";
        if (!a(t, n))
          return;
        l(t, [e, ["SingleStep"], null], this.inverse, this.actionType)
      }
      ,
      o.prototype.getSrcType = function () {
        if (this.srcType === "") {
          var e = this.getSrcNodeView();
          this.srcType = e.type || ""
        }
        return this.srcType
      }
      ,
      o.prototype.getDstType = function () {
        if (this.dstType === "") {
          var e = this.getDstNodeView();
          e ? this.dstType = e.type || "" : this.dstType = "none"
        }
        return this.dstType
      }
      ,
      o.prototype.getSrcNodeView = function () {
        var e = r.sharedInstance();
        return e.getMetNode(this.source.nodeID)
      }
      ,
      o.prototype.getDstNodeView = function () {
        var e = r.sharedInstance();
        return e.getMetNode(this.target.nodeID)
      }
      ;
    var h = !1
      , p = []
      , d = []
      , v = [];
    o.isHookRegistered = function (e) {
      return !e || !e.id_ ? !1 : p.indexOf(e.id_) !== -1
    }
      ,
      o.registerHook = function (e, t) {
        if (o.isHookRegistered(e))
          return;
        p.push(e.id_),
          d.push(e),
          e.actionType = t,
          b()
      }
      ,
      o.unregisterHook = function (e) {
        if (!o.isHookRegistered(e))
          return;
        var t = p.indexOf(e.id_);
        p.splice(t, 1),
          d.splice(t, 1),
          w()
      }
      ,
      o.unregisterAllHooks = function () {
        p.length = 0,
          d.length = 0,
          v.length = 0,
          w()
      }
      ,
      o.canDriveHooking = function (e) {
        if (e.type === "MetScrollNode") {
          if (!i.hasScrollOneInActions(e.nodeActions))
            return !1
        } else if (e.type === "MetAnimNode") {
          if (!i.hasScrollOneInActions(e.nodeActions) && !i.hasTapOneInActions(e.nodeActions))
            return !1
        } else if (e.type === "MetStateNode") {
          if (!i.hasScrollOneInActions(e.nodeActions) && !i.hasTapOneInActions(e.nodeActions))
            return !1
        } else if (!i.hasSlideOneInActions(e.nodeActions))
          return !1;
        return !0
      }
      ,
      o.flagActiveNodeID = function (e) {
        if (!e || e.length === 0)
          return;
        o.flagActiveNodeIDS([e])
      }
      ,
      o.flagActiveNodeIDS = function (e) {
        if (!e || e.length === 0)
          return;
        var t = []
          , n = r.sharedInstance();
        for (var i = 0, s = e.length; i < s; i++) {
          var u = e[i];
          if (!u || u.length === 0)
            continue;
          var a = n.getMetNode(u);
          if (!a)
            continue;
          t.unshift(u)
        }
        if (t.length === 0)
          return;
        var f = []
          , l = [];
        for (var i = 0, s = t.length; i < s; i++) {
          var u = t[i], c;
          c = l.indexOf(u);
          if (c !== -1)
            continue;
          c = v.indexOf(u);
          if (c === -1) {
            var h = [];
            for (var p = 0, m = d.length; p < m; p++)
              h.push(d[p]);
            var g = !0
              , y = [u];
            while (y.length > 0) {
              var b = [];
              for (var p = 0, m = y.length; p < m; p++) {
                var w = y[p]
                  , E = 0;
                while (E < h.length) {
                  var S = h[E];
                  if (S.source.nodeID === w) {
                    if (S.target.nodeID !== w && "" !== S.target.nodeID) {
                      if (-1 !== f.indexOf(S.target.nodeID)) {
                        g = !1,
                          b = [];
                        break
                      }
                      o.flagInactiveNodeID(S.target.nodeID),
                        b.push(S.target.nodeID),
                        l.push(S.target.nodeID)
                    }
                    h.splice(E, 1),
                      E--
                  } else if (S.target.nodeID === w) {
                    if (S.source.nodeID !== w && "" !== S.source.nodeID) {
                      if (-1 !== f.indexOf(S.source.nodeID)) {
                        g = !1,
                          b = [];
                        break
                      }
                      o.flagInactiveNodeID(S.source.nodeID),
                        b.push(S.source.nodeID),
                        l.push(S.source.nodeID)
                    }
                    h.splice(E, 1),
                      E--
                  }
                  E++
                }
              }
              y = b
            }
            g && (v.push(u),
              f.push(u))
          } else
            f.push(u)
        }
      }
      ,
      o.flagInactiveNodeID = function (e) {
        var t = v.indexOf(e);
        t !== -1 && v.splice(t, 1);
        var n = r.sharedInstance()
          , i = n.getMetNode(e);
        !i || (i.type === "MetAnimNode" ? i.curKeyframeAnim.isPlaying() && i.curKeyframeAnim.stopAnim() : i.type === "MetStateNode" && i.curStateAnim.isPlaying() && i.curStateAnim.stopPlay())
      }
      ,
      n.exports = o
  }),
  define("utils/Exif", ["require", "exports", "module"], function (e, t, n) {
    "use strict";
    function l(e, t, n) {
      e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
    }
    function c(e) {
      return !!e.exifdata
    }
    function h(e, t) {
      t = t || e.match(/^data\:([^\;]+)\;base64,/mi)[1] || "",
        e = e.replace(/^data\:([^\;]+)\;base64,/gmi, "");
      var n = atob(e)
        , r = n.length
        , i = new ArrayBuffer(r)
        , s = new Uint8Array(i);
      for (var o = 0; o < r; o++)
        s[o] = n.charCodeAt(o);
      return i
    }
    function p(e, t) {
      var n = new XMLHttpRequest;
      n.open("GET", e, !0),
        n.responseType = "blob",
        n.onload = function (e) {
          (this.status == 200 || this.status === 0) && t(this.response)
        }
        ,
        n.send()
    }
    function d(e, t) {
      function n(n) {
        var r = v(n);
        e.exifdata = r || {};
        var s = m(n);
        e.iptcdata = s || {};
        if (i.isXmpEnabled) {
          var o = N(n);
          e.xmpdata = o || {}
        }
        t && t.call(e)
      }
      if (e.src)
        if (/^data\:/i.test(e.src)) {
          var s = h(e.src);
          n(s)
        } else if (/^blob\:/i.test(e.src)) {
          var o = new FileReader;
          o.onload = function (e) {
            n(e.target.result)
          }
            ,
            p(e.src, function (e) {
              o.readAsArrayBuffer(e)
            })
        } else {
          var u = new XMLHttpRequest;
          u.onload = function () {
            if (this.status != 200 && this.status !== 0)
              throw "Could not load image";
            n(u.response),
              u = null
          }
            ,
            u.open("GET", e.src, !0),
            u.responseType = "arraybuffer",
            u.send(null)
        }
      else if (self.FileReader && (e instanceof self.Blob || e instanceof self.File)) {
        var o = new FileReader;
        o.onload = function (e) {
          r && console.log("Got file of length " + e.target.result.byteLength),
            n(e.target.result)
        }
          ,
          o.readAsArrayBuffer(e)
      }
    }
    function v(e) {
      var t = new DataView(e);
      r && console.log("Got file of length " + e.byteLength);
      if (t.getUint8(0) != 255 || t.getUint8(1) != 216)
        return r && console.log("Not a valid JPEG"),
          !1;
      var n = 2, i = e.byteLength, s;
      while (n < i) {
        if (t.getUint8(n) != 255)
          return r && console.log("Not a valid marker at offset " + n + ", found: " + t.getUint8(n)),
            !1;
        s = t.getUint8(n + 1),
          r && console.log(s);
        if (s == 225)
          return r && console.log("Found 0xFFE1 marker"),
            T(t, n + 4, t.getUint16(n + 2) - 2);
        n += 2 + t.getUint16(n + 2)
      }
    }
    function m(e) {
      var t = new DataView(e);
      r && console.log("Got file of length " + e.byteLength);
      if (t.getUint8(0) != 255 || t.getUint8(1) != 216)
        return r && console.log("Not a valid JPEG"),
          !1;
      var n = 2
        , i = e.byteLength
        , s = function (e, t) {
          return e.getUint8(t) === 56 && e.getUint8(t + 1) === 66 && e.getUint8(t + 2) === 73 && e.getUint8(t + 3) === 77 && e.getUint8(t + 4) === 4 && e.getUint8(t + 5) === 4
        };
      while (n < i) {
        if (s(t, n)) {
          var o = t.getUint8(n + 7);
          o % 2 !== 0 && (o += 1),
            o === 0 && (o = 4);
          var u = n + 8 + o
            , a = t.getUint16(n + 6 + o);
          return y(e, u, a)
        }
        n++
      }
    }
    function y(e, t, n) {
      var r = new DataView(e), i = {}, s, o, u, a, f, l = t;
      while (l < t + n)
        r.getUint8(l) === 28 && r.getUint8(l + 1) === 2 && (a = r.getUint8(l + 2),
          a in g && (u = r.getInt16(l + 3),
            f = u + 5,
            o = g[a],
            s = x(r, l + 5, u),
            i.hasOwnProperty(o) ? i[o] instanceof Array ? i[o].push(s) : i[o] = [i[o], s] : i[o] = s)),
          l++;
      return i
    }
    function b(e, t, n, i, s) {
      var o = e.getUint16(n, !s), u = {}, a, f, l;
      for (l = 0; l < o; l++)
        a = n + l * 12 + 2,
          f = i[e.getUint16(a, !s)],
          !f && r && console.log("Unknown tag: " + e.getUint16(a, !s)),
          u[f] = w(e, a, t, n, s);
      return u
    }
    function w(e, t, n, r, i) {
      var s = e.getUint16(t + 2, !i), o = e.getUint32(t + 4, !i), u = e.getUint32(t + 8, !i) + n, a, f, l, c, h, p;
      switch (s) {
        case 1:
        case 7:
          if (o == 1)
            return e.getUint8(t + 8, !i);
          a = o > 4 ? u : t + 8,
            f = [];
          for (c = 0; c < o; c++)
            f[c] = e.getUint8(a + c);
          return f;
        case 2:
          return a = o > 4 ? u : t + 8,
            x(e, a, o - 1);
        case 3:
          if (o == 1)
            return e.getUint16(t + 8, !i);
          a = o > 2 ? u : t + 8,
            f = [];
          for (c = 0; c < o; c++)
            f[c] = e.getUint16(a + 2 * c, !i);
          return f;
        case 4:
          if (o == 1)
            return e.getUint32(t + 8, !i);
          f = [];
          for (c = 0; c < o; c++)
            f[c] = e.getUint32(u + 4 * c, !i);
          return f;
        case 5:
          if (o == 1)
            return h = e.getUint32(u, !i),
              p = e.getUint32(u + 4, !i),
              l = new Number(h / p),
              l.numerator = h,
              l.denominator = p,
              l;
          f = [];
          for (c = 0; c < o; c++)
            h = e.getUint32(u + 8 * c, !i),
              p = e.getUint32(u + 4 + 8 * c, !i),
              f[c] = new Number(h / p),
              f[c].numerator = h,
              f[c].denominator = p;
          return f;
        case 9:
          if (o == 1)
            return e.getInt32(t + 8, !i);
          f = [];
          for (c = 0; c < o; c++)
            f[c] = e.getInt32(u + 4 * c, !i);
          return f;
        case 10:
          if (o == 1)
            return e.getInt32(u, !i) / e.getInt32(u + 4, !i);
          f = [];
          for (c = 0; c < o; c++)
            f[c] = e.getInt32(u + 8 * c, !i) / e.getInt32(u + 4 + 8 * c, !i);
          return f
      }
    }
    function E(e, t, n) {
      var r = e.getUint16(t, !n);
      return e.getUint32(t + 2 + r * 12, !n)
    }
    function S(e, t, n, r) {
      var i = E(e, t + n, r);
      if (!i)
        return {};
      if (i > e.byteLength)
        return {};
      var s = b(e, t, t + i, a, r);
      if (s.Compression)
        switch (s.Compression) {
          case 6:
            if (s.JpegIFOffset && s.JpegIFByteCount) {
              var o = t + s.JpegIFOffset
                , u = s.JpegIFByteCount;
              s.blob = new Blob([new Uint8Array(e.buffer, o, u)], {
                type: "image/jpeg"
              })
            }
            break;
          case 1:
            console.log("Thumbnail image format is TIFF, which is not implemented.");
            break;
          default:
            console.log("Unknown thumbnail image format '%s'", s.Compression)
        }
      else
        s["PhotometricInterpretation"] == 2 && console.log("Thumbnail image format is RGB, which is not implemented.");
      return s
    }
    function x(e, t, n) {
      var r = "";
      for (var i = t; i < t + n; i++)
        r += String.fromCharCode(e.getUint8(i));
      return r
    }
    function T(e, t) {
      if (x(e, t, 4) != "Exif")
        return r && console.log("Not valid EXIF data! " + x(e, t, 4)),
          !1;
      var n, i, a, l, c, h = t + 6;
      if (e.getUint16(h) == 18761)
        n = !1;
      else {
        if (e.getUint16(h) != 19789)
          return r && console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"),
            !1;
        n = !0
      }
      if (e.getUint16(h + 2, !n) != 42)
        return r && console.log("Not valid TIFF data! (no 0x002A)"),
          !1;
      var p = e.getUint32(h + 4, !n);
      if (p < 8)
        return r && console.log("Not valid TIFF data! (First offset less than 8)", e.getUint32(h + 4, !n)),
          !1;
      i = b(e, h, h + p, o, n);
      if (i.ExifIFDPointer) {
        l = b(e, h, h + i.ExifIFDPointer, s, n);
        for (a in l) {
          switch (a) {
            case "LightSource":
            case "Flash":
            case "MeteringMode":
            case "ExposureProgram":
            case "SensingMethod":
            case "SceneCaptureType":
            case "SceneType":
            case "CustomRendered":
            case "WhiteBalance":
            case "GainControl":
            case "Contrast":
            case "Saturation":
            case "Sharpness":
            case "SubjectDistanceRange":
            case "FileSource":
              l[a] = f[a][l[a]];
              break;
            case "ExifVersion":
            case "FlashpixVersion":
              l[a] = String.fromCharCode(l[a][0], l[a][1], l[a][2], l[a][3]);
              break;
            case "ComponentsConfiguration":
              l[a] = f.Components[l[a][0]] + f.Components[l[a][1]] + f.Components[l[a][2]] + f.Components[l[a][3]]
          }
          i[a] = l[a]
        }
      }
      if (i.GPSInfoIFDPointer) {
        c = b(e, h, h + i.GPSInfoIFDPointer, u, n);
        for (a in c) {
          switch (a) {
            case "GPSVersionID":
              c[a] = c[a][0] + "." + c[a][1] + "." + c[a][2] + "." + c[a][3]
          }
          i[a] = c[a]
        }
      }
      return i.thumbnail = S(e, h, p, n),
        i
    }
    function N(e) {
      if (!("DOMParser" in self))
        return;
      var t = new DataView(e);
      r && console.log("Got file of length " + e.byteLength);
      if (t.getUint8(0) != 255 || t.getUint8(1) != 216)
        return r && console.log("Not a valid JPEG"),
          !1;
      var n = 2
        , i = e.byteLength
        , s = new DOMParser;
      while (n < i - 4) {
        if (x(t, n, 4) == "http") {
          var o = n - 1
            , u = t.getUint16(n - 2) - 1
            , a = x(t, o, u)
            , f = a.indexOf("xmpmeta>") + 8;
          a = a.substring(a.indexOf("<x:xmpmeta"), f);
          var l = a.indexOf("x:xmpmeta") + 10;
          a = a.slice(0, l) + 'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" ' + 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ' + 'xmlns:tiff="http://ns.adobe.com/tiff/1.0/" ' + 'xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" ' + 'xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" ' + 'xmlns:exif="http://ns.adobe.com/exif/1.0/" ' + 'xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" ' + 'xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" ' + 'xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" ' + 'xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" ' + 'xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" ' + a.slice(l);
          var c = s.parseFromString(a, "text/xml");
          return k(c)
        }
        n++
      }
    }
    function C(e) {
      var t = {};
      if (e.nodeType == 1) {
        if (e.attributes.length > 0) {
          t["@attributes"] = {};
          for (var n = 0; n < e.attributes.length; n++) {
            var r = e.attributes.item(n);
            t["@attributes"][r.nodeName] = r.nodeValue
          }
        }
      } else if (e.nodeType == 3)
        return e.nodeValue;
      if (e.hasChildNodes())
        for (var i = 0; i < e.childNodes.length; i++) {
          var s = e.childNodes.item(i)
            , o = s.nodeName;
          if (t[o] == null)
            t[o] = C(s);
          else {
            if (t[o].push == null) {
              var u = t[o];
              t[o] = [],
                t[o].push(u)
            }
            t[o].push(C(s))
          }
        }
      return t
    }
    function k(e) {
      try {
        var t = {};
        if (e.children.length > 0)
          for (var n = 0; n < e.children.length; n++) {
            var r = e.children.item(n)
              , i = r.attributes;
            for (var s in i) {
              var o = i[s]
                , u = o.nodeName
                , a = o.nodeValue;
              u !== undefined && (t[u] = a)
            }
            var f = r.nodeName;
            if (typeof t[f] == "undefined")
              t[f] = C(r);
            else {
              if (typeof t[f].push == "undefined") {
                var l = t[f];
                t[f] = [],
                  t[f].push(l)
              }
              t[f].push(C(r))
            }
          }
        else
          t = e.textContent;
        return t
      } catch (c) {
        console.log(c.message)
      }
    }
    var r = !1
      , i = function (e) {
        if (e instanceof i)
          return e;
        if (!(this instanceof i))
          return new i(e)
      }
      , s = i.Tags = {
        36864: "ExifVersion",
        40960: "FlashpixVersion",
        40961: "ColorSpace",
        40962: "PixelXDimension",
        40963: "PixelYDimension",
        37121: "ComponentsConfiguration",
        37122: "CompressedBitsPerPixel",
        37500: "MakerNote",
        37510: "UserComment",
        40964: "RelatedSoundFile",
        36867: "DateTimeOriginal",
        36868: "DateTimeDigitized",
        37520: "SubsecTime",
        37521: "SubsecTimeOriginal",
        37522: "SubsecTimeDigitized",
        33434: "ExposureTime",
        33437: "FNumber",
        34850: "ExposureProgram",
        34852: "SpectralSensitivity",
        34855: "ISOSpeedRatings",
        34856: "OECF",
        37377: "ShutterSpeedValue",
        37378: "ApertureValue",
        37379: "BrightnessValue",
        37380: "ExposureBias",
        37381: "MaxApertureValue",
        37382: "SubjectDistance",
        37383: "MeteringMode",
        37384: "LightSource",
        37385: "Flash",
        37396: "SubjectArea",
        37386: "FocalLength",
        41483: "FlashEnergy",
        41484: "SpatialFrequencyResponse",
        41486: "FocalPlaneXResolution",
        41487: "FocalPlaneYResolution",
        41488: "FocalPlaneResolutionUnit",
        41492: "SubjectLocation",
        41493: "ExposureIndex",
        41495: "SensingMethod",
        41728: "FileSource",
        41729: "SceneType",
        41730: "CFAPattern",
        41985: "CustomRendered",
        41986: "ExposureMode",
        41987: "WhiteBalance",
        41988: "DigitalZoomRation",
        41989: "FocalLengthIn35mmFilm",
        41990: "SceneCaptureType",
        41991: "GainControl",
        41992: "Contrast",
        41993: "Saturation",
        41994: "Sharpness",
        41995: "DeviceSettingDescription",
        41996: "SubjectDistanceRange",
        40965: "InteroperabilityIFDPointer",
        42016: "ImageUniqueID"
      }
      , o = i.TiffTags = {
        256: "ImageWidth",
        257: "ImageHeight",
        34665: "ExifIFDPointer",
        34853: "GPSInfoIFDPointer",
        40965: "InteroperabilityIFDPointer",
        258: "BitsPerSample",
        259: "Compression",
        262: "PhotometricInterpretation",
        274: "Orientation",
        277: "SamplesPerPixel",
        284: "PlanarConfiguration",
        530: "YCbCrSubSampling",
        531: "YCbCrPositioning",
        282: "XResolution",
        283: "YResolution",
        296: "ResolutionUnit",
        273: "StripOffsets",
        278: "RowsPerStrip",
        279: "StripByteCounts",
        513: "JPEGInterchangeFormat",
        514: "JPEGInterchangeFormatLength",
        301: "TransferFunction",
        318: "WhitePoint",
        319: "PrimaryChromaticities",
        529: "YCbCrCoefficients",
        532: "ReferenceBlackWhite",
        306: "DateTime",
        270: "ImageDescription",
        271: "Make",
        272: "Model",
        305: "Software",
        315: "Artist",
        33432: "Copyright"
      }
      , u = i.GPSTags = {
        0: "GPSVersionID",
        1: "GPSLatitudeRef",
        2: "GPSLatitude",
        3: "GPSLongitudeRef",
        4: "GPSLongitude",
        5: "GPSAltitudeRef",
        6: "GPSAltitude",
        7: "GPSTimeStamp",
        8: "GPSSatellites",
        9: "GPSStatus",
        10: "GPSMeasureMode",
        11: "GPSDOP",
        12: "GPSSpeedRef",
        13: "GPSSpeed",
        14: "GPSTrackRef",
        15: "GPSTrack",
        16: "GPSImgDirectionRef",
        17: "GPSImgDirection",
        18: "GPSMapDatum",
        19: "GPSDestLatitudeRef",
        20: "GPSDestLatitude",
        21: "GPSDestLongitudeRef",
        22: "GPSDestLongitude",
        23: "GPSDestBearingRef",
        24: "GPSDestBearing",
        25: "GPSDestDistanceRef",
        26: "GPSDestDistance",
        27: "GPSProcessingMethod",
        28: "GPSAreaInformation",
        29: "GPSDateStamp",
        30: "GPSDifferential"
      }
      , a = i.IFD1Tags = {
        256: "ImageWidth",
        257: "ImageHeight",
        258: "BitsPerSample",
        259: "Compression",
        262: "PhotometricInterpretation",
        273: "StripOffsets",
        274: "Orientation",
        277: "SamplesPerPixel",
        278: "RowsPerStrip",
        279: "StripByteCounts",
        282: "XResolution",
        283: "YResolution",
        284: "PlanarConfiguration",
        296: "ResolutionUnit",
        513: "JpegIFOffset",
        514: "JpegIFByteCount",
        529: "YCbCrCoefficients",
        530: "YCbCrSubSampling",
        531: "YCbCrPositioning",
        532: "ReferenceBlackWhite"
      }
      , f = i.StringValues = {
        ExposureProgram: {
          0: "Not defined",
          1: "Manual",
          2: "Normal program",
          3: "Aperture priority",
          4: "Shutter priority",
          5: "Creative program",
          6: "Action program",
          7: "Portrait mode",
          8: "Landscape mode"
        },
        MeteringMode: {
          0: "Unknown",
          1: "Average",
          2: "CenterWeightedAverage",
          3: "Spot",
          4: "MultiSpot",
          5: "Pattern",
          6: "Partial",
          255: "Other"
        },
        LightSource: {
          0: "Unknown",
          1: "Daylight",
          2: "Fluorescent",
          3: "Tungsten (incandescent light)",
          4: "Flash",
          9: "Fine weather",
          10: "Cloudy weather",
          11: "Shade",
          12: "Daylight fluorescent (D 5700 - 7100K)",
          13: "Day white fluorescent (N 4600 - 5400K)",
          14: "Cool white fluorescent (W 3900 - 4500K)",
          15: "White fluorescent (WW 3200 - 3700K)",
          17: "Standard light A",
          18: "Standard light B",
          19: "Standard light C",
          20: "D55",
          21: "D65",
          22: "D75",
          23: "D50",
          24: "ISO studio tungsten",
          255: "Other"
        },
        Flash: {
          0: "Flash did not fire",
          1: "Flash fired",
          5: "Strobe return light not detected",
          7: "Strobe return light detected",
          9: "Flash fired, compulsory flash mode",
          13: "Flash fired, compulsory flash mode, return light not detected",
          15: "Flash fired, compulsory flash mode, return light detected",
          16: "Flash did not fire, compulsory flash mode",
          24: "Flash did not fire, auto mode",
          25: "Flash fired, auto mode",
          29: "Flash fired, auto mode, return light not detected",
          31: "Flash fired, auto mode, return light detected",
          32: "No flash function",
          65: "Flash fired, red-eye reduction mode",
          69: "Flash fired, red-eye reduction mode, return light not detected",
          71: "Flash fired, red-eye reduction mode, return light detected",
          73: "Flash fired, compulsory flash mode, red-eye reduction mode",
          77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
          79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
          89: "Flash fired, auto mode, red-eye reduction mode",
          93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
          95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
        },
        SensingMethod: {
          1: "Not defined",
          2: "One-chip color area sensor",
          3: "Two-chip color area sensor",
          4: "Three-chip color area sensor",
          5: "Color sequential area sensor",
          7: "Trilinear sensor",
          8: "Color sequential linear sensor"
        },
        SceneCaptureType: {
          0: "Standard",
          1: "Landscape",
          2: "Portrait",
          3: "Night scene"
        },
        SceneType: {
          1: "Directly photographed"
        },
        CustomRendered: {
          0: "Normal process",
          1: "Custom process"
        },
        WhiteBalance: {
          0: "Auto white balance",
          1: "Manual white balance"
        },
        GainControl: {
          0: "None",
          1: "Low gain up",
          2: "High gain up",
          3: "Low gain down",
          4: "High gain down"
        },
        Contrast: {
          0: "Normal",
          1: "Soft",
          2: "Hard"
        },
        Saturation: {
          0: "Normal",
          1: "Low saturation",
          2: "High saturation"
        },
        Sharpness: {
          0: "Normal",
          1: "Soft",
          2: "Hard"
        },
        SubjectDistanceRange: {
          0: "Unknown",
          1: "Macro",
          2: "Close view",
          3: "Distant view"
        },
        FileSource: {
          3: "DSC"
        },
        Components: {
          0: "",
          1: "Y",
          2: "Cb",
          3: "Cr",
          4: "R",
          5: "G",
          6: "B"
        }
      }
      , g = {
        120: "caption",
        110: "credit",
        25: "keywords",
        55: "dateCreated",
        80: "byline",
        85: "bylineTitle",
        122: "captionWriter",
        105: "headline",
        116: "copyright",
        15: "category"
      };
    i.enableXmp = function () {
      i.isXmpEnabled = !0
    }
      ,
      i.disableXmp = function () {
        i.isXmpEnabled = !1
      }
      ,
      i.getData = function (e, t) {
        return (self.Image && e instanceof self.Image || self.HTMLImageElement && e instanceof self.HTMLImageElement) && !e.complete ? !1 : (c(e) ? t && t.call(e) : d(e, t),
          !0)
      }
      ,
      i.getTag = function (e, t) {
        if (!c(e))
          return;
        return e.exifdata[t]
      }
      ,
      i.getIptcTag = function (e, t) {
        if (!c(e))
          return;
        return e.iptcdata[t]
      }
      ,
      i.getAllTags = function (e) {
        if (!c(e))
          return {};
        var t, n = e.exifdata, r = {};
        for (t in n)
          n.hasOwnProperty(t) && (r[t] = n[t]);
        return r
      }
      ,
      i.getAllIptcTags = function (e) {
        if (!c(e))
          return {};
        var t, n = e.iptcdata, r = {};
        for (t in n)
          n.hasOwnProperty(t) && (r[t] = n[t]);
        return r
      }
      ,
      i.pretty = function (e) {
        if (!c(e))
          return "";
        var t, n = e.exifdata, r = "";
        for (t in n)
          n.hasOwnProperty(t) && (typeof n[t] == "object" ? n[t] instanceof Number ? r += t + " : " + n[t] + " [" + n[t].numerator + "/" + n[t].denominator + "]\r\n" : r += t + " : [" + n[t].length + " values]\r\n" : r += t + " : " + n[t] + "\r\n");
        return r
      }
      ,
      i.readFromBinaryFile = function (e) {
        return v(e)
      }
      ,
      n.exports = i
  }),
  define("utils/TextUtils", ["require", "exports", "module", "utils/DebugUtils"], function (e, t, n) {
    "use strict";
    var r = e("utils/DebugUtils")
      , i = {}
      , s = ["left", "right", "center", "justify", "justify"]
      , o = 0
      , u = 1
      , a = 2
      , f = 4
      , l = 8
      , c = 0
      , h = 1
      , p = 2;
    i.parseBlocks2Html = function (e, t) {
      var n = ""
        , o = t.length;
      if (o > 0) {
        t.sort(function (e, t) {
          if (e.loc > t.loc)
            return 1;
          if (e.loc < t.loc)
            return -1
        });
        var c = e || t[0].text
          , d = /\r?\n/g
          , v = null
          , m = 0
          , g = 0
          , y = 0
          , b = 0
          , w = 0;
        do {
          n += "<p";
          var E = null;
          v = d.exec(c),
            g = null !== v ? v.index : c.length;
          for (w; w < o;) {
            if (b >= g)
              break;
            var S = t[w];
            if (S.loc >= g)
              break;
            if (S.loc + S.length <= m) {
              w++;
              continue
            }
            y = Math.max(S.loc, m),
              b = Math.min(S.loc + S.length, g),
              b >= S.loc + S.length && w++;
            if (y === b)
              continue;
            var x = r.valueOrDefault(S.fontSize, 18);
            if (null === E) {
              var T = S.lineSpacing || 0;
              E = " class='text_p' style='",
                E += r.sprintf("margin:%dpx %dpx %dpx %dpx;", S.frontSpacing || 0, S.tailIndent || 0, (S.backSpacing || 0) + T / 2, S.headIndent || 0),
                E += r.sprintf("text-indent: %dpx;", S.paragraphIndent || 0),
                E += r.sprintf("text-align: %s;", s[S.horizontalAlignment || 0]),
                E += r.sprintf("line-height: %dpx;", T + x),
                E += "'",
                n += E + ">"
            }
            var N = "";
            N += r.sprintf("color: %s;", r.rgba2ColorString(r.valueOrDefault(S.fontColor, 255))),
              S.baselineShift && (N += r.sprintf("vertical-align: %fpx;", S.baselineShift)),
              0 !== ((S.fontLineStyle || 0) & (f | l)) && (N += "text-decoration:",
                0 !== ((S.fontLineStyle || 0) & f) && (N += " underline"),
                0 !== ((S.fontLineStyle || 0) & l) && (N += " line-through"),
                N += ";"),
              S.tracking && (N += r.sprintf("letter-spacing: %dpx;", S.tracking || 0)),
              S.backColor && (N += r.sprintf("background-color: %s;", r.rgba2ColorString(S.backColor)));
            var C = 0 !== (S.fontLineStyle || 0) & a ? "italic " : ""
              , k = 0 !== (S.fontLineStyle || 0) & u ? "bold" : "normal"
              , L = S.fontAttibuteName || S.fontName;
            N += "font: " + C + k + " " + x + "px " + L + ";";
            var A = c.slice(y, b)
              , O = S.baselineStyle || 0;
            h === O ? n += "<sup>" : p === O && (n += "<sub>"),
              A = i.htmlEncode(A),
              n += "<span style='" + N + " word-break:normal;'>",
              n += A,
              n += "</span>",
              h === O ? n += "</sup>" : p === O && (n += "</sub>")
          }
          null === E && (n += " style='width:100%; margin:0px %dpx %dpx %dpx;'>"),
            n += "</p>",
            m = g + (null !== v ? v[0].length : 0)
        } while (v !== null); return n
      }
      return n
    }
      ,
      i.parseFirstBlock2Properties = function (e) {
        var t = {}
          , n = e.length;
        if (n > 0) {
          e.sort(function (e, t) {
            if (e.loc > t.loc)
              return 1;
            if (e.loc < t.loc)
              return -1
          });
          var i = e[0]
            , o = r.valueOrDefault(i.fontSize, 18)
            , c = r.valueOrDefault(i.lineSpacing, o);
          t.margin = r.sprintf("%dpx %dpx %dpx %dpx", (i.frontSpacing || 0) - c / 2, i.tailIndent || 0, (i.backSpacing || 0) + c / 2, i.headIndent || 0),
            t["text-indent"] = r.sprintf("%dpx", i.paragraphIndent || 0),
            t["text-align"] = s[i.horizontalAlignment || 0],
            t.color = r.rgba2ColorString(r.valueOrDefault(i.fontColor, 255)),
            i.baselineShift && (t["vertical-align"] = r.sprintf("%fpx", i.baselineShift));
          if (0 !== ((i.fontLineStyle || 0) & (f | l))) {
            var h = "";
            0 !== ((i.fontLineStyle || 0) & f) && (h += " underline"),
              0 !== ((i.fontLineStyle || 0) & l) && (h += " line-through"),
              t["text-decoration"] = h
          }
          i.tracking && (t["letter-spacing"] = r.sprintf("%dpx", i.tracking || 0)),
            i.backColor && (t["background-color"] = r.rgba2ColorString(i.backColor));
          var p = 0 !== (i.fontLineStyle || 0) & a ? "italic " : ""
            , d = 0 !== (i.fontLineStyle || 0) & u ? "bold" : "normal"
            , v = i.fontAttibuteName || i.fontName;
          return t.font = p + d + " " + o + "px " + v,
            t["line-height"] = r.sprintf("%dpx", r.valueOrDefault(i.lineSpacing, o) + o),
            t
        }
        return t
      }
      ,
      i.htmlEncode = function (e) {
        var t = document.createElement("span");
        return t.appendChild(document.createTextNode(e)),
          t.innerHTML
      }
      ,
      i.htmlDecode = function (e) {
        var t = document.createElement("span");
        return t.innerHTML = e,
          t.innerText || t.textContent
      }
      ,
      n.exports = i
  }),
  define("actions/MetPerform", ["require", "exports", "module", "famous/utilities/Timer", "utils/DebugUtils", "utils/Exif", "famous/core/Modifier", "famous/core/Surface", "famous/utilities/Utility", "utils/TextUtils", "actions/MetHook", "utils/TransformUtils", "famous/core/Transform"], function (e, t, n) {
    "use strict";
    function v() {
      this.id_ = "",
        this.performType = 0,
        this.targetPageID = "",
        this.targetID = "",
        this.stringParam = "",
        this.stringParam2 = "",
        this.stringParam3 = "",
        this.longLongParam = 0,
        this.longLongParam2 = 0,
        this.longLongParam3 = 0,
        this.longLongParam4 = 0,
        this.performDelay = 0,
        this.performAt = 0,
        this.floatParam = 0,
        this.floatParam2 = 0,
        this.dragX = 0,
        this.dragY = 0,
        this.sourceID = ""
    }
    function m(e, t) {
      var n = e.archiveScores || [];
      for (var r = 0, i = n.length; r < i; r++) {
        var s = n[r];
        if (s.no === t.no) {
          n.splice(r, 1);
          break
        }
      }
      e.archiveScores || (e.archiveScores = []),
        e.archiveScores.push(t)
    }
    function g(e) {
      var t = e.archiveScores || []
        , n = 0;
      for (var r = 0, i = t.length; r < i; r++) {
        var s = t[r];
        n += s.score
      }
      if (window.GlobalData.mixid) {
        var o = 0;
        for (var r = 0; r < e.nodeDesc.presetDataArray.length - 2; r++)
          o += e.nodeDesc.presetDataArray[r];
        if (c.sharedInstance().project.id_) {
          var u = {};
          u.ProjectId = c.sharedInstance().project.id_,
            u.MixId = window.GlobalData.mixid,
            u.Type = 5,
            u.ElementId = e.nodeDesc.id_,
            u.Score = o,
            u.SendScore = n;
          var a = JSON.stringify({
            element: u
          });
          f.postURL(window.GlobalData.serverBaseUrl + "/api/viewstat/collect", a, 0, function (e) { })
        }
      }
      var l = e.nodeDesc.dataTriggerArray;
      for (var r = 0, i = l.length; r < i; r++) {
        var h = l[r];
        if (n >= h.fromValue && n <= h.toValue) {
          var p = new v;
          p.parseByDic(h.perform),
            p.execute()
        }
      }
    }
    function y(e) {
      e.archiveScores = null
    }
    function b(e, t) {
      var n = e.scores || {}
        , r = "" + t.to_line || 0
        , i = t.add_score || 0;
      n[r] = n[r] || 0,
        n[r] = n[r] + i,
        e.scores = n
    }
    function w(e) {
      var t = e.scores || {}
        , n = [];
      for (var r in t)
        n.push([t[r], r]);
      n.sort(function (e, t) {
        return t[0] - e[0]
      });
      var i = e.nodeDesc.rankTriggerArray;
      for (var s = 0, o = n.length; s < o; s++) {
        var u = parseInt(n[s][1])
          , a = s + 1;
        for (var f = 0, l = i.length; f < l; f++) {
          var c = i[f];
          if (c.line === u && c.rank === a) {
            var h = new v;
            h.parseByDic(c.perform),
              h.execute()
          }
        }
      }
    }
    function E(e) {
      e.scores = {}
    }
    function S(e, t) {
      var n = e.scores || {}
        , r = "" + t.to_line || 0
        , i = t.add_score || 0;
      n[r] = i,
        e.scores = n
    }
    function x(e, t) {
      var n = t.mainSurface._currentTarget
        , r = {
          png: "image/png",
          jpg: "image/jpeg",
          jpeg: "image/jpeg",
          bmp: "image/bmp"
        }
        , i = e.type;
      i || (i = r[e.name.match(/\.([^\.]+)$/i)[1]]);
      if (!/image.(png|jpg|jpeg|bmp)/.test(i))
        return;
      var s = new FileReader;
      s.onload = function () {
        var e = /^data:base64,/
          , n = this.result + "";
        e.test(n) && (n = n.replace(e, "data:" + r[i] + ";base64,")),
          t.nodeDesc.imageFill = t.nodeDesc.imageFill || {},
          t.nodeDesc.imageFill.rawImageURL = n,
          t.requestDeploy4NodeView();
        for (var s = 0, o = t.nodeActions.length; s < o; s++) {
          var u = t.nodeActions[s];
          14 === u.actionType && u.executePerforms(t)
        }
      }
        ,
        s.readAsDataURL(e)
    }
    function T(e, t) {
      var n = [];
      if (e.type === "ShapeNode")
        n.push(e);
      else {
        var r = function (e) {
          var t = e.metNodes || [];
          for (var i = 0, s = t.length; i < s; i++) {
            var o = t[i];
            o.actived && (o.type === "ShapeNode" ? n.push(o) : o.type === "MetTextNode" && n.push(o)),
              r(o)
          }
        };
        r({
          metNodes: [e]
        })
      }
      var i = function (e, t, n, r) {
        var i = t.containerSurface || t.mainSurface
          , s = n.containerSurface || n.mainSurface
          , o = p.transformFromElement(s._currentTarget, i._currentTarget)
          , u = d.interpret(o)
          , a = t.size[0] * t.originX
          , f = t.size[1] * t.originY
          , l = a * (1 - u.scale[0])
          , c = f * (1 - u.scale[1]);
        e.save(),
          e.translate(u.translate[0] - l, u.translate[1] - c),
          e.scale(u.scale[0], u.scale[1]),
          e.rotate(u.rotate[2]),
          r && r(),
          e.restore()
      }
        , u = function (e, t, n, r) {
          i(e, t, n, function () {
            e.fillStyle = r,
              e.fillRect(0, 0, t.size[0], t.size[1])
          })
        }
        , a = function (e, t, n) {
          i(e, t, n, function () {
            var n = t.nodeDesc.text
              , r = t.nodeDesc.blocks || []
              , i = l.parseFirstBlock2Properties(r)
              , s = ["top", "middle", "bottom"];
            t.nodeDesc.textExportType !== 1 && (n = t.mainSurface.getValue() || ""),
              e.font = i.font,
              e.fillStyle = i.color,
              e.textAlign = i["text-align"] || "center",
              e.textBaseline = s[t.nodeDesc.verticalAlignment || 0];
            var o = 0;
            "left" === e.textAlign ? o = 0 : "right" === e.textAlign ? o = t.size[0] : o = t.size[0] / 2;
            var u = 0;
            "top" === e.textBaseline ? u = 0 : "bottom" === e.textBaseline ? u = t.size[1] : u = t.size[1] / 2,
              e.fillText(n, o, u, t.size[0])
          })
        }
        , f = function (e, t, n, r, s) {
          var u = new Image
            , a = function () {
              u.removeEventListener("load", l, !1),
                u.removeEventListener("error", c, !1),
                u = null
            }
            , f = function () {
              u.addEventListener("load", l, !1),
                u.addEventListener("error", c, !1)
            }
            , l = function () {
              o.getData(u, function () {
                var r = o.getTag(this, "Orientation");
                i(e, t, n, function () {
                  var n = t.size[0]
                    , i = t.size[1]
                    , s = u.width
                    , o = u.height
                    , a = 5 === r || 6 === r || 7 === r || 8 === r
                    , f = a ? i : n
                    , l = a ? n : i
                    , c = 0
                    , h = 0;
                  s / o > f / l ? (h = l,
                    c = s * h / o) : (c = f,
                      h = o * c / s);
                  var p = Math.floor(f / 2 - c / 2)
                    , d = Math.ceil(f / 2 + c / 2)
                    , v = Math.floor(l / 2 - h / 2)
                    , m = Math.ceil(l / 2 + h / 2);
                  e.beginPath(),
                    e.rect(0, 0, n, i),
                    e.closePath(),
                    e.clip();
                  switch (r) {
                    case 2:
                      e.translate(f, 0),
                        e.scale(-1, 1);
                      break;
                    case 3:
                      e.translate(f, l),
                        e.rotate(Math.PI);
                      break;
                    case 4:
                      e.translate(0, l),
                        e.scale(1, -1);
                      break;
                    case 5:
                      e.rotate(.5 * Math.PI),
                        e.scale(1, -1);
                      break;
                    case 6:
                      e.rotate(.5 * Math.PI),
                        e.translate(0, -l);
                      break;
                    case 7:
                      e.rotate(.5 * Math.PI),
                        e.translate(f, -l),
                        e.scale(-1, 1);
                      break;
                    case 8:
                      e.rotate(-0.5 * Math.PI),
                        e.translate(-f, 0)
                  }
                  e.drawImage(u, p, v, d - p, m - v)
                }),
                  s && s(),
                  a()
              })
            }
            , c = function () {
              s && s(),
                a()
            };
          f(),
            u.src = r
        }
        , c = function (e) {
          var t = e.nodeDesc.imageFill;
          return t && (t = t.rawImageURL),
            t && t.length > 0 ? (t = s.normalizeUrl(t),
              t) : undefined
        }
        , h = function (e) {
          var t = e.nodeDesc.colorFill;
          return t && (t = t.fillColor),
            t !== null && t !== undefined ? (t = s.rgba2ColorString(t),
              t) : undefined
        }
        , v = function (t) {
          var r = document.createElement("canvas");
          r.width = e.size[0],
            r.height = e.size[1];
          var i = r.getContext("2d");
          if (n.length === 0) {
            t && t(null);
            return
          }
          var s = function (o) {
            if (o < n.length) {
              var l = n[o];
              if (l.type === "ShapeNode") {
                var p = c(l);
                if (p)
                  f(i, l, e, p, s.bind({}, o + 1));
                else {
                  var d = h(l);
                  d && u(i, l, e, d),
                    s(o + 1)
                }
              } else
                l.type === "MetTextNode" ? (a(i, l, e),
                  s(o + 1)) : s(o + 1)
            } else
              t && t(r)
          };
          s(0)
        };
      v(function (n) {
        if (n) {
          var r;
          try {
            r = n.toDataURL()
          } catch (i) {
            alert("An error has occurred: " + i.message);
            return
          }
          if (t) {
            C(r, t);
            return
          }
          if (s.isTouchDevice() && s.isNativeApp()) {
            var o = "_canvas_base64_img_" + e.nodeDesc.id_;
            window[o] = r;
            var u = "native://img_save?script=(function(){var v=window." + o + "; delete window." + o + "; return v;})()";
            location.href = u
          } else if (window.GlobalData.microapp === "kyy")
            window.system && window.system.postMessage(JSON.stringify({
              jym: "save_image",
              base64: "NOT_IMPLEMENTED"
            }));
          else if (s.isTouchDevice()) {
            var a = "SaveAsImageDiv"
              , f = document.getElementById(a);
            f && f.parentNode.removeChild(f),
              f = document.createElement("div"),
              f.id = a,
              f.style.left = "0px",
              f.style.top = "0px",
              f.style.width = "100vw",
              f.style.height = "100vh",
              f.style.position = "absolute",
              f.style.backgroundColor = "black",
              f.style.zIndex = 100;
            var l = document.createElement("img");
            l.src = r,
              l.style.objectFit = "contain",
              l.style.position = "absolute",
              l.style.left = "0",
              l.style.top = "0",
              l.style.width = "100%",
              l.style.height = "100%",
              l.style.backgroundColor = "black",
              l.style.pointerEvents = "auto",
              f.appendChild(l),
              l.onclick = function () {
                l.onclick = null,
                  f.parentNode.removeChild(f),
                  l = null,
                  f = null
              }
              ,
              document.body.appendChild(f)
          } else {
            var c = document.createElement("a")
              , h = (e.name || "image") + ".png";
            c.setAttribute("href", r),
              c.setAttribute("download", h),
              c.click()
          }
        } else
          alert("保存图片失败!!")
      })
    }
    function N(e, t) {
      if (s.isTouchDevice() && s.isNativeApp()) {
        var n = new Image;
        n.crossOrigin = "Anonymous",
          n.onload = function () {
            var e = document.createElement("canvas")
              , n = e.getContext("2d");
            e.height = this.naturalHeight,
              e.width = this.naturalWidth,
              n.drawImage(this, 0, 0);
            var r = e.toDataURL()
              , i = "_canvas_base64_img_" + t.id_;
            window[i] = r;
            var s = "native://img_save?script=(function(){var v=window." + i + "; delete window." + i + "; return v;})()";
            location.href = s
          }
          ,
          n.src = e
      } else if (window.WeixinJSBridge && !window.GlobalData.homePath) {
        var r = "";
        if (window.GlobalData.mixid)
          r = window.location.protocol + "//" + window.location.host + "/items/player/" + window.GlobalData.mixid + "/" + e;
        else {
          var i = window.location.href
            , o = i.lastIndexOf("/");
          o !== -1 && (r = i.substring(0, o) + "/" + e)
        }
        r ? window.WeixinJSBridge.invoke("imagePreview", {
          urls: [r],
          current: r
        }) : alert("Image Url Not Correct")
      } else if (window.GlobalData.microapp === "kyy")
        window.system && window.system.postMessage(JSON.stringify({
          jym: "save_image",
          url: e
        }));
      else if (s.isTouchDevice()) {
        var u = "SaveAsImageDiv"
          , a = document.getElementById(u);
        a && a.parentNode.removeChild(a),
          a = document.createElement("div"),
          a.id = u,
          a.style.left = "0px",
          a.style.top = "0px",
          a.style.width = "100vw",
          a.style.height = "100vh",
          a.style.position = "absolute",
          a.style.backgroundColor = "black",
          a.style.zIndex = 100;
        var f = document.createElement("img");
        f.src = e,
          f.style.objectFit = "contain",
          f.style.position = "absolute",
          f.style.left = "0",
          f.style.top = "0",
          f.style.width = "100%",
          f.style.height = "100%",
          f.style.backgroundColor = "black",
          f.style.pointerEvents = "auto",
          f.style.webkitTouchCallout = "default",
          f.style.webkitUserSelect = "auto",
          f.style.mozUserSelect = "auto",
          a.appendChild(f),
          f.onclick = function () {
            f.onclick = null,
              a.parentNode.removeChild(a),
              f = null,
              a = null
          }
          ,
          document.body.appendChild(a)
      } else {
        var l = document.createElement("a")
          , c = "image.png";
        l.setAttribute("href", e),
          l.setAttribute("download", c),
          l.click()
      }
    }
    function C(e, t) {
      if (!t)
        return;
      t.nodeDesc.fillType = 2,
        t.nodeDesc.needInteraction = !0,
        t.nodeDesc.imageFill = t.nodeDesc.imageFill || {},
        t.nodeDesc.imageFill.rawImageURL = e,
        t.nodeDesc.imageFill.imageRect = "{{0, 0}, {" + t.nodeDesc.sizeX + ", " + t.nodeDesc.sizeY + "}}",
        t.requestDeploy4NodeView();
      for (var n = 0, r = t.nodeActions.length; n < r; n++) {
        var i = nv.nodeActions[n];
        14 === i.actionType && i.executePerforms(nv)
      }
    }
    var r = e("famous/utilities/Timer")
      , i = e(["tools/MetNodeFactory"], function (e) {
        i = e
      })
      , s = e("utils/DebugUtils")
      , o = e("utils/Exif")
      , u = e("famous/core/Modifier")
      , a = e("famous/core/Surface")
      , f = e("famous/utilities/Utility")
      , l = e("utils/TextUtils")
      , c = e(["animations/PageAnim"], function (e) {
        c = e
      })
      , h = e("actions/MetHook")
      , p = e("utils/TransformUtils")
      , d = e("famous/core/Transform");
    v.MetNodeActionPerformNone = 0,
      v.MetNodeActionPerformShowOrHideNode = 1,
      v.MetNodeActionPerformPlayStartOrStop = 2,
      v.MetNodeActionPerformStateRedirect = 3,
      v.MetNodeActionPerformPageRedirect = 4,
      v.MetNodeActionPerformOpenUrl = 5,
      v.MetNodeActionPerformCall = 6,
      v.MetNodeActionPerformEmail = 7,
      v.MetNodeActionPerformSMS = 8,
      v.MetNodeActionPerformCamera = 9,
      v.MetNodeActionPerformDataCollector = 10,
      v.MetNodeActionPerformFocus = 11,
      v.MetNodeActionPerformDataForm = 12,
      v.MetNodeActionPerformDataList = 13,
      v.MetNodeActionPerformSetInputText = 14,
      v.MetNodeActionPerformOpenMix = 15,
      v.MetNodeActionPerformSaveImage = 16,
      v.MetNodeActionPerformWebHistory = 17,
      v.MetNodeActionCopyText = 18,
      v.MetNodeActionPerformDataComparator = 19,
      v.prototype.parseByDic = function (e) {
        this.id_ = e.id_ || "",
          this.performType = e.performType || 0,
          this.targetID = e.targetID || "",
          this.targetPageID = e.targetPageID || "",
          this.stringParam = e.stringParam || "",
          this.stringParam2 = e.stringParam2 || "",
          this.stringParam3 = e.stringParam3 || "",
          this.longLongParam = e.longLongParam || 0,
          this.longLongParam2 = e.longLongParam2 || 0,
          this.longLongParam3 = e.longLongParam3 || 0,
          this.longLongParam4 = e.longLongParam4 || 0,
          this.performDelay = e.performDelay || 0,
          this.performAt = e.performAt || 0,
          this.floatParam = e.floatParam || 0,
          this.floatParam2 = e.floatParam2 || 0,
          this.dragX = e.dragX || 0,
          this.dragY = e.dragY || 0
      }
      ,
      v.prototype.execute = function () {
        var e = i.sharedInstance();
        if (v.MetNodeActionPerformNone === this.performType)
          return;
        if (v.MetNodeActionPerformShowOrHideNode === this.performType) {
          var t = this.longLongParam3
            , n = e.getMetNode(this.targetID);
          !n || r.setTimeout(function () {
            n.isMetNodeShown() ? (0 === t || 2 === t) && n.hideMetNode() : (0 === t || 1 === t) && n.showMetNode()
          }
            .bind(this), this.performDelay * 1e3)
        } else if (v.MetNodeActionPerformPlayStartOrStop === this.performType) {
          var t = this.longLongParam3
            , n = e.getMetNode(this.targetID);
          if (!!n)
            if (n.type === "MetAnimNode") {
              var o = n.curKeyframeAnim;
              r.setTimeout(function () {
                if (!!o.actor)
                  if (o.isPlaying())
                    (0 === t || 2 === t) && o.stopAnim();
                  else if (0 === t || 1 === t) {
                    var e = o.keyFrames
                      , r = this.longLongParam
                      , i = this.longLongParam2
                      , s = this.longLongParam4 === undefined ? 1 : this.longLongParam4
                      , u = 0;
                    r < e.length ? u = (o.keyFrames[r].time - o.initTime) * 1e3 : r === e.length ? u = o.curAnimTime : (r = Math.round(Math.random() * (e.length - 1)),
                      u = (o.keyFrames[r].time - o.initTime) * 1e3);
                    var a = 0;
                    i < e.length ? a = (o.keyFrames[i].time - o.initTime) * 1e3 : i === e.length ? a = o.curAnimTime : (i = Math.round(Math.random() * (e.length - 1)),
                      a = (o.keyFrames[i].time - o.initTime) * 1e3);
                    if (0 === t) {
                      var f = Math.min(u, a)
                        , l = Math.max(u, a);
                      u = Math.max(f, Math.min(l, o.curAnimTime)),
                        u === a && (u = f + l - a)
                    }
                    h.flagActiveNodeID(n.metNodeId),
                      o.rangePlay(u, a, s)
                  }
              }
                .bind(this), this.performDelay * 1e3)
            } else if (n.type === "MetStateNode") {
              var u = n.curStateAnim;
              r.setTimeout(function () {
                if (!!u.actor)
                  if (u.isPlaying())
                    (0 === t || 2 === t) && u.stopPlay();
                  else if (0 === t || 1 === t) {
                    var e = n.metNodes
                      , r = this.longLongParam
                      , i = this.longLongParam2
                      , s = this.longLongParam4 || 0;
                    r === e.length ? r = u.curStateIdx : r > e.length && (r = Math.round(Math.random() * (e.length - 1))),
                      i === e.length ? i = u.curStateIdx : i > e.length && (i = Math.round(Math.random() * (e.length - 1)));
                    if (0 === t) {
                      var o = Math.min(r, i)
                        , a = Math.max(r, i);
                      r = Math.max(o, Math.min(a, u.curStateIdx)),
                        r === i && (r = o + a - i)
                    }
                    h.flagActiveNodeID(n.metNodeId),
                      u.rangePlay(r, i, s)
                  }
              }
                .bind(this), this.performDelay * 1e3)
            } else if (n.type === "VideoNode") {
              var a = function () {
                var e = this.floatParam
                  , r = this.floatParam2;
                if (!n.isMediaPlaying())
                  if (1 === t) {
                    var i = this.longLongParam4 === undefined ? 1 : this.longLongParam4;
                    n.mainSurface.setOptions({
                      repeatCount: Math.max(0, i),
                      from: e,
                      to: r
                    }),
                      n.startMediaPlay(),
                      h.flagActiveNodeID(n.metNodeId);
                    if (window.GlobalData.mixid) {
                      var s = n.nodeDesc.videoURL;
                      if (s) {
                        var o = {};
                        o.ProjectId = c.sharedInstance().project.id_,
                          o.MixId = window.GlobalData.mixid,
                          o.Type = 2,
                          o.ElementId = s;
                        var u = JSON.stringify({
                          element: o
                        });
                        f.postURL(window.GlobalData.serverBaseUrl + "/api/viewstat/collect", u, 0, function (e) { })
                      }
                    }
                  } else
                    2 === t && n.mainSurface.rewind();
                else
                  (0 === t || 2 === t) && n.stopMediaPlay(),
                    2 === t && n.mainSurface.rewind()
              };
              this.performDelay > 0 ? r.setTimeout(a.bind(this), this.performDelay * 1e3) : a.bind(this)()
            } else if (n.type === "AudioNode") {
              var a = function () {
                var e = this.floatParam
                  , r = this.floatParam2;
                if (!n.isMediaPlaying())
                  if (1 === t) {
                    var i = this.longLongParam4 === undefined ? 1 : this.longLongParam4;
                    n.mainSurface.setOptions({
                      repeatCount: Math.max(0, i),
                      from: e,
                      to: r
                    }),
                      n.startMediaPlay(),
                      h.flagActiveNodeID(n.metNodeId)
                  } else
                    2 === t && n.mainSurface.rewind();
                else
                  (0 === t || 2 === t) && n.stopMediaPlay(),
                    2 === t && n.mainSurface.rewind()
              };
              this.performDelay > 0 ? r.setTimeout(a.bind(this), this.performDelay * 1e3) : a.bind(this)()
            }
        } else if (v.MetNodeActionPerformStateRedirect === this.performType) {
          var n = e.getMetNode(this.targetID);
          if (!!n)
            if (n.type === "MetStateNode" || n.type === "ButtonNode") {
              var u = n.curStateAnim
                , l = u.curStateIdx
                , p = n.metNodes
                , d = this.longLongParam
                , k = n.nodeDesc.endToEnd || !1
                , L = 0
                , A = n.type === "ButtonNode";
              d === p.length ? (k || l <= 0 && (d = -1),
                d !== -1 && (d = (l + p.length - 1) % p.length),
                L = -1) : d === p.length + 1 ? (k || l >= p.length - 1 && (d = -1),
                  d !== -1 && (d = (l + 1) % p.length),
                  L = 1) : d > p.length + 1 && (d = Math.round(Math.random() * (p.length - 1))),
                d >= 0 && d < p.length && r.setTimeout(function () {
                  h.flagActiveNodeID(n.metNodeId),
                    u.showState(d, !A, L)
                }, this.performDelay * 1e3)
            }
        } else if (v.MetNodeActionPerformPageRedirect === this.performType) {
          var O = this.targetPageID
            , M = this.longLongParam === 0;
          r.setTimeout(function () {
            var e = c.sharedInstance();
            e.changePage(O, M)
          }, this.performDelay * 1e3)
        } else if (v.MetNodeActionPerformOpenUrl === this.performType) {
          var _ = this.stringParam || null;
          if (window.____UrlHandler && window.____UrlHandler(_, this.longLongParam))
            return;
          if (window.GlobalData.mixid && _ && c.sharedInstance().project.id_) {
            var D = {};
            D.ProjectId = c.sharedInstance().project.id_,
              D.MixId = window.GlobalData.mixid,
              D.Type = 4,
              D.ElementId = _;
            var P = JSON.stringify({
              element: D
            });
            f.postURL(window.GlobalData.serverBaseUrl + "/api/viewstat/collect", P, 0, function (e) { })
          }
          if (_ !== null && _.length > 0)
            if (this.longLongParam === 0)
              r.setTimeout(function () {
                location.href = _
              }, 1e3);
            else if (this.longLongParam === 2)
              f.loadURL(_, 0, function (e) { });
            else if (s.isTouchDevice() && s.isNativeApp())
              if (3 === this.longLongParam) {
                var H = "native://open_url_browser?url=" + encodeURIComponent(_);
                location.href = H
              } else {
                var H = "native://open_url_outer?url=" + encodeURIComponent(_);
                location.href = H
              }
            else
              window.GlobalData.isMicroApp ? window.GlobalData.microapp === "tt" ? tt.miniProgram.navigateTo({
                url: "/pages/webview/webview?url=" + encodeURIComponent(_)
              }) : window.GlobalData.microapp === "wx" ? wx.miniProgram.navigateTo({
                url: "/pages/webview/webview?url=" + encodeURIComponent(_)
              }) : window.GlobalData.microapp === "kyy" && window.system && window.system.postMessage(JSON.stringify({
                jym: "open_url",
                url: _
              })) : window.open(_, "_blank", "")
        } else if (v.MetNodeActionPerformCall === this.performType)
          if (s.isTouchDevice()) {
            var B = this.stringParam;
            location.href = "tel:" + B
          } else
            alert("请使用手机访问");
        else if (v.MetNodeActionPerformEmail === this.performType) {
          if (s.isTouchDevice() && s.isWeiXin()) {
            alert("请使用浏览器访问");
            return
          }
          var j = this.stringParam;
          location.href = "MailTo:" + j
        } else if (v.MetNodeActionPerformSMS === this.performType)
          if (s.isTouchDevice()) {
            var B = this.stringParam;
            location.href = "sms:" + B
          } else
            alert("请使用手机访问");
        else if (v.MetNodeActionPerformCamera === this.performType) {
          var n = e.getMetNode(this.targetID);
          if (!!n && n.type === "ShapeNode") {
            var F = window.document.getElementById("camera");
            F && window._camera_callback && (F.removeEventListener("change", window._camera_callback),
              delete window._camera_callback),
              F || (F = window.document.createElement("input"),
                F.id = "camera",
                F.type = "file",
                F.accept = "image/*",
                F.style.display = "none",
                window.document.body.appendChild(F));
            if (F) {
              F.addEventListener("change", window._camera_callback = function (e) {
                var t = e.target.files[0];
                x(t, n)
              }
                , !1),
                F.click();
              if (window.GlobalData.mixid && c.sharedInstance().project.id_) {
                var D = {};
                D.ProjectId = c.sharedInstance().project.id_,
                  D.MixId = window.GlobalData.mixid,
                  D.Type = 7;
                var P = JSON.stringify({
                  element: D
                });
                f.postURL(window.GlobalData.serverBaseUrl + "/api/viewstat/collect", P, 0, function (e) { })
              }
            }
          }
        } else if (v.MetNodeActionPerformDataCollector === this.performType) {
          var n = e.getMetNode(this.targetID);
          if (!!n && n.type === "MetDataCollectorNode") {
            var I = {};
            I.score = n.nodeDesc.presetDataArray[this.longLongParam] || 0,
              I.no = this.longLongParam2;
            if (I.score === -9999)
              y(n);
            else if (I.score === 9999)
              g(n);
            else if (I.score === 9998) {
              var q = s.getCurrentUrlParam("_sales_");
              q !== undefined && q !== null ? (I.score = parseInt(q || 0),
                m(n, I)) : alert("$(sales) not found!!")
            } else
              m(n, I)
          }
        } else if (v.MetNodeActionPerformFocus === this.performType) {
          var n = e.getMetNode(this.targetID);
          if (!!n && n.type === "MetTextNode") {
            var R = n.mainSurface
              , U = this.longLongParam;
            U === 0 ? R.focus() : R.blur()
          }
        } else if (v.MetNodeActionPerformSetInputText === this.performType) {
          var n = e.getMetNode(this.targetID);
          if (!!n && n.type === "MetTextNode") {
            var R = n.mainSurface
              , z = this.stringParam;
            R.setValue(z)
          }
        } else if (v.MetNodeActionPerformOpenMix === this.performType) {
          var W = encodeURI(this.stringParam || "");
          window.location.href = "fork://mix?id=" + W
        } else if (v.MetNodeActionPerformDataForm === this.performType) {
          var n = e.getMetNode(this.targetID);
          if (!!n && n.type === "MetDataFormNode") {
            var X = n.dataSourceID
              , U = this.longLongParam
              , V = function (e) {
                var t = []
                  , n = e instanceof Array ? e : e.metNodes
                  , r = null;
                while (n && n.length > 0) {
                  r = [];
                  for (var i = 0, s = n.length; i < s; i++) {
                    var o = n[i];
                    o.dataSourceID && o.dataSourceID === X && o.dataFieldID && t.push(o);
                    var u = o.metNodes;
                    for (var a = 0, f = u.length; a < f; a++)
                      r.push(u[a])
                  }
                  n = r,
                    r = null
                }
                return t
              }
              , $ = V(n);
            if (U === 0) {
              var J = {};
              for (var K = 0, Q = $.length; K < Q; K++) {
                var G = $[K];
                G.dataSourceID === X && (J["cellz" + G.dataFieldID] = G.mainSurface.getValue())
              }
              var P = JSON.stringify({
                formid: X,
                json: JSON.stringify(J)
              });
              f.postURL(window.GlobalData.serverBaseUrl + "/api/data/form/add", P, 0, function (e) {
                if (!e || e.length <= 0)
                  return;
                if (n.nodeActions.length < 2)
                  return;
                var t = JSON.parse(e);
                if (!t.isSuc) {
                  var r = n.nodeActions[1];
                  r.executePerforms(n)
                } else {
                  var i = n.nodeActions[0];
                  i.executePerforms(n)
                }
              })
            } else
              for (var K = 0, Q = $.length; K < Q; K++) {
                var G = $[K];
                G.dataSourceID === X && G.mainSurface.setValue("")
              }
          }
        } else if (v.MetNodeActionPerformDataList === this.performType) {
          var Y = e.getMetNode(this.sourceID);
          if (!!Y) {
            var Z = Y.nodeDesc.listTargetUrl;
            if (Z && Z.length > 0) {
              var et = window.open("_blank");
              et && (et.location = Z)
            }
          }
        } else if (v.MetNodeActionPerformSaveImage === this.performType) {
          var nt = e.getMetNode(this.stringParam3);
          if ("_custom_img_" === this.targetID) {
            if (this.stringParam) {
              var _ = s.normalizeUrl(this.stringParam);
              nt ? C(_, nt) : N(_, this)
            }
          } else {
            var n = e.getMetNode(this.targetID);
            !n || (n.type === "ShapeNode" || n.metNodes.length > 0) && T(n, nt)
          }
        } else if (v.MetNodeActionPerformWebHistory === this.performType) {
          var n = e.getMetNode(this.targetID);
          if (!!n && n.type === "WebNode") {
            var rt = n.mainSurface._currentTarget;
            if (rt) {
              var L = this.longLongParam
                , it = rt.childNodes;
              for (var K = 0, st = it.length; K < st; K++) {
                var ot = it[K];
                if (ot.tagName.toUpperCase() === "IFRAME")
                  try {
                    L === 0 ? (ot.contentWindow.history.back(),
                      window.event.stopPropagation()) : L === 1 && (ot.contentWindow.history.forward(),
                        window.event.stopPropagation())
                  } catch (ut) {
                    alert(ut)
                  }
              }
            }
          }
        } else if (v.MetNodeActionCopyText === this.performType) {
          var n = e.getMetNode(this.targetID);
          if (!!n && n.type === "MetTextNode" && n.mainSurface) {
            var rt = n.mainSurface._currentTarget;
            if (rt) {
              var nt = e.getMetNode(this.stringParam3);
              if (nt) {
                var at = n.nodeDesc.text;
                n.nodeDesc.textExportType !== 1 && (at = n.mainSurface.getValue() || ""),
                  at && (nt.nodeDesc.textExportType !== 1 ? nt.mainSurface.setValue(at) : e.setupLabelHtml4Node(nt, at))
              } else if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
                var at = n.nodeDesc.text;
                n.nodeDesc.textExportType !== 1 && (at = n.mainSurface.getValue() || ""),
                  at && navigator.clipboard.writeText(at)
              } else {
                var ft = rt.style.webkitUserSelect;
                rt.style.webkitUserSelect = "all";
                var lt = document.createRange();
                lt.selectNode(rt);
                var ct = window.getSelection();
                ct.rangeCount > 0 && ct.removeAllRanges(),
                  ct.addRange(lt),
                  document.execCommand("copy"),
                  rt.style.webkitUserSelect = ft
              }
            }
          }
        } else if (v.MetNodeActionPerformDataComparator === this.performType) {
          var n = e.getMetNode(this.targetID);
          if (!!n && n.type === "MetDataComparatorNode") {
            var ht = this.longLongParam
              , I = {};
            I.add_score = this.longLongParam3 || 0,
              I.to_line = this.longLongParam2 || 0;
            if (ht === 0)
              b(n, I);
            else if (ht === 1) {
              var q = s.getCurrentUrlParam("_sales_");
              q !== undefined && q !== null ? (I.score = parseInt(q || 0),
                b(n, I)) : alert("$(sales) not found!!")
            } else if (ht === 2)
              w(n);
            else if (ht === 3)
              E(n);
            else if (ht === 4)
              S(n, I);
            else if (ht === 5) {
              var q = s.getCurrentUrlParam("_sales_");
              q !== undefined && q !== null ? (I.score = parseInt(q || 0),
                S(n, I)) : alert("$(sales) not found!!")
            }
          }
        } else
          s.log("wrong perform!! LOL!!!")
      }
      ,
      n.exports = v
  }),
  define("actions/MetNodeAction", ["require", "exports", "module", "famous/transitions/Easing", "famous/transitions/TweenTransition", "famous/utilities/Timer", "utils/DebugUtils", "actions/MetHook", "actions/MetPerform"], function (e, t, n) {
    "use strict";
    function f() {
      this.id_ = "",
        this.actionType = 0,
        this.f1 = 0,
        this.f2 = 0,
        this.f3 = 0,
        this.f4 = 0,
        this.f5 = 0,
        this.i1 = 0,
        this.i2 = 0,
        this.hooks = [],
        this.performs = [],
        this.extraPerforms = []
    }
    var r = e("famous/transitions/Easing")
      , i = e("famous/transitions/TweenTransition")
      , s = e("famous/utilities/Timer")
      , o = e("utils/DebugUtils")
      , u = e("actions/MetHook")
      , a = e("actions/MetPerform");
    f.MetNodeActionTypeAuto = 0,
      f.MetNodeActionTypeTap = 1,
      f.MetNodeActionTypeDoubleTap = 2,
      f.MetNodeActionTypeLongTap = 3,
      f.MetNodeActionTypeZoom = 4,
      f.MetNodeActionTypeDrag = 5,
      f.MetNodeActionTypeScroll = 6,
      f.MetNodeActionTypeSlide = 7,
      f.MetNodeActionTypeErase = 8,
      f.MetNodeActionTypeGravity = 9,
      f.MetNodeActionTypeRotate = 10,
      f.MetNodeActionTypeTwist = 11,
      f.MetNodeActionHooked = 12,
      f.MetNodeActionNop = 13,
      f.MetNodeActionImageChanged = 14,
      f.MetNodeActionTypeGyro = 15,
      f.MetNodeActionTypeMaskClip = 16,
      f.prototype.parseByDic = function (e) {
        this.id_ = e.id_ || "",
          this.actionType = e.actionType || 0,
          this.f1 = e.f1 || 0,
          this.f2 = e.f2 || 0,
          this.f3 = e.f3 || 0,
          this.f4 = e.f4 || 0,
          this.f5 = e.f5 || 0,
          this.i1 = e.i1 || 0,
          this.i2 = e.i2 || 0,
          this.hooks = [];
        var t = e.hooks || [];
        for (var n = 0, r = t.length; n < r; n++) {
          var i = t[n]
            , s = new u;
          s.parseByDic(i),
            this.hooks.push(s)
        }
        this.performs = [],
          t = e.performs || [];
        for (var n = 0, r = t.length; n < r; n++) {
          var i = t[n]
            , o = new a;
          o.parseByDic(i),
            o.sourceID = e.sourceID,
            this.performs.push(o)
        }
        this.extraPerforms = [],
          t = e.extraPerforms || [];
        for (var n = 0, r = t.length; n < r; n++) {
          var i = t[n]
            , o = new a;
          o.parseByDic(i),
            o.sourceID = e.sourceID,
            this.extraPerforms.push(o)
        }
      }
      ,
      f.parseActionsFromArray = function (e) {
        var t = [];
        for (var n = 0, r = e.length; n < r; n++) {
          var i = e[n]
            , s = new f;
          s.parseByDic(i),
            t.push(s)
        }
        return t
      }
      ,
      f.hasEraseOneInActions = function (e) {
        for (var t = 0, n = e.length; t < n; t++) {
          var r = e[t];
          if (f.MetNodeActionTypeErase === r.actionType)
            return !0
        }
        return !1
      }
      ,
      f.hasSlideOneInActions = function (e) {
        for (var t = 0, n = e.length; t < n; t++) {
          var r = e[t];
          if (f.MetNodeActionTypeSlide === r.actionType)
            return !0
        }
        return !1
      }
      ,
      f.hasScrollOneInActions = function (e) {
        for (var t = 0, n = e.length; t < n; t++) {
          var r = e[t];
          if (f.MetNodeActionTypeScroll === r.actionType)
            return !0
        }
        return !1
      }
      ,
      f.hasTapOneInActions = function (e) {
        for (var t = 0, n = e.length; t < n; t++) {
          var r = e[t];
          if (f.MetNodeActionTypeTap === r.actionType)
            return !0
        }
        return !1
      }
      ,
      f.hasTouchActions = function (e) {
        for (var t = 0, n = e.length; t < n; t++) {
          var r = e[t];
          if (f.MetNodeActionTypeAuto !== r.actionType && f.MetNodeActionTypeGravity !== r.actionType && f.MetNodeActionHooked !== r.actionType && f.MetNodeActionNop !== r.actionType && f.MetNodeActionImageChanged !== r.actionType && f.MetNodeActionTypeGyro !== r.actionType && f.MetNodeActionTypeMaskClip != r.actionType)
            return !0
        }
        return !1
      }
      ,
      f.hasActions4Gesture = function (e, t) {
        var n = [];
        t === "drag" ? (n.push(f.MetNodeActionTypeZoom),
          n.push(f.MetNodeActionTypeDrag),
          n.push(f.MetNodeActionTypeScroll),
          n.push(f.MetNodeActionTypeSlide),
          n.push(f.MetNodeActionTypeErase),
          n.push(f.MetNodeActionTypeRotate),
          n.push(f.MetNodeActionTypeTwist)) : t === "click" ? n.push(f.MetNodeActionTypeTap) : t === "longTap" ? n.push(f.MetNodeActionTypeLongTap) : t === "over" && n.push(f.MetNodeActionTypeDoubleTap);
        for (var r = 0, i = e.length; r < i; r++) {
          var s = e[r];
          if (-1 !== n.indexOf(s.actionType))
            return !0
        }
        return !1
      }
      ,
      f.findInActionsByActionType = function (e, t) {
        for (var n = 0, r = e.length; n < r; n++) {
          var i = e[n];
          if (t === i.actionType)
            return i
        }
        return null
      }
      ,
      f.prototype.executePerforms = function (e) {
        if (f.MetNodeActionImageChanged !== this.actionType)
          if (!e || !e.initialized || !e.actived)
            return;
        var t = this.performs;
        for (var n = 0, r = t.length; n < r; n++) {
          var i = t[n];
          i.execute()
        }
      }
      ,
      f.prototype.executeExtraPerforms = function (e) {
        if (f.MetNodeActionImageChanged !== this.actionType)
          if (!e || !e.initialized || !e.actived)
            return;
        var t = this.extraPerforms;
        for (var n = 0, r = t.length; n < r; n++) {
          var i = t[n];
          i.execute()
        }
      }
      ,
      f.prototype.executePerformsRange = function (e, t, n) {
        if (f.MetNodeActionImageChanged !== this.actionType)
          if (!e || !e.initialized || !e.actived)
            return;
        t >= n && (t = n - t,
          n -= t,
          t = n + t);
        var r = this.performs;
        for (var i = 0, s = r.length; i < s; i++) {
          var o = r[i]
            , u = o.performAt || 0;
          u >= t && u <= n && o.execute()
        }
      }
      ,
      f.prototype.registerHooks = function () {
        var e = this.hooks;
        for (var t = 0, n = e.length; t < n; t++) {
          var r = e[t];
          u.registerHook(r, this.actionType)
        }
      }
      ,
      f.parseFootprintsFromArray = function (e) {
        var t = [];
        for (var n = 0, r = e.length; n < r; n++) {
          var i = e[n]
            , s = {
              f: i.f,
              performs: [],
              hooks: []
            }
            , o = i.performs || [];
          for (var f = 0, l = o.length; f < l; f++) {
            var c = new a;
            c.parseByDic(o[f]),
              s.performs.push(c)
          }
          var h = i.hooks || [];
          for (var f = 0, l = h.length; f < l; f++) {
            var p = new u;
            p.parseByDic(h[f]),
              s.hooks.push(p)
          }
          t.push(s)
        }
        return t
      }
      ,
      f.parseKeyframesFromArray = function (e) {
        var t = [];
        for (var n = 0, r = e.length; n < r; n++) {
          var i = e[n]
            , s = {
              i: n,
              performs: [],
              hooks: []
            }
            , o = i.performs || [];
          for (var f = 0, l = o.length; f < l; f++) {
            var c = new a;
            c.parseByDic(o[f]),
              s.performs.push(c)
          }
          var h = i.hooks || [];
          for (var f = 0, l = h.length; f < l; f++) {
            var p = new u;
            p.parseByDic(h[f]),
              s.hooks.push(p)
          }
          t.push(s)
        }
        return t
      }
      ,
      f.parseStatesFromArray = function (e) {
        var t = [];
        for (var n = 0, r = e.length; n < r; n++)
          t.unshift(e[n]);
        var i = [];
        for (var n = 0, r = t.length; n < r; n++) {
          var s = t[n]
            , o = {
              i: n,
              performs: [],
              hooks: []
            }
            , f = s.performs || [];
          for (var l = 0, c = f.length; l < c; l++) {
            var h = new a;
            h.parseByDic(f[l]),
              h.sourceID = t[n].id_,
              o.performs.push(h)
          }
          var p = s.hooks || [];
          for (var l = 0, c = p.length; l < c; l++) {
            var d = new u;
            d.parseByDic(p[l]),
              o.hooks.push(d)
          }
          i.push(o)
        }
        return i
      }
      ,
      n.exports = f
  }),
  define("utils/ShapeNodeUtils", ["require", "exports", "module", "utils/DebugUtils"], function (e, t, n) {
    "use strict";
    function s(e, t) {
      var n = "";
      for (var i = 0, s = e.length; i < s; i++) {
        var o = e[i];
        o === "X" && (n += "Z ");
        var u = o.split(" ")
          , a = u[0];
        a === "M" && (n += r.sprintf("M%d %d ", Math.round(u[1]), Math.round(u[2]))),
          a === "L" && (n += r.sprintf("L%d %d ", Math.round(u[1]), Math.round(u[2]))),
          a === "C" && (n += r.sprintf("C%d %d %d %d %d %d ", Math.round(u[1]), Math.round(u[2]), Math.round(u[3]), Math.round(u[4]), Math.round(u[5]), Math.round(u[6])))
      }
      return n === e && (n = r.sprintf("M0 0 L0 %d L%d %d L%d 0 Z", t[1], t[0], t[1], t[0])),
        n
    }
    var r = e("utils/DebugUtils")
      , i = {};
    i.svgHtmlBy = function (e, t, n, o, u, a) {
      var f = r.sprintf("<svg focusable='false' width='%d' height='%d' style='overflow: visible; position:absolute; pointer-events: none;'>", a[0], a[1])
        , l = "svgX_" + e
        , c = s(t, a)
        , h = 0
        , p = "none"
        , d = 0
        , v = "none"
        , m = "none"
        , g = "none"
        , y = "none";
      f += "<defs>",
        f += r.sprintf("<clipPath id='svgC1_%s'><use xlink:href='#%s'/></clipPath>", e, l),
        g = r.sprintf("url(#svgC1_%s)", e),
        null !== n && (0 === n[3] || 1 === n[3] ? d = n[0] * 2 : d = n[0],
          h = d / 2 + 50,
          p = r.rgba2ColorString(n[1]),
          0 === n[3] ? y = r.sprintf("url(#svgC1_%s)", e) : 1 === n[3] && (f += r.sprintf("<clipPath id='svgC2_%s'>", e),
            f += r.sprintf("<path d='M%d %d L%d %d L%d %d L%d %d Z %s' clip-rule='evenodd'/>", -h, -h, -h, h + a[1], h + a[0], h + a[1], h + a[0], -h, c),
            f += "</clipPath>",
            y = r.sprintf("url(#svgC2_%s)", e)));
      if (2 !== o.type)
        if (1 === o.type) {
          var b = o.gradient
            , w = i.numsFromNumString(b.startPoint)
            , E = i.numsFromNumString(b.endPoint)
            , S = [];
          for (var x = 0; x < b.gradientPoints.length; x++) {
            var T = b.gradientPoints[x];
            S.push(T)
          }
          S.sort(function (e, t) {
            if (e.location > t.location)
              return 1;
            if (e.location < t.location)
              return -1
          });
          var N = b.gradientType || 0;
          N === 0 ? f += r.sprintf("<linearGradient id='svgG_%s' x1='%d%%' y1='%d%%' x2='%d%%' y2='%d%%'>", e, w[0] * 100 / a[0], w[1] * 100 / a[1], E[0] * 100 / a[0], E[1] * 100 / a[1]) : f += r.sprintf("<radialGradient id='svgG_%s' cx='%d%%' cy='%d%%' r='50%%' fx='%d%%' fy='%d%%'>", e, w[0] * 100 / a[0], w[1] * 100 / a[1], E[0] * 100 / a[0], E[1] * 100 / a[1]);
          for (var x = 0; x < S.length; x++) {
            var T = S[x]
              , C = r.rgba2ColorArray(T.color);
            f += r.sprintf("<stop offset='%d%%' style='stop-color:rgb(%d,%d,%d);stop-opacity:%f'/>", T.location * 100, C[0], C[1], C[2], C[3] / 255)
          }
          N === 0 ? f += "</linearGradient>" : f += "</radialGradient>",
            v = r.sprintf("url(#svgG_%s)", e)
        } else
          0 === o.type && (v = r.rgba2ColorString(o.color));
      if (null !== u) {
        var C = r.rgba2ColorArray(u[3], !0);
        f += r.sprintf("<filter id='svgF_%s' filterUnits='userSpaceOnUse' x='%d' y='%d' width='%d' height='%d'>", e, Math.min(0, u[0]) - h - u[2], Math.min(0, u[1]) - h - u[2], a[0] + Math.abs(u[0]) + h * 2 + u[2] * 2, a[1] + Math.abs(u[1]) + h * 2 + u[2] * 2),
          f += r.sprintf("<feOffset result='offOut' in='SourceAlpha' dx='%d' dy='%d'/>", u[0], u[1]),
          f += r.sprintf("<feColorMatrix result='matrixOut' in='offOut' type='matrix' values='1 0 0 0 %f 0 1 0 0 %f 0 0 1 0 %f 0 0 0 %f 0'/>", C[0], C[1], C[2], C[4]),
          f += r.sprintf("<feGaussianBlur result='blurOut' in='matrixOut' stdDeviation='%d'/>", u[2]),
          f += "<feBlend in='SourceGraphic' in2='blurOut' mode='normal'/>",
          f += "</filter>",
          m = r.sprintf("url(#svgF_%s)", e)
      }
      f += "</defs>",
        f += r.sprintf("<g filter='%s'>", m);
      if (2 === o.type) {
        var k = o.area;
        f += r.sprintf("<g clip-path='%s'>", g);
        var L = "";
        if (o.flipX || o.flipY)
          L = r.sprintf(" transform='translate(%d, %d) scale(%d, %d)'", o.flipX ? k[0] * 2 + k[2] : 0, o.flipY ? k[1] * 2 + k[3] : 0, o.flipX ? -1 : 1, o.flipY ? -1 : 1);
        f += r.sprintf("<image preserveAspectRatio='none' x='%d' y='%d' width='%d' height='%d' xlink:href='%s'%s/>", k[0], k[1], k[2], k[3], o.url, L),
          f += "</g>"
      } else
        f += r.sprintf("<path d='%s' stroke='none' stroke-width='0' fill='%s' fill-rule='evenodd'/>", c, v);
      var A = "";
      return null !== n && n[2] === 1 && (A = r.sprintf(" stroke-dasharray='%d %d'", Math.max(3, n[0] + 1), n[0] + 1)),
        f += r.sprintf("<path id='%s' d='%s' stroke='%s' stroke-width='%d'%s fill='none' clip-path='%s'/>", l, c, p, d, A, y),
        f += "</g>",
        f += "</svg>",
        f
    }
      ,
      i.numsFromNumString = function (e) {
        if (!e)
          return null;
        var t = e;
        t = t.replace(/[\{\}]/g, ""),
          t = t.split(",");
        if (t instanceof Array) {
          for (var n = 0; n < t.length; n++)
            t[n] = parseFloat(t[n]);
          return t
        }
        return null
      }
      ,
      n.exports = i
  }),
  define("famous/surfaces/CanvasSurface", ["require", "exports", "module", "../core/Surface"], function (e, t, n) {
    function i(e) {
      e && e.canvasSize && (this._canvasSize = e.canvasSize),
        r.apply(this, arguments),
        this._canvasSize || (this._canvasSize = this.getSize()),
        this._backBuffer = document.createElement("canvas"),
        this._canvasSize && (this._backBuffer.width = this._canvasSize[0],
          this._backBuffer.height = this._canvasSize[1]),
        this._contextId = undefined
    }
    var r = e("../core/Surface");
    i.prototype = Object.create(r.prototype),
      i.prototype.constructor = i,
      i.prototype.elementType = "canvas",
      i.prototype.elementClass = "famous-surface",
      i.prototype.setContent = function () { }
      ,
      i.prototype.deploy = function (t) {
        this._canvasSize && (t.width = this._canvasSize[0],
          t.height = this._canvasSize[1]),
          this._contextId === "2d" && (t.getContext(this._contextId).drawImage(this._backBuffer, 0, 0),
            this._backBuffer.width = 0,
            this._backBuffer.height = 0)
      }
      ,
      i.prototype.recall = function (t) {
        var n = this.getSize();
        this._backBuffer.width = t.width,
          this._backBuffer.height = t.height,
          this._contextId === "2d" && (this._backBuffer.getContext(this._contextId).drawImage(t, 0, 0),
            t.width = 0,
            t.height = 0)
      }
      ,
      i.prototype.getContext = function (t) {
        return this._contextId = t,
          this._currentTarget ? this._currentTarget.getContext(t) : this._backBuffer.getContext(t)
      }
      ,
      i.prototype.setSize = function (t, n) {
        r.prototype.setSize.apply(this, arguments),
          n && (this._canvasSize = [n[0], n[1]]),
          this._currentTarget && (this._currentTarget.width = this._canvasSize[0],
            this._currentTarget.height = this._canvasSize[1])
      }
      ,
      n.exports = i
  }),
  define("views/MetNodeView", ["require", "exports", "module", "famous/core/RenderNode", "famous/core/View", "famous/core/Surface", "famous/core/Modifier", "famous/modifiers/StateModifier", "famous/surfaces/ContainerSurface", "famous/core/Transform", "famous/modifiers/ModifierChain", "famous/transitions/TweenTransition", "famous/utilities/Timer", "famous/utilities/Utility", "famous/views/RenderController", "utils/MotionPath", "animations/KeyFrameAnim", "animations/Css3Anim", "animations/StateAnim", "animations/FilmStateAnim", "animations/ScrollStateAnim", "utils/DebugUtils", "views/Scrollview", "actions/MetHook", "actions/MetPerform", "actions/MetNodeAction", "utils/TransitionUtils", "utils/ShapeNodeUtils", "famous/surfaces/CanvasSurface", "utils/TransformUtils"], function (e, t, n) {
    "use strict";
    function M() {
      i.apply(this, arguments),
        this.modifiers = [],
        this.modifierChain = new l,
        this.positionX = this.options.positionX,
        this.positionY = this.options.positionY,
        this.scaleX = this.options.scaleX,
        this.scaleY = this.options.scaleY,
        this.scaleZ = 1,
        this.skewX = this.options.skewX,
        this.skewY = this.options.skewY,
        this.originX = this.options.anchorX,
        this.originY = this.options.anchorY,
        this.rotationZ = this.options.rotation,
        this.rotationX = 0,
        this.rotationY = 0,
        this.opacity = this.options.opacity,
        this.visible = this.options.visible,
        this.metNodeId = this.options.metNodeId,
        this.type = this.options.type,
        this.size = this.options.size,
        this.containerSize = this.options.containerSize,
        this.nodeDesc = this.options.nodeDescription,
        this.containerSurface = null,
        this.innerContainerSurfaceA = null,
        this.innerContainerSurfaceB = null,
        this.inner3DSurface = null,
        this.mainSurface = null,
        this.transform_ = null,
        this.innerTransform_ = null,
        this.displacementTransform_ = null,
        this.parentNode = null,
        this.metNodes = [],
        this.renderController = new d,
        this.curStateAnim = null,
        this.curKeyframeAnim = null,
        this.nodeActions = null,
        this.childrenHolder = null,
        this.preloadState = 0,
        this.initialized = !1,
        this.actived = !1,
        this.iframeShown = !1,
        this.ownerStage = null,
        this.isAway = !1,
        this.runningWay = 0
    }
    function _(e) {
      var t = e.getContext("2d");
      if (!t)
        return;
      var n = t.canvas.width
        , r = t.canvas.height;
      if (n === 0 || r === 0)
        return;
      var i = t.getImageData(0, 0, n, r);
      i = i.data;
      var s = 0;
      for (var o = 0, u = i.length; o < u; o += 4)
        i[o + 3] === 0 && s++;
      return s
    }
    function D(e) {
      var t = e.mainSurface;
      if (t.canvasPainted) {
        if (!t.canvasChanged)
          return;
        t.canvasPainted = !1
      }
      var n = e.size
        , r = t.getContext("2d");
      if (!r)
        return;
      var i = r.canvas.width
        , s = r.canvas.height;
      if (i === 0 || s === 0)
        return;
      var o = E.normalizeUrl(e.nodeDesc.imageFill.rawImageURL);
      if (o && o.length > 0) {
        var u = new Image;
        u.src = o,
          u.onload = function () {
            var e = t.getContext("2d");
            e.save(),
              e.drawImage(u, 0, 0, i, s),
              e.restore(),
              t.canvasPainted = !0,
              t.canvasInitialCleaned = null,
              t.canvasChanged = !1,
              u.onload = null
          }
      } else
        r.save(),
          r.clearRect(0, 0, n[0], n[1]),
          r.restore(),
          t.canvasPainted = !0,
          t.canvasInitialCleaned = null,
          t.canvasChanged = !1
    }
    function P(e) {
      if (e.type === "ShapeNode" && !!e.mainSurface)
        if (e.mainSurface instanceof L)
          D(e);
        else {
          var t = E.normalizeUrl(e.nodeDesc.imageFill.rawImageURL);
          if (t && t.length > 0) {
            var n = k.numsFromNumString(e.nodeDesc.imageFill.imageRect);
            n || (n = [0, 0, e.nodeDesc.sizeX || 0, e.nodeDesc.sizeY || 0]);
            var r = E.sprintf("<img src='%s' style='position:absolute; left:%dpx; top:%dpx; width:%dpx; height:%dpx;", t, n[0], n[1], n[2], n[3]);
            e.nodeDesc.needInteraction && (r += " pointer-events:auto;",
              r += " -webkit-touch-callout: default;",
              r += " -webkit-user-select: auto;",
              r += " -moz-user-select: auto;"),
              -1 !== t.indexOf("data:") && (r += " object-fit:cover;"),
              r += "'/>",
              e.mainSurface.setContent(r),
              t.toLowerCase().substr(-3) === "gif" && e.mainSurface.setProperties({
                overflow: "hidden"
              })
          }
        }
    }
    function H() {
      for (var e in M.preloadings)
        return;
      var t = !0;
      for (var e in M.deployPendings) {
        var n = M.deployPendings[e];
        P(n),
          t && (t = !1)
      }
      t || (M.deployPendings = {})
    }
    function B() {
      if (!this.ownerStage)
        return 1;
      var e = this.ownerStage.stageContainerSurface
        , t = this.containerSurface || this.mainSurface;
      if (!e || !t)
        return -1;
      var n = e._currentTarget
        , r = t._currentTarget;
      if (!n || !r)
        return -1;
      var i = n.getBoundingClientRect();
      if (i.right <= i.left || i.bottom <= i.top)
        return -1;
      var s = r.getBoundingClientRect();
      return s.right <= s.left || s.bottom <= s.top ? -1 : i.right < s.left || i.left > s.right || i.bottom < s.top || i.top > s.bottom ? 0 : 1
    }
    function j(e) {
      var t = (this.nodeDesc.scrollDirection || 0) === 0
        , n = t ? p.Direction.Y : p.Direction.X
        , r = new S({
          direction: n
        });
      r.nodeID = this.metNodeId,
        r.nodeRangePagingRefuse = this.nodeDesc.notTriggerPageFlip,
        r.containerSurface = this.containerSurface,
        this.scrollView = r,
        this.containerSurface.add(r);
      var s = this.nodeDesc.contentSize
        , o = [this.size[0], this.size[1]];
      o[t ? 1 : 0] = s,
        e = new i({
          size: o
        }),
        r.sequenceFrom([e]);
      var u = new a({
        size: o,
        properties: {
          overflow: "visible"
        }
      });
      e.add(u),
        e = u;
      var f = this.size[t ? 1 : 0]
        , l = this.nodeDesc.paging || 0
        , c = N.parseFootprintsFromArray(this.nodeDesc.footprints || []);
      if (c.length > 0) {
        var h = [];
        for (var d = 0, v = c.length; d < v; d++) {
          var m = c[d];
          h.push(m.f)
        }
        h.sort(function (e, t) {
          if (e > t)
            return 1;
          if (e < t)
            return -1
        }),
          r.setOptions({
            footprinted: l === 2
          }),
          r.setupFootprints(h)
      }
      if (l === 1) {
        var h = [];
        for (var d = 0; ; d++) {
          var g = d * f + f / 2;
          if (!(g >= 0 + f / 2 && g <= s - f / 2))
            break;
          h.push(g)
        }
        h.length > 0 && h[h.length - 1] < s - f / 2 && h.push(s - f / 2),
          r.setOptions({
            parted: h.length > 0
          }),
          r.setupParts(h)
      }
      r.setOffset(-this.nodeDesc.contentOffset || 0),
        this.containerSurface ? r.subscribe(this.containerSurface) : this.mainSurface && r.subscribe(this.mainSurface),
        r.setupScrollEventHandling();
      var y = function (e) {
        for (var t = 0, n = c.length; t < n; t++) {
          var r = c[t];
          if (e === r.f)
            return r
        }
        return null
      };
      return r.on("onFootprint", function (e) {
        if (!this.initialized || !this.actived)
          return;
        var t = y(e.location);
        if (null === t)
          return;
        for (var n = 0, r = t.performs.length; n < r; n++) {
          var i = t.performs[n];
          i.execute()
        }
      }
        .bind(this)),
        r.on("hookFootprint", function (e) {
          if (!this.initialized || !this.actived)
            return;
          var t = y(e.location);
          if (null === t)
            return;
          var n = 0;
          e.offset === "u" ? n = -1 : e.offset === "d" ? n = 1 : n = Math.max(-1, Math.min(1, e.offset * 2 / f));
          for (var r = 0; r < t.hooks.length; r++) {
            var i = t.hooks[r];
            i.executeStep(1 - Math.abs(n))
          }
        }
          .bind(this)),
        e
    }
    function F(e) {
      var t = (this.nodeDesc.scrollDirection || 0) === 0
        , n = t ? p.Direction.Y : p.Direction.X
        , r = new S({
          direction: n
        });
      return r.nodeID = this.metNodeId,
        r.containerSurface = this.containerSurface,
        this.scrollView = r,
        this.containerSurface.add(r),
        e = new i({
          size: this.size
        }),
        r.sequenceFrom([e]),
        this.containerSurface ? r.subscribe(this.containerSurface) : this.mainSurface && r.subscribe(this.mainSurface),
        r.setupScrollEventHandling(),
        e
    }
    function I() {
      this.baseModifier = new o({
        size: this.size,
        origin: function () {
          return [this.originX, this.originY]
        }
          .bind(this),
        align: [0, 0],
        opacity: function () {
          return this.opacity
        }
          .bind(this),
        transform: function () {
          if (null === this.transform_) {
            var e = this.positionX
              , t = this.positionY
              , n = f.scale(this.scaleX, this.scaleY, this.scaleZ)
              , r = f.translate(e, t, 0)
              , i = f.rotate(0, 0, this.rotationZ)
              , s = f.multiply(r, i);
            this.transform_ = f.multiply(s, n)
          }
          return this.transform_
        }
          .bind(this)
      }),
        this.modifierChain.addModifier(this.baseModifier)
    }
    var r = e("famous/core/RenderNode")
      , i = e("famous/core/View")
      , s = e("famous/core/Surface")
      , o = e("famous/core/Modifier")
      , u = e("famous/modifiers/StateModifier")
      , a = e("famous/surfaces/ContainerSurface")
      , f = e("famous/core/Transform")
      , l = e("famous/modifiers/ModifierChain")
      , c = e("famous/transitions/TweenTransition")
      , h = e("famous/utilities/Timer")
      , p = e("famous/utilities/Utility")
      , d = e("famous/views/RenderController")
      , v = e("utils/MotionPath")
      , m = e("animations/KeyFrameAnim")
      , g = e("animations/Css3Anim")
      , y = e("animations/StateAnim")
      , b = e("animations/FilmStateAnim")
      , w = e("animations/ScrollStateAnim")
      , E = e("utils/DebugUtils")
      , S = e("views/Scrollview")
      , x = e("actions/MetHook")
      , T = e("actions/MetPerform")
      , N = e("actions/MetNodeAction")
      , C = e("utils/TransitionUtils")
      , k = e("utils/ShapeNodeUtils")
      , L = e("famous/surfaces/CanvasSurface")
      , A = e(["animations/PageAnim"], function (e) {
        A = e
      })
      , O = e(["tools/MetNodeFactory"], function (e) {
        O = e
      });
    M.DEFAULT_OPTIONS = {},
      M.prototype = Object.create(i.prototype),
      M.prototype.constructor = M,
      M.preloadings = {},
      M.deployPendings = {},
      M.prototype.addModifierAction = function (e) {
        this.modifiers.push(e),
          this.modifierChain.addModifier(e)
      }
      ,
      M.prototype.setMainSurface = function (e) {
        this.mainSurface = e
      }
      ,
      M.prototype.setInner3DSurface = function (e) {
        this.inner3DSurface = e
      }
      ,
      M.prototype.setInnerContainerSurfaceA = function (e) {
        this.innerContainerSurfaceA = e
      }
      ,
      M.prototype.setInnerContainerSurfaceB = function (e) {
        this.innerContainerSurfaceB = e
      }
      ,
      M.prototype.setContainerSurface = function (e) {
        this.containerSurface = e
      }
      ,
      M.prototype.addSubMetNode = function (e) {
        this.metNodes.push(e)
      }
      ,
      M.prototype.setPositionPixels = function (e, t) {
        null !== this.transform_ && (this.positionX !== e || this.positionY !== t) && (this.transform_ = null),
          this.positionX = e,
          this.positionY = t
      }
      ,
      M.prototype.getPositionPixels = function () {
        return [this.positionX, this.positionY]
      }
      ,
      M.prototype.initMetSubNode = function (e, t, n) {
        this.ownerStage = n,
          this.parentNode = t,
          e.add(this.renderController, null);
        var r = this.type === "MetStateKeyframeNode";
        I.call(this);
        var i;
        r ? i = t ? t.size : [undefined, undefined] : i = this.size;
        var s = this.add(new o({
          size: i
        })).add(this.modifierChain)
          , u = s;
        this.containerSurface && (u.add(this.containerSurface),
          u = this.containerSurface);
        if (this.innerContainerSurfaceA) {
          var a = new o({
            origin: [.5, .5],
            align: [.5, .5]
          });
          u.add(a).add(this.innerContainerSurfaceA),
            u = this.innerContainerSurfaceA
        }
        if (this.innerContainerSurfaceB) {
          var a = new o({
            origin: [.5, .5],
            align: [.5, .5]
          });
          u.add(a).add(this.innerContainerSurfaceB),
            u = this.innerContainerSurfaceB
        }
        if (this.inner3DSurface) {
          var l = new o({
            origin: [.5, .5],
            align: [.5, .5],
            transform: function () {
              if (null === this.innerTransform_) {
                var e = f.rotate(this.rotationX, this.rotationY, 0);
                e = f.moveThen([(.5 - this.originX) * this.size[0], (.5 - this.originY) * this.size[1], 0], e),
                  e = f.thenMove(e, [(this.originX - .5) * this.size[0], (this.originY - .5) * this.size[1], 0]),
                  this.innerTransform_ = e
              }
              return this.innerTransform_
            }
              .bind(this)
          });
          u.add(l).add(this.inner3DSurface),
            u = this.inner3DSurface
        }
        this.mainSurface && u.add(this.mainSurface);
        var c = this.metNodes
          , h = u;
        this.type === "MetScrollNode" ? h = j.call(this, h) : this.type === "MetDataListNode" && (h = F.call(this, h));
        if (!r)
          this.renderController.addRenderable(this, {
            origin: [0, 0],
            align: [0, 0]
          });
        else {
          var p = t.nodeDesc.transition;
          (5 === p || 15 === p || 17 === p || 25 === p || 4 === p || 14 === p || 16 === p || 24 === p) && this.containerSurface.setAttributes({
            klass: "kf"
          })
        }
        this.visible || this.hideMetNode(),
          t && t.type === "MetMaskNode" && 0 === t.metNodes.indexOf(this) && (this.hideMetNode(),
            t.updateMasking([0, 0], [0, 0], !1, !0)),
          this.childrenHolder = h;
        for (var d = 0, v = c.length; d < v; d++)
          c[d].initMetSubNode(h, this, n);
        this.type === "MetStateNode" ? (this.curStateAnim || (this.nodeDesc.transition === 20 ? this.curStateAnim = new b(this, this.nodeDesc.defaultState || 0) : this.nodeDesc.transition === 22 || this.nodeDesc.transition === 23 ? this.curStateAnim = new w(this, this.nodeDesc.defaultState || 0) : this.curStateAnim = new y(this, this.nodeDesc.defaultState || 0)),
          this.curStateAnim.showState(this.curStateAnim.curStateIdx, !1, 1)) : this.type === "ButtonNode" ? (this.curStateAnim || (this.curStateAnim = new y(this, this.nodeDesc.defaultSelected ? 1 : 0)),
            this.curStateAnim.showState(this.curStateAnim.curStateIdx, !1, 1)) : this.type === "MetAnimNode" && (this.curKeyframeAnim || (this.nodeDesc.smartAnimData ? this.curKeyframeAnim = new g(this) : this.curKeyframeAnim = new m(this, this.nodeDesc.duration, this.nodeDesc.keyframes, this.nodeDesc.endlessLoop)),
              this.curKeyframeAnim.gotoDefaultKeyframe()),
          this.initialized = !0
      }
      ,
      M.prototype.cleanMetSubNode = function () {
        if (this.nodeDesc.nodeSubordinate === "_screen_")
          return;
        if (this.type === "ShapeNode")
          !this.mainSurface instanceof L ? this.mainSurface.setContent("") : this.mainSurface.setSize([0, 0]);
        else if (this.type === "AudioNode")
          this.mainSurface.deleteAttribute("src"),
            this.mainSurface._currentTarget && (this.mainSurface._currentTarget.removeAttribute("src"),
              this.mainSurface._currentTarget.load()),
            this.mainSurface.__resetEvents && (this.mainSurface.__resetEvents(),
              delete this.mainSurface.__resetEvents);
        else if (this.type === "VideoNode")
          this.mainSurface.setOptions({
            src: ""
          }),
            this.mainSurface._currentTarget && (this.mainSurface._currentTarget.removeAttribute("src"),
              this.mainSurface._currentTarget.load()),
            this.mainSurface.__resetEvents && (this.mainSurface.__resetEvents(),
              delete this.mainSurface.__resetEvents);
        else if (this.type === "WebNode") {
          var e = this.mainSurface._currentTarget;
          if (e) {
            var t = e.childNodes;
            for (var n = 0, r = t.length; n < r; n++) {
              var i = t[n];
              i.tagName.toUpperCase() === "IFRAME" && (i.src = "about:blank",
                i.parentNode.removeChild(i))
            }
          }
        }
        this.initialized = !1,
          M.deployPendings[this.metNodeId] && delete M.deployPendings[this.metNodeId],
          this.renderController.removeAllRenderablesExcept(null),
          this.renderController = null,
          this.curStateAnim && (this.curStateAnim.silentTimers(),
            this.curStateAnim.actor = null,
            this.curStateAnim = null),
          this.curKeyframeAnim && (this.curKeyframeAnim.stopAnim(),
            this.curKeyframeAnim.actor = null,
            this.curKeyframeAnim = null),
          this.nodeActions = null,
          this.mainSurface && (this.mainSurface.detach(),
            this.mainSurface = null),
          this.containerSurface && (this.containerSurface.detach(),
            this.containerSurface = null),
          this._on_device_motion_a && (window.removeEventListener("devicemotion", this._on_device_motion_a),
            delete this._on_device_motion_a),
          this._on_device_motion_b && (window.removeEventListener("deviceorientation", this._on_device_motion_b),
            delete this._on_device_motion_b);
        var s = O.sharedInstance();
        s.delMetNode(this.metNodeId);
        var o = this.metNodes;
        for (var n = 0, u = o.length; n < u; n++)
          o[n].cleanMetSubNode();
        this.parentNode = null,
          this.metNodes.length = 0
      }
      ,
      M.prototype.activeMetSubNode = function () {
        var e = A.sharedInstance();
        if (e.initializing)
          return;
        if (this.actived)
          return;
        this.actived = !0;
        if (this.type === "MetStateNode")
          this.nodeDesc.autoplay && this.curStateAnim && !this.curStateAnim.isPlaying() && this.curStateAnim.autoPlay();
        else if (this.type === "AudioNode" || this.type === "VideoNode") {
          if (this.nodeDesc.autoplay && !this.isMediaPlaying()) {
            this.startMediaPlay();
            if (this.type === "VideoNode" && window.GlobalData.mixid && this.nodeDesc.videoURL && A.sharedInstance().project.id_) {
              var t = {};
              t.ProjectId = A.sharedInstance().project.id_,
                t.MixId = window.GlobalData.mixid,
                t.Type = 2,
                t.ElementId = this.nodeDesc.videoURL;
              var n = JSON.stringify({
                element: t
              });
              p.postURL(window.GlobalData.serverBaseUrl + "/api/viewstat/collect", n, 0, function (e) { })
            }
          }
        } else if (this.type === "MetAnimNode")
          this.nodeDesc.autoplay && this.curKeyframeAnim && !this.curKeyframeAnim.isPlaying() && (this.curKeyframeAnim.gotoDefaultKeyframe(),
            this.curKeyframeAnim.startAnimAfterDelay(null));
        else if (this.type === "WebNode") {
          var r = this.mainSurface._currentTarget;
          if (r) {
            var i = r.childNodes;
            for (var s = 0, o = i.length; s < o; s++) {
              var u = i[s];
              u.tagName.toUpperCase() === "IFRAME" && (u.src = u.src)
            }
          }
        }
        var a = this.metNodes;
        (this.type === "MetStateNode" || this.type === "ButtonNode") && a.length > 0 && (a = [a[this.curStateAnim.curStateIdx]]);
        for (var s = 0, f = a.length; s < f; s++)
          a[s].activeMetSubNode();
        M.deployPendings[this.metNodeId] && (P(this),
          delete M.deployPendings[this.metNodeId])
      }
      ,
      M.prototype.deactiveMetSubNode = function () {
        if (!this.actived)
          return;
        this.actived = !1;
        if (this.type === "MetStateNode")
          this.curStateAnim && this.curStateAnim.stopPlay(),
            this.curStateAnim.showState(this.nodeDesc.defaultState || 0, !1, 1);
        else if (this.type === "ButtonNode")
          this.curStateAnim.showState(this.nodeDesc.defaultState || 0, !1, 1);
        else if (this.type === "AudioNode" || this.type === "VideoNode")
          this.stopMediaPlay(),
            this.mainSurface.rewind();
        else if (this.type === "MetAnimNode")
          this.curKeyframeAnim && this.curKeyframeAnim.stopAnim(),
            this.curKeyframeAnim.gotoDefaultKeyframe();
        else if (this.type === "MetScrollNode")
          this.scrollView.resetToPosition(-this.nodeDesc.contentOffset || 0);
        else if (this.type !== "MetTextNode")
          if (this.type === "ShapeNode") {
            var e = B.call(this);
            e === 0 && (this.mainSurface instanceof L || this.nodeDesc.fillType === 2 && this.nodeDesc.imageFill && this.nodeDesc.imageFill.rawImageURL.length > 0 && (this.mainSurface.setContent(""),
              M.deployPendings[this.metNodeId] = this))
          } else
            this.type === "MetDataCollectorNode" ? this.archiveScores = null : this.type === "MetDataComparatorNode" && (this.scores = {});
        var t = this.type === "MetStateKeyframeNode";
        t || this.visible !== this.isMetNodeShown() && (this.visible ? this.showMetNode() : this.hideMetNode()),
          this.erasingResetAll__ && this.erasingResetAll__(),
          this.draggingResetAll__ && this.draggingResetAll__(),
          this.swipingResetAll__ && this.swipingResetAll__(),
          this.scrollingResetAll__ && this.scrollingResetAll__(),
          this.zoomingResetAll__ && this.zoomingResetAll__(),
          this.motionDataA_resetAll__ && this.motionDataA_resetAll__(),
          this.motionDataB_resetAll__ && this.motionDataB_resetAll__();
        var n = this.metNodes;
        for (var r = 0, i = n.length; r < i; r++)
          n[r].deactiveMetSubNode()
      }
      ,
      M.prototype.setIframesVisiblity = function (e) {
        if (this.iframeShown === e)
          return;
        this.iframeShown = e;
        if (this.type === "WebNode" && this.nodeDesc.webType !== 2) {
          var t = e;
          if (t) {
            var n = this.ownerStage;
            null !== n && (n = n.outerContainerSurface,
              n.getProperties().visibility === "hidden" && (t = !1))
          }
          t && (this.isMetNodeShown() || (t = !1));
          if (t) {
            var r = this.mainSurface._currentTarget;
            r && (r = r.childNodes[0]),
              r ? h.after(function () {
                r.style.display = "block"
              }, 1) : this.mainSurface.reload_content_ && this.mainSurface.reload_content_(!0)
          } else
            this.mainSurface.reload_content_ && this.mainSurface.reload_content_(!1)
        }
        var i = this.metNodes;
        e && (this.type === "MetStateNode" || this.type === "ButtonNode") && i.length > 0 && (i = [i[this.curStateAnim.curStateIdx]]);
        for (var s = 0, o = i.length; s < o; s++)
          i[s].setIframesVisiblity(e)
      }
      ,
      M.prototype.preloadMetSubNode = function (e) {
        var t = this
          , n = t.nodeDesc.imageFill;
        n && (n = n.rawImageURL);
        if (n && n.length > 0 && t.preloadState !== 1 && t.preloadState !== 2) {
          n = E.normalizeUrl(n);
          var r = t.metNodeId
            , i = M.preloadings[r];
          if (!i) {
            t.preloadState = 1;
            var s = A.sharedInstance();
            s.initialLoading !== null && s.initialLoading.push(t),
              i = new Image,
              M.preloadings[r] = i;
            var o = function () {
              t.preloadState = 2,
                M.preloadings[r] && delete M.preloadings[r],
                t.requestDeploy4NodeView(e),
                i.removeEventListener("load", o, !1),
                i.removeEventListener("error", u, !1),
                i = null
            }
              , u = function () {
                t.preloadState = -1,
                  M.preloadings[r] && delete M.preloadings[r],
                  t.requestDeploy4NodeView(e),
                  i.removeEventListener("load", o, !1),
                  i.removeEventListener("error", u, !1),
                  i = null
              };
            i.addEventListener("load", o, !1),
              i.addEventListener("error", u, !1),
              i.src = n
          }
        }
        var a = t.metNodes
          , f = E.configValueForKey("statesLoadingMode");
        if (f === 0 && t.type === "MetStateNode" && !t.nodeDesc.autoplay && t.nodeDesc.transition !== 20) {
          var l = t.nodeDesc.defaultState || 0
            , c = [];
          l - 1 >= 0 && l - 1 < a.length && c.push(a[l - 1]),
            l >= 0 && l < a.length && c.push(a[l]),
            l + 1 >= 0 && l + 1 < a.length && c.push(a[l + 1]),
            a = c
        }
        for (var h = 0, p = a.length; h < p; h++)
          a[h].preloadMetSubNode(e)
      }
      ,
      M.prototype.requestDeploy4NodeView = function (e) {
        var t = !1;
        if (this.actived)
          t = !0;
        else if (e)
          if (!this.ownerStage)
            t = !0;
          else {
            var n = B.call(this);
            n === 1 && (t = !0)
          }
        t ? (P(this),
          M.deployPendings[this.metNodeId] && delete M.deployPendings[this.metNodeId]) : M.deployPendings[this.metNodeId] = this,
          H()
      }
      ,
      M.prototype.showMetNode = function () {
        if (this.isValid === !1)
          return;
        var e = this.containerSurface || this.mainSurface;
        e && (e.setPropertiesCheckDirty({
          visibility: "inherit"
        }),
          e.setSize(this.size))
      }
      ,
      M.prototype.hideMetNode = function () {
        var e = this.containerSurface || this.mainSurface;
        e && e.setPropertiesCheckDirty({
          visibility: "hidden"
        })
      }
      ,
      M.prototype.isMetNodeShown = function () {
        var e = this.containerSurface || this.mainSurface;
        return e ? e.getProperties().visibility !== "hidden" : !1
      }
      ,
      M.prototype.isMediaPlaying = function () {
        return "AudioNode" === this.type || "VideoNode" === this.type ? this.mainSurface.isPlaying() : !1
      }
      ,
      M.prototype.startMediaPlay = function () {
        var e = O.sharedInstance();
        if ("AudioNode" === this.type) {
          if (!this.nodeDesc.audioType) {
            for (var t in e.audioNodes) {
              var n = e.audioNodes[t];
              if (n === this)
                continue;
              n.nodeDesc.audioType || n.isMediaPlaying() && n.mainSurface.pause()
            }
            for (var t in e.videoNodes) {
              var n = e.videoNodes[t];
              n.isMediaPlaying() && n.mainSurface.pause()
            }
          }
        } else {
          if ("VideoNode" !== this.type)
            return;
          for (var t in e.audioNodes) {
            var n = e.audioNodes[t];
            n.nodeDesc.audioType || n.isMediaPlaying() && n.mainSurface.pause()
          }
          if (this.nodeDesc.fullScreen)
            for (var t in e.videoNodes) {
              var n = e.videoNodes[t];
              if (n === this)
                continue;
              n.nodeDesc.fullScreen && n.isMediaPlaying() && n.mainSurface.pause()
            }
        }
        var r = "VideoNode" === this.type && this.nodeDesc.fullScreen;
        if (r) {
          var i = this.mainSurface._currentTarget;
          if (window.__fullScreenVideoPlay) {
            window.GlobalData.__playingFullscreenVideoSurface = this.mainSurface;
            var s = "window.GlobalData.__playingFullscreenVideoSurface && window.GlobalData.__playingFullscreenVideoSurface.emit('play')"
              , o = "window.GlobalData.__playingFullscreenVideoSurface && window.GlobalData.__playingFullscreenVideoSurface.emit('pause')"
              , u = "window.GlobalData.__playingFullscreenVideoSurface && window.GlobalData.__playingFullscreenVideoSurface.emit('play_finish')";
            window.__fullScreenVideoPlay(i.src, u, s, o)
          } else
            E.fullscreenEnabled() && E.requestFullscreen(i)
        }
        if (!r || !window.__fullScreenVideoPlay)
          this.isMediaPlaying() || this.mainSurface.play()
      }
      ,
      M.prototype.stopMediaPlay = function () {
        ("AudioNode" === this.type || "VideoNode" === this.type) && this.mainSurface.pause()
      }
      ,
      M.prototype.updateMasking = function (e, t, n, r) {
        if ("MetMaskNode" !== this.type)
          return;
        if (this.metNodes.length < 1)
          return;
        var i = this.metNodes[0];
        if (r) {
          var s = E.normalizeUrl(i.nodeDesc.imageFill.rawImageURL);
          this.containerSurface.setProperties({
            webkitMaskImage: "url('" + s + "')",
            webkitMaskRepeat: "no-repeat"
          })
        }
        var o = i.getPositionPixels()
          , u = [i.size[0] * Math.max(0, 1 + t[0]), i.size[1] * Math.max(0, 1 + t[1])]
          , a = this.containerSurface.getSize()
          , f = o[0] + e[0] - i.originX * u[0]
          , l = o[1] + e[1] - i.originY * u[1];
        f > a[0] - 1 || l > a[1] - 1 || f < 1 - u[0] || l < 1 - u[1] ? this.containerSurface.setProperties({
          opacity: 0
        }) : this.containerSurface.setProperties({
          opacity: this.nodeDesc.opacity || 1
        }),
          this.containerSurface.setProperties({
            webkitMaskPositionX: f + "px",
            webkitMaskPositionY: l + "px",
            webkitMaskSize: "" + u[0] + "px " + u[1] + "px"
          }),
          n && (this.displacementModifier || this.createDisplacementModifier(),
            this.setDisplacementPos(-e[0], -e[1]))
      }
      ,
      M.prototype.updateMaskCliping = function (t, n) {
        if (!t || "MetAnimNode" !== t.type)
          return;
        if (t.metNodes.length < 1)
          return;
        var r = e("utils/TransformUtils")
          , i = this;
        i.__clips || (i.__clips = {});
        var s = i.containerSurface || i.mainSurface
          , o = t.metNodes || [];
        for (var u = 0, a = o.length; u < a; u++) {
          var f = o[u]
            , l = f.nodeDesc.id_
            , c = i.__clips[l];
          if (c === undefined) {
            i.__clips[l] = c = {};
            var h = f.nodeDesc.imageFill ? E.normalizeUrl(f.nodeDesc.imageFill.rawImageURL) : "";
            if (h)
              c.image = "url('" + h + "')";
            else {
              var p = "rgba(0, 0, 0, 1)";
              f.nodeDesc.colorFill && (p = E.rgba2ColorString(f.nodeDesc.colorFill.fillColor)),
                c.image = "linear-gradient(" + p + "," + p + ")"
            }
            c.repeat = "no-repeat"
          }
          var d = r.transformToElement(f.mainSurface._currentTarget, s._currentTarget)
            , v = [0, 0]
            , m = [f.size[0], 0]
            , g = [0, f.size[1]]
            , y = [f.size[0], f.size[1]];
          v = r.pointApplyTransform(v, d),
            m = r.pointApplyTransform(m, d),
            g = r.pointApplyTransform(g, d),
            y = r.pointApplyTransform(y, d);
          var b = Math.min(v[0], m[0], g[0], y[0])
            , w = Math.max(v[0], m[0], g[0], y[0])
            , S = Math.min(v[1], m[1], g[1], y[1])
            , x = Math.max(v[1], m[1], g[1], y[1]);
          c.posX = (b + w - f.size[0]) / 2 + "px",
            c.posY = (S + x - f.size[1]) / 2 + "px",
            c.size = w - b + "px " + (x - S) + "px"
        }
        var T = ""
          , N = ""
          , C = ""
          , k = ""
          , L = "";
        for (var l in i.__clips) {
          var c = i.__clips[l];
          T && (T += ",",
            N += ",",
            C += ",",
            k += ",",
            L += ","),
            T += c.image,
            N += c.repeat,
            C += c.posX,
            k += c.posY,
            L += c.size
        }
        T && s.setProperties({
          webkitMaskImage: T,
          webkitMaskRepeat: N,
          webkitMaskPositionX: C,
          webkitMaskPositionY: k,
          webkitMaskSize: L
        })
      }
      ,
      M.prototype.createDisplacementModifier = function () {
        this.displacementPosX = 0,
          this.displacementPosY = 0,
          this.displacementTransform_ = null,
          this.displacementModifier && (this.modifierChain.removeModifier(this.displacementModifier),
            delete this.displacementModifier),
          this.displacementModifier = new o({
            transform: function () {
              return null === this.displacementTransform_ && (this.displacementTransform_ = f.translate(this.displacementPosX, this.displacementPosY, 0)),
                this.displacementTransform_
            }
              .bind(this)
          }),
          this.modifierChain.addModifier(this.displacementModifier)
      }
      ,
      M.prototype.setDisplacementPos = function (e, t) {
        null !== this.displacementTransform_ && (this.positionX !== e || this.positionY !== t) && (this.displacementTransform_ = null),
          this.displacementPosX = e,
          this.displacementPosY = t
      }
      ,
      M.prototype.setMetNodeAnchorX = function (e) {
        null !== this.innerTransform_ && this.originX !== e && (this.innerTransform_ = null),
          this.originX = e
      }
      ,
      M.prototype.setMetNodeAnchorY = function (e) {
        null !== this.innerTransform_ && this.originY !== e && (this.innerTransform_ = null),
          this.originY = e
      }
      ,
      M.prototype.setMetNodeScaleX = function (e) {
        null !== this.transform_ && this.scaleX !== e && (this.transform_ = null),
          this.scaleX = e
      }
      ,
      M.prototype.setMetNodeScaleY = function (e) {
        null !== this.transform_ && this.scaleY !== e && (this.transform_ = null),
          this.scaleY = e
      }
      ,
      M.prototype.setMetNodeRotateX = function (e) {
        null !== this.innerTransform_ && this.rotationX !== e && (this.innerTransform_ = null),
          this.rotationX = e
      }
      ,
      M.prototype.setMetNodeRotateY = function (e) {
        null !== this.innerTransform_ && this.rotationY !== e && (this.innerTransform_ = null),
          this.rotationY = e
      }
      ,
      M.prototype.setMetNodeRotateZ = function (e) {
        null !== this.transform_ && this.rotationZ !== e && (this.transform_ = null),
          this.rotationZ = e
      }
      ,
      M.prototype.setMetNodeOpacity = function (e) {
        this.opacity = e
      }
      ,
      M.canvasCalcTransparency = _,
      M.canvasDrawImage = D,
      n.exports = M
  }),
  define("famous/surfaces/InputSurface", ["require", "exports", "module", "../core/Surface"], function (e, t, n) {
    function i(e) {
      this._placeholder = e.placeholder || "",
        this._value = e.value || "",
        this._type = e.type || "text",
        this._name = e.name || "",
        r.apply(this, arguments)
    }
    var r = e("../core/Surface");
    i.prototype = Object.create(r.prototype),
      i.prototype.constructor = i,
      i.prototype.elementType = "input",
      i.prototype.elementClass = "famous-surface",
      i.prototype.setPlaceholder = function (t) {
        return this._placeholder = t,
          this._contentDirty = !0,
          this
      }
      ,
      i.prototype.focus = function () {
        return this._currentTarget && this._currentTarget.focus(),
          this
      }
      ,
      i.prototype.blur = function () {
        return this._currentTarget && this._currentTarget.blur(),
          this
      }
      ,
      i.prototype.setValue = function (t) {
        return this._value = t,
          this._contentDirty = !0,
          this
      }
      ,
      i.prototype.setType = function (t) {
        return this._type = t,
          this._contentDirty = !0,
          this
      }
      ,
      i.prototype.getValue = function () {
        return this._currentTarget ? this._currentTarget.value : this._value
      }
      ,
      i.prototype.setName = function (t) {
        return this._name = t,
          this._contentDirty = !0,
          this
      }
      ,
      i.prototype.getName = function () {
        return this._name
      }
      ,
      i.prototype.deploy = function (t) {
        this._placeholder !== "" && (t.placeholder = this._placeholder),
          t.value = this._value,
          t.type = this._type,
          t.name = this._name
      }
      ,
      n.exports = i
  }),
  define("famous/surfaces/TextareaSurface", ["require", "exports", "module", "../core/Surface"], function (e, t, n) {
    function i(e) {
      this._placeholder = e.placeholder || "",
        this._value = e.value || "",
        this._name = e.name || "",
        this._wrap = e.wrap || "",
        this._cols = e.cols || "",
        this._rows = e.rows || "",
        r.apply(this, arguments)
    }
    var r = e("../core/Surface");
    i.prototype = Object.create(r.prototype),
      i.prototype.constructor = i,
      i.prototype.elementType = "textarea",
      i.prototype.elementClass = "famous-surface",
      i.prototype.setPlaceholder = function (t) {
        return this._placeholder = t,
          this._contentDirty = !0,
          this
      }
      ,
      i.prototype.focus = function () {
        return this._currentTarget && this._currentTarget.focus(),
          this
      }
      ,
      i.prototype.blur = function () {
        return this._currentTarget && this._currentTarget.blur(),
          this
      }
      ,
      i.prototype.setValue = function (t) {
        return this._value = t,
          this._contentDirty = !0,
          this
      }
      ,
      i.prototype.getValue = function () {
        return this._currentTarget ? this._currentTarget.value : this._value
      }
      ,
      i.prototype.setName = function (t) {
        return this._name = t,
          this._contentDirty = !0,
          this
      }
      ,
      i.prototype.getName = function () {
        return this._name
      }
      ,
      i.prototype.setWrap = function (t) {
        return this._wrap = t,
          this._contentDirty = !0,
          this
      }
      ,
      i.prototype.setColumns = function (t) {
        return this._cols = t,
          this._contentDirty = !0,
          this
      }
      ,
      i.prototype.setRows = function (t) {
        return this._rows = t,
          this._contentDirty = !0,
          this
      }
      ,
      i.prototype.deploy = function (t) {
        this._placeholder !== "" && (t.placeholder = this._placeholder),
          this._value !== null && this._value !== undefined && (t.value = this._value),
          this._name !== "" && (t.name = this._name),
          this._wrap !== "" && (t.wrap = this._wrap),
          this._cols !== "" && (t.cols = this._cols),
          this._rows !== "" && (t.rows = this._rows)
      }
      ,
      n.exports = i
  }),
  define("famous/surfaces/IframeSurface", ["require", "exports", "module", "../core/Surface"], function (e, t, n) {
    function i(e) {
      r.apply(this, arguments)
    }
    var r = e("../core/Surface");
    i.prototype = Object.create(r.prototype),
      i.prototype.constructor = i,
      i.prototype.elementType = "iframe",
      i.prototype.elementClass = "famous-surface",
      i.prototype.focus = function () {
        return this._eventOutput.emit("focus"),
          this
      }
      ,
      i.prototype.blur = function () {
        return this._eventOutput.emit("blur"),
          this
      }
      ,
      n.exports = i
  }),
  define("famous/surfaces/AudioSurface", ["require", "exports", "module", "../core/Surface", "utils/DebugUtils"], function (e, t, n) {
    function s(e) {
      r.apply(this, arguments),
        this.options = Object.create(s.DEFAULT_OPTIONS),
        this._statePending = !1,
        this._pending_progress = 0,
        this._ever_load = !1,
        this._ever_play = !1,
        this._wait_play_seek = !1,
        this._playState = 0,
        this._playFrom = 0,
        this._playTo = -1,
        this._repeatCount = 1,
        this._playRound = null,
        e && this.setOptions(e)
    }
    var r = e("../core/Surface")
      , i = e("utils/DebugUtils");
    s.prototype = Object.create(r.prototype),
      s.prototype.constructor = s,
      s.DEFAULT_OPTIONS = {
        autoplay: !1
      },
      s.prototype.elementType = "audio",
      s.prototype.elementClass = "famous-surface",
      s.prototype.setOptions = function (e) {
        e.src && (this._contentDirty = !0),
          e.repeatCount !== undefined && (this._repeatCount = parseInt(e.repeatCount),
            this._playRound = null,
            delete e.repeatCount),
          e.from !== undefined && (this._playFrom = parseFloat(e.from)),
          e.to !== undefined && (this._playTo = parseFloat(e.to)),
          r.prototype.setOptions.call(this, e)
      }
      ,
      s.prototype.setup = function (e) {
        r.prototype.setup.call(this, e);
        if (this._currentTarget) {
          var t = this
            , n = t._currentTarget
            , i = function () {
              n.currentTime > 0 && (t._ever_play = !0,
                n.removeEventListener("timeupdate", i))
            };
          n.addEventListener("timeupdate", i, !1)
        }
      }
      ,
      s.prototype.load = function (e, t) {
        e === undefined && (e = this._pending_progress),
          this._pending_progress = e;
        if (this._currentTarget) {
          var n = function () {
            this._currentTarget.removeEventListener("loadedmetadata", n, !1),
              this._currentTarget.removeEventListener("error", r, !1),
              e >= 0 && (this._currentTarget.currentTime = e),
              t && t()
          }
            .bind(this)
            , r = function () {
              this._currentTarget.removeEventListener("loadedmetadata", n, !1),
                this._currentTarget.removeEventListener("error", r, !1),
                t && t()
            }
              .bind(this);
          this._ever_load ? n() : (this._currentTarget.addEventListener("loadedmetadata", n, !1),
            this._currentTarget.addEventListener("error", r, !1),
            this._currentTarget.load(),
            this._ever_load = !0)
        }
        return this._statePending = this._currentTarget ? !1 : !0,
          this._playState = 3,
          this
      }
      ,
      s.prototype.play = function () {
        var e = this;
        if (e._currentTarget) {
          var t = e._currentTarget;
          e._playFrom > 0 && t.currentTime < e._playFrom ? e.seekThenPlay(e._playFrom) : i.mediaPlay(t);
          if ((e._repeatCount === 0 || e._repeatCount > 1) && null === e._playRound) {
            e._playRound = e._repeatCount;
            var n = e._playFrom || 0
              , r = function (r) {
                r.type === "timeupdate" && (n > (e._playFrom || 0) && t.currentTime >= n && e.emit("playing", {
                  from: n,
                  to: t.currentTime
                }),
                  n = t.currentTime);
                if (r.type === "ended" || e._playTo > 0 && t.currentTime >= e._playTo)
                  e._repeatCount === 0 || --e._playRound > 0 ? e.seekThenPlay(n = e._playFrom || 0) : (n = e._playFrom || 0,
                    e._playRound = null,
                    r.type !== "ended" && e.pause(),
                    e.emit("play_finish"))
              };
            e.__resetEvents = function () {
              t.removeEventListener("ended", r),
                t.removeEventListener("timeupdate", r)
            }
              ,
              e.__resetEvents(),
              t.addEventListener("ended", r, !1),
              t.addEventListener("timeupdate", r, !1)
          } else {
            var n = e._playFrom || 0
              , r = function (r) {
                r.type === "timeupdate" && (n > (e._playFrom || 0) && t.currentTime >= n && e.emit("playing", {
                  from: n,
                  to: t.currentTime
                }),
                  n = t.currentTime);
                if (r.type === "ended" || e._playTo > 0 && t.currentTime >= e._playTo)
                  n = e._playFrom || 0,
                    r.type !== "ended" && e.pause(),
                    e.emit("play_finish")
              };
            e.__resetEvents = function () {
              t.removeEventListener("ended", r),
                t.removeEventListener("timeupdate", r)
            }
              ,
              e.__resetEvents(),
              t.addEventListener("ended", r, !1),
              t.addEventListener("timeupdate", r, !1)
          }
        }
        return e._statePending = e._currentTarget ? !1 : !0,
          e._playState = 1,
          e
      }
      ,
      s.prototype.pause = function () {
        return this._currentTarget && this._currentTarget.pause(),
          this._statePending = this._currentTarget ? !1 : !0,
          this._playState = 2,
          this
      }
      ,
      s.prototype.getCurrentTime = function () {
        return this._currentTarget ? this._currentTarget.currentTime : 0
      }
      ,
      s.prototype.getDuration = function () {
        return this._currentTarget ? this._currentTarget.duration : 1
      }
      ,
      s.prototype.seek = function (e) {
        this._currentTarget && (this._currentTarget.currentTime = Math.max(0, e))
      }
      ,
      s.prototype.seekThenPlay = function (e) {
        var t = this;
        if (t._wait_play_seek)
          return;
        var n = t._currentTarget;
        if (!!n)
          if (n.duration)
            n.currentTime = Math.max(0, e),
              i.mediaPlay(n);
          else {
            n.muted = !0,
              t._wait_play_seek = !0;
            var r = function () {
              n.currentTime = Math.max(0, e),
                n.muted = !1,
                n.removeEventListener("timeupdate", r),
                t._wait_play_seek = !1
            };
            n.addEventListener("timeupdate", r, !1),
              i.mediaPlay(n)
          }
      }
      ,
      s.prototype.rewind = function () {
        this._currentTarget && (this._currentTarget.currentTime = Math.max(0, this._playFrom || 0))
      }
      ,
      s.prototype.isPlaying = function () {
        return this._currentTarget ? !this._currentTarget.paused : 1 === this._playState
      }
      ,
      s.prototype.commit = function (e) {
        this._statePending && this._currentTarget && (1 === this._playState ? this.play() : 2 === this._playState ? this.pause() : 3 === this._playState && this.load()),
          r.prototype.commit.call(this, e)
      }
      ,
      n.exports = s
  }),
  define("famous/surfaces/VideoSurface", ["require", "exports", "module", "../core/Surface", "utils/DebugUtils"], function (e, t, n) {
    function s(e) {
      r.apply(this, arguments),
        this.options = Object.create(s.DEFAULT_OPTIONS),
        this._statePending = !1,
        this._videoUrl = undefined,
        this._pending_progress = 0,
        this._ever_load = !1,
        this._ever_play = !1,
        this._just_rewind = !1,
        this._wait_play_seek = !1,
        this._playState = 0,
        this._playFrom = 0,
        this._playTo = -1,
        this._repeatCount = 1,
        this._playRound = null,
        this.setProperties({
          visibility: "hidden"
        }),
        e && this.setOptions(e)
    }
    var r = e("../core/Surface")
      , i = e("utils/DebugUtils");
    s.prototype = Object.create(r.prototype),
      s.prototype.constructor = s,
      s.DEFAULT_OPTIONS = {
        autoplay: !1
      },
      s.prototype.elementType = "video",
      s.prototype.elementClass = "famous-surface",
      s.prototype.setOptions = function (e) {
        e.size && this.setSize(e.size),
          e.classes && this.setClasses(e.classes),
          e.properties && this.setProperties(e.properties),
          e.autoplay && (this.options.autoplay = e.autoplay),
          e.src && (this._videoUrl = e.src,
            this._contentDirty = !0),
          e.repeatCount !== undefined && (this._repeatCount = parseInt(e.repeatCount),
            this._playRound = null,
            delete e.repeatCount),
          e.from !== undefined && (this._playFrom = parseFloat(e.from)),
          e.to !== undefined && (this._playTo = parseFloat(e.to)),
          r.prototype.setOptions.call(this, e)
      }
      ,
      s.prototype.setup = function (e) {
        r.prototype.setup.call(this, e),
          this._currentTarget && (this._currentTarget.src = this._videoUrl,
            this._currentTarget.poster = "styles/nothing_1x1.png",
            this._currentTarget.autoplay = this.options.autoplay,
            this.__show_untilplaying())
      }
      ,
      s.prototype.__show_untilplaying = function () {
        var e = this
          , t = e._currentTarget;
        if (t && (!e._ever_play || e._just_rewind)) {
          var n = function () {
            t.currentTime > 0 && (e._ever_play = !0,
              e._just_rewind = !1,
              e.setProperties({
                visibility: "inherit"
              }),
              e.emit("play"),
              t.removeEventListener("timeupdate", n))
          };
          t.addEventListener("timeupdate", n, !1)
        }
      }
      ,
      s.prototype.load = function (e, t) {
        e === undefined && (e = this._pending_progress),
          this._pending_progress = e;
        if (this._currentTarget) {
          var n = function () {
            this._currentTarget.removeEventListener("loadedmetadata", n, !1),
              this._currentTarget.removeEventListener("error", r, !1),
              e >= 0 && (this._currentTarget.currentTime = e),
              t && t()
          }
            .bind(this)
            , r = function () {
              this._currentTarget.removeEventListener("loadedmetadata", n, !1),
                this._currentTarget.removeEventListener("error", r, !1),
                t && t()
            }
              .bind(this);
          this._ever_load ? n() : (this._currentTarget.addEventListener("loadedmetadata", n, !1),
            this._currentTarget.addEventListener("error", r, !1),
            this._currentTarget.load(),
            this._ever_load = !0)
        }
        return this._statePending = this._currentTarget ? !1 : !0,
          this._playState = 3,
          this
      }
      ,
      s.prototype.play = function () {
        var e = this;
        if (e._currentTarget) {
          var t = e._currentTarget;
          e._playFrom > 0 && t.currentTime < e._playFrom ? e.seekThenPlay(e._playFrom) : i.mediaPlay(t);
          if ((e._repeatCount === 0 || e._repeatCount > 1) && null === e._playRound) {
            e._playRound = e._repeatCount;
            var n = e._playFrom || 0
              , r = function (r) {
                r.type === "timeupdate" && (n > (e._playFrom || 0) && t.currentTime >= n && e.emit("playing", {
                  from: n,
                  to: t.currentTime
                }),
                  n = t.currentTime);
                if (r.type === "ended" || e._playTo > 0 && t.currentTime >= e._playTo)
                  e._repeatCount === 0 || --e._playRound > 0 ? e.seekThenPlay(n = e._playFrom || 0) : (n = e._playFrom || 0,
                    e._playRound = null,
                    r.type !== "ended" && e.pause(),
                    e.emit("play_finish"))
              };
            e.__resetEvents = function () {
              t.removeEventListener("ended", r),
                t.removeEventListener("timeupdate", r)
            }
              ,
              e.__resetEvents(),
              t.addEventListener("ended", r, !1),
              t.addEventListener("timeupdate", r, !1)
          } else {
            var n = e._playFrom || 0
              , r = function (r) {
                r.type === "timeupdate" && (n > (e._playFrom || 0) && t.currentTime >= n && e.emit("playing", {
                  from: n,
                  to: t.currentTime
                }),
                  n = t.currentTime);
                if (r.type === "ended" || e._playTo > 0 && t.currentTime >= e._playTo)
                  n = e._playFrom || 0,
                    r.type !== "ended" && e.pause(),
                    e.emit("play_finish")
              };
            e.__resetEvents = function () {
              t.removeEventListener("ended", r),
                t.removeEventListener("timeupdate", r)
            }
              ,
              e.__resetEvents(),
              t.addEventListener("ended", r, !1),
              t.addEventListener("timeupdate", r, !1)
          }
        }
        return e._statePending = e._currentTarget ? !1 : !0,
          e._playState = 1,
          e
      }
      ,
      s.prototype.pause = function () {
        return this._currentTarget && this._currentTarget.pause(),
          this._statePending = this._currentTarget ? !1 : !0,
          this._playState = 2,
          this
      }
      ,
      s.prototype.getCurrentTime = function () {
        return this._currentTarget ? this._currentTarget.currentTime : 0
      }
      ,
      s.prototype.getDuration = function () {
        return this._currentTarget ? this._currentTarget.duration : 1
      }
      ,
      s.prototype.seek = function (e) {
        this._currentTarget && (this._currentTarget.currentTime = Math.max(0, e))
      }
      ,
      s.prototype.seekThenPlay = function (e) {
        var t = this;
        if (t._wait_play_seek)
          return;
        var n = t._currentTarget;
        if (!!n)
          if (n.duration)
            n.currentTime = Math.max(0, e),
              i.mediaPlay(n);
          else {
            n.muted = !0,
              t._wait_play_seek = !0;
            var r = function () {
              n.currentTime = Math.max(0, e),
                n.muted = !1,
                n.removeEventListener("timeupdate", r),
                t._wait_play_seek = !1
            };
            n.addEventListener("timeupdate", r, !1),
              i.mediaPlay(n)
          }
      }
      ,
      s.prototype.rewind = function () {
        this._currentTarget && (this._currentTarget.currentTime = Math.max(0, this._playFrom || 0),
          this.setProperties({
            visibility: "hidden"
          }),
          this._just_rewind = !0,
          this.__show_untilplaying())
      }
      ,
      s.prototype.isPlaying = function () {
        return this._currentTarget ? !this._currentTarget.paused : 1 === this._playState
      }
      ,
      s.prototype.commit = function (e) {
        this._statePending && this._currentTarget && (1 === this._playState ? this.play() : 2 === this._playState ? this.pause() : 3 === this._playState && this.load()),
          r.prototype.commit.call(this, e)
      }
      ,
      n.exports = s
  }),
  define("famous/math/Utilities", ["require", "exports", "module"], function (e, t, n) {
    var r = {};
    r.clamp = function (t, n) {
      return Math.max(Math.min(t, n[1]), n[0])
    }
      ,
      r.length = function (t) {
        var n = 0;
        for (var r = 0, i = t.length; r < i; r++)
          n += t[r] * t[r];
        return Math.sqrt(n)
      }
      ,
      n.exports = r
  }),
  define("utils/DeviceUtils", ["require", "exports", "module"], function (e, t, n) {
    "use strict";
    var r = {}
      , i = window.navigator.userAgent.toLowerCase()
      , s = function (e) {
        return i.indexOf(e) !== -1
      };
    r.ios = function () {
      return r.iphone() || r.ipod() || r.ipad()
    }
      ,
      r.iphone = function () {
        return !r.windows() && s("iphone")
      }
      ,
      r.iphone6plus = function () {
        var e = window.devicePixelRatio || 1;
        return !r.windows() && s("iphone") && e === 3
      }
      ,
      r.ipod = function () {
        return s("ipod")
      }
      ,
      r.ipad = function () {
        return s("ipad")
      }
      ,
      r.android = function () {
        return !r.windows() && s("android")
      }
      ,
      r.androidPhone = function () {
        return r.android() && s("mobile")
      }
      ,
      r.androidTablet = function () {
        return r.android() && !s("mobile")
      }
      ,
      r.blackberry = function () {
        return s("blackberry") || s("bb10") || s("rim")
      }
      ,
      r.blackberryPhone = function () {
        return r.blackberry() && !s("tablet")
      }
      ,
      r.blackberryTablet = function () {
        return r.blackberry() && s("tablet")
      }
      ,
      r.windows = function () {
        return s("windows")
      }
      ,
      r.windowsPhone = function () {
        return r.windows() && s("phone")
      }
      ,
      r.windowsTablet = function () {
        return r.windows() && s("touch") && !r.windowsPhone()
      }
      ,
      r.fxos = function () {
        return (s("(mobile;") || s("(tablet;")) && s("; rv:")
      }
      ,
      r.fxosPhone = function () {
        return r.fxos() && s("mobile")
      }
      ,
      r.fxosTablet = function () {
        return r.fxos() && s("tablet")
      }
      ,
      r.meego = function () {
        return s("meego")
      }
      ,
      r.cordova = function () {
        return window.cordova && location.protocol === "file:"
      }
      ,
      r.nodeWebkit = function () {
        return typeof window.process == "object"
      }
      ,
      r.mobile = function () {
        return r.androidPhone() || r.iphone() || r.ipod() || r.windowsPhone() || r.blackberryPhone() || r.fxosPhone() || r.meego()
      }
      ,
      r.tablet = function () {
        return r.ipad() || r.androidTablet() || r.blackberryTablet() || r.windowsTablet() || r.fxosTablet()
      }
      ,
      r.desktop = function () {
        return !r.tablet() && !r.mobile()
      }
      ,
      r.television = function () {
        var e, t, n = ["googletv", "viera", "smarttv", "internet.tv", "netcast", "nettv", "appletv", "boxee", "kylo", "roku", "dlnadoc", "roku", "pov_tv", "hbbtv", "ce-html"];
        e = 0;
        while (e < n.length) {
          if (s(n[e]))
            return !0;
          e++
        }
        return !1
      }
      ,
      r.portrait = function () {
        return window.innerHeight / window.innerWidth > 1
      }
      ,
      r.landscape = function () {
        return window.innerHeight / window.innerWidth < 1
      }
      ,
      n.exports = r
  }),
  define("utils/LineNodeUtils", ["require", "exports", "module", "utils/DebugUtils"], function (e, t, n) {
    "use strict";
    var r = e("utils/DebugUtils")
      , i = {};
    i.svgHtmlBy = function (e, t, n, i, s, o, u, a) {
      var f = 4 + s * 2
        , l = r.sprintf("<svg x='0' y='%d' width='%d' height='%d' style='position:absolute; overflow: visible;'>", (a[1] - s) / 2, a[0], s)
        , c = ""
        , h = null;
      if (u) {
        var p = u[0]
          , d = u[1]
          , v = u[2]
          , m = u[3];
        l += "<defs>",
          l += r.sprintf("<filter id='f_%s' filterUnits='userSpaceOnUse' x='%d' y='%d' width='%d' height='%d'>", e, Math.min(p, 0) - f / 2 - v, Math.min(d, 0) - f / 2 - v, a[0] + Math.abs(p) + f + v * 2, s + Math.abs(d) + f + v * 2),
          l += r.sprintf("<feOffset result='offOut' in='SourceGraphic' dx='%d' dy='%d'/>", p, d),
          v !== 0 && (l += r.sprintf("<feGaussianBlur result='blurOut' in='offOut' stdDeviation='%d'/>", v / 2)),
          l += "</filter>",
          l += "</defs>",
          c = r.sprintf("filter='url(#f_%s)'", e),
          h = r.rgba2ColorString(m)
      }
      var g = null;
      o = r.rgba2ColorString(o);
      var y = "";
      1 === t ? y = 3 * s + " " + 3 * s : 2 === t && (y = 10 * s + " " + 10 * s);
      var b = 0
        , w = a[0];
      n === 6 && (b = 6 + s / 2),
        i === 6 && (w = a[0] - 6 - s / 2),
        g = r.sprintf("<line fill='none' stroke='%%s' stroke-width='%d' stroke-dasharray='%s' x1='%d' y1='%d' x2='%d' y2='%d' %%s/>", s, y, b, s / 2, w, s / 2);
      var E = o
        , S = null
        , x = [-f / 2, s / 2 - f / 2, f, f];
      1 === n ? S = r.sprintf("<line fill='none' stroke='%%s' stroke-width='%d' stroke-dasharray='' x1='%d' y1='%d' x2='%d' y2='%d' %%s/>", x[2], x[0], x[1] + x[3] / 2, x[0] + x[2], x[1] + x[3] / 2) : 2 === n ? S = r.sprintf("<path fill='none' stroke='%%s' stroke-width='%d' d='M%d %d L%d %d L%d %d' %%s/>", s, x[0] + x[2], x[1], x[0], x[1] + x[3] / 2, x[0] + x[2], x[1] + x[3]) : 3 === n ? S = r.sprintf("<path fill='%%s' stroke='null' d='M%d %d L%d %d L%d %d Z' %%s/>", x[0] + x[2], x[1], x[0], x[1] + x[3] / 2, x[0] + x[2], x[1] + x[3]) : 4 === n ? S = r.sprintf("<path fill='%%s' stroke='null' d='M%d %d L%d %d L%d %d L%d %d Z' %%s/>", x[0] + x[2], x[1], x[0], x[1] + x[3] / 2, x[0] + x[2], x[1] + x[3], x[0] + x[2] / 2, x[1] + x[3] / 2) : 5 === n ? S = r.sprintf("<circle fill='%%s' stroke='null' cx='%d' cy='%d' r='%d' %%s/>", x[0] + x[2] / 2, x[1] + x[3] / 2, x[2] / 2) : 6 === n ? S = r.sprintf("<circle fill='none' stroke='%%s' stroke-width='%d' cx='%d' cy='%d' r='%d' %%s/>", s, x[0] + x[2] / 2, x[1] + x[3] / 2, x[2] / 2) : 7 === n && (S = r.sprintf("<path fill='%%s' stroke='null' d='M%d %d L%d %d L%d %d Z' %%s/>", x[0], x[1], x[0] + x[2], x[1] + x[3] / 2, x[0], x[1] + x[3]));
      var T = null;
      return x = [a[0] - f / 2, s / 2 - f / 2, f, f],
        1 === i ? T = r.sprintf("<line fill='none' stroke='%%s' stroke-width='%d' stroke-dasharray='' x1='%d' y1='%d' x2='%d' y2='%d' %%s/>", x[2], x[0], x[1] + x[3] / 2, x[0] + x[2], x[1] + x[3] / 2) : 2 === i ? T = r.sprintf("<path fill='none' stroke='%%s' stroke-width='%d' d='M%d %d L%d %d L%d %d' %%s/>", s, x[0], x[1], x[0] + x[2], x[1] + x[3] / 2, x[0], x[1] + x[3]) : 3 === i ? T = r.sprintf("<path fill='%%s' stroke='null' d='M%d %d L%d %d L%d %d Z' %%s/>", x[0], x[1], x[0] + x[2], x[1] + x[3] / 2, x[0], x[1] + x[3]) : 4 === i ? T = r.sprintf("<path fill='%%s' stroke='null' d='M%d %d L%d %d L%d %d L%d %d Z' %%s/>", x[0], x[1], x[0] + x[2], x[1] + x[3] / 2, x[0], x[1] + x[3], x[0] + x[2] / 2, x[1] + x[3] / 2) : 5 === i ? T = r.sprintf("<circle fill='%%s' stroke='null' cx='%d' cy='%d' r='%d' %%s/>", x[0] + x[2] / 2, x[1] + x[3] / 2, x[2] / 2) : 6 === i ? T = r.sprintf("<circle fill='none' stroke='%%s' stroke-width='%d' cx='%d' cy='%d' r='%d' %%s/>", s, x[0] + x[2] / 2, x[1] + x[3] / 2, x[2] / 2) : 7 === i && (T = r.sprintf("<path fill='%%s' stroke='null' d='M%d %d L%d %d L%d %d Z' %%s/>", x[0] + x[2], x[1], x[0], x[1] + x[3] / 2, x[0] + x[2], x[1] + x[3])),
        null !== h && (l += r.sprintf(g, h, c),
          l += r.sprintf(S, h, c),
          l += r.sprintf(T, h, c)),
        l += r.sprintf(g, o, ""),
        l += r.sprintf(S, E, ""),
        l += r.sprintf(T, E, ""),
        l += "</svg>",
        l
    }
      ,
      n.exports = i
  }),
  define("tools/MetNodeFactory", ["require", "exports", "module", "famous/core/Engine", "famous/utilities/Timer", "views/MetNodeView", "famous/core/Surface", "famous/surfaces/InputSurface", "famous/surfaces/TextareaSurface", "famous/surfaces/IframeSurface", "famous/surfaces/ImageSurface", "famous/surfaces/AudioSurface", "famous/surfaces/VideoSurface", "famous/surfaces/CanvasSurface", "famous/surfaces/ContainerSurface", "famous/transitions/Transitionable", "famous/core/Modifier", "famous/utilities/Utility", "famous/math/Utilities", "utils/DebugUtils", "utils/DeviceUtils", "utils/TextUtils", "utils/LineNodeUtils", "utils/ShapeNodeUtils", "utils/EasingUtils", "famous/core/Transform", "utils/TransformUtils", "actions/MetNodeAction", "actions/MetHook", "famous/core/EventHandler", "famous/modifiers/ModifierChain"], function (e, t, n) {
    "use strict";
    function F() {
      this.allNodes = {},
        this.audioNodes = {},
        this.videoNodes = {}
    }
    function I(e) {
      return !e || e.type !== "MetStateNode" || 24 !== e.nodeDesc.transition && 25 !== e.nodeDesc.transition ? !1 : !0
    }
    function q(t, n, r) {
      var i = e("famous/modifiers/ModifierChain")
        , s = 25 === r
        , u = t.containerSurface
        , a = undefined
        , f = undefined
        , l = "gray"
        , c = undefined
        , h = undefined
        , p = "gray"
        , d = undefined
        , v = t.nodeDesc
        , g = t.size
        , y = v.colorFill || {}
        , w = v.imageFill || {};
      s ? f = [g[0] * (w.thick || .25), g[1]] : f = [g[0], g[1] * (w.thick || .25)],
        a || (a = f),
        y.fillColor && (l = b.rgba2ColorString(y.fillColor));
      if (w.rawImageURL && w.rawImageURL.length > 0) {
        var E = b.normalizeUrl(w.rawImageURL);
        s ? c = {
          backgroundImage: "url('" + E + "')",
          backgroundSize: "auto 100%",
          backgroundPosition: "center left"
        } : c = {
          backgroundImage: "url('" + E + "')",
          backgroundSize: "100% auto",
          backgroundPosition: "top center"
        }
      }
      var g = [n.sizeX || 0, n.sizeY || 0]
        , y = n.colorFill || {}
        , w = n.imageFill || {};
      s ? h = [g[0] * (w.thick || .25), g[1]] : h = [g[0], g[1] * (w.thick || .25)],
        a || (a = h),
        y.fillColor && (p = b.rgba2ColorString(y.fillColor));
      if (w.rawImageURL && w.rawImageURL.length > 0) {
        var E = b.normalizeUrl(w.rawImageURL);
        s ? d = {
          backgroundImage: "url('" + E + "')",
          backgroundSize: "auto 100%",
          backgroundPosition: "center left"
        } : d = {
          backgroundImage: "url('" + E + "')",
          backgroundSize: "100% auto",
          backgroundPosition: "top center"
        }
      }
      t.earSize = a || f || h,
        u.addClass("p3d");
      var S = undefined
        , x = new i
        , T = new m({
          origin: s ? [0, .5] : [.5, 0],
          align: s ? [0, .5] : [.5, 0],
          transform: s ? N.rotateY(Math.PI / 2) : N.rotateX(-Math.PI / 2)
        });
      x.addModifier(T);
      var C = new o({
        size: f,
        properties: {
          backgroundColor: l,
          overflow: "hidden",
          zIndex: 3
        },
        attributes: {
          no_pp: !0
        }
      });
      c && C.setProperties(c),
        u.add(x).add(C),
        S = C;
      var k = undefined
        , x = new i
        , T = new m({
          origin: s ? [1, .5] : [.5, 1],
          align: s ? [1, .5] : [.5, 1],
          transform: s ? N.rotateY(-Math.PI / 2) : N.rotateX(Math.PI / 2)
        });
      x.addModifier(T);
      var C = new o({
        size: h,
        properties: {
          backgroundColor: p,
          overflow: "hidden",
          zIndex: 3
        },
        attributes: {
          no_pp: !0
        }
      });
      d && C.setProperties(d),
        u.add(x).add(C),
        k = C,
        t.cuboic_update_by_options = function (e) {
          S.setProperties({
            display: e.cuboic.showA ? "" : "none"
          }),
            k.setProperties({
              display: e.cuboic.showB ? "" : "none"
            })
        }
    }
    function R(e, t, n, r) {
      var i = "<div style='display:table;width:100%;height:100%;'><div style='display:table-cell;width:100%;height:100%;";
      B === n ? i += " vertical-align: middle; overflow:hidden;" : j === n ? i += " vertical-align: bottom; overflow:hidden;" : i += " vertical-align: top; overflow:hidden;",
        i += "'>",
        t && t.length > 0 && (r.length > 0 && (r[0].length = t.length),
          i += E.parseBlocks2Html(t, r)),
        i += "</div></div>",
        e.setContent(i)
    }
    function U(e) {
      var t = e.dataSourceID;
      if (!t)
        return;
      var n = function (e, n) {
        var r = {};
        for (var i = 0, s = e.length; i < s; i++) {
          var o = e[i];
          r[o.FieldId] = o.DefaultValue
        }
        for (var i = 0, s = n.length; i < s; i++) {
          var u = n[i];
          if (!u.dataSourceID || u.dataSourceID !== t || !u.dataFieldID) {
            u.type === "ShapeNode" && u.preloadMetSubNode(!0);
            continue
          }
          var a = r[u.dataFieldID];
          if (a) {
            var f = u.mainSurface;
            if (u.type === "ShapeNode")
              u.nodeDesc.imageFill.rawImageURL = a,
                u.preloadMetSubNode(!0);
            else if (u.type === "MetTextNode") {
              u.nodeDesc.text = a;
              var l = u.nodeDesc.textExportType || 0;
              if (l === 1) {
                var c = u.nodeDesc.verticalAlignment || 0
                  , h = u.nodeDesc.blocks || [];
                R(f, a, c, h)
              } else
                (l === 2 || l === 3) && f.setPlaceholder(a)
            } else
              u.type === "AudioNode" ? (u.nodeDesc.audioURL = a,
                f.setAttributes({
                  src: a
                })) : u.type === "VideoNode" && (u.nodeDesc.videoURL = a,
                  f.setAttributes({
                    src: a
                  }))
          }
        }
      }
        , r = function (e) {
          var n = []
            , r = e instanceof Array ? e : e.metNodes
            , i = null;
          while (r && r.length > 0) {
            i = [];
            for (var s = 0, o = r.length; s < o; s++) {
              var u = r[s];
              u.dataSourceID && u.dataSourceID === t && u.dataFieldID && n.push(u);
              var a = u.metNodes;
              for (var f = 0, l = a.length; f < l; f++)
                i.push(a[f])
            }
            r = i,
              i = null
          }
          return n
        }
        , i = function (e, t, n, r, i) {
          e.class = "MetNode",
            e.name = "DataListLine" + t + n,
            e.dataSourceID = r;
          var s = e.nodes
            , o = null;
          while (s && s.length > 0) {
            o = [];
            for (var u = 0, a = s.length; u < a; u++) {
              var f = s[u];
              f.id_ = "_" + f.id_ + "_" + t + "_" + n + "_" + u,
                f.dataFieldID && (f.dataSourceID = r),
                f.actions && f.actions.length > 0 && (f.listTargetUrl = i);
              var l = f.nodes || [];
              for (var c = 0, h = l.length; c < h; c++)
                o.push(l[c])
            }
            s = o,
              o = null
          }
          return e
        };
      if (e.type === "MetDataRecordNode") {
        e.preloadState = 1;
        var s = O.sharedInstance();
        s.initialLoading !== null && s.initialLoading.push(e),
          g.loadURL(window.GlobalData.serverBaseUrl + "/api/data/record/info/" + t, 0, function (t) {
            if (!t || t.length <= 0) {
              e.preloadState = -1;
              return
            }
            var i = JSON.parse(t);
            if (!i.isSuc) {
              e.preloadState = -1;
              return
            }
            var s = i.result
              , o = r(e);
            n(s, o),
              e.preloadState = 2
          })
      } else if (e.type !== "MetDataFormNode" && e.type === "MetDataListNode") {
        e.preloadState = 1;
        var s = O.sharedInstance();
        s.initialLoading !== null && s.initialLoading.push(e);
        var o = 1
          , u = 10;
        g.loadURL(window.GlobalData.serverBaseUrl + "/api/data/result/list/" + o + "/" + u + "/" + t, 0, function (r) {
          if (!r || r.length <= 0) {
            e.preloadState = -1;
            return
          }
          var s = JSON.parse(r);
          if (!s.isSuc) {
            e.preloadState = -1;
            return
          }
          var o = e.metNodes;
          for (var u = 0, a = o.length; u < a; u++) {
            var f = o[u];
            f.deactiveMetSubNode(),
              f.setIframesVisiblity(!1),
              f.cleanMetSubNode()
          }
          e.metNodes = [];
          var l = F.sharedInstance()
            , c = e.metNodeId
            , h = e.size
            , p = e.nodeDesc.scrollDirection || 0
            , d = e.childrenHolder
            , v = e.nodeDesc.lineOffset || 0
            , m = e.nodeDesc.lineSize || e.nodeDesc.sizeY
            , y = e.nodeDesc.nodes
            , b = s.result.Items;
          p === 0 ? d.setOptions({
            size: [h[0], Math.max(h[1], b.length * (v + m))]
          }) : d.setOptions({
            size: [Math.max(h[0], b.length * (v + m)), h[1]]
          });
          for (var u = 0, a = b.length; u < a; u++) {
            var w = b[u]
              , E = []
              , S = JSON.parse(w.Result);
            for (var x in S)
              x.slice(0, 5) === "cellz" && E.push({
                FieldId: x.substring(5),
                DefaultValue: S[x]
              });
            var T = [];
            for (var N = 0, C = y.length; N < C; N++) {
              var k = g.clone(y[N]);
              k = i(k, u, N, t, S.url);
              var L = l.makeMetNode(k, h);
              p === 0 ? L.setPositionPixels(k.positionX, k.positionY + u * (v + m)) : L.setPositionPixels(k.positionX + u * (v + m), k.positionY),
                e.addSubMetNode(L),
                L.initMetSubNode(d, e),
                T.push(L),
                L.actived = e.actived
            }
            for (var N = 0, C = T.length; N < C; N++) {
              var L = T[N];
              n(E, L.metNodes)
            }
          }
          e.preloadState = 2
        })
      }
    }
    function z(e) {
      if (e.dataFieldName === "_weixin_username") {
        var t = b.getCurrentUrlParam("nickname")
          , n = e.mainSurface;
        if (e.type === "MetTextNode") {
          t && (t = decodeURIComponent(t)),
            e.nodeDesc.text = t;
          var r = e.nodeDesc.textExportType || 0;
          if (r === 1) {
            var i = e.nodeDesc.verticalAlignment || 0
              , s = e.nodeDesc.blocks || [];
            R(n, t, i, s)
          } else
            (r === 2 || r === 3) && n.setPlaceholder(t)
        }
      } else {
        if (e.dataFieldName !== "_weixin_icon")
          return;
        var t = b.getCurrentUrlParam("headimg")
          , n = e.mainSurface;
        e.type === "ShapeNode" && (t && (t = decodeURIComponent(t)),
          e.nodeDesc.imageFill.rawImageURL = t,
          e.preloadMetSubNode(!0))
      }
      e.dataSourceID = null,
        e.dataFieldID = null
    }
    function W(e) {
      var t = e.nodeDesc.positionX
        , n = e.nodeDesc.positionY
        , r = e.nodeDesc.scaleX || 1
        , i = e.nodeDesc.scaleY || 1
        , s = e.nodeDesc.rotation || 0
        , o = b.valueOrDefault(e.nodeDesc.anchorX, .5)
        , u = b.valueOrDefault(e.nodeDesc.anchorY, .5);
      return [t, n, r, i, s, o, u]
    }
    function X(e, t) {
      e.setPositionPixels(t[0], t[1]),
        e.setMetNodeScaleX(t[2]),
        e.setMetNodeScaleY(t[3]),
        e.setMetNodeRotateZ(t[4]),
        e.setMetNodeAnchorX(t[5]),
        e.setMetNodeAnchorY(t[6])
    }
    function V(e, t) {
      var n = e.containerSurface || e.mainSurface
        , r = C.transformFromElement(n._currentTarget, document.body)
        , i = C.transformFromElement(n._currentTarget.offsetParent, document.body)
        , s = C.pointApplyTransform(t, r)
        , o = e.nodeDesc.sizeX || 0
        , u = e.nodeDesc.sizeY || 0;
      e.setMetNodeAnchorX(s[0] / o),
        e.setMetNodeAnchorY(s[1] / u);
      var s = C.pointApplyTransform(t, i);
      e.setPositionPixels(s[0], s[1])
    }
    function $(e, t, n) {
      var r = e.containerSurface || e.mainSurface
        , i = C.elementSize(r._currentTarget.offsetParent)
        , s = e.nodeDesc.sizeX * e.scaleX
        , o = e.nodeDesc.sizeY * e.scaleY
        , u = e.originX
        , a = e.originY;
      return s < i[0] ? t - s * u < 0 ? t = s * u : t + s * (1 - u) > i[0] && (t = i[0] - s * (1 - u)) : t - s * u > 0 ? t = s * u : t + s * (1 - u) < i[0] && (t = i[0] - s * (1 - u)),
        o < i[1] ? n - o * a < 0 ? n = o * a : n + o * (1 - a) > i[1] && (n = i[1] - o * (1 - a)) : n - o * a > 0 ? n = o * a : n + o * (1 - a) < i[1] && (n = i[1] - o * (1 - a)),
        [t, n]
    }
    function J(e, t) {
      e && t.name.indexOf("_T") === 0 && e.setProperties({
        pointerEvents: "auto"
      })
    }
    function K(e, t) {
      e.beginPath();
      for (var n = 0, r = t.length; n < r; n++) {
        var i = t[n];
        if (i === "X")
          break;
        var s = i.split(" ")
          , o = s[0];
        o === "M" && e.moveTo(Math.round(s[1]), Math.round(s[2])),
          o === "L" && e.lineTo(Math.round(s[1]), Math.round(s[2])),
          o === "C" && e.bezierCurveTo(Math.round(s[1]), Math.round(s[2]), Math.round(s[3]), Math.round(s[4]), Math.round(s[5]), Math.round(s[6]))
      }
      e.closePath()
    }
    var r = e("famous/core/Engine")
      , i = e("famous/utilities/Timer")
      , s = e("views/MetNodeView")
      , o = e("famous/core/Surface")
      , u = e("famous/surfaces/InputSurface")
      , a = e("famous/surfaces/TextareaSurface")
      , f = e("famous/surfaces/IframeSurface")
      , l = e("famous/surfaces/ImageSurface")
      , c = e("famous/surfaces/AudioSurface")
      , h = e("famous/surfaces/VideoSurface")
      , p = e("famous/surfaces/CanvasSurface")
      , d = e("famous/surfaces/ContainerSurface")
      , v = e("famous/transitions/Transitionable")
      , m = e("famous/core/Modifier")
      , g = e("famous/utilities/Utility")
      , y = e("famous/math/Utilities")
      , b = e("utils/DebugUtils")
      , w = e("utils/DeviceUtils")
      , E = e("utils/TextUtils")
      , S = e("utils/LineNodeUtils")
      , x = e("utils/ShapeNodeUtils")
      , T = e("utils/EasingUtils")
      , N = e("famous/core/Transform")
      , C = e("utils/TransformUtils")
      , k = e("actions/MetNodeAction")
      , L = e("actions/MetHook")
      , A = e("famous/core/EventHandler")
      , O = e(["animations/PageAnim"], function (e) {
        O = e
      })
      , M = 0
      , _ = 1
      , D = 2
      , P = 3
      , H = 0
      , B = 1
      , j = 2;
    F.prototype.makeMetNode = function (e, t) {
      if (e.name === undefined || e.name === null)
        e.name = "";
      var n = e.positionX
        , f = e.positionY
        , l = e.class
        , g = e.id_
        , w = e.id_
        , A = b.valueOrDefault(e.visible, !0)
        , P = b.valueOrDefault(e.opacity, 1)
        , H = b.valueOrDefault(e.scaleX, 1)
        , B = b.valueOrDefault(e.scaleY, 1)
        , j = e.skewX || 0
        , F = e.skewY || 0
        , K = b.valueOrDefault(e.anchorX, .5)
        , Q = b.valueOrDefault(e.anchorY, .5)
        , G = e.rotation || 0
        , Y = e.jpath || null
        , Z = [e.sizeX, e.sizeY]
        , et = ["z1"]
        , tt = "rgba(0, 0, 0, 0)"
        , nt = b.valueOrDefault(e.fillType, 3);
      2 === nt && (e.imageFill || (nt = 3)),
        e.colorFill && (tt = b.rgba2ColorString(e.colorFill.fillColor));
      var rt = e.nodeShadow || null
        , it = 0
        , st = 0
        , ot = 0
        , ut = "";
      null !== rt && (it = b.valueOrDefault(rt.shadowOffset, 1) * Math.cos(rt.shadowAngle || 0),
        st = b.valueOrDefault(rt.shadowOffset, 1) * Math.sin(rt.shadowAngle || 0),
        ot = b.valueOrDefault(rt.shadowWidth, 1),
        it !== 0 || st !== 0 || ot !== 0 ? ut = b.rgba2ColorString(rt.shadowColor) : rt = null);
      var at = e.nodeStroke || null
        , ft = 0
        , lt = ""
        , ct = 0
        , ht = 0;
      null !== at && (ft = b.valueOrDefault(at.strokeWidth, 1),
        0 !== ft ? (lt = b.rgba2ColorString(at.strokeColor),
          ct = at.strokeLineType || 0,
          ht = at.strokeType || 0) : at = null);
      var pt = e.actions || [];
      for (var dt = 0, vt = pt.length; dt < vt; dt++)
        pt[dt].sourceID = e.id_;
      var mt = null;
      if (l === "MetDataListNode") {
        var gt = new k;
        gt.actionType = k.MetNodeActionTypeScroll,
          mt = [gt]
      } else
        mt = k.parseActionsFromArray(pt);
      if (l === "MetAnimNode")
        e.beginningKeyframe !== undefined && (e.beginningKeyframe = Math.max(0, Math.min(e.keyframes.length - 1, e.beginningKeyframe))),
          e.keyframes.length < 2 && (e.originClass = l,
            l = e.class = "MetNode");
      else if (l === "MetStateNode") {
        e.defaultState !== undefined && (e.defaultState = Math.max(0, Math.min(e.nodes.length - 1, e.defaultState)));
        if (e.nodes.length < 2) {
          e.originClass = l,
            l = e.class = "MetNode";
          for (var yt = 0, bt = e.nodes.length; yt < bt; yt++) {
            var wt = e.nodes[yt];
            wt.class = "MetNode"
          }
        }
      }
      var Et = new s({
        size: Z,
        metNodeId: w,
        opacity: P,
        visible: A,
        positionX: n,
        positionY: f,
        scaleX: H,
        scaleY: B,
        skewX: j,
        skewY: F,
        anchorX: K,
        anchorY: Q,
        rotation: G,
        containerSize: t,
        type: l,
        nodeDescription: e
      });
      Et.nodeActions = mt,
        Et.dataSourceID = e.dataSourceID || null,
        Et.dataFieldID = e.dataFieldID || null,
        Et.dataFieldName = e.dataFieldName || null,
        Et.dataFieldType = e.textBoxType || null;
      var St = null
        , xt = null
        , Tt = null
        , Nt = null
        , Ct = null
        , kt = b.hasOverflowBug();
      if (l === "ShapeNode") {
        if (e.dataSourceID)
          e.imageFill = {
            rawImageURL: "",
            fillType: 2
          };
        else if (nt === D && e.name.indexOf("_weixin_icon") === 0) {
          var Lt = b.getCurrentUrlParam("headimg");
          Lt && e.imageFill && (e.imageFill.rawImageURL = decodeURIComponent(Lt))
        }
        if (k.hasEraseOneInActions(mt))
          St = new p({
            size: Z,
            classes: et,
            properties: {}
          });
        else if (!Y || Y.length === 0) {
          St = new o({
            size: Z,
            classes: et,
            properties: {}
          });
          if (nt !== D) {
            St.setProperties({
              backgroundColor: tt
            });
            var At = e.radiusTL || 0
              , Ot = e.radiusTR || 0
              , Mt = e.radiusBR || 0
              , _t = e.radiusBL || 0;
            (At !== 0 || Ot !== 0 || Mt !== 0 || _t !== 0) && St.setProperties({
              borderRadius: b.sprintf("%dpx %dpx %dpx %dpx", At, Ot, Mt, _t)
            })
          }
        } else {
          var Dt = null;
          null !== at && (Dt = [ft, at.strokeColor, ct, ht]);
          var Pt = null;
          if (D === nt) {
            var Ht = b.normalizeUrl(e.imageFill.rawImageURL)
              , Bt = x.numsFromNumString(e.imageFill.imageRect);
            Bt || (Bt = [0, 0, Z[0], Z[1]]);
            var jt = e.imageFlipX || !1
              , Ft = e.imageFlipY || !1;
            Pt = {
              type: nt,
              area: Bt,
              url: Ht,
              flipX: jt,
              flipY: Ft
            }
          } else
            _ === nt ? Pt = {
              type: nt,
              gradient: e.gradientFill
            } : M === nt ? Pt = {
              type: nt,
              color: e.colorFill.fillColor
            } : Pt = {
              type: M,
              color: [1, 1, 1, 1]
            };
          var It = null;
          null !== rt && (It = [it, st, ot, rt.shadowColor]);
          var qt = x.svgHtmlBy(w, Y, Dt, Pt, It, Z);
          St = new o({
            size: Z,
            classes: et,
            content: qt,
            properties: {}
          })
        }
      }
      if (l === "MetLineNode") {
        var Rt = e.lineStyle || 0
          , Ut = e.lineStartStyle || 0
          , zt = e.lineEndStyle || 0
          , Wt = b.valueOrDefault(e.lineWidth, 1)
          , Xt = e.color
          , Vt = S.svgHtmlBy(w, Rt, Ut, zt, Wt, Xt, null === rt ? null : [it, st, ot, rt.shadowColor], Z);
        Z = [Z[0], Wt],
          St = new o({
            size: Z,
            classes: et,
            content: Vt,
            properties: {}
          })
      }
      if (l === "MetScrollNode" || l === "MetStateNode" || l === "MetAnimNode" || l === "ButtonNode" || l === "VideoNode" || l === "MetNode" || l === "MetMaskNode" || l === "MetClipNode" || l === "MetFlexBoxNode" || l === "MetMotionBoxNode" || l === "MetDataListNode" || l === "MetDataRecordNode" || l === "MetDataFormNode") {
        Ct = new d({
          size: Z,
          classes: et,
          hasInnerStatic: kt,
          properties: {
            overflow: "hidden"
          }
        });
        var $t = e.originClass;
        $t !== "MetStateNode" && $t !== "MetAnimNode" && (l === "MetNode" || l === "MetDataRecordNode" || l === "MetDataFormNode" || l === "MetAnimNode") && Ct.setProperties({
          overflow: "visible"
        })
      }
      l === "MetStateKeyframeNode" && (Ct = new d({
        size: t,
        classes: et,
        properties: {
          overflow: "visible"
        }
      })),
        "MetAnimNode" === l && (e.smartAnimData && (Tt = new d({
          size: [undefined, undefined],
          hasInnerStatic: kt,
          properties: {
            overflow: "visible"
          }
        }),
          Nt = new d({
            size: [undefined, undefined],
            hasInnerStatic: kt,
            properties: {
              overflow: "visible"
            }
          })),
          xt = new d({
            size: [undefined, undefined],
            hasInnerStatic: kt,
            properties: {
              overflow: "hidden"
            }
          }));
      if ("AudioNode" === l) {
        e.dataSourceID && (e.audioURL = "");
        var Jt = b.normalizeUrl(e.audioURL);
        St = new c({
          size: Z,
          classes: et,
          attributes: {
            src: Jt
          },
          properties: {
            visibility: "hidden"
          }
        });
        var Kt = e.endlessLoop || !1
          , Qt = Kt ? 0 : b.valueOrDefault(e.repeatCount, 1);
        St.setOptions({
          repeatCount: Math.max(0, Qt)
        }),
          St.on("play_finish", function () {
            if (Et.nodeActions.length > 0) {
              var e = Et.nodeActions[0];
              k.MetNodeActionNop === e.actionType && e.executePerforms(Et)
            }
          }),
          St.on("play", function () {
            if (Et.nodeActions.length > 1) {
              var e = Et.nodeActions[1];
              k.MetNodeActionNop === e.actionType && e.executePerforms(Et)
            }
          }),
          St.on("pause", function () {
            if (Et.nodeActions.length > 2) {
              var e = Et.nodeActions[2];
              k.MetNodeActionNop === e.actionType && e.executePerforms(Et)
            }
          })
      }
      if ("VideoNode" === l) {
        e.dataSourceID && (e.videoURL = "");
        var Gt = b.normalizeUrl(e.videoURL);
        St = new h({
          size: Z,
          classes: et,
          src: Gt,
          attributes: {},
          properties: {
            backgroundColor: "transparent"
          }
        }),
          e.fullScreen ? b.isAndroidDevice() && St.setAttributes({
            "x5-video-player-type": "h5"
          }) : (St.setAttributes({
            "webkit-playsinline": !0
          }),
            St.setAttributes({
              playsinline: !0
            }),
            b.isAndroidDevice() && St.setAttributes({
              "x5-video-player-type": "h5-page"
            }));
        if (e.showCtrls) {
          St.setProperties({
            pointerEvents: "auto"
          });
          if (!b.isAndroidDevice())
            St.setAttributes({
              controls: !0
            });
          else {
            var Yt = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled
              , Zt = "";
            Yt ? Zt = "<div class='vplayer__controls'><div class='gradient'></div><button class='left_button play'></button><div class='progress'><div class='progress__filled'></div></div><button class='right_button'></button></div>" : Zt = "<div class='vplayer__controls'><div class='gradient'></div><button class='left_button play'></button><div class='progress no_full'><div class='progress__filled'></div></div></div>";
            var en = new o({
              size: Z,
              classes: et,
              content: Zt,
              properties: {
                backgroundColor: "transparent"
              }
            });
            Ct.add(en);
            var tn = !1
              , nn = !1
              , rn = !1
              , sn = !1
              , on = function (e) {
                e.preventDefault(),
                  e.stopPropagation(),
                  e.target.className.indexOf("left_button") !== -1 ? tn = !0 : e.target.className.indexOf("right_button") !== -1 ? nn = !0 : e.target.className.indexOf("progress") !== -1 && (rn = !0)
              }
              , un = function (e) {
                e.preventDefault(),
                  e.stopPropagation(),
                  tn || nn || rn && (sn = !0,
                    fn(e))
              }
              , an = function (e) {
                e.preventDefault(),
                  e.stopPropagation();
                if (tn)
                  St.isPlaying() ? St.pause() : St.play();
                else if (nn) {
                  if (Yt) {
                    var t = St._currentTarget;
                    t.requestFullscreen ? t.requestFullscreen() : t.webkitRequestFullScreen ? t.webkitRequestFullScreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.msRequestFullscreen && t.msRequestFullscreen()
                  }
                } else
                  rn && (sn || fn(e));
                tn = !1,
                  nn = !1,
                  rn = !1,
                  sn = !1
              }
              , fn = function (e) {
                var t = en._currentTarget.querySelector(".progress__filled")
                  , n = St.getSize()[0] - 96;
                if (t && n > 0) {
                  var r = C.absolutePos4Event(e)
                    , i = C.transformFromElement(t, document.body);
                  r = C.pointApplyTransform(r, i);
                  var s = r[0] / n * St.getDuration();
                  St.seek(s)
                }
              }
              , ln = function (e) {
                var t = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
                (!St._currentTarget || St._currentTarget === t) && e.stopPropagation()
              };
            en.on("touchstart", on),
              en.on("touchmove", un),
              en.on("touchcancel", an),
              en.on("touchend", an),
              St.on("touchstart", ln),
              St.on("touchmove", ln),
              St.on("touchcancel", ln),
              St.on("touchend", ln),
              St.on("playing", function () {
                var e = en._currentTarget.querySelector(".left_button");
                e.className = "left_button pause"
              }),
              St.on("pause", function () {
                var e = en._currentTarget.querySelector(".left_button");
                e.className = "left_button play"
              }),
              St.on("timeupdate", function () {
                var e = en._currentTarget.querySelector(".progress__filled");
                if (e) {
                  var t = St.getCurrentTime() / St.getDuration() * 100;
                  e.style.width = t + "%"
                }
              })
          }
        }
        var Kt = e.endlessLoop || !1
          , Qt = Kt ? 0 : b.valueOrDefault(e.repeatCount, 1);
        St.setOptions({
          repeatCount: Math.max(0, Qt)
        }),
          St.on("play_finish", function () {
            if (Et.nodeActions.length > 0) {
              var e = Et.nodeActions[0];
              k.MetNodeActionNop === e.actionType && e.executePerforms(Et)
            }
          }),
          St.on("play", function () {
            if (Et.nodeActions.length > 1) {
              if (Et.mainSurface.properties.visibility === "hidden")
                return;
              var e = Et.nodeActions[1];
              k.MetNodeActionNop === e.actionType && e.executePerforms(Et)
            }
          }),
          St.on("pause", function () {
            if (Et.nodeActions.length > 2) {
              var e = Et.nodeActions[2];
              k.MetNodeActionNop === e.actionType && e.executePerforms(Et)
            }
          })
      }
      if ("WebNode" === l) {
        var cn, hn, pn = e.webType;
        if (pn === 2)
          cn = hn = e.URL,
            St = new o({
              size: Z,
              classes: et,
              content: cn,
              properties: {
                backgroundColor: "white"
              }
            });
        else {
          var dn = b.normalizeUrl(e.URL)
            , vn = "-webkit-user-select:text;-moz-user-select:text;pointer-events:auto;border:none;background:none;";
          cn = "<iframe width='100%' height='100%' src='" + dn + "' style='" + vn + "display:block;'></iframe>",
            hn = "<iframe width='100%' height='100%' src='" + dn + "' style='" + vn + "display:none;'></iframe>",
            St = new o({
              size: Z,
              classes: et,
              content: hn,
              attributes: {
                name: "ifn_" + w,
                src: dn
              },
              properties: {
                border: "none",
                background: "none",
                overflow: "auto",
                webkitOverflowScrolling: "touch"
              }
            });
          var mn = O.sharedInstance();
          mn.initGlobalEventTrap(St)
        }
        St.reload_content_ = function (e) {
          var t = e ? cn : hn;
          t && (St.setContent(t),
            St._contentDirty = !0)
        }
      }
      if (l === "MetTextNode") {
        var gn = e.textExportType || 0
          , yn = e.verticalAlignment || 0
          , bn = b.rgba2ColorString(e.color || 0)
          , wn = e.blocks || [];
        if (e.dataSourceID)
          gn === 1 && (e.text = "");
        else if (e.name.indexOf("_weixin_username") === 0) {
          var Lt = b.getCurrentUrlParam("nickname");
          Lt && (e.text = decodeURIComponent(Lt))
        }
        if (gn === 1)
          St = new o({
            size: Z,
            classes: et,
            properties: {
              backgroundColor: bn
            }
          }),
            R(St, e.text, yn, wn);
        else if (gn === 2) {
          St = new u({
            size: Z,
            classes: et,
            placeholder: e.text,
            attributes: {
              tabindex: -1,
              spellcheck: !1
            },
            properties: {
              backgroundColor: bn,
              pointerEvents: "auto",
              webkitUserSelect: "text",
              userSelect: "text",
              borderStyle: "none"
            }
          });
          var En = E.parseFirstBlock2Properties(wn);
          St.setProperties(En)
        } else if (gn === 3) {
          St = new a({
            size: Z,
            classes: et,
            placeholder: e.text,
            attributes: {
              tabindex: -1,
              spellcheck: !1
            },
            properties: {
              backgroundColor: bn,
              pointerEvents: "auto",
              webkitUserSelect: "text",
              userSelect: "text",
              borderStyle: "none"
            }
          });
          var En = E.parseFirstBlock2Properties(wn);
          St.setProperties(En)
        }
        var Sn = function (e) {
          var t = 0;
          if (null !== at) {
            var n = [-ft, 0, -ft / 2];
            e.setProperties({
              outline: b.sprintf("%dpx %s %s", ft, ct === 0 ? "solid" : "dotted", lt),
              outlineOffset: b.sprintf("%dpx", n[ht])
            }),
              t = n[ht] + ft
          } else
            e.setProperties({
              outline: "none",
              outlineOffset: "0px"
            });
          if (null !== rt) {
            var r = b.sprintf("%dpx %dpx %dpx %dpx %s", it, st, ot, t, ut);
            e.setProperties({
              webkitAppearance: "none",
              appearance: "none",
              webkitBoxShadow: r,
              boxShadow: r
            })
          }
        }
          , xn = e.colorExpand;
        if (gn === 2 || gn === 3) {
          St.on("blur", function () {
            xn || Sn(St),
              document.body.scrollTop = 0,
              window.pageYOffset = 0,
              document.documentElement.scrollTop = 0
          }),
            St.on("focus", function () {
              St.setProperties({
                outline: "none",
                outlineOffset: "0px"
              }),
                xn || Sn(St);
              var e = O.sharedInstance();
              e.activeNodeView = Et
            });
          var mn = O.sharedInstance();
          mn.initGlobalEventTrap(St)
        }
        var Tn;
        if (xn) {
          Ct = new d({
            size: Z,
            classes: et,
            properties: {
              overflow: "visible"
            }
          });
          var Nn = 0
            , Cn = Z[0]
            , kn = 0
            , Ln = Z[1];
          Nn = Math.min(Nn, Nn - (xn.leftExpand || 0)),
            Cn = Math.max(Cn, Cn + (xn.rightExpand || 0)),
            kn = Math.min(kn, kn - (xn.topExpand || 0)),
            Ln = Math.max(Ln, Ln + (xn.bottomExpand || 0));
          var An = new o({
            size: [Cn - Nn, Ln - kn],
            align: [0, 0],
            origin: [0, 0],
            properties: {
              backgroundColor: bn
            }
          });
          Tn = new o({
            size: [Cn - Nn, Ln - kn],
            align: [0, 0],
            origin: [0, 0],
            properties: {
              zIndex: 2
            }
          });
          var On = Ct.add(new m({
            transform: N.translate(Nn, kn, 0)
          }));
          On.add(An),
            On.add(Tn)
        } else
          Tn = St;
        Sn(Tn)
      }
      !Ct && !St && (St = new o({
        size: Z,
        classes: et
      })),
        Ct && Et.setContainerSurface(Ct),
        Tt && Et.setInnerContainerSurfaceA(Tt),
        Nt && Et.setInnerContainerSurfaceB(Nt),
        xt && Et.setInner3DSurface(xt),
        St && Et.setMainSurface(St);
      var Mn = Et;
      if (Et.type === "MetFlexBoxNode") {
        var _n = {};
        _n.id_ = e.id_ + "_inner_",
          _n.sizeX = e.contentSizeX || 0,
          _n.sizeY = e.contentSizeY || 0,
          _n.positionX = (e.contentOffsetX || 0) + _n.sizeX / 2,
          _n.positionY = (e.contentOffsetY || 0) + _n.sizeY / 2,
          _n.name = e.name + "_inner_",
          _n.class = "MetNode";
        var Dn = this.makeMetNode(_n, Z);
        Et.innerNode = Dn,
          Et.addSubMetNode(Dn),
          Mn = Dn,
          Dn.containerSurface.setAttributes({
            klass: "flex_inner"
          })
      }
      if (Et.nodeActions.length > 0) {
        var Pn = Et.nodeDesc.name || ""
          , Hn = "___x";
        if (Pn.indexOf(Hn, Pn.length - Hn.length) !== -1) {
          var Bn = Et.containerSurface || Et.mainSurface;
          Bn.setProperties({
            pointerEvents: "auto"
          })
        }
      }
      var jn = mt.length;
      if (jn > 0)
        for (var yt = 0; yt < jn; yt++) {
          var Fn = mt[yt];
          if (k.MetNodeActionTypeAuto === Fn.actionType)
            (function () {
              var e = Fn
                , t = function (t) {
                  (l === "AudioNode" || l === "VideoNode") && e.executePerformsRange(Et, t.from, t.to)
                }
                , n = St;
              n && n.on("playing", t)
            }
            )();
          else if (k.MetNodeActionTypeTap === Fn.actionType)
            (function () {
              var t = Fn
                , n = null
                , r = function (t) {
                  t.preventDefault(),
                    n = C.absolutePos4Event(t),
                    l === "ButtonNode" && e.buttonType === 1 && Et.curStateAnim.showState(1 - Et.curStateAnim.curStateIdx, !1, 0),
                    t.stopPropagation()
                }
                , i = function (r) {
                  r.preventDefault();
                  if (!n)
                    return;
                  n = null;
                  if (l === "MetAnimNode")
                    Et.curKeyframeAnim.isPlaying() ? Et.curKeyframeAnim.stopAnim() : (L.flagActiveNodeID(Et.metNodeId),
                      Et.curKeyframeAnim.resetTimeProgress(!1),
                      Et.curKeyframeAnim.startAnimAfterDelay(0));
                  else if (l === "MetStateNode") {
                    if (e.autoplay)
                      Et.curStateAnim.isPlaying() ? Et.curStateAnim.stopPlay() : (L.flagActiveNodeID(Et.metNodeId),
                        Et.curStateAnim.autoPlay());
                    else if (Et.curStateAnim.hasNextState() || Et.nodeDesc.endToEnd)
                      L.flagActiveNodeID(Et.metNodeId),
                        Et.curStateAnim.showNextState()
                  } else
                    l === "ButtonNode" && (l === "ButtonNode" && e.buttonType === 1 ? Et.curStateAnim.showState(1 - Et.curStateAnim.curStateIdx, !1, 0) : Et.curStateAnim.showState(1 - Et.curStateAnim.curStateIdx, !1, 0));
                  t.executePerforms(Et),
                    r.stopPropagation()
                }
                , s = Ct || St;
              s && (J(s, e),
                s.on("_e_down", r),
                s.on("_e_out", i),
                s.on("_e_up", i))
            }
            )();
          else if (k.MetNodeActionTypeDoubleTap === Fn.actionType) {
            if (b.isTouchDevice())
              continue;
            (function () {
              var t = Fn
                , n = function (n) {
                  n.preventDefault(),
                    n.stopPropagation(),
                    l === "MetAnimNode" ? Et.curKeyframeAnim.isPlaying() || (Et.curKeyframeAnim.resetTimeProgress(!1),
                      Et.curKeyframeAnim.startAnimAfterDelay(0)) : l === "MetStateNode" && (e.autoplay ? Et.curStateAnim.isPlaying() || Et.curStateAnim.autoPlay() : (Et.curStateAnim.hasNextState() || Et.nodeDesc.endToEnd) && Et.curStateAnim.showNextState()),
                    t.executePerforms(Et)
                }
                , r = function (n) {
                  n.preventDefault(),
                    n.stopPropagation(),
                    l === "MetAnimNode" ? Et.curKeyframeAnim.isPlaying() && Et.curKeyframeAnim.stopAnim() : l === "MetStateNode" && e.autoplay && Et.curStateAnim.isPlaying() && Et.curStateAnim.stopPlay(),
                    t.executeExtraPerforms(Et)
                }
                , i = Ct || St;
              i && (i.on("_e_over_in", n),
                i.on("_e_over_out", r))
            }
            )()
          } else if (k.MetNodeActionTypeLongTap === Fn.actionType)
            (function () {
              var e = Fn
                , t = function () {
                  e.executePerforms(Et)
                }
                , n = Ct || St;
              n && n.on("_e_longTap", t)
            }
            )();
          else if (k.MetNodeActionTypeZoom === Fn.actionType)
            l === "MetFlexBoxNode" && function () {
              var t = Ct || St
                , n = Et.innerNode
                , r = n.containerSurface || n.mainSurface
                , i = Fn
                , s = W(n)
                , o = i.i1
                , u = i.f1 || 1
                , a = i.f2 || 1
                , f = null
                , l = null
                , c = null
                , h = null
                , p = function (e) {
                  return Math.max(u, Math.min(a, e))
                };
              n.zoomingResetAll__ = function () {
                X(n, s),
                  f = null,
                  l = null,
                  c = null,
                  h = null
              }
                ;
              var d = function (e) {
                e.preventDefault(),
                  e.stopPropagation(),
                  n.runningWay = 0,
                  f = C.absolutePos4Event(e)
              }
                , v = function (e) {
                  e.preventDefault(),
                    e.stopPropagation();
                  if (null === f)
                    return;
                  if (b.isGestureMovingRefuse(n.metNodeId))
                    return;
                  if (!b.isTouchDevice()) {
                    if (!e.shiftKey)
                      return
                  } else if (e.touches && e.touches.length <= 1)
                    return;
                  if (1 === n.runningWay || 3 === n.runningWay) {
                    m(e);
                    return
                  }
                  if (null === l) {
                    if (!b.isTouchDevice()) {
                      var t = C.absolutePos4Event(e)
                        , i = C.transformToElement(r._currentTarget, document.body)
                        , s = [(n.nodeDesc.sizeX || 0) / 2, (n.nodeDesc.sizeY || 0) / 2];
                      s = C.pointApplyTransform(s, i);
                      var u = t[0] - s[0]
                        , a = t[1] - s[1];
                      if (Math.abs(u) > 4 || Math.abs(a) > 4)
                        f = s,
                          l = Math.sqrt(u * u + a * a),
                          h = [n.scaleX, n.scaleY],
                          n.runningWay = 2
                    } else {
                      var d = e.touches[0].pageX
                        , v = e.touches[1].pageX
                        , g = e.touches[0].pageY
                        , y = e.touches[1].pageY
                        , u = v - d
                        , a = y - g;
                      if (Math.abs(u) > 4 || Math.abs(a) > 4)
                        f = [(d + v) / 2, (g + y) / 2],
                          l = Math.sqrt(u * u + a * a)
                    }
                    return
                  }
                  if (!b.isTouchDevice()) {
                    var t = C.absolutePos4Event(e)
                      , u = t[0] - f[0]
                      , a = t[1] - f[1];
                    if (!(Math.abs(u) > 4 || Math.abs(a) > 4))
                      return;
                    c = Math.sqrt(u * u + a * a)
                  } else {
                    var d = e.touches[0].pageX
                      , v = e.touches[1].pageX
                      , g = e.touches[0].pageY
                      , y = e.touches[1].pageY
                      , u = v - d
                      , a = y - g;
                    if (!(Math.abs(u) > 4 || Math.abs(a) > 4))
                      return;
                    c = Math.sqrt(u * u + a * a);
                    if (2 !== n.runningWay) {
                      Math.abs(c - l) > 16 && (l = c,
                        V(n, f),
                        h = [n.scaleX, n.scaleY],
                        n.runningWay = 2);
                      return
                    }
                  }
                  var w = c / l
                    , E = h[0] * w;
                  b.gestureMovingSet(n.metNodeId),
                    o && (E = p(E)),
                    n.setMetNodeScaleX(E),
                    n.setMetNodeScaleY(E)
                }
                , m = function (e) {
                  e.preventDefault(),
                    e.stopPropagation(),
                    f = null,
                    l = null,
                    c = null,
                    h = null
                };
              t && (J(t, e),
                t.on("_e_down", d),
                t.on("_e_move", v),
                t.on("_e_out", m),
                t.on("_e_up", m))
            }();
          else if (k.MetNodeActionTypeDrag === Fn.actionType)
            (function () {
              var t = Ct || St
                , r = Fn
                , s = Et.nodeDesc.positionX
                , o = Et.nodeDesc.positionY
                , u = r.f2 + n
                , a = r.f4 + f
                , l = !!r.i1;
              s === u && o === a && (u += 4,
                a += 4);
              var c = null
                , h = []
                , p = null
                , d = null
                , m = null
                , g = function () {
                  m && (i.clear(m),
                    m = null),
                    d && (d.halt(),
                      d = null)
                };
              Et.draggingResetAll__ = function () {
                g(),
                  Et.setPositionPixels(s, o),
                  c = null,
                  h = null,
                  p = null,
                  r.actionType = k.MetNodeActionTypeDrag
              }
                ;
              var y = function (e) {
                e.preventDefault(),
                  e.stopPropagation(),
                  g();
                if (r.actionType !== k.MetNodeActionTypeDrag)
                  return;
                c = C.absolutePos4Event(e),
                  p = Et.getPositionPixels()
              }
                , w = function (e) {
                  e.preventDefault(),
                    e.stopPropagation();
                  if (null === c)
                    return;
                  if (r.actionType !== k.MetNodeActionTypeDrag)
                    return;
                  if (b.isGestureMovingRefuse(Et.metNodeId))
                    return;
                  var n = C.transformFromElement(t._currentTarget.offsetParent, document.body);
                  h = C.absolutePos4Event(e);
                  var i = [h[0] - c[0], h[1] - c[1]];
                  i = C.vectorApplyTransform(i, n);
                  var s = p[0] + i[0]
                    , o = p[1] + i[1];
                  b.gestureMovingSet(Et.metNodeId),
                    S(Et, s, o, u, a) ? (Et.setPositionPixels(u, a),
                      r.executePerforms(Et),
                      r.actionType = -1) : Et.setPositionPixels(s, o),
                    g()
                }
                , E = function (e) {
                  e.preventDefault(),
                    e.stopPropagation(),
                    g();
                  if (l && r.actionType !== -1) {
                    var t = Et.getPositionPixels()
                      , n = [s, o]
                      , u = T.easingFuncBy(T.EaseOutSine)
                      , a = {
                        duration: 500,
                        curve: u
                      };
                    d = new v(0),
                      m = i.every(function () {
                        var e = d.get();
                        m && Et.setPositionPixels(t[0] + (n[0] - t[0]) * e, t[1] + (n[1] - t[1]) * e)
                      }, 1),
                      d.set(1, a, function () {
                        i.clear(m),
                          m = null,
                          f()
                      });
                    var f = function () {
                      d.halt(),
                        d = null
                    }
                  }
                  c = null,
                    h = null,
                    p = null
                }
                , S = function (e, t, n, i, s) {
                  var o = r.f5 || 22;
                  return Math.abs(t - i) <= o && Math.abs(n - s) <= o
                };
              t && (J(t, e),
                t.on("_e_down", y),
                t.on("_e_move", w),
                t.on("_e_out", E),
                t.on("_e_up", E))
            }
            )();
          else if (k.MetNodeActionTypeTwist !== Fn.actionType)
            if (k.MetNodeActionTypeScroll === Fn.actionType)
              l === "MetFlexBoxNode" && function () {
                var t = Ct || St
                  , n = Et.innerNode
                  , s = n.containerSurface || n.mainSurface
                  , o = Fn
                  , u = W(n)
                  , a = o.i1
                  , f = o.i2
                  , l = null
                  , c = []
                  , h = null
                  , p = null
                  , d = function () {
                    p && (i.clear(p),
                      p = null)
                  }
                  , v = []
                  , m = function () {
                    v.length = 0
                  };
                n.scrollingResetAll__ = function () {
                  d(),
                    X(n, u),
                    l = null,
                    c = null,
                    h = null
                }
                  ;
                var g = function (e) {
                  e.preventDefault(),
                    e.stopPropagation(),
                    d(),
                    n.runningWay = 0,
                    l = C.absolutePos4Event(e)
                }
                  , y = function (e) {
                    e.preventDefault(),
                      e.stopPropagation();
                    if (null === l)
                      return;
                    if (b.isGestureMovingRefuse(n.metNodeId))
                      return;
                    if (!b.isTouchDevice()) {
                      if (e.altKey || e.shiftKey)
                        return
                    } else if (e.touches && e.touches.length > 1)
                      return;
                    if (2 === n.runningWay || 3 === n.runningWay) {
                      m(),
                        w(e);
                      return
                    }
                    var t = C.transformFromElement(s._currentTarget.offsetParent, document.body);
                    c = C.absolutePos4Event(e);
                    var i = [a !== 1 ? c[0] - l[0] : 0, a !== 2 ? c[1] - l[1] : 0];
                    i = C.vectorApplyTransform(i, t);
                    if (1 !== n.runningWay) {
                      var o = i[0]
                        , u = i[1];
                      if (!(Math.abs(o) > 4 || Math.abs(u) > 4))
                        return;
                      n.runningWay = 1,
                        l = c,
                        i = [0, 0],
                        h = n.getPositionPixels()
                    }
                    if (f) {
                      while (v.length >= 6)
                        v.shift();
                      var p = r.getCurrentFrameTime();
                      v.push([i[0], i[1], p])
                    }
                    var g = h[0] + i[0]
                      , y = h[1] + i[1];
                    b.gestureMovingSet(n.metNodeId);
                    if (f) {
                      var E = $(n, g, y);
                      g = E[0],
                        y = E[1]
                    }
                    n.setPositionPixels(g, y),
                      d()
                  }
                  , w = function (e) {
                    e.preventDefault(),
                      e.stopPropagation(),
                      d(),
                      l = null,
                      c = null,
                      h = null;
                    if (f) {
                      var t = v.length;
                      if (t > 1) {
                        var s = v[t - 1][2] - v[0][2]
                          , o = 0
                          , u = 0;
                        for (var a = 1; a < t; ++a)
                          o += v[a][0] - v[a - 1][0],
                            u += v[a][1] - v[a - 1][1];
                        var g = Math.sqrt(o * o + u * u)
                          , y = g / Math.max(s, 1);
                        if (y > .08) {
                          var b = n.getPositionPixels()
                            , w = o / g
                            , E = u / g
                            , S = r.getCurrentFrameTime()
                            , x = .005;
                          p = i.every(function () {
                            var e = r.getCurrentFrameTime() - S
                              , t = y - x * e;
                            if (t > 0) {
                              var i = y * e - x * e * e / 2
                                , s = b[0] + i * w
                                , o = b[1] + i * E;
                              if (f) {
                                var u = $(n, s, o);
                                s = u[0],
                                  o = u[1]
                              }
                              n.setPositionPixels(s, o)
                            } else
                              d()
                          }, 1)
                        }
                      }
                      m()
                    }
                  };
                t && (J(t, e),
                  t.on("_e_down", g),
                  t.on("_e_move", y),
                  t.on("_e_out", w),
                  t.on("_e_up", w))
              }();
            else if (k.MetNodeActionTypeSlide === Fn.actionType)
              (function () {
                var t = Ct || St
                  , s = Fn
                  , o = n
                  , u = f
                  , a = s.f2 + o
                  , l = s.f4 + u
                  , c = y.length([a - o, l - u])
                  , h = s.i2
                  , p = null
                  , d = []
                  , m = null
                  , g = null
                  , w = null
                  , E = null
                  , S = function () {
                    E && (i.clear(E),
                      E = null),
                      w && (w.halt(),
                        w = null)
                  };
                Et.swipingResetAll__ = function () {
                  S(),
                    Et.setPositionPixels(o, u),
                    p = null,
                    d = null,
                    m = null,
                    g = null
                }
                  ;
                var x = function (e) {
                  e.preventDefault(),
                    e.stopPropagation(),
                    p = C.absolutePos4Event(e),
                    m = Et.getPositionPixels(),
                    g = r.getCurrentFrameTime(),
                    S()
                }
                  , N = function (e) {
                    e.preventDefault(),
                      e.stopPropagation();
                    if (null === p)
                      return;
                    if (b.isGestureMovingRefuse(Et.metNodeId))
                      return;
                    var n = C.transformFromElement(t._currentTarget.offsetParent, document.body);
                    d = C.absolutePos4Event(e);
                    var r = [d[0] - p[0], d[1] - p[1]];
                    r = C.vectorApplyTransform(r, n);
                    var i = (r[0] * (a - o) + r[1] * (l - u)) / c;
                    r = [(a - o) * i / c, (l - u) * i / c];
                    var s = m[0] + r[0]
                      , f = m[1] + r[1]
                      , h = !0
                      , v = !0;
                    s <= Math.min(o, a) ? s = Math.min(o, a) : s >= Math.max(o, a) ? s = Math.max(o, a) : h = !1,
                      f <= Math.min(u, l) ? f = Math.min(u, l) : f >= Math.max(u, l) ? f = Math.max(u, l) : v = !1,
                      Et.nodeDesc.notTriggerPageFlip && b.setIsRangePagingRefuse(!0),
                      h && v ? b.gestureMovingSet(null) : b.gestureMovingSet(Et.metNodeId),
                      Et.setPositionPixels(s, f),
                      S()
                  }
                  , k = function (e) {
                    e.preventDefault(),
                      e.stopPropagation();
                    if (null !== p) {
                      var t = ((m[0] - o) * (a - o) + (m[1] - u) * (l - u)) / c
                        , n = t > c * .5
                        , f = !n
                        , d = Et.getPositionPixels()
                        , y = ((d[0] - o) * (a - o) + (d[1] - u) * (l - u)) / c
                        , b = f && y > c * .15
                        , x = n && y < c * .85
                        , N = r.getCurrentFrameTime()
                        , C = (y - t) / Math.max(1, N - g)
                        , k = .333
                        , L = !1
                        , A = null;
                      b || C > k ? (A = [a, l],
                        L = !0) : x || C < -k ? A = [o, u] : n ? (A = [a, l],
                          L = !0) : A = [o, u],
                        S();
                      var O = d
                        , M = T.easingFuncBy(h)
                        , _ = {
                          duration: h !== 0 ? 500 : 0,
                          curve: M
                        };
                      w = new v(0),
                        E = i.every(function () {
                          var e = w.get();
                          E && Et.setPositionPixels(O[0] + (A[0] - O[0]) * e, O[1] + (A[1] - O[1]) * e)
                        }, 1),
                        w.set(1, _, function () {
                          i.clear(E),
                            E = null,
                            D()
                        });
                      var D = function () {
                        f && L && s.executePerforms(Et),
                          w.halt(),
                          w = null
                      }
                    }
                    p = null,
                      d = null,
                      m = null,
                      g = null
                  };
                t && (J(t, e),
                  t.on("_e_down", x),
                  t.on("_e_move", N),
                  t.on("_e_out", k),
                  t.on("_e_up", k))
              }
              )();
            else if (k.MetNodeActionTypeErase === Fn.actionType)
              (function () {
                var t = Fn
                  , n = Math.floor(t.f1)
                  , r = t.f2
                  , o = !1;
                St.canvasPainted = !1,
                  St.canvasInitialCleaned = null,
                  St.canvasChanged = !1;
                var u = function (t) {
                  var n = St.getContext("2d");
                  switch (nt) {
                    case D:
                      var r = e.imageFill;
                      r && (r = b.normalizeUrl(r.rawImageURL)),
                        r && r.length > 0 ? t || s.canvasDrawImage(Et) : (n.save(),
                          n.clearRect(0, 0, Z[0], Z[1]),
                          n.restore(),
                          St.canvasPainted = !0,
                          St.canvasInitialCleaned = null,
                          St.canvasChanged = !1);
                      break;
                    case M:
                    case _:
                      n.save(),
                        n.fillStyle = tt,
                        n.fillRect(0, 0, Z[0], Z[1]),
                        n.restore(),
                        St.canvasPainted = !0,
                        St.canvasInitialCleaned = null,
                        St.canvasChanged = !1
                  }
                };
                Et.erasingResetAll__ = function () {
                  St.canvasChanged && (St.canvasPainted = !1,
                    u(!1),
                    St.canvasInitialCleaned = null,
                    St.canvasChanged = !1,
                    St.canvasErased = !1)
                }
                  ;
                var a = function () {
                  var e = St.getContext("2d");
                  e.save(),
                    e.clearRect(0, 0, Z[0], Z[1]),
                    e.restore()
                }
                  , f = function (e) {
                    if (St.canvasErased)
                      return;
                    var n = e.canvas.width
                      , i = e.canvas.height
                      , o = (n * i - St.canvasInitialCleaned) * (1 - r)
                      , u = s.canvasCalcTransparency(St);
                    u - St.canvasInitialCleaned >= o && (St.canvasErased = !0,
                      a(),
                      t.executePerforms(Et))
                  };
                St.render = function () {
                  if (o)
                    return this.id;
                  var t = St.getContext("2d")
                    , n = t.canvas.width
                    , r = t.canvas.height;
                  return t && n > 0 && r > 0 && (u(!0),
                    o = !0),
                    this.id
                }
                  ;
                var l = null
                  , c = function (e) {
                    e.preventDefault();
                    if (!o || !St.canvasPainted)
                      return;
                    St.canvasInitialCleaned === null && (St.canvasInitialCleaned = s.canvasCalcTransparency(St));
                    var t = St._currentTarget
                      , n = C.transformFromElement(t, e.srcElement);
                    l = C.relativePos4Event(e),
                      l = C.pointApplyTransform(l, n)
                  }
                  , h = function (e) {
                    e.preventDefault(),
                      e.stopPropagation();
                    if (null === l && !b.isTouchDown())
                      return;
                    b.gestureMovingSet(Et.metNodeId);
                    var t = St._currentTarget
                      , r = C.transformFromElement(t, e.srcElement)
                      , s = C.relativePos4Event(e);
                    s = C.pointApplyTransform(s, r),
                      null === l && (l = s);
                    var o = St.getContext("2d");
                    o.save(),
                      o.beginPath(),
                      o.arc(s[0], s[1], n, 0, Math.PI * 2, !0),
                      o.clip(),
                      o.clearRect(Math.min(l[0], s[0]) - n, Math.min(l[1], s[1]) - n, Math.abs(s[0] - l[0]) + n * 2, Math.abs(s[1] - l[1]) + n * 2),
                      o.restore(),
                      St.canvasChanged || (St.canvasChanged = !0),
                      b.isAndroidDevice() && (St.canvasNeedsDisplay || (St.canvasNeedsDisplay = !0,
                        i.after(function () {
                          o.canvas.style.visibility = "hidden",
                            o.canvas.offsetHeight,
                            o.canvas.style.visibility = "inherit",
                            St.canvasNeedsDisplay = !1
                        }, 1))),
                      l = s
                  }
                  , p = function (e) {
                    e.preventDefault(),
                      e.stopPropagation();
                    if (null === l)
                      return;
                    l = null;
                    var t = St.getContext("2d");
                    f(t)
                  }
                  , d = St;
                d && (J(d, e),
                  d.on("_e_down", c),
                  d.on("_e_move", h),
                  d.on("_e_out", p),
                  d.on("_e_up", p))
              }
              )();
            else if (k.MetNodeActionTypeGravity === Fn.actionType) {
              if (!window.DeviceMotionEvent) {
                b.log("Hi Gravity, DeviceMotionEvent is not supported on your device.");
                continue
              }
              l === "MetMotionBoxNode" ? function () {
                var e = null
                  , t = null
                  , n = null
                  , i = null
                  , s = null
                  , o = null
                  , u = null
                  , a = null
                  , f = null
                  , l = null
                  , c = function (c) {
                    var h = r.getCurrentFrameTime()
                      , p = Math.max(0, Math.min(90, c.beta))
                      , d = c.gamma;
                    p >= 88 && (d = a !== null ? a : d),
                      Math.abs(d) >= 88 && (p = u || p),
                      a !== null && (a > 75 && d < -75 ? (p = u || p,
                        d = 90) : a < -75 && d > 75 && (p = u || p,
                          d = -90));
                    var v = !0;
                    if (e === null)
                      e = h,
                        t = p,
                        n = d;
                    else {
                      h - e > 500 && (e = h,
                        t = p,
                        n = d);
                      if (Math.abs(p - t) > 5 || Math.abs(d - n) > 5)
                        v = !1
                    }
                    var m = !1;
                    if (i === null || h - i > 50)
                      i = h,
                        m = !0;
                    s === null ? s = p : m && v && (s = s * .6 + p * .4),
                      o === null ? o = d : m && v && (o = o * .6 + d * .4),
                      u = p,
                      a = d;
                    var g = Et.nodeDesc.sizeX || 0
                      , y = Et.nodeDesc.sizeY || 0
                      , b = Et.nodeDesc.carea;
                    if (!b)
                      return;
                    b = b.split(",");
                    var w = parseFloat(b[0])
                      , E = parseFloat(b[1])
                      , S = parseFloat(b[2])
                      , x = parseFloat(b[3]);
                    if (S !== g || x !== y) {
                      var T = null
                        , N = null
                        , C = !1
                        , k = !1;
                      if (S !== g) {
                        var L = d - o;
                        L > 90 ? L = 90 : L < -90 && (L = -90),
                          L /= 180;
                        var A = 2 * (g - S - 2 * w)
                          , O = g - S;
                        S < g && (O = -O),
                          T = A * L * L + O * L,
                          f === null ? (f = T,
                            C = !0) : Math.abs(T - f) > 1 && (T = f * .8 + T * .2,
                              f = T,
                              C = !0)
                      }
                      if (x !== y) {
                        var L = p - s;
                        L > 45 ? L = 45 : L < -45 && (L = -45),
                          L /= 90;
                        var A = 2 * (y - x - 2 * E)
                          , O = y - x;
                        x < y && (O = -O),
                          N = A * L * L + O * L,
                          l === null ? (l = N,
                            k = !0) : Math.abs(N - l) > 1 && (N = l * .8 + N * .2,
                              l = N,
                              k = !0)
                      }
                      if (C || k) {
                        var M = Et.metNodes || [];
                        for (var _ = 0; _ < M.length; _++) {
                          var D = M[_];
                          D.displacementModifier || D.createDisplacementModifier(),
                            D.setDisplacementPos(T, N)
                        }
                      }
                    }
                  };
                Et.motionDataB_resetAll__ = function () {
                  u = null,
                    a = null,
                    f = null,
                    l = null
                }
                  ,
                  Et._on_device_motion_b = c,
                  window.addEventListener("deviceorientation", c)
              }() : function () {
                var e = Fn
                  , t = 40
                  , n = null
                  , i = null
                  , s = null
                  , o = null
                  , u = null
                  , a = function (a) {
                    var f = r.getCurrentFrameTime()
                      , l = a.accelerationIncludingGravity
                      , c = l.x
                      , h = l.y
                      , p = l.z;
                    if (s === null || o === null || u === null || i === null) {
                      s = c,
                        o = h,
                        u = p,
                        i = f;
                      return
                    }
                    var d = f - i;
                    if (d < 100)
                      return;
                    var v = Math.abs(c - s) + Math.abs(h - o) + Math.abs(p - u);
                    s = c,
                      o = h,
                      u = p,
                      i = f;
                    if (null === n)
                      v > t && (e.executePerforms(Et),
                        n = [v]);
                    else {
                      n.push(v);
                      while (n.length > 10)
                        n.shift();
                      var m = 0;
                      for (var g = 0, y = n.length; g < y; g++)
                        m += n[g];
                      n.length > 0 && (m /= n.length),
                        m < t / 3 && (n = null,
                          s = null,
                          o = null,
                          u = null,
                          i = null)
                    }
                  };
                Et.motionDataA_resetAll__ = function () {
                  n = null,
                    i = null,
                    s = null,
                    o = null,
                    u = null
                }
                  ,
                  Et._on_device_motion_a = a,
                  window.addEventListener("devicemotion", a, !1)
              }()
            } else if (k.MetNodeActionTypeGyro === Fn.actionType) {
              if (!window.DeviceMotionEvent) {
                b.log("Hi Gyro, DeviceMotionEvent is not supported on your device.");
                continue
              }
              l === "MetMotionBoxNode" && function () {
                var e = null
                  , t = null
                  , n = null
                  , r = null
                  , i = function (i) {
                    var s = Math.max(0, Math.min(90, i.beta))
                      , o = i.gamma;
                    s >= 88 && (o = t !== null ? t : o),
                      Math.abs(o) >= 88 && (s = e || s),
                      t !== null && (t > 75 && o < -75 ? (s = e || s,
                        o = 90) : t < -75 && o > 75 && (s = e || s,
                          o = -90)),
                      e = s,
                      t = o;
                    var u = Et.nodeDesc.sizeX || 0
                      , a = Et.nodeDesc.sizeY || 0
                      , f = Et.nodeDesc.carea;
                    if (!f)
                      return;
                    f = f.split(",");
                    var l = parseFloat(f[0])
                      , c = parseFloat(f[1])
                      , h = parseFloat(f[2])
                      , p = parseFloat(f[3]);
                    if (h !== u || p !== a) {
                      var d = null
                        , v = null
                        , m = !1
                        , g = !1;
                      if (h !== u) {
                        var y = o / 180
                          , b = 2 * (u - h - 2 * l)
                          , w = u - h;
                        h < u && (w = -w),
                          d = b * y * y + w * y,
                          n === null ? (n = d,
                            m = !0) : Math.abs(d - n) > 1 && (d = n * .8 + d * .2,
                              n = d,
                              m = !0)
                      }
                      if (p !== a) {
                        var y = (s - 45) / 90
                          , b = 2 * (a - p - 2 * c)
                          , w = a - p;
                        p < a && (w = -w),
                          v = b * y * y + w * y,
                          r === null ? (r = v,
                            g = !0) : Math.abs(v - r) > 1 && (v = r * .8 + v * .2,
                              r = v,
                              g = !0)
                      }
                      if (m || g) {
                        var E = Et.metNodes || [];
                        for (var S = 0; S < E.length; S++) {
                          var x = E[S];
                          x.displacementModifier || x.createDisplacementModifier(),
                            x.setDisplacementPos(d, v)
                        }
                      }
                    }
                  };
                Et.motionDataB_resetAll__ = function () {
                  e = null,
                    t = null,
                    n = null,
                    r = null
                }
                  ,
                  Et._on_device_motion_b = i,
                  window.addEventListener("deviceorientation", i)
              }()
            } else if (k.MetNodeActionTypeMaskClip === Fn.actionType) {
              var In = Et.nodeDesc.nodes || [];
              for (var dt = 0, qn = In.length; dt < qn; dt++) {
                var Rn = In[dt];
                Rn.opacity = 0
              }
            }
        }
      var Un = []
        , zn = e.nodes || [];
      if (l !== "MetDataListNode")
        for (var dt = 0, vt = zn.length; dt < vt; dt++)
          Un[dt] = zn[dt];
      if (l === "MetStateNode" || l === "ButtonNode")
        Un.reverse();
      else if (l === "MetScrollNode") {
        if (!e.isInit) {
          var Wn = e.scrollDirection || 0
            , Xn = e.contentOffset || 0
            , Vn = e.contentSize || 0
            , $n = Wn === 0 ? e.sizeY : e.sizeX;
          Xn > 0 && (e.contentSize = Vn += Xn,
            Xn = e.contentOffset = 0),
            Xn + Vn < $n && (e.contentSize = $n - Xn);
          for (var dt = 0, vt = Un.length; dt < vt; dt++) {
            var Jn = Un[dt];
            Wn === 0 ? Jn.positionY -= Xn : Jn.positionX -= Xn
          }
          var Kn = e.footprints || [];
          for (var dt = 0, vt = Kn.length; dt < vt; dt++) {
            var Qn = Kn[dt];
            Wn === 0 ? Qn.f -= Xn : Qn.f -= Xn
          }
          e.isInit = !0
        }
      } else if (Et.type === "MetFlexBoxNode" && !e.isInit) {
        var Gn = e.contentOffsetX || 0
          , Yn = e.contentOffsetY || 0;
        for (var dt = 0, vt = Un.length; dt < vt; dt++) {
          var Jn = Un[dt];
          Jn.positionX -= Gn,
            Jn.positionY -= Yn
        }
        e.isInit = !0
      }
      for (var dt = 0, vt = Un.length; dt < vt; dt++)
        if (!I(Mn)) {
          var Zn = this.makeMetNode(Un[dt], Z);
          Mn.addSubMetNode(Zn)
        } else {
          var Zn = this.makeMetNode(Un[dt], Z);
          q(Zn, Un[dt < vt - 1 ? dt + 1 : 0], Mn.nodeDesc.transition),
            Mn.addSubMetNode(Zn)
        }
      return this.allNodes[g] = Et,
        Et.type === "AudioNode" ? this.audioNodes[g] = Et : Et.type === "VideoNode" && (this.videoNodes[g] = Et),
        l === "MetDataRecordNode" || l === "MetDataFormNode" || l === "MetDataListNode" ? U(Et) : (Et.dataFieldName === "_weixin_username" || Et.dataFieldName === "_weixin_icon") && b.getCurrentUrlParam("wxid") && z(Et),
        Et
    }
      ,
      F.prototype.getMetNode = function (e) {
        return this.allNodes[e]
      }
      ,
      F.prototype.delMetNode = function (e) {
        var t = this.allNodes[e];
        return t && (t.type === "AudioNode" ? delete this.audioNodes[e] : t.type === "VideoNode" && delete this.videoNodes[e],
          delete this.allNodes[e]),
          t
      }
      ,
      F.prototype.setupLabelHtml4Node = function (e, t) {
        e.nodeDesc.text = t;
        var n = e.nodeDesc.textExportType || 0;
        if (n === 1) {
          var r = e.nodeDesc.verticalAlignment || 0
            , i = e.nodeDesc.blocks || [];
          R(e.mainSurface, t, r, i)
        }
      }
      ,
      F.sharedInstance = function () {
        return F._instance || (F._instance = new F),
          F._instance
      }
      ,
      n.exports = F
  }),
  define("views/OverlayView", ["require", "exports", "module", "famous/core/Engine", "famous/utilities/Timer", "famous/core/Transform", "famous/core/View", "famous/core/Surface", "famous/surfaces/ContainerSurface", "famous/core/Modifier", "famous/core/RenderNode", "utils/DebugUtils", "tools/MetNodeFactory"], function (e, t, n) {
    "use strict";
    function d() {
      o.apply(this, arguments),
        this.projType = this.options.projType,
        this.projSize = this.options.projSize,
        this.containerSize = this.options.containerSize,
        this.overlayScale = null,
        this.overlayPortSize = null,
        this.overlayContainerSurface = null,
        this.overlayModifier = null,
        this.upperRootNode = null,
        this.lowerRootNode = null,
        this.upperModifier = null,
        this.lowerModifier = null,
        this.nodes = []
    }
    function v() {
      var e = null === this.overlayScale;
      this.projType === 2 ? (this.overlayScale = Math.min(this.containerSize[0] / this.projSize[0], this.containerSize[1] / this.projSize[1]),
        this.overlayPortSize = this.projSize) : this.projType === 0 ? (this.overlayScale = this.containerSize[0] / this.projSize[0],
          this.overlayPortSize = [this.projSize[0], this.projSize[0] * this.containerSize[1] / this.containerSize[0]]) : this.projType === 1 ? (this.overlayScale = this.containerSize[0] / this.projSize[0],
            this.overlayPortSize = [this.projSize[0], this.projSize[0] * this.containerSize[1] / this.containerSize[0]]) : (this.overlayScale = 1,
              this.overlayPortSize = this.projSize),
        this.overlayContainerSurface ? this.overlayContainerSurface.setSize([this.overlayPortSize[0], Math.min(this.overlayPortSize[1], this.containerSize[1] / this.overlayScale)]) : this.overlayContainerSurface = new a({
          size: [this.overlayPortSize[0], Math.min(this.overlayPortSize[1], this.containerSize[1] / this.overlayScale)],
          hasInnerStatic: p,
          properties: {
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 2
          }
        }),
        this.overlayModifier ? this.overlayModifier.setTransform(s.scale(this.overlayScale, this.overlayScale, 1)) : this.overlayModifier = new f({
          align: [.5, .5],
          transform: s.scale(this.overlayScale, this.overlayScale, 1)
        }),
        e && (this.add(this.overlayModifier).add(this.overlayContainerSurface),
          this._eventOutput.subscribe(this.overlayContainerSurface))
    }
    function m() {
      this.upperRootNode ? this.upperModifier.setSize(this.projSize) : (this.upperModifier = new f({
        size: this.projSize,
        origin: [.5, 0],
        align: [.5, 0]
      }),
        this.upperRootNode = this.overlayContainerSurface.add(this.upperModifier)),
        this.lowerRootNode ? this.lowerModifier.setSize(this.projSize) : (this.lowerModifier = new f({
          size: this.projSize,
          origin: [.5, 1],
          align: [.5, 1]
        }),
          this.lowerRootNode = this.overlayContainerSurface.add(this.lowerModifier))
    }
    var r = e("famous/core/Engine")
      , i = e("famous/utilities/Timer")
      , s = e("famous/core/Transform")
      , o = e("famous/core/View")
      , u = e("famous/core/Surface")
      , a = e("famous/surfaces/ContainerSurface")
      , f = e("famous/core/Modifier")
      , l = e("famous/core/RenderNode")
      , c = e("utils/DebugUtils")
      , h = e("tools/MetNodeFactory")
      , p = c.hasOverflowBug();
    d.prototype = Object.create(o.prototype),
      d.prototype.constructor = d,
      d.prototype.initOverlay = function () {
        v.call(this),
          m.call(this)
      }
      ,
      d.prototype.populateOverlay = function (e) {
        var t = h.sharedInstance()
          , n = this.nodes
          , r = [];
        for (var i = 0, s = e.length; i < s; i++) {
          var o = e[i];
          if (o.nodeSubordinate !== "_screen_")
            continue;
          var u = t.makeMetNode(o, this.projSize);
          r.push(u),
            n.push(u)
        }
        for (var i = 0, s = r.length; i < s; i++) {
          var a = r[i]
            , f = a.nodeDesc.positionY - a.originY * a.size[1];
          f < this.projSize[1] / 2 ? a.initMetSubNode(this.upperRootNode, null, null) : a.initMetSubNode(this.lowerRootNode, null, null)
        }
      }
      ,
      d.prototype.cleanupOverlayByPageID = function (e) {
        var t = this.nodes;
        for (var n = 0, r = t.length; n < r; n++) {
          var i = t[n]
            , s = i.isValid;
          i.isValid = -1 !== i.nodeDesc.overlayPages.indexOf(e);
          if (s !== undefined && i.isValid !== undefined && s === i.isValid)
            continue;
          i.isValid ? i.visible ? (i.showMetNode(),
            i.activeMetSubNode()) : (i.deactiveMetSubNode(),
              i.hideMetNode()) : (i.deactiveMetSubNode(),
                i.hideMetNode()),
            i.setIframesVisiblity(i.isValid)
        }
      }
      ,
      d.prototype.preloadOverlayImages = function (e) {
        var t = this.nodes;
        for (var n = 0, r = t.length; n < r; n++) {
          var i = t[n];
          (i.isMetNodeShown() || e) && i.preloadMetSubNode(!0)
        }
      }
      ,
      d.prototype.cleanOverlay = function () {
        var e = this.nodes;
        for (var t = 0, n = e.length; t < n; t++) {
          var r = e[t];
          r.hideMetNode(),
            r.cleanMetSubNode()
        }
        this.nodes = []
      }
      ,
      n.exports = d
  }),
  define("views/StageView", ["require", "exports", "module", "famous/core/Engine", "famous/utilities/Timer", "famous/core/Transform", "famous/core/View", "famous/core/Surface", "famous/surfaces/ContainerSurface", "famous/core/Modifier", "famous/core/RenderNode", "utils/DebugUtils", "utils/ShapeNodeUtils", "actions/MetHook", "views/Scrollview", "tools/MetNodeFactory"], function (e, t, n) {
    "use strict";
    function g() {
      o.apply(this, arguments),
        this.pageId = this.options.pageId,
        this.pageDesc = this.options.pageDesc,
        this.projType = this.options.projType,
        this.projSize = this.options.projSize,
        this.pageSize = this.options.pageSize,
        this.containerSize = this.options.containerSize,
        this.contentScale = null,
        this.contentPortSize = null,
        this.chapter = this.options.chapter || 0,
        this.section = this.options.section || 0,
        this.outerContainerSurface = null,
        this.outerModifier = null,
        this.outerRootNode = null,
        this.bgAreaSurface = null,
        this.bgAreaModifier = null,
        this.stageContainerSurface = null,
        this.scrollView = null,
        this.rootNode = null,
        this.isAway = !1,
        this.actived = !1,
        this.nodes = [],
        this.hooks = []
    }
    function y() {
      var e = null === this.contentScale;
      this.projType === 2 ? (this.contentScale = Math.min(this.containerSize[0] / this.projSize[0], this.containerSize[1] / this.projSize[1]),
        this.contentPortSize = this.projSize) : this.projType === 0 ? (this.contentScale = this.containerSize[0] / this.projSize[0],
          this.contentPortSize = [this.projSize[0], this.projSize[0] * this.containerSize[1] / this.containerSize[0]]) : this.projType === 1 ? (this.contentScale = this.containerSize[0] / this.projSize[0],
            this.contentPortSize = this.projSize) : (this.contentScale = 1,
              this.contentPortSize = this.projSize),
        this.outerContainerSurface ? this.outerContainerSurface.setSize(this.containerSize) : this.outerContainerSurface = new a({
          size: this.containerSize,
          hasInnerStatic: m,
          properties: {
            overflow: "hidden"
          }
        }),
        this.stageContainerSurface ? this.stageContainerSurface.setSize(this.contentPortSize) : this.stageContainerSurface = new a({
          size: this.contentPortSize,
          hasInnerStatic: m,
          properties: {
            overflow: "hidden",
            zIndex: 1
          }
        }),
        this.outerModifier ? this.outerModifier.setTransform(s.scale(this.contentScale, this.contentScale, 1)) : this.outerModifier = new f({
          origin: [.5, .5],
          align: [.5, .5],
          transform: s.scale(this.contentScale, this.contentScale, 1)
        }),
        e && (this.add(this.outerContainerSurface),
          this.outerRootNode = this.outerContainerSurface.add(this.outerModifier),
          this.outerRootNode.add(this.stageContainerSurface),
          this._eventOutput.subscribe(this.stageContainerSurface))
    }
    function b(e, t, n, r) {
      if (t.contentMode === 0) {
        var i = t.rawImageURL.split(",")
          , s = [];
        for (var o = 0, u = i.length; o < u; o++)
          s.push(c.sprintf("url('" + window.GlobalData.homePath + "zres/%s')", i[o]));
        var a = h.numsFromNumString(t.imageRect)
          , f = a[0]
          , l = a[1]
          , p = a[2]
          , d = a[3]
          , v = ""
          , m = ""
          , g = ""
          , y = ""
          , b = 0
          , w = 0;
        for (var o = 0, u = s.length; o < u; o++)
          v += s[o],
            m += "no-repeat",
            b * f >= p && (b = 0,
              w++),
            g += f * b + "px " + l * w + "px",
            b++,
            y += f + 1 + "px " + (l + 1) + "px",
            o < u - 1 && (v += ",",
              m += ",",
              g += ",",
              y += ",");
        var E = '<div style="overflow:hidden;';
        if (r === 0 && p * n[1] < n[0] * d) {
          var S = n[0] / p;
          E += "transform-origin:0 0;transform:scale(" + S + "," + S + ");"
        } else {
          var S = Math.max(n[0] / p, n[1] / d);
          E += "position:absolute;left:50%;top:50%;transform:translate(-" + p / 2 + "px,-" + d / 2 + "px) scale(" + S + "," + S + ");"
        }
        E += "width:" + p + "px;height:" + d + "px;",
          E += "background-image:" + v + ";",
          E += "background-repeat:" + m + ";",
          E += "background-position:" + g + ";",
          E += "background-size:" + y + ";",
          E += '"></div>',
          e.setContent(E)
      } else {
        var x = c.sprintf("url('" + window.GlobalData.homePath + "zres/%s')", t.rawImageURL)
          , a = h.numsFromNumString(t.imageRect)
          , T = a[0]
          , N = a[1]
          , C = a[2]
          , k = a[3];
        e.setProperties({
          backgroundImage: x,
          backgroundRepeat: "repeat",
          backgroundPosition: "" + T + "px " + N + "px",
          backgroundSize: "" + C + "px " + k + "px",
          backgroundColor: "white"
        })
      }
    }
    function w() {
      var e = this.bgAreaSurface
        , t = undefined;
      this.projType === 0 ? t = [this.projSize[0], Math.max(this.projSize[1], Math.ceil(this.projSize[0] * this.containerSize[1] / this.containerSize[0]))] : this.projType === 1 ? t = [this.projSize[0], Math.ceil(this.projSize[0] * this.containerSize[1] / this.containerSize[0])] : this.projType === 2 ? t = [this.containerSize[0] / this.contentScale, this.containerSize[1] / this.contentScale] : t = this.projSize;
      var n = null === e;
      if (n) {
        e = this.bgAreaSurface = new u({
          size: t,
          classes: [],
          properties: {
            backgroundColor: "white"
          }
        });
        if (this.pageDesc.fillType === 0) {
          var r = this.pageDesc.colorFill;
          if (r) {
            var i = c.rgba2ColorString(r.fillColor);
            e.setProperties({
              backgroundColor: i
            })
          }
        } else if (this.pageDesc.fillType === 1) {
          var s = this.pageDesc.gradientFill;
          if (s) {
            var o = h.numsFromNumString(s.startPoint)
              , a = h.numsFromNumString(s.endPoint)
              , l = [];
            for (var p = 0; p < s.gradientPoints.length; p++) {
              var d = s.gradientPoints[p];
              l.push(d)
            }
            l.sort(function (e, t) {
              if (e.location > t.location)
                return 1;
              if (e.location < t.location)
                return -1
            });
            var v = null
              , m = s.gradientType || 0;
            m === 0 ? v = c.sprintf("%sgradient(linear, %d %d, %d %d", c.browserPrefixes().css, o[0], o[1], a[0], a[1]) : v = c.sprintf("%sgradient(radial, %d %d, 0, %d %d, %d", c.browserPrefixes().css, o[0], o[1], a[0], a[1], Math.max(this.projSize[0], this.projSize[1]));
            for (var p = 0; p < l.length; p++) {
              var d = l[p]
                , g = c.rgba2ColorString(d.color);
              p === 0 ? v += ", from(" + g + ")" : p === l.length - 1 ? v += ", to(" + g + "))" : v += c.sprintf(", color-stop(%f, %s)", d.location, g)
            }
            e.setProperties({
              background: v
            })
          }
        } else if (this.pageDesc.fillType === 2) {
          var y = this.pageDesc.imageFill;
          y && b(e, y, t, this.projType)
        }
      } else {
        e.setSize(t);
        if (this.pageDesc.fillType === 2) {
          var y = this.pageDesc.imageFill;
          y && b(e, y, t, this.projType)
        }
      }
      this.bgAreaModifier ? this.bgAreaModifier.setSize(t) : this.bgAreaModifier = new f({
        size: t,
        origin: [.5, 0],
        align: [.5, 0]
      }),
        n && this.outerRootNode.add(this.bgAreaModifier).add(e)
    }
    function E() {
      if (null !== this.scrollView) {
        this.scrollView.setOptions({
          size: this.stageContainerSurface.getSize()
        }),
          this.scrollView.setOffset(0);
        return
      }
      var e = new l;
      this.scrollView = new d({
        paginated: !1,
        bounce: !1,
        size: this.stageContainerSurface.getSize()
      }),
        this.scrollView.containerSurface = this.stageContainerSurface,
        this.scrollView.sequenceFrom([e]),
        this.scrollView.subscribe(this.stageContainerSurface),
        this.stageContainerSurface.add(this.scrollView);
      var t = new f({
        size: this.pageSize,
        origin: [.5, 0],
        align: [.5, 0]
      });
      this.rootNode = e.add(t),
        this.bgAreaModifier.transformFrom(function () {
          return s.translate(0, -this.scrollView.getOffset(), 0)
        }
          .bind(this)),
        this.scrollView.setupScrollEventHandling()
    }
    var r = e("famous/core/Engine")
      , i = e("famous/utilities/Timer")
      , s = e("famous/core/Transform")
      , o = e("famous/core/View")
      , u = e("famous/core/Surface")
      , a = e("famous/surfaces/ContainerSurface")
      , f = e("famous/core/Modifier")
      , l = e("famous/core/RenderNode")
      , c = e("utils/DebugUtils")
      , h = e("utils/ShapeNodeUtils")
      , p = e("actions/MetHook")
      , d = e("views/Scrollview")
      , v = e("tools/MetNodeFactory")
      , m = c.hasOverflowBug();
    g.prototype = Object.create(o.prototype),
      g.prototype.constructor = g,
      g.prototype.goTop = function () {
        var e = this.scrollView;
        e.setOffset(0)
      }
      ,
      g.prototype.goBottom = function () {
        var e = this.scrollView;
        e.setOffset(Math.max(0, this.pageSize[1] - this.contentPortSize[1]))
      }
      ,
      g.prototype.populateStage = function (e, t) {
        var n = v.sharedInstance()
          , r = this.nodes;
        for (var i = 0, s = e.length; i < s; i++) {
          var o = e[i];
          if (o.nodeSubordinate === "_screen_")
            continue;
          o.id_ === "INTRO_WEBVIEW_ID" && (o.sizeY = this.stageContainerSurface.getSize()[1]);
          var u = n.makeMetNode(o, this.pageSize);
          r.push(u)
        }
        for (var i = 0, s = r.length; i < s; i++) {
          var a = r[i];
          a.initMetSubNode(this.rootNode, null, this)
        }
        for (var f = 0, l = t.length; f < l; f++) {
          var c = new p;
          c.parseByDic(t[f]),
            this.hooks.push(c)
        }
      }
      ,
      g.prototype.initStage = function () {
        y.call(this),
          w.call(this),
          E.call(this)
      }
      ,
      g.prototype.cleanStage = function () {
        var e = this.nodes;
        for (var t = 0, n = e.length; t < n; t++) {
          var r = e[t];
          r.cleanMetSubNode()
        }
        this._eventOutput.unsubscribe(this.stageContainerSurface),
          this.outerContainerSurface && (this.outerContainerSurface.detach(),
            this.outerContainerSurface = null),
          this.stageContainerSurface && (this.stageContainerSurface.detach(),
            this.stageContainerSurface = null),
          this.bgAreaSurface && (this.bgAreaSurface.detach(),
            this.bgAreaSurface = null),
          this.scrollView = null,
          this.nodes = null,
          this.bgAreaModifier = null,
          this.rootNode = null
      }
      ,
      g.prototype.activeStage = function () {
        this.actived = !0;
        var e = this.nodes;
        for (var t = 0, n = e.length; t < n; t++) {
          var r = e[t];
          r.activeMetSubNode()
        }
      }
      ,
      g.prototype.deactiveStage = function () {
        this.actived = !1;
        var e = this.nodes;
        for (var t = 0, n = e.length; t < n; t++) {
          var r = e[t];
          r.deactiveMetSubNode()
        }
      }
      ,
      g.prototype.preloadStageImages = function () {
        var e = this.nodes;
        for (var t = 0, n = e.length; t < n; t++) {
          var r = e[t];
          r.preloadMetSubNode(!0)
        }
        var i = this.pageDesc
          , s = undefined;
        i.imageFill && (s = i.imageFill.rawImageURL);
        if (s) {
          var o = s.split(",");
          for (var t = 0, u = o.length; t < u; t++) {
            var a = o[t];
            a = c.normalizeUrl(a);
            var f = new Image;
            f.src = a
          }
        }
      }
      ,
      g.prototype.setZIndex = function (e) {
        this.outerContainerSurface.setPropertiesCheckDirty({
          zIndex: e
        })
      }
      ,
      g.prototype.setVisibility = function (e) {
        this.outerContainerSurface.setPropertiesCheckDirty({
          visibility: e ? "visible" : "hidden"
        });
        var t = this.nodes;
        for (var n = 0, r = t.length; n < r; n++) {
          var i = t[n];
          i.setIframesVisiblity(e)
        }
      }
      ,
      n.exports = g
  }),
  define("animations/PageAnim", ["require", "exports", "module", "famous/core/Engine", "famous/utilities/Timer", "famous/transitions/Transitionable", "famous/utilities/Utility", "famous/transitions/Easing", "famous/core/RenderNode", "famous/core/Surface", "famous/surfaces/ImageSurface", "famous/views/RenderController", "views/OverlayView", "views/StageView", "famous/core/Transform", "utils/TransformUtils", "utils/TransitionUtils", "views/MetNodeView", "actions/MetNodeAction", "actions/MetHook", "utils/DebugUtils", "utils/DeviceUtils"], function (e, t, n) {
    "use strict";
    function T() {
      this.context = null,
        this.initializing = !1,
        this.initialLoading = null,
        this.hookTimer = null,
        this.hookCurPageView = null,
        this.hookOtherPageView1 = null,
        this.hookOtherPageView2 = null,
        this.forceTimer = null,
        this.forceTrans = null,
        this.activeNodeView = null,
        this.pushingNodeView = null,
        this.draggingNodeView = null,
        this.progressT = 0,
        this.progressOT1 = 0,
        this.progressOT2 = 0,
        this.project = {},
        this.cachePagesAll = null,
        this.pages = {},
        this.layouts = {},
        this.chapterPageIDs = [],
        this.sectionPageIDs = [],
        this._layoutsForPages = {},
        this.currentChapter = window._initChapter || 0,
        this.currentSection = window._initSection || 0,
        this.currentPageView = null,
        this.prevChapterView = null,
        this.nextChapterView = null,
        this.prevSectionView = null,
        this.nextSectionView = null,
        this.allPageViewsPrepaired = !1,
        this.currentOverlayView = null,
        this.chapterChangeDirection = 0,
        this.sectionChangeDirection = 0,
        this.renderController = new c,
        this.overlayController = new c,
        this.intervalHandlerLoadingProgress = null,
        this.projectLoadingProgress = 0,
        this.pagesLoadingProgress = 0,
        this.preCachesLoadingProgress = 0,
        this.isPortrait = !0
    }
    function N() {
      if (null === this.project)
        return;
      var e = this.project.projectType || 0
        , t = document.getElementById("met-view")
        , n = 0
        , r = 0
        , i = document.documentElement.clientWidth
        , s = document.documentElement.clientHeight;
      window.__mendian_tail_height ? (w.isTouchDevice() || i > 960 && (n = i / 2 - 480,
        i = 960),
        s -= window.__mendian_tail_height / 750 * i) : !E.mobile() && !window.GlobalData.isMicroApp && i > this.project.width && (n = i / 2 - this.project.width / 2,
          i = this.project.width);
      var o = n + "px"
        , u = r + "px"
        , a = i + "px"
        , f = s + "px";
      if (a !== t.style.width || f !== t.style.height || o !== t.style.marginLeft || u !== t.style.marginTop)
        t.style.left = o,
          t.style.top = u,
          t.style.width = a,
          t.style.height = f;
      return this.context && this.context.setSize([i, s]),
        t
    }
    function C() {
      N.call(this),
        tt.call(this)
    }
    function k() {
      if (w.fullscreenElement())
        return;
      this.isPortrait !== A() && L.call(this),
        C.call(this, !1)
    }
    function L() {
      if (w.isInIframe())
        return;
      if (w.isNativeApp())
        return;
      if (w.isAndroidDevice())
        return;
      var e = w.isTouchDevice();
      if (!e)
        return;
      var t = document.getElementById("rotation_tip_view")
        , n = this.project.rotateScreenIconURL || "";
      this.isPortrait = A();
      var r;
      if (!this.currentPageView) {
        i.after(function () {
          L.call(this)
        }
          .bind(this), 10);
        return
      }
      r = this.currentPageView.pageDesc.designHeight >= this.currentPageView.pageDesc.designWidth;
      if (n.length === 0)
        r !== this.isPortrait ? (t.innerText = r ? "请转到竖直方向以获得更好的浏览效果" : "请转到水平方向以获得更好的浏览效果",
          t.style.display = "block") : (t.innerText = "",
            t.style.display = "none");
      else {
        t.style.backgroundColor = w.rgba2ColorString(this.project.rotateScreenBgColor),
          t.style.border = "",
          t.style.overflow = "visible",
          t.style.left = "0%",
          t.style.top = "0%",
          t.style.width = "100%",
          t.style.height = "100%";
        if (r !== this.isPortrait) {
          null === x && (x = window.devicePixelRatio || 1);
          var s = Math.floor((this.project.rotatingIconWidth || 100) / x)
            , o = Math.floor((this.project.rotatingIconHeight || 100) / x);
          t.innerHTML = "<img src='" + window.GlobalData.homePath + "zres/" + n + "' style='position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);width:" + s + "px;height:" + o + "px;'>",
            t.style.display = "block"
        } else
          t.innerHTML = "",
            t.style.display = "none"
      }
    }
    function A() {
      var e = w.isTouchDevice();
      if (!e)
        return !0;
      var t = document.documentElement.clientWidth
        , n = document.documentElement.clientHeight;
      return n >= t
    }
    function O() {
      return this.context.getSize()
    }
    function M() {
      this.isPortrait = A();
      var e = N.call(this);
      this.context = r.createContext(e),
        w.isAndroidDevice() || r.on("resize", k.bind(this)),
        X.call(this),
        this.setupGlobalEventHandling.call(this),
        L.call(this),
        this.setupPageVisibilityChangeEventHandling.call(this),
        this.setupFullscreenChangeEventHandling.call(this),
        this.setupPageShowEventHandling.call(this),
        w.isWeiXin() && this.setupWxReadyHandling.call(this)
    }
    function _(e) {
      var t = {
        chapter: 0,
        section: 0
      }
        , n = this.chapterPageIDs.length
        , r = !1;
      for (var i = 0; i < n; i++) {
        if (e === this.chapterPageIDs[i]) {
          t.chapter = i,
            r = !0;
          break
        }
        var s = this.sectionPageIDs[i].length;
        for (var o = 0; o < s; o++)
          if (e === this.sectionPageIDs[i][o]) {
            t.chapter = i,
              t.section = o + 1,
              r = !0;
            break
          }
        if (r)
          break
      }
      return r ? t : null
    }
    function D() {
      for (var e in this.pages)
        if (!this.pages[e].layoutsLoaded)
          return !1;
      return !0
    }
    function P(e) {
      e.pageLayoutInfos || (e.pageLayoutInfos = [{
        layoutID: e.id_,
        width: e.width,
        height: e.height,
        layoutType: 4
      }])
    }
    function H(e) {
      P(e);
      var t = e.pageLayoutInfos
        , n = 0
        , r = t.length;
      for (var i = 0, s = t.length; i < s; i++)
        (function () {
          var s = t[i]
            , u = s.layoutID;
          if (e.id_ !== u) {
            var a = function (t) {
              var i = typeof t == "string" ? JSON.parse(t) : t;
              i.belongsToPageID = e.id_,
                i.designWidth = s.width,
                i.designHeight = s.height,
                this.layouts[u] = i,
                n++,
                n >= r && (e.layoutsLoaded = !0)
            };
            window["____" + u + "_json_obj"] ? a.call(this, window["____" + u + "_json_obj"]) : this.project.pagesAllIn1 && this.cachePagesAll ? a.call(this, this.cachePagesAll[u + ".json"]) : o.loadURL(window.GlobalData.homePath + "zres/pages/" + u + ".json", -1, a.bind(this))
          } else
            e.designWidth = s.width,
              e.designHeight = s.height,
              this.layouts[u] = e,
              n++,
              n >= r && (e.layoutsLoaded = !0)
        }
        ).bind(this)()
    }
    function B(e, t) {
      e >= t && I.call(this)
    }
    function j(e) {
      var t = 0
        , n = e.length;
      if (t >= n)
        B.call(this, t, n);
      else
        for (var r = 0, i = e.length; r < i; r++)
          (function () {
            var i = this.chapterPageIDs[r] = e[r];
            this.sectionPageIDs[r] = [];
            var s = function (e) {
              var r = typeof e == "string" ? JSON.parse(e) : e;
              this.pages[i] = r,
                H.call(this, r),
                t++,
                B.call(this, t, n)
            };
            window["____" + i + "_json_obj"] ? s.call(this, window["____" + i + "_json_obj"]) : this.project.pagesAllIn1 && this.cachePagesAll ? s.call(this, this.cachePagesAll[i + ".json"]) : o.loadURL(window.GlobalData.homePath + "zres/pages/" + i + ".json", -1, s.bind(this))
          }
          ).bind(this)()
    }
    function F(e, t) {
      if (e >= t)
        var n = i.every(function () {
          D.call(this) && (this.showPage(this.currentChapter, this.currentSection, !1),
            i.clear(n),
            n = null)
        }
          .bind(this), 2)
    }
    function I() {
      var e = [];
      for (var t = 0, n = this.chapterPageIDs.length; t < n; t++) {
        var r = this.pages[this.chapterPageIDs[t]].pageIDs || [];
        for (var i = 0, s = r.length; i < s; i++) {
          var u = r[i];
          e.push([u, t])
        }
      }
      var a = 0
        , f = e.length;
      if (a >= f)
        F.call(this, a, f);
      else
        for (var i = 0, s = e.length; i < s; i++)
          (function () {
            var t = e[i][0]
              , n = e[i][1];
            this.sectionPageIDs[n].push(t);
            var r = function (e) {
              var n = typeof e == "string" ? JSON.parse(e) : e;
              this.pages[t] = n,
                H.call(this, n),
                a++,
                F.call(this, a, f)
            };
            window["____" + t + "_json_obj"] ? r.call(this, window["____" + t + "_json_obj"]) : this.project.pagesAllIn1 && this.cachePagesAll ? r.call(this, this.cachePagesAll[t + ".json"]) : o.loadURL(window.GlobalData.homePath + "zres/pages/" + t + ".json", -1, r.bind(this))
          }
          ).bind(this)()
    }
    function q() {
      var e = this
        , t = e.projectLoadingProgress;
      t >= 1 && (e.project.pagesAllIn1 || (e.pagesLoadingProgress < 1 && (e.pagesLoadingProgress += .1),
        e.pagesLoadingProgress > 1 && (e.pagesLoadingProgress = 1)));
      var n = e.pagesLoadingProgress;
      if (t >= 1 && n >= 1 && e.currentPageView) {
        var r = e.initialLoading;
        if (r) {
          var i = r.length;
          if (i > 0) {
            var s = 0;
            for (var o = 0, u = r.length; o < u; o++) {
              var a = r[o];
              (a.preloadState === 2 || a.preloadState === -1) && s++
            }
            e.preCachesLoadingProgress = Math.min(1, s / i)
          } else
            e.preCachesLoadingProgress = 1
        }
      }
      var f = e.preCachesLoadingProgress
        , l = t * .125 + n * .125 + f * .75;
      l > 1 && (l = 1);
      if (window.GlobalData.isH5) {
        var c = document.getElementById("progress_bar");
        c && (c.style.width = "" + Math.floor(l * 100) + "%");
        var h = document.getElementById("progress_percent");
        h && (h.innerText = c.style.width)
      } else if (window.GlobalData.isMicroApp) {
        var h = document.querySelector("#progress_view .loadingNum");
        h && (h.innerText = "" + Math.floor(l * 100) + "%");
        var p = document.querySelector("#progress_view .loadingMoveBox-left-round");
        p && (l > .5 ? p.style.webkitTransform = p.style.transform = "rotate(" + (l - .5) * 360 + "deg)" : p.style.webkitTransform = p.style.transform = "");
        var d = document.querySelector("#progress_view .loadingMoveBox-right-round");
        d && (l <= .5 ? d.style.webkitTransform = d.style.transform = "rotate(" + l * 360 + "deg)" : d.style.webkitTransform = d.style.transform = "rotate(180deg)")
      }
      window.__mendian_tail_height && window.mci.setProgress(l),
        f >= 1 && (U.call(e),
          R.call(e),
          z.call(e))
    }
    function R() {
      var e = this;
      e.intervalHandlerLoadingProgress && i.clear(e.intervalHandlerLoadingProgress),
        e.intervalHandlerLoadingProgress = null,
        e.projectLoadingProgress = 0,
        e.pagesLoadingProgress = 0,
        e.preCachesLoadingProgress = 0,
        e.initializing = !1,
        e.initialLoading = null,
        e.cachePagesAll = null;
      var t = e.currentPageView;
      t.activeStage();
      if (null !== e.currentOverlayView) {
        var n = e.currentOverlayView.nodes;
        for (var r = 0, s = n.length; r < s; r++) {
          var o = n[r];
          o.isValid && o.visible && o.activeMetSubNode()
        }
      }
      w.isTouchDevice() || (lt || (lt = new ct(e)),
        document.addEventListener("mouseout", function (e) {
          e = e ? e : window.event;
          var t = e.relatedTarget || e.toElement;
          (!t || t.nodeName === "HTML") && lt.on_up(e)
        }, !1))
    }
    function z() {
      var e = this;
      window.__API__.getPageList = function () {
        var t = [];
        for (var n = 0, r = e.chapterPageIDs.length; n < r; n++) {
          var i = e.sectionPageIDs[n].length
            , s = e.chapterPageIDs[n]
            , o = e.pages[s]
            , u = (o.thumbImageSetting || {}).rawImageURL || "";
          t.push({
            pageID: s,
            title: o.name || "",
            desc: o.pageDescription || "",
            thumb: u,
            chapter: n,
            section: 0,
            section_count: i,
            tag: o.tag || 0
          });
          var i = e.sectionPageIDs[n].length;
          for (var a = 0; a < i; a++) {
            var f = e.sectionPageIDs[n][a]
              , l = e.pages[f]
              , c = (l.thumbImageSetting || {}).rawImageURL || "";
            t.push({
              pageID: f,
              title: l.name || "",
              desc: l.pageDescription || "",
              thumb: c,
              chapter: n,
              section: a + 1,
              section_count: 0,
              tag: l.tag || 0
            })
          }
        }
        return JSON.stringify(t)
      }
        ,
        window.__API__.showPage = function (t, n, r) {
          e.showPage(t, n, r)
        }
        ,
        window.__API__.changePage = function (t, n) {
          e.changePage(t, n)
        }
        ,
        window.__API__.isReady = function () {
          return !0
        }
        ,
        window.____imReady && window.____imReady()
    }
    function W(e, t, n, r, i, s, o, u) {
      var a = this
        , f = a.renderController
        , l = O.call(a);
      if (null !== t) {
        var c = m.synthesizeAnimateOptions(o, r, i, l, [u, 1 - u])
          , h = c.visible
          , p = c.zIndex;
        h ? (vt(f, t, c),
          t.setZIndex(p)) : t.isAway || ht(f, t)
      }
      if (null !== n) {
        var d = m.synthesizeAnimateOptions(o, r, s, l, [u, 1 - u])
          , h = d.visible
          , p = d.zIndex;
        h ? (vt(f, n, d),
          n.setZIndex(p)) : n.isAway || ht(f, n)
      }
      var v = m.synthesizeAnimateOptions(o, r, 0, l, [u, 1 - u])
        , h = v.visible
        , p = v.zIndex;
      h ? (vt(f, e, v),
        e.setZIndex(p)) : e.isAway || ht(f, e),
        a.progressT = r,
        a.progressOT1 = r + i,
        a.progressOT2 = r + s
    }
    function X() {
      var e = this
        , t = e.renderController
        , n = O.call(e)
        , o = null
        , a = null
        , f = null
        , l = null
        , c = null
        , h = null
        , p = null
        , d = function (e) {
          if (e && e.srcElement)
            if (e.srcElement.type === "text" || e.srcElement.type === "textarea")
              return !0;
          return !1
        }
        , m = function (t) {
          d(t) || t.preventDefault();
          if (!e.currentPageView)
            return;
          if (null !== o)
            return;
          if (null !== e.forceTimer)
            return;
          o = v.absolutePos4Event(t)
        }
        , g = function (t) {
          d(t) || t.preventDefault();
          if (!e.currentPageView)
            return;
          if (null === o)
            return;
          if (w.isGestureMovingRefuse(null))
            return;
          if (w.isRangePagingRefuse())
            return;
          var i = v.absolutePos4Event(t);
          null === p && (p = r.getCurrentFrameTime(),
            t.type !== "mousewheel" && (o = i));
          var s = [i[0] - o[0], i[1] - o[1]]
            , u = !1;
          if (null === a) {
            if (Math.abs(s[0]) + Math.abs(s[1]) > 12)
              if (Math.abs(s[1]) > Math.abs(s[0])) {
                if (e.chapterChangeDirection === 0 || e.sectionChangeDirection === 0)
                  a = 0
              } else if (e.chapterChangeDirection === 1 || e.sectionChangeDirection === 1)
                a = 1;
            null !== a && (u = !0)
          }
          if (null === a)
            return;
          if (0 === a && null === f)
            if (s[1] > 0 && !e.currentPageView.scrollView.isOnTopEdge() || s[1] < 0 && !e.currentPageView.scrollView.isOnBottomEdge()) {
              o = i,
                a = null;
              return
            }
          null === f && e.sectionChangeDirection === a && K.call(e, 0, s[1 - a] > 0 ? -1 : 1) && (f = e.project.grade2TransitionStyle),
            null === f && e.chapterChangeDirection === a && K.call(e, s[1 - a] > 0 ? -1 : 1, 0) && (f = e.project.grade1TransitionStyle);
          if (null === f || 0 === f)
            return;
          var m = Math.max(-1, Math.min(1, s[1 - a] / n[1 - a]));
          V.call(e, e.currentPageView, l, c);
          if (u) {
            if (e.sectionChangeDirection === a) {
              if (K.call(e, 0, -1))
                nt(e.prevSectionView, e.currentChapter, e.currentSection - 1) || (e.prevSectionView = it.call(e, e.currentChapter, e.currentSection - 1)),
                  l = e.prevSectionView;
              else if (e.chapterChangeDirection === a && K.call(e, -1, 0)) {
                var g = e.sectionChangeDirection === e.chapterChangeDirection ? Q.call(e, e.currentChapter - 1) : 0;
                nt(e.prevChapterView, e.currentChapter - 1, g) || (e.prevChapterView = it.call(e, e.currentChapter - 1, g)),
                  l = e.prevChapterView
              }
              K.call(e, 0, 1) ? (nt(e.nextSectionView, e.currentChapter, e.currentSection + 1) || (e.nextSectionView = it.call(e, e.currentChapter, e.currentSection + 1)),
                c = e.nextSectionView) : e.chapterChangeDirection === a && K.call(e, 1, 0) && (nt(e.nextChapterView, e.currentChapter + 1, 0) || (e.nextChapterView = it.call(e, e.currentChapter + 1, 0)),
                  c = e.nextChapterView)
            } else if (e.chapterChangeDirection === a) {
              if (K.call(e, -1, 0)) {
                var g = e.sectionChangeDirection === e.chapterChangeDirection ? Q.call(e, e.currentChapter - 1) : 0;
                nt(e.prevChapterView, e.currentChapter - 1, g) || (e.prevChapterView = it.call(e, e.currentChapter - 1, g)),
                  l = e.prevChapterView
              }
              K.call(e, 1, 0) && (nt(e.nextChapterView, e.currentChapter + 1, 0) || (e.nextChapterView = it.call(e, e.currentChapter + 1, 0)),
                c = e.nextChapterView)
            }
            null !== l && (a === 0 ? l.goBottom() : l.goTop()),
              null !== c && c.goTop()
          }
          W.call(e, e.currentPageView, l, c, h = m, -1, 1, f, a),
            window.__pageChanging && window.__pageChanging(e.currentPageView.chapter, e.currentPageView.section, e.currentPageView.chapter, e.currentPageView.section, m, e.chapterChangeDirection === a, e.sectionChangeDirection === a)
        }
        , y = function (m) {
          d(m) || m.preventDefault();
          if (!e.currentPageView)
            return;
          if (m.type === "mouseout" && !v.isEventOutsideOfElement(m, document.body))
            return;
          if (null === o) {
            f = null;
            return
          }
          var g = v.absolutePos4Event(m)
            , y = [g[0] - o[0], g[1] - o[1]];
          o = null;
          var b = r.getCurrentFrameTime()
            , w = y[1 - a] / Math.max(1, b - p);
          p = null;
          if (null === a)
            return;
          var E = function (r, o, l, c, h, p, d, v, m, g, y) {
            var b = e.currentChapter
              , w = e.currentSection;
            window.__pageChanging && window.__pageChanging(b, w, r.chapter, r.section, c, e.chapterChangeDirection === a, e.sectionChangeDirection === a);
            if (null !== e.forceTimer)
              return;
            var E = null !== r && r !== e.currentPageView;
            E && (e.currentPageView = r);
            var S = 500 * Math.min(1, Math.abs(c))
              , x = {
                duration: S,
                curve: u.outSine
              }
              , T = f
              , N = a;
            null !== e.forceTrans && e.forceTrans.halt(),
              e.forceTrans = new s(c),
              e.forceTimer = i.every(function () {
                var t = e.forceTrans.get();
                e.forceTimer && (t = Math.floor(n[1 - N] * t) / n[1 - N],
                  W.call(e, r, o, l, t, d + v - (h + p), m + g - (h + p), T, N),
                  window.__pageChanging && window.__pageChanging(b, w, r.chapter, r.section, t, e.chapterChangeDirection === N, e.sectionChangeDirection === N))
              }, 1),
              i.after(function () {
                V.call(e, r, o, l)
              }, 1),
              e.forceTrans.set(0, x, function () {
                G.call(e),
                  e.progressT = 0,
                  J.call(e),
                  r.setZIndex(1),
                  E && (r.activeStage(),
                    r.preloadStageImages()),
                  at.call(e, r.pageId),
                  E ? (Z.call(e),
                    et.call(e)) : pt(t, r),
                  window.__pageChanging && window.__pageChanging(r.chapter, r.section, r.chapter, r.section, 0, e.chapterChangeDirection === N, e.sectionChangeDirection === N)
              })
          };
          y[1 - a] >= 0 && c && (c.deactiveStage(),
            c !== l && ht(t, c),
            c = null),
            y[1 - a] <= 0 && l && (l.deactiveStage(),
              l !== c && ht(t, l),
              l = null);
          var S = !1
            , x = .333;
          !S && e.sectionChangeDirection === a && (m.type === "mousewheel" && (w > 0 ? w = x * 2 : w < 0 && (w = -x * 2)),
            w > x || y[1 - a] > n[1 - a] * .15 ? K.call(e, 0, -1) && null !== l && (E(l, e.currentPageView, c, h - 1, 1, -1, 1, 0, 1, 1, e.project.grade2TransitionStyle),
              e.currentSection--,
              S = !0) : (w < -x || y[1 - a] < -n[1 - a] * .15) && K.call(e, 0, 1) && null !== c && (E(c, l, e.currentPageView, h + 1, -1, 1, -1, -1, -1, 0, e.project.grade2TransitionStyle),
                e.currentSection++,
                S = !0)),
            !S && e.chapterChangeDirection === a && (m.type === "mousewheel" && (w > 0 ? w = x * 2 : w < 0 && (w = -x * 2)),
              w > x || y[1 - a] > n[1 - a] * .15 ? K.call(e, -1, 0) && null !== l && (E(l, e.currentPageView, c, h - 1, 1, -1, 1, 0, 1, 1, e.project.grade1TransitionStyle),
                e.currentChapter--,
                e.currentSection = l.section || 0,
                S = !0) : (w < -x || y[1 - a] < -n[1 - a] * .15) && K.call(e, 1, 0) && null !== c && (E(c, l, e.currentPageView, h + 1, -1, 1, -1, -1, -1, 0, e.project.grade1TransitionStyle),
                  e.currentChapter++,
                  e.currentSection = 0,
                  S = !0)),
            null !== f && 0 !== f && (S || E(e.currentPageView, l, c, h, 0, 0, 0, -1, 0, 1, null)),
            l = null,
            c = null,
            f = null,
            a = null,
            h = null
        };
      r.on("_e_down", m),
        r.on("_e_move", g),
        r.on("_e_out", y),
        r.on("_e_up", y)
    }
    function V(e, t, n) {
      this.hookCurPageView = e,
        this.hookOtherPageView1 = t,
        this.hookOtherPageView2 = n,
        null === this.hookTimer && (this.hookTimer = i.every($.bind(this), 1))
    }
    function $() {
      var e = [this.hookCurPageView, this.hookOtherPageView1, this.hookOtherPageView2]
        , t = [this.progressT, this.progressOT1, this.progressOT2];
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        if (!r)
          continue;
        var i = Math.max(-1, Math.min(1, t[n]))
          , s = r.hooks;
        for (var o = 0; o < s.length; o++) {
          var u = s[o];
          u.executeStep(1 - Math.abs(i))
        }
      }
    }
    function J() {
      this.hookTimer && (i.clear(this.hookTimer),
        this.hookTimer = null),
        this.hookCurPageView = this.hookOtherPageView1 = this.hookOtherPageView2 = null
    }
    function K(e, t) {
      if (e !== 0) {
        var n = this.chapterPageIDs;
        e = this.currentChapter + e;
        if (e < 0 || e > n.length - 1)
          return !1
      } else {
        if (t === 0)
          return !1;
        var n = this.sectionPageIDs[this.currentChapter];
        t = this.currentSection + t;
        if (t < 0 || t > n.length)
          return !1
      }
      return !0
    }
    function Q(e) {
      var t = this.sectionPageIDs[e];
      return t instanceof Array ? t.length : 0
    }
    function G() {
      this.forceTimer && (i.clear(this.forceTimer),
        this.forceTimer = null),
        this.forceTrans && (this.forceTrans.halt(),
          this.forceTrans = null)
    }
    function Y(e) {
      if (!e)
        return;
      this.initializing = !0,
        this.initialLoading = [],
        this.project = typeof e == "string" ? JSON.parse(e) : e,
        w.setConfigValueForKey(this.project.pageLoadingMode || 0, "pageLoadingMode"),
        w.setConfigValueForKey(this.project.statesLoadingMode || 0, "statesLoadingMode"),
        N.call(this),
        M.call(this),
        this.context.add(this.renderController),
        this.context.add(this.overlayController);
      var t = function (e) {
        return e > 1
      }
        , n = function (e) {
          return e !== 0 ? e === 3 || e === 5 || e === 9 || e === 11 || e === 13 || e === 15 || e === 17 || e === 19 ? 1 : 0 : -1
        };
      this.project.grade1TransitionStyle === 0 ? (this.chapterChangeDirection = -1,
        this.sectionChangeDirection = n(this.project.grade2TransitionStyle)) : this.project.grade2TransitionStyle === 0 ? (this.chapterChangeDirection = n(this.project.grade1TransitionStyle),
          this.sectionChangeDirection = -1) : t(this.project.grade1TransitionStyle) ? t(this.project.grade2TransitionStyle) ? (this.chapterChangeDirection = n(this.project.grade1TransitionStyle),
            this.sectionChangeDirection = n(this.project.grade2TransitionStyle)) : this.sectionChangeDirection = this.chapterChangeDirection = n(this.project.grade1TransitionStyle) : this.chapterChangeDirection = this.sectionChangeDirection = n(this.project.grade2TransitionStyle);
      var r = this.project.pageIDs || [];
      !window.____project_json_obj && this.project.pagesAllIn1 ? o.loadURL(window.GlobalData.homePath + "zres/pages/pagesAllIn1.json", -1, function (e) {
        this.cachePagesAll = typeof e == "string" ? JSON.parse(e) : e,
          j.call(this, r)
      }
        .bind(this), function (e) {
          e > this.pagesLoadingProgress && (this.pagesLoadingProgress = e)
        }
          .bind(this)) : j.call(this, r)
    }
    function Z() {
      var e = this.renderController
        , t = w.configValueForKey("pageLoadingMode");
      if (t !== 0 && !this.allPageViewsPrepaired) {
        var n = this.chapterPageIDs;
        for (var r = 0, i = n.length; r < i; r++) {
          it.call(this, r, 0);
          var s = this.sectionPageIDs[r];
          for (var o = 0, u = s.length; o < u; o++)
            it.call(this, r, o + 1)
        }
        this.allPageViewsPrepaired = !0
      }
      if (K.call(this, -1, 0)) {
        var a = this.sectionChangeDirection === this.chapterChangeDirection ? Q.call(this, this.currentChapter - 1) : 0;
        nt(this.prevChapterView, this.currentChapter - 1, a) || (this.prevChapterView = it.call(this, this.currentChapter - 1, a),
          this.prevChapterView.preloadStageImages())
      } else
        this.prevChapterView = null;
      K.call(this, 1, 0) ? nt(this.nextChapterView, this.currentChapter + 1, 0) || (this.nextChapterView = it.call(this, this.currentChapter + 1, 0),
        this.nextChapterView.preloadStageImages()) : this.nextChapterView = null,
        K.call(this, 0, -1) ? nt(this.prevSectionView, this.currentChapter, this.currentSection - 1) || (this.prevSectionView = it.call(this, this.currentChapter, this.currentSection - 1),
          this.prevSectionView.preloadStageImages()) : this.prevSectionView = null,
        K.call(this, 0, 1) ? nt(this.prevSectionView, this.currentChapter, this.currentSection + 1) || (this.nextSectionView = it.call(this, this.currentChapter, this.currentSection + 1),
          this.nextSectionView.preloadStageImages()) : this.nextSectionView = null;
      if (t === 0) {
        var f = [this.currentPageView, this.prevChapterView, this.nextChapterView, this.prevSectionView, this.nextSectionView];
        e.foreachRenderableExceptSome(f, function (t, n) {
          t.deactiveStage(),
            t.cleanStage(),
            e.removeRenderable(t)
        }),
          f = [this.prevChapterView, this.nextChapterView, this.prevSectionView, this.nextSectionView];
        for (var r = 0, i = f.length; r < i; r++) {
          var l = f[r];
          l && ht(e, l)
        }
      } else {
        var f = [this.currentPageView];
        e.foreachRenderableExceptSome(f, function (t, n) {
          ht(e, t)
        })
      }
    }
    function et() {
      b.unregisterAllHooks();
      var e = []
        , t = this.currentPageView.nodes;
      for (var n = 0, r = t.length; n < r; n++) {
        var i = t[n];
        e.push(i)
      }
      t = this.currentOverlayView.nodes;
      for (var n = 0, r = t.length; n < r; n++) {
        var i = t[n];
        i.isValid && e.push(i)
      }
      t = e;
      var s = null;
      while (t && t.length > 0) {
        s = [];
        for (var n = 0, r = t.length; n < r; n++) {
          var o = t[n]
            , u = o.nodeActions;
          for (var a = 0, f = u.length; a < f; a++) {
            var l = u[a];
            l.registerHooks()
          }
          var c = o.metNodes;
          for (var h = 0, p = c.length; h < p; h++)
            s.push(c[h])
        }
        t = s,
          s = null
      }
    }
    function tt() {
      if (null === this.project)
        return;
      var e = this.context.getSize()
        , t = !1;
      for (var n in this.pages) {
        var r = this.pages[n]
          , i = st.call(this, r);
        if (this._layoutsForPages[r.id_] !== i.id_) {
          t = !0;
          break
        }
      }
      var s = this.renderController.renderables;
      for (var o = 0, u = s.length; o < u; o++) {
        var a = s[o];
        if (!a)
          continue;
        var f = a.pageDesc.belongsToPageID;
        f ? f = this.pages[f] : f = a.pageDesc;
        var i = st.call(this, f);
        if (i.id_ === a.pageId)
          a.setOptions({
            containerSize: e
          }),
            a.containerSize = e,
            a.initStage();
        else {
          var l = [i.designWidth, i.designHeight]
            , c = [i.width, i.height]
            , h = new p({
              pageId: i.id_,
              pageDesc: i,
              projType: this.project.projectType || 0,
              projSize: l,
              pageSize: c,
              containerSize: e,
              chapter: a.chapter,
              section: a.section
            });
          h.initStage(),
            h.populateStage(i.nodes || [], i.hooks || []);
          var d = this.renderController.states[o]
            , v = {
              transform: d.transform._final,
              opacity: d.opacity._final,
              origin: d.origin._final,
              align: d.align._final
            };
          this.renderController.removeRenderable(a),
            this.renderController.insertRenderable(h, v, o),
            this.prevChapterView === a ? this.prevChapterView = h : this.nextChapterView === a ? this.nextChapterView = h : this.prevSectionView === a ? this.prevSectionView = h : this.nextSectionView === a ? this.nextSectionView = h : this.currentPageView === a && (this.currentPageView = h),
            a.actived && h.activeStage(),
            h.isAway = a.isAway,
            h.setVisibility(!h.isAway),
            h.preloadStageImages(),
            a.deactiveStage(),
            a.cleanStage()
        }
      }
      var m = this.currentOverlayView
        , g = this.currentPageView;
      if (!t)
        m && (m.setOptions({
          containerSize: e
        }),
          m.containerSize = e,
          m.initOverlay());
      else if (m && g) {
        m.setOptions({
          containerSize: e
        }),
          m.containerSize = e,
          m.cleanOverlay(),
          m.setOptions({
            projSize: g.projSize
          }),
          m.projSize = g.projSize,
          m.initOverlay();
        for (var n in this.pages) {
          var r = this.pages[n]
            , i = st.call(this, r);
          m.populateOverlay(i.nodes || []),
            this._layoutsForPages[r.id_] = i.id_
        }
        at.call(this, g.pageDesc.id_),
          et.call(this)
      }
      w.gestureMovingSet(null),
        w.setIsRangePagingRefuse(!1)
    }
    function nt(e, t, n) {
      return e && e.chapter === t && e.section === n
    }
    function rt(e, t) {
      var n = this.chapterPageIDs[e];
      return t > 0 && (n = this.sectionPageIDs[e][t - 1]),
        this.pages[n]
    }
    function it(e, t) {
      if (!this.project)
        return null;
      var n = rt.call(this, e, t);
      if (!n)
        return null;
      var r = st.call(this, n)
        , i = this.context.getSize()
        , s = [r.designWidth, r.designHeight]
        , o = [r.width, r.height]
        , u = null
        , a = this.renderController.renderables;
      for (var f = 0, l = a.length; f < l; f++) {
        var c = a[f];
        if (c.pageId === r.id_) {
          u = c;
          break
        }
      }
      return null !== u ? (this.prevChapterView && this.prevChapterView.pageId === r.id_ && (this.prevChapterView = null),
        this.nextChapterView && this.nextChapterView.pageId === r.id_ && (this.nextChapterView = null),
        this.prevSectionView && this.prevSectionView.pageId === r.id_ && (this.prevSectionView = null),
        this.nextSectionView && this.nextSectionView.pageId === r.id_ && (this.nextSectionView = null)) : (u = new p({
          pageId: r.id_,
          pageDesc: r,
          projType: this.project.projectType || 0,
          projSize: s,
          pageSize: o,
          containerSize: i,
          chapter: e,
          section: t
        }),
          u.initStage(),
          u.populateStage(r.nodes || [], r.hooks || []),
          this.renderController.addRenderable(u, {}),
          ht(this.renderController, u)),
        u
    }
    function st(e) {
      var t = null
        , n = null;
      E.mobile() || window.GlobalData.isMicroApp ? E.portrait() ? (t = 0,
        n = 1) : (t = 1,
          n = 0) : E.tablet() ? E.portrait() ? (t = 2,
            n = 3) : (t = 3,
              n = 2) : t = 4;
      if (null === t)
        return e;
      var r = [document.documentElement.clientWidth, document.documentElement.clientHeight];
      P(e);
      var i = e.pageLayoutInfos
        , s = []
        , o = null;
      if (t === 4)
        return o = ot.call(this, i, r),
          o ? this.layouts[o.layoutID] : e;
      o = null;
      for (var u = 0, a = i.length; u < a; u++) {
        var f = i[u];
        t === f.layoutType && s.push(f)
      }
      o = ot.call(this, s, r);
      if (o)
        return this.layouts[o.layoutID];
      s = [],
        o = null;
      for (var u = 0, a = i.length; u < a; u++) {
        if (n === null)
          break;
        var f = i[u];
        n === f.layoutType && s.push(f)
      }
      return o = ot.call(this, s, r),
        o ? this.layouts[o.layoutID] : (o = ot.call(this, i, r),
          o ? this.layouts[o.layoutID] : e)
    }
    function ot(e, t) {
      var n = t[1] / t[0]
        , r = null
        , i = null;
      for (var s = 0, o = e.length; s < o; s++) {
        var u = e[s]
          , a = u.height / u.width;
        r ? a > i ? n > i * .7 + a * .3 && (r = u,
          i = a) : a < i && n < a * .7 + i * .3 && (r = u,
            i = a) : (r = u,
              i = a)
      }
      if (r) {
        var f = .01;
        for (var s = 0, o = e.length; s < o; s++) {
          var u = e[s]
            , a = u.height / u.width;
          Math.abs(a - i) < f && Math.abs(u.width - t[0]) < Math.abs(r.width - t[0]) && (r = u)
        }
      }
      return r
    }
    function ut() {
      if (!this.project)
        return null;
      var e = this.context.getSize(), t;
      this.currentPageView ? t = [this.currentPageView.pageDesc.designWidth, this.currentPageView.pageDesc.designHeight] : t = [this.project.width, this.project.height];
      var n = new h({
        projType: this.project.projectType || 0,
        projSize: t,
        containerSize: e
      });
      n.initOverlay();
      for (var r in this.pages) {
        var i = this.pages[r]
          , s = st.call(this, i);
        n.populateOverlay(s.nodes || []),
          this._layoutsForPages[i.id_] = s.id_
      }
      return n
    }
    function at(e) {
      var t = this
        , n = null === t.currentOverlayView;
      n && (t.currentOverlayView = ut.call(t),
        t.overlayController.addRenderable(t.currentOverlayView, {})),
        t.currentOverlayView.cleanupOverlayByPageID(e);
      var r = w.configValueForKey("pageLoadingMode");
      n && r !== 0 ? t.currentOverlayView.preloadOverlayImages(!0) : t.currentOverlayView.preloadOverlayImages(!1)
    }
    function ft() {
      if (!S)
        return;
      var e = S.sharedInstance();
      for (var t in e.audioNodes) {
        var n = e.audioNodes[t];
        if (n) {
          var r = n.mainSurface;
          r && (1 === r._playState ? r._ever_play || r.play() : 3 === r._playState && (r._currentTarget && r._currentTarget.duration > 0 || r.load()))
        }
      }
      for (var t in e.videoNodes) {
        var n = e.videoNodes[t];
        if (n) {
          var r = n.mainSurface;
          r && (1 === r._playState ? r._ever_play || (n.nodeDesc.fullScreen ? n.startMediaPlay() : r.play()) : 3 === r._playState && (r._currentTarget && r._currentTarget.duration > 0 || r.load()))
        }
      }
    }
    function ct(e) {
      var t = w.isTouchDevice()
        , n = null
        , s = null
        , o = null
        , u = null
        , a = null
        , f = function (e, t, n) {
          if (!n)
            return !1;
          while (n) {
            var r = n.containerSurface || n.mainSurface
              , i = r._currentTarget;
            if (!i)
              return !1;
            var s = v.transformFromElement(i, document.body);
            if (!v.isValidTransform(s))
              return !1;
            var o = [e, t];
            o = v.pointApplyTransform(o, s);
            var u = v.elementBounds(i);
            if (u[2] > 0 || u[3] > 0)
              if (o[0] < u[0] || o[1] < u[1] || o[0] > u[2] || o[1] > u[3])
                return !1;
            do
              n = n.parentNode;
            while (n && n.type !== "MetScrollNode")
          }
          return !0
        }
        , l = function (e) {
          if (!e)
            return !1;
          while (e) {
            if (!e.isMetNodeShown())
              return !1;
            e = e.parentNode
          }
          return !0
        }
        , c = function (t, n, i, s, u, a) {
          if (!t)
            return;
          var c = e.currentPageView
            , d = e.currentOverlayView;
          if (!c || !d)
            return;
          var v = null !== e.forceTimer || 0 !== e.progressT
            , m = [];
          if (!v || u !== "move") {
            var g = c.nodes
              , w = d.nodes;
            for (var E = 0, S = g.length, x = w.length; E < S + x; E++) {
              var T = E < S ? g[E] : w[E - S];
              l(T) && m.push(T)
            }
          }
          var N = m
            , C = null
            , k = []
            , L = [];
          t === "drag" && (u === "move" ? null !== e.draggingNodeView && (N = [],
            L = [e.draggingNodeView]) : e.draggingNodeView = null);
          while (N && N.length > 0) {
            C = [];
            for (var A = 0, O = N.length; A < O; A++) {
              var T = N[A];
              y.hasActions4Gesture(T.nodeActions, t) ? (t === "over" && k.push(T),
                f(n[0], n[1], T) ? L.push(T) : t === "drag" && (u === "up" && T.gestureDragging ? L.push(T) : (n[0] !== i[0] || n[1] !== i[1]) && f(i[0], i[1], T) && L.push(T))) : t === "instantDown" && (b.canDriveHooking(T) ? f(n[0], n[1], T) && L.push(T) : T.type === "ButtonNode" && T.nodeDesc.buttonType === 1 && f(n[0], n[1], T) && L.push(T));
              var g = T.metNodes;
              for (var E = 0, M = g.length; E < M; E++) {
                var _ = g[E];
                l(_) && C.push(_)
              }
            }
            N = C,
              C = null
          }
          L.sort(function (e, t) {
            if (e === t)
              return 0;
            var n = null
              , r = []
              , i = e;
            while (null !== i)
              r.push(i),
                i = i.parentNode;
            var s = []
              , o = t;
            while (null !== o) {
              s.push(o);
              if (-1 !== r.indexOf(o)) {
                n = o;
                break
              }
              o = o.parentNode
            }
            if (n === e)
              return -1;
            if (n === t)
              return 1;
            if (null !== n) {
              var u = r.indexOf(n);
              e = r[u - 1],
                t = s[s.length - 2]
            } else
              e = r[r.length - 1],
                t = s[s.length - 1];
            var a = null !== n ? n.metNodes : m;
            return a.indexOf(e) < a.indexOf(t) ? -1 : 1
          }),
            a = a || window.event,
            a && (a.logic = t);
          if (t === "over") {
            var D = L.length > 0 ? L[L.length - 1] : null;
            for (var A = 0, O = k.length; A < O; A++) {
              var T = k[A];
              if (!T)
                continue;
              if (T === D)
                continue;
              if (T.gestureOvering) {
                var P = T.containerSurface || T.mainSurface;
                P.emit("_e_over_out", a),
                  T.gestureOvering = !1
              }
            }
          }
          var H = !1;
          if (L.length > 0) {
            var T = L[L.length - 1]
              , P = T.containerSurface || T.mainSurface;
            if (t === "drag")
              if (u !== "up") {
                h(T, u, a, !0);
                var B = T.parentNode;
                while (B)
                  y.hasActions4Gesture(B.nodeActions, t) && h(B, u, a, !1),
                    B = B.parentNode
              } else
                for (var A = 0, O = L.length; A < O; A++) {
                  var j = L[O - 1 - A];
                  j.gestureDragging && h(j, u, a, j === T)
                }
            else if (t === "click")
              P.emit("_e_down", a),
                P.emit("_e_up", a),
                H = !0;
            else if (t === "longTap")
              P.emit("_e_longTap", a);
            else if (t === "over")
              T.gestureOvering || (P.emit("_e_over_in", a),
                T.gestureOvering = !0);
            else if (t === "instantDown") {
              if (u === "down")
                if (T.type !== "ButtonNode") {
                  var g = L.map(function (e) {
                    return e.type !== "ButtonNode" ? e.metNodeId : null
                  });
                  b.flagActiveNodeIDS(g),
                    T.type === "MetScrollNode" && P.emit("_e_down", a)
                } else
                  o = "pushOnOff",
                    P.emit("_e_down", a),
                    e.pushingNodeView = T,
                    p();
              t = null
            }
            if (e.activeNodeView && T !== e.activeNodeView) {
              var F = e.activeNodeView.containerSurface || e.activeNodeView.mainSurface;
              F && F.blur && F.blur(),
                e.activeNodeView = null
            }
          } else if (e.activeNodeView && t === "instantDown") {
            var F = e.activeNodeView.containerSurface || e.activeNodeView.mainSurface;
            f(n[0], n[1], e.activeNodeView) || (F && F.blur && F.blur(),
              e.activeNodeView = null)
          }
          e.pushingNodeView && u === "up" && (e.pushingNodeView.containerSurface.emit("_e_up", a),
            e.pushingNodeView = null);
          if (t === "drag")
            u === "down" ? c.scrollView.containerSurface.emit("_e_down", a) : u === "move" ? c.scrollView.containerSurface.emit("_e_move", a) : c.scrollView.containerSurface.emit("_e_up", a),
              u === "down" ? r.emit("_e_down", a) : u === "move" ? r.emit("_e_move", a) : r.emit("_e_up", a);
          else if (t === "longTap") {
            var I = L.length > 0;
            I || (o = null)
          }
          t === "click" && (H || window.____nopTap && window.____nopTap())
        }
        , h = function (t, n, r, i) {
          if (r.type === "mousewheel" && t.type !== "MetScrollNode" && t.type !== "MetStateNode")
            return;
          var s = t.containerSurface || t.mainSurface;
          n === "down" ? (s.emit("_e_down", r),
            i && (e.draggingNodeView = t)) : n === "move" ? s.emit("_e_move", r) : s.emit("_e_up", r),
            t.gestureDragging = n !== "up"
        }
        , p = function () {
          a && (i.clear(a),
            a = null)
        }
        , d = function (e) {
          return e && e.srcElement && w.isAndroidDevice() && e.srcElement.tagName === "IMG" ? !0 : !1
        };
      ct.prototype.on_down = function (e) {
        d(e) || e.preventDefault(),
          e.stopPropagation(),
          w.setIsTouchDown(!0),
          n = v.absolutePos4Event(e),
          u = r.getCurrentFrameTime(),
          o = null,
          p(),
          a = i.setTimeout(function () {
            o = "longTap",
              c(o, n, n, u, null)
          }, 500),
          c("instantDown", n, n, u, "down")
      }
        ,
        ct.prototype.on_move = function (i) {
          d(i) || i.preventDefault(),
            i.stopPropagation(),
            s = v.absolutePos4Event(i);
          if (i.type === "mousewheel") {
            var a = i.wheelDelta || -i.detail;
            a > 0 ? a = Math.max(a, 18) : a < 0 && (a = Math.min(a, -18)),
              n = s,
              s = [s[0], s[1] + a],
              u = r.getCurrentFrameTime(),
              o = "drag",
              c("instantDown", n, n, u, "down"),
              c(o, n, n, u, "down");
            var f = {
              type: "mousewheel",
              pageX: s[0],
              pageY: s[1],
              srcElement: i.srcElement,
              preventDefault: function () { },
              stopPropagation: function () { }
            };
            c(o, n, s, u, "move", f),
              c(o, s, s, u, "up", f),
              n = null,
              s = null,
              o = null,
              u = null,
              p();
            return
          }
          if (null === o || "longTap" === o) {
            if (null !== n) {
              var l = Math.abs(s[0] - n[0]) + Math.abs(s[1] - n[1]);
              l > 4 && (o = "drag",
                c(o, n, s, u, "down"),
                p())
            }
          } else
            "drag" === o && (c(o, n, s, u, "move"),
              p());
          !t && null === n && (null === o || "over" === o) && (o = "over",
            c(o, s, s, null, "move"));
          if (i.type === "touchmove" && v.isEventOutsideOfElement(i, e.eventSurface)) {
            this.on_up(i);
            return
          }
        }
        ,
        ct.prototype.on_up = function (t) {
          d(t) || t.preventDefault(),
            t.stopPropagation(),
            ft.call(e),
            w.setIsTouchDown(!1),
            s = v.absolutePos4Event(t),
            null === o && null !== n && (o = "click"),
            null !== o && "longTap" !== o && "over" !== o && c(o, n, s, u, "up"),
            n = null,
            s = null,
            o = null,
            u = null,
            p(),
            w.gestureMovingSet(null),
            w.setIsRangePagingRefuse(!1)
        }
        ,
        ct.prototype.on_trap = function (e) {
          e.stopPropagation()
        }
    }
    function ht(e, t) {
      t.isAway = !0,
        t.deactiveStage(),
        t.setVisibility(!1)
    }
    function pt(e, t) {
      return dt(e, [t])
    }
    function dt(e, t) {
      return e.foreachRenderableExceptSome(t, function (e, t) {
        e.isAway = !0,
          e.deactiveStage(),
          e.setVisibility(!1)
      })
    }
    function vt(e, t, n) {
      t.isAway = !1,
        t.setVisibility(!0),
        e.addRenderable(t, n)
    }
    function mt(e) {
      var t = w.getCurrentUrlParam("k");
      if (t !== "mendianxiaoweiba") {
        e && e();
        return
      }
      var n = document.getElementById("progress_view");
      n.style.backgroundColor = "white";
      var r = n.children;
      if (r || r.length > 0)
        r[0].style.opacity = "0";
      var i = w.getCurrentUrlParam("server");
      i = i === "test" ? i : "www";
      var s = "supertails_main_js"
        , o = document.getElementById(s);
      o && o.parentNode && o.parentNode.removeChild(o);
      var u = document.createElement("script");
      u.src = "http://" + i + ".csmen.cc/supertails/index.js?v=" + Date.now(),
        u.type = "text/javascript",
        u.charset = "utf-8",
        u.id = "supertails_main_js",
        u.onload = function () {
          window.mci.tailsInit(function (t) {
            window.__mendian_tail_height = t,
              e && e()
          })
        }
        ,
        document.getElementsByTagName("body")[0].appendChild(u)
    }
    var r = e("famous/core/Engine")
      , i = e("famous/utilities/Timer")
      , s = e("famous/transitions/Transitionable")
      , o = e("famous/utilities/Utility")
      , u = e("famous/transitions/Easing")
      , a = e("famous/core/RenderNode")
      , f = e("famous/core/Surface")
      , l = e("famous/surfaces/ImageSurface")
      , c = e("famous/views/RenderController")
      , h = e("views/OverlayView")
      , p = e("views/StageView")
      , d = e("famous/core/Transform")
      , v = e("utils/TransformUtils")
      , m = e("utils/TransitionUtils")
      , g = e("views/MetNodeView")
      , y = e("actions/MetNodeAction")
      , b = e("actions/MetHook")
      , w = e("utils/DebugUtils")
      , E = e("utils/DeviceUtils")
      , S = e(["tools/MetNodeFactory"], function (e) {
        S = e
      })
      , x = null;
    T.prototype.changePage = function (e, t) {
      var n = _.call(this, e);
      if (!n)
        return;
      if (this.currentChapter === n.chapter && this.currentSection === n.section)
        return;
      this.showPage(n.chapter, n.section, t)
    }
      ;
    var U = function () {
      var e = document.getElementById("progress_view");
      e.outerHTML = ""
    };
    T.prototype.showPage = function (e, t, n) {
      var r = this;
      if (null !== r.forceTimer)
        return;
      var o = r.renderController
        , a = o.renderables.length
        , f = a === 0
        , l = r.currentChapter !== e || r.currentSection !== t;
      n && (f || !l) && (n = !1);
      var c = 0
        , h = 0
        , p = 0;
      if (n) {
        var d = O.call(r);
        r.currentChapter === e ? (c = r.project.grade2TransitionStyle,
          h = r.sectionChangeDirection,
          p = t >= r.currentSection ? -1 : 1) : (c = r.project.grade1TransitionStyle,
            h = r.chapterChangeDirection,
            p = e >= r.currentChapter ? -1 : 1)
      }
      var v = null;
      f || (v = r.currentPageView);
      var m = null;
      if (!v || v.chapter !== e || v.section !== t)
        m = it.call(r, e, t);
      dt(o, [v, m]),
        l && !f && V.call(r, v, p > 0 ? m : null, p < 0 ? m : null);
      var g = r.currentChapter
        , y = r.currentSection
        , b = m || v
        , w = function () {
          J.call(r),
            m !== null ? (m.isAway = !1,
              r.initializing || m.activeStage(),
              m.preloadStageImages(),
              pt(o, m),
              m.setZIndex(1)) : (pt(o, v),
                v.setZIndex(1)),
            at.call(r, b.pageId);
          if (l || f)
            Z.call(r),
              et.call(r);
          window.__pageChanging && window.__pageChanging(g, y, e, t, 0, e !== g, e === g && t !== y)
        };
      r.currentChapter = e,
        r.currentSection = t,
        r.currentPageView = b;
      if (n) {
        var E = {
          duration: 500,
          curve: u.outSine
        };
        null !== r.forceTrans && r.forceTrans.halt(),
          r.forceTrans = new s(0),
          r.forceTimer = i.every(function () {
            var n = r.forceTrans.get();
            r.forceTimer && (W.call(r, v, m, null, n, -p, 0, c, h),
              window.__pageChanging && window.__pageChanging(g, y, e, t, n, e !== g, e === g && t !== y))
          }, 1),
          r.forceTrans.set(p, E, function () {
            G.call(r),
              r.progressT = 0,
              w()
          })
      } else
        m !== null && vt(o, m, {}),
          w()
    }
      ;
    var lt = null;
    T.prototype.setupGlobalEventHandling = function () {
      var e = document.getElementById("met-view");
      if (!e)
        return;
      lt || (lt = new ct(this)),
        w.isTouchDevice() ? (e.addEventListener("touchstart", lt.on_down, {
          passive: !1
        }),
          e.addEventListener("touchmove", lt.on_move, {
            passive: !1
          }),
          e.addEventListener("touchcancel", lt.on_up, {
            passive: !1
          }),
          e.addEventListener("touchend", lt.on_up, {
            passive: !1
          })) : (e.addEventListener("mousedown", lt.on_down),
            e.addEventListener("mousemove", lt.on_move),
            e.addEventListener("mousewheel", lt.on_move),
            e.addEventListener("mouseup", lt.on_up))
    }
      ,
      T.prototype.removeGlobalEventHandling = function () {
        var e = document.getElementById("met-view");
        if (!e)
          return;
        if (!lt)
          return;
        w.isTouchDevice() ? (e.removeEventListener("touchstart", lt.on_down),
          e.removeEventListener("touchmove", lt.on_move),
          e.removeEventListener("touchcancel", lt.on_up),
          e.removeEventListener("touchend", lt.on_up)) : (e.removeEventListener("mousedown", lt.on_down),
            e.removeEventListener("mousemove", lt.on_move),
            e.removeEventListener("mouseup", lt.on_up))
      }
      ,
      T.prototype.initGlobalEventTrap = function (e) {
        if (!e)
          return;
        lt || (lt = new ct(this)),
          w.isTouchDevice() ? (e.on("touchstart", lt.on_trap),
            e.on("touchmove", lt.on_trap),
            e.on("touchcancel", lt.on_trap),
            e.on("touchend", lt.on_trap)) : (e.on("mousedown", lt.on_trap),
              e.on("mousemove", lt.on_trap),
              e.on("mouseup", lt.on_trap))
      }
      ,
      T.prototype.setupPageVisibilityChangeEventHandling = function () {
        var e = [];
        document.addEventListener("visibilitychange", function () {
          if (document.visibilityState === "visible") {
            for (var t = 0, n = e.length; t < n; t++) {
              var r = e[t];
              r && r.mainSurface.play()
            }
            e = []
          }
          if (document.visibilityState === "hidden") {
            var i = S.sharedInstance();
            for (var s in i.audioNodes) {
              var o = i.audioNodes[s];
              o.isMediaPlaying() && (o.mainSurface.pause(),
                e.push(o))
            }
            for (var s in i.videoNodes) {
              var o = i.videoNodes[s];
              o.isMediaPlaying() && (o.mainSurface.pause(),
                e.push(o))
            }
          }
        })
      }
      ,
      T.prototype.setupPageShowEventHandling = function () {
        E.ios() && (window.onpageshow = function (e) {
          e.persisted && r.setForceRepainting(!0)
        }
        )
      }
      ,
      T.prototype.setupFullscreenChangeEventHandling = function () {
        var e = undefined;
        document.onwebkitfullscreenchange = function () {
          var t = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
          t ? e = t : e && e.nodeName.toLowerCase() === "video" && (e.paused || e.pause(),
            e = undefined)
        }
      }
      ,
      T.prototype.setupWxReadyHandling = function () {
        if (!w.isWeiXin())
          return;
        if (w.isAndroidDevice())
          return;
        var e = this;
        w.isWeiXinReady() ? ft.call(e) : (wx.config({
          debug: !1,
          appId: "",
          timestamp: 1,
          nonceStr: "",
          signature: "",
          jsApiList: []
        }),
          wx.ready(function () {
            ft.call(e)
          }))
      }
      ,
      T.prototype.init = function () {
        var e = this;
        e.intervalHandlerLoadingProgress = i.every(function () {
          q.call(e)
        }, 1),
          mt(function () {
            window.____project_json_obj ? (e.projectLoadingProgress = 1,
              e.pagesLoadingProgress = 1,
              Y.call(e, window.____project_json_obj)) : o.loadURL(window.GlobalData.homePath + "zres/project.json", -1, Y.bind(e), function (t) {
                t > e.projectLoadingProgress && (e.projectLoadingProgress = t)
              })
          })
      }
      ,
      T.sharedInstance = function () {
        return T._instance || (T._instance = new T),
          T._instance
      }
      ,
      n.exports = T
  }),
  define("main", ["require", "exports", "module", "utils/DebugUtils", "animations/PageAnim"], function (e, t, n) {
    "use strict";
    var r = e("utils/DebugUtils")
      , i = document.getElementById("qr");
    window._displayMode === 0 || r.isTouchDevice() ? i.outerHTML = "" : (i.src = window.GlobalData.homePath + "zres/qr.png",
      i.style.display = "block"),
      e(["actions/MetNodeAction", "tools/MetNodeFactory"], function () {
        var t = e("animations/PageAnim")
          , n = t.sharedInstance();
        n.init()
      })
  });
