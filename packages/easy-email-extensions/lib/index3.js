import React__default from "react";
import { c as commonjsGlobal } from "./index2.js";
import "easy-email-editor";
import "easy-email-core";
import "react-dom";
import "react-final-form";
var codemirror$1 = "";
var material = "";
var neat = "";
var codemirror = { exports: {} };
(function(module, exports) {
  (function(global, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    var userAgent = navigator.userAgent;
    var platform = navigator.platform;
    var gecko = /gecko\/\d/i.test(userAgent);
    var ie_upto10 = /MSIE \d/.test(userAgent);
    var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent);
    var edge = /Edge\/(\d+)/.exec(userAgent);
    var ie = ie_upto10 || ie_11up || edge;
    var ie_version = ie && (ie_upto10 ? document.documentMode || 6 : +(edge || ie_11up)[1]);
    var webkit = !edge && /WebKit\//.test(userAgent);
    var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(userAgent);
    var chrome = !edge && /Chrome\//.test(userAgent);
    var presto = /Opera\//.test(userAgent);
    var safari = /Apple Computer/.test(navigator.vendor);
    var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(userAgent);
    var phantom = /PhantomJS/.test(userAgent);
    var ios = safari && (/Mobile\/\w+/.test(userAgent) || navigator.maxTouchPoints > 2);
    var android = /Android/.test(userAgent);
    var mobile = ios || android || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
    var mac = ios || /Mac/.test(platform);
    var chromeOS = /\bCrOS\b/.test(userAgent);
    var windows = /win/i.test(platform);
    var presto_version = presto && userAgent.match(/Version\/(\d*\.\d*)/);
    if (presto_version) {
      presto_version = Number(presto_version[1]);
    }
    if (presto_version && presto_version >= 15) {
      presto = false;
      webkit = true;
    }
    var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
    var captureRightClick = gecko || ie && ie_version >= 9;
    function classTest(cls) {
      return new RegExp("(^|\\s)" + cls + "(?:$|\\s)\\s*");
    }
    var rmClass = function(node, cls) {
      var current = node.className;
      var match = classTest(cls).exec(current);
      if (match) {
        var after = current.slice(match.index + match[0].length);
        node.className = current.slice(0, match.index) + (after ? match[1] + after : "");
      }
    };
    function removeChildren(e) {
      for (var count = e.childNodes.length; count > 0; --count) {
        e.removeChild(e.firstChild);
      }
      return e;
    }
    function removeChildrenAndAdd(parent, e) {
      return removeChildren(parent).appendChild(e);
    }
    function elt(tag, content, className, style) {
      var e = document.createElement(tag);
      if (className) {
        e.className = className;
      }
      if (style) {
        e.style.cssText = style;
      }
      if (typeof content == "string") {
        e.appendChild(document.createTextNode(content));
      } else if (content) {
        for (var i2 = 0; i2 < content.length; ++i2) {
          e.appendChild(content[i2]);
        }
      }
      return e;
    }
    function eltP(tag, content, className, style) {
      var e = elt(tag, content, className, style);
      e.setAttribute("role", "presentation");
      return e;
    }
    var range;
    if (document.createRange) {
      range = function(node, start, end, endNode) {
        var r = document.createRange();
        r.setEnd(endNode || node, end);
        r.setStart(node, start);
        return r;
      };
    } else {
      range = function(node, start, end) {
        var r = document.body.createTextRange();
        try {
          r.moveToElementText(node.parentNode);
        } catch (e) {
          return r;
        }
        r.collapse(true);
        r.moveEnd("character", end);
        r.moveStart("character", start);
        return r;
      };
    }
    function contains(parent, child) {
      if (child.nodeType == 3) {
        child = child.parentNode;
      }
      if (parent.contains) {
        return parent.contains(child);
      }
      do {
        if (child.nodeType == 11) {
          child = child.host;
        }
        if (child == parent) {
          return true;
        }
      } while (child = child.parentNode);
    }
    function activeElt() {
      var activeElement;
      try {
        activeElement = document.activeElement;
      } catch (e) {
        activeElement = document.body || null;
      }
      while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
        activeElement = activeElement.shadowRoot.activeElement;
      }
      return activeElement;
    }
    function addClass(node, cls) {
      var current = node.className;
      if (!classTest(cls).test(current)) {
        node.className += (current ? " " : "") + cls;
      }
    }
    function joinClasses(a, b) {
      var as = a.split(" ");
      for (var i2 = 0; i2 < as.length; i2++) {
        if (as[i2] && !classTest(as[i2]).test(b)) {
          b += " " + as[i2];
        }
      }
      return b;
    }
    var selectInput = function(node) {
      node.select();
    };
    if (ios) {
      selectInput = function(node) {
        node.selectionStart = 0;
        node.selectionEnd = node.value.length;
      };
    } else if (ie) {
      selectInput = function(node) {
        try {
          node.select();
        } catch (_e) {
        }
      };
    }
    function bind(f) {
      var args = Array.prototype.slice.call(arguments, 1);
      return function() {
        return f.apply(null, args);
      };
    }
    function copyObj(obj, target, overwrite) {
      if (!target) {
        target = {};
      }
      for (var prop2 in obj) {
        if (obj.hasOwnProperty(prop2) && (overwrite !== false || !target.hasOwnProperty(prop2))) {
          target[prop2] = obj[prop2];
        }
      }
      return target;
    }
    function countColumn(string, end, tabSize, startIndex, startValue) {
      if (end == null) {
        end = string.search(/[^\s\u00a0]/);
        if (end == -1) {
          end = string.length;
        }
      }
      for (var i2 = startIndex || 0, n = startValue || 0; ; ) {
        var nextTab = string.indexOf("	", i2);
        if (nextTab < 0 || nextTab >= end) {
          return n + (end - i2);
        }
        n += nextTab - i2;
        n += tabSize - n % tabSize;
        i2 = nextTab + 1;
      }
    }
    var Delayed = function() {
      this.id = null;
      this.f = null;
      this.time = 0;
      this.handler = bind(this.onTimeout, this);
    };
    Delayed.prototype.onTimeout = function(self) {
      self.id = 0;
      if (self.time <= +new Date()) {
        self.f();
      } else {
        setTimeout(self.handler, self.time - +new Date());
      }
    };
    Delayed.prototype.set = function(ms, f) {
      this.f = f;
      var time = +new Date() + ms;
      if (!this.id || time < this.time) {
        clearTimeout(this.id);
        this.id = setTimeout(this.handler, ms);
        this.time = time;
      }
    };
    function indexOf(array, elt2) {
      for (var i2 = 0; i2 < array.length; ++i2) {
        if (array[i2] == elt2) {
          return i2;
        }
      }
      return -1;
    }
    var scrollerGap = 50;
    var Pass = { toString: function() {
      return "CodeMirror.Pass";
    } };
    var sel_dontScroll = { scroll: false }, sel_mouse = { origin: "*mouse" }, sel_move = { origin: "+move" };
    function findColumn(string, goal, tabSize) {
      for (var pos = 0, col = 0; ; ) {
        var nextTab = string.indexOf("	", pos);
        if (nextTab == -1) {
          nextTab = string.length;
        }
        var skipped = nextTab - pos;
        if (nextTab == string.length || col + skipped >= goal) {
          return pos + Math.min(skipped, goal - col);
        }
        col += nextTab - pos;
        col += tabSize - col % tabSize;
        pos = nextTab + 1;
        if (col >= goal) {
          return pos;
        }
      }
    }
    var spaceStrs = [""];
    function spaceStr(n) {
      while (spaceStrs.length <= n) {
        spaceStrs.push(lst(spaceStrs) + " ");
      }
      return spaceStrs[n];
    }
    function lst(arr) {
      return arr[arr.length - 1];
    }
    function map(array, f) {
      var out = [];
      for (var i2 = 0; i2 < array.length; i2++) {
        out[i2] = f(array[i2], i2);
      }
      return out;
    }
    function insertSorted(array, value, score) {
      var pos = 0, priority = score(value);
      while (pos < array.length && score(array[pos]) <= priority) {
        pos++;
      }
      array.splice(pos, 0, value);
    }
    function nothing() {
    }
    function createObj(base, props) {
      var inst;
      if (Object.create) {
        inst = Object.create(base);
      } else {
        nothing.prototype = base;
        inst = new nothing();
      }
      if (props) {
        copyObj(props, inst);
      }
      return inst;
    }
    var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
    function isWordCharBasic(ch) {
      return /\w/.test(ch) || ch > "\x80" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch));
    }
    function isWordChar(ch, helper) {
      if (!helper) {
        return isWordCharBasic(ch);
      }
      if (helper.source.indexOf("\\w") > -1 && isWordCharBasic(ch)) {
        return true;
      }
      return helper.test(ch);
    }
    function isEmpty(obj) {
      for (var n in obj) {
        if (obj.hasOwnProperty(n) && obj[n]) {
          return false;
        }
      }
      return true;
    }
    var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
    function isExtendingChar(ch) {
      return ch.charCodeAt(0) >= 768 && extendingChars.test(ch);
    }
    function skipExtendingChars(str, pos, dir) {
      while ((dir < 0 ? pos > 0 : pos < str.length) && isExtendingChar(str.charAt(pos))) {
        pos += dir;
      }
      return pos;
    }
    function findFirst(pred, from, to) {
      var dir = from > to ? -1 : 1;
      for (; ; ) {
        if (from == to) {
          return from;
        }
        var midF = (from + to) / 2, mid = dir < 0 ? Math.ceil(midF) : Math.floor(midF);
        if (mid == from) {
          return pred(mid) ? from : to;
        }
        if (pred(mid)) {
          to = mid;
        } else {
          from = mid + dir;
        }
      }
    }
    function iterateBidiSections(order, from, to, f) {
      if (!order) {
        return f(from, to, "ltr", 0);
      }
      var found = false;
      for (var i2 = 0; i2 < order.length; ++i2) {
        var part = order[i2];
        if (part.from < to && part.to > from || from == to && part.to == from) {
          f(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr", i2);
          found = true;
        }
      }
      if (!found) {
        f(from, to, "ltr");
      }
    }
    var bidiOther = null;
    function getBidiPartAt(order, ch, sticky) {
      var found;
      bidiOther = null;
      for (var i2 = 0; i2 < order.length; ++i2) {
        var cur = order[i2];
        if (cur.from < ch && cur.to > ch) {
          return i2;
        }
        if (cur.to == ch) {
          if (cur.from != cur.to && sticky == "before") {
            found = i2;
          } else {
            bidiOther = i2;
          }
        }
        if (cur.from == ch) {
          if (cur.from != cur.to && sticky != "before") {
            found = i2;
          } else {
            bidiOther = i2;
          }
        }
      }
      return found != null ? found : bidiOther;
    }
    var bidiOrdering = function() {
      var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
      var arabicTypes = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
      function charType(code) {
        if (code <= 247) {
          return lowTypes.charAt(code);
        } else if (1424 <= code && code <= 1524) {
          return "R";
        } else if (1536 <= code && code <= 1785) {
          return arabicTypes.charAt(code - 1536);
        } else if (1774 <= code && code <= 2220) {
          return "r";
        } else if (8192 <= code && code <= 8203) {
          return "w";
        } else if (code == 8204) {
          return "b";
        } else {
          return "L";
        }
      }
      var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
      var isNeutral = /[stwN]/, isStrong = /[LRr]/, countsAsLeft = /[Lb1n]/, countsAsNum = /[1n]/;
      function BidiSpan(level, from, to) {
        this.level = level;
        this.from = from;
        this.to = to;
      }
      return function(str, direction) {
        var outerType = direction == "ltr" ? "L" : "R";
        if (str.length == 0 || direction == "ltr" && !bidiRE.test(str)) {
          return false;
        }
        var len = str.length, types = [];
        for (var i2 = 0; i2 < len; ++i2) {
          types.push(charType(str.charCodeAt(i2)));
        }
        for (var i$12 = 0, prev = outerType; i$12 < len; ++i$12) {
          var type = types[i$12];
          if (type == "m") {
            types[i$12] = prev;
          } else {
            prev = type;
          }
        }
        for (var i$22 = 0, cur = outerType; i$22 < len; ++i$22) {
          var type$1 = types[i$22];
          if (type$1 == "1" && cur == "r") {
            types[i$22] = "n";
          } else if (isStrong.test(type$1)) {
            cur = type$1;
            if (type$1 == "r") {
              types[i$22] = "R";
            }
          }
        }
        for (var i$3 = 1, prev$1 = types[0]; i$3 < len - 1; ++i$3) {
          var type$2 = types[i$3];
          if (type$2 == "+" && prev$1 == "1" && types[i$3 + 1] == "1") {
            types[i$3] = "1";
          } else if (type$2 == "," && prev$1 == types[i$3 + 1] && (prev$1 == "1" || prev$1 == "n")) {
            types[i$3] = prev$1;
          }
          prev$1 = type$2;
        }
        for (var i$4 = 0; i$4 < len; ++i$4) {
          var type$3 = types[i$4];
          if (type$3 == ",") {
            types[i$4] = "N";
          } else if (type$3 == "%") {
            var end = void 0;
            for (end = i$4 + 1; end < len && types[end] == "%"; ++end) {
            }
            var replace = i$4 && types[i$4 - 1] == "!" || end < len && types[end] == "1" ? "1" : "N";
            for (var j = i$4; j < end; ++j) {
              types[j] = replace;
            }
            i$4 = end - 1;
          }
        }
        for (var i$5 = 0, cur$1 = outerType; i$5 < len; ++i$5) {
          var type$4 = types[i$5];
          if (cur$1 == "L" && type$4 == "1") {
            types[i$5] = "L";
          } else if (isStrong.test(type$4)) {
            cur$1 = type$4;
          }
        }
        for (var i$6 = 0; i$6 < len; ++i$6) {
          if (isNeutral.test(types[i$6])) {
            var end$1 = void 0;
            for (end$1 = i$6 + 1; end$1 < len && isNeutral.test(types[end$1]); ++end$1) {
            }
            var before = (i$6 ? types[i$6 - 1] : outerType) == "L";
            var after = (end$1 < len ? types[end$1] : outerType) == "L";
            var replace$1 = before == after ? before ? "L" : "R" : outerType;
            for (var j$1 = i$6; j$1 < end$1; ++j$1) {
              types[j$1] = replace$1;
            }
            i$6 = end$1 - 1;
          }
        }
        var order = [], m;
        for (var i$7 = 0; i$7 < len; ) {
          if (countsAsLeft.test(types[i$7])) {
            var start = i$7;
            for (++i$7; i$7 < len && countsAsLeft.test(types[i$7]); ++i$7) {
            }
            order.push(new BidiSpan(0, start, i$7));
          } else {
            var pos = i$7, at = order.length, isRTL = direction == "rtl" ? 1 : 0;
            for (++i$7; i$7 < len && types[i$7] != "L"; ++i$7) {
            }
            for (var j$2 = pos; j$2 < i$7; ) {
              if (countsAsNum.test(types[j$2])) {
                if (pos < j$2) {
                  order.splice(at, 0, new BidiSpan(1, pos, j$2));
                  at += isRTL;
                }
                var nstart = j$2;
                for (++j$2; j$2 < i$7 && countsAsNum.test(types[j$2]); ++j$2) {
                }
                order.splice(at, 0, new BidiSpan(2, nstart, j$2));
                at += isRTL;
                pos = j$2;
              } else {
                ++j$2;
              }
            }
            if (pos < i$7) {
              order.splice(at, 0, new BidiSpan(1, pos, i$7));
            }
          }
        }
        if (direction == "ltr") {
          if (order[0].level == 1 && (m = str.match(/^\s+/))) {
            order[0].from = m[0].length;
            order.unshift(new BidiSpan(0, 0, m[0].length));
          }
          if (lst(order).level == 1 && (m = str.match(/\s+$/))) {
            lst(order).to -= m[0].length;
            order.push(new BidiSpan(0, len - m[0].length, len));
          }
        }
        return direction == "rtl" ? order.reverse() : order;
      };
    }();
    function getOrder(line, direction) {
      var order = line.order;
      if (order == null) {
        order = line.order = bidiOrdering(line.text, direction);
      }
      return order;
    }
    var noHandlers = [];
    var on = function(emitter, type, f) {
      if (emitter.addEventListener) {
        emitter.addEventListener(type, f, false);
      } else if (emitter.attachEvent) {
        emitter.attachEvent("on" + type, f);
      } else {
        var map2 = emitter._handlers || (emitter._handlers = {});
        map2[type] = (map2[type] || noHandlers).concat(f);
      }
    };
    function getHandlers(emitter, type) {
      return emitter._handlers && emitter._handlers[type] || noHandlers;
    }
    function off(emitter, type, f) {
      if (emitter.removeEventListener) {
        emitter.removeEventListener(type, f, false);
      } else if (emitter.detachEvent) {
        emitter.detachEvent("on" + type, f);
      } else {
        var map2 = emitter._handlers, arr = map2 && map2[type];
        if (arr) {
          var index = indexOf(arr, f);
          if (index > -1) {
            map2[type] = arr.slice(0, index).concat(arr.slice(index + 1));
          }
        }
      }
    }
    function signal(emitter, type) {
      var handlers = getHandlers(emitter, type);
      if (!handlers.length) {
        return;
      }
      var args = Array.prototype.slice.call(arguments, 2);
      for (var i2 = 0; i2 < handlers.length; ++i2) {
        handlers[i2].apply(null, args);
      }
    }
    function signalDOMEvent(cm2, e, override) {
      if (typeof e == "string") {
        e = { type: e, preventDefault: function() {
          this.defaultPrevented = true;
        } };
      }
      signal(cm2, override || e.type, cm2, e);
      return e_defaultPrevented(e) || e.codemirrorIgnore;
    }
    function signalCursorActivity(cm2) {
      var arr = cm2._handlers && cm2._handlers.cursorActivity;
      if (!arr) {
        return;
      }
      var set = cm2.curOp.cursorActivityHandlers || (cm2.curOp.cursorActivityHandlers = []);
      for (var i2 = 0; i2 < arr.length; ++i2) {
        if (indexOf(set, arr[i2]) == -1) {
          set.push(arr[i2]);
        }
      }
    }
    function hasHandler(emitter, type) {
      return getHandlers(emitter, type).length > 0;
    }
    function eventMixin(ctor) {
      ctor.prototype.on = function(type, f) {
        on(this, type, f);
      };
      ctor.prototype.off = function(type, f) {
        off(this, type, f);
      };
    }
    function e_preventDefault(e) {
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    }
    function e_stopPropagation(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
    }
    function e_defaultPrevented(e) {
      return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false;
    }
    function e_stop(e) {
      e_preventDefault(e);
      e_stopPropagation(e);
    }
    function e_target(e) {
      return e.target || e.srcElement;
    }
    function e_button(e) {
      var b = e.which;
      if (b == null) {
        if (e.button & 1) {
          b = 1;
        } else if (e.button & 2) {
          b = 3;
        } else if (e.button & 4) {
          b = 2;
        }
      }
      if (mac && e.ctrlKey && b == 1) {
        b = 3;
      }
      return b;
    }
    var dragAndDrop = function() {
      if (ie && ie_version < 9) {
        return false;
      }
      var div = elt("div");
      return "draggable" in div || "dragDrop" in div;
    }();
    var zwspSupported;
    function zeroWidthElement(measure) {
      if (zwspSupported == null) {
        var test = elt("span", "\u200B");
        removeChildrenAndAdd(measure, elt("span", [test, document.createTextNode("x")]));
        if (measure.firstChild.offsetHeight != 0) {
          zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !(ie && ie_version < 8);
        }
      }
      var node = zwspSupported ? elt("span", "\u200B") : elt("span", "\xA0", null, "display: inline-block; width: 1px; margin-right: -1px");
      node.setAttribute("cm-text", "");
      return node;
    }
    var badBidiRects;
    function hasBadBidiRects(measure) {
      if (badBidiRects != null) {
        return badBidiRects;
      }
      var txt = removeChildrenAndAdd(measure, document.createTextNode("A\u062EA"));
      var r0 = range(txt, 0, 1).getBoundingClientRect();
      var r1 = range(txt, 1, 2).getBoundingClientRect();
      removeChildren(measure);
      if (!r0 || r0.left == r0.right) {
        return false;
      }
      return badBidiRects = r1.right - r0.right < 3;
    }
    var splitLinesAuto = "\n\nb".split(/\n/).length != 3 ? function(string) {
      var pos = 0, result = [], l = string.length;
      while (pos <= l) {
        var nl = string.indexOf("\n", pos);
        if (nl == -1) {
          nl = string.length;
        }
        var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
        var rt = line.indexOf("\r");
        if (rt != -1) {
          result.push(line.slice(0, rt));
          pos += rt + 1;
        } else {
          result.push(line);
          pos = nl + 1;
        }
      }
      return result;
    } : function(string) {
      return string.split(/\r\n?|\n/);
    };
    var hasSelection = window.getSelection ? function(te) {
      try {
        return te.selectionStart != te.selectionEnd;
      } catch (e) {
        return false;
      }
    } : function(te) {
      var range2;
      try {
        range2 = te.ownerDocument.selection.createRange();
      } catch (e) {
      }
      if (!range2 || range2.parentElement() != te) {
        return false;
      }
      return range2.compareEndPoints("StartToEnd", range2) != 0;
    };
    var hasCopyEvent = function() {
      var e = elt("div");
      if ("oncopy" in e) {
        return true;
      }
      e.setAttribute("oncopy", "return;");
      return typeof e.oncopy == "function";
    }();
    var badZoomedRects = null;
    function hasBadZoomedRects(measure) {
      if (badZoomedRects != null) {
        return badZoomedRects;
      }
      var node = removeChildrenAndAdd(measure, elt("span", "x"));
      var normal = node.getBoundingClientRect();
      var fromRange = range(node, 0, 1).getBoundingClientRect();
      return badZoomedRects = Math.abs(normal.left - fromRange.left) > 1;
    }
    var modes = {}, mimeModes = {};
    function defineMode(name, mode) {
      if (arguments.length > 2) {
        mode.dependencies = Array.prototype.slice.call(arguments, 2);
      }
      modes[name] = mode;
    }
    function defineMIME(mime, spec) {
      mimeModes[mime] = spec;
    }
    function resolveMode(spec) {
      if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
        spec = mimeModes[spec];
      } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
        var found = mimeModes[spec.name];
        if (typeof found == "string") {
          found = { name: found };
        }
        spec = createObj(found, spec);
        spec.name = found.name;
      } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
        return resolveMode("application/xml");
      } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(spec)) {
        return resolveMode("application/json");
      }
      if (typeof spec == "string") {
        return { name: spec };
      } else {
        return spec || { name: "null" };
      }
    }
    function getMode(options, spec) {
      spec = resolveMode(spec);
      var mfactory = modes[spec.name];
      if (!mfactory) {
        return getMode(options, "text/plain");
      }
      var modeObj = mfactory(options, spec);
      if (modeExtensions.hasOwnProperty(spec.name)) {
        var exts = modeExtensions[spec.name];
        for (var prop2 in exts) {
          if (!exts.hasOwnProperty(prop2)) {
            continue;
          }
          if (modeObj.hasOwnProperty(prop2)) {
            modeObj["_" + prop2] = modeObj[prop2];
          }
          modeObj[prop2] = exts[prop2];
        }
      }
      modeObj.name = spec.name;
      if (spec.helperType) {
        modeObj.helperType = spec.helperType;
      }
      if (spec.modeProps) {
        for (var prop$1 in spec.modeProps) {
          modeObj[prop$1] = spec.modeProps[prop$1];
        }
      }
      return modeObj;
    }
    var modeExtensions = {};
    function extendMode(mode, properties) {
      var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : modeExtensions[mode] = {};
      copyObj(properties, exts);
    }
    function copyState(mode, state) {
      if (state === true) {
        return state;
      }
      if (mode.copyState) {
        return mode.copyState(state);
      }
      var nstate = {};
      for (var n in state) {
        var val = state[n];
        if (val instanceof Array) {
          val = val.concat([]);
        }
        nstate[n] = val;
      }
      return nstate;
    }
    function innerMode(mode, state) {
      var info;
      while (mode.innerMode) {
        info = mode.innerMode(state);
        if (!info || info.mode == mode) {
          break;
        }
        state = info.state;
        mode = info.mode;
      }
      return info || { mode, state };
    }
    function startState(mode, a1, a2) {
      return mode.startState ? mode.startState(a1, a2) : true;
    }
    var StringStream = function(string, tabSize, lineOracle) {
      this.pos = this.start = 0;
      this.string = string;
      this.tabSize = tabSize || 8;
      this.lastColumnPos = this.lastColumnValue = 0;
      this.lineStart = 0;
      this.lineOracle = lineOracle;
    };
    StringStream.prototype.eol = function() {
      return this.pos >= this.string.length;
    };
    StringStream.prototype.sol = function() {
      return this.pos == this.lineStart;
    };
    StringStream.prototype.peek = function() {
      return this.string.charAt(this.pos) || void 0;
    };
    StringStream.prototype.next = function() {
      if (this.pos < this.string.length) {
        return this.string.charAt(this.pos++);
      }
    };
    StringStream.prototype.eat = function(match) {
      var ch = this.string.charAt(this.pos);
      var ok;
      if (typeof match == "string") {
        ok = ch == match;
      } else {
        ok = ch && (match.test ? match.test(ch) : match(ch));
      }
      if (ok) {
        ++this.pos;
        return ch;
      }
    };
    StringStream.prototype.eatWhile = function(match) {
      var start = this.pos;
      while (this.eat(match)) {
      }
      return this.pos > start;
    };
    StringStream.prototype.eatSpace = function() {
      var start = this.pos;
      while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
        ++this.pos;
      }
      return this.pos > start;
    };
    StringStream.prototype.skipToEnd = function() {
      this.pos = this.string.length;
    };
    StringStream.prototype.skipTo = function(ch) {
      var found = this.string.indexOf(ch, this.pos);
      if (found > -1) {
        this.pos = found;
        return true;
      }
    };
    StringStream.prototype.backUp = function(n) {
      this.pos -= n;
    };
    StringStream.prototype.column = function() {
      if (this.lastColumnPos < this.start) {
        this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
        this.lastColumnPos = this.start;
      }
      return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
    };
    StringStream.prototype.indentation = function() {
      return countColumn(this.string, null, this.tabSize) - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
    };
    StringStream.prototype.match = function(pattern, consume, caseInsensitive) {
      if (typeof pattern == "string") {
        var cased = function(str) {
          return caseInsensitive ? str.toLowerCase() : str;
        };
        var substr = this.string.substr(this.pos, pattern.length);
        if (cased(substr) == cased(pattern)) {
          if (consume !== false) {
            this.pos += pattern.length;
          }
          return true;
        }
      } else {
        var match = this.string.slice(this.pos).match(pattern);
        if (match && match.index > 0) {
          return null;
        }
        if (match && consume !== false) {
          this.pos += match[0].length;
        }
        return match;
      }
    };
    StringStream.prototype.current = function() {
      return this.string.slice(this.start, this.pos);
    };
    StringStream.prototype.hideFirstChars = function(n, inner) {
      this.lineStart += n;
      try {
        return inner();
      } finally {
        this.lineStart -= n;
      }
    };
    StringStream.prototype.lookAhead = function(n) {
      var oracle = this.lineOracle;
      return oracle && oracle.lookAhead(n);
    };
    StringStream.prototype.baseToken = function() {
      var oracle = this.lineOracle;
      return oracle && oracle.baseToken(this.pos);
    };
    function getLine(doc, n) {
      n -= doc.first;
      if (n < 0 || n >= doc.size) {
        throw new Error("There is no line " + (n + doc.first) + " in the document.");
      }
      var chunk = doc;
      while (!chunk.lines) {
        for (var i2 = 0; ; ++i2) {
          var child = chunk.children[i2], sz = child.chunkSize();
          if (n < sz) {
            chunk = child;
            break;
          }
          n -= sz;
        }
      }
      return chunk.lines[n];
    }
    function getBetween(doc, start, end) {
      var out = [], n = start.line;
      doc.iter(start.line, end.line + 1, function(line) {
        var text = line.text;
        if (n == end.line) {
          text = text.slice(0, end.ch);
        }
        if (n == start.line) {
          text = text.slice(start.ch);
        }
        out.push(text);
        ++n;
      });
      return out;
    }
    function getLines(doc, from, to) {
      var out = [];
      doc.iter(from, to, function(line) {
        out.push(line.text);
      });
      return out;
    }
    function updateLineHeight(line, height) {
      var diff = height - line.height;
      if (diff) {
        for (var n = line; n; n = n.parent) {
          n.height += diff;
        }
      }
    }
    function lineNo(line) {
      if (line.parent == null) {
        return null;
      }
      var cur = line.parent, no = indexOf(cur.lines, line);
      for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
        for (var i2 = 0; ; ++i2) {
          if (chunk.children[i2] == cur) {
            break;
          }
          no += chunk.children[i2].chunkSize();
        }
      }
      return no + cur.first;
    }
    function lineAtHeight(chunk, h) {
      var n = chunk.first;
      outer:
        do {
          for (var i$12 = 0; i$12 < chunk.children.length; ++i$12) {
            var child = chunk.children[i$12], ch = child.height;
            if (h < ch) {
              chunk = child;
              continue outer;
            }
            h -= ch;
            n += child.chunkSize();
          }
          return n;
        } while (!chunk.lines);
      var i2 = 0;
      for (; i2 < chunk.lines.length; ++i2) {
        var line = chunk.lines[i2], lh = line.height;
        if (h < lh) {
          break;
        }
        h -= lh;
      }
      return n + i2;
    }
    function isLine(doc, l) {
      return l >= doc.first && l < doc.first + doc.size;
    }
    function lineNumberFor(options, i2) {
      return String(options.lineNumberFormatter(i2 + options.firstLineNumber));
    }
    function Pos(line, ch, sticky) {
      if (sticky === void 0)
        sticky = null;
      if (!(this instanceof Pos)) {
        return new Pos(line, ch, sticky);
      }
      this.line = line;
      this.ch = ch;
      this.sticky = sticky;
    }
    function cmp(a, b) {
      return a.line - b.line || a.ch - b.ch;
    }
    function equalCursorPos(a, b) {
      return a.sticky == b.sticky && cmp(a, b) == 0;
    }
    function copyPos(x) {
      return Pos(x.line, x.ch);
    }
    function maxPos(a, b) {
      return cmp(a, b) < 0 ? b : a;
    }
    function minPos(a, b) {
      return cmp(a, b) < 0 ? a : b;
    }
    function clipLine(doc, n) {
      return Math.max(doc.first, Math.min(n, doc.first + doc.size - 1));
    }
    function clipPos(doc, pos) {
      if (pos.line < doc.first) {
        return Pos(doc.first, 0);
      }
      var last = doc.first + doc.size - 1;
      if (pos.line > last) {
        return Pos(last, getLine(doc, last).text.length);
      }
      return clipToLen(pos, getLine(doc, pos.line).text.length);
    }
    function clipToLen(pos, linelen) {
      var ch = pos.ch;
      if (ch == null || ch > linelen) {
        return Pos(pos.line, linelen);
      } else if (ch < 0) {
        return Pos(pos.line, 0);
      } else {
        return pos;
      }
    }
    function clipPosArray(doc, array) {
      var out = [];
      for (var i2 = 0; i2 < array.length; i2++) {
        out[i2] = clipPos(doc, array[i2]);
      }
      return out;
    }
    var SavedContext = function(state, lookAhead) {
      this.state = state;
      this.lookAhead = lookAhead;
    };
    var Context = function(doc, state, line, lookAhead) {
      this.state = state;
      this.doc = doc;
      this.line = line;
      this.maxLookAhead = lookAhead || 0;
      this.baseTokens = null;
      this.baseTokenPos = 1;
    };
    Context.prototype.lookAhead = function(n) {
      var line = this.doc.getLine(this.line + n);
      if (line != null && n > this.maxLookAhead) {
        this.maxLookAhead = n;
      }
      return line;
    };
    Context.prototype.baseToken = function(n) {
      if (!this.baseTokens) {
        return null;
      }
      while (this.baseTokens[this.baseTokenPos] <= n) {
        this.baseTokenPos += 2;
      }
      var type = this.baseTokens[this.baseTokenPos + 1];
      return {
        type: type && type.replace(/( |^)overlay .*/, ""),
        size: this.baseTokens[this.baseTokenPos] - n
      };
    };
    Context.prototype.nextLine = function() {
      this.line++;
      if (this.maxLookAhead > 0) {
        this.maxLookAhead--;
      }
    };
    Context.fromSaved = function(doc, saved, line) {
      if (saved instanceof SavedContext) {
        return new Context(doc, copyState(doc.mode, saved.state), line, saved.lookAhead);
      } else {
        return new Context(doc, copyState(doc.mode, saved), line);
      }
    };
    Context.prototype.save = function(copy) {
      var state = copy !== false ? copyState(this.doc.mode, this.state) : this.state;
      return this.maxLookAhead > 0 ? new SavedContext(state, this.maxLookAhead) : state;
    };
    function highlightLine(cm2, line, context, forceToEnd) {
      var st = [cm2.state.modeGen], lineClasses = {};
      runMode(cm2, line.text, cm2.doc.mode, context, function(end, style) {
        return st.push(end, style);
      }, lineClasses, forceToEnd);
      var state = context.state;
      var loop = function(o2) {
        context.baseTokens = st;
        var overlay = cm2.state.overlays[o2], i2 = 1, at = 0;
        context.state = true;
        runMode(cm2, line.text, overlay.mode, context, function(end, style) {
          var start = i2;
          while (at < end) {
            var i_end = st[i2];
            if (i_end > end) {
              st.splice(i2, 1, end, st[i2 + 1], i_end);
            }
            i2 += 2;
            at = Math.min(end, i_end);
          }
          if (!style) {
            return;
          }
          if (overlay.opaque) {
            st.splice(start, i2 - start, end, "overlay " + style);
            i2 = start + 2;
          } else {
            for (; start < i2; start += 2) {
              var cur = st[start + 1];
              st[start + 1] = (cur ? cur + " " : "") + "overlay " + style;
            }
          }
        }, lineClasses);
        context.state = state;
        context.baseTokens = null;
        context.baseTokenPos = 1;
      };
      for (var o = 0; o < cm2.state.overlays.length; ++o)
        loop(o);
      return { styles: st, classes: lineClasses.bgClass || lineClasses.textClass ? lineClasses : null };
    }
    function getLineStyles(cm2, line, updateFrontier) {
      if (!line.styles || line.styles[0] != cm2.state.modeGen) {
        var context = getContextBefore(cm2, lineNo(line));
        var resetState = line.text.length > cm2.options.maxHighlightLength && copyState(cm2.doc.mode, context.state);
        var result = highlightLine(cm2, line, context);
        if (resetState) {
          context.state = resetState;
        }
        line.stateAfter = context.save(!resetState);
        line.styles = result.styles;
        if (result.classes) {
          line.styleClasses = result.classes;
        } else if (line.styleClasses) {
          line.styleClasses = null;
        }
        if (updateFrontier === cm2.doc.highlightFrontier) {
          cm2.doc.modeFrontier = Math.max(cm2.doc.modeFrontier, ++cm2.doc.highlightFrontier);
        }
      }
      return line.styles;
    }
    function getContextBefore(cm2, n, precise) {
      var doc = cm2.doc, display = cm2.display;
      if (!doc.mode.startState) {
        return new Context(doc, true, n);
      }
      var start = findStartLine(cm2, n, precise);
      var saved = start > doc.first && getLine(doc, start - 1).stateAfter;
      var context = saved ? Context.fromSaved(doc, saved, start) : new Context(doc, startState(doc.mode), start);
      doc.iter(start, n, function(line) {
        processLine(cm2, line.text, context);
        var pos = context.line;
        line.stateAfter = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo ? context.save() : null;
        context.nextLine();
      });
      if (precise) {
        doc.modeFrontier = context.line;
      }
      return context;
    }
    function processLine(cm2, text, context, startAt) {
      var mode = cm2.doc.mode;
      var stream = new StringStream(text, cm2.options.tabSize, context);
      stream.start = stream.pos = startAt || 0;
      if (text == "") {
        callBlankLine(mode, context.state);
      }
      while (!stream.eol()) {
        readToken(mode, stream, context.state);
        stream.start = stream.pos;
      }
    }
    function callBlankLine(mode, state) {
      if (mode.blankLine) {
        return mode.blankLine(state);
      }
      if (!mode.innerMode) {
        return;
      }
      var inner = innerMode(mode, state);
      if (inner.mode.blankLine) {
        return inner.mode.blankLine(inner.state);
      }
    }
    function readToken(mode, stream, state, inner) {
      for (var i2 = 0; i2 < 10; i2++) {
        if (inner) {
          inner[0] = innerMode(mode, state).mode;
        }
        var style = mode.token(stream, state);
        if (stream.pos > stream.start) {
          return style;
        }
      }
      throw new Error("Mode " + mode.name + " failed to advance stream.");
    }
    var Token = function(stream, type, state) {
      this.start = stream.start;
      this.end = stream.pos;
      this.string = stream.current();
      this.type = type || null;
      this.state = state;
    };
    function takeToken(cm2, pos, precise, asArray) {
      var doc = cm2.doc, mode = doc.mode, style;
      pos = clipPos(doc, pos);
      var line = getLine(doc, pos.line), context = getContextBefore(cm2, pos.line, precise);
      var stream = new StringStream(line.text, cm2.options.tabSize, context), tokens;
      if (asArray) {
        tokens = [];
      }
      while ((asArray || stream.pos < pos.ch) && !stream.eol()) {
        stream.start = stream.pos;
        style = readToken(mode, stream, context.state);
        if (asArray) {
          tokens.push(new Token(stream, style, copyState(doc.mode, context.state)));
        }
      }
      return asArray ? tokens : new Token(stream, style, context.state);
    }
    function extractLineClasses(type, output) {
      if (type) {
        for (; ; ) {
          var lineClass = type.match(/(?:^|\s+)line-(background-)?(\S+)/);
          if (!lineClass) {
            break;
          }
          type = type.slice(0, lineClass.index) + type.slice(lineClass.index + lineClass[0].length);
          var prop2 = lineClass[1] ? "bgClass" : "textClass";
          if (output[prop2] == null) {
            output[prop2] = lineClass[2];
          } else if (!new RegExp("(?:^|\\s)" + lineClass[2] + "(?:$|\\s)").test(output[prop2])) {
            output[prop2] += " " + lineClass[2];
          }
        }
      }
      return type;
    }
    function runMode(cm2, text, mode, context, f, lineClasses, forceToEnd) {
      var flattenSpans = mode.flattenSpans;
      if (flattenSpans == null) {
        flattenSpans = cm2.options.flattenSpans;
      }
      var curStart = 0, curStyle = null;
      var stream = new StringStream(text, cm2.options.tabSize, context), style;
      var inner = cm2.options.addModeClass && [null];
      if (text == "") {
        extractLineClasses(callBlankLine(mode, context.state), lineClasses);
      }
      while (!stream.eol()) {
        if (stream.pos > cm2.options.maxHighlightLength) {
          flattenSpans = false;
          if (forceToEnd) {
            processLine(cm2, text, context, stream.pos);
          }
          stream.pos = text.length;
          style = null;
        } else {
          style = extractLineClasses(readToken(mode, stream, context.state, inner), lineClasses);
        }
        if (inner) {
          var mName = inner[0].name;
          if (mName) {
            style = "m-" + (style ? mName + " " + style : mName);
          }
        }
        if (!flattenSpans || curStyle != style) {
          while (curStart < stream.start) {
            curStart = Math.min(stream.start, curStart + 5e3);
            f(curStart, curStyle);
          }
          curStyle = style;
        }
        stream.start = stream.pos;
      }
      while (curStart < stream.pos) {
        var pos = Math.min(stream.pos, curStart + 5e3);
        f(pos, curStyle);
        curStart = pos;
      }
    }
    function findStartLine(cm2, n, precise) {
      var minindent, minline, doc = cm2.doc;
      var lim = precise ? -1 : n - (cm2.doc.mode.innerMode ? 1e3 : 100);
      for (var search = n; search > lim; --search) {
        if (search <= doc.first) {
          return doc.first;
        }
        var line = getLine(doc, search - 1), after = line.stateAfter;
        if (after && (!precise || search + (after instanceof SavedContext ? after.lookAhead : 0) <= doc.modeFrontier)) {
          return search;
        }
        var indented = countColumn(line.text, null, cm2.options.tabSize);
        if (minline == null || minindent > indented) {
          minline = search - 1;
          minindent = indented;
        }
      }
      return minline;
    }
    function retreatFrontier(doc, n) {
      doc.modeFrontier = Math.min(doc.modeFrontier, n);
      if (doc.highlightFrontier < n - 10) {
        return;
      }
      var start = doc.first;
      for (var line = n - 1; line > start; line--) {
        var saved = getLine(doc, line).stateAfter;
        if (saved && (!(saved instanceof SavedContext) || line + saved.lookAhead < n)) {
          start = line + 1;
          break;
        }
      }
      doc.highlightFrontier = Math.min(doc.highlightFrontier, start);
    }
    var sawReadOnlySpans = false, sawCollapsedSpans = false;
    function seeReadOnlySpans() {
      sawReadOnlySpans = true;
    }
    function seeCollapsedSpans() {
      sawCollapsedSpans = true;
    }
    function MarkedSpan(marker, from, to) {
      this.marker = marker;
      this.from = from;
      this.to = to;
    }
    function getMarkedSpanFor(spans, marker) {
      if (spans) {
        for (var i2 = 0; i2 < spans.length; ++i2) {
          var span = spans[i2];
          if (span.marker == marker) {
            return span;
          }
        }
      }
    }
    function removeMarkedSpan(spans, span) {
      var r;
      for (var i2 = 0; i2 < spans.length; ++i2) {
        if (spans[i2] != span) {
          (r || (r = [])).push(spans[i2]);
        }
      }
      return r;
    }
    function addMarkedSpan(line, span, op) {
      var inThisOp = op && window.WeakSet && (op.markedSpans || (op.markedSpans = new WeakSet()));
      if (inThisOp && inThisOp.has(line.markedSpans)) {
        line.markedSpans.push(span);
      } else {
        line.markedSpans = line.markedSpans ? line.markedSpans.concat([span]) : [span];
        if (inThisOp) {
          inThisOp.add(line.markedSpans);
        }
      }
      span.marker.attachLine(line);
    }
    function markedSpansBefore(old, startCh, isInsert) {
      var nw;
      if (old) {
        for (var i2 = 0; i2 < old.length; ++i2) {
          var span = old[i2], marker = span.marker;
          var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
          if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
            var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh);
            (nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
          }
        }
      }
      return nw;
    }
    function markedSpansAfter(old, endCh, isInsert) {
      var nw;
      if (old) {
        for (var i2 = 0; i2 < old.length; ++i2) {
          var span = old[i2], marker = span.marker;
          var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
          if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
            var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh);
            (nw || (nw = [])).push(new MarkedSpan(marker, startsBefore ? null : span.from - endCh, span.to == null ? null : span.to - endCh));
          }
        }
      }
      return nw;
    }
    function stretchSpansOverChange(doc, change) {
      if (change.full) {
        return null;
      }
      var oldFirst = isLine(doc, change.from.line) && getLine(doc, change.from.line).markedSpans;
      var oldLast = isLine(doc, change.to.line) && getLine(doc, change.to.line).markedSpans;
      if (!oldFirst && !oldLast) {
        return null;
      }
      var startCh = change.from.ch, endCh = change.to.ch, isInsert = cmp(change.from, change.to) == 0;
      var first = markedSpansBefore(oldFirst, startCh, isInsert);
      var last = markedSpansAfter(oldLast, endCh, isInsert);
      var sameLine = change.text.length == 1, offset = lst(change.text).length + (sameLine ? startCh : 0);
      if (first) {
        for (var i2 = 0; i2 < first.length; ++i2) {
          var span = first[i2];
          if (span.to == null) {
            var found = getMarkedSpanFor(last, span.marker);
            if (!found) {
              span.to = startCh;
            } else if (sameLine) {
              span.to = found.to == null ? null : found.to + offset;
            }
          }
        }
      }
      if (last) {
        for (var i$12 = 0; i$12 < last.length; ++i$12) {
          var span$1 = last[i$12];
          if (span$1.to != null) {
            span$1.to += offset;
          }
          if (span$1.from == null) {
            var found$1 = getMarkedSpanFor(first, span$1.marker);
            if (!found$1) {
              span$1.from = offset;
              if (sameLine) {
                (first || (first = [])).push(span$1);
              }
            }
          } else {
            span$1.from += offset;
            if (sameLine) {
              (first || (first = [])).push(span$1);
            }
          }
        }
      }
      if (first) {
        first = clearEmptySpans(first);
      }
      if (last && last != first) {
        last = clearEmptySpans(last);
      }
      var newMarkers = [first];
      if (!sameLine) {
        var gap = change.text.length - 2, gapMarkers;
        if (gap > 0 && first) {
          for (var i$22 = 0; i$22 < first.length; ++i$22) {
            if (first[i$22].to == null) {
              (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i$22].marker, null, null));
            }
          }
        }
        for (var i$3 = 0; i$3 < gap; ++i$3) {
          newMarkers.push(gapMarkers);
        }
        newMarkers.push(last);
      }
      return newMarkers;
    }
    function clearEmptySpans(spans) {
      for (var i2 = 0; i2 < spans.length; ++i2) {
        var span = spans[i2];
        if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false) {
          spans.splice(i2--, 1);
        }
      }
      if (!spans.length) {
        return null;
      }
      return spans;
    }
    function removeReadOnlyRanges(doc, from, to) {
      var markers = null;
      doc.iter(from.line, to.line + 1, function(line) {
        if (line.markedSpans) {
          for (var i3 = 0; i3 < line.markedSpans.length; ++i3) {
            var mark = line.markedSpans[i3].marker;
            if (mark.readOnly && (!markers || indexOf(markers, mark) == -1)) {
              (markers || (markers = [])).push(mark);
            }
          }
        }
      });
      if (!markers) {
        return null;
      }
      var parts = [{ from, to }];
      for (var i2 = 0; i2 < markers.length; ++i2) {
        var mk = markers[i2], m = mk.find(0);
        for (var j = 0; j < parts.length; ++j) {
          var p = parts[j];
          if (cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0) {
            continue;
          }
          var newParts = [j, 1], dfrom = cmp(p.from, m.from), dto = cmp(p.to, m.to);
          if (dfrom < 0 || !mk.inclusiveLeft && !dfrom) {
            newParts.push({ from: p.from, to: m.from });
          }
          if (dto > 0 || !mk.inclusiveRight && !dto) {
            newParts.push({ from: m.to, to: p.to });
          }
          parts.splice.apply(parts, newParts);
          j += newParts.length - 3;
        }
      }
      return parts;
    }
    function detachMarkedSpans(line) {
      var spans = line.markedSpans;
      if (!spans) {
        return;
      }
      for (var i2 = 0; i2 < spans.length; ++i2) {
        spans[i2].marker.detachLine(line);
      }
      line.markedSpans = null;
    }
    function attachMarkedSpans(line, spans) {
      if (!spans) {
        return;
      }
      for (var i2 = 0; i2 < spans.length; ++i2) {
        spans[i2].marker.attachLine(line);
      }
      line.markedSpans = spans;
    }
    function extraLeft(marker) {
      return marker.inclusiveLeft ? -1 : 0;
    }
    function extraRight(marker) {
      return marker.inclusiveRight ? 1 : 0;
    }
    function compareCollapsedMarkers(a, b) {
      var lenDiff = a.lines.length - b.lines.length;
      if (lenDiff != 0) {
        return lenDiff;
      }
      var aPos = a.find(), bPos = b.find();
      var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
      if (fromCmp) {
        return -fromCmp;
      }
      var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
      if (toCmp) {
        return toCmp;
      }
      return b.id - a.id;
    }
    function collapsedSpanAtSide(line, start) {
      var sps = sawCollapsedSpans && line.markedSpans, found;
      if (sps) {
        for (var sp = void 0, i2 = 0; i2 < sps.length; ++i2) {
          sp = sps[i2];
          if (sp.marker.collapsed && (start ? sp.from : sp.to) == null && (!found || compareCollapsedMarkers(found, sp.marker) < 0)) {
            found = sp.marker;
          }
        }
      }
      return found;
    }
    function collapsedSpanAtStart(line) {
      return collapsedSpanAtSide(line, true);
    }
    function collapsedSpanAtEnd(line) {
      return collapsedSpanAtSide(line, false);
    }
    function collapsedSpanAround(line, ch) {
      var sps = sawCollapsedSpans && line.markedSpans, found;
      if (sps) {
        for (var i2 = 0; i2 < sps.length; ++i2) {
          var sp = sps[i2];
          if (sp.marker.collapsed && (sp.from == null || sp.from < ch) && (sp.to == null || sp.to > ch) && (!found || compareCollapsedMarkers(found, sp.marker) < 0)) {
            found = sp.marker;
          }
        }
      }
      return found;
    }
    function conflictingCollapsedRange(doc, lineNo2, from, to, marker) {
      var line = getLine(doc, lineNo2);
      var sps = sawCollapsedSpans && line.markedSpans;
      if (sps) {
        for (var i2 = 0; i2 < sps.length; ++i2) {
          var sp = sps[i2];
          if (!sp.marker.collapsed) {
            continue;
          }
          var found = sp.marker.find(0);
          var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
          var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
          if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0) {
            continue;
          }
          if (fromCmp <= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.to, from) >= 0 : cmp(found.to, from) > 0) || fromCmp >= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.from, to) <= 0 : cmp(found.from, to) < 0)) {
            return true;
          }
        }
      }
    }
    function visualLine(line) {
      var merged;
      while (merged = collapsedSpanAtStart(line)) {
        line = merged.find(-1, true).line;
      }
      return line;
    }
    function visualLineEnd(line) {
      var merged;
      while (merged = collapsedSpanAtEnd(line)) {
        line = merged.find(1, true).line;
      }
      return line;
    }
    function visualLineContinued(line) {
      var merged, lines;
      while (merged = collapsedSpanAtEnd(line)) {
        line = merged.find(1, true).line;
        (lines || (lines = [])).push(line);
      }
      return lines;
    }
    function visualLineNo(doc, lineN) {
      var line = getLine(doc, lineN), vis = visualLine(line);
      if (line == vis) {
        return lineN;
      }
      return lineNo(vis);
    }
    function visualLineEndNo(doc, lineN) {
      if (lineN > doc.lastLine()) {
        return lineN;
      }
      var line = getLine(doc, lineN), merged;
      if (!lineIsHidden(doc, line)) {
        return lineN;
      }
      while (merged = collapsedSpanAtEnd(line)) {
        line = merged.find(1, true).line;
      }
      return lineNo(line) + 1;
    }
    function lineIsHidden(doc, line) {
      var sps = sawCollapsedSpans && line.markedSpans;
      if (sps) {
        for (var sp = void 0, i2 = 0; i2 < sps.length; ++i2) {
          sp = sps[i2];
          if (!sp.marker.collapsed) {
            continue;
          }
          if (sp.from == null) {
            return true;
          }
          if (sp.marker.widgetNode) {
            continue;
          }
          if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc, line, sp)) {
            return true;
          }
        }
      }
    }
    function lineIsHiddenInner(doc, line, span) {
      if (span.to == null) {
        var end = span.marker.find(1, true);
        return lineIsHiddenInner(doc, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker));
      }
      if (span.marker.inclusiveRight && span.to == line.text.length) {
        return true;
      }
      for (var sp = void 0, i2 = 0; i2 < line.markedSpans.length; ++i2) {
        sp = line.markedSpans[i2];
        if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to && (sp.to == null || sp.to != span.from) && (sp.marker.inclusiveLeft || span.marker.inclusiveRight) && lineIsHiddenInner(doc, line, sp)) {
          return true;
        }
      }
    }
    function heightAtLine(lineObj) {
      lineObj = visualLine(lineObj);
      var h = 0, chunk = lineObj.parent;
      for (var i2 = 0; i2 < chunk.lines.length; ++i2) {
        var line = chunk.lines[i2];
        if (line == lineObj) {
          break;
        } else {
          h += line.height;
        }
      }
      for (var p = chunk.parent; p; chunk = p, p = chunk.parent) {
        for (var i$12 = 0; i$12 < p.children.length; ++i$12) {
          var cur = p.children[i$12];
          if (cur == chunk) {
            break;
          } else {
            h += cur.height;
          }
        }
      }
      return h;
    }
    function lineLength(line) {
      if (line.height == 0) {
        return 0;
      }
      var len = line.text.length, merged, cur = line;
      while (merged = collapsedSpanAtStart(cur)) {
        var found = merged.find(0, true);
        cur = found.from.line;
        len += found.from.ch - found.to.ch;
      }
      cur = line;
      while (merged = collapsedSpanAtEnd(cur)) {
        var found$1 = merged.find(0, true);
        len -= cur.text.length - found$1.from.ch;
        cur = found$1.to.line;
        len += cur.text.length - found$1.to.ch;
      }
      return len;
    }
    function findMaxLine(cm2) {
      var d = cm2.display, doc = cm2.doc;
      d.maxLine = getLine(doc, doc.first);
      d.maxLineLength = lineLength(d.maxLine);
      d.maxLineChanged = true;
      doc.iter(function(line) {
        var len = lineLength(line);
        if (len > d.maxLineLength) {
          d.maxLineLength = len;
          d.maxLine = line;
        }
      });
    }
    var Line = function(text, markedSpans, estimateHeight2) {
      this.text = text;
      attachMarkedSpans(this, markedSpans);
      this.height = estimateHeight2 ? estimateHeight2(this) : 1;
    };
    Line.prototype.lineNo = function() {
      return lineNo(this);
    };
    eventMixin(Line);
    function updateLine(line, text, markedSpans, estimateHeight2) {
      line.text = text;
      if (line.stateAfter) {
        line.stateAfter = null;
      }
      if (line.styles) {
        line.styles = null;
      }
      if (line.order != null) {
        line.order = null;
      }
      detachMarkedSpans(line);
      attachMarkedSpans(line, markedSpans);
      var estHeight = estimateHeight2 ? estimateHeight2(line) : 1;
      if (estHeight != line.height) {
        updateLineHeight(line, estHeight);
      }
    }
    function cleanUpLine(line) {
      line.parent = null;
      detachMarkedSpans(line);
    }
    var styleToClassCache = {}, styleToClassCacheWithMode = {};
    function interpretTokenStyle(style, options) {
      if (!style || /^\s*$/.test(style)) {
        return null;
      }
      var cache = options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
      return cache[style] || (cache[style] = style.replace(/\S+/g, "cm-$&"));
    }
    function buildLineContent(cm2, lineView) {
      var content = eltP("span", null, null, webkit ? "padding-right: .1px" : null);
      var builder = {
        pre: eltP("pre", [content], "CodeMirror-line"),
        content,
        col: 0,
        pos: 0,
        cm: cm2,
        trailingSpace: false,
        splitSpaces: cm2.getOption("lineWrapping")
      };
      lineView.measure = {};
      for (var i2 = 0; i2 <= (lineView.rest ? lineView.rest.length : 0); i2++) {
        var line = i2 ? lineView.rest[i2 - 1] : lineView.line, order = void 0;
        builder.pos = 0;
        builder.addToken = buildToken;
        if (hasBadBidiRects(cm2.display.measure) && (order = getOrder(line, cm2.doc.direction))) {
          builder.addToken = buildTokenBadBidi(builder.addToken, order);
        }
        builder.map = [];
        var allowFrontierUpdate = lineView != cm2.display.externalMeasured && lineNo(line);
        insertLineContent(line, builder, getLineStyles(cm2, line, allowFrontierUpdate));
        if (line.styleClasses) {
          if (line.styleClasses.bgClass) {
            builder.bgClass = joinClasses(line.styleClasses.bgClass, builder.bgClass || "");
          }
          if (line.styleClasses.textClass) {
            builder.textClass = joinClasses(line.styleClasses.textClass, builder.textClass || "");
          }
        }
        if (builder.map.length == 0) {
          builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm2.display.measure)));
        }
        if (i2 == 0) {
          lineView.measure.map = builder.map;
          lineView.measure.cache = {};
        } else {
          (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map);
          (lineView.measure.caches || (lineView.measure.caches = [])).push({});
        }
      }
      if (webkit) {
        var last = builder.content.lastChild;
        if (/\bcm-tab\b/.test(last.className) || last.querySelector && last.querySelector(".cm-tab")) {
          builder.content.className = "cm-tab-wrap-hack";
        }
      }
      signal(cm2, "renderLine", cm2, lineView.line, builder.pre);
      if (builder.pre.className) {
        builder.textClass = joinClasses(builder.pre.className, builder.textClass || "");
      }
      return builder;
    }
    function defaultSpecialCharPlaceholder(ch) {
      var token = elt("span", "\u2022", "cm-invalidchar");
      token.title = "\\u" + ch.charCodeAt(0).toString(16);
      token.setAttribute("aria-label", token.title);
      return token;
    }
    function buildToken(builder, text, style, startStyle, endStyle, css, attributes) {
      if (!text) {
        return;
      }
      var displayText = builder.splitSpaces ? splitSpaces(text, builder.trailingSpace) : text;
      var special = builder.cm.state.specialChars, mustWrap = false;
      var content;
      if (!special.test(text)) {
        builder.col += text.length;
        content = document.createTextNode(displayText);
        builder.map.push(builder.pos, builder.pos + text.length, content);
        if (ie && ie_version < 9) {
          mustWrap = true;
        }
        builder.pos += text.length;
      } else {
        content = document.createDocumentFragment();
        var pos = 0;
        while (true) {
          special.lastIndex = pos;
          var m = special.exec(text);
          var skipped = m ? m.index - pos : text.length - pos;
          if (skipped) {
            var txt = document.createTextNode(displayText.slice(pos, pos + skipped));
            if (ie && ie_version < 9) {
              content.appendChild(elt("span", [txt]));
            } else {
              content.appendChild(txt);
            }
            builder.map.push(builder.pos, builder.pos + skipped, txt);
            builder.col += skipped;
            builder.pos += skipped;
          }
          if (!m) {
            break;
          }
          pos += skipped + 1;
          var txt$1 = void 0;
          if (m[0] == "	") {
            var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize;
            txt$1 = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
            txt$1.setAttribute("role", "presentation");
            txt$1.setAttribute("cm-text", "	");
            builder.col += tabWidth;
          } else if (m[0] == "\r" || m[0] == "\n") {
            txt$1 = content.appendChild(elt("span", m[0] == "\r" ? "\u240D" : "\u2424", "cm-invalidchar"));
            txt$1.setAttribute("cm-text", m[0]);
            builder.col += 1;
          } else {
            txt$1 = builder.cm.options.specialCharPlaceholder(m[0]);
            txt$1.setAttribute("cm-text", m[0]);
            if (ie && ie_version < 9) {
              content.appendChild(elt("span", [txt$1]));
            } else {
              content.appendChild(txt$1);
            }
            builder.col += 1;
          }
          builder.map.push(builder.pos, builder.pos + 1, txt$1);
          builder.pos++;
        }
      }
      builder.trailingSpace = displayText.charCodeAt(text.length - 1) == 32;
      if (style || startStyle || endStyle || mustWrap || css || attributes) {
        var fullStyle = style || "";
        if (startStyle) {
          fullStyle += startStyle;
        }
        if (endStyle) {
          fullStyle += endStyle;
        }
        var token = elt("span", [content], fullStyle, css);
        if (attributes) {
          for (var attr in attributes) {
            if (attributes.hasOwnProperty(attr) && attr != "style" && attr != "class") {
              token.setAttribute(attr, attributes[attr]);
            }
          }
        }
        return builder.content.appendChild(token);
      }
      builder.content.appendChild(content);
    }
    function splitSpaces(text, trailingBefore) {
      if (text.length > 1 && !/  /.test(text)) {
        return text;
      }
      var spaceBefore = trailingBefore, result = "";
      for (var i2 = 0; i2 < text.length; i2++) {
        var ch = text.charAt(i2);
        if (ch == " " && spaceBefore && (i2 == text.length - 1 || text.charCodeAt(i2 + 1) == 32)) {
          ch = "\xA0";
        }
        result += ch;
        spaceBefore = ch == " ";
      }
      return result;
    }
    function buildTokenBadBidi(inner, order) {
      return function(builder, text, style, startStyle, endStyle, css, attributes) {
        style = style ? style + " cm-force-border" : "cm-force-border";
        var start = builder.pos, end = start + text.length;
        for (; ; ) {
          var part = void 0;
          for (var i2 = 0; i2 < order.length; i2++) {
            part = order[i2];
            if (part.to > start && part.from <= start) {
              break;
            }
          }
          if (part.to >= end) {
            return inner(builder, text, style, startStyle, endStyle, css, attributes);
          }
          inner(builder, text.slice(0, part.to - start), style, startStyle, null, css, attributes);
          startStyle = null;
          text = text.slice(part.to - start);
          start = part.to;
        }
      };
    }
    function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
      var widget = !ignoreWidget && marker.widgetNode;
      if (widget) {
        builder.map.push(builder.pos, builder.pos + size, widget);
      }
      if (!ignoreWidget && builder.cm.display.input.needsContentAttribute) {
        if (!widget) {
          widget = builder.content.appendChild(document.createElement("span"));
        }
        widget.setAttribute("cm-marker", marker.id);
      }
      if (widget) {
        builder.cm.display.input.setUneditable(widget);
        builder.content.appendChild(widget);
      }
      builder.pos += size;
      builder.trailingSpace = false;
    }
    function insertLineContent(line, builder, styles2) {
      var spans = line.markedSpans, allText = line.text, at = 0;
      if (!spans) {
        for (var i$12 = 1; i$12 < styles2.length; i$12 += 2) {
          builder.addToken(builder, allText.slice(at, at = styles2[i$12]), interpretTokenStyle(styles2[i$12 + 1], builder.cm.options));
        }
        return;
      }
      var len = allText.length, pos = 0, i2 = 1, text = "", style, css;
      var nextChange = 0, spanStyle, spanEndStyle, spanStartStyle, collapsed, attributes;
      for (; ; ) {
        if (nextChange == pos) {
          spanStyle = spanEndStyle = spanStartStyle = css = "";
          attributes = null;
          collapsed = null;
          nextChange = Infinity;
          var foundBookmarks = [], endStyles = void 0;
          for (var j = 0; j < spans.length; ++j) {
            var sp = spans[j], m = sp.marker;
            if (m.type == "bookmark" && sp.from == pos && m.widgetNode) {
              foundBookmarks.push(m);
            } else if (sp.from <= pos && (sp.to == null || sp.to > pos || m.collapsed && sp.to == pos && sp.from == pos)) {
              if (sp.to != null && sp.to != pos && nextChange > sp.to) {
                nextChange = sp.to;
                spanEndStyle = "";
              }
              if (m.className) {
                spanStyle += " " + m.className;
              }
              if (m.css) {
                css = (css ? css + ";" : "") + m.css;
              }
              if (m.startStyle && sp.from == pos) {
                spanStartStyle += " " + m.startStyle;
              }
              if (m.endStyle && sp.to == nextChange) {
                (endStyles || (endStyles = [])).push(m.endStyle, sp.to);
              }
              if (m.title) {
                (attributes || (attributes = {})).title = m.title;
              }
              if (m.attributes) {
                for (var attr in m.attributes) {
                  (attributes || (attributes = {}))[attr] = m.attributes[attr];
                }
              }
              if (m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0)) {
                collapsed = sp;
              }
            } else if (sp.from > pos && nextChange > sp.from) {
              nextChange = sp.from;
            }
          }
          if (endStyles) {
            for (var j$1 = 0; j$1 < endStyles.length; j$1 += 2) {
              if (endStyles[j$1 + 1] == nextChange) {
                spanEndStyle += " " + endStyles[j$1];
              }
            }
          }
          if (!collapsed || collapsed.from == pos) {
            for (var j$2 = 0; j$2 < foundBookmarks.length; ++j$2) {
              buildCollapsedSpan(builder, 0, foundBookmarks[j$2]);
            }
          }
          if (collapsed && (collapsed.from || 0) == pos) {
            buildCollapsedSpan(builder, (collapsed.to == null ? len + 1 : collapsed.to) - pos, collapsed.marker, collapsed.from == null);
            if (collapsed.to == null) {
              return;
            }
            if (collapsed.to == pos) {
              collapsed = false;
            }
          }
        }
        if (pos >= len) {
          break;
        }
        var upto = Math.min(len, nextChange);
        while (true) {
          if (text) {
            var end = pos + text.length;
            if (!collapsed) {
              var tokenText = end > upto ? text.slice(0, upto - pos) : text;
              builder.addToken(builder, tokenText, style ? style + spanStyle : spanStyle, spanStartStyle, pos + tokenText.length == nextChange ? spanEndStyle : "", css, attributes);
            }
            if (end >= upto) {
              text = text.slice(upto - pos);
              pos = upto;
              break;
            }
            pos = end;
            spanStartStyle = "";
          }
          text = allText.slice(at, at = styles2[i2++]);
          style = interpretTokenStyle(styles2[i2++], builder.cm.options);
        }
      }
    }
    function LineView(doc, line, lineN) {
      this.line = line;
      this.rest = visualLineContinued(line);
      this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
      this.node = this.text = null;
      this.hidden = lineIsHidden(doc, line);
    }
    function buildViewArray(cm2, from, to) {
      var array = [], nextPos;
      for (var pos = from; pos < to; pos = nextPos) {
        var view = new LineView(cm2.doc, getLine(cm2.doc, pos), pos);
        nextPos = pos + view.size;
        array.push(view);
      }
      return array;
    }
    var operationGroup = null;
    function pushOperation(op) {
      if (operationGroup) {
        operationGroup.ops.push(op);
      } else {
        op.ownsGroup = operationGroup = {
          ops: [op],
          delayedCallbacks: []
        };
      }
    }
    function fireCallbacksForOps(group) {
      var callbacks = group.delayedCallbacks, i2 = 0;
      do {
        for (; i2 < callbacks.length; i2++) {
          callbacks[i2].call(null);
        }
        for (var j = 0; j < group.ops.length; j++) {
          var op = group.ops[j];
          if (op.cursorActivityHandlers) {
            while (op.cursorActivityCalled < op.cursorActivityHandlers.length) {
              op.cursorActivityHandlers[op.cursorActivityCalled++].call(null, op.cm);
            }
          }
        }
      } while (i2 < callbacks.length);
    }
    function finishOperation(op, endCb) {
      var group = op.ownsGroup;
      if (!group) {
        return;
      }
      try {
        fireCallbacksForOps(group);
      } finally {
        operationGroup = null;
        endCb(group);
      }
    }
    var orphanDelayedCallbacks = null;
    function signalLater(emitter, type) {
      var arr = getHandlers(emitter, type);
      if (!arr.length) {
        return;
      }
      var args = Array.prototype.slice.call(arguments, 2), list;
      if (operationGroup) {
        list = operationGroup.delayedCallbacks;
      } else if (orphanDelayedCallbacks) {
        list = orphanDelayedCallbacks;
      } else {
        list = orphanDelayedCallbacks = [];
        setTimeout(fireOrphanDelayed, 0);
      }
      var loop = function(i3) {
        list.push(function() {
          return arr[i3].apply(null, args);
        });
      };
      for (var i2 = 0; i2 < arr.length; ++i2)
        loop(i2);
    }
    function fireOrphanDelayed() {
      var delayed = orphanDelayedCallbacks;
      orphanDelayedCallbacks = null;
      for (var i2 = 0; i2 < delayed.length; ++i2) {
        delayed[i2]();
      }
    }
    function updateLineForChanges(cm2, lineView, lineN, dims) {
      for (var j = 0; j < lineView.changes.length; j++) {
        var type = lineView.changes[j];
        if (type == "text") {
          updateLineText(cm2, lineView);
        } else if (type == "gutter") {
          updateLineGutter(cm2, lineView, lineN, dims);
        } else if (type == "class") {
          updateLineClasses(cm2, lineView);
        } else if (type == "widget") {
          updateLineWidgets(cm2, lineView, dims);
        }
      }
      lineView.changes = null;
    }
    function ensureLineWrapped(lineView) {
      if (lineView.node == lineView.text) {
        lineView.node = elt("div", null, null, "position: relative");
        if (lineView.text.parentNode) {
          lineView.text.parentNode.replaceChild(lineView.node, lineView.text);
        }
        lineView.node.appendChild(lineView.text);
        if (ie && ie_version < 8) {
          lineView.node.style.zIndex = 2;
        }
      }
      return lineView.node;
    }
    function updateLineBackground(cm2, lineView) {
      var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
      if (cls) {
        cls += " CodeMirror-linebackground";
      }
      if (lineView.background) {
        if (cls) {
          lineView.background.className = cls;
        } else {
          lineView.background.parentNode.removeChild(lineView.background);
          lineView.background = null;
        }
      } else if (cls) {
        var wrap = ensureLineWrapped(lineView);
        lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
        cm2.display.input.setUneditable(lineView.background);
      }
    }
    function getLineContent(cm2, lineView) {
      var ext = cm2.display.externalMeasured;
      if (ext && ext.line == lineView.line) {
        cm2.display.externalMeasured = null;
        lineView.measure = ext.measure;
        return ext.built;
      }
      return buildLineContent(cm2, lineView);
    }
    function updateLineText(cm2, lineView) {
      var cls = lineView.text.className;
      var built = getLineContent(cm2, lineView);
      if (lineView.text == lineView.node) {
        lineView.node = built.pre;
      }
      lineView.text.parentNode.replaceChild(built.pre, lineView.text);
      lineView.text = built.pre;
      if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
        lineView.bgClass = built.bgClass;
        lineView.textClass = built.textClass;
        updateLineClasses(cm2, lineView);
      } else if (cls) {
        lineView.text.className = cls;
      }
    }
    function updateLineClasses(cm2, lineView) {
      updateLineBackground(cm2, lineView);
      if (lineView.line.wrapClass) {
        ensureLineWrapped(lineView).className = lineView.line.wrapClass;
      } else if (lineView.node != lineView.text) {
        lineView.node.className = "";
      }
      var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
      lineView.text.className = textClass || "";
    }
    function updateLineGutter(cm2, lineView, lineN, dims) {
      if (lineView.gutter) {
        lineView.node.removeChild(lineView.gutter);
        lineView.gutter = null;
      }
      if (lineView.gutterBackground) {
        lineView.node.removeChild(lineView.gutterBackground);
        lineView.gutterBackground = null;
      }
      if (lineView.line.gutterClass) {
        var wrap = ensureLineWrapped(lineView);
        lineView.gutterBackground = elt("div", null, "CodeMirror-gutter-background " + lineView.line.gutterClass, "left: " + (cm2.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px; width: " + dims.gutterTotalWidth + "px");
        cm2.display.input.setUneditable(lineView.gutterBackground);
        wrap.insertBefore(lineView.gutterBackground, lineView.text);
      }
      var markers = lineView.line.gutterMarkers;
      if (cm2.options.lineNumbers || markers) {
        var wrap$1 = ensureLineWrapped(lineView);
        var gutterWrap = lineView.gutter = elt("div", null, "CodeMirror-gutter-wrapper", "left: " + (cm2.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px");
        gutterWrap.setAttribute("aria-hidden", "true");
        cm2.display.input.setUneditable(gutterWrap);
        wrap$1.insertBefore(gutterWrap, lineView.text);
        if (lineView.line.gutterClass) {
          gutterWrap.className += " " + lineView.line.gutterClass;
        }
        if (cm2.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"])) {
          lineView.lineNumber = gutterWrap.appendChild(elt("div", lineNumberFor(cm2.options, lineN), "CodeMirror-linenumber CodeMirror-gutter-elt", "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + cm2.display.lineNumInnerWidth + "px"));
        }
        if (markers) {
          for (var k = 0; k < cm2.display.gutterSpecs.length; ++k) {
            var id = cm2.display.gutterSpecs[k].className, found = markers.hasOwnProperty(id) && markers[id];
            if (found) {
              gutterWrap.appendChild(elt("div", [found], "CodeMirror-gutter-elt", "left: " + dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"));
            }
          }
        }
      }
    }
    function updateLineWidgets(cm2, lineView, dims) {
      if (lineView.alignable) {
        lineView.alignable = null;
      }
      var isWidget = classTest("CodeMirror-linewidget");
      for (var node = lineView.node.firstChild, next = void 0; node; node = next) {
        next = node.nextSibling;
        if (isWidget.test(node.className)) {
          lineView.node.removeChild(node);
        }
      }
      insertLineWidgets(cm2, lineView, dims);
    }
    function buildLineElement(cm2, lineView, lineN, dims) {
      var built = getLineContent(cm2, lineView);
      lineView.text = lineView.node = built.pre;
      if (built.bgClass) {
        lineView.bgClass = built.bgClass;
      }
      if (built.textClass) {
        lineView.textClass = built.textClass;
      }
      updateLineClasses(cm2, lineView);
      updateLineGutter(cm2, lineView, lineN, dims);
      insertLineWidgets(cm2, lineView, dims);
      return lineView.node;
    }
    function insertLineWidgets(cm2, lineView, dims) {
      insertLineWidgetsFor(cm2, lineView.line, lineView, dims, true);
      if (lineView.rest) {
        for (var i2 = 0; i2 < lineView.rest.length; i2++) {
          insertLineWidgetsFor(cm2, lineView.rest[i2], lineView, dims, false);
        }
      }
    }
    function insertLineWidgetsFor(cm2, line, lineView, dims, allowAbove) {
      if (!line.widgets) {
        return;
      }
      var wrap = ensureLineWrapped(lineView);
      for (var i2 = 0, ws = line.widgets; i2 < ws.length; ++i2) {
        var widget = ws[i2], node = elt("div", [widget.node], "CodeMirror-linewidget" + (widget.className ? " " + widget.className : ""));
        if (!widget.handleMouseEvents) {
          node.setAttribute("cm-ignore-events", "true");
        }
        positionLineWidget(widget, node, lineView, dims);
        cm2.display.input.setUneditable(node);
        if (allowAbove && widget.above) {
          wrap.insertBefore(node, lineView.gutter || lineView.text);
        } else {
          wrap.appendChild(node);
        }
        signalLater(widget, "redraw");
      }
    }
    function positionLineWidget(widget, node, lineView, dims) {
      if (widget.noHScroll) {
        (lineView.alignable || (lineView.alignable = [])).push(node);
        var width = dims.wrapperWidth;
        node.style.left = dims.fixedPos + "px";
        if (!widget.coverGutter) {
          width -= dims.gutterTotalWidth;
          node.style.paddingLeft = dims.gutterTotalWidth + "px";
        }
        node.style.width = width + "px";
      }
      if (widget.coverGutter) {
        node.style.zIndex = 5;
        node.style.position = "relative";
        if (!widget.noHScroll) {
          node.style.marginLeft = -dims.gutterTotalWidth + "px";
        }
      }
    }
    function widgetHeight(widget) {
      if (widget.height != null) {
        return widget.height;
      }
      var cm2 = widget.doc.cm;
      if (!cm2) {
        return 0;
      }
      if (!contains(document.body, widget.node)) {
        var parentStyle = "position: relative;";
        if (widget.coverGutter) {
          parentStyle += "margin-left: -" + cm2.display.gutters.offsetWidth + "px;";
        }
        if (widget.noHScroll) {
          parentStyle += "width: " + cm2.display.wrapper.clientWidth + "px;";
        }
        removeChildrenAndAdd(cm2.display.measure, elt("div", [widget.node], null, parentStyle));
      }
      return widget.height = widget.node.parentNode.offsetHeight;
    }
    function eventInWidget(display, e) {
      for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
        if (!n || n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true" || n.parentNode == display.sizer && n != display.mover) {
          return true;
        }
      }
    }
    function paddingTop(display) {
      return display.lineSpace.offsetTop;
    }
    function paddingVert(display) {
      return display.mover.offsetHeight - display.lineSpace.offsetHeight;
    }
    function paddingH(display) {
      if (display.cachedPaddingH) {
        return display.cachedPaddingH;
      }
      var e = removeChildrenAndAdd(display.measure, elt("pre", "x", "CodeMirror-line-like"));
      var style = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
      var data = { left: parseInt(style.paddingLeft), right: parseInt(style.paddingRight) };
      if (!isNaN(data.left) && !isNaN(data.right)) {
        display.cachedPaddingH = data;
      }
      return data;
    }
    function scrollGap(cm2) {
      return scrollerGap - cm2.display.nativeBarWidth;
    }
    function displayWidth(cm2) {
      return cm2.display.scroller.clientWidth - scrollGap(cm2) - cm2.display.barWidth;
    }
    function displayHeight(cm2) {
      return cm2.display.scroller.clientHeight - scrollGap(cm2) - cm2.display.barHeight;
    }
    function ensureLineHeights(cm2, lineView, rect) {
      var wrapping = cm2.options.lineWrapping;
      var curWidth = wrapping && displayWidth(cm2);
      if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
        var heights = lineView.measure.heights = [];
        if (wrapping) {
          lineView.measure.width = curWidth;
          var rects = lineView.text.firstChild.getClientRects();
          for (var i2 = 0; i2 < rects.length - 1; i2++) {
            var cur = rects[i2], next = rects[i2 + 1];
            if (Math.abs(cur.bottom - next.bottom) > 2) {
              heights.push((cur.bottom + next.top) / 2 - rect.top);
            }
          }
        }
        heights.push(rect.bottom - rect.top);
      }
    }
    function mapFromLineView(lineView, line, lineN) {
      if (lineView.line == line) {
        return { map: lineView.measure.map, cache: lineView.measure.cache };
      }
      for (var i2 = 0; i2 < lineView.rest.length; i2++) {
        if (lineView.rest[i2] == line) {
          return { map: lineView.measure.maps[i2], cache: lineView.measure.caches[i2] };
        }
      }
      for (var i$12 = 0; i$12 < lineView.rest.length; i$12++) {
        if (lineNo(lineView.rest[i$12]) > lineN) {
          return { map: lineView.measure.maps[i$12], cache: lineView.measure.caches[i$12], before: true };
        }
      }
    }
    function updateExternalMeasurement(cm2, line) {
      line = visualLine(line);
      var lineN = lineNo(line);
      var view = cm2.display.externalMeasured = new LineView(cm2.doc, line, lineN);
      view.lineN = lineN;
      var built = view.built = buildLineContent(cm2, view);
      view.text = built.pre;
      removeChildrenAndAdd(cm2.display.lineMeasure, built.pre);
      return view;
    }
    function measureChar(cm2, line, ch, bias) {
      return measureCharPrepared(cm2, prepareMeasureForLine(cm2, line), ch, bias);
    }
    function findViewForLine(cm2, lineN) {
      if (lineN >= cm2.display.viewFrom && lineN < cm2.display.viewTo) {
        return cm2.display.view[findViewIndex(cm2, lineN)];
      }
      var ext = cm2.display.externalMeasured;
      if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size) {
        return ext;
      }
    }
    function prepareMeasureForLine(cm2, line) {
      var lineN = lineNo(line);
      var view = findViewForLine(cm2, lineN);
      if (view && !view.text) {
        view = null;
      } else if (view && view.changes) {
        updateLineForChanges(cm2, view, lineN, getDimensions(cm2));
        cm2.curOp.forceUpdate = true;
      }
      if (!view) {
        view = updateExternalMeasurement(cm2, line);
      }
      var info = mapFromLineView(view, line, lineN);
      return {
        line,
        view,
        rect: null,
        map: info.map,
        cache: info.cache,
        before: info.before,
        hasHeights: false
      };
    }
    function measureCharPrepared(cm2, prepared, ch, bias, varHeight) {
      if (prepared.before) {
        ch = -1;
      }
      var key = ch + (bias || ""), found;
      if (prepared.cache.hasOwnProperty(key)) {
        found = prepared.cache[key];
      } else {
        if (!prepared.rect) {
          prepared.rect = prepared.view.text.getBoundingClientRect();
        }
        if (!prepared.hasHeights) {
          ensureLineHeights(cm2, prepared.view, prepared.rect);
          prepared.hasHeights = true;
        }
        found = measureCharInner(cm2, prepared, ch, bias);
        if (!found.bogus) {
          prepared.cache[key] = found;
        }
      }
      return {
        left: found.left,
        right: found.right,
        top: varHeight ? found.rtop : found.top,
        bottom: varHeight ? found.rbottom : found.bottom
      };
    }
    var nullRect = { left: 0, right: 0, top: 0, bottom: 0 };
    function nodeAndOffsetInLineMap(map2, ch, bias) {
      var node, start, end, collapse, mStart, mEnd;
      for (var i2 = 0; i2 < map2.length; i2 += 3) {
        mStart = map2[i2];
        mEnd = map2[i2 + 1];
        if (ch < mStart) {
          start = 0;
          end = 1;
          collapse = "left";
        } else if (ch < mEnd) {
          start = ch - mStart;
          end = start + 1;
        } else if (i2 == map2.length - 3 || ch == mEnd && map2[i2 + 3] > ch) {
          end = mEnd - mStart;
          start = end - 1;
          if (ch >= mEnd) {
            collapse = "right";
          }
        }
        if (start != null) {
          node = map2[i2 + 2];
          if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right")) {
            collapse = bias;
          }
          if (bias == "left" && start == 0) {
            while (i2 && map2[i2 - 2] == map2[i2 - 3] && map2[i2 - 1].insertLeft) {
              node = map2[(i2 -= 3) + 2];
              collapse = "left";
            }
          }
          if (bias == "right" && start == mEnd - mStart) {
            while (i2 < map2.length - 3 && map2[i2 + 3] == map2[i2 + 4] && !map2[i2 + 5].insertLeft) {
              node = map2[(i2 += 3) + 2];
              collapse = "right";
            }
          }
          break;
        }
      }
      return { node, start, end, collapse, coverStart: mStart, coverEnd: mEnd };
    }
    function getUsefulRect(rects, bias) {
      var rect = nullRect;
      if (bias == "left") {
        for (var i2 = 0; i2 < rects.length; i2++) {
          if ((rect = rects[i2]).left != rect.right) {
            break;
          }
        }
      } else {
        for (var i$12 = rects.length - 1; i$12 >= 0; i$12--) {
          if ((rect = rects[i$12]).left != rect.right) {
            break;
          }
        }
      }
      return rect;
    }
    function measureCharInner(cm2, prepared, ch, bias) {
      var place = nodeAndOffsetInLineMap(prepared.map, ch, bias);
      var node = place.node, start = place.start, end = place.end, collapse = place.collapse;
      var rect;
      if (node.nodeType == 3) {
        for (var i$12 = 0; i$12 < 4; i$12++) {
          while (start && isExtendingChar(prepared.line.text.charAt(place.coverStart + start))) {
            --start;
          }
          while (place.coverStart + end < place.coverEnd && isExtendingChar(prepared.line.text.charAt(place.coverStart + end))) {
            ++end;
          }
          if (ie && ie_version < 9 && start == 0 && end == place.coverEnd - place.coverStart) {
            rect = node.parentNode.getBoundingClientRect();
          } else {
            rect = getUsefulRect(range(node, start, end).getClientRects(), bias);
          }
          if (rect.left || rect.right || start == 0) {
            break;
          }
          end = start;
          start = start - 1;
          collapse = "right";
        }
        if (ie && ie_version < 11) {
          rect = maybeUpdateRectForZooming(cm2.display.measure, rect);
        }
      } else {
        if (start > 0) {
          collapse = bias = "right";
        }
        var rects;
        if (cm2.options.lineWrapping && (rects = node.getClientRects()).length > 1) {
          rect = rects[bias == "right" ? rects.length - 1 : 0];
        } else {
          rect = node.getBoundingClientRect();
        }
      }
      if (ie && ie_version < 9 && !start && (!rect || !rect.left && !rect.right)) {
        var rSpan = node.parentNode.getClientRects()[0];
        if (rSpan) {
          rect = { left: rSpan.left, right: rSpan.left + charWidth(cm2.display), top: rSpan.top, bottom: rSpan.bottom };
        } else {
          rect = nullRect;
        }
      }
      var rtop = rect.top - prepared.rect.top, rbot = rect.bottom - prepared.rect.top;
      var mid = (rtop + rbot) / 2;
      var heights = prepared.view.measure.heights;
      var i2 = 0;
      for (; i2 < heights.length - 1; i2++) {
        if (mid < heights[i2]) {
          break;
        }
      }
      var top = i2 ? heights[i2 - 1] : 0, bot = heights[i2];
      var result = {
        left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
        right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
        top,
        bottom: bot
      };
      if (!rect.left && !rect.right) {
        result.bogus = true;
      }
      if (!cm2.options.singleCursorHeightPerLine) {
        result.rtop = rtop;
        result.rbottom = rbot;
      }
      return result;
    }
    function maybeUpdateRectForZooming(measure, rect) {
      if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !hasBadZoomedRects(measure)) {
        return rect;
      }
      var scaleX = screen.logicalXDPI / screen.deviceXDPI;
      var scaleY = screen.logicalYDPI / screen.deviceYDPI;
      return {
        left: rect.left * scaleX,
        right: rect.right * scaleX,
        top: rect.top * scaleY,
        bottom: rect.bottom * scaleY
      };
    }
    function clearLineMeasurementCacheFor(lineView) {
      if (lineView.measure) {
        lineView.measure.cache = {};
        lineView.measure.heights = null;
        if (lineView.rest) {
          for (var i2 = 0; i2 < lineView.rest.length; i2++) {
            lineView.measure.caches[i2] = {};
          }
        }
      }
    }
    function clearLineMeasurementCache(cm2) {
      cm2.display.externalMeasure = null;
      removeChildren(cm2.display.lineMeasure);
      for (var i2 = 0; i2 < cm2.display.view.length; i2++) {
        clearLineMeasurementCacheFor(cm2.display.view[i2]);
      }
    }
    function clearCaches(cm2) {
      clearLineMeasurementCache(cm2);
      cm2.display.cachedCharWidth = cm2.display.cachedTextHeight = cm2.display.cachedPaddingH = null;
      if (!cm2.options.lineWrapping) {
        cm2.display.maxLineChanged = true;
      }
      cm2.display.lineNumChars = null;
    }
    function pageScrollX() {
      if (chrome && android) {
        return -(document.body.getBoundingClientRect().left - parseInt(getComputedStyle(document.body).marginLeft));
      }
      return window.pageXOffset || (document.documentElement || document.body).scrollLeft;
    }
    function pageScrollY() {
      if (chrome && android) {
        return -(document.body.getBoundingClientRect().top - parseInt(getComputedStyle(document.body).marginTop));
      }
      return window.pageYOffset || (document.documentElement || document.body).scrollTop;
    }
    function widgetTopHeight(lineObj) {
      var height = 0;
      if (lineObj.widgets) {
        for (var i2 = 0; i2 < lineObj.widgets.length; ++i2) {
          if (lineObj.widgets[i2].above) {
            height += widgetHeight(lineObj.widgets[i2]);
          }
        }
      }
      return height;
    }
    function intoCoordSystem(cm2, lineObj, rect, context, includeWidgets) {
      if (!includeWidgets) {
        var height = widgetTopHeight(lineObj);
        rect.top += height;
        rect.bottom += height;
      }
      if (context == "line") {
        return rect;
      }
      if (!context) {
        context = "local";
      }
      var yOff = heightAtLine(lineObj);
      if (context == "local") {
        yOff += paddingTop(cm2.display);
      } else {
        yOff -= cm2.display.viewOffset;
      }
      if (context == "page" || context == "window") {
        var lOff = cm2.display.lineSpace.getBoundingClientRect();
        yOff += lOff.top + (context == "window" ? 0 : pageScrollY());
        var xOff = lOff.left + (context == "window" ? 0 : pageScrollX());
        rect.left += xOff;
        rect.right += xOff;
      }
      rect.top += yOff;
      rect.bottom += yOff;
      return rect;
    }
    function fromCoordSystem(cm2, coords, context) {
      if (context == "div") {
        return coords;
      }
      var left = coords.left, top = coords.top;
      if (context == "page") {
        left -= pageScrollX();
        top -= pageScrollY();
      } else if (context == "local" || !context) {
        var localBox = cm2.display.sizer.getBoundingClientRect();
        left += localBox.left;
        top += localBox.top;
      }
      var lineSpaceBox = cm2.display.lineSpace.getBoundingClientRect();
      return { left: left - lineSpaceBox.left, top: top - lineSpaceBox.top };
    }
    function charCoords(cm2, pos, context, lineObj, bias) {
      if (!lineObj) {
        lineObj = getLine(cm2.doc, pos.line);
      }
      return intoCoordSystem(cm2, lineObj, measureChar(cm2, lineObj, pos.ch, bias), context);
    }
    function cursorCoords(cm2, pos, context, lineObj, preparedMeasure, varHeight) {
      lineObj = lineObj || getLine(cm2.doc, pos.line);
      if (!preparedMeasure) {
        preparedMeasure = prepareMeasureForLine(cm2, lineObj);
      }
      function get(ch2, right) {
        var m = measureCharPrepared(cm2, preparedMeasure, ch2, right ? "right" : "left", varHeight);
        if (right) {
          m.left = m.right;
        } else {
          m.right = m.left;
        }
        return intoCoordSystem(cm2, lineObj, m, context);
      }
      var order = getOrder(lineObj, cm2.doc.direction), ch = pos.ch, sticky = pos.sticky;
      if (ch >= lineObj.text.length) {
        ch = lineObj.text.length;
        sticky = "before";
      } else if (ch <= 0) {
        ch = 0;
        sticky = "after";
      }
      if (!order) {
        return get(sticky == "before" ? ch - 1 : ch, sticky == "before");
      }
      function getBidi(ch2, partPos2, invert) {
        var part = order[partPos2], right = part.level == 1;
        return get(invert ? ch2 - 1 : ch2, right != invert);
      }
      var partPos = getBidiPartAt(order, ch, sticky);
      var other = bidiOther;
      var val = getBidi(ch, partPos, sticky == "before");
      if (other != null) {
        val.other = getBidi(ch, other, sticky != "before");
      }
      return val;
    }
    function estimateCoords(cm2, pos) {
      var left = 0;
      pos = clipPos(cm2.doc, pos);
      if (!cm2.options.lineWrapping) {
        left = charWidth(cm2.display) * pos.ch;
      }
      var lineObj = getLine(cm2.doc, pos.line);
      var top = heightAtLine(lineObj) + paddingTop(cm2.display);
      return { left, right: left, top, bottom: top + lineObj.height };
    }
    function PosWithInfo(line, ch, sticky, outside, xRel) {
      var pos = Pos(line, ch, sticky);
      pos.xRel = xRel;
      if (outside) {
        pos.outside = outside;
      }
      return pos;
    }
    function coordsChar(cm2, x, y) {
      var doc = cm2.doc;
      y += cm2.display.viewOffset;
      if (y < 0) {
        return PosWithInfo(doc.first, 0, null, -1, -1);
      }
      var lineN = lineAtHeight(doc, y), last = doc.first + doc.size - 1;
      if (lineN > last) {
        return PosWithInfo(doc.first + doc.size - 1, getLine(doc, last).text.length, null, 1, 1);
      }
      if (x < 0) {
        x = 0;
      }
      var lineObj = getLine(doc, lineN);
      for (; ; ) {
        var found = coordsCharInner(cm2, lineObj, lineN, x, y);
        var collapsed = collapsedSpanAround(lineObj, found.ch + (found.xRel > 0 || found.outside > 0 ? 1 : 0));
        if (!collapsed) {
          return found;
        }
        var rangeEnd = collapsed.find(1);
        if (rangeEnd.line == lineN) {
          return rangeEnd;
        }
        lineObj = getLine(doc, lineN = rangeEnd.line);
      }
    }
    function wrappedLineExtent(cm2, lineObj, preparedMeasure, y) {
      y -= widgetTopHeight(lineObj);
      var end = lineObj.text.length;
      var begin = findFirst(function(ch) {
        return measureCharPrepared(cm2, preparedMeasure, ch - 1).bottom <= y;
      }, end, 0);
      end = findFirst(function(ch) {
        return measureCharPrepared(cm2, preparedMeasure, ch).top > y;
      }, begin, end);
      return { begin, end };
    }
    function wrappedLineExtentChar(cm2, lineObj, preparedMeasure, target) {
      if (!preparedMeasure) {
        preparedMeasure = prepareMeasureForLine(cm2, lineObj);
      }
      var targetTop = intoCoordSystem(cm2, lineObj, measureCharPrepared(cm2, preparedMeasure, target), "line").top;
      return wrappedLineExtent(cm2, lineObj, preparedMeasure, targetTop);
    }
    function boxIsAfter(box, x, y, left) {
      return box.bottom <= y ? false : box.top > y ? true : (left ? box.left : box.right) > x;
    }
    function coordsCharInner(cm2, lineObj, lineNo2, x, y) {
      y -= heightAtLine(lineObj);
      var preparedMeasure = prepareMeasureForLine(cm2, lineObj);
      var widgetHeight2 = widgetTopHeight(lineObj);
      var begin = 0, end = lineObj.text.length, ltr = true;
      var order = getOrder(lineObj, cm2.doc.direction);
      if (order) {
        var part = (cm2.options.lineWrapping ? coordsBidiPartWrapped : coordsBidiPart)(cm2, lineObj, lineNo2, preparedMeasure, order, x, y);
        ltr = part.level != 1;
        begin = ltr ? part.from : part.to - 1;
        end = ltr ? part.to : part.from - 1;
      }
      var chAround = null, boxAround = null;
      var ch = findFirst(function(ch2) {
        var box = measureCharPrepared(cm2, preparedMeasure, ch2);
        box.top += widgetHeight2;
        box.bottom += widgetHeight2;
        if (!boxIsAfter(box, x, y, false)) {
          return false;
        }
        if (box.top <= y && box.left <= x) {
          chAround = ch2;
          boxAround = box;
        }
        return true;
      }, begin, end);
      var baseX, sticky, outside = false;
      if (boxAround) {
        var atLeft = x - boxAround.left < boxAround.right - x, atStart = atLeft == ltr;
        ch = chAround + (atStart ? 0 : 1);
        sticky = atStart ? "after" : "before";
        baseX = atLeft ? boxAround.left : boxAround.right;
      } else {
        if (!ltr && (ch == end || ch == begin)) {
          ch++;
        }
        sticky = ch == 0 ? "after" : ch == lineObj.text.length ? "before" : measureCharPrepared(cm2, preparedMeasure, ch - (ltr ? 1 : 0)).bottom + widgetHeight2 <= y == ltr ? "after" : "before";
        var coords = cursorCoords(cm2, Pos(lineNo2, ch, sticky), "line", lineObj, preparedMeasure);
        baseX = coords.left;
        outside = y < coords.top ? -1 : y >= coords.bottom ? 1 : 0;
      }
      ch = skipExtendingChars(lineObj.text, ch, 1);
      return PosWithInfo(lineNo2, ch, sticky, outside, x - baseX);
    }
    function coordsBidiPart(cm2, lineObj, lineNo2, preparedMeasure, order, x, y) {
      var index = findFirst(function(i2) {
        var part2 = order[i2], ltr2 = part2.level != 1;
        return boxIsAfter(cursorCoords(cm2, Pos(lineNo2, ltr2 ? part2.to : part2.from, ltr2 ? "before" : "after"), "line", lineObj, preparedMeasure), x, y, true);
      }, 0, order.length - 1);
      var part = order[index];
      if (index > 0) {
        var ltr = part.level != 1;
        var start = cursorCoords(cm2, Pos(lineNo2, ltr ? part.from : part.to, ltr ? "after" : "before"), "line", lineObj, preparedMeasure);
        if (boxIsAfter(start, x, y, true) && start.top > y) {
          part = order[index - 1];
        }
      }
      return part;
    }
    function coordsBidiPartWrapped(cm2, lineObj, _lineNo, preparedMeasure, order, x, y) {
      var ref = wrappedLineExtent(cm2, lineObj, preparedMeasure, y);
      var begin = ref.begin;
      var end = ref.end;
      if (/\s/.test(lineObj.text.charAt(end - 1))) {
        end--;
      }
      var part = null, closestDist = null;
      for (var i2 = 0; i2 < order.length; i2++) {
        var p = order[i2];
        if (p.from >= end || p.to <= begin) {
          continue;
        }
        var ltr = p.level != 1;
        var endX = measureCharPrepared(cm2, preparedMeasure, ltr ? Math.min(end, p.to) - 1 : Math.max(begin, p.from)).right;
        var dist = endX < x ? x - endX + 1e9 : endX - x;
        if (!part || closestDist > dist) {
          part = p;
          closestDist = dist;
        }
      }
      if (!part) {
        part = order[order.length - 1];
      }
      if (part.from < begin) {
        part = { from: begin, to: part.to, level: part.level };
      }
      if (part.to > end) {
        part = { from: part.from, to: end, level: part.level };
      }
      return part;
    }
    var measureText;
    function textHeight(display) {
      if (display.cachedTextHeight != null) {
        return display.cachedTextHeight;
      }
      if (measureText == null) {
        measureText = elt("pre", null, "CodeMirror-line-like");
        for (var i2 = 0; i2 < 49; ++i2) {
          measureText.appendChild(document.createTextNode("x"));
          measureText.appendChild(elt("br"));
        }
        measureText.appendChild(document.createTextNode("x"));
      }
      removeChildrenAndAdd(display.measure, measureText);
      var height = measureText.offsetHeight / 50;
      if (height > 3) {
        display.cachedTextHeight = height;
      }
      removeChildren(display.measure);
      return height || 1;
    }
    function charWidth(display) {
      if (display.cachedCharWidth != null) {
        return display.cachedCharWidth;
      }
      var anchor = elt("span", "xxxxxxxxxx");
      var pre = elt("pre", [anchor], "CodeMirror-line-like");
      removeChildrenAndAdd(display.measure, pre);
      var rect = anchor.getBoundingClientRect(), width = (rect.right - rect.left) / 10;
      if (width > 2) {
        display.cachedCharWidth = width;
      }
      return width || 10;
    }
    function getDimensions(cm2) {
      var d = cm2.display, left = {}, width = {};
      var gutterLeft = d.gutters.clientLeft;
      for (var n = d.gutters.firstChild, i2 = 0; n; n = n.nextSibling, ++i2) {
        var id = cm2.display.gutterSpecs[i2].className;
        left[id] = n.offsetLeft + n.clientLeft + gutterLeft;
        width[id] = n.clientWidth;
      }
      return {
        fixedPos: compensateForHScroll(d),
        gutterTotalWidth: d.gutters.offsetWidth,
        gutterLeft: left,
        gutterWidth: width,
        wrapperWidth: d.wrapper.clientWidth
      };
    }
    function compensateForHScroll(display) {
      return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left;
    }
    function estimateHeight(cm2) {
      var th = textHeight(cm2.display), wrapping = cm2.options.lineWrapping;
      var perLine = wrapping && Math.max(5, cm2.display.scroller.clientWidth / charWidth(cm2.display) - 3);
      return function(line) {
        if (lineIsHidden(cm2.doc, line)) {
          return 0;
        }
        var widgetsHeight = 0;
        if (line.widgets) {
          for (var i2 = 0; i2 < line.widgets.length; i2++) {
            if (line.widgets[i2].height) {
              widgetsHeight += line.widgets[i2].height;
            }
          }
        }
        if (wrapping) {
          return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th;
        } else {
          return widgetsHeight + th;
        }
      };
    }
    function estimateLineHeights(cm2) {
      var doc = cm2.doc, est = estimateHeight(cm2);
      doc.iter(function(line) {
        var estHeight = est(line);
        if (estHeight != line.height) {
          updateLineHeight(line, estHeight);
        }
      });
    }
    function posFromMouse(cm2, e, liberal, forRect) {
      var display = cm2.display;
      if (!liberal && e_target(e).getAttribute("cm-not-content") == "true") {
        return null;
      }
      var x, y, space = display.lineSpace.getBoundingClientRect();
      try {
        x = e.clientX - space.left;
        y = e.clientY - space.top;
      } catch (e$1) {
        return null;
      }
      var coords = coordsChar(cm2, x, y), line;
      if (forRect && coords.xRel > 0 && (line = getLine(cm2.doc, coords.line).text).length == coords.ch) {
        var colDiff = countColumn(line, line.length, cm2.options.tabSize) - line.length;
        coords = Pos(coords.line, Math.max(0, Math.round((x - paddingH(cm2.display).left) / charWidth(cm2.display)) - colDiff));
      }
      return coords;
    }
    function findViewIndex(cm2, n) {
      if (n >= cm2.display.viewTo) {
        return null;
      }
      n -= cm2.display.viewFrom;
      if (n < 0) {
        return null;
      }
      var view = cm2.display.view;
      for (var i2 = 0; i2 < view.length; i2++) {
        n -= view[i2].size;
        if (n < 0) {
          return i2;
        }
      }
    }
    function regChange(cm2, from, to, lendiff) {
      if (from == null) {
        from = cm2.doc.first;
      }
      if (to == null) {
        to = cm2.doc.first + cm2.doc.size;
      }
      if (!lendiff) {
        lendiff = 0;
      }
      var display = cm2.display;
      if (lendiff && to < display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers > from)) {
        display.updateLineNumbers = from;
      }
      cm2.curOp.viewChanged = true;
      if (from >= display.viewTo) {
        if (sawCollapsedSpans && visualLineNo(cm2.doc, from) < display.viewTo) {
          resetView(cm2);
        }
      } else if (to <= display.viewFrom) {
        if (sawCollapsedSpans && visualLineEndNo(cm2.doc, to + lendiff) > display.viewFrom) {
          resetView(cm2);
        } else {
          display.viewFrom += lendiff;
          display.viewTo += lendiff;
        }
      } else if (from <= display.viewFrom && to >= display.viewTo) {
        resetView(cm2);
      } else if (from <= display.viewFrom) {
        var cut = viewCuttingPoint(cm2, to, to + lendiff, 1);
        if (cut) {
          display.view = display.view.slice(cut.index);
          display.viewFrom = cut.lineN;
          display.viewTo += lendiff;
        } else {
          resetView(cm2);
        }
      } else if (to >= display.viewTo) {
        var cut$1 = viewCuttingPoint(cm2, from, from, -1);
        if (cut$1) {
          display.view = display.view.slice(0, cut$1.index);
          display.viewTo = cut$1.lineN;
        } else {
          resetView(cm2);
        }
      } else {
        var cutTop = viewCuttingPoint(cm2, from, from, -1);
        var cutBot = viewCuttingPoint(cm2, to, to + lendiff, 1);
        if (cutTop && cutBot) {
          display.view = display.view.slice(0, cutTop.index).concat(buildViewArray(cm2, cutTop.lineN, cutBot.lineN)).concat(display.view.slice(cutBot.index));
          display.viewTo += lendiff;
        } else {
          resetView(cm2);
        }
      }
      var ext = display.externalMeasured;
      if (ext) {
        if (to < ext.lineN) {
          ext.lineN += lendiff;
        } else if (from < ext.lineN + ext.size) {
          display.externalMeasured = null;
        }
      }
    }
    function regLineChange(cm2, line, type) {
      cm2.curOp.viewChanged = true;
      var display = cm2.display, ext = cm2.display.externalMeasured;
      if (ext && line >= ext.lineN && line < ext.lineN + ext.size) {
        display.externalMeasured = null;
      }
      if (line < display.viewFrom || line >= display.viewTo) {
        return;
      }
      var lineView = display.view[findViewIndex(cm2, line)];
      if (lineView.node == null) {
        return;
      }
      var arr = lineView.changes || (lineView.changes = []);
      if (indexOf(arr, type) == -1) {
        arr.push(type);
      }
    }
    function resetView(cm2) {
      cm2.display.viewFrom = cm2.display.viewTo = cm2.doc.first;
      cm2.display.view = [];
      cm2.display.viewOffset = 0;
    }
    function viewCuttingPoint(cm2, oldN, newN, dir) {
      var index = findViewIndex(cm2, oldN), diff, view = cm2.display.view;
      if (!sawCollapsedSpans || newN == cm2.doc.first + cm2.doc.size) {
        return { index, lineN: newN };
      }
      var n = cm2.display.viewFrom;
      for (var i2 = 0; i2 < index; i2++) {
        n += view[i2].size;
      }
      if (n != oldN) {
        if (dir > 0) {
          if (index == view.length - 1) {
            return null;
          }
          diff = n + view[index].size - oldN;
          index++;
        } else {
          diff = n - oldN;
        }
        oldN += diff;
        newN += diff;
      }
      while (visualLineNo(cm2.doc, newN) != newN) {
        if (index == (dir < 0 ? 0 : view.length - 1)) {
          return null;
        }
        newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
        index += dir;
      }
      return { index, lineN: newN };
    }
    function adjustView(cm2, from, to) {
      var display = cm2.display, view = display.view;
      if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
        display.view = buildViewArray(cm2, from, to);
        display.viewFrom = from;
      } else {
        if (display.viewFrom > from) {
          display.view = buildViewArray(cm2, from, display.viewFrom).concat(display.view);
        } else if (display.viewFrom < from) {
          display.view = display.view.slice(findViewIndex(cm2, from));
        }
        display.viewFrom = from;
        if (display.viewTo < to) {
          display.view = display.view.concat(buildViewArray(cm2, display.viewTo, to));
        } else if (display.viewTo > to) {
          display.view = display.view.slice(0, findViewIndex(cm2, to));
        }
      }
      display.viewTo = to;
    }
    function countDirtyView(cm2) {
      var view = cm2.display.view, dirty = 0;
      for (var i2 = 0; i2 < view.length; i2++) {
        var lineView = view[i2];
        if (!lineView.hidden && (!lineView.node || lineView.changes)) {
          ++dirty;
        }
      }
      return dirty;
    }
    function updateSelection(cm2) {
      cm2.display.input.showSelection(cm2.display.input.prepareSelection());
    }
    function prepareSelection(cm2, primary) {
      if (primary === void 0)
        primary = true;
      var doc = cm2.doc, result = {};
      var curFragment = result.cursors = document.createDocumentFragment();
      var selFragment = result.selection = document.createDocumentFragment();
      for (var i2 = 0; i2 < doc.sel.ranges.length; i2++) {
        if (!primary && i2 == doc.sel.primIndex) {
          continue;
        }
        var range2 = doc.sel.ranges[i2];
        if (range2.from().line >= cm2.display.viewTo || range2.to().line < cm2.display.viewFrom) {
          continue;
        }
        var collapsed = range2.empty();
        if (collapsed || cm2.options.showCursorWhenSelecting) {
          drawSelectionCursor(cm2, range2.head, curFragment);
        }
        if (!collapsed) {
          drawSelectionRange(cm2, range2, selFragment);
        }
      }
      return result;
    }
    function drawSelectionCursor(cm2, head, output) {
      var pos = cursorCoords(cm2, head, "div", null, null, !cm2.options.singleCursorHeightPerLine);
      var cursor = output.appendChild(elt("div", "\xA0", "CodeMirror-cursor"));
      cursor.style.left = pos.left + "px";
      cursor.style.top = pos.top + "px";
      cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm2.options.cursorHeight + "px";
      if (/\bcm-fat-cursor\b/.test(cm2.getWrapperElement().className)) {
        var charPos = charCoords(cm2, head, "div", null, null);
        if (charPos.right - charPos.left > 0) {
          cursor.style.width = charPos.right - charPos.left + "px";
        }
      }
      if (pos.other) {
        var otherCursor = output.appendChild(elt("div", "\xA0", "CodeMirror-cursor CodeMirror-secondarycursor"));
        otherCursor.style.display = "";
        otherCursor.style.left = pos.other.left + "px";
        otherCursor.style.top = pos.other.top + "px";
        otherCursor.style.height = (pos.other.bottom - pos.other.top) * 0.85 + "px";
      }
    }
    function cmpCoords(a, b) {
      return a.top - b.top || a.left - b.left;
    }
    function drawSelectionRange(cm2, range2, output) {
      var display = cm2.display, doc = cm2.doc;
      var fragment = document.createDocumentFragment();
      var padding = paddingH(cm2.display), leftSide = padding.left;
      var rightSide = Math.max(display.sizerWidth, displayWidth(cm2) - display.sizer.offsetLeft) - padding.right;
      var docLTR = doc.direction == "ltr";
      function add(left, top, width, bottom) {
        if (top < 0) {
          top = 0;
        }
        top = Math.round(top);
        bottom = Math.round(bottom);
        fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left + "px;\n                             top: " + top + "px; width: " + (width == null ? rightSide - left : width) + "px;\n                             height: " + (bottom - top) + "px"));
      }
      function drawForLine(line, fromArg, toArg) {
        var lineObj = getLine(doc, line);
        var lineLen = lineObj.text.length;
        var start, end;
        function coords(ch, bias) {
          return charCoords(cm2, Pos(line, ch), "div", lineObj, bias);
        }
        function wrapX(pos, dir, side) {
          var extent = wrappedLineExtentChar(cm2, lineObj, null, pos);
          var prop2 = dir == "ltr" == (side == "after") ? "left" : "right";
          var ch = side == "after" ? extent.begin : extent.end - (/\s/.test(lineObj.text.charAt(extent.end - 1)) ? 2 : 1);
          return coords(ch, prop2)[prop2];
        }
        var order = getOrder(lineObj, doc.direction);
        iterateBidiSections(order, fromArg || 0, toArg == null ? lineLen : toArg, function(from, to, dir, i2) {
          var ltr = dir == "ltr";
          var fromPos = coords(from, ltr ? "left" : "right");
          var toPos = coords(to - 1, ltr ? "right" : "left");
          var openStart = fromArg == null && from == 0, openEnd = toArg == null && to == lineLen;
          var first = i2 == 0, last = !order || i2 == order.length - 1;
          if (toPos.top - fromPos.top <= 3) {
            var openLeft = (docLTR ? openStart : openEnd) && first;
            var openRight = (docLTR ? openEnd : openStart) && last;
            var left = openLeft ? leftSide : (ltr ? fromPos : toPos).left;
            var right = openRight ? rightSide : (ltr ? toPos : fromPos).right;
            add(left, fromPos.top, right - left, fromPos.bottom);
          } else {
            var topLeft, topRight, botLeft, botRight;
            if (ltr) {
              topLeft = docLTR && openStart && first ? leftSide : fromPos.left;
              topRight = docLTR ? rightSide : wrapX(from, dir, "before");
              botLeft = docLTR ? leftSide : wrapX(to, dir, "after");
              botRight = docLTR && openEnd && last ? rightSide : toPos.right;
            } else {
              topLeft = !docLTR ? leftSide : wrapX(from, dir, "before");
              topRight = !docLTR && openStart && first ? rightSide : fromPos.right;
              botLeft = !docLTR && openEnd && last ? leftSide : toPos.left;
              botRight = !docLTR ? rightSide : wrapX(to, dir, "after");
            }
            add(topLeft, fromPos.top, topRight - topLeft, fromPos.bottom);
            if (fromPos.bottom < toPos.top) {
              add(leftSide, fromPos.bottom, null, toPos.top);
            }
            add(botLeft, toPos.top, botRight - botLeft, toPos.bottom);
          }
          if (!start || cmpCoords(fromPos, start) < 0) {
            start = fromPos;
          }
          if (cmpCoords(toPos, start) < 0) {
            start = toPos;
          }
          if (!end || cmpCoords(fromPos, end) < 0) {
            end = fromPos;
          }
          if (cmpCoords(toPos, end) < 0) {
            end = toPos;
          }
        });
        return { start, end };
      }
      var sFrom = range2.from(), sTo = range2.to();
      if (sFrom.line == sTo.line) {
        drawForLine(sFrom.line, sFrom.ch, sTo.ch);
      } else {
        var fromLine = getLine(doc, sFrom.line), toLine = getLine(doc, sTo.line);
        var singleVLine = visualLine(fromLine) == visualLine(toLine);
        var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
        var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
        if (singleVLine) {
          if (leftEnd.top < rightStart.top - 2) {
            add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
            add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
          } else {
            add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
          }
        }
        if (leftEnd.bottom < rightStart.top) {
          add(leftSide, leftEnd.bottom, null, rightStart.top);
        }
      }
      output.appendChild(fragment);
    }
    function restartBlink(cm2) {
      if (!cm2.state.focused) {
        return;
      }
      var display = cm2.display;
      clearInterval(display.blinker);
      var on2 = true;
      display.cursorDiv.style.visibility = "";
      if (cm2.options.cursorBlinkRate > 0) {
        display.blinker = setInterval(function() {
          if (!cm2.hasFocus()) {
            onBlur(cm2);
          }
          display.cursorDiv.style.visibility = (on2 = !on2) ? "" : "hidden";
        }, cm2.options.cursorBlinkRate);
      } else if (cm2.options.cursorBlinkRate < 0) {
        display.cursorDiv.style.visibility = "hidden";
      }
    }
    function ensureFocus(cm2) {
      if (!cm2.hasFocus()) {
        cm2.display.input.focus();
        if (!cm2.state.focused) {
          onFocus(cm2);
        }
      }
    }
    function delayBlurEvent(cm2) {
      cm2.state.delayingBlurEvent = true;
      setTimeout(function() {
        if (cm2.state.delayingBlurEvent) {
          cm2.state.delayingBlurEvent = false;
          if (cm2.state.focused) {
            onBlur(cm2);
          }
        }
      }, 100);
    }
    function onFocus(cm2, e) {
      if (cm2.state.delayingBlurEvent && !cm2.state.draggingText) {
        cm2.state.delayingBlurEvent = false;
      }
      if (cm2.options.readOnly == "nocursor") {
        return;
      }
      if (!cm2.state.focused) {
        signal(cm2, "focus", cm2, e);
        cm2.state.focused = true;
        addClass(cm2.display.wrapper, "CodeMirror-focused");
        if (!cm2.curOp && cm2.display.selForContextMenu != cm2.doc.sel) {
          cm2.display.input.reset();
          if (webkit) {
            setTimeout(function() {
              return cm2.display.input.reset(true);
            }, 20);
          }
        }
        cm2.display.input.receivedFocus();
      }
      restartBlink(cm2);
    }
    function onBlur(cm2, e) {
      if (cm2.state.delayingBlurEvent) {
        return;
      }
      if (cm2.state.focused) {
        signal(cm2, "blur", cm2, e);
        cm2.state.focused = false;
        rmClass(cm2.display.wrapper, "CodeMirror-focused");
      }
      clearInterval(cm2.display.blinker);
      setTimeout(function() {
        if (!cm2.state.focused) {
          cm2.display.shift = false;
        }
      }, 150);
    }
    function updateHeightsInViewport(cm2) {
      var display = cm2.display;
      var prevBottom = display.lineDiv.offsetTop;
      var viewTop = Math.max(0, display.scroller.getBoundingClientRect().top);
      var oldHeight = display.lineDiv.getBoundingClientRect().top;
      var mustScroll = 0;
      for (var i2 = 0; i2 < display.view.length; i2++) {
        var cur = display.view[i2], wrapping = cm2.options.lineWrapping;
        var height = void 0, width = 0;
        if (cur.hidden) {
          continue;
        }
        oldHeight += cur.line.height;
        if (ie && ie_version < 8) {
          var bot = cur.node.offsetTop + cur.node.offsetHeight;
          height = bot - prevBottom;
          prevBottom = bot;
        } else {
          var box = cur.node.getBoundingClientRect();
          height = box.bottom - box.top;
          if (!wrapping && cur.text.firstChild) {
            width = cur.text.firstChild.getBoundingClientRect().right - box.left - 1;
          }
        }
        var diff = cur.line.height - height;
        if (diff > 5e-3 || diff < -5e-3) {
          if (oldHeight < viewTop) {
            mustScroll -= diff;
          }
          updateLineHeight(cur.line, height);
          updateWidgetHeight(cur.line);
          if (cur.rest) {
            for (var j = 0; j < cur.rest.length; j++) {
              updateWidgetHeight(cur.rest[j]);
            }
          }
        }
        if (width > cm2.display.sizerWidth) {
          var chWidth = Math.ceil(width / charWidth(cm2.display));
          if (chWidth > cm2.display.maxLineLength) {
            cm2.display.maxLineLength = chWidth;
            cm2.display.maxLine = cur.line;
            cm2.display.maxLineChanged = true;
          }
        }
      }
      if (Math.abs(mustScroll) > 2) {
        display.scroller.scrollTop += mustScroll;
      }
    }
    function updateWidgetHeight(line) {
      if (line.widgets) {
        for (var i2 = 0; i2 < line.widgets.length; ++i2) {
          var w = line.widgets[i2], parent = w.node.parentNode;
          if (parent) {
            w.height = parent.offsetHeight;
          }
        }
      }
    }
    function visibleLines(display, doc, viewport) {
      var top = viewport && viewport.top != null ? Math.max(0, viewport.top) : display.scroller.scrollTop;
      top = Math.floor(top - paddingTop(display));
      var bottom = viewport && viewport.bottom != null ? viewport.bottom : top + display.wrapper.clientHeight;
      var from = lineAtHeight(doc, top), to = lineAtHeight(doc, bottom);
      if (viewport && viewport.ensure) {
        var ensureFrom = viewport.ensure.from.line, ensureTo = viewport.ensure.to.line;
        if (ensureFrom < from) {
          from = ensureFrom;
          to = lineAtHeight(doc, heightAtLine(getLine(doc, ensureFrom)) + display.wrapper.clientHeight);
        } else if (Math.min(ensureTo, doc.lastLine()) >= to) {
          from = lineAtHeight(doc, heightAtLine(getLine(doc, ensureTo)) - display.wrapper.clientHeight);
          to = ensureTo;
        }
      }
      return { from, to: Math.max(to, from + 1) };
    }
    function maybeScrollWindow(cm2, rect) {
      if (signalDOMEvent(cm2, "scrollCursorIntoView")) {
        return;
      }
      var display = cm2.display, box = display.sizer.getBoundingClientRect(), doScroll = null;
      if (rect.top + box.top < 0) {
        doScroll = true;
      } else if (rect.bottom + box.top > (window.innerHeight || document.documentElement.clientHeight)) {
        doScroll = false;
      }
      if (doScroll != null && !phantom) {
        var scrollNode = elt("div", "\u200B", null, "position: absolute;\n                         top: " + (rect.top - display.viewOffset - paddingTop(cm2.display)) + "px;\n                         height: " + (rect.bottom - rect.top + scrollGap(cm2) + display.barHeight) + "px;\n                         left: " + rect.left + "px; width: " + Math.max(2, rect.right - rect.left) + "px;");
        cm2.display.lineSpace.appendChild(scrollNode);
        scrollNode.scrollIntoView(doScroll);
        cm2.display.lineSpace.removeChild(scrollNode);
      }
    }
    function scrollPosIntoView(cm2, pos, end, margin) {
      if (margin == null) {
        margin = 0;
      }
      var rect;
      if (!cm2.options.lineWrapping && pos == end) {
        end = pos.sticky == "before" ? Pos(pos.line, pos.ch + 1, "before") : pos;
        pos = pos.ch ? Pos(pos.line, pos.sticky == "before" ? pos.ch - 1 : pos.ch, "after") : pos;
      }
      for (var limit = 0; limit < 5; limit++) {
        var changed = false;
        var coords = cursorCoords(cm2, pos);
        var endCoords = !end || end == pos ? coords : cursorCoords(cm2, end);
        rect = {
          left: Math.min(coords.left, endCoords.left),
          top: Math.min(coords.top, endCoords.top) - margin,
          right: Math.max(coords.left, endCoords.left),
          bottom: Math.max(coords.bottom, endCoords.bottom) + margin
        };
        var scrollPos = calculateScrollPos(cm2, rect);
        var startTop = cm2.doc.scrollTop, startLeft = cm2.doc.scrollLeft;
        if (scrollPos.scrollTop != null) {
          updateScrollTop(cm2, scrollPos.scrollTop);
          if (Math.abs(cm2.doc.scrollTop - startTop) > 1) {
            changed = true;
          }
        }
        if (scrollPos.scrollLeft != null) {
          setScrollLeft(cm2, scrollPos.scrollLeft);
          if (Math.abs(cm2.doc.scrollLeft - startLeft) > 1) {
            changed = true;
          }
        }
        if (!changed) {
          break;
        }
      }
      return rect;
    }
    function scrollIntoView(cm2, rect) {
      var scrollPos = calculateScrollPos(cm2, rect);
      if (scrollPos.scrollTop != null) {
        updateScrollTop(cm2, scrollPos.scrollTop);
      }
      if (scrollPos.scrollLeft != null) {
        setScrollLeft(cm2, scrollPos.scrollLeft);
      }
    }
    function calculateScrollPos(cm2, rect) {
      var display = cm2.display, snapMargin = textHeight(cm2.display);
      if (rect.top < 0) {
        rect.top = 0;
      }
      var screentop = cm2.curOp && cm2.curOp.scrollTop != null ? cm2.curOp.scrollTop : display.scroller.scrollTop;
      var screen2 = displayHeight(cm2), result = {};
      if (rect.bottom - rect.top > screen2) {
        rect.bottom = rect.top + screen2;
      }
      var docBottom = cm2.doc.height + paddingVert(display);
      var atTop = rect.top < snapMargin, atBottom = rect.bottom > docBottom - snapMargin;
      if (rect.top < screentop) {
        result.scrollTop = atTop ? 0 : rect.top;
      } else if (rect.bottom > screentop + screen2) {
        var newTop = Math.min(rect.top, (atBottom ? docBottom : rect.bottom) - screen2);
        if (newTop != screentop) {
          result.scrollTop = newTop;
        }
      }
      var gutterSpace = cm2.options.fixedGutter ? 0 : display.gutters.offsetWidth;
      var screenleft = cm2.curOp && cm2.curOp.scrollLeft != null ? cm2.curOp.scrollLeft : display.scroller.scrollLeft - gutterSpace;
      var screenw = displayWidth(cm2) - display.gutters.offsetWidth;
      var tooWide = rect.right - rect.left > screenw;
      if (tooWide) {
        rect.right = rect.left + screenw;
      }
      if (rect.left < 10) {
        result.scrollLeft = 0;
      } else if (rect.left < screenleft) {
        result.scrollLeft = Math.max(0, rect.left + gutterSpace - (tooWide ? 0 : 10));
      } else if (rect.right > screenw + screenleft - 3) {
        result.scrollLeft = rect.right + (tooWide ? 0 : 10) - screenw;
      }
      return result;
    }
    function addToScrollTop(cm2, top) {
      if (top == null) {
        return;
      }
      resolveScrollToPos(cm2);
      cm2.curOp.scrollTop = (cm2.curOp.scrollTop == null ? cm2.doc.scrollTop : cm2.curOp.scrollTop) + top;
    }
    function ensureCursorVisible(cm2) {
      resolveScrollToPos(cm2);
      var cur = cm2.getCursor();
      cm2.curOp.scrollToPos = { from: cur, to: cur, margin: cm2.options.cursorScrollMargin };
    }
    function scrollToCoords(cm2, x, y) {
      if (x != null || y != null) {
        resolveScrollToPos(cm2);
      }
      if (x != null) {
        cm2.curOp.scrollLeft = x;
      }
      if (y != null) {
        cm2.curOp.scrollTop = y;
      }
    }
    function scrollToRange(cm2, range2) {
      resolveScrollToPos(cm2);
      cm2.curOp.scrollToPos = range2;
    }
    function resolveScrollToPos(cm2) {
      var range2 = cm2.curOp.scrollToPos;
      if (range2) {
        cm2.curOp.scrollToPos = null;
        var from = estimateCoords(cm2, range2.from), to = estimateCoords(cm2, range2.to);
        scrollToCoordsRange(cm2, from, to, range2.margin);
      }
    }
    function scrollToCoordsRange(cm2, from, to, margin) {
      var sPos = calculateScrollPos(cm2, {
        left: Math.min(from.left, to.left),
        top: Math.min(from.top, to.top) - margin,
        right: Math.max(from.right, to.right),
        bottom: Math.max(from.bottom, to.bottom) + margin
      });
      scrollToCoords(cm2, sPos.scrollLeft, sPos.scrollTop);
    }
    function updateScrollTop(cm2, val) {
      if (Math.abs(cm2.doc.scrollTop - val) < 2) {
        return;
      }
      if (!gecko) {
        updateDisplaySimple(cm2, { top: val });
      }
      setScrollTop(cm2, val, true);
      if (gecko) {
        updateDisplaySimple(cm2);
      }
      startWorker(cm2, 100);
    }
    function setScrollTop(cm2, val, forceScroll) {
      val = Math.max(0, Math.min(cm2.display.scroller.scrollHeight - cm2.display.scroller.clientHeight, val));
      if (cm2.display.scroller.scrollTop == val && !forceScroll) {
        return;
      }
      cm2.doc.scrollTop = val;
      cm2.display.scrollbars.setScrollTop(val);
      if (cm2.display.scroller.scrollTop != val) {
        cm2.display.scroller.scrollTop = val;
      }
    }
    function setScrollLeft(cm2, val, isScroller, forceScroll) {
      val = Math.max(0, Math.min(val, cm2.display.scroller.scrollWidth - cm2.display.scroller.clientWidth));
      if ((isScroller ? val == cm2.doc.scrollLeft : Math.abs(cm2.doc.scrollLeft - val) < 2) && !forceScroll) {
        return;
      }
      cm2.doc.scrollLeft = val;
      alignHorizontally(cm2);
      if (cm2.display.scroller.scrollLeft != val) {
        cm2.display.scroller.scrollLeft = val;
      }
      cm2.display.scrollbars.setScrollLeft(val);
    }
    function measureForScrollbars(cm2) {
      var d = cm2.display, gutterW = d.gutters.offsetWidth;
      var docH = Math.round(cm2.doc.height + paddingVert(cm2.display));
      return {
        clientHeight: d.scroller.clientHeight,
        viewHeight: d.wrapper.clientHeight,
        scrollWidth: d.scroller.scrollWidth,
        clientWidth: d.scroller.clientWidth,
        viewWidth: d.wrapper.clientWidth,
        barLeft: cm2.options.fixedGutter ? gutterW : 0,
        docHeight: docH,
        scrollHeight: docH + scrollGap(cm2) + d.barHeight,
        nativeBarWidth: d.nativeBarWidth,
        gutterWidth: gutterW
      };
    }
    var NativeScrollbars = function(place, scroll, cm2) {
      this.cm = cm2;
      var vert = this.vert = elt("div", [elt("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
      var horiz = this.horiz = elt("div", [elt("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
      vert.tabIndex = horiz.tabIndex = -1;
      place(vert);
      place(horiz);
      on(vert, "scroll", function() {
        if (vert.clientHeight) {
          scroll(vert.scrollTop, "vertical");
        }
      });
      on(horiz, "scroll", function() {
        if (horiz.clientWidth) {
          scroll(horiz.scrollLeft, "horizontal");
        }
      });
      this.checkedZeroWidth = false;
      if (ie && ie_version < 8) {
        this.horiz.style.minHeight = this.vert.style.minWidth = "18px";
      }
    };
    NativeScrollbars.prototype.update = function(measure) {
      var needsH = measure.scrollWidth > measure.clientWidth + 1;
      var needsV = measure.scrollHeight > measure.clientHeight + 1;
      var sWidth = measure.nativeBarWidth;
      if (needsV) {
        this.vert.style.display = "block";
        this.vert.style.bottom = needsH ? sWidth + "px" : "0";
        var totalHeight = measure.viewHeight - (needsH ? sWidth : 0);
        this.vert.firstChild.style.height = Math.max(0, measure.scrollHeight - measure.clientHeight + totalHeight) + "px";
      } else {
        this.vert.style.display = "";
        this.vert.firstChild.style.height = "0";
      }
      if (needsH) {
        this.horiz.style.display = "block";
        this.horiz.style.right = needsV ? sWidth + "px" : "0";
        this.horiz.style.left = measure.barLeft + "px";
        var totalWidth = measure.viewWidth - measure.barLeft - (needsV ? sWidth : 0);
        this.horiz.firstChild.style.width = Math.max(0, measure.scrollWidth - measure.clientWidth + totalWidth) + "px";
      } else {
        this.horiz.style.display = "";
        this.horiz.firstChild.style.width = "0";
      }
      if (!this.checkedZeroWidth && measure.clientHeight > 0) {
        if (sWidth == 0) {
          this.zeroWidthHack();
        }
        this.checkedZeroWidth = true;
      }
      return { right: needsV ? sWidth : 0, bottom: needsH ? sWidth : 0 };
    };
    NativeScrollbars.prototype.setScrollLeft = function(pos) {
      if (this.horiz.scrollLeft != pos) {
        this.horiz.scrollLeft = pos;
      }
      if (this.disableHoriz) {
        this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
      }
    };
    NativeScrollbars.prototype.setScrollTop = function(pos) {
      if (this.vert.scrollTop != pos) {
        this.vert.scrollTop = pos;
      }
      if (this.disableVert) {
        this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
      }
    };
    NativeScrollbars.prototype.zeroWidthHack = function() {
      var w = mac && !mac_geMountainLion ? "12px" : "18px";
      this.horiz.style.height = this.vert.style.width = w;
      this.horiz.style.pointerEvents = this.vert.style.pointerEvents = "none";
      this.disableHoriz = new Delayed();
      this.disableVert = new Delayed();
    };
    NativeScrollbars.prototype.enableZeroWidthBar = function(bar, delay, type) {
      bar.style.pointerEvents = "auto";
      function maybeDisable() {
        var box = bar.getBoundingClientRect();
        var elt2 = type == "vert" ? document.elementFromPoint(box.right - 1, (box.top + box.bottom) / 2) : document.elementFromPoint((box.right + box.left) / 2, box.bottom - 1);
        if (elt2 != bar) {
          bar.style.pointerEvents = "none";
        } else {
          delay.set(1e3, maybeDisable);
        }
      }
      delay.set(1e3, maybeDisable);
    };
    NativeScrollbars.prototype.clear = function() {
      var parent = this.horiz.parentNode;
      parent.removeChild(this.horiz);
      parent.removeChild(this.vert);
    };
    var NullScrollbars = function() {
    };
    NullScrollbars.prototype.update = function() {
      return { bottom: 0, right: 0 };
    };
    NullScrollbars.prototype.setScrollLeft = function() {
    };
    NullScrollbars.prototype.setScrollTop = function() {
    };
    NullScrollbars.prototype.clear = function() {
    };
    function updateScrollbars(cm2, measure) {
      if (!measure) {
        measure = measureForScrollbars(cm2);
      }
      var startWidth = cm2.display.barWidth, startHeight = cm2.display.barHeight;
      updateScrollbarsInner(cm2, measure);
      for (var i2 = 0; i2 < 4 && startWidth != cm2.display.barWidth || startHeight != cm2.display.barHeight; i2++) {
        if (startWidth != cm2.display.barWidth && cm2.options.lineWrapping) {
          updateHeightsInViewport(cm2);
        }
        updateScrollbarsInner(cm2, measureForScrollbars(cm2));
        startWidth = cm2.display.barWidth;
        startHeight = cm2.display.barHeight;
      }
    }
    function updateScrollbarsInner(cm2, measure) {
      var d = cm2.display;
      var sizes = d.scrollbars.update(measure);
      d.sizer.style.paddingRight = (d.barWidth = sizes.right) + "px";
      d.sizer.style.paddingBottom = (d.barHeight = sizes.bottom) + "px";
      d.heightForcer.style.borderBottom = sizes.bottom + "px solid transparent";
      if (sizes.right && sizes.bottom) {
        d.scrollbarFiller.style.display = "block";
        d.scrollbarFiller.style.height = sizes.bottom + "px";
        d.scrollbarFiller.style.width = sizes.right + "px";
      } else {
        d.scrollbarFiller.style.display = "";
      }
      if (sizes.bottom && cm2.options.coverGutterNextToScrollbar && cm2.options.fixedGutter) {
        d.gutterFiller.style.display = "block";
        d.gutterFiller.style.height = sizes.bottom + "px";
        d.gutterFiller.style.width = measure.gutterWidth + "px";
      } else {
        d.gutterFiller.style.display = "";
      }
    }
    var scrollbarModel = { "native": NativeScrollbars, "null": NullScrollbars };
    function initScrollbars(cm2) {
      if (cm2.display.scrollbars) {
        cm2.display.scrollbars.clear();
        if (cm2.display.scrollbars.addClass) {
          rmClass(cm2.display.wrapper, cm2.display.scrollbars.addClass);
        }
      }
      cm2.display.scrollbars = new scrollbarModel[cm2.options.scrollbarStyle](function(node) {
        cm2.display.wrapper.insertBefore(node, cm2.display.scrollbarFiller);
        on(node, "mousedown", function() {
          if (cm2.state.focused) {
            setTimeout(function() {
              return cm2.display.input.focus();
            }, 0);
          }
        });
        node.setAttribute("cm-not-content", "true");
      }, function(pos, axis) {
        if (axis == "horizontal") {
          setScrollLeft(cm2, pos);
        } else {
          updateScrollTop(cm2, pos);
        }
      }, cm2);
      if (cm2.display.scrollbars.addClass) {
        addClass(cm2.display.wrapper, cm2.display.scrollbars.addClass);
      }
    }
    var nextOpId = 0;
    function startOperation(cm2) {
      cm2.curOp = {
        cm: cm2,
        viewChanged: false,
        startHeight: cm2.doc.height,
        forceUpdate: false,
        updateInput: 0,
        typing: false,
        changeObjs: null,
        cursorActivityHandlers: null,
        cursorActivityCalled: 0,
        selectionChanged: false,
        updateMaxLine: false,
        scrollLeft: null,
        scrollTop: null,
        scrollToPos: null,
        focus: false,
        id: ++nextOpId,
        markArrays: null
      };
      pushOperation(cm2.curOp);
    }
    function endOperation(cm2) {
      var op = cm2.curOp;
      if (op) {
        finishOperation(op, function(group) {
          for (var i2 = 0; i2 < group.ops.length; i2++) {
            group.ops[i2].cm.curOp = null;
          }
          endOperations(group);
        });
      }
    }
    function endOperations(group) {
      var ops = group.ops;
      for (var i2 = 0; i2 < ops.length; i2++) {
        endOperation_R1(ops[i2]);
      }
      for (var i$12 = 0; i$12 < ops.length; i$12++) {
        endOperation_W1(ops[i$12]);
      }
      for (var i$22 = 0; i$22 < ops.length; i$22++) {
        endOperation_R2(ops[i$22]);
      }
      for (var i$3 = 0; i$3 < ops.length; i$3++) {
        endOperation_W2(ops[i$3]);
      }
      for (var i$4 = 0; i$4 < ops.length; i$4++) {
        endOperation_finish(ops[i$4]);
      }
    }
    function endOperation_R1(op) {
      var cm2 = op.cm, display = cm2.display;
      maybeClipScrollbars(cm2);
      if (op.updateMaxLine) {
        findMaxLine(cm2);
      }
      op.mustUpdate = op.viewChanged || op.forceUpdate || op.scrollTop != null || op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom || op.scrollToPos.to.line >= display.viewTo) || display.maxLineChanged && cm2.options.lineWrapping;
      op.update = op.mustUpdate && new DisplayUpdate(cm2, op.mustUpdate && { top: op.scrollTop, ensure: op.scrollToPos }, op.forceUpdate);
    }
    function endOperation_W1(op) {
      op.updatedDisplay = op.mustUpdate && updateDisplayIfNeeded(op.cm, op.update);
    }
    function endOperation_R2(op) {
      var cm2 = op.cm, display = cm2.display;
      if (op.updatedDisplay) {
        updateHeightsInViewport(cm2);
      }
      op.barMeasure = measureForScrollbars(cm2);
      if (display.maxLineChanged && !cm2.options.lineWrapping) {
        op.adjustWidthTo = measureChar(cm2, display.maxLine, display.maxLine.text.length).left + 3;
        cm2.display.sizerWidth = op.adjustWidthTo;
        op.barMeasure.scrollWidth = Math.max(display.scroller.clientWidth, display.sizer.offsetLeft + op.adjustWidthTo + scrollGap(cm2) + cm2.display.barWidth);
        op.maxScrollLeft = Math.max(0, display.sizer.offsetLeft + op.adjustWidthTo - displayWidth(cm2));
      }
      if (op.updatedDisplay || op.selectionChanged) {
        op.preparedSelection = display.input.prepareSelection();
      }
    }
    function endOperation_W2(op) {
      var cm2 = op.cm;
      if (op.adjustWidthTo != null) {
        cm2.display.sizer.style.minWidth = op.adjustWidthTo + "px";
        if (op.maxScrollLeft < cm2.doc.scrollLeft) {
          setScrollLeft(cm2, Math.min(cm2.display.scroller.scrollLeft, op.maxScrollLeft), true);
        }
        cm2.display.maxLineChanged = false;
      }
      var takeFocus = op.focus && op.focus == activeElt();
      if (op.preparedSelection) {
        cm2.display.input.showSelection(op.preparedSelection, takeFocus);
      }
      if (op.updatedDisplay || op.startHeight != cm2.doc.height) {
        updateScrollbars(cm2, op.barMeasure);
      }
      if (op.updatedDisplay) {
        setDocumentHeight(cm2, op.barMeasure);
      }
      if (op.selectionChanged) {
        restartBlink(cm2);
      }
      if (cm2.state.focused && op.updateInput) {
        cm2.display.input.reset(op.typing);
      }
      if (takeFocus) {
        ensureFocus(op.cm);
      }
    }
    function endOperation_finish(op) {
      var cm2 = op.cm, display = cm2.display, doc = cm2.doc;
      if (op.updatedDisplay) {
        postUpdateDisplay(cm2, op.update);
      }
      if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos)) {
        display.wheelStartX = display.wheelStartY = null;
      }
      if (op.scrollTop != null) {
        setScrollTop(cm2, op.scrollTop, op.forceScroll);
      }
      if (op.scrollLeft != null) {
        setScrollLeft(cm2, op.scrollLeft, true, true);
      }
      if (op.scrollToPos) {
        var rect = scrollPosIntoView(cm2, clipPos(doc, op.scrollToPos.from), clipPos(doc, op.scrollToPos.to), op.scrollToPos.margin);
        maybeScrollWindow(cm2, rect);
      }
      var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
      if (hidden) {
        for (var i2 = 0; i2 < hidden.length; ++i2) {
          if (!hidden[i2].lines.length) {
            signal(hidden[i2], "hide");
          }
        }
      }
      if (unhidden) {
        for (var i$12 = 0; i$12 < unhidden.length; ++i$12) {
          if (unhidden[i$12].lines.length) {
            signal(unhidden[i$12], "unhide");
          }
        }
      }
      if (display.wrapper.offsetHeight) {
        doc.scrollTop = cm2.display.scroller.scrollTop;
      }
      if (op.changeObjs) {
        signal(cm2, "changes", cm2, op.changeObjs);
      }
      if (op.update) {
        op.update.finish();
      }
    }
    function runInOp(cm2, f) {
      if (cm2.curOp) {
        return f();
      }
      startOperation(cm2);
      try {
        return f();
      } finally {
        endOperation(cm2);
      }
    }
    function operation(cm2, f) {
      return function() {
        if (cm2.curOp) {
          return f.apply(cm2, arguments);
        }
        startOperation(cm2);
        try {
          return f.apply(cm2, arguments);
        } finally {
          endOperation(cm2);
        }
      };
    }
    function methodOp(f) {
      return function() {
        if (this.curOp) {
          return f.apply(this, arguments);
        }
        startOperation(this);
        try {
          return f.apply(this, arguments);
        } finally {
          endOperation(this);
        }
      };
    }
    function docMethodOp(f) {
      return function() {
        var cm2 = this.cm;
        if (!cm2 || cm2.curOp) {
          return f.apply(this, arguments);
        }
        startOperation(cm2);
        try {
          return f.apply(this, arguments);
        } finally {
          endOperation(cm2);
        }
      };
    }
    function startWorker(cm2, time) {
      if (cm2.doc.highlightFrontier < cm2.display.viewTo) {
        cm2.state.highlight.set(time, bind(highlightWorker, cm2));
      }
    }
    function highlightWorker(cm2) {
      var doc = cm2.doc;
      if (doc.highlightFrontier >= cm2.display.viewTo) {
        return;
      }
      var end = +new Date() + cm2.options.workTime;
      var context = getContextBefore(cm2, doc.highlightFrontier);
      var changedLines = [];
      doc.iter(context.line, Math.min(doc.first + doc.size, cm2.display.viewTo + 500), function(line) {
        if (context.line >= cm2.display.viewFrom) {
          var oldStyles = line.styles;
          var resetState = line.text.length > cm2.options.maxHighlightLength ? copyState(doc.mode, context.state) : null;
          var highlighted = highlightLine(cm2, line, context, true);
          if (resetState) {
            context.state = resetState;
          }
          line.styles = highlighted.styles;
          var oldCls = line.styleClasses, newCls = highlighted.classes;
          if (newCls) {
            line.styleClasses = newCls;
          } else if (oldCls) {
            line.styleClasses = null;
          }
          var ischange = !oldStyles || oldStyles.length != line.styles.length || oldCls != newCls && (!oldCls || !newCls || oldCls.bgClass != newCls.bgClass || oldCls.textClass != newCls.textClass);
          for (var i2 = 0; !ischange && i2 < oldStyles.length; ++i2) {
            ischange = oldStyles[i2] != line.styles[i2];
          }
          if (ischange) {
            changedLines.push(context.line);
          }
          line.stateAfter = context.save();
          context.nextLine();
        } else {
          if (line.text.length <= cm2.options.maxHighlightLength) {
            processLine(cm2, line.text, context);
          }
          line.stateAfter = context.line % 5 == 0 ? context.save() : null;
          context.nextLine();
        }
        if (+new Date() > end) {
          startWorker(cm2, cm2.options.workDelay);
          return true;
        }
      });
      doc.highlightFrontier = context.line;
      doc.modeFrontier = Math.max(doc.modeFrontier, context.line);
      if (changedLines.length) {
        runInOp(cm2, function() {
          for (var i2 = 0; i2 < changedLines.length; i2++) {
            regLineChange(cm2, changedLines[i2], "text");
          }
        });
      }
    }
    var DisplayUpdate = function(cm2, viewport, force) {
      var display = cm2.display;
      this.viewport = viewport;
      this.visible = visibleLines(display, cm2.doc, viewport);
      this.editorIsHidden = !display.wrapper.offsetWidth;
      this.wrapperHeight = display.wrapper.clientHeight;
      this.wrapperWidth = display.wrapper.clientWidth;
      this.oldDisplayWidth = displayWidth(cm2);
      this.force = force;
      this.dims = getDimensions(cm2);
      this.events = [];
    };
    DisplayUpdate.prototype.signal = function(emitter, type) {
      if (hasHandler(emitter, type)) {
        this.events.push(arguments);
      }
    };
    DisplayUpdate.prototype.finish = function() {
      for (var i2 = 0; i2 < this.events.length; i2++) {
        signal.apply(null, this.events[i2]);
      }
    };
    function maybeClipScrollbars(cm2) {
      var display = cm2.display;
      if (!display.scrollbarsClipped && display.scroller.offsetWidth) {
        display.nativeBarWidth = display.scroller.offsetWidth - display.scroller.clientWidth;
        display.heightForcer.style.height = scrollGap(cm2) + "px";
        display.sizer.style.marginBottom = -display.nativeBarWidth + "px";
        display.sizer.style.borderRightWidth = scrollGap(cm2) + "px";
        display.scrollbarsClipped = true;
      }
    }
    function selectionSnapshot(cm2) {
      if (cm2.hasFocus()) {
        return null;
      }
      var active = activeElt();
      if (!active || !contains(cm2.display.lineDiv, active)) {
        return null;
      }
      var result = { activeElt: active };
      if (window.getSelection) {
        var sel = window.getSelection();
        if (sel.anchorNode && sel.extend && contains(cm2.display.lineDiv, sel.anchorNode)) {
          result.anchorNode = sel.anchorNode;
          result.anchorOffset = sel.anchorOffset;
          result.focusNode = sel.focusNode;
          result.focusOffset = sel.focusOffset;
        }
      }
      return result;
    }
    function restoreSelection(snapshot) {
      if (!snapshot || !snapshot.activeElt || snapshot.activeElt == activeElt()) {
        return;
      }
      snapshot.activeElt.focus();
      if (!/^(INPUT|TEXTAREA)$/.test(snapshot.activeElt.nodeName) && snapshot.anchorNode && contains(document.body, snapshot.anchorNode) && contains(document.body, snapshot.focusNode)) {
        var sel = window.getSelection(), range2 = document.createRange();
        range2.setEnd(snapshot.anchorNode, snapshot.anchorOffset);
        range2.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range2);
        sel.extend(snapshot.focusNode, snapshot.focusOffset);
      }
    }
    function updateDisplayIfNeeded(cm2, update) {
      var display = cm2.display, doc = cm2.doc;
      if (update.editorIsHidden) {
        resetView(cm2);
        return false;
      }
      if (!update.force && update.visible.from >= display.viewFrom && update.visible.to <= display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo) && display.renderedView == display.view && countDirtyView(cm2) == 0) {
        return false;
      }
      if (maybeUpdateLineNumberWidth(cm2)) {
        resetView(cm2);
        update.dims = getDimensions(cm2);
      }
      var end = doc.first + doc.size;
      var from = Math.max(update.visible.from - cm2.options.viewportMargin, doc.first);
      var to = Math.min(end, update.visible.to + cm2.options.viewportMargin);
      if (display.viewFrom < from && from - display.viewFrom < 20) {
        from = Math.max(doc.first, display.viewFrom);
      }
      if (display.viewTo > to && display.viewTo - to < 20) {
        to = Math.min(end, display.viewTo);
      }
      if (sawCollapsedSpans) {
        from = visualLineNo(cm2.doc, from);
        to = visualLineEndNo(cm2.doc, to);
      }
      var different = from != display.viewFrom || to != display.viewTo || display.lastWrapHeight != update.wrapperHeight || display.lastWrapWidth != update.wrapperWidth;
      adjustView(cm2, from, to);
      display.viewOffset = heightAtLine(getLine(cm2.doc, display.viewFrom));
      cm2.display.mover.style.top = display.viewOffset + "px";
      var toUpdate = countDirtyView(cm2);
      if (!different && toUpdate == 0 && !update.force && display.renderedView == display.view && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo)) {
        return false;
      }
      var selSnapshot = selectionSnapshot(cm2);
      if (toUpdate > 4) {
        display.lineDiv.style.display = "none";
      }
      patchDisplay(cm2, display.updateLineNumbers, update.dims);
      if (toUpdate > 4) {
        display.lineDiv.style.display = "";
      }
      display.renderedView = display.view;
      restoreSelection(selSnapshot);
      removeChildren(display.cursorDiv);
      removeChildren(display.selectionDiv);
      display.gutters.style.height = display.sizer.style.minHeight = 0;
      if (different) {
        display.lastWrapHeight = update.wrapperHeight;
        display.lastWrapWidth = update.wrapperWidth;
        startWorker(cm2, 400);
      }
      display.updateLineNumbers = null;
      return true;
    }
    function postUpdateDisplay(cm2, update) {
      var viewport = update.viewport;
      for (var first = true; ; first = false) {
        if (!first || !cm2.options.lineWrapping || update.oldDisplayWidth == displayWidth(cm2)) {
          if (viewport && viewport.top != null) {
            viewport = { top: Math.min(cm2.doc.height + paddingVert(cm2.display) - displayHeight(cm2), viewport.top) };
          }
          update.visible = visibleLines(cm2.display, cm2.doc, viewport);
          if (update.visible.from >= cm2.display.viewFrom && update.visible.to <= cm2.display.viewTo) {
            break;
          }
        } else if (first) {
          update.visible = visibleLines(cm2.display, cm2.doc, viewport);
        }
        if (!updateDisplayIfNeeded(cm2, update)) {
          break;
        }
        updateHeightsInViewport(cm2);
        var barMeasure = measureForScrollbars(cm2);
        updateSelection(cm2);
        updateScrollbars(cm2, barMeasure);
        setDocumentHeight(cm2, barMeasure);
        update.force = false;
      }
      update.signal(cm2, "update", cm2);
      if (cm2.display.viewFrom != cm2.display.reportedViewFrom || cm2.display.viewTo != cm2.display.reportedViewTo) {
        update.signal(cm2, "viewportChange", cm2, cm2.display.viewFrom, cm2.display.viewTo);
        cm2.display.reportedViewFrom = cm2.display.viewFrom;
        cm2.display.reportedViewTo = cm2.display.viewTo;
      }
    }
    function updateDisplaySimple(cm2, viewport) {
      var update = new DisplayUpdate(cm2, viewport);
      if (updateDisplayIfNeeded(cm2, update)) {
        updateHeightsInViewport(cm2);
        postUpdateDisplay(cm2, update);
        var barMeasure = measureForScrollbars(cm2);
        updateSelection(cm2);
        updateScrollbars(cm2, barMeasure);
        setDocumentHeight(cm2, barMeasure);
        update.finish();
      }
    }
    function patchDisplay(cm2, updateNumbersFrom, dims) {
      var display = cm2.display, lineNumbers = cm2.options.lineNumbers;
      var container2 = display.lineDiv, cur = container2.firstChild;
      function rm(node2) {
        var next = node2.nextSibling;
        if (webkit && mac && cm2.display.currentWheelTarget == node2) {
          node2.style.display = "none";
        } else {
          node2.parentNode.removeChild(node2);
        }
        return next;
      }
      var view = display.view, lineN = display.viewFrom;
      for (var i2 = 0; i2 < view.length; i2++) {
        var lineView = view[i2];
        if (lineView.hidden)
          ;
        else if (!lineView.node || lineView.node.parentNode != container2) {
          var node = buildLineElement(cm2, lineView, lineN, dims);
          container2.insertBefore(node, cur);
        } else {
          while (cur != lineView.node) {
            cur = rm(cur);
          }
          var updateNumber = lineNumbers && updateNumbersFrom != null && updateNumbersFrom <= lineN && lineView.lineNumber;
          if (lineView.changes) {
            if (indexOf(lineView.changes, "gutter") > -1) {
              updateNumber = false;
            }
            updateLineForChanges(cm2, lineView, lineN, dims);
          }
          if (updateNumber) {
            removeChildren(lineView.lineNumber);
            lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm2.options, lineN)));
          }
          cur = lineView.node.nextSibling;
        }
        lineN += lineView.size;
      }
      while (cur) {
        cur = rm(cur);
      }
    }
    function updateGutterSpace(display) {
      var width = display.gutters.offsetWidth;
      display.sizer.style.marginLeft = width + "px";
      signalLater(display, "gutterChanged", display);
    }
    function setDocumentHeight(cm2, measure) {
      cm2.display.sizer.style.minHeight = measure.docHeight + "px";
      cm2.display.heightForcer.style.top = measure.docHeight + "px";
      cm2.display.gutters.style.height = measure.docHeight + cm2.display.barHeight + scrollGap(cm2) + "px";
    }
    function alignHorizontally(cm2) {
      var display = cm2.display, view = display.view;
      if (!display.alignWidgets && (!display.gutters.firstChild || !cm2.options.fixedGutter)) {
        return;
      }
      var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm2.doc.scrollLeft;
      var gutterW = display.gutters.offsetWidth, left = comp + "px";
      for (var i2 = 0; i2 < view.length; i2++) {
        if (!view[i2].hidden) {
          if (cm2.options.fixedGutter) {
            if (view[i2].gutter) {
              view[i2].gutter.style.left = left;
            }
            if (view[i2].gutterBackground) {
              view[i2].gutterBackground.style.left = left;
            }
          }
          var align = view[i2].alignable;
          if (align) {
            for (var j = 0; j < align.length; j++) {
              align[j].style.left = left;
            }
          }
        }
      }
      if (cm2.options.fixedGutter) {
        display.gutters.style.left = comp + gutterW + "px";
      }
    }
    function maybeUpdateLineNumberWidth(cm2) {
      if (!cm2.options.lineNumbers) {
        return false;
      }
      var doc = cm2.doc, last = lineNumberFor(cm2.options, doc.first + doc.size - 1), display = cm2.display;
      if (last.length != display.lineNumChars) {
        var test = display.measure.appendChild(elt("div", [elt("div", last)], "CodeMirror-linenumber CodeMirror-gutter-elt"));
        var innerW = test.firstChild.offsetWidth, padding = test.offsetWidth - innerW;
        display.lineGutter.style.width = "";
        display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding) + 1;
        display.lineNumWidth = display.lineNumInnerWidth + padding;
        display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
        display.lineGutter.style.width = display.lineNumWidth + "px";
        updateGutterSpace(cm2.display);
        return true;
      }
      return false;
    }
    function getGutters(gutters, lineNumbers) {
      var result = [], sawLineNumbers = false;
      for (var i2 = 0; i2 < gutters.length; i2++) {
        var name = gutters[i2], style = null;
        if (typeof name != "string") {
          style = name.style;
          name = name.className;
        }
        if (name == "CodeMirror-linenumbers") {
          if (!lineNumbers) {
            continue;
          } else {
            sawLineNumbers = true;
          }
        }
        result.push({ className: name, style });
      }
      if (lineNumbers && !sawLineNumbers) {
        result.push({ className: "CodeMirror-linenumbers", style: null });
      }
      return result;
    }
    function renderGutters(display) {
      var gutters = display.gutters, specs = display.gutterSpecs;
      removeChildren(gutters);
      display.lineGutter = null;
      for (var i2 = 0; i2 < specs.length; ++i2) {
        var ref = specs[i2];
        var className = ref.className;
        var style = ref.style;
        var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + className));
        if (style) {
          gElt.style.cssText = style;
        }
        if (className == "CodeMirror-linenumbers") {
          display.lineGutter = gElt;
          gElt.style.width = (display.lineNumWidth || 1) + "px";
        }
      }
      gutters.style.display = specs.length ? "" : "none";
      updateGutterSpace(display);
    }
    function updateGutters(cm2) {
      renderGutters(cm2.display);
      regChange(cm2);
      alignHorizontally(cm2);
    }
    function Display(place, doc, input, options) {
      var d = this;
      this.input = input;
      d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
      d.scrollbarFiller.setAttribute("cm-not-content", "true");
      d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
      d.gutterFiller.setAttribute("cm-not-content", "true");
      d.lineDiv = eltP("div", null, "CodeMirror-code");
      d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
      d.cursorDiv = elt("div", null, "CodeMirror-cursors");
      d.measure = elt("div", null, "CodeMirror-measure");
      d.lineMeasure = elt("div", null, "CodeMirror-measure");
      d.lineSpace = eltP("div", [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv], null, "position: relative; outline: none");
      var lines = eltP("div", [d.lineSpace], "CodeMirror-lines");
      d.mover = elt("div", [lines], null, "position: relative");
      d.sizer = elt("div", [d.mover], "CodeMirror-sizer");
      d.sizerWidth = null;
      d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerGap + "px; width: 1px;");
      d.gutters = elt("div", null, "CodeMirror-gutters");
      d.lineGutter = null;
      d.scroller = elt("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
      d.scroller.setAttribute("tabIndex", "-1");
      d.wrapper = elt("div", [d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");
      d.wrapper.setAttribute("translate", "no");
      if (ie && ie_version < 8) {
        d.gutters.style.zIndex = -1;
        d.scroller.style.paddingRight = 0;
      }
      if (!webkit && !(gecko && mobile)) {
        d.scroller.draggable = true;
      }
      if (place) {
        if (place.appendChild) {
          place.appendChild(d.wrapper);
        } else {
          place(d.wrapper);
        }
      }
      d.viewFrom = d.viewTo = doc.first;
      d.reportedViewFrom = d.reportedViewTo = doc.first;
      d.view = [];
      d.renderedView = null;
      d.externalMeasured = null;
      d.viewOffset = 0;
      d.lastWrapHeight = d.lastWrapWidth = 0;
      d.updateLineNumbers = null;
      d.nativeBarWidth = d.barHeight = d.barWidth = 0;
      d.scrollbarsClipped = false;
      d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
      d.alignWidgets = false;
      d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
      d.maxLine = null;
      d.maxLineLength = 0;
      d.maxLineChanged = false;
      d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;
      d.shift = false;
      d.selForContextMenu = null;
      d.activeTouch = null;
      d.gutterSpecs = getGutters(options.gutters, options.lineNumbers);
      renderGutters(d);
      input.init(d);
    }
    var wheelSamples = 0, wheelPixelsPerUnit = null;
    if (ie) {
      wheelPixelsPerUnit = -0.53;
    } else if (gecko) {
      wheelPixelsPerUnit = 15;
    } else if (chrome) {
      wheelPixelsPerUnit = -0.7;
    } else if (safari) {
      wheelPixelsPerUnit = -1 / 3;
    }
    function wheelEventDelta(e) {
      var dx = e.wheelDeltaX, dy = e.wheelDeltaY;
      if (dx == null && e.detail && e.axis == e.HORIZONTAL_AXIS) {
        dx = e.detail;
      }
      if (dy == null && e.detail && e.axis == e.VERTICAL_AXIS) {
        dy = e.detail;
      } else if (dy == null) {
        dy = e.wheelDelta;
      }
      return { x: dx, y: dy };
    }
    function wheelEventPixels(e) {
      var delta = wheelEventDelta(e);
      delta.x *= wheelPixelsPerUnit;
      delta.y *= wheelPixelsPerUnit;
      return delta;
    }
    function onScrollWheel(cm2, e) {
      var delta = wheelEventDelta(e), dx = delta.x, dy = delta.y;
      var pixelsPerUnit = wheelPixelsPerUnit;
      if (e.deltaMode === 0) {
        dx = e.deltaX;
        dy = e.deltaY;
        pixelsPerUnit = 1;
      }
      var display = cm2.display, scroll = display.scroller;
      var canScrollX = scroll.scrollWidth > scroll.clientWidth;
      var canScrollY = scroll.scrollHeight > scroll.clientHeight;
      if (!(dx && canScrollX || dy && canScrollY)) {
        return;
      }
      if (dy && mac && webkit) {
        outer:
          for (var cur = e.target, view = display.view; cur != scroll; cur = cur.parentNode) {
            for (var i2 = 0; i2 < view.length; i2++) {
              if (view[i2].node == cur) {
                cm2.display.currentWheelTarget = cur;
                break outer;
              }
            }
          }
      }
      if (dx && !gecko && !presto && pixelsPerUnit != null) {
        if (dy && canScrollY) {
          updateScrollTop(cm2, Math.max(0, scroll.scrollTop + dy * pixelsPerUnit));
        }
        setScrollLeft(cm2, Math.max(0, scroll.scrollLeft + dx * pixelsPerUnit));
        if (!dy || dy && canScrollY) {
          e_preventDefault(e);
        }
        display.wheelStartX = null;
        return;
      }
      if (dy && pixelsPerUnit != null) {
        var pixels = dy * pixelsPerUnit;
        var top = cm2.doc.scrollTop, bot = top + display.wrapper.clientHeight;
        if (pixels < 0) {
          top = Math.max(0, top + pixels - 50);
        } else {
          bot = Math.min(cm2.doc.height, bot + pixels + 50);
        }
        updateDisplaySimple(cm2, { top, bottom: bot });
      }
      if (wheelSamples < 20 && e.deltaMode !== 0) {
        if (display.wheelStartX == null) {
          display.wheelStartX = scroll.scrollLeft;
          display.wheelStartY = scroll.scrollTop;
          display.wheelDX = dx;
          display.wheelDY = dy;
          setTimeout(function() {
            if (display.wheelStartX == null) {
              return;
            }
            var movedX = scroll.scrollLeft - display.wheelStartX;
            var movedY = scroll.scrollTop - display.wheelStartY;
            var sample = movedY && display.wheelDY && movedY / display.wheelDY || movedX && display.wheelDX && movedX / display.wheelDX;
            display.wheelStartX = display.wheelStartY = null;
            if (!sample) {
              return;
            }
            wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
            ++wheelSamples;
          }, 200);
        } else {
          display.wheelDX += dx;
          display.wheelDY += dy;
        }
      }
    }
    var Selection = function(ranges, primIndex) {
      this.ranges = ranges;
      this.primIndex = primIndex;
    };
    Selection.prototype.primary = function() {
      return this.ranges[this.primIndex];
    };
    Selection.prototype.equals = function(other) {
      if (other == this) {
        return true;
      }
      if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) {
        return false;
      }
      for (var i2 = 0; i2 < this.ranges.length; i2++) {
        var here = this.ranges[i2], there = other.ranges[i2];
        if (!equalCursorPos(here.anchor, there.anchor) || !equalCursorPos(here.head, there.head)) {
          return false;
        }
      }
      return true;
    };
    Selection.prototype.deepCopy = function() {
      var out = [];
      for (var i2 = 0; i2 < this.ranges.length; i2++) {
        out[i2] = new Range(copyPos(this.ranges[i2].anchor), copyPos(this.ranges[i2].head));
      }
      return new Selection(out, this.primIndex);
    };
    Selection.prototype.somethingSelected = function() {
      for (var i2 = 0; i2 < this.ranges.length; i2++) {
        if (!this.ranges[i2].empty()) {
          return true;
        }
      }
      return false;
    };
    Selection.prototype.contains = function(pos, end) {
      if (!end) {
        end = pos;
      }
      for (var i2 = 0; i2 < this.ranges.length; i2++) {
        var range2 = this.ranges[i2];
        if (cmp(end, range2.from()) >= 0 && cmp(pos, range2.to()) <= 0) {
          return i2;
        }
      }
      return -1;
    };
    var Range = function(anchor, head) {
      this.anchor = anchor;
      this.head = head;
    };
    Range.prototype.from = function() {
      return minPos(this.anchor, this.head);
    };
    Range.prototype.to = function() {
      return maxPos(this.anchor, this.head);
    };
    Range.prototype.empty = function() {
      return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
    };
    function normalizeSelection(cm2, ranges, primIndex) {
      var mayTouch = cm2 && cm2.options.selectionsMayTouch;
      var prim = ranges[primIndex];
      ranges.sort(function(a, b) {
        return cmp(a.from(), b.from());
      });
      primIndex = indexOf(ranges, prim);
      for (var i2 = 1; i2 < ranges.length; i2++) {
        var cur = ranges[i2], prev = ranges[i2 - 1];
        var diff = cmp(prev.to(), cur.from());
        if (mayTouch && !cur.empty() ? diff > 0 : diff >= 0) {
          var from = minPos(prev.from(), cur.from()), to = maxPos(prev.to(), cur.to());
          var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
          if (i2 <= primIndex) {
            --primIndex;
          }
          ranges.splice(--i2, 2, new Range(inv ? to : from, inv ? from : to));
        }
      }
      return new Selection(ranges, primIndex);
    }
    function simpleSelection(anchor, head) {
      return new Selection([new Range(anchor, head || anchor)], 0);
    }
    function changeEnd(change) {
      if (!change.text) {
        return change.to;
      }
      return Pos(change.from.line + change.text.length - 1, lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0));
    }
    function adjustForChange(pos, change) {
      if (cmp(pos, change.from) < 0) {
        return pos;
      }
      if (cmp(pos, change.to) <= 0) {
        return changeEnd(change);
      }
      var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1, ch = pos.ch;
      if (pos.line == change.to.line) {
        ch += changeEnd(change).ch - change.to.ch;
      }
      return Pos(line, ch);
    }
    function computeSelAfterChange(doc, change) {
      var out = [];
      for (var i2 = 0; i2 < doc.sel.ranges.length; i2++) {
        var range2 = doc.sel.ranges[i2];
        out.push(new Range(adjustForChange(range2.anchor, change), adjustForChange(range2.head, change)));
      }
      return normalizeSelection(doc.cm, out, doc.sel.primIndex);
    }
    function offsetPos(pos, old, nw) {
      if (pos.line == old.line) {
        return Pos(nw.line, pos.ch - old.ch + nw.ch);
      } else {
        return Pos(nw.line + (pos.line - old.line), pos.ch);
      }
    }
    function computeReplacedSel(doc, changes, hint) {
      var out = [];
      var oldPrev = Pos(doc.first, 0), newPrev = oldPrev;
      for (var i2 = 0; i2 < changes.length; i2++) {
        var change = changes[i2];
        var from = offsetPos(change.from, oldPrev, newPrev);
        var to = offsetPos(changeEnd(change), oldPrev, newPrev);
        oldPrev = change.to;
        newPrev = to;
        if (hint == "around") {
          var range2 = doc.sel.ranges[i2], inv = cmp(range2.head, range2.anchor) < 0;
          out[i2] = new Range(inv ? to : from, inv ? from : to);
        } else {
          out[i2] = new Range(from, from);
        }
      }
      return new Selection(out, doc.sel.primIndex);
    }
    function loadMode(cm2) {
      cm2.doc.mode = getMode(cm2.options, cm2.doc.modeOption);
      resetModeState(cm2);
    }
    function resetModeState(cm2) {
      cm2.doc.iter(function(line) {
        if (line.stateAfter) {
          line.stateAfter = null;
        }
        if (line.styles) {
          line.styles = null;
        }
      });
      cm2.doc.modeFrontier = cm2.doc.highlightFrontier = cm2.doc.first;
      startWorker(cm2, 100);
      cm2.state.modeGen++;
      if (cm2.curOp) {
        regChange(cm2);
      }
    }
    function isWholeLineUpdate(doc, change) {
      return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" && (!doc.cm || doc.cm.options.wholeLineUpdateBefore);
    }
    function updateDoc(doc, change, markedSpans, estimateHeight2) {
      function spansFor(n) {
        return markedSpans ? markedSpans[n] : null;
      }
      function update(line, text2, spans) {
        updateLine(line, text2, spans, estimateHeight2);
        signalLater(line, "change", line, change);
      }
      function linesFor(start, end) {
        var result = [];
        for (var i2 = start; i2 < end; ++i2) {
          result.push(new Line(text[i2], spansFor(i2), estimateHeight2));
        }
        return result;
      }
      var from = change.from, to = change.to, text = change.text;
      var firstLine = getLine(doc, from.line), lastLine = getLine(doc, to.line);
      var lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;
      if (change.full) {
        doc.insert(0, linesFor(0, text.length));
        doc.remove(text.length, doc.size - text.length);
      } else if (isWholeLineUpdate(doc, change)) {
        var added = linesFor(0, text.length - 1);
        update(lastLine, lastLine.text, lastSpans);
        if (nlines) {
          doc.remove(from.line, nlines);
        }
        if (added.length) {
          doc.insert(from.line, added);
        }
      } else if (firstLine == lastLine) {
        if (text.length == 1) {
          update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
        } else {
          var added$1 = linesFor(1, text.length - 1);
          added$1.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight2));
          update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
          doc.insert(from.line + 1, added$1);
        }
      } else if (text.length == 1) {
        update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
        doc.remove(from.line + 1, nlines);
      } else {
        update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
        update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
        var added$2 = linesFor(1, text.length - 1);
        if (nlines > 1) {
          doc.remove(from.line + 1, nlines - 1);
        }
        doc.insert(from.line + 1, added$2);
      }
      signalLater(doc, "change", doc, change);
    }
    function linkedDocs(doc, f, sharedHistOnly) {
      function propagate(doc2, skip, sharedHist) {
        if (doc2.linked) {
          for (var i2 = 0; i2 < doc2.linked.length; ++i2) {
            var rel = doc2.linked[i2];
            if (rel.doc == skip) {
              continue;
            }
            var shared = sharedHist && rel.sharedHist;
            if (sharedHistOnly && !shared) {
              continue;
            }
            f(rel.doc, shared);
            propagate(rel.doc, doc2, shared);
          }
        }
      }
      propagate(doc, null, true);
    }
    function attachDoc(cm2, doc) {
      if (doc.cm) {
        throw new Error("This document is already in use.");
      }
      cm2.doc = doc;
      doc.cm = cm2;
      estimateLineHeights(cm2);
      loadMode(cm2);
      setDirectionClass(cm2);
      cm2.options.direction = doc.direction;
      if (!cm2.options.lineWrapping) {
        findMaxLine(cm2);
      }
      cm2.options.mode = doc.modeOption;
      regChange(cm2);
    }
    function setDirectionClass(cm2) {
      (cm2.doc.direction == "rtl" ? addClass : rmClass)(cm2.display.lineDiv, "CodeMirror-rtl");
    }
    function directionChanged(cm2) {
      runInOp(cm2, function() {
        setDirectionClass(cm2);
        regChange(cm2);
      });
    }
    function History(prev) {
      this.done = [];
      this.undone = [];
      this.undoDepth = prev ? prev.undoDepth : Infinity;
      this.lastModTime = this.lastSelTime = 0;
      this.lastOp = this.lastSelOp = null;
      this.lastOrigin = this.lastSelOrigin = null;
      this.generation = this.maxGeneration = prev ? prev.maxGeneration : 1;
    }
    function historyChangeFromChange(doc, change) {
      var histChange = { from: copyPos(change.from), to: changeEnd(change), text: getBetween(doc, change.from, change.to) };
      attachLocalSpans(doc, histChange, change.from.line, change.to.line + 1);
      linkedDocs(doc, function(doc2) {
        return attachLocalSpans(doc2, histChange, change.from.line, change.to.line + 1);
      }, true);
      return histChange;
    }
    function clearSelectionEvents(array) {
      while (array.length) {
        var last = lst(array);
        if (last.ranges) {
          array.pop();
        } else {
          break;
        }
      }
    }
    function lastChangeEvent(hist, force) {
      if (force) {
        clearSelectionEvents(hist.done);
        return lst(hist.done);
      } else if (hist.done.length && !lst(hist.done).ranges) {
        return lst(hist.done);
      } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
        hist.done.pop();
        return lst(hist.done);
      }
    }
    function addChangeToHistory(doc, change, selAfter, opId) {
      var hist = doc.history;
      hist.undone.length = 0;
      var time = +new Date(), cur;
      var last;
      if ((hist.lastOp == opId || hist.lastOrigin == change.origin && change.origin && (change.origin.charAt(0) == "+" && hist.lastModTime > time - (doc.cm ? doc.cm.options.historyEventDelay : 500) || change.origin.charAt(0) == "*")) && (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
        last = lst(cur.changes);
        if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
          last.to = changeEnd(change);
        } else {
          cur.changes.push(historyChangeFromChange(doc, change));
        }
      } else {
        var before = lst(hist.done);
        if (!before || !before.ranges) {
          pushSelectionToHistory(doc.sel, hist.done);
        }
        cur = {
          changes: [historyChangeFromChange(doc, change)],
          generation: hist.generation
        };
        hist.done.push(cur);
        while (hist.done.length > hist.undoDepth) {
          hist.done.shift();
          if (!hist.done[0].ranges) {
            hist.done.shift();
          }
        }
      }
      hist.done.push(selAfter);
      hist.generation = ++hist.maxGeneration;
      hist.lastModTime = hist.lastSelTime = time;
      hist.lastOp = hist.lastSelOp = opId;
      hist.lastOrigin = hist.lastSelOrigin = change.origin;
      if (!last) {
        signal(doc, "historyAdded");
      }
    }
    function selectionEventCanBeMerged(doc, origin, prev, sel) {
      var ch = origin.charAt(0);
      return ch == "*" || ch == "+" && prev.ranges.length == sel.ranges.length && prev.somethingSelected() == sel.somethingSelected() && new Date() - doc.history.lastSelTime <= (doc.cm ? doc.cm.options.historyEventDelay : 500);
    }
    function addSelectionToHistory(doc, sel, opId, options) {
      var hist = doc.history, origin = options && options.origin;
      if (opId == hist.lastSelOp || origin && hist.lastSelOrigin == origin && (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin || selectionEventCanBeMerged(doc, origin, lst(hist.done), sel))) {
        hist.done[hist.done.length - 1] = sel;
      } else {
        pushSelectionToHistory(sel, hist.done);
      }
      hist.lastSelTime = +new Date();
      hist.lastSelOrigin = origin;
      hist.lastSelOp = opId;
      if (options && options.clearRedo !== false) {
        clearSelectionEvents(hist.undone);
      }
    }
    function pushSelectionToHistory(sel, dest) {
      var top = lst(dest);
      if (!(top && top.ranges && top.equals(sel))) {
        dest.push(sel);
      }
    }
    function attachLocalSpans(doc, change, from, to) {
      var existing = change["spans_" + doc.id], n = 0;
      doc.iter(Math.max(doc.first, from), Math.min(doc.first + doc.size, to), function(line) {
        if (line.markedSpans) {
          (existing || (existing = change["spans_" + doc.id] = {}))[n] = line.markedSpans;
        }
        ++n;
      });
    }
    function removeClearedSpans(spans) {
      if (!spans) {
        return null;
      }
      var out;
      for (var i2 = 0; i2 < spans.length; ++i2) {
        if (spans[i2].marker.explicitlyCleared) {
          if (!out) {
            out = spans.slice(0, i2);
          }
        } else if (out) {
          out.push(spans[i2]);
        }
      }
      return !out ? spans : out.length ? out : null;
    }
    function getOldSpans(doc, change) {
      var found = change["spans_" + doc.id];
      if (!found) {
        return null;
      }
      var nw = [];
      for (var i2 = 0; i2 < change.text.length; ++i2) {
        nw.push(removeClearedSpans(found[i2]));
      }
      return nw;
    }
    function mergeOldSpans(doc, change) {
      var old = getOldSpans(doc, change);
      var stretched = stretchSpansOverChange(doc, change);
      if (!old) {
        return stretched;
      }
      if (!stretched) {
        return old;
      }
      for (var i2 = 0; i2 < old.length; ++i2) {
        var oldCur = old[i2], stretchCur = stretched[i2];
        if (oldCur && stretchCur) {
          spans:
            for (var j = 0; j < stretchCur.length; ++j) {
              var span = stretchCur[j];
              for (var k = 0; k < oldCur.length; ++k) {
                if (oldCur[k].marker == span.marker) {
                  continue spans;
                }
              }
              oldCur.push(span);
            }
        } else if (stretchCur) {
          old[i2] = stretchCur;
        }
      }
      return old;
    }
    function copyHistoryArray(events, newGroup, instantiateSel) {
      var copy = [];
      for (var i2 = 0; i2 < events.length; ++i2) {
        var event = events[i2];
        if (event.ranges) {
          copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
          continue;
        }
        var changes = event.changes, newChanges = [];
        copy.push({ changes: newChanges });
        for (var j = 0; j < changes.length; ++j) {
          var change = changes[j], m = void 0;
          newChanges.push({ from: change.from, to: change.to, text: change.text });
          if (newGroup) {
            for (var prop2 in change) {
              if (m = prop2.match(/^spans_(\d+)$/)) {
                if (indexOf(newGroup, Number(m[1])) > -1) {
                  lst(newChanges)[prop2] = change[prop2];
                  delete change[prop2];
                }
              }
            }
          }
        }
      }
      return copy;
    }
    function extendRange(range2, head, other, extend) {
      if (extend) {
        var anchor = range2.anchor;
        if (other) {
          var posBefore = cmp(head, anchor) < 0;
          if (posBefore != cmp(other, anchor) < 0) {
            anchor = head;
            head = other;
          } else if (posBefore != cmp(head, other) < 0) {
            head = other;
          }
        }
        return new Range(anchor, head);
      } else {
        return new Range(other || head, head);
      }
    }
    function extendSelection(doc, head, other, options, extend) {
      if (extend == null) {
        extend = doc.cm && (doc.cm.display.shift || doc.extend);
      }
      setSelection(doc, new Selection([extendRange(doc.sel.primary(), head, other, extend)], 0), options);
    }
    function extendSelections(doc, heads, options) {
      var out = [];
      var extend = doc.cm && (doc.cm.display.shift || doc.extend);
      for (var i2 = 0; i2 < doc.sel.ranges.length; i2++) {
        out[i2] = extendRange(doc.sel.ranges[i2], heads[i2], null, extend);
      }
      var newSel = normalizeSelection(doc.cm, out, doc.sel.primIndex);
      setSelection(doc, newSel, options);
    }
    function replaceOneSelection(doc, i2, range2, options) {
      var ranges = doc.sel.ranges.slice(0);
      ranges[i2] = range2;
      setSelection(doc, normalizeSelection(doc.cm, ranges, doc.sel.primIndex), options);
    }
    function setSimpleSelection(doc, anchor, head, options) {
      setSelection(doc, simpleSelection(anchor, head), options);
    }
    function filterSelectionChange(doc, sel, options) {
      var obj = {
        ranges: sel.ranges,
        update: function(ranges) {
          this.ranges = [];
          for (var i2 = 0; i2 < ranges.length; i2++) {
            this.ranges[i2] = new Range(clipPos(doc, ranges[i2].anchor), clipPos(doc, ranges[i2].head));
          }
        },
        origin: options && options.origin
      };
      signal(doc, "beforeSelectionChange", doc, obj);
      if (doc.cm) {
        signal(doc.cm, "beforeSelectionChange", doc.cm, obj);
      }
      if (obj.ranges != sel.ranges) {
        return normalizeSelection(doc.cm, obj.ranges, obj.ranges.length - 1);
      } else {
        return sel;
      }
    }
    function setSelectionReplaceHistory(doc, sel, options) {
      var done = doc.history.done, last = lst(done);
      if (last && last.ranges) {
        done[done.length - 1] = sel;
        setSelectionNoUndo(doc, sel, options);
      } else {
        setSelection(doc, sel, options);
      }
    }
    function setSelection(doc, sel, options) {
      setSelectionNoUndo(doc, sel, options);
      addSelectionToHistory(doc, doc.sel, doc.cm ? doc.cm.curOp.id : NaN, options);
    }
    function setSelectionNoUndo(doc, sel, options) {
      if (hasHandler(doc, "beforeSelectionChange") || doc.cm && hasHandler(doc.cm, "beforeSelectionChange")) {
        sel = filterSelectionChange(doc, sel, options);
      }
      var bias = options && options.bias || (cmp(sel.primary().head, doc.sel.primary().head) < 0 ? -1 : 1);
      setSelectionInner(doc, skipAtomicInSelection(doc, sel, bias, true));
      if (!(options && options.scroll === false) && doc.cm && doc.cm.getOption("readOnly") != "nocursor") {
        ensureCursorVisible(doc.cm);
      }
    }
    function setSelectionInner(doc, sel) {
      if (sel.equals(doc.sel)) {
        return;
      }
      doc.sel = sel;
      if (doc.cm) {
        doc.cm.curOp.updateInput = 1;
        doc.cm.curOp.selectionChanged = true;
        signalCursorActivity(doc.cm);
      }
      signalLater(doc, "cursorActivity", doc);
    }
    function reCheckSelection(doc) {
      setSelectionInner(doc, skipAtomicInSelection(doc, doc.sel, null, false));
    }
    function skipAtomicInSelection(doc, sel, bias, mayClear) {
      var out;
      for (var i2 = 0; i2 < sel.ranges.length; i2++) {
        var range2 = sel.ranges[i2];
        var old = sel.ranges.length == doc.sel.ranges.length && doc.sel.ranges[i2];
        var newAnchor = skipAtomic(doc, range2.anchor, old && old.anchor, bias, mayClear);
        var newHead = skipAtomic(doc, range2.head, old && old.head, bias, mayClear);
        if (out || newAnchor != range2.anchor || newHead != range2.head) {
          if (!out) {
            out = sel.ranges.slice(0, i2);
          }
          out[i2] = new Range(newAnchor, newHead);
        }
      }
      return out ? normalizeSelection(doc.cm, out, sel.primIndex) : sel;
    }
    function skipAtomicInner(doc, pos, oldPos, dir, mayClear) {
      var line = getLine(doc, pos.line);
      if (line.markedSpans) {
        for (var i2 = 0; i2 < line.markedSpans.length; ++i2) {
          var sp = line.markedSpans[i2], m = sp.marker;
          var preventCursorLeft = "selectLeft" in m ? !m.selectLeft : m.inclusiveLeft;
          var preventCursorRight = "selectRight" in m ? !m.selectRight : m.inclusiveRight;
          if ((sp.from == null || (preventCursorLeft ? sp.from <= pos.ch : sp.from < pos.ch)) && (sp.to == null || (preventCursorRight ? sp.to >= pos.ch : sp.to > pos.ch))) {
            if (mayClear) {
              signal(m, "beforeCursorEnter");
              if (m.explicitlyCleared) {
                if (!line.markedSpans) {
                  break;
                } else {
                  --i2;
                  continue;
                }
              }
            }
            if (!m.atomic) {
              continue;
            }
            if (oldPos) {
              var near = m.find(dir < 0 ? 1 : -1), diff = void 0;
              if (dir < 0 ? preventCursorRight : preventCursorLeft) {
                near = movePos(doc, near, -dir, near && near.line == pos.line ? line : null);
              }
              if (near && near.line == pos.line && (diff = cmp(near, oldPos)) && (dir < 0 ? diff < 0 : diff > 0)) {
                return skipAtomicInner(doc, near, pos, dir, mayClear);
              }
            }
            var far = m.find(dir < 0 ? -1 : 1);
            if (dir < 0 ? preventCursorLeft : preventCursorRight) {
              far = movePos(doc, far, dir, far.line == pos.line ? line : null);
            }
            return far ? skipAtomicInner(doc, far, pos, dir, mayClear) : null;
          }
        }
      }
      return pos;
    }
    function skipAtomic(doc, pos, oldPos, bias, mayClear) {
      var dir = bias || 1;
      var found = skipAtomicInner(doc, pos, oldPos, dir, mayClear) || !mayClear && skipAtomicInner(doc, pos, oldPos, dir, true) || skipAtomicInner(doc, pos, oldPos, -dir, mayClear) || !mayClear && skipAtomicInner(doc, pos, oldPos, -dir, true);
      if (!found) {
        doc.cantEdit = true;
        return Pos(doc.first, 0);
      }
      return found;
    }
    function movePos(doc, pos, dir, line) {
      if (dir < 0 && pos.ch == 0) {
        if (pos.line > doc.first) {
          return clipPos(doc, Pos(pos.line - 1));
        } else {
          return null;
        }
      } else if (dir > 0 && pos.ch == (line || getLine(doc, pos.line)).text.length) {
        if (pos.line < doc.first + doc.size - 1) {
          return Pos(pos.line + 1, 0);
        } else {
          return null;
        }
      } else {
        return new Pos(pos.line, pos.ch + dir);
      }
    }
    function selectAll(cm2) {
      cm2.setSelection(Pos(cm2.firstLine(), 0), Pos(cm2.lastLine()), sel_dontScroll);
    }
    function filterChange(doc, change, update) {
      var obj = {
        canceled: false,
        from: change.from,
        to: change.to,
        text: change.text,
        origin: change.origin,
        cancel: function() {
          return obj.canceled = true;
        }
      };
      if (update) {
        obj.update = function(from, to, text, origin) {
          if (from) {
            obj.from = clipPos(doc, from);
          }
          if (to) {
            obj.to = clipPos(doc, to);
          }
          if (text) {
            obj.text = text;
          }
          if (origin !== void 0) {
            obj.origin = origin;
          }
        };
      }
      signal(doc, "beforeChange", doc, obj);
      if (doc.cm) {
        signal(doc.cm, "beforeChange", doc.cm, obj);
      }
      if (obj.canceled) {
        if (doc.cm) {
          doc.cm.curOp.updateInput = 2;
        }
        return null;
      }
      return { from: obj.from, to: obj.to, text: obj.text, origin: obj.origin };
    }
    function makeChange(doc, change, ignoreReadOnly) {
      if (doc.cm) {
        if (!doc.cm.curOp) {
          return operation(doc.cm, makeChange)(doc, change, ignoreReadOnly);
        }
        if (doc.cm.state.suppressEdits) {
          return;
        }
      }
      if (hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange")) {
        change = filterChange(doc, change, true);
        if (!change) {
          return;
        }
      }
      var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc, change.from, change.to);
      if (split) {
        for (var i2 = split.length - 1; i2 >= 0; --i2) {
          makeChangeInner(doc, { from: split[i2].from, to: split[i2].to, text: i2 ? [""] : change.text, origin: change.origin });
        }
      } else {
        makeChangeInner(doc, change);
      }
    }
    function makeChangeInner(doc, change) {
      if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0) {
        return;
      }
      var selAfter = computeSelAfterChange(doc, change);
      addChangeToHistory(doc, change, selAfter, doc.cm ? doc.cm.curOp.id : NaN);
      makeChangeSingleDoc(doc, change, selAfter, stretchSpansOverChange(doc, change));
      var rebased = [];
      linkedDocs(doc, function(doc2, sharedHist) {
        if (!sharedHist && indexOf(rebased, doc2.history) == -1) {
          rebaseHist(doc2.history, change);
          rebased.push(doc2.history);
        }
        makeChangeSingleDoc(doc2, change, null, stretchSpansOverChange(doc2, change));
      });
    }
    function makeChangeFromHistory(doc, type, allowSelectionOnly) {
      var suppress = doc.cm && doc.cm.state.suppressEdits;
      if (suppress && !allowSelectionOnly) {
        return;
      }
      var hist = doc.history, event, selAfter = doc.sel;
      var source = type == "undo" ? hist.done : hist.undone, dest = type == "undo" ? hist.undone : hist.done;
      var i2 = 0;
      for (; i2 < source.length; i2++) {
        event = source[i2];
        if (allowSelectionOnly ? event.ranges && !event.equals(doc.sel) : !event.ranges) {
          break;
        }
      }
      if (i2 == source.length) {
        return;
      }
      hist.lastOrigin = hist.lastSelOrigin = null;
      for (; ; ) {
        event = source.pop();
        if (event.ranges) {
          pushSelectionToHistory(event, dest);
          if (allowSelectionOnly && !event.equals(doc.sel)) {
            setSelection(doc, event, { clearRedo: false });
            return;
          }
          selAfter = event;
        } else if (suppress) {
          source.push(event);
          return;
        } else {
          break;
        }
      }
      var antiChanges = [];
      pushSelectionToHistory(selAfter, dest);
      dest.push({ changes: antiChanges, generation: hist.generation });
      hist.generation = event.generation || ++hist.maxGeneration;
      var filter = hasHandler(doc, "beforeChange") || doc.cm && hasHandler(doc.cm, "beforeChange");
      var loop = function(i3) {
        var change = event.changes[i3];
        change.origin = type;
        if (filter && !filterChange(doc, change, false)) {
          source.length = 0;
          return {};
        }
        antiChanges.push(historyChangeFromChange(doc, change));
        var after = i3 ? computeSelAfterChange(doc, change) : lst(source);
        makeChangeSingleDoc(doc, change, after, mergeOldSpans(doc, change));
        if (!i3 && doc.cm) {
          doc.cm.scrollIntoView({ from: change.from, to: changeEnd(change) });
        }
        var rebased = [];
        linkedDocs(doc, function(doc2, sharedHist) {
          if (!sharedHist && indexOf(rebased, doc2.history) == -1) {
            rebaseHist(doc2.history, change);
            rebased.push(doc2.history);
          }
          makeChangeSingleDoc(doc2, change, null, mergeOldSpans(doc2, change));
        });
      };
      for (var i$12 = event.changes.length - 1; i$12 >= 0; --i$12) {
        var returned = loop(i$12);
        if (returned)
          return returned.v;
      }
    }
    function shiftDoc(doc, distance) {
      if (distance == 0) {
        return;
      }
      doc.first += distance;
      doc.sel = new Selection(map(doc.sel.ranges, function(range2) {
        return new Range(Pos(range2.anchor.line + distance, range2.anchor.ch), Pos(range2.head.line + distance, range2.head.ch));
      }), doc.sel.primIndex);
      if (doc.cm) {
        regChange(doc.cm, doc.first, doc.first - distance, distance);
        for (var d = doc.cm.display, l = d.viewFrom; l < d.viewTo; l++) {
          regLineChange(doc.cm, l, "gutter");
        }
      }
    }
    function makeChangeSingleDoc(doc, change, selAfter, spans) {
      if (doc.cm && !doc.cm.curOp) {
        return operation(doc.cm, makeChangeSingleDoc)(doc, change, selAfter, spans);
      }
      if (change.to.line < doc.first) {
        shiftDoc(doc, change.text.length - 1 - (change.to.line - change.from.line));
        return;
      }
      if (change.from.line > doc.lastLine()) {
        return;
      }
      if (change.from.line < doc.first) {
        var shift = change.text.length - 1 - (doc.first - change.from.line);
        shiftDoc(doc, shift);
        change = {
          from: Pos(doc.first, 0),
          to: Pos(change.to.line + shift, change.to.ch),
          text: [lst(change.text)],
          origin: change.origin
        };
      }
      var last = doc.lastLine();
      if (change.to.line > last) {
        change = {
          from: change.from,
          to: Pos(last, getLine(doc, last).text.length),
          text: [change.text[0]],
          origin: change.origin
        };
      }
      change.removed = getBetween(doc, change.from, change.to);
      if (!selAfter) {
        selAfter = computeSelAfterChange(doc, change);
      }
      if (doc.cm) {
        makeChangeSingleDocInEditor(doc.cm, change, spans);
      } else {
        updateDoc(doc, change, spans);
      }
      setSelectionNoUndo(doc, selAfter, sel_dontScroll);
      if (doc.cantEdit && skipAtomic(doc, Pos(doc.firstLine(), 0))) {
        doc.cantEdit = false;
      }
    }
    function makeChangeSingleDocInEditor(cm2, change, spans) {
      var doc = cm2.doc, display = cm2.display, from = change.from, to = change.to;
      var recomputeMaxLength = false, checkWidthStart = from.line;
      if (!cm2.options.lineWrapping) {
        checkWidthStart = lineNo(visualLine(getLine(doc, from.line)));
        doc.iter(checkWidthStart, to.line + 1, function(line) {
          if (line == display.maxLine) {
            recomputeMaxLength = true;
            return true;
          }
        });
      }
      if (doc.sel.contains(change.from, change.to) > -1) {
        signalCursorActivity(cm2);
      }
      updateDoc(doc, change, spans, estimateHeight(cm2));
      if (!cm2.options.lineWrapping) {
        doc.iter(checkWidthStart, from.line + change.text.length, function(line) {
          var len = lineLength(line);
          if (len > display.maxLineLength) {
            display.maxLine = line;
            display.maxLineLength = len;
            display.maxLineChanged = true;
            recomputeMaxLength = false;
          }
        });
        if (recomputeMaxLength) {
          cm2.curOp.updateMaxLine = true;
        }
      }
      retreatFrontier(doc, from.line);
      startWorker(cm2, 400);
      var lendiff = change.text.length - (to.line - from.line) - 1;
      if (change.full) {
        regChange(cm2);
      } else if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm2.doc, change)) {
        regLineChange(cm2, from.line, "text");
      } else {
        regChange(cm2, from.line, to.line + 1, lendiff);
      }
      var changesHandler = hasHandler(cm2, "changes"), changeHandler = hasHandler(cm2, "change");
      if (changeHandler || changesHandler) {
        var obj = {
          from,
          to,
          text: change.text,
          removed: change.removed,
          origin: change.origin
        };
        if (changeHandler) {
          signalLater(cm2, "change", cm2, obj);
        }
        if (changesHandler) {
          (cm2.curOp.changeObjs || (cm2.curOp.changeObjs = [])).push(obj);
        }
      }
      cm2.display.selForContextMenu = null;
    }
    function replaceRange(doc, code, from, to, origin) {
      var assign;
      if (!to) {
        to = from;
      }
      if (cmp(to, from) < 0) {
        assign = [to, from], from = assign[0], to = assign[1];
      }
      if (typeof code == "string") {
        code = doc.splitLines(code);
      }
      makeChange(doc, { from, to, text: code, origin });
    }
    function rebaseHistSelSingle(pos, from, to, diff) {
      if (to < pos.line) {
        pos.line += diff;
      } else if (from < pos.line) {
        pos.line = from;
        pos.ch = 0;
      }
    }
    function rebaseHistArray(array, from, to, diff) {
      for (var i2 = 0; i2 < array.length; ++i2) {
        var sub = array[i2], ok = true;
        if (sub.ranges) {
          if (!sub.copied) {
            sub = array[i2] = sub.deepCopy();
            sub.copied = true;
          }
          for (var j = 0; j < sub.ranges.length; j++) {
            rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
            rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
          }
          continue;
        }
        for (var j$1 = 0; j$1 < sub.changes.length; ++j$1) {
          var cur = sub.changes[j$1];
          if (to < cur.from.line) {
            cur.from = Pos(cur.from.line + diff, cur.from.ch);
            cur.to = Pos(cur.to.line + diff, cur.to.ch);
          } else if (from <= cur.to.line) {
            ok = false;
            break;
          }
        }
        if (!ok) {
          array.splice(0, i2 + 1);
          i2 = 0;
        }
      }
    }
    function rebaseHist(hist, change) {
      var from = change.from.line, to = change.to.line, diff = change.text.length - (to - from) - 1;
      rebaseHistArray(hist.done, from, to, diff);
      rebaseHistArray(hist.undone, from, to, diff);
    }
    function changeLine(doc, handle, changeType, op) {
      var no = handle, line = handle;
      if (typeof handle == "number") {
        line = getLine(doc, clipLine(doc, handle));
      } else {
        no = lineNo(handle);
      }
      if (no == null) {
        return null;
      }
      if (op(line, no) && doc.cm) {
        regLineChange(doc.cm, no, changeType);
      }
      return line;
    }
    function LeafChunk(lines) {
      this.lines = lines;
      this.parent = null;
      var height = 0;
      for (var i2 = 0; i2 < lines.length; ++i2) {
        lines[i2].parent = this;
        height += lines[i2].height;
      }
      this.height = height;
    }
    LeafChunk.prototype = {
      chunkSize: function() {
        return this.lines.length;
      },
      removeInner: function(at, n) {
        for (var i2 = at, e = at + n; i2 < e; ++i2) {
          var line = this.lines[i2];
          this.height -= line.height;
          cleanUpLine(line);
          signalLater(line, "delete");
        }
        this.lines.splice(at, n);
      },
      collapse: function(lines) {
        lines.push.apply(lines, this.lines);
      },
      insertInner: function(at, lines, height) {
        this.height += height;
        this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
        for (var i2 = 0; i2 < lines.length; ++i2) {
          lines[i2].parent = this;
        }
      },
      iterN: function(at, n, op) {
        for (var e = at + n; at < e; ++at) {
          if (op(this.lines[at])) {
            return true;
          }
        }
      }
    };
    function BranchChunk(children) {
      this.children = children;
      var size = 0, height = 0;
      for (var i2 = 0; i2 < children.length; ++i2) {
        var ch = children[i2];
        size += ch.chunkSize();
        height += ch.height;
        ch.parent = this;
      }
      this.size = size;
      this.height = height;
      this.parent = null;
    }
    BranchChunk.prototype = {
      chunkSize: function() {
        return this.size;
      },
      removeInner: function(at, n) {
        this.size -= n;
        for (var i2 = 0; i2 < this.children.length; ++i2) {
          var child = this.children[i2], sz = child.chunkSize();
          if (at < sz) {
            var rm = Math.min(n, sz - at), oldHeight = child.height;
            child.removeInner(at, rm);
            this.height -= oldHeight - child.height;
            if (sz == rm) {
              this.children.splice(i2--, 1);
              child.parent = null;
            }
            if ((n -= rm) == 0) {
              break;
            }
            at = 0;
          } else {
            at -= sz;
          }
        }
        if (this.size - n < 25 && (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
          var lines = [];
          this.collapse(lines);
          this.children = [new LeafChunk(lines)];
          this.children[0].parent = this;
        }
      },
      collapse: function(lines) {
        for (var i2 = 0; i2 < this.children.length; ++i2) {
          this.children[i2].collapse(lines);
        }
      },
      insertInner: function(at, lines, height) {
        this.size += lines.length;
        this.height += height;
        for (var i2 = 0; i2 < this.children.length; ++i2) {
          var child = this.children[i2], sz = child.chunkSize();
          if (at <= sz) {
            child.insertInner(at, lines, height);
            if (child.lines && child.lines.length > 50) {
              var remaining = child.lines.length % 25 + 25;
              for (var pos = remaining; pos < child.lines.length; ) {
                var leaf = new LeafChunk(child.lines.slice(pos, pos += 25));
                child.height -= leaf.height;
                this.children.splice(++i2, 0, leaf);
                leaf.parent = this;
              }
              child.lines = child.lines.slice(0, remaining);
              this.maybeSpill();
            }
            break;
          }
          at -= sz;
        }
      },
      maybeSpill: function() {
        if (this.children.length <= 10) {
          return;
        }
        var me = this;
        do {
          var spilled = me.children.splice(me.children.length - 5, 5);
          var sibling = new BranchChunk(spilled);
          if (!me.parent) {
            var copy = new BranchChunk(me.children);
            copy.parent = me;
            me.children = [copy, sibling];
            me = copy;
          } else {
            me.size -= sibling.size;
            me.height -= sibling.height;
            var myIndex = indexOf(me.parent.children, me);
            me.parent.children.splice(myIndex + 1, 0, sibling);
          }
          sibling.parent = me.parent;
        } while (me.children.length > 10);
        me.parent.maybeSpill();
      },
      iterN: function(at, n, op) {
        for (var i2 = 0; i2 < this.children.length; ++i2) {
          var child = this.children[i2], sz = child.chunkSize();
          if (at < sz) {
            var used = Math.min(n, sz - at);
            if (child.iterN(at, used, op)) {
              return true;
            }
            if ((n -= used) == 0) {
              break;
            }
            at = 0;
          } else {
            at -= sz;
          }
        }
      }
    };
    var LineWidget = function(doc, node, options) {
      if (options) {
        for (var opt in options) {
          if (options.hasOwnProperty(opt)) {
            this[opt] = options[opt];
          }
        }
      }
      this.doc = doc;
      this.node = node;
    };
    LineWidget.prototype.clear = function() {
      var cm2 = this.doc.cm, ws = this.line.widgets, line = this.line, no = lineNo(line);
      if (no == null || !ws) {
        return;
      }
      for (var i2 = 0; i2 < ws.length; ++i2) {
        if (ws[i2] == this) {
          ws.splice(i2--, 1);
        }
      }
      if (!ws.length) {
        line.widgets = null;
      }
      var height = widgetHeight(this);
      updateLineHeight(line, Math.max(0, line.height - height));
      if (cm2) {
        runInOp(cm2, function() {
          adjustScrollWhenAboveVisible(cm2, line, -height);
          regLineChange(cm2, no, "widget");
        });
        signalLater(cm2, "lineWidgetCleared", cm2, this, no);
      }
    };
    LineWidget.prototype.changed = function() {
      var this$1$1 = this;
      var oldH = this.height, cm2 = this.doc.cm, line = this.line;
      this.height = null;
      var diff = widgetHeight(this) - oldH;
      if (!diff) {
        return;
      }
      if (!lineIsHidden(this.doc, line)) {
        updateLineHeight(line, line.height + diff);
      }
      if (cm2) {
        runInOp(cm2, function() {
          cm2.curOp.forceUpdate = true;
          adjustScrollWhenAboveVisible(cm2, line, diff);
          signalLater(cm2, "lineWidgetChanged", cm2, this$1$1, lineNo(line));
        });
      }
    };
    eventMixin(LineWidget);
    function adjustScrollWhenAboveVisible(cm2, line, diff) {
      if (heightAtLine(line) < (cm2.curOp && cm2.curOp.scrollTop || cm2.doc.scrollTop)) {
        addToScrollTop(cm2, diff);
      }
    }
    function addLineWidget(doc, handle, node, options) {
      var widget = new LineWidget(doc, node, options);
      var cm2 = doc.cm;
      if (cm2 && widget.noHScroll) {
        cm2.display.alignWidgets = true;
      }
      changeLine(doc, handle, "widget", function(line) {
        var widgets = line.widgets || (line.widgets = []);
        if (widget.insertAt == null) {
          widgets.push(widget);
        } else {
          widgets.splice(Math.min(widgets.length, Math.max(0, widget.insertAt)), 0, widget);
        }
        widget.line = line;
        if (cm2 && !lineIsHidden(doc, line)) {
          var aboveVisible = heightAtLine(line) < doc.scrollTop;
          updateLineHeight(line, line.height + widgetHeight(widget));
          if (aboveVisible) {
            addToScrollTop(cm2, widget.height);
          }
          cm2.curOp.forceUpdate = true;
        }
        return true;
      });
      if (cm2) {
        signalLater(cm2, "lineWidgetAdded", cm2, widget, typeof handle == "number" ? handle : lineNo(handle));
      }
      return widget;
    }
    var nextMarkerId = 0;
    var TextMarker = function(doc, type) {
      this.lines = [];
      this.type = type;
      this.doc = doc;
      this.id = ++nextMarkerId;
    };
    TextMarker.prototype.clear = function() {
      if (this.explicitlyCleared) {
        return;
      }
      var cm2 = this.doc.cm, withOp = cm2 && !cm2.curOp;
      if (withOp) {
        startOperation(cm2);
      }
      if (hasHandler(this, "clear")) {
        var found = this.find();
        if (found) {
          signalLater(this, "clear", found.from, found.to);
        }
      }
      var min = null, max = null;
      for (var i2 = 0; i2 < this.lines.length; ++i2) {
        var line = this.lines[i2];
        var span = getMarkedSpanFor(line.markedSpans, this);
        if (cm2 && !this.collapsed) {
          regLineChange(cm2, lineNo(line), "text");
        } else if (cm2) {
          if (span.to != null) {
            max = lineNo(line);
          }
          if (span.from != null) {
            min = lineNo(line);
          }
        }
        line.markedSpans = removeMarkedSpan(line.markedSpans, span);
        if (span.from == null && this.collapsed && !lineIsHidden(this.doc, line) && cm2) {
          updateLineHeight(line, textHeight(cm2.display));
        }
      }
      if (cm2 && this.collapsed && !cm2.options.lineWrapping) {
        for (var i$12 = 0; i$12 < this.lines.length; ++i$12) {
          var visual = visualLine(this.lines[i$12]), len = lineLength(visual);
          if (len > cm2.display.maxLineLength) {
            cm2.display.maxLine = visual;
            cm2.display.maxLineLength = len;
            cm2.display.maxLineChanged = true;
          }
        }
      }
      if (min != null && cm2 && this.collapsed) {
        regChange(cm2, min, max + 1);
      }
      this.lines.length = 0;
      this.explicitlyCleared = true;
      if (this.atomic && this.doc.cantEdit) {
        this.doc.cantEdit = false;
        if (cm2) {
          reCheckSelection(cm2.doc);
        }
      }
      if (cm2) {
        signalLater(cm2, "markerCleared", cm2, this, min, max);
      }
      if (withOp) {
        endOperation(cm2);
      }
      if (this.parent) {
        this.parent.clear();
      }
    };
    TextMarker.prototype.find = function(side, lineObj) {
      if (side == null && this.type == "bookmark") {
        side = 1;
      }
      var from, to;
      for (var i2 = 0; i2 < this.lines.length; ++i2) {
        var line = this.lines[i2];
        var span = getMarkedSpanFor(line.markedSpans, this);
        if (span.from != null) {
          from = Pos(lineObj ? line : lineNo(line), span.from);
          if (side == -1) {
            return from;
          }
        }
        if (span.to != null) {
          to = Pos(lineObj ? line : lineNo(line), span.to);
          if (side == 1) {
            return to;
          }
        }
      }
      return from && { from, to };
    };
    TextMarker.prototype.changed = function() {
      var this$1$1 = this;
      var pos = this.find(-1, true), widget = this, cm2 = this.doc.cm;
      if (!pos || !cm2) {
        return;
      }
      runInOp(cm2, function() {
        var line = pos.line, lineN = lineNo(pos.line);
        var view = findViewForLine(cm2, lineN);
        if (view) {
          clearLineMeasurementCacheFor(view);
          cm2.curOp.selectionChanged = cm2.curOp.forceUpdate = true;
        }
        cm2.curOp.updateMaxLine = true;
        if (!lineIsHidden(widget.doc, line) && widget.height != null) {
          var oldHeight = widget.height;
          widget.height = null;
          var dHeight = widgetHeight(widget) - oldHeight;
          if (dHeight) {
            updateLineHeight(line, line.height + dHeight);
          }
        }
        signalLater(cm2, "markerChanged", cm2, this$1$1);
      });
    };
    TextMarker.prototype.attachLine = function(line) {
      if (!this.lines.length && this.doc.cm) {
        var op = this.doc.cm.curOp;
        if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1) {
          (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this);
        }
      }
      this.lines.push(line);
    };
    TextMarker.prototype.detachLine = function(line) {
      this.lines.splice(indexOf(this.lines, line), 1);
      if (!this.lines.length && this.doc.cm) {
        var op = this.doc.cm.curOp;
        (op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
      }
    };
    eventMixin(TextMarker);
    function markText(doc, from, to, options, type) {
      if (options && options.shared) {
        return markTextShared(doc, from, to, options, type);
      }
      if (doc.cm && !doc.cm.curOp) {
        return operation(doc.cm, markText)(doc, from, to, options, type);
      }
      var marker = new TextMarker(doc, type), diff = cmp(from, to);
      if (options) {
        copyObj(options, marker, false);
      }
      if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false) {
        return marker;
      }
      if (marker.replacedWith) {
        marker.collapsed = true;
        marker.widgetNode = eltP("span", [marker.replacedWith], "CodeMirror-widget");
        if (!options.handleMouseEvents) {
          marker.widgetNode.setAttribute("cm-ignore-events", "true");
        }
        if (options.insertLeft) {
          marker.widgetNode.insertLeft = true;
        }
      }
      if (marker.collapsed) {
        if (conflictingCollapsedRange(doc, from.line, from, to, marker) || from.line != to.line && conflictingCollapsedRange(doc, to.line, from, to, marker)) {
          throw new Error("Inserting collapsed marker partially overlapping an existing one");
        }
        seeCollapsedSpans();
      }
      if (marker.addToHistory) {
        addChangeToHistory(doc, { from, to, origin: "markText" }, doc.sel, NaN);
      }
      var curLine = from.line, cm2 = doc.cm, updateMaxLine;
      doc.iter(curLine, to.line + 1, function(line) {
        if (cm2 && marker.collapsed && !cm2.options.lineWrapping && visualLine(line) == cm2.display.maxLine) {
          updateMaxLine = true;
        }
        if (marker.collapsed && curLine != from.line) {
          updateLineHeight(line, 0);
        }
        addMarkedSpan(line, new MarkedSpan(marker, curLine == from.line ? from.ch : null, curLine == to.line ? to.ch : null), doc.cm && doc.cm.curOp);
        ++curLine;
      });
      if (marker.collapsed) {
        doc.iter(from.line, to.line + 1, function(line) {
          if (lineIsHidden(doc, line)) {
            updateLineHeight(line, 0);
          }
        });
      }
      if (marker.clearOnEnter) {
        on(marker, "beforeCursorEnter", function() {
          return marker.clear();
        });
      }
      if (marker.readOnly) {
        seeReadOnlySpans();
        if (doc.history.done.length || doc.history.undone.length) {
          doc.clearHistory();
        }
      }
      if (marker.collapsed) {
        marker.id = ++nextMarkerId;
        marker.atomic = true;
      }
      if (cm2) {
        if (updateMaxLine) {
          cm2.curOp.updateMaxLine = true;
        }
        if (marker.collapsed) {
          regChange(cm2, from.line, to.line + 1);
        } else if (marker.className || marker.startStyle || marker.endStyle || marker.css || marker.attributes || marker.title) {
          for (var i2 = from.line; i2 <= to.line; i2++) {
            regLineChange(cm2, i2, "text");
          }
        }
        if (marker.atomic) {
          reCheckSelection(cm2.doc);
        }
        signalLater(cm2, "markerAdded", cm2, marker);
      }
      return marker;
    }
    var SharedTextMarker = function(markers, primary) {
      this.markers = markers;
      this.primary = primary;
      for (var i2 = 0; i2 < markers.length; ++i2) {
        markers[i2].parent = this;
      }
    };
    SharedTextMarker.prototype.clear = function() {
      if (this.explicitlyCleared) {
        return;
      }
      this.explicitlyCleared = true;
      for (var i2 = 0; i2 < this.markers.length; ++i2) {
        this.markers[i2].clear();
      }
      signalLater(this, "clear");
    };
    SharedTextMarker.prototype.find = function(side, lineObj) {
      return this.primary.find(side, lineObj);
    };
    eventMixin(SharedTextMarker);
    function markTextShared(doc, from, to, options, type) {
      options = copyObj(options);
      options.shared = false;
      var markers = [markText(doc, from, to, options, type)], primary = markers[0];
      var widget = options.widgetNode;
      linkedDocs(doc, function(doc2) {
        if (widget) {
          options.widgetNode = widget.cloneNode(true);
        }
        markers.push(markText(doc2, clipPos(doc2, from), clipPos(doc2, to), options, type));
        for (var i2 = 0; i2 < doc2.linked.length; ++i2) {
          if (doc2.linked[i2].isParent) {
            return;
          }
        }
        primary = lst(markers);
      });
      return new SharedTextMarker(markers, primary);
    }
    function findSharedMarkers(doc) {
      return doc.findMarks(Pos(doc.first, 0), doc.clipPos(Pos(doc.lastLine())), function(m) {
        return m.parent;
      });
    }
    function copySharedMarkers(doc, markers) {
      for (var i2 = 0; i2 < markers.length; i2++) {
        var marker = markers[i2], pos = marker.find();
        var mFrom = doc.clipPos(pos.from), mTo = doc.clipPos(pos.to);
        if (cmp(mFrom, mTo)) {
          var subMark = markText(doc, mFrom, mTo, marker.primary, marker.primary.type);
          marker.markers.push(subMark);
          subMark.parent = marker;
        }
      }
    }
    function detachSharedMarkers(markers) {
      var loop = function(i3) {
        var marker = markers[i3], linked = [marker.primary.doc];
        linkedDocs(marker.primary.doc, function(d) {
          return linked.push(d);
        });
        for (var j = 0; j < marker.markers.length; j++) {
          var subMarker = marker.markers[j];
          if (indexOf(linked, subMarker.doc) == -1) {
            subMarker.parent = null;
            marker.markers.splice(j--, 1);
          }
        }
      };
      for (var i2 = 0; i2 < markers.length; i2++)
        loop(i2);
    }
    var nextDocId = 0;
    var Doc = function(text, mode, firstLine, lineSep, direction) {
      if (!(this instanceof Doc)) {
        return new Doc(text, mode, firstLine, lineSep, direction);
      }
      if (firstLine == null) {
        firstLine = 0;
      }
      BranchChunk.call(this, [new LeafChunk([new Line("", null)])]);
      this.first = firstLine;
      this.scrollTop = this.scrollLeft = 0;
      this.cantEdit = false;
      this.cleanGeneration = 1;
      this.modeFrontier = this.highlightFrontier = firstLine;
      var start = Pos(firstLine, 0);
      this.sel = simpleSelection(start);
      this.history = new History(null);
      this.id = ++nextDocId;
      this.modeOption = mode;
      this.lineSep = lineSep;
      this.direction = direction == "rtl" ? "rtl" : "ltr";
      this.extend = false;
      if (typeof text == "string") {
        text = this.splitLines(text);
      }
      updateDoc(this, { from: start, to: start, text });
      setSelection(this, simpleSelection(start), sel_dontScroll);
    };
    Doc.prototype = createObj(BranchChunk.prototype, {
      constructor: Doc,
      iter: function(from, to, op) {
        if (op) {
          this.iterN(from - this.first, to - from, op);
        } else {
          this.iterN(this.first, this.first + this.size, from);
        }
      },
      insert: function(at, lines) {
        var height = 0;
        for (var i2 = 0; i2 < lines.length; ++i2) {
          height += lines[i2].height;
        }
        this.insertInner(at - this.first, lines, height);
      },
      remove: function(at, n) {
        this.removeInner(at - this.first, n);
      },
      getValue: function(lineSep) {
        var lines = getLines(this, this.first, this.first + this.size);
        if (lineSep === false) {
          return lines;
        }
        return lines.join(lineSep || this.lineSeparator());
      },
      setValue: docMethodOp(function(code) {
        var top = Pos(this.first, 0), last = this.first + this.size - 1;
        makeChange(this, {
          from: top,
          to: Pos(last, getLine(this, last).text.length),
          text: this.splitLines(code),
          origin: "setValue",
          full: true
        }, true);
        if (this.cm) {
          scrollToCoords(this.cm, 0, 0);
        }
        setSelection(this, simpleSelection(top), sel_dontScroll);
      }),
      replaceRange: function(code, from, to, origin) {
        from = clipPos(this, from);
        to = to ? clipPos(this, to) : from;
        replaceRange(this, code, from, to, origin);
      },
      getRange: function(from, to, lineSep) {
        var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
        if (lineSep === false) {
          return lines;
        }
        if (lineSep === "") {
          return lines.join("");
        }
        return lines.join(lineSep || this.lineSeparator());
      },
      getLine: function(line) {
        var l = this.getLineHandle(line);
        return l && l.text;
      },
      getLineHandle: function(line) {
        if (isLine(this, line)) {
          return getLine(this, line);
        }
      },
      getLineNumber: function(line) {
        return lineNo(line);
      },
      getLineHandleVisualStart: function(line) {
        if (typeof line == "number") {
          line = getLine(this, line);
        }
        return visualLine(line);
      },
      lineCount: function() {
        return this.size;
      },
      firstLine: function() {
        return this.first;
      },
      lastLine: function() {
        return this.first + this.size - 1;
      },
      clipPos: function(pos) {
        return clipPos(this, pos);
      },
      getCursor: function(start) {
        var range2 = this.sel.primary(), pos;
        if (start == null || start == "head") {
          pos = range2.head;
        } else if (start == "anchor") {
          pos = range2.anchor;
        } else if (start == "end" || start == "to" || start === false) {
          pos = range2.to();
        } else {
          pos = range2.from();
        }
        return pos;
      },
      listSelections: function() {
        return this.sel.ranges;
      },
      somethingSelected: function() {
        return this.sel.somethingSelected();
      },
      setCursor: docMethodOp(function(line, ch, options) {
        setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
      }),
      setSelection: docMethodOp(function(anchor, head, options) {
        setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
      }),
      extendSelection: docMethodOp(function(head, other, options) {
        extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
      }),
      extendSelections: docMethodOp(function(heads, options) {
        extendSelections(this, clipPosArray(this, heads), options);
      }),
      extendSelectionsBy: docMethodOp(function(f, options) {
        var heads = map(this.sel.ranges, f);
        extendSelections(this, clipPosArray(this, heads), options);
      }),
      setSelections: docMethodOp(function(ranges, primary, options) {
        if (!ranges.length) {
          return;
        }
        var out = [];
        for (var i2 = 0; i2 < ranges.length; i2++) {
          out[i2] = new Range(clipPos(this, ranges[i2].anchor), clipPos(this, ranges[i2].head || ranges[i2].anchor));
        }
        if (primary == null) {
          primary = Math.min(ranges.length - 1, this.sel.primIndex);
        }
        setSelection(this, normalizeSelection(this.cm, out, primary), options);
      }),
      addSelection: docMethodOp(function(anchor, head, options) {
        var ranges = this.sel.ranges.slice(0);
        ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
        setSelection(this, normalizeSelection(this.cm, ranges, ranges.length - 1), options);
      }),
      getSelection: function(lineSep) {
        var ranges = this.sel.ranges, lines;
        for (var i2 = 0; i2 < ranges.length; i2++) {
          var sel = getBetween(this, ranges[i2].from(), ranges[i2].to());
          lines = lines ? lines.concat(sel) : sel;
        }
        if (lineSep === false) {
          return lines;
        } else {
          return lines.join(lineSep || this.lineSeparator());
        }
      },
      getSelections: function(lineSep) {
        var parts = [], ranges = this.sel.ranges;
        for (var i2 = 0; i2 < ranges.length; i2++) {
          var sel = getBetween(this, ranges[i2].from(), ranges[i2].to());
          if (lineSep !== false) {
            sel = sel.join(lineSep || this.lineSeparator());
          }
          parts[i2] = sel;
        }
        return parts;
      },
      replaceSelection: function(code, collapse, origin) {
        var dup = [];
        for (var i2 = 0; i2 < this.sel.ranges.length; i2++) {
          dup[i2] = code;
        }
        this.replaceSelections(dup, collapse, origin || "+input");
      },
      replaceSelections: docMethodOp(function(code, collapse, origin) {
        var changes = [], sel = this.sel;
        for (var i2 = 0; i2 < sel.ranges.length; i2++) {
          var range2 = sel.ranges[i2];
          changes[i2] = { from: range2.from(), to: range2.to(), text: this.splitLines(code[i2]), origin };
        }
        var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
        for (var i$12 = changes.length - 1; i$12 >= 0; i$12--) {
          makeChange(this, changes[i$12]);
        }
        if (newSel) {
          setSelectionReplaceHistory(this, newSel);
        } else if (this.cm) {
          ensureCursorVisible(this.cm);
        }
      }),
      undo: docMethodOp(function() {
        makeChangeFromHistory(this, "undo");
      }),
      redo: docMethodOp(function() {
        makeChangeFromHistory(this, "redo");
      }),
      undoSelection: docMethodOp(function() {
        makeChangeFromHistory(this, "undo", true);
      }),
      redoSelection: docMethodOp(function() {
        makeChangeFromHistory(this, "redo", true);
      }),
      setExtending: function(val) {
        this.extend = val;
      },
      getExtending: function() {
        return this.extend;
      },
      historySize: function() {
        var hist = this.history, done = 0, undone = 0;
        for (var i2 = 0; i2 < hist.done.length; i2++) {
          if (!hist.done[i2].ranges) {
            ++done;
          }
        }
        for (var i$12 = 0; i$12 < hist.undone.length; i$12++) {
          if (!hist.undone[i$12].ranges) {
            ++undone;
          }
        }
        return { undo: done, redo: undone };
      },
      clearHistory: function() {
        var this$1$1 = this;
        this.history = new History(this.history);
        linkedDocs(this, function(doc) {
          return doc.history = this$1$1.history;
        }, true);
      },
      markClean: function() {
        this.cleanGeneration = this.changeGeneration(true);
      },
      changeGeneration: function(forceSplit) {
        if (forceSplit) {
          this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null;
        }
        return this.history.generation;
      },
      isClean: function(gen) {
        return this.history.generation == (gen || this.cleanGeneration);
      },
      getHistory: function() {
        return {
          done: copyHistoryArray(this.history.done),
          undone: copyHistoryArray(this.history.undone)
        };
      },
      setHistory: function(histData) {
        var hist = this.history = new History(this.history);
        hist.done = copyHistoryArray(histData.done.slice(0), null, true);
        hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
      },
      setGutterMarker: docMethodOp(function(line, gutterID, value) {
        return changeLine(this, line, "gutter", function(line2) {
          var markers = line2.gutterMarkers || (line2.gutterMarkers = {});
          markers[gutterID] = value;
          if (!value && isEmpty(markers)) {
            line2.gutterMarkers = null;
          }
          return true;
        });
      }),
      clearGutter: docMethodOp(function(gutterID) {
        var this$1$1 = this;
        this.iter(function(line) {
          if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
            changeLine(this$1$1, line, "gutter", function() {
              line.gutterMarkers[gutterID] = null;
              if (isEmpty(line.gutterMarkers)) {
                line.gutterMarkers = null;
              }
              return true;
            });
          }
        });
      }),
      lineInfo: function(line) {
        var n;
        if (typeof line == "number") {
          if (!isLine(this, line)) {
            return null;
          }
          n = line;
          line = getLine(this, line);
          if (!line) {
            return null;
          }
        } else {
          n = lineNo(line);
          if (n == null) {
            return null;
          }
        }
        return {
          line: n,
          handle: line,
          text: line.text,
          gutterMarkers: line.gutterMarkers,
          textClass: line.textClass,
          bgClass: line.bgClass,
          wrapClass: line.wrapClass,
          widgets: line.widgets
        };
      },
      addLineClass: docMethodOp(function(handle, where, cls) {
        return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
          var prop2 = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
          if (!line[prop2]) {
            line[prop2] = cls;
          } else if (classTest(cls).test(line[prop2])) {
            return false;
          } else {
            line[prop2] += " " + cls;
          }
          return true;
        });
      }),
      removeLineClass: docMethodOp(function(handle, where, cls) {
        return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
          var prop2 = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
          var cur = line[prop2];
          if (!cur) {
            return false;
          } else if (cls == null) {
            line[prop2] = null;
          } else {
            var found = cur.match(classTest(cls));
            if (!found) {
              return false;
            }
            var end = found.index + found[0].length;
            line[prop2] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
          }
          return true;
        });
      }),
      addLineWidget: docMethodOp(function(handle, node, options) {
        return addLineWidget(this, handle, node, options);
      }),
      removeLineWidget: function(widget) {
        widget.clear();
      },
      markText: function(from, to, options) {
        return markText(this, clipPos(this, from), clipPos(this, to), options, options && options.type || "range");
      },
      setBookmark: function(pos, options) {
        var realOpts = {
          replacedWith: options && (options.nodeType == null ? options.widget : options),
          insertLeft: options && options.insertLeft,
          clearWhenEmpty: false,
          shared: options && options.shared,
          handleMouseEvents: options && options.handleMouseEvents
        };
        pos = clipPos(this, pos);
        return markText(this, pos, pos, realOpts, "bookmark");
      },
      findMarksAt: function(pos) {
        pos = clipPos(this, pos);
        var markers = [], spans = getLine(this, pos.line).markedSpans;
        if (spans) {
          for (var i2 = 0; i2 < spans.length; ++i2) {
            var span = spans[i2];
            if ((span.from == null || span.from <= pos.ch) && (span.to == null || span.to >= pos.ch)) {
              markers.push(span.marker.parent || span.marker);
            }
          }
        }
        return markers;
      },
      findMarks: function(from, to, filter) {
        from = clipPos(this, from);
        to = clipPos(this, to);
        var found = [], lineNo2 = from.line;
        this.iter(from.line, to.line + 1, function(line) {
          var spans = line.markedSpans;
          if (spans) {
            for (var i2 = 0; i2 < spans.length; i2++) {
              var span = spans[i2];
              if (!(span.to != null && lineNo2 == from.line && from.ch >= span.to || span.from == null && lineNo2 != from.line || span.from != null && lineNo2 == to.line && span.from >= to.ch) && (!filter || filter(span.marker))) {
                found.push(span.marker.parent || span.marker);
              }
            }
          }
          ++lineNo2;
        });
        return found;
      },
      getAllMarks: function() {
        var markers = [];
        this.iter(function(line) {
          var sps = line.markedSpans;
          if (sps) {
            for (var i2 = 0; i2 < sps.length; ++i2) {
              if (sps[i2].from != null) {
                markers.push(sps[i2].marker);
              }
            }
          }
        });
        return markers;
      },
      posFromIndex: function(off2) {
        var ch, lineNo2 = this.first, sepSize = this.lineSeparator().length;
        this.iter(function(line) {
          var sz = line.text.length + sepSize;
          if (sz > off2) {
            ch = off2;
            return true;
          }
          off2 -= sz;
          ++lineNo2;
        });
        return clipPos(this, Pos(lineNo2, ch));
      },
      indexFromPos: function(coords) {
        coords = clipPos(this, coords);
        var index = coords.ch;
        if (coords.line < this.first || coords.ch < 0) {
          return 0;
        }
        var sepSize = this.lineSeparator().length;
        this.iter(this.first, coords.line, function(line) {
          index += line.text.length + sepSize;
        });
        return index;
      },
      copy: function(copyHistory) {
        var doc = new Doc(getLines(this, this.first, this.first + this.size), this.modeOption, this.first, this.lineSep, this.direction);
        doc.scrollTop = this.scrollTop;
        doc.scrollLeft = this.scrollLeft;
        doc.sel = this.sel;
        doc.extend = false;
        if (copyHistory) {
          doc.history.undoDepth = this.history.undoDepth;
          doc.setHistory(this.getHistory());
        }
        return doc;
      },
      linkedDoc: function(options) {
        if (!options) {
          options = {};
        }
        var from = this.first, to = this.first + this.size;
        if (options.from != null && options.from > from) {
          from = options.from;
        }
        if (options.to != null && options.to < to) {
          to = options.to;
        }
        var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from, this.lineSep, this.direction);
        if (options.sharedHist) {
          copy.history = this.history;
        }
        (this.linked || (this.linked = [])).push({ doc: copy, sharedHist: options.sharedHist });
        copy.linked = [{ doc: this, isParent: true, sharedHist: options.sharedHist }];
        copySharedMarkers(copy, findSharedMarkers(this));
        return copy;
      },
      unlinkDoc: function(other) {
        if (other instanceof CodeMirror) {
          other = other.doc;
        }
        if (this.linked) {
          for (var i2 = 0; i2 < this.linked.length; ++i2) {
            var link = this.linked[i2];
            if (link.doc != other) {
              continue;
            }
            this.linked.splice(i2, 1);
            other.unlinkDoc(this);
            detachSharedMarkers(findSharedMarkers(this));
            break;
          }
        }
        if (other.history == this.history) {
          var splitIds = [other.id];
          linkedDocs(other, function(doc) {
            return splitIds.push(doc.id);
          }, true);
          other.history = new History(null);
          other.history.done = copyHistoryArray(this.history.done, splitIds);
          other.history.undone = copyHistoryArray(this.history.undone, splitIds);
        }
      },
      iterLinkedDocs: function(f) {
        linkedDocs(this, f);
      },
      getMode: function() {
        return this.mode;
      },
      getEditor: function() {
        return this.cm;
      },
      splitLines: function(str) {
        if (this.lineSep) {
          return str.split(this.lineSep);
        }
        return splitLinesAuto(str);
      },
      lineSeparator: function() {
        return this.lineSep || "\n";
      },
      setDirection: docMethodOp(function(dir) {
        if (dir != "rtl") {
          dir = "ltr";
        }
        if (dir == this.direction) {
          return;
        }
        this.direction = dir;
        this.iter(function(line) {
          return line.order = null;
        });
        if (this.cm) {
          directionChanged(this.cm);
        }
      })
    });
    Doc.prototype.eachLine = Doc.prototype.iter;
    var lastDrop = 0;
    function onDrop(e) {
      var cm2 = this;
      clearDragCursor(cm2);
      if (signalDOMEvent(cm2, e) || eventInWidget(cm2.display, e)) {
        return;
      }
      e_preventDefault(e);
      if (ie) {
        lastDrop = +new Date();
      }
      var pos = posFromMouse(cm2, e, true), files = e.dataTransfer.files;
      if (!pos || cm2.isReadOnly()) {
        return;
      }
      if (files && files.length && window.FileReader && window.File) {
        var n = files.length, text = Array(n), read = 0;
        var markAsReadAndPasteIfAllFilesAreRead = function() {
          if (++read == n) {
            operation(cm2, function() {
              pos = clipPos(cm2.doc, pos);
              var change = {
                from: pos,
                to: pos,
                text: cm2.doc.splitLines(text.filter(function(t) {
                  return t != null;
                }).join(cm2.doc.lineSeparator())),
                origin: "paste"
              };
              makeChange(cm2.doc, change);
              setSelectionReplaceHistory(cm2.doc, simpleSelection(clipPos(cm2.doc, pos), clipPos(cm2.doc, changeEnd(change))));
            })();
          }
        };
        var readTextFromFile = function(file, i3) {
          if (cm2.options.allowDropFileTypes && indexOf(cm2.options.allowDropFileTypes, file.type) == -1) {
            markAsReadAndPasteIfAllFilesAreRead();
            return;
          }
          var reader = new FileReader();
          reader.onerror = function() {
            return markAsReadAndPasteIfAllFilesAreRead();
          };
          reader.onload = function() {
            var content = reader.result;
            if (/[\x00-\x08\x0e-\x1f]{2}/.test(content)) {
              markAsReadAndPasteIfAllFilesAreRead();
              return;
            }
            text[i3] = content;
            markAsReadAndPasteIfAllFilesAreRead();
          };
          reader.readAsText(file);
        };
        for (var i2 = 0; i2 < files.length; i2++) {
          readTextFromFile(files[i2], i2);
        }
      } else {
        if (cm2.state.draggingText && cm2.doc.sel.contains(pos) > -1) {
          cm2.state.draggingText(e);
          setTimeout(function() {
            return cm2.display.input.focus();
          }, 20);
          return;
        }
        try {
          var text$1 = e.dataTransfer.getData("Text");
          if (text$1) {
            var selected;
            if (cm2.state.draggingText && !cm2.state.draggingText.copy) {
              selected = cm2.listSelections();
            }
            setSelectionNoUndo(cm2.doc, simpleSelection(pos, pos));
            if (selected) {
              for (var i$12 = 0; i$12 < selected.length; ++i$12) {
                replaceRange(cm2.doc, "", selected[i$12].anchor, selected[i$12].head, "drag");
              }
            }
            cm2.replaceSelection(text$1, "around", "paste");
            cm2.display.input.focus();
          }
        } catch (e$1) {
        }
      }
    }
    function onDragStart(cm2, e) {
      if (ie && (!cm2.state.draggingText || +new Date() - lastDrop < 100)) {
        e_stop(e);
        return;
      }
      if (signalDOMEvent(cm2, e) || eventInWidget(cm2.display, e)) {
        return;
      }
      e.dataTransfer.setData("Text", cm2.getSelection());
      e.dataTransfer.effectAllowed = "copyMove";
      if (e.dataTransfer.setDragImage && !safari) {
        var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
        img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        if (presto) {
          img.width = img.height = 1;
          cm2.display.wrapper.appendChild(img);
          img._top = img.offsetTop;
        }
        e.dataTransfer.setDragImage(img, 0, 0);
        if (presto) {
          img.parentNode.removeChild(img);
        }
      }
    }
    function onDragOver(cm2, e) {
      var pos = posFromMouse(cm2, e);
      if (!pos) {
        return;
      }
      var frag = document.createDocumentFragment();
      drawSelectionCursor(cm2, pos, frag);
      if (!cm2.display.dragCursor) {
        cm2.display.dragCursor = elt("div", null, "CodeMirror-cursors CodeMirror-dragcursors");
        cm2.display.lineSpace.insertBefore(cm2.display.dragCursor, cm2.display.cursorDiv);
      }
      removeChildrenAndAdd(cm2.display.dragCursor, frag);
    }
    function clearDragCursor(cm2) {
      if (cm2.display.dragCursor) {
        cm2.display.lineSpace.removeChild(cm2.display.dragCursor);
        cm2.display.dragCursor = null;
      }
    }
    function forEachCodeMirror(f) {
      if (!document.getElementsByClassName) {
        return;
      }
      var byClass = document.getElementsByClassName("CodeMirror"), editors = [];
      for (var i2 = 0; i2 < byClass.length; i2++) {
        var cm2 = byClass[i2].CodeMirror;
        if (cm2) {
          editors.push(cm2);
        }
      }
      if (editors.length) {
        editors[0].operation(function() {
          for (var i3 = 0; i3 < editors.length; i3++) {
            f(editors[i3]);
          }
        });
      }
    }
    var globalsRegistered = false;
    function ensureGlobalHandlers() {
      if (globalsRegistered) {
        return;
      }
      registerGlobalHandlers();
      globalsRegistered = true;
    }
    function registerGlobalHandlers() {
      var resizeTimer;
      on(window, "resize", function() {
        if (resizeTimer == null) {
          resizeTimer = setTimeout(function() {
            resizeTimer = null;
            forEachCodeMirror(onResize);
          }, 100);
        }
      });
      on(window, "blur", function() {
        return forEachCodeMirror(onBlur);
      });
    }
    function onResize(cm2) {
      var d = cm2.display;
      d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
      d.scrollbarsClipped = false;
      cm2.setSize();
    }
    var keyNames = {
      3: "Pause",
      8: "Backspace",
      9: "Tab",
      13: "Enter",
      16: "Shift",
      17: "Ctrl",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Esc",
      32: "Space",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "Left",
      38: "Up",
      39: "Right",
      40: "Down",
      44: "PrintScrn",
      45: "Insert",
      46: "Delete",
      59: ";",
      61: "=",
      91: "Mod",
      92: "Mod",
      93: "Mod",
      106: "*",
      107: "=",
      109: "-",
      110: ".",
      111: "/",
      145: "ScrollLock",
      173: "-",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'",
      224: "Mod",
      63232: "Up",
      63233: "Down",
      63234: "Left",
      63235: "Right",
      63272: "Delete",
      63273: "Home",
      63275: "End",
      63276: "PageUp",
      63277: "PageDown",
      63302: "Insert"
    };
    for (var i = 0; i < 10; i++) {
      keyNames[i + 48] = keyNames[i + 96] = String(i);
    }
    for (var i$1 = 65; i$1 <= 90; i$1++) {
      keyNames[i$1] = String.fromCharCode(i$1);
    }
    for (var i$2 = 1; i$2 <= 12; i$2++) {
      keyNames[i$2 + 111] = keyNames[i$2 + 63235] = "F" + i$2;
    }
    var keyMap = {};
    keyMap.basic = {
      "Left": "goCharLeft",
      "Right": "goCharRight",
      "Up": "goLineUp",
      "Down": "goLineDown",
      "End": "goLineEnd",
      "Home": "goLineStartSmart",
      "PageUp": "goPageUp",
      "PageDown": "goPageDown",
      "Delete": "delCharAfter",
      "Backspace": "delCharBefore",
      "Shift-Backspace": "delCharBefore",
      "Tab": "defaultTab",
      "Shift-Tab": "indentAuto",
      "Enter": "newlineAndIndent",
      "Insert": "toggleOverwrite",
      "Esc": "singleSelection"
    };
    keyMap.pcDefault = {
      "Ctrl-A": "selectAll",
      "Ctrl-D": "deleteLine",
      "Ctrl-Z": "undo",
      "Shift-Ctrl-Z": "redo",
      "Ctrl-Y": "redo",
      "Ctrl-Home": "goDocStart",
      "Ctrl-End": "goDocEnd",
      "Ctrl-Up": "goLineUp",
      "Ctrl-Down": "goLineDown",
      "Ctrl-Left": "goGroupLeft",
      "Ctrl-Right": "goGroupRight",
      "Alt-Left": "goLineStart",
      "Alt-Right": "goLineEnd",
      "Ctrl-Backspace": "delGroupBefore",
      "Ctrl-Delete": "delGroupAfter",
      "Ctrl-S": "save",
      "Ctrl-F": "find",
      "Ctrl-G": "findNext",
      "Shift-Ctrl-G": "findPrev",
      "Shift-Ctrl-F": "replace",
      "Shift-Ctrl-R": "replaceAll",
      "Ctrl-[": "indentLess",
      "Ctrl-]": "indentMore",
      "Ctrl-U": "undoSelection",
      "Shift-Ctrl-U": "redoSelection",
      "Alt-U": "redoSelection",
      "fallthrough": "basic"
    };
    keyMap.emacsy = {
      "Ctrl-F": "goCharRight",
      "Ctrl-B": "goCharLeft",
      "Ctrl-P": "goLineUp",
      "Ctrl-N": "goLineDown",
      "Ctrl-A": "goLineStart",
      "Ctrl-E": "goLineEnd",
      "Ctrl-V": "goPageDown",
      "Shift-Ctrl-V": "goPageUp",
      "Ctrl-D": "delCharAfter",
      "Ctrl-H": "delCharBefore",
      "Alt-Backspace": "delWordBefore",
      "Ctrl-K": "killLine",
      "Ctrl-T": "transposeChars",
      "Ctrl-O": "openLine"
    };
    keyMap.macDefault = {
      "Cmd-A": "selectAll",
      "Cmd-D": "deleteLine",
      "Cmd-Z": "undo",
      "Shift-Cmd-Z": "redo",
      "Cmd-Y": "redo",
      "Cmd-Home": "goDocStart",
      "Cmd-Up": "goDocStart",
      "Cmd-End": "goDocEnd",
      "Cmd-Down": "goDocEnd",
      "Alt-Left": "goGroupLeft",
      "Alt-Right": "goGroupRight",
      "Cmd-Left": "goLineLeft",
      "Cmd-Right": "goLineRight",
      "Alt-Backspace": "delGroupBefore",
      "Ctrl-Alt-Backspace": "delGroupAfter",
      "Alt-Delete": "delGroupAfter",
      "Cmd-S": "save",
      "Cmd-F": "find",
      "Cmd-G": "findNext",
      "Shift-Cmd-G": "findPrev",
      "Cmd-Alt-F": "replace",
      "Shift-Cmd-Alt-F": "replaceAll",
      "Cmd-[": "indentLess",
      "Cmd-]": "indentMore",
      "Cmd-Backspace": "delWrappedLineLeft",
      "Cmd-Delete": "delWrappedLineRight",
      "Cmd-U": "undoSelection",
      "Shift-Cmd-U": "redoSelection",
      "Ctrl-Up": "goDocStart",
      "Ctrl-Down": "goDocEnd",
      "fallthrough": ["basic", "emacsy"]
    };
    keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;
    function normalizeKeyName(name) {
      var parts = name.split(/-(?!$)/);
      name = parts[parts.length - 1];
      var alt, ctrl, shift, cmd;
      for (var i2 = 0; i2 < parts.length - 1; i2++) {
        var mod = parts[i2];
        if (/^(cmd|meta|m)$/i.test(mod)) {
          cmd = true;
        } else if (/^a(lt)?$/i.test(mod)) {
          alt = true;
        } else if (/^(c|ctrl|control)$/i.test(mod)) {
          ctrl = true;
        } else if (/^s(hift)?$/i.test(mod)) {
          shift = true;
        } else {
          throw new Error("Unrecognized modifier name: " + mod);
        }
      }
      if (alt) {
        name = "Alt-" + name;
      }
      if (ctrl) {
        name = "Ctrl-" + name;
      }
      if (cmd) {
        name = "Cmd-" + name;
      }
      if (shift) {
        name = "Shift-" + name;
      }
      return name;
    }
    function normalizeKeyMap(keymap) {
      var copy = {};
      for (var keyname in keymap) {
        if (keymap.hasOwnProperty(keyname)) {
          var value = keymap[keyname];
          if (/^(name|fallthrough|(de|at)tach)$/.test(keyname)) {
            continue;
          }
          if (value == "...") {
            delete keymap[keyname];
            continue;
          }
          var keys = map(keyname.split(" "), normalizeKeyName);
          for (var i2 = 0; i2 < keys.length; i2++) {
            var val = void 0, name = void 0;
            if (i2 == keys.length - 1) {
              name = keys.join(" ");
              val = value;
            } else {
              name = keys.slice(0, i2 + 1).join(" ");
              val = "...";
            }
            var prev = copy[name];
            if (!prev) {
              copy[name] = val;
            } else if (prev != val) {
              throw new Error("Inconsistent bindings for " + name);
            }
          }
          delete keymap[keyname];
        }
      }
      for (var prop2 in copy) {
        keymap[prop2] = copy[prop2];
      }
      return keymap;
    }
    function lookupKey(key, map2, handle, context) {
      map2 = getKeyMap(map2);
      var found = map2.call ? map2.call(key, context) : map2[key];
      if (found === false) {
        return "nothing";
      }
      if (found === "...") {
        return "multi";
      }
      if (found != null && handle(found)) {
        return "handled";
      }
      if (map2.fallthrough) {
        if (Object.prototype.toString.call(map2.fallthrough) != "[object Array]") {
          return lookupKey(key, map2.fallthrough, handle, context);
        }
        for (var i2 = 0; i2 < map2.fallthrough.length; i2++) {
          var result = lookupKey(key, map2.fallthrough[i2], handle, context);
          if (result) {
            return result;
          }
        }
      }
    }
    function isModifierKey(value) {
      var name = typeof value == "string" ? value : keyNames[value.keyCode];
      return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod";
    }
    function addModifierNames(name, event, noShift) {
      var base = name;
      if (event.altKey && base != "Alt") {
        name = "Alt-" + name;
      }
      if ((flipCtrlCmd ? event.metaKey : event.ctrlKey) && base != "Ctrl") {
        name = "Ctrl-" + name;
      }
      if ((flipCtrlCmd ? event.ctrlKey : event.metaKey) && base != "Mod") {
        name = "Cmd-" + name;
      }
      if (!noShift && event.shiftKey && base != "Shift") {
        name = "Shift-" + name;
      }
      return name;
    }
    function keyName(event, noShift) {
      if (presto && event.keyCode == 34 && event["char"]) {
        return false;
      }
      var name = keyNames[event.keyCode];
      if (name == null || event.altGraphKey) {
        return false;
      }
      if (event.keyCode == 3 && event.code) {
        name = event.code;
      }
      return addModifierNames(name, event, noShift);
    }
    function getKeyMap(val) {
      return typeof val == "string" ? keyMap[val] : val;
    }
    function deleteNearSelection(cm2, compute) {
      var ranges = cm2.doc.sel.ranges, kill = [];
      for (var i2 = 0; i2 < ranges.length; i2++) {
        var toKill = compute(ranges[i2]);
        while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
          var replaced = kill.pop();
          if (cmp(replaced.from, toKill.from) < 0) {
            toKill.from = replaced.from;
            break;
          }
        }
        kill.push(toKill);
      }
      runInOp(cm2, function() {
        for (var i3 = kill.length - 1; i3 >= 0; i3--) {
          replaceRange(cm2.doc, "", kill[i3].from, kill[i3].to, "+delete");
        }
        ensureCursorVisible(cm2);
      });
    }
    function moveCharLogically(line, ch, dir) {
      var target = skipExtendingChars(line.text, ch + dir, dir);
      return target < 0 || target > line.text.length ? null : target;
    }
    function moveLogically(line, start, dir) {
      var ch = moveCharLogically(line, start.ch, dir);
      return ch == null ? null : new Pos(start.line, ch, dir < 0 ? "after" : "before");
    }
    function endOfLine(visually, cm2, lineObj, lineNo2, dir) {
      if (visually) {
        if (cm2.doc.direction == "rtl") {
          dir = -dir;
        }
        var order = getOrder(lineObj, cm2.doc.direction);
        if (order) {
          var part = dir < 0 ? lst(order) : order[0];
          var moveInStorageOrder = dir < 0 == (part.level == 1);
          var sticky = moveInStorageOrder ? "after" : "before";
          var ch;
          if (part.level > 0 || cm2.doc.direction == "rtl") {
            var prep = prepareMeasureForLine(cm2, lineObj);
            ch = dir < 0 ? lineObj.text.length - 1 : 0;
            var targetTop = measureCharPrepared(cm2, prep, ch).top;
            ch = findFirst(function(ch2) {
              return measureCharPrepared(cm2, prep, ch2).top == targetTop;
            }, dir < 0 == (part.level == 1) ? part.from : part.to - 1, ch);
            if (sticky == "before") {
              ch = moveCharLogically(lineObj, ch, 1);
            }
          } else {
            ch = dir < 0 ? part.to : part.from;
          }
          return new Pos(lineNo2, ch, sticky);
        }
      }
      return new Pos(lineNo2, dir < 0 ? lineObj.text.length : 0, dir < 0 ? "before" : "after");
    }
    function moveVisually(cm2, line, start, dir) {
      var bidi = getOrder(line, cm2.doc.direction);
      if (!bidi) {
        return moveLogically(line, start, dir);
      }
      if (start.ch >= line.text.length) {
        start.ch = line.text.length;
        start.sticky = "before";
      } else if (start.ch <= 0) {
        start.ch = 0;
        start.sticky = "after";
      }
      var partPos = getBidiPartAt(bidi, start.ch, start.sticky), part = bidi[partPos];
      if (cm2.doc.direction == "ltr" && part.level % 2 == 0 && (dir > 0 ? part.to > start.ch : part.from < start.ch)) {
        return moveLogically(line, start, dir);
      }
      var mv = function(pos, dir2) {
        return moveCharLogically(line, pos instanceof Pos ? pos.ch : pos, dir2);
      };
      var prep;
      var getWrappedLineExtent = function(ch2) {
        if (!cm2.options.lineWrapping) {
          return { begin: 0, end: line.text.length };
        }
        prep = prep || prepareMeasureForLine(cm2, line);
        return wrappedLineExtentChar(cm2, line, prep, ch2);
      };
      var wrappedLineExtent2 = getWrappedLineExtent(start.sticky == "before" ? mv(start, -1) : start.ch);
      if (cm2.doc.direction == "rtl" || part.level == 1) {
        var moveInStorageOrder = part.level == 1 == dir < 0;
        var ch = mv(start, moveInStorageOrder ? 1 : -1);
        if (ch != null && (!moveInStorageOrder ? ch >= part.from && ch >= wrappedLineExtent2.begin : ch <= part.to && ch <= wrappedLineExtent2.end)) {
          var sticky = moveInStorageOrder ? "before" : "after";
          return new Pos(start.line, ch, sticky);
        }
      }
      var searchInVisualLine = function(partPos2, dir2, wrappedLineExtent3) {
        var getRes = function(ch3, moveInStorageOrder3) {
          return moveInStorageOrder3 ? new Pos(start.line, mv(ch3, 1), "before") : new Pos(start.line, ch3, "after");
        };
        for (; partPos2 >= 0 && partPos2 < bidi.length; partPos2 += dir2) {
          var part2 = bidi[partPos2];
          var moveInStorageOrder2 = dir2 > 0 == (part2.level != 1);
          var ch2 = moveInStorageOrder2 ? wrappedLineExtent3.begin : mv(wrappedLineExtent3.end, -1);
          if (part2.from <= ch2 && ch2 < part2.to) {
            return getRes(ch2, moveInStorageOrder2);
          }
          ch2 = moveInStorageOrder2 ? part2.from : mv(part2.to, -1);
          if (wrappedLineExtent3.begin <= ch2 && ch2 < wrappedLineExtent3.end) {
            return getRes(ch2, moveInStorageOrder2);
          }
        }
      };
      var res = searchInVisualLine(partPos + dir, dir, wrappedLineExtent2);
      if (res) {
        return res;
      }
      var nextCh = dir > 0 ? wrappedLineExtent2.end : mv(wrappedLineExtent2.begin, -1);
      if (nextCh != null && !(dir > 0 && nextCh == line.text.length)) {
        res = searchInVisualLine(dir > 0 ? 0 : bidi.length - 1, dir, getWrappedLineExtent(nextCh));
        if (res) {
          return res;
        }
      }
      return null;
    }
    var commands = {
      selectAll,
      singleSelection: function(cm2) {
        return cm2.setSelection(cm2.getCursor("anchor"), cm2.getCursor("head"), sel_dontScroll);
      },
      killLine: function(cm2) {
        return deleteNearSelection(cm2, function(range2) {
          if (range2.empty()) {
            var len = getLine(cm2.doc, range2.head.line).text.length;
            if (range2.head.ch == len && range2.head.line < cm2.lastLine()) {
              return { from: range2.head, to: Pos(range2.head.line + 1, 0) };
            } else {
              return { from: range2.head, to: Pos(range2.head.line, len) };
            }
          } else {
            return { from: range2.from(), to: range2.to() };
          }
        });
      },
      deleteLine: function(cm2) {
        return deleteNearSelection(cm2, function(range2) {
          return {
            from: Pos(range2.from().line, 0),
            to: clipPos(cm2.doc, Pos(range2.to().line + 1, 0))
          };
        });
      },
      delLineLeft: function(cm2) {
        return deleteNearSelection(cm2, function(range2) {
          return {
            from: Pos(range2.from().line, 0),
            to: range2.from()
          };
        });
      },
      delWrappedLineLeft: function(cm2) {
        return deleteNearSelection(cm2, function(range2) {
          var top = cm2.charCoords(range2.head, "div").top + 5;
          var leftPos = cm2.coordsChar({ left: 0, top }, "div");
          return { from: leftPos, to: range2.from() };
        });
      },
      delWrappedLineRight: function(cm2) {
        return deleteNearSelection(cm2, function(range2) {
          var top = cm2.charCoords(range2.head, "div").top + 5;
          var rightPos = cm2.coordsChar({ left: cm2.display.lineDiv.offsetWidth + 100, top }, "div");
          return { from: range2.from(), to: rightPos };
        });
      },
      undo: function(cm2) {
        return cm2.undo();
      },
      redo: function(cm2) {
        return cm2.redo();
      },
      undoSelection: function(cm2) {
        return cm2.undoSelection();
      },
      redoSelection: function(cm2) {
        return cm2.redoSelection();
      },
      goDocStart: function(cm2) {
        return cm2.extendSelection(Pos(cm2.firstLine(), 0));
      },
      goDocEnd: function(cm2) {
        return cm2.extendSelection(Pos(cm2.lastLine()));
      },
      goLineStart: function(cm2) {
        return cm2.extendSelectionsBy(function(range2) {
          return lineStart(cm2, range2.head.line);
        }, { origin: "+move", bias: 1 });
      },
      goLineStartSmart: function(cm2) {
        return cm2.extendSelectionsBy(function(range2) {
          return lineStartSmart(cm2, range2.head);
        }, { origin: "+move", bias: 1 });
      },
      goLineEnd: function(cm2) {
        return cm2.extendSelectionsBy(function(range2) {
          return lineEnd(cm2, range2.head.line);
        }, { origin: "+move", bias: -1 });
      },
      goLineRight: function(cm2) {
        return cm2.extendSelectionsBy(function(range2) {
          var top = cm2.cursorCoords(range2.head, "div").top + 5;
          return cm2.coordsChar({ left: cm2.display.lineDiv.offsetWidth + 100, top }, "div");
        }, sel_move);
      },
      goLineLeft: function(cm2) {
        return cm2.extendSelectionsBy(function(range2) {
          var top = cm2.cursorCoords(range2.head, "div").top + 5;
          return cm2.coordsChar({ left: 0, top }, "div");
        }, sel_move);
      },
      goLineLeftSmart: function(cm2) {
        return cm2.extendSelectionsBy(function(range2) {
          var top = cm2.cursorCoords(range2.head, "div").top + 5;
          var pos = cm2.coordsChar({ left: 0, top }, "div");
          if (pos.ch < cm2.getLine(pos.line).search(/\S/)) {
            return lineStartSmart(cm2, range2.head);
          }
          return pos;
        }, sel_move);
      },
      goLineUp: function(cm2) {
        return cm2.moveV(-1, "line");
      },
      goLineDown: function(cm2) {
        return cm2.moveV(1, "line");
      },
      goPageUp: function(cm2) {
        return cm2.moveV(-1, "page");
      },
      goPageDown: function(cm2) {
        return cm2.moveV(1, "page");
      },
      goCharLeft: function(cm2) {
        return cm2.moveH(-1, "char");
      },
      goCharRight: function(cm2) {
        return cm2.moveH(1, "char");
      },
      goColumnLeft: function(cm2) {
        return cm2.moveH(-1, "column");
      },
      goColumnRight: function(cm2) {
        return cm2.moveH(1, "column");
      },
      goWordLeft: function(cm2) {
        return cm2.moveH(-1, "word");
      },
      goGroupRight: function(cm2) {
        return cm2.moveH(1, "group");
      },
      goGroupLeft: function(cm2) {
        return cm2.moveH(-1, "group");
      },
      goWordRight: function(cm2) {
        return cm2.moveH(1, "word");
      },
      delCharBefore: function(cm2) {
        return cm2.deleteH(-1, "codepoint");
      },
      delCharAfter: function(cm2) {
        return cm2.deleteH(1, "char");
      },
      delWordBefore: function(cm2) {
        return cm2.deleteH(-1, "word");
      },
      delWordAfter: function(cm2) {
        return cm2.deleteH(1, "word");
      },
      delGroupBefore: function(cm2) {
        return cm2.deleteH(-1, "group");
      },
      delGroupAfter: function(cm2) {
        return cm2.deleteH(1, "group");
      },
      indentAuto: function(cm2) {
        return cm2.indentSelection("smart");
      },
      indentMore: function(cm2) {
        return cm2.indentSelection("add");
      },
      indentLess: function(cm2) {
        return cm2.indentSelection("subtract");
      },
      insertTab: function(cm2) {
        return cm2.replaceSelection("	");
      },
      insertSoftTab: function(cm2) {
        var spaces = [], ranges = cm2.listSelections(), tabSize = cm2.options.tabSize;
        for (var i2 = 0; i2 < ranges.length; i2++) {
          var pos = ranges[i2].from();
          var col = countColumn(cm2.getLine(pos.line), pos.ch, tabSize);
          spaces.push(spaceStr(tabSize - col % tabSize));
        }
        cm2.replaceSelections(spaces);
      },
      defaultTab: function(cm2) {
        if (cm2.somethingSelected()) {
          cm2.indentSelection("add");
        } else {
          cm2.execCommand("insertTab");
        }
      },
      transposeChars: function(cm2) {
        return runInOp(cm2, function() {
          var ranges = cm2.listSelections(), newSel = [];
          for (var i2 = 0; i2 < ranges.length; i2++) {
            if (!ranges[i2].empty()) {
              continue;
            }
            var cur = ranges[i2].head, line = getLine(cm2.doc, cur.line).text;
            if (line) {
              if (cur.ch == line.length) {
                cur = new Pos(cur.line, cur.ch - 1);
              }
              if (cur.ch > 0) {
                cur = new Pos(cur.line, cur.ch + 1);
                cm2.replaceRange(line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2), Pos(cur.line, cur.ch - 2), cur, "+transpose");
              } else if (cur.line > cm2.doc.first) {
                var prev = getLine(cm2.doc, cur.line - 1).text;
                if (prev) {
                  cur = new Pos(cur.line, 1);
                  cm2.replaceRange(line.charAt(0) + cm2.doc.lineSeparator() + prev.charAt(prev.length - 1), Pos(cur.line - 1, prev.length - 1), cur, "+transpose");
                }
              }
            }
            newSel.push(new Range(cur, cur));
          }
          cm2.setSelections(newSel);
        });
      },
      newlineAndIndent: function(cm2) {
        return runInOp(cm2, function() {
          var sels = cm2.listSelections();
          for (var i2 = sels.length - 1; i2 >= 0; i2--) {
            cm2.replaceRange(cm2.doc.lineSeparator(), sels[i2].anchor, sels[i2].head, "+input");
          }
          sels = cm2.listSelections();
          for (var i$12 = 0; i$12 < sels.length; i$12++) {
            cm2.indentLine(sels[i$12].from().line, null, true);
          }
          ensureCursorVisible(cm2);
        });
      },
      openLine: function(cm2) {
        return cm2.replaceSelection("\n", "start");
      },
      toggleOverwrite: function(cm2) {
        return cm2.toggleOverwrite();
      }
    };
    function lineStart(cm2, lineN) {
      var line = getLine(cm2.doc, lineN);
      var visual = visualLine(line);
      if (visual != line) {
        lineN = lineNo(visual);
      }
      return endOfLine(true, cm2, visual, lineN, 1);
    }
    function lineEnd(cm2, lineN) {
      var line = getLine(cm2.doc, lineN);
      var visual = visualLineEnd(line);
      if (visual != line) {
        lineN = lineNo(visual);
      }
      return endOfLine(true, cm2, line, lineN, -1);
    }
    function lineStartSmart(cm2, pos) {
      var start = lineStart(cm2, pos.line);
      var line = getLine(cm2.doc, start.line);
      var order = getOrder(line, cm2.doc.direction);
      if (!order || order[0].level == 0) {
        var firstNonWS = Math.max(start.ch, line.text.search(/\S/));
        var inWS = pos.line == start.line && pos.ch <= firstNonWS && pos.ch;
        return Pos(start.line, inWS ? 0 : firstNonWS, start.sticky);
      }
      return start;
    }
    function doHandleBinding(cm2, bound, dropShift) {
      if (typeof bound == "string") {
        bound = commands[bound];
        if (!bound) {
          return false;
        }
      }
      cm2.display.input.ensurePolled();
      var prevShift = cm2.display.shift, done = false;
      try {
        if (cm2.isReadOnly()) {
          cm2.state.suppressEdits = true;
        }
        if (dropShift) {
          cm2.display.shift = false;
        }
        done = bound(cm2) != Pass;
      } finally {
        cm2.display.shift = prevShift;
        cm2.state.suppressEdits = false;
      }
      return done;
    }
    function lookupKeyForEditor(cm2, name, handle) {
      for (var i2 = 0; i2 < cm2.state.keyMaps.length; i2++) {
        var result = lookupKey(name, cm2.state.keyMaps[i2], handle, cm2);
        if (result) {
          return result;
        }
      }
      return cm2.options.extraKeys && lookupKey(name, cm2.options.extraKeys, handle, cm2) || lookupKey(name, cm2.options.keyMap, handle, cm2);
    }
    var stopSeq = new Delayed();
    function dispatchKey(cm2, name, e, handle) {
      var seq = cm2.state.keySeq;
      if (seq) {
        if (isModifierKey(name)) {
          return "handled";
        }
        if (/\'$/.test(name)) {
          cm2.state.keySeq = null;
        } else {
          stopSeq.set(50, function() {
            if (cm2.state.keySeq == seq) {
              cm2.state.keySeq = null;
              cm2.display.input.reset();
            }
          });
        }
        if (dispatchKeyInner(cm2, seq + " " + name, e, handle)) {
          return true;
        }
      }
      return dispatchKeyInner(cm2, name, e, handle);
    }
    function dispatchKeyInner(cm2, name, e, handle) {
      var result = lookupKeyForEditor(cm2, name, handle);
      if (result == "multi") {
        cm2.state.keySeq = name;
      }
      if (result == "handled") {
        signalLater(cm2, "keyHandled", cm2, name, e);
      }
      if (result == "handled" || result == "multi") {
        e_preventDefault(e);
        restartBlink(cm2);
      }
      return !!result;
    }
    function handleKeyBinding(cm2, e) {
      var name = keyName(e, true);
      if (!name) {
        return false;
      }
      if (e.shiftKey && !cm2.state.keySeq) {
        return dispatchKey(cm2, "Shift-" + name, e, function(b) {
          return doHandleBinding(cm2, b, true);
        }) || dispatchKey(cm2, name, e, function(b) {
          if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion) {
            return doHandleBinding(cm2, b);
          }
        });
      } else {
        return dispatchKey(cm2, name, e, function(b) {
          return doHandleBinding(cm2, b);
        });
      }
    }
    function handleCharBinding(cm2, e, ch) {
      return dispatchKey(cm2, "'" + ch + "'", e, function(b) {
        return doHandleBinding(cm2, b, true);
      });
    }
    var lastStoppedKey = null;
    function onKeyDown(e) {
      var cm2 = this;
      if (e.target && e.target != cm2.display.input.getField()) {
        return;
      }
      cm2.curOp.focus = activeElt();
      if (signalDOMEvent(cm2, e)) {
        return;
      }
      if (ie && ie_version < 11 && e.keyCode == 27) {
        e.returnValue = false;
      }
      var code = e.keyCode;
      cm2.display.shift = code == 16 || e.shiftKey;
      var handled = handleKeyBinding(cm2, e);
      if (presto) {
        lastStoppedKey = handled ? code : null;
        if (!handled && code == 88 && !hasCopyEvent && (mac ? e.metaKey : e.ctrlKey)) {
          cm2.replaceSelection("", null, "cut");
        }
      }
      if (gecko && !mac && !handled && code == 46 && e.shiftKey && !e.ctrlKey && document.execCommand) {
        document.execCommand("cut");
      }
      if (code == 18 && !/\bCodeMirror-crosshair\b/.test(cm2.display.lineDiv.className)) {
        showCrossHair(cm2);
      }
    }
    function showCrossHair(cm2) {
      var lineDiv = cm2.display.lineDiv;
      addClass(lineDiv, "CodeMirror-crosshair");
      function up(e) {
        if (e.keyCode == 18 || !e.altKey) {
          rmClass(lineDiv, "CodeMirror-crosshair");
          off(document, "keyup", up);
          off(document, "mouseover", up);
        }
      }
      on(document, "keyup", up);
      on(document, "mouseover", up);
    }
    function onKeyUp(e) {
      if (e.keyCode == 16) {
        this.doc.sel.shift = false;
      }
      signalDOMEvent(this, e);
    }
    function onKeyPress(e) {
      var cm2 = this;
      if (e.target && e.target != cm2.display.input.getField()) {
        return;
      }
      if (eventInWidget(cm2.display, e) || signalDOMEvent(cm2, e) || e.ctrlKey && !e.altKey || mac && e.metaKey) {
        return;
      }
      var keyCode = e.keyCode, charCode = e.charCode;
      if (presto && keyCode == lastStoppedKey) {
        lastStoppedKey = null;
        e_preventDefault(e);
        return;
      }
      if (presto && (!e.which || e.which < 10) && handleKeyBinding(cm2, e)) {
        return;
      }
      var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
      if (ch == "\b") {
        return;
      }
      if (handleCharBinding(cm2, e, ch)) {
        return;
      }
      cm2.display.input.onKeyPress(e);
    }
    var DOUBLECLICK_DELAY = 400;
    var PastClick = function(time, pos, button) {
      this.time = time;
      this.pos = pos;
      this.button = button;
    };
    PastClick.prototype.compare = function(time, pos, button) {
      return this.time + DOUBLECLICK_DELAY > time && cmp(pos, this.pos) == 0 && button == this.button;
    };
    var lastClick, lastDoubleClick;
    function clickRepeat(pos, button) {
      var now = +new Date();
      if (lastDoubleClick && lastDoubleClick.compare(now, pos, button)) {
        lastClick = lastDoubleClick = null;
        return "triple";
      } else if (lastClick && lastClick.compare(now, pos, button)) {
        lastDoubleClick = new PastClick(now, pos, button);
        lastClick = null;
        return "double";
      } else {
        lastClick = new PastClick(now, pos, button);
        lastDoubleClick = null;
        return "single";
      }
    }
    function onMouseDown(e) {
      var cm2 = this, display = cm2.display;
      if (signalDOMEvent(cm2, e) || display.activeTouch && display.input.supportsTouch()) {
        return;
      }
      display.input.ensurePolled();
      display.shift = e.shiftKey;
      if (eventInWidget(display, e)) {
        if (!webkit) {
          display.scroller.draggable = false;
          setTimeout(function() {
            return display.scroller.draggable = true;
          }, 100);
        }
        return;
      }
      if (clickInGutter(cm2, e)) {
        return;
      }
      var pos = posFromMouse(cm2, e), button = e_button(e), repeat = pos ? clickRepeat(pos, button) : "single";
      window.focus();
      if (button == 1 && cm2.state.selectingText) {
        cm2.state.selectingText(e);
      }
      if (pos && handleMappedButton(cm2, button, pos, repeat, e)) {
        return;
      }
      if (button == 1) {
        if (pos) {
          leftButtonDown(cm2, pos, repeat, e);
        } else if (e_target(e) == display.scroller) {
          e_preventDefault(e);
        }
      } else if (button == 2) {
        if (pos) {
          extendSelection(cm2.doc, pos);
        }
        setTimeout(function() {
          return display.input.focus();
        }, 20);
      } else if (button == 3) {
        if (captureRightClick) {
          cm2.display.input.onContextMenu(e);
        } else {
          delayBlurEvent(cm2);
        }
      }
    }
    function handleMappedButton(cm2, button, pos, repeat, event) {
      var name = "Click";
      if (repeat == "double") {
        name = "Double" + name;
      } else if (repeat == "triple") {
        name = "Triple" + name;
      }
      name = (button == 1 ? "Left" : button == 2 ? "Middle" : "Right") + name;
      return dispatchKey(cm2, addModifierNames(name, event), event, function(bound) {
        if (typeof bound == "string") {
          bound = commands[bound];
        }
        if (!bound) {
          return false;
        }
        var done = false;
        try {
          if (cm2.isReadOnly()) {
            cm2.state.suppressEdits = true;
          }
          done = bound(cm2, pos) != Pass;
        } finally {
          cm2.state.suppressEdits = false;
        }
        return done;
      });
    }
    function configureMouse(cm2, repeat, event) {
      var option = cm2.getOption("configureMouse");
      var value = option ? option(cm2, repeat, event) : {};
      if (value.unit == null) {
        var rect = chromeOS ? event.shiftKey && event.metaKey : event.altKey;
        value.unit = rect ? "rectangle" : repeat == "single" ? "char" : repeat == "double" ? "word" : "line";
      }
      if (value.extend == null || cm2.doc.extend) {
        value.extend = cm2.doc.extend || event.shiftKey;
      }
      if (value.addNew == null) {
        value.addNew = mac ? event.metaKey : event.ctrlKey;
      }
      if (value.moveOnDrag == null) {
        value.moveOnDrag = !(mac ? event.altKey : event.ctrlKey);
      }
      return value;
    }
    function leftButtonDown(cm2, pos, repeat, event) {
      if (ie) {
        setTimeout(bind(ensureFocus, cm2), 0);
      } else {
        cm2.curOp.focus = activeElt();
      }
      var behavior = configureMouse(cm2, repeat, event);
      var sel = cm2.doc.sel, contained;
      if (cm2.options.dragDrop && dragAndDrop && !cm2.isReadOnly() && repeat == "single" && (contained = sel.contains(pos)) > -1 && (cmp((contained = sel.ranges[contained]).from(), pos) < 0 || pos.xRel > 0) && (cmp(contained.to(), pos) > 0 || pos.xRel < 0)) {
        leftButtonStartDrag(cm2, event, pos, behavior);
      } else {
        leftButtonSelect(cm2, event, pos, behavior);
      }
    }
    function leftButtonStartDrag(cm2, event, pos, behavior) {
      var display = cm2.display, moved = false;
      var dragEnd = operation(cm2, function(e) {
        if (webkit) {
          display.scroller.draggable = false;
        }
        cm2.state.draggingText = false;
        if (cm2.state.delayingBlurEvent) {
          if (cm2.hasFocus()) {
            cm2.state.delayingBlurEvent = false;
          } else {
            delayBlurEvent(cm2);
          }
        }
        off(display.wrapper.ownerDocument, "mouseup", dragEnd);
        off(display.wrapper.ownerDocument, "mousemove", mouseMove);
        off(display.scroller, "dragstart", dragStart);
        off(display.scroller, "drop", dragEnd);
        if (!moved) {
          e_preventDefault(e);
          if (!behavior.addNew) {
            extendSelection(cm2.doc, pos, null, null, behavior.extend);
          }
          if (webkit && !safari || ie && ie_version == 9) {
            setTimeout(function() {
              display.wrapper.ownerDocument.body.focus({ preventScroll: true });
              display.input.focus();
            }, 20);
          } else {
            display.input.focus();
          }
        }
      });
      var mouseMove = function(e2) {
        moved = moved || Math.abs(event.clientX - e2.clientX) + Math.abs(event.clientY - e2.clientY) >= 10;
      };
      var dragStart = function() {
        return moved = true;
      };
      if (webkit) {
        display.scroller.draggable = true;
      }
      cm2.state.draggingText = dragEnd;
      dragEnd.copy = !behavior.moveOnDrag;
      on(display.wrapper.ownerDocument, "mouseup", dragEnd);
      on(display.wrapper.ownerDocument, "mousemove", mouseMove);
      on(display.scroller, "dragstart", dragStart);
      on(display.scroller, "drop", dragEnd);
      cm2.state.delayingBlurEvent = true;
      setTimeout(function() {
        return display.input.focus();
      }, 20);
      if (display.scroller.dragDrop) {
        display.scroller.dragDrop();
      }
    }
    function rangeForUnit(cm2, pos, unit) {
      if (unit == "char") {
        return new Range(pos, pos);
      }
      if (unit == "word") {
        return cm2.findWordAt(pos);
      }
      if (unit == "line") {
        return new Range(Pos(pos.line, 0), clipPos(cm2.doc, Pos(pos.line + 1, 0)));
      }
      var result = unit(cm2, pos);
      return new Range(result.from, result.to);
    }
    function leftButtonSelect(cm2, event, start, behavior) {
      if (ie) {
        delayBlurEvent(cm2);
      }
      var display = cm2.display, doc = cm2.doc;
      e_preventDefault(event);
      var ourRange, ourIndex, startSel = doc.sel, ranges = startSel.ranges;
      if (behavior.addNew && !behavior.extend) {
        ourIndex = doc.sel.contains(start);
        if (ourIndex > -1) {
          ourRange = ranges[ourIndex];
        } else {
          ourRange = new Range(start, start);
        }
      } else {
        ourRange = doc.sel.primary();
        ourIndex = doc.sel.primIndex;
      }
      if (behavior.unit == "rectangle") {
        if (!behavior.addNew) {
          ourRange = new Range(start, start);
        }
        start = posFromMouse(cm2, event, true, true);
        ourIndex = -1;
      } else {
        var range2 = rangeForUnit(cm2, start, behavior.unit);
        if (behavior.extend) {
          ourRange = extendRange(ourRange, range2.anchor, range2.head, behavior.extend);
        } else {
          ourRange = range2;
        }
      }
      if (!behavior.addNew) {
        ourIndex = 0;
        setSelection(doc, new Selection([ourRange], 0), sel_mouse);
        startSel = doc.sel;
      } else if (ourIndex == -1) {
        ourIndex = ranges.length;
        setSelection(doc, normalizeSelection(cm2, ranges.concat([ourRange]), ourIndex), { scroll: false, origin: "*mouse" });
      } else if (ranges.length > 1 && ranges[ourIndex].empty() && behavior.unit == "char" && !behavior.extend) {
        setSelection(doc, normalizeSelection(cm2, ranges.slice(0, ourIndex).concat(ranges.slice(ourIndex + 1)), 0), { scroll: false, origin: "*mouse" });
        startSel = doc.sel;
      } else {
        replaceOneSelection(doc, ourIndex, ourRange, sel_mouse);
      }
      var lastPos = start;
      function extendTo(pos) {
        if (cmp(lastPos, pos) == 0) {
          return;
        }
        lastPos = pos;
        if (behavior.unit == "rectangle") {
          var ranges2 = [], tabSize = cm2.options.tabSize;
          var startCol = countColumn(getLine(doc, start.line).text, start.ch, tabSize);
          var posCol = countColumn(getLine(doc, pos.line).text, pos.ch, tabSize);
          var left = Math.min(startCol, posCol), right = Math.max(startCol, posCol);
          for (var line = Math.min(start.line, pos.line), end = Math.min(cm2.lastLine(), Math.max(start.line, pos.line)); line <= end; line++) {
            var text = getLine(doc, line).text, leftPos = findColumn(text, left, tabSize);
            if (left == right) {
              ranges2.push(new Range(Pos(line, leftPos), Pos(line, leftPos)));
            } else if (text.length > leftPos) {
              ranges2.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize))));
            }
          }
          if (!ranges2.length) {
            ranges2.push(new Range(start, start));
          }
          setSelection(doc, normalizeSelection(cm2, startSel.ranges.slice(0, ourIndex).concat(ranges2), ourIndex), { origin: "*mouse", scroll: false });
          cm2.scrollIntoView(pos);
        } else {
          var oldRange = ourRange;
          var range3 = rangeForUnit(cm2, pos, behavior.unit);
          var anchor = oldRange.anchor, head;
          if (cmp(range3.anchor, anchor) > 0) {
            head = range3.head;
            anchor = minPos(oldRange.from(), range3.anchor);
          } else {
            head = range3.anchor;
            anchor = maxPos(oldRange.to(), range3.head);
          }
          var ranges$1 = startSel.ranges.slice(0);
          ranges$1[ourIndex] = bidiSimplify(cm2, new Range(clipPos(doc, anchor), head));
          setSelection(doc, normalizeSelection(cm2, ranges$1, ourIndex), sel_mouse);
        }
      }
      var editorSize = display.wrapper.getBoundingClientRect();
      var counter = 0;
      function extend(e) {
        var curCount = ++counter;
        var cur = posFromMouse(cm2, e, true, behavior.unit == "rectangle");
        if (!cur) {
          return;
        }
        if (cmp(cur, lastPos) != 0) {
          cm2.curOp.focus = activeElt();
          extendTo(cur);
          var visible = visibleLines(display, doc);
          if (cur.line >= visible.to || cur.line < visible.from) {
            setTimeout(operation(cm2, function() {
              if (counter == curCount) {
                extend(e);
              }
            }), 150);
          }
        } else {
          var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
          if (outside) {
            setTimeout(operation(cm2, function() {
              if (counter != curCount) {
                return;
              }
              display.scroller.scrollTop += outside;
              extend(e);
            }), 50);
          }
        }
      }
      function done(e) {
        cm2.state.selectingText = false;
        counter = Infinity;
        if (e) {
          e_preventDefault(e);
          display.input.focus();
        }
        off(display.wrapper.ownerDocument, "mousemove", move);
        off(display.wrapper.ownerDocument, "mouseup", up);
        doc.history.lastSelOrigin = null;
      }
      var move = operation(cm2, function(e) {
        if (e.buttons === 0 || !e_button(e)) {
          done(e);
        } else {
          extend(e);
        }
      });
      var up = operation(cm2, done);
      cm2.state.selectingText = up;
      on(display.wrapper.ownerDocument, "mousemove", move);
      on(display.wrapper.ownerDocument, "mouseup", up);
    }
    function bidiSimplify(cm2, range2) {
      var anchor = range2.anchor;
      var head = range2.head;
      var anchorLine = getLine(cm2.doc, anchor.line);
      if (cmp(anchor, head) == 0 && anchor.sticky == head.sticky) {
        return range2;
      }
      var order = getOrder(anchorLine);
      if (!order) {
        return range2;
      }
      var index = getBidiPartAt(order, anchor.ch, anchor.sticky), part = order[index];
      if (part.from != anchor.ch && part.to != anchor.ch) {
        return range2;
      }
      var boundary = index + (part.from == anchor.ch == (part.level != 1) ? 0 : 1);
      if (boundary == 0 || boundary == order.length) {
        return range2;
      }
      var leftSide;
      if (head.line != anchor.line) {
        leftSide = (head.line - anchor.line) * (cm2.doc.direction == "ltr" ? 1 : -1) > 0;
      } else {
        var headIndex = getBidiPartAt(order, head.ch, head.sticky);
        var dir = headIndex - index || (head.ch - anchor.ch) * (part.level == 1 ? -1 : 1);
        if (headIndex == boundary - 1 || headIndex == boundary) {
          leftSide = dir < 0;
        } else {
          leftSide = dir > 0;
        }
      }
      var usePart = order[boundary + (leftSide ? -1 : 0)];
      var from = leftSide == (usePart.level == 1);
      var ch = from ? usePart.from : usePart.to, sticky = from ? "after" : "before";
      return anchor.ch == ch && anchor.sticky == sticky ? range2 : new Range(new Pos(anchor.line, ch, sticky), head);
    }
    function gutterEvent(cm2, e, type, prevent) {
      var mX, mY;
      if (e.touches) {
        mX = e.touches[0].clientX;
        mY = e.touches[0].clientY;
      } else {
        try {
          mX = e.clientX;
          mY = e.clientY;
        } catch (e$1) {
          return false;
        }
      }
      if (mX >= Math.floor(cm2.display.gutters.getBoundingClientRect().right)) {
        return false;
      }
      if (prevent) {
        e_preventDefault(e);
      }
      var display = cm2.display;
      var lineBox = display.lineDiv.getBoundingClientRect();
      if (mY > lineBox.bottom || !hasHandler(cm2, type)) {
        return e_defaultPrevented(e);
      }
      mY -= lineBox.top - display.viewOffset;
      for (var i2 = 0; i2 < cm2.display.gutterSpecs.length; ++i2) {
        var g = display.gutters.childNodes[i2];
        if (g && g.getBoundingClientRect().right >= mX) {
          var line = lineAtHeight(cm2.doc, mY);
          var gutter = cm2.display.gutterSpecs[i2];
          signal(cm2, type, cm2, line, gutter.className, e);
          return e_defaultPrevented(e);
        }
      }
    }
    function clickInGutter(cm2, e) {
      return gutterEvent(cm2, e, "gutterClick", true);
    }
    function onContextMenu(cm2, e) {
      if (eventInWidget(cm2.display, e) || contextMenuInGutter(cm2, e)) {
        return;
      }
      if (signalDOMEvent(cm2, e, "contextmenu")) {
        return;
      }
      if (!captureRightClick) {
        cm2.display.input.onContextMenu(e);
      }
    }
    function contextMenuInGutter(cm2, e) {
      if (!hasHandler(cm2, "gutterContextMenu")) {
        return false;
      }
      return gutterEvent(cm2, e, "gutterContextMenu", false);
    }
    function themeChanged(cm2) {
      cm2.display.wrapper.className = cm2.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + cm2.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
      clearCaches(cm2);
    }
    var Init = { toString: function() {
      return "CodeMirror.Init";
    } };
    var defaults = {};
    var optionHandlers = {};
    function defineOptions(CodeMirror2) {
      var optionHandlers2 = CodeMirror2.optionHandlers;
      function option(name, deflt, handle, notOnInit) {
        CodeMirror2.defaults[name] = deflt;
        if (handle) {
          optionHandlers2[name] = notOnInit ? function(cm2, val, old) {
            if (old != Init) {
              handle(cm2, val, old);
            }
          } : handle;
        }
      }
      CodeMirror2.defineOption = option;
      CodeMirror2.Init = Init;
      option("value", "", function(cm2, val) {
        return cm2.setValue(val);
      }, true);
      option("mode", null, function(cm2, val) {
        cm2.doc.modeOption = val;
        loadMode(cm2);
      }, true);
      option("indentUnit", 2, loadMode, true);
      option("indentWithTabs", false);
      option("smartIndent", true);
      option("tabSize", 4, function(cm2) {
        resetModeState(cm2);
        clearCaches(cm2);
        regChange(cm2);
      }, true);
      option("lineSeparator", null, function(cm2, val) {
        cm2.doc.lineSep = val;
        if (!val) {
          return;
        }
        var newBreaks = [], lineNo2 = cm2.doc.first;
        cm2.doc.iter(function(line) {
          for (var pos = 0; ; ) {
            var found = line.text.indexOf(val, pos);
            if (found == -1) {
              break;
            }
            pos = found + val.length;
            newBreaks.push(Pos(lineNo2, found));
          }
          lineNo2++;
        });
        for (var i2 = newBreaks.length - 1; i2 >= 0; i2--) {
          replaceRange(cm2.doc, val, newBreaks[i2], Pos(newBreaks[i2].line, newBreaks[i2].ch + val.length));
        }
      });
      option("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g, function(cm2, val, old) {
        cm2.state.specialChars = new RegExp(val.source + (val.test("	") ? "" : "|	"), "g");
        if (old != Init) {
          cm2.refresh();
        }
      });
      option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function(cm2) {
        return cm2.refresh();
      }, true);
      option("electricChars", true);
      option("inputStyle", mobile ? "contenteditable" : "textarea", function() {
        throw new Error("inputStyle can not (yet) be changed in a running editor");
      }, true);
      option("spellcheck", false, function(cm2, val) {
        return cm2.getInputField().spellcheck = val;
      }, true);
      option("autocorrect", false, function(cm2, val) {
        return cm2.getInputField().autocorrect = val;
      }, true);
      option("autocapitalize", false, function(cm2, val) {
        return cm2.getInputField().autocapitalize = val;
      }, true);
      option("rtlMoveVisually", !windows);
      option("wholeLineUpdateBefore", true);
      option("theme", "default", function(cm2) {
        themeChanged(cm2);
        updateGutters(cm2);
      }, true);
      option("keyMap", "default", function(cm2, val, old) {
        var next = getKeyMap(val);
        var prev = old != Init && getKeyMap(old);
        if (prev && prev.detach) {
          prev.detach(cm2, next);
        }
        if (next.attach) {
          next.attach(cm2, prev || null);
        }
      });
      option("extraKeys", null);
      option("configureMouse", null);
      option("lineWrapping", false, wrappingChanged, true);
      option("gutters", [], function(cm2, val) {
        cm2.display.gutterSpecs = getGutters(val, cm2.options.lineNumbers);
        updateGutters(cm2);
      }, true);
      option("fixedGutter", true, function(cm2, val) {
        cm2.display.gutters.style.left = val ? compensateForHScroll(cm2.display) + "px" : "0";
        cm2.refresh();
      }, true);
      option("coverGutterNextToScrollbar", false, function(cm2) {
        return updateScrollbars(cm2);
      }, true);
      option("scrollbarStyle", "native", function(cm2) {
        initScrollbars(cm2);
        updateScrollbars(cm2);
        cm2.display.scrollbars.setScrollTop(cm2.doc.scrollTop);
        cm2.display.scrollbars.setScrollLeft(cm2.doc.scrollLeft);
      }, true);
      option("lineNumbers", false, function(cm2, val) {
        cm2.display.gutterSpecs = getGutters(cm2.options.gutters, val);
        updateGutters(cm2);
      }, true);
      option("firstLineNumber", 1, updateGutters, true);
      option("lineNumberFormatter", function(integer) {
        return integer;
      }, updateGutters, true);
      option("showCursorWhenSelecting", false, updateSelection, true);
      option("resetSelectionOnContextMenu", true);
      option("lineWiseCopyCut", true);
      option("pasteLinesPerSelection", true);
      option("selectionsMayTouch", false);
      option("readOnly", false, function(cm2, val) {
        if (val == "nocursor") {
          onBlur(cm2);
          cm2.display.input.blur();
        }
        cm2.display.input.readOnlyChanged(val);
      });
      option("screenReaderLabel", null, function(cm2, val) {
        val = val === "" ? null : val;
        cm2.display.input.screenReaderLabelChanged(val);
      });
      option("disableInput", false, function(cm2, val) {
        if (!val) {
          cm2.display.input.reset();
        }
      }, true);
      option("dragDrop", true, dragDropChanged);
      option("allowDropFileTypes", null);
      option("cursorBlinkRate", 530);
      option("cursorScrollMargin", 0);
      option("cursorHeight", 1, updateSelection, true);
      option("singleCursorHeightPerLine", true, updateSelection, true);
      option("workTime", 100);
      option("workDelay", 100);
      option("flattenSpans", true, resetModeState, true);
      option("addModeClass", false, resetModeState, true);
      option("pollInterval", 100);
      option("undoDepth", 200, function(cm2, val) {
        return cm2.doc.history.undoDepth = val;
      });
      option("historyEventDelay", 1250);
      option("viewportMargin", 10, function(cm2) {
        return cm2.refresh();
      }, true);
      option("maxHighlightLength", 1e4, resetModeState, true);
      option("moveInputWithCursor", true, function(cm2, val) {
        if (!val) {
          cm2.display.input.resetPosition();
        }
      });
      option("tabindex", null, function(cm2, val) {
        return cm2.display.input.getField().tabIndex = val || "";
      });
      option("autofocus", null);
      option("direction", "ltr", function(cm2, val) {
        return cm2.doc.setDirection(val);
      }, true);
      option("phrases", null);
    }
    function dragDropChanged(cm2, value, old) {
      var wasOn = old && old != Init;
      if (!value != !wasOn) {
        var funcs = cm2.display.dragFunctions;
        var toggle = value ? on : off;
        toggle(cm2.display.scroller, "dragstart", funcs.start);
        toggle(cm2.display.scroller, "dragenter", funcs.enter);
        toggle(cm2.display.scroller, "dragover", funcs.over);
        toggle(cm2.display.scroller, "dragleave", funcs.leave);
        toggle(cm2.display.scroller, "drop", funcs.drop);
      }
    }
    function wrappingChanged(cm2) {
      if (cm2.options.lineWrapping) {
        addClass(cm2.display.wrapper, "CodeMirror-wrap");
        cm2.display.sizer.style.minWidth = "";
        cm2.display.sizerWidth = null;
      } else {
        rmClass(cm2.display.wrapper, "CodeMirror-wrap");
        findMaxLine(cm2);
      }
      estimateLineHeights(cm2);
      regChange(cm2);
      clearCaches(cm2);
      setTimeout(function() {
        return updateScrollbars(cm2);
      }, 100);
    }
    function CodeMirror(place, options) {
      var this$1$1 = this;
      if (!(this instanceof CodeMirror)) {
        return new CodeMirror(place, options);
      }
      this.options = options = options ? copyObj(options) : {};
      copyObj(defaults, options, false);
      var doc = options.value;
      if (typeof doc == "string") {
        doc = new Doc(doc, options.mode, null, options.lineSeparator, options.direction);
      } else if (options.mode) {
        doc.modeOption = options.mode;
      }
      this.doc = doc;
      var input = new CodeMirror.inputStyles[options.inputStyle](this);
      var display = this.display = new Display(place, doc, input, options);
      display.wrapper.CodeMirror = this;
      themeChanged(this);
      if (options.lineWrapping) {
        this.display.wrapper.className += " CodeMirror-wrap";
      }
      initScrollbars(this);
      this.state = {
        keyMaps: [],
        overlays: [],
        modeGen: 0,
        overwrite: false,
        delayingBlurEvent: false,
        focused: false,
        suppressEdits: false,
        pasteIncoming: -1,
        cutIncoming: -1,
        selectingText: false,
        draggingText: false,
        highlight: new Delayed(),
        keySeq: null,
        specialChars: null
      };
      if (options.autofocus && !mobile) {
        display.input.focus();
      }
      if (ie && ie_version < 11) {
        setTimeout(function() {
          return this$1$1.display.input.reset(true);
        }, 20);
      }
      registerEventHandlers(this);
      ensureGlobalHandlers();
      startOperation(this);
      this.curOp.forceUpdate = true;
      attachDoc(this, doc);
      if (options.autofocus && !mobile || this.hasFocus()) {
        setTimeout(function() {
          if (this$1$1.hasFocus() && !this$1$1.state.focused) {
            onFocus(this$1$1);
          }
        }, 20);
      } else {
        onBlur(this);
      }
      for (var opt in optionHandlers) {
        if (optionHandlers.hasOwnProperty(opt)) {
          optionHandlers[opt](this, options[opt], Init);
        }
      }
      maybeUpdateLineNumberWidth(this);
      if (options.finishInit) {
        options.finishInit(this);
      }
      for (var i2 = 0; i2 < initHooks.length; ++i2) {
        initHooks[i2](this);
      }
      endOperation(this);
      if (webkit && options.lineWrapping && getComputedStyle(display.lineDiv).textRendering == "optimizelegibility") {
        display.lineDiv.style.textRendering = "auto";
      }
    }
    CodeMirror.defaults = defaults;
    CodeMirror.optionHandlers = optionHandlers;
    function registerEventHandlers(cm2) {
      var d = cm2.display;
      on(d.scroller, "mousedown", operation(cm2, onMouseDown));
      if (ie && ie_version < 11) {
        on(d.scroller, "dblclick", operation(cm2, function(e) {
          if (signalDOMEvent(cm2, e)) {
            return;
          }
          var pos = posFromMouse(cm2, e);
          if (!pos || clickInGutter(cm2, e) || eventInWidget(cm2.display, e)) {
            return;
          }
          e_preventDefault(e);
          var word = cm2.findWordAt(pos);
          extendSelection(cm2.doc, word.anchor, word.head);
        }));
      } else {
        on(d.scroller, "dblclick", function(e) {
          return signalDOMEvent(cm2, e) || e_preventDefault(e);
        });
      }
      on(d.scroller, "contextmenu", function(e) {
        return onContextMenu(cm2, e);
      });
      on(d.input.getField(), "contextmenu", function(e) {
        if (!d.scroller.contains(e.target)) {
          onContextMenu(cm2, e);
        }
      });
      var touchFinished, prevTouch = { end: 0 };
      function finishTouch() {
        if (d.activeTouch) {
          touchFinished = setTimeout(function() {
            return d.activeTouch = null;
          }, 1e3);
          prevTouch = d.activeTouch;
          prevTouch.end = +new Date();
        }
      }
      function isMouseLikeTouchEvent(e) {
        if (e.touches.length != 1) {
          return false;
        }
        var touch = e.touches[0];
        return touch.radiusX <= 1 && touch.radiusY <= 1;
      }
      function farAway(touch, other) {
        if (other.left == null) {
          return true;
        }
        var dx = other.left - touch.left, dy = other.top - touch.top;
        return dx * dx + dy * dy > 20 * 20;
      }
      on(d.scroller, "touchstart", function(e) {
        if (!signalDOMEvent(cm2, e) && !isMouseLikeTouchEvent(e) && !clickInGutter(cm2, e)) {
          d.input.ensurePolled();
          clearTimeout(touchFinished);
          var now = +new Date();
          d.activeTouch = {
            start: now,
            moved: false,
            prev: now - prevTouch.end <= 300 ? prevTouch : null
          };
          if (e.touches.length == 1) {
            d.activeTouch.left = e.touches[0].pageX;
            d.activeTouch.top = e.touches[0].pageY;
          }
        }
      });
      on(d.scroller, "touchmove", function() {
        if (d.activeTouch) {
          d.activeTouch.moved = true;
        }
      });
      on(d.scroller, "touchend", function(e) {
        var touch = d.activeTouch;
        if (touch && !eventInWidget(d, e) && touch.left != null && !touch.moved && new Date() - touch.start < 300) {
          var pos = cm2.coordsChar(d.activeTouch, "page"), range2;
          if (!touch.prev || farAway(touch, touch.prev)) {
            range2 = new Range(pos, pos);
          } else if (!touch.prev.prev || farAway(touch, touch.prev.prev)) {
            range2 = cm2.findWordAt(pos);
          } else {
            range2 = new Range(Pos(pos.line, 0), clipPos(cm2.doc, Pos(pos.line + 1, 0)));
          }
          cm2.setSelection(range2.anchor, range2.head);
          cm2.focus();
          e_preventDefault(e);
        }
        finishTouch();
      });
      on(d.scroller, "touchcancel", finishTouch);
      on(d.scroller, "scroll", function() {
        if (d.scroller.clientHeight) {
          updateScrollTop(cm2, d.scroller.scrollTop);
          setScrollLeft(cm2, d.scroller.scrollLeft, true);
          signal(cm2, "scroll", cm2);
        }
      });
      on(d.scroller, "mousewheel", function(e) {
        return onScrollWheel(cm2, e);
      });
      on(d.scroller, "DOMMouseScroll", function(e) {
        return onScrollWheel(cm2, e);
      });
      on(d.wrapper, "scroll", function() {
        return d.wrapper.scrollTop = d.wrapper.scrollLeft = 0;
      });
      d.dragFunctions = {
        enter: function(e) {
          if (!signalDOMEvent(cm2, e)) {
            e_stop(e);
          }
        },
        over: function(e) {
          if (!signalDOMEvent(cm2, e)) {
            onDragOver(cm2, e);
            e_stop(e);
          }
        },
        start: function(e) {
          return onDragStart(cm2, e);
        },
        drop: operation(cm2, onDrop),
        leave: function(e) {
          if (!signalDOMEvent(cm2, e)) {
            clearDragCursor(cm2);
          }
        }
      };
      var inp = d.input.getField();
      on(inp, "keyup", function(e) {
        return onKeyUp.call(cm2, e);
      });
      on(inp, "keydown", operation(cm2, onKeyDown));
      on(inp, "keypress", operation(cm2, onKeyPress));
      on(inp, "focus", function(e) {
        return onFocus(cm2, e);
      });
      on(inp, "blur", function(e) {
        return onBlur(cm2, e);
      });
    }
    var initHooks = [];
    CodeMirror.defineInitHook = function(f) {
      return initHooks.push(f);
    };
    function indentLine(cm2, n, how, aggressive) {
      var doc = cm2.doc, state;
      if (how == null) {
        how = "add";
      }
      if (how == "smart") {
        if (!doc.mode.indent) {
          how = "prev";
        } else {
          state = getContextBefore(cm2, n).state;
        }
      }
      var tabSize = cm2.options.tabSize;
      var line = getLine(doc, n), curSpace = countColumn(line.text, null, tabSize);
      if (line.stateAfter) {
        line.stateAfter = null;
      }
      var curSpaceString = line.text.match(/^\s*/)[0], indentation;
      if (!aggressive && !/\S/.test(line.text)) {
        indentation = 0;
        how = "not";
      } else if (how == "smart") {
        indentation = doc.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
        if (indentation == Pass || indentation > 150) {
          if (!aggressive) {
            return;
          }
          how = "prev";
        }
      }
      if (how == "prev") {
        if (n > doc.first) {
          indentation = countColumn(getLine(doc, n - 1).text, null, tabSize);
        } else {
          indentation = 0;
        }
      } else if (how == "add") {
        indentation = curSpace + cm2.options.indentUnit;
      } else if (how == "subtract") {
        indentation = curSpace - cm2.options.indentUnit;
      } else if (typeof how == "number") {
        indentation = curSpace + how;
      }
      indentation = Math.max(0, indentation);
      var indentString = "", pos = 0;
      if (cm2.options.indentWithTabs) {
        for (var i2 = Math.floor(indentation / tabSize); i2; --i2) {
          pos += tabSize;
          indentString += "	";
        }
      }
      if (pos < indentation) {
        indentString += spaceStr(indentation - pos);
      }
      if (indentString != curSpaceString) {
        replaceRange(doc, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input");
        line.stateAfter = null;
        return true;
      } else {
        for (var i$12 = 0; i$12 < doc.sel.ranges.length; i$12++) {
          var range2 = doc.sel.ranges[i$12];
          if (range2.head.line == n && range2.head.ch < curSpaceString.length) {
            var pos$1 = Pos(n, curSpaceString.length);
            replaceOneSelection(doc, i$12, new Range(pos$1, pos$1));
            break;
          }
        }
      }
    }
    var lastCopied = null;
    function setLastCopied(newLastCopied) {
      lastCopied = newLastCopied;
    }
    function applyTextInput(cm2, inserted, deleted, sel, origin) {
      var doc = cm2.doc;
      cm2.display.shift = false;
      if (!sel) {
        sel = doc.sel;
      }
      var recent = +new Date() - 200;
      var paste = origin == "paste" || cm2.state.pasteIncoming > recent;
      var textLines = splitLinesAuto(inserted), multiPaste = null;
      if (paste && sel.ranges.length > 1) {
        if (lastCopied && lastCopied.text.join("\n") == inserted) {
          if (sel.ranges.length % lastCopied.text.length == 0) {
            multiPaste = [];
            for (var i2 = 0; i2 < lastCopied.text.length; i2++) {
              multiPaste.push(doc.splitLines(lastCopied.text[i2]));
            }
          }
        } else if (textLines.length == sel.ranges.length && cm2.options.pasteLinesPerSelection) {
          multiPaste = map(textLines, function(l) {
            return [l];
          });
        }
      }
      var updateInput = cm2.curOp.updateInput;
      for (var i$12 = sel.ranges.length - 1; i$12 >= 0; i$12--) {
        var range2 = sel.ranges[i$12];
        var from = range2.from(), to = range2.to();
        if (range2.empty()) {
          if (deleted && deleted > 0) {
            from = Pos(from.line, from.ch - deleted);
          } else if (cm2.state.overwrite && !paste) {
            to = Pos(to.line, Math.min(getLine(doc, to.line).text.length, to.ch + lst(textLines).length));
          } else if (paste && lastCopied && lastCopied.lineWise && lastCopied.text.join("\n") == textLines.join("\n")) {
            from = to = Pos(from.line, 0);
          }
        }
        var changeEvent = {
          from,
          to,
          text: multiPaste ? multiPaste[i$12 % multiPaste.length] : textLines,
          origin: origin || (paste ? "paste" : cm2.state.cutIncoming > recent ? "cut" : "+input")
        };
        makeChange(cm2.doc, changeEvent);
        signalLater(cm2, "inputRead", cm2, changeEvent);
      }
      if (inserted && !paste) {
        triggerElectric(cm2, inserted);
      }
      ensureCursorVisible(cm2);
      if (cm2.curOp.updateInput < 2) {
        cm2.curOp.updateInput = updateInput;
      }
      cm2.curOp.typing = true;
      cm2.state.pasteIncoming = cm2.state.cutIncoming = -1;
    }
    function handlePaste(e, cm2) {
      var pasted = e.clipboardData && e.clipboardData.getData("Text");
      if (pasted) {
        e.preventDefault();
        if (!cm2.isReadOnly() && !cm2.options.disableInput) {
          runInOp(cm2, function() {
            return applyTextInput(cm2, pasted, 0, null, "paste");
          });
        }
        return true;
      }
    }
    function triggerElectric(cm2, inserted) {
      if (!cm2.options.electricChars || !cm2.options.smartIndent) {
        return;
      }
      var sel = cm2.doc.sel;
      for (var i2 = sel.ranges.length - 1; i2 >= 0; i2--) {
        var range2 = sel.ranges[i2];
        if (range2.head.ch > 100 || i2 && sel.ranges[i2 - 1].head.line == range2.head.line) {
          continue;
        }
        var mode = cm2.getModeAt(range2.head);
        var indented = false;
        if (mode.electricChars) {
          for (var j = 0; j < mode.electricChars.length; j++) {
            if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
              indented = indentLine(cm2, range2.head.line, "smart");
              break;
            }
          }
        } else if (mode.electricInput) {
          if (mode.electricInput.test(getLine(cm2.doc, range2.head.line).text.slice(0, range2.head.ch))) {
            indented = indentLine(cm2, range2.head.line, "smart");
          }
        }
        if (indented) {
          signalLater(cm2, "electricInput", cm2, range2.head.line);
        }
      }
    }
    function copyableRanges(cm2) {
      var text = [], ranges = [];
      for (var i2 = 0; i2 < cm2.doc.sel.ranges.length; i2++) {
        var line = cm2.doc.sel.ranges[i2].head.line;
        var lineRange = { anchor: Pos(line, 0), head: Pos(line + 1, 0) };
        ranges.push(lineRange);
        text.push(cm2.getRange(lineRange.anchor, lineRange.head));
      }
      return { text, ranges };
    }
    function disableBrowserMagic(field, spellcheck, autocorrect, autocapitalize) {
      field.setAttribute("autocorrect", autocorrect ? "" : "off");
      field.setAttribute("autocapitalize", autocapitalize ? "" : "off");
      field.setAttribute("spellcheck", !!spellcheck);
    }
    function hiddenTextarea() {
      var te = elt("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none");
      var div = elt("div", [te], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
      if (webkit) {
        te.style.width = "1000px";
      } else {
        te.setAttribute("wrap", "off");
      }
      if (ios) {
        te.style.border = "1px solid black";
      }
      disableBrowserMagic(te);
      return div;
    }
    function addEditorMethods(CodeMirror2) {
      var optionHandlers2 = CodeMirror2.optionHandlers;
      var helpers = CodeMirror2.helpers = {};
      CodeMirror2.prototype = {
        constructor: CodeMirror2,
        focus: function() {
          window.focus();
          this.display.input.focus();
        },
        setOption: function(option, value) {
          var options = this.options, old = options[option];
          if (options[option] == value && option != "mode") {
            return;
          }
          options[option] = value;
          if (optionHandlers2.hasOwnProperty(option)) {
            operation(this, optionHandlers2[option])(this, value, old);
          }
          signal(this, "optionChange", this, option);
        },
        getOption: function(option) {
          return this.options[option];
        },
        getDoc: function() {
          return this.doc;
        },
        addKeyMap: function(map2, bottom) {
          this.state.keyMaps[bottom ? "push" : "unshift"](getKeyMap(map2));
        },
        removeKeyMap: function(map2) {
          var maps = this.state.keyMaps;
          for (var i2 = 0; i2 < maps.length; ++i2) {
            if (maps[i2] == map2 || maps[i2].name == map2) {
              maps.splice(i2, 1);
              return true;
            }
          }
        },
        addOverlay: methodOp(function(spec, options) {
          var mode = spec.token ? spec : CodeMirror2.getMode(this.options, spec);
          if (mode.startState) {
            throw new Error("Overlays may not be stateful.");
          }
          insertSorted(this.state.overlays, {
            mode,
            modeSpec: spec,
            opaque: options && options.opaque,
            priority: options && options.priority || 0
          }, function(overlay) {
            return overlay.priority;
          });
          this.state.modeGen++;
          regChange(this);
        }),
        removeOverlay: methodOp(function(spec) {
          var overlays = this.state.overlays;
          for (var i2 = 0; i2 < overlays.length; ++i2) {
            var cur = overlays[i2].modeSpec;
            if (cur == spec || typeof spec == "string" && cur.name == spec) {
              overlays.splice(i2, 1);
              this.state.modeGen++;
              regChange(this);
              return;
            }
          }
        }),
        indentLine: methodOp(function(n, dir, aggressive) {
          if (typeof dir != "string" && typeof dir != "number") {
            if (dir == null) {
              dir = this.options.smartIndent ? "smart" : "prev";
            } else {
              dir = dir ? "add" : "subtract";
            }
          }
          if (isLine(this.doc, n)) {
            indentLine(this, n, dir, aggressive);
          }
        }),
        indentSelection: methodOp(function(how) {
          var ranges = this.doc.sel.ranges, end = -1;
          for (var i2 = 0; i2 < ranges.length; i2++) {
            var range2 = ranges[i2];
            if (!range2.empty()) {
              var from = range2.from(), to = range2.to();
              var start = Math.max(end, from.line);
              end = Math.min(this.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
              for (var j = start; j < end; ++j) {
                indentLine(this, j, how);
              }
              var newRanges = this.doc.sel.ranges;
              if (from.ch == 0 && ranges.length == newRanges.length && newRanges[i2].from().ch > 0) {
                replaceOneSelection(this.doc, i2, new Range(from, newRanges[i2].to()), sel_dontScroll);
              }
            } else if (range2.head.line > end) {
              indentLine(this, range2.head.line, how, true);
              end = range2.head.line;
              if (i2 == this.doc.sel.primIndex) {
                ensureCursorVisible(this);
              }
            }
          }
        }),
        getTokenAt: function(pos, precise) {
          return takeToken(this, pos, precise);
        },
        getLineTokens: function(line, precise) {
          return takeToken(this, Pos(line), precise, true);
        },
        getTokenTypeAt: function(pos) {
          pos = clipPos(this.doc, pos);
          var styles2 = getLineStyles(this, getLine(this.doc, pos.line));
          var before = 0, after = (styles2.length - 1) / 2, ch = pos.ch;
          var type;
          if (ch == 0) {
            type = styles2[2];
          } else {
            for (; ; ) {
              var mid = before + after >> 1;
              if ((mid ? styles2[mid * 2 - 1] : 0) >= ch) {
                after = mid;
              } else if (styles2[mid * 2 + 1] < ch) {
                before = mid + 1;
              } else {
                type = styles2[mid * 2 + 2];
                break;
              }
            }
          }
          var cut = type ? type.indexOf("overlay ") : -1;
          return cut < 0 ? type : cut == 0 ? null : type.slice(0, cut - 1);
        },
        getModeAt: function(pos) {
          var mode = this.doc.mode;
          if (!mode.innerMode) {
            return mode;
          }
          return CodeMirror2.innerMode(mode, this.getTokenAt(pos).state).mode;
        },
        getHelper: function(pos, type) {
          return this.getHelpers(pos, type)[0];
        },
        getHelpers: function(pos, type) {
          var found = [];
          if (!helpers.hasOwnProperty(type)) {
            return found;
          }
          var help = helpers[type], mode = this.getModeAt(pos);
          if (typeof mode[type] == "string") {
            if (help[mode[type]]) {
              found.push(help[mode[type]]);
            }
          } else if (mode[type]) {
            for (var i2 = 0; i2 < mode[type].length; i2++) {
              var val = help[mode[type][i2]];
              if (val) {
                found.push(val);
              }
            }
          } else if (mode.helperType && help[mode.helperType]) {
            found.push(help[mode.helperType]);
          } else if (help[mode.name]) {
            found.push(help[mode.name]);
          }
          for (var i$12 = 0; i$12 < help._global.length; i$12++) {
            var cur = help._global[i$12];
            if (cur.pred(mode, this) && indexOf(found, cur.val) == -1) {
              found.push(cur.val);
            }
          }
          return found;
        },
        getStateAfter: function(line, precise) {
          var doc = this.doc;
          line = clipLine(doc, line == null ? doc.first + doc.size - 1 : line);
          return getContextBefore(this, line + 1, precise).state;
        },
        cursorCoords: function(start, mode) {
          var pos, range2 = this.doc.sel.primary();
          if (start == null) {
            pos = range2.head;
          } else if (typeof start == "object") {
            pos = clipPos(this.doc, start);
          } else {
            pos = start ? range2.from() : range2.to();
          }
          return cursorCoords(this, pos, mode || "page");
        },
        charCoords: function(pos, mode) {
          return charCoords(this, clipPos(this.doc, pos), mode || "page");
        },
        coordsChar: function(coords, mode) {
          coords = fromCoordSystem(this, coords, mode || "page");
          return coordsChar(this, coords.left, coords.top);
        },
        lineAtHeight: function(height, mode) {
          height = fromCoordSystem(this, { top: height, left: 0 }, mode || "page").top;
          return lineAtHeight(this.doc, height + this.display.viewOffset);
        },
        heightAtLine: function(line, mode, includeWidgets) {
          var end = false, lineObj;
          if (typeof line == "number") {
            var last = this.doc.first + this.doc.size - 1;
            if (line < this.doc.first) {
              line = this.doc.first;
            } else if (line > last) {
              line = last;
              end = true;
            }
            lineObj = getLine(this.doc, line);
          } else {
            lineObj = line;
          }
          return intoCoordSystem(this, lineObj, { top: 0, left: 0 }, mode || "page", includeWidgets || end).top + (end ? this.doc.height - heightAtLine(lineObj) : 0);
        },
        defaultTextHeight: function() {
          return textHeight(this.display);
        },
        defaultCharWidth: function() {
          return charWidth(this.display);
        },
        getViewport: function() {
          return { from: this.display.viewFrom, to: this.display.viewTo };
        },
        addWidget: function(pos, node, scroll, vert, horiz) {
          var display = this.display;
          pos = cursorCoords(this, clipPos(this.doc, pos));
          var top = pos.bottom, left = pos.left;
          node.style.position = "absolute";
          node.setAttribute("cm-ignore-events", "true");
          this.display.input.setUneditable(node);
          display.sizer.appendChild(node);
          if (vert == "over") {
            top = pos.top;
          } else if (vert == "above" || vert == "near") {
            var vspace = Math.max(display.wrapper.clientHeight, this.doc.height), hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
            if ((vert == "above" || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight) {
              top = pos.top - node.offsetHeight;
            } else if (pos.bottom + node.offsetHeight <= vspace) {
              top = pos.bottom;
            }
            if (left + node.offsetWidth > hspace) {
              left = hspace - node.offsetWidth;
            }
          }
          node.style.top = top + "px";
          node.style.left = node.style.right = "";
          if (horiz == "right") {
            left = display.sizer.clientWidth - node.offsetWidth;
            node.style.right = "0px";
          } else {
            if (horiz == "left") {
              left = 0;
            } else if (horiz == "middle") {
              left = (display.sizer.clientWidth - node.offsetWidth) / 2;
            }
            node.style.left = left + "px";
          }
          if (scroll) {
            scrollIntoView(this, { left, top, right: left + node.offsetWidth, bottom: top + node.offsetHeight });
          }
        },
        triggerOnKeyDown: methodOp(onKeyDown),
        triggerOnKeyPress: methodOp(onKeyPress),
        triggerOnKeyUp: onKeyUp,
        triggerOnMouseDown: methodOp(onMouseDown),
        execCommand: function(cmd) {
          if (commands.hasOwnProperty(cmd)) {
            return commands[cmd].call(null, this);
          }
        },
        triggerElectric: methodOp(function(text) {
          triggerElectric(this, text);
        }),
        findPosH: function(from, amount, unit, visually) {
          var dir = 1;
          if (amount < 0) {
            dir = -1;
            amount = -amount;
          }
          var cur = clipPos(this.doc, from);
          for (var i2 = 0; i2 < amount; ++i2) {
            cur = findPosH(this.doc, cur, dir, unit, visually);
            if (cur.hitSide) {
              break;
            }
          }
          return cur;
        },
        moveH: methodOp(function(dir, unit) {
          var this$1$1 = this;
          this.extendSelectionsBy(function(range2) {
            if (this$1$1.display.shift || this$1$1.doc.extend || range2.empty()) {
              return findPosH(this$1$1.doc, range2.head, dir, unit, this$1$1.options.rtlMoveVisually);
            } else {
              return dir < 0 ? range2.from() : range2.to();
            }
          }, sel_move);
        }),
        deleteH: methodOp(function(dir, unit) {
          var sel = this.doc.sel, doc = this.doc;
          if (sel.somethingSelected()) {
            doc.replaceSelection("", null, "+delete");
          } else {
            deleteNearSelection(this, function(range2) {
              var other = findPosH(doc, range2.head, dir, unit, false);
              return dir < 0 ? { from: other, to: range2.head } : { from: range2.head, to: other };
            });
          }
        }),
        findPosV: function(from, amount, unit, goalColumn) {
          var dir = 1, x = goalColumn;
          if (amount < 0) {
            dir = -1;
            amount = -amount;
          }
          var cur = clipPos(this.doc, from);
          for (var i2 = 0; i2 < amount; ++i2) {
            var coords = cursorCoords(this, cur, "div");
            if (x == null) {
              x = coords.left;
            } else {
              coords.left = x;
            }
            cur = findPosV(this, coords, dir, unit);
            if (cur.hitSide) {
              break;
            }
          }
          return cur;
        },
        moveV: methodOp(function(dir, unit) {
          var this$1$1 = this;
          var doc = this.doc, goals = [];
          var collapse = !this.display.shift && !doc.extend && doc.sel.somethingSelected();
          doc.extendSelectionsBy(function(range2) {
            if (collapse) {
              return dir < 0 ? range2.from() : range2.to();
            }
            var headPos = cursorCoords(this$1$1, range2.head, "div");
            if (range2.goalColumn != null) {
              headPos.left = range2.goalColumn;
            }
            goals.push(headPos.left);
            var pos = findPosV(this$1$1, headPos, dir, unit);
            if (unit == "page" && range2 == doc.sel.primary()) {
              addToScrollTop(this$1$1, charCoords(this$1$1, pos, "div").top - headPos.top);
            }
            return pos;
          }, sel_move);
          if (goals.length) {
            for (var i2 = 0; i2 < doc.sel.ranges.length; i2++) {
              doc.sel.ranges[i2].goalColumn = goals[i2];
            }
          }
        }),
        findWordAt: function(pos) {
          var doc = this.doc, line = getLine(doc, pos.line).text;
          var start = pos.ch, end = pos.ch;
          if (line) {
            var helper = this.getHelper(pos, "wordChars");
            if ((pos.sticky == "before" || end == line.length) && start) {
              --start;
            } else {
              ++end;
            }
            var startChar = line.charAt(start);
            var check = isWordChar(startChar, helper) ? function(ch) {
              return isWordChar(ch, helper);
            } : /\s/.test(startChar) ? function(ch) {
              return /\s/.test(ch);
            } : function(ch) {
              return !/\s/.test(ch) && !isWordChar(ch);
            };
            while (start > 0 && check(line.charAt(start - 1))) {
              --start;
            }
            while (end < line.length && check(line.charAt(end))) {
              ++end;
            }
          }
          return new Range(Pos(pos.line, start), Pos(pos.line, end));
        },
        toggleOverwrite: function(value) {
          if (value != null && value == this.state.overwrite) {
            return;
          }
          if (this.state.overwrite = !this.state.overwrite) {
            addClass(this.display.cursorDiv, "CodeMirror-overwrite");
          } else {
            rmClass(this.display.cursorDiv, "CodeMirror-overwrite");
          }
          signal(this, "overwriteToggle", this, this.state.overwrite);
        },
        hasFocus: function() {
          return this.display.input.getField() == activeElt();
        },
        isReadOnly: function() {
          return !!(this.options.readOnly || this.doc.cantEdit);
        },
        scrollTo: methodOp(function(x, y) {
          scrollToCoords(this, x, y);
        }),
        getScrollInfo: function() {
          var scroller = this.display.scroller;
          return {
            left: scroller.scrollLeft,
            top: scroller.scrollTop,
            height: scroller.scrollHeight - scrollGap(this) - this.display.barHeight,
            width: scroller.scrollWidth - scrollGap(this) - this.display.barWidth,
            clientHeight: displayHeight(this),
            clientWidth: displayWidth(this)
          };
        },
        scrollIntoView: methodOp(function(range2, margin) {
          if (range2 == null) {
            range2 = { from: this.doc.sel.primary().head, to: null };
            if (margin == null) {
              margin = this.options.cursorScrollMargin;
            }
          } else if (typeof range2 == "number") {
            range2 = { from: Pos(range2, 0), to: null };
          } else if (range2.from == null) {
            range2 = { from: range2, to: null };
          }
          if (!range2.to) {
            range2.to = range2.from;
          }
          range2.margin = margin || 0;
          if (range2.from.line != null) {
            scrollToRange(this, range2);
          } else {
            scrollToCoordsRange(this, range2.from, range2.to, range2.margin);
          }
        }),
        setSize: methodOp(function(width, height) {
          var this$1$1 = this;
          var interpret = function(val) {
            return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val;
          };
          if (width != null) {
            this.display.wrapper.style.width = interpret(width);
          }
          if (height != null) {
            this.display.wrapper.style.height = interpret(height);
          }
          if (this.options.lineWrapping) {
            clearLineMeasurementCache(this);
          }
          var lineNo2 = this.display.viewFrom;
          this.doc.iter(lineNo2, this.display.viewTo, function(line) {
            if (line.widgets) {
              for (var i2 = 0; i2 < line.widgets.length; i2++) {
                if (line.widgets[i2].noHScroll) {
                  regLineChange(this$1$1, lineNo2, "widget");
                  break;
                }
              }
            }
            ++lineNo2;
          });
          this.curOp.forceUpdate = true;
          signal(this, "refresh", this);
        }),
        operation: function(f) {
          return runInOp(this, f);
        },
        startOperation: function() {
          return startOperation(this);
        },
        endOperation: function() {
          return endOperation(this);
        },
        refresh: methodOp(function() {
          var oldHeight = this.display.cachedTextHeight;
          regChange(this);
          this.curOp.forceUpdate = true;
          clearCaches(this);
          scrollToCoords(this, this.doc.scrollLeft, this.doc.scrollTop);
          updateGutterSpace(this.display);
          if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > 0.5 || this.options.lineWrapping) {
            estimateLineHeights(this);
          }
          signal(this, "refresh", this);
        }),
        swapDoc: methodOp(function(doc) {
          var old = this.doc;
          old.cm = null;
          if (this.state.selectingText) {
            this.state.selectingText();
          }
          attachDoc(this, doc);
          clearCaches(this);
          this.display.input.reset();
          scrollToCoords(this, doc.scrollLeft, doc.scrollTop);
          this.curOp.forceScroll = true;
          signalLater(this, "swapDoc", this, old);
          return old;
        }),
        phrase: function(phraseText) {
          var phrases = this.options.phrases;
          return phrases && Object.prototype.hasOwnProperty.call(phrases, phraseText) ? phrases[phraseText] : phraseText;
        },
        getInputField: function() {
          return this.display.input.getField();
        },
        getWrapperElement: function() {
          return this.display.wrapper;
        },
        getScrollerElement: function() {
          return this.display.scroller;
        },
        getGutterElement: function() {
          return this.display.gutters;
        }
      };
      eventMixin(CodeMirror2);
      CodeMirror2.registerHelper = function(type, name, value) {
        if (!helpers.hasOwnProperty(type)) {
          helpers[type] = CodeMirror2[type] = { _global: [] };
        }
        helpers[type][name] = value;
      };
      CodeMirror2.registerGlobalHelper = function(type, name, predicate, value) {
        CodeMirror2.registerHelper(type, name, value);
        helpers[type]._global.push({ pred: predicate, val: value });
      };
    }
    function findPosH(doc, pos, dir, unit, visually) {
      var oldPos = pos;
      var origDir = dir;
      var lineObj = getLine(doc, pos.line);
      var lineDir = visually && doc.direction == "rtl" ? -dir : dir;
      function findNextLine() {
        var l = pos.line + lineDir;
        if (l < doc.first || l >= doc.first + doc.size) {
          return false;
        }
        pos = new Pos(l, pos.ch, pos.sticky);
        return lineObj = getLine(doc, l);
      }
      function moveOnce(boundToLine) {
        var next;
        if (unit == "codepoint") {
          var ch = lineObj.text.charCodeAt(pos.ch + (dir > 0 ? 0 : -1));
          if (isNaN(ch)) {
            next = null;
          } else {
            var astral = dir > 0 ? ch >= 55296 && ch < 56320 : ch >= 56320 && ch < 57343;
            next = new Pos(pos.line, Math.max(0, Math.min(lineObj.text.length, pos.ch + dir * (astral ? 2 : 1))), -dir);
          }
        } else if (visually) {
          next = moveVisually(doc.cm, lineObj, pos, dir);
        } else {
          next = moveLogically(lineObj, pos, dir);
        }
        if (next == null) {
          if (!boundToLine && findNextLine()) {
            pos = endOfLine(visually, doc.cm, lineObj, pos.line, lineDir);
          } else {
            return false;
          }
        } else {
          pos = next;
        }
        return true;
      }
      if (unit == "char" || unit == "codepoint") {
        moveOnce();
      } else if (unit == "column") {
        moveOnce(true);
      } else if (unit == "word" || unit == "group") {
        var sawType = null, group = unit == "group";
        var helper = doc.cm && doc.cm.getHelper(pos, "wordChars");
        for (var first = true; ; first = false) {
          if (dir < 0 && !moveOnce(!first)) {
            break;
          }
          var cur = lineObj.text.charAt(pos.ch) || "\n";
          var type = isWordChar(cur, helper) ? "w" : group && cur == "\n" ? "n" : !group || /\s/.test(cur) ? null : "p";
          if (group && !first && !type) {
            type = "s";
          }
          if (sawType && sawType != type) {
            if (dir < 0) {
              dir = 1;
              moveOnce();
              pos.sticky = "after";
            }
            break;
          }
          if (type) {
            sawType = type;
          }
          if (dir > 0 && !moveOnce(!first)) {
            break;
          }
        }
      }
      var result = skipAtomic(doc, pos, oldPos, origDir, true);
      if (equalCursorPos(oldPos, result)) {
        result.hitSide = true;
      }
      return result;
    }
    function findPosV(cm2, pos, dir, unit) {
      var doc = cm2.doc, x = pos.left, y;
      if (unit == "page") {
        var pageSize = Math.min(cm2.display.wrapper.clientHeight, window.innerHeight || document.documentElement.clientHeight);
        var moveAmount = Math.max(pageSize - 0.5 * textHeight(cm2.display), 3);
        y = (dir > 0 ? pos.bottom : pos.top) + dir * moveAmount;
      } else if (unit == "line") {
        y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
      }
      var target;
      for (; ; ) {
        target = coordsChar(cm2, x, y);
        if (!target.outside) {
          break;
        }
        if (dir < 0 ? y <= 0 : y >= doc.height) {
          target.hitSide = true;
          break;
        }
        y += dir * 5;
      }
      return target;
    }
    var ContentEditableInput = function(cm2) {
      this.cm = cm2;
      this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
      this.polling = new Delayed();
      this.composing = null;
      this.gracePeriod = false;
      this.readDOMTimeout = null;
    };
    ContentEditableInput.prototype.init = function(display) {
      var this$1$1 = this;
      var input = this, cm2 = input.cm;
      var div = input.div = display.lineDiv;
      div.contentEditable = true;
      disableBrowserMagic(div, cm2.options.spellcheck, cm2.options.autocorrect, cm2.options.autocapitalize);
      function belongsToInput(e) {
        for (var t = e.target; t; t = t.parentNode) {
          if (t == div) {
            return true;
          }
          if (/\bCodeMirror-(?:line)?widget\b/.test(t.className)) {
            break;
          }
        }
        return false;
      }
      on(div, "paste", function(e) {
        if (!belongsToInput(e) || signalDOMEvent(cm2, e) || handlePaste(e, cm2)) {
          return;
        }
        if (ie_version <= 11) {
          setTimeout(operation(cm2, function() {
            return this$1$1.updateFromDOM();
          }), 20);
        }
      });
      on(div, "compositionstart", function(e) {
        this$1$1.composing = { data: e.data, done: false };
      });
      on(div, "compositionupdate", function(e) {
        if (!this$1$1.composing) {
          this$1$1.composing = { data: e.data, done: false };
        }
      });
      on(div, "compositionend", function(e) {
        if (this$1$1.composing) {
          if (e.data != this$1$1.composing.data) {
            this$1$1.readFromDOMSoon();
          }
          this$1$1.composing.done = true;
        }
      });
      on(div, "touchstart", function() {
        return input.forceCompositionEnd();
      });
      on(div, "input", function() {
        if (!this$1$1.composing) {
          this$1$1.readFromDOMSoon();
        }
      });
      function onCopyCut(e) {
        if (!belongsToInput(e) || signalDOMEvent(cm2, e)) {
          return;
        }
        if (cm2.somethingSelected()) {
          setLastCopied({ lineWise: false, text: cm2.getSelections() });
          if (e.type == "cut") {
            cm2.replaceSelection("", null, "cut");
          }
        } else if (!cm2.options.lineWiseCopyCut) {
          return;
        } else {
          var ranges = copyableRanges(cm2);
          setLastCopied({ lineWise: true, text: ranges.text });
          if (e.type == "cut") {
            cm2.operation(function() {
              cm2.setSelections(ranges.ranges, 0, sel_dontScroll);
              cm2.replaceSelection("", null, "cut");
            });
          }
        }
        if (e.clipboardData) {
          e.clipboardData.clearData();
          var content = lastCopied.text.join("\n");
          e.clipboardData.setData("Text", content);
          if (e.clipboardData.getData("Text") == content) {
            e.preventDefault();
            return;
          }
        }
        var kludge = hiddenTextarea(), te = kludge.firstChild;
        cm2.display.lineSpace.insertBefore(kludge, cm2.display.lineSpace.firstChild);
        te.value = lastCopied.text.join("\n");
        var hadFocus = activeElt();
        selectInput(te);
        setTimeout(function() {
          cm2.display.lineSpace.removeChild(kludge);
          hadFocus.focus();
          if (hadFocus == div) {
            input.showPrimarySelection();
          }
        }, 50);
      }
      on(div, "copy", onCopyCut);
      on(div, "cut", onCopyCut);
    };
    ContentEditableInput.prototype.screenReaderLabelChanged = function(label) {
      if (label) {
        this.div.setAttribute("aria-label", label);
      } else {
        this.div.removeAttribute("aria-label");
      }
    };
    ContentEditableInput.prototype.prepareSelection = function() {
      var result = prepareSelection(this.cm, false);
      result.focus = activeElt() == this.div;
      return result;
    };
    ContentEditableInput.prototype.showSelection = function(info, takeFocus) {
      if (!info || !this.cm.display.view.length) {
        return;
      }
      if (info.focus || takeFocus) {
        this.showPrimarySelection();
      }
      this.showMultipleSelections(info);
    };
    ContentEditableInput.prototype.getSelection = function() {
      return this.cm.display.wrapper.ownerDocument.getSelection();
    };
    ContentEditableInput.prototype.showPrimarySelection = function() {
      var sel = this.getSelection(), cm2 = this.cm, prim = cm2.doc.sel.primary();
      var from = prim.from(), to = prim.to();
      if (cm2.display.viewTo == cm2.display.viewFrom || from.line >= cm2.display.viewTo || to.line < cm2.display.viewFrom) {
        sel.removeAllRanges();
        return;
      }
      var curAnchor = domToPos(cm2, sel.anchorNode, sel.anchorOffset);
      var curFocus = domToPos(cm2, sel.focusNode, sel.focusOffset);
      if (curAnchor && !curAnchor.bad && curFocus && !curFocus.bad && cmp(minPos(curAnchor, curFocus), from) == 0 && cmp(maxPos(curAnchor, curFocus), to) == 0) {
        return;
      }
      var view = cm2.display.view;
      var start = from.line >= cm2.display.viewFrom && posToDOM(cm2, from) || { node: view[0].measure.map[2], offset: 0 };
      var end = to.line < cm2.display.viewTo && posToDOM(cm2, to);
      if (!end) {
        var measure = view[view.length - 1].measure;
        var map2 = measure.maps ? measure.maps[measure.maps.length - 1] : measure.map;
        end = { node: map2[map2.length - 1], offset: map2[map2.length - 2] - map2[map2.length - 3] };
      }
      if (!start || !end) {
        sel.removeAllRanges();
        return;
      }
      var old = sel.rangeCount && sel.getRangeAt(0), rng;
      try {
        rng = range(start.node, start.offset, end.offset, end.node);
      } catch (e) {
      }
      if (rng) {
        if (!gecko && cm2.state.focused) {
          sel.collapse(start.node, start.offset);
          if (!rng.collapsed) {
            sel.removeAllRanges();
            sel.addRange(rng);
          }
        } else {
          sel.removeAllRanges();
          sel.addRange(rng);
        }
        if (old && sel.anchorNode == null) {
          sel.addRange(old);
        } else if (gecko) {
          this.startGracePeriod();
        }
      }
      this.rememberSelection();
    };
    ContentEditableInput.prototype.startGracePeriod = function() {
      var this$1$1 = this;
      clearTimeout(this.gracePeriod);
      this.gracePeriod = setTimeout(function() {
        this$1$1.gracePeriod = false;
        if (this$1$1.selectionChanged()) {
          this$1$1.cm.operation(function() {
            return this$1$1.cm.curOp.selectionChanged = true;
          });
        }
      }, 20);
    };
    ContentEditableInput.prototype.showMultipleSelections = function(info) {
      removeChildrenAndAdd(this.cm.display.cursorDiv, info.cursors);
      removeChildrenAndAdd(this.cm.display.selectionDiv, info.selection);
    };
    ContentEditableInput.prototype.rememberSelection = function() {
      var sel = this.getSelection();
      this.lastAnchorNode = sel.anchorNode;
      this.lastAnchorOffset = sel.anchorOffset;
      this.lastFocusNode = sel.focusNode;
      this.lastFocusOffset = sel.focusOffset;
    };
    ContentEditableInput.prototype.selectionInEditor = function() {
      var sel = this.getSelection();
      if (!sel.rangeCount) {
        return false;
      }
      var node = sel.getRangeAt(0).commonAncestorContainer;
      return contains(this.div, node);
    };
    ContentEditableInput.prototype.focus = function() {
      if (this.cm.options.readOnly != "nocursor") {
        if (!this.selectionInEditor() || activeElt() != this.div) {
          this.showSelection(this.prepareSelection(), true);
        }
        this.div.focus();
      }
    };
    ContentEditableInput.prototype.blur = function() {
      this.div.blur();
    };
    ContentEditableInput.prototype.getField = function() {
      return this.div;
    };
    ContentEditableInput.prototype.supportsTouch = function() {
      return true;
    };
    ContentEditableInput.prototype.receivedFocus = function() {
      var this$1$1 = this;
      var input = this;
      if (this.selectionInEditor()) {
        setTimeout(function() {
          return this$1$1.pollSelection();
        }, 20);
      } else {
        runInOp(this.cm, function() {
          return input.cm.curOp.selectionChanged = true;
        });
      }
      function poll() {
        if (input.cm.state.focused) {
          input.pollSelection();
          input.polling.set(input.cm.options.pollInterval, poll);
        }
      }
      this.polling.set(this.cm.options.pollInterval, poll);
    };
    ContentEditableInput.prototype.selectionChanged = function() {
      var sel = this.getSelection();
      return sel.anchorNode != this.lastAnchorNode || sel.anchorOffset != this.lastAnchorOffset || sel.focusNode != this.lastFocusNode || sel.focusOffset != this.lastFocusOffset;
    };
    ContentEditableInput.prototype.pollSelection = function() {
      if (this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged()) {
        return;
      }
      var sel = this.getSelection(), cm2 = this.cm;
      if (android && chrome && this.cm.display.gutterSpecs.length && isInGutter(sel.anchorNode)) {
        this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs });
        this.blur();
        this.focus();
        return;
      }
      if (this.composing) {
        return;
      }
      this.rememberSelection();
      var anchor = domToPos(cm2, sel.anchorNode, sel.anchorOffset);
      var head = domToPos(cm2, sel.focusNode, sel.focusOffset);
      if (anchor && head) {
        runInOp(cm2, function() {
          setSelection(cm2.doc, simpleSelection(anchor, head), sel_dontScroll);
          if (anchor.bad || head.bad) {
            cm2.curOp.selectionChanged = true;
          }
        });
      }
    };
    ContentEditableInput.prototype.pollContent = function() {
      if (this.readDOMTimeout != null) {
        clearTimeout(this.readDOMTimeout);
        this.readDOMTimeout = null;
      }
      var cm2 = this.cm, display = cm2.display, sel = cm2.doc.sel.primary();
      var from = sel.from(), to = sel.to();
      if (from.ch == 0 && from.line > cm2.firstLine()) {
        from = Pos(from.line - 1, getLine(cm2.doc, from.line - 1).length);
      }
      if (to.ch == getLine(cm2.doc, to.line).text.length && to.line < cm2.lastLine()) {
        to = Pos(to.line + 1, 0);
      }
      if (from.line < display.viewFrom || to.line > display.viewTo - 1) {
        return false;
      }
      var fromIndex, fromLine, fromNode;
      if (from.line == display.viewFrom || (fromIndex = findViewIndex(cm2, from.line)) == 0) {
        fromLine = lineNo(display.view[0].line);
        fromNode = display.view[0].node;
      } else {
        fromLine = lineNo(display.view[fromIndex].line);
        fromNode = display.view[fromIndex - 1].node.nextSibling;
      }
      var toIndex = findViewIndex(cm2, to.line);
      var toLine, toNode;
      if (toIndex == display.view.length - 1) {
        toLine = display.viewTo - 1;
        toNode = display.lineDiv.lastChild;
      } else {
        toLine = lineNo(display.view[toIndex + 1].line) - 1;
        toNode = display.view[toIndex + 1].node.previousSibling;
      }
      if (!fromNode) {
        return false;
      }
      var newText = cm2.doc.splitLines(domTextBetween(cm2, fromNode, toNode, fromLine, toLine));
      var oldText = getBetween(cm2.doc, Pos(fromLine, 0), Pos(toLine, getLine(cm2.doc, toLine).text.length));
      while (newText.length > 1 && oldText.length > 1) {
        if (lst(newText) == lst(oldText)) {
          newText.pop();
          oldText.pop();
          toLine--;
        } else if (newText[0] == oldText[0]) {
          newText.shift();
          oldText.shift();
          fromLine++;
        } else {
          break;
        }
      }
      var cutFront = 0, cutEnd = 0;
      var newTop = newText[0], oldTop = oldText[0], maxCutFront = Math.min(newTop.length, oldTop.length);
      while (cutFront < maxCutFront && newTop.charCodeAt(cutFront) == oldTop.charCodeAt(cutFront)) {
        ++cutFront;
      }
      var newBot = lst(newText), oldBot = lst(oldText);
      var maxCutEnd = Math.min(newBot.length - (newText.length == 1 ? cutFront : 0), oldBot.length - (oldText.length == 1 ? cutFront : 0));
      while (cutEnd < maxCutEnd && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
        ++cutEnd;
      }
      if (newText.length == 1 && oldText.length == 1 && fromLine == from.line) {
        while (cutFront && cutFront > from.ch && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
          cutFront--;
          cutEnd++;
        }
      }
      newText[newText.length - 1] = newBot.slice(0, newBot.length - cutEnd).replace(/^\u200b+/, "");
      newText[0] = newText[0].slice(cutFront).replace(/\u200b+$/, "");
      var chFrom = Pos(fromLine, cutFront);
      var chTo = Pos(toLine, oldText.length ? lst(oldText).length - cutEnd : 0);
      if (newText.length > 1 || newText[0] || cmp(chFrom, chTo)) {
        replaceRange(cm2.doc, newText, chFrom, chTo, "+input");
        return true;
      }
    };
    ContentEditableInput.prototype.ensurePolled = function() {
      this.forceCompositionEnd();
    };
    ContentEditableInput.prototype.reset = function() {
      this.forceCompositionEnd();
    };
    ContentEditableInput.prototype.forceCompositionEnd = function() {
      if (!this.composing) {
        return;
      }
      clearTimeout(this.readDOMTimeout);
      this.composing = null;
      this.updateFromDOM();
      this.div.blur();
      this.div.focus();
    };
    ContentEditableInput.prototype.readFromDOMSoon = function() {
      var this$1$1 = this;
      if (this.readDOMTimeout != null) {
        return;
      }
      this.readDOMTimeout = setTimeout(function() {
        this$1$1.readDOMTimeout = null;
        if (this$1$1.composing) {
          if (this$1$1.composing.done) {
            this$1$1.composing = null;
          } else {
            return;
          }
        }
        this$1$1.updateFromDOM();
      }, 80);
    };
    ContentEditableInput.prototype.updateFromDOM = function() {
      var this$1$1 = this;
      if (this.cm.isReadOnly() || !this.pollContent()) {
        runInOp(this.cm, function() {
          return regChange(this$1$1.cm);
        });
      }
    };
    ContentEditableInput.prototype.setUneditable = function(node) {
      node.contentEditable = "false";
    };
    ContentEditableInput.prototype.onKeyPress = function(e) {
      if (e.charCode == 0 || this.composing) {
        return;
      }
      e.preventDefault();
      if (!this.cm.isReadOnly()) {
        operation(this.cm, applyTextInput)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0);
      }
    };
    ContentEditableInput.prototype.readOnlyChanged = function(val) {
      this.div.contentEditable = String(val != "nocursor");
    };
    ContentEditableInput.prototype.onContextMenu = function() {
    };
    ContentEditableInput.prototype.resetPosition = function() {
    };
    ContentEditableInput.prototype.needsContentAttribute = true;
    function posToDOM(cm2, pos) {
      var view = findViewForLine(cm2, pos.line);
      if (!view || view.hidden) {
        return null;
      }
      var line = getLine(cm2.doc, pos.line);
      var info = mapFromLineView(view, line, pos.line);
      var order = getOrder(line, cm2.doc.direction), side = "left";
      if (order) {
        var partPos = getBidiPartAt(order, pos.ch);
        side = partPos % 2 ? "right" : "left";
      }
      var result = nodeAndOffsetInLineMap(info.map, pos.ch, side);
      result.offset = result.collapse == "right" ? result.end : result.start;
      return result;
    }
    function isInGutter(node) {
      for (var scan = node; scan; scan = scan.parentNode) {
        if (/CodeMirror-gutter-wrapper/.test(scan.className)) {
          return true;
        }
      }
      return false;
    }
    function badPos(pos, bad) {
      if (bad) {
        pos.bad = true;
      }
      return pos;
    }
    function domTextBetween(cm2, from, to, fromLine, toLine) {
      var text = "", closing = false, lineSep = cm2.doc.lineSeparator(), extraLinebreak = false;
      function recognizeMarker(id) {
        return function(marker) {
          return marker.id == id;
        };
      }
      function close() {
        if (closing) {
          text += lineSep;
          if (extraLinebreak) {
            text += lineSep;
          }
          closing = extraLinebreak = false;
        }
      }
      function addText(str) {
        if (str) {
          close();
          text += str;
        }
      }
      function walk(node) {
        if (node.nodeType == 1) {
          var cmText = node.getAttribute("cm-text");
          if (cmText) {
            addText(cmText);
            return;
          }
          var markerID = node.getAttribute("cm-marker"), range2;
          if (markerID) {
            var found = cm2.findMarks(Pos(fromLine, 0), Pos(toLine + 1, 0), recognizeMarker(+markerID));
            if (found.length && (range2 = found[0].find(0))) {
              addText(getBetween(cm2.doc, range2.from, range2.to).join(lineSep));
            }
            return;
          }
          if (node.getAttribute("contenteditable") == "false") {
            return;
          }
          var isBlock = /^(pre|div|p|li|table|br)$/i.test(node.nodeName);
          if (!/^br$/i.test(node.nodeName) && node.textContent.length == 0) {
            return;
          }
          if (isBlock) {
            close();
          }
          for (var i2 = 0; i2 < node.childNodes.length; i2++) {
            walk(node.childNodes[i2]);
          }
          if (/^(pre|p)$/i.test(node.nodeName)) {
            extraLinebreak = true;
          }
          if (isBlock) {
            closing = true;
          }
        } else if (node.nodeType == 3) {
          addText(node.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
        }
      }
      for (; ; ) {
        walk(from);
        if (from == to) {
          break;
        }
        from = from.nextSibling;
        extraLinebreak = false;
      }
      return text;
    }
    function domToPos(cm2, node, offset) {
      var lineNode;
      if (node == cm2.display.lineDiv) {
        lineNode = cm2.display.lineDiv.childNodes[offset];
        if (!lineNode) {
          return badPos(cm2.clipPos(Pos(cm2.display.viewTo - 1)), true);
        }
        node = null;
        offset = 0;
      } else {
        for (lineNode = node; ; lineNode = lineNode.parentNode) {
          if (!lineNode || lineNode == cm2.display.lineDiv) {
            return null;
          }
          if (lineNode.parentNode && lineNode.parentNode == cm2.display.lineDiv) {
            break;
          }
        }
      }
      for (var i2 = 0; i2 < cm2.display.view.length; i2++) {
        var lineView = cm2.display.view[i2];
        if (lineView.node == lineNode) {
          return locateNodeInLineView(lineView, node, offset);
        }
      }
    }
    function locateNodeInLineView(lineView, node, offset) {
      var wrapper = lineView.text.firstChild, bad = false;
      if (!node || !contains(wrapper, node)) {
        return badPos(Pos(lineNo(lineView.line), 0), true);
      }
      if (node == wrapper) {
        bad = true;
        node = wrapper.childNodes[offset];
        offset = 0;
        if (!node) {
          var line = lineView.rest ? lst(lineView.rest) : lineView.line;
          return badPos(Pos(lineNo(line), line.text.length), bad);
        }
      }
      var textNode = node.nodeType == 3 ? node : null, topNode = node;
      if (!textNode && node.childNodes.length == 1 && node.firstChild.nodeType == 3) {
        textNode = node.firstChild;
        if (offset) {
          offset = textNode.nodeValue.length;
        }
      }
      while (topNode.parentNode != wrapper) {
        topNode = topNode.parentNode;
      }
      var measure = lineView.measure, maps = measure.maps;
      function find(textNode2, topNode2, offset2) {
        for (var i2 = -1; i2 < (maps ? maps.length : 0); i2++) {
          var map2 = i2 < 0 ? measure.map : maps[i2];
          for (var j = 0; j < map2.length; j += 3) {
            var curNode = map2[j + 2];
            if (curNode == textNode2 || curNode == topNode2) {
              var line2 = lineNo(i2 < 0 ? lineView.line : lineView.rest[i2]);
              var ch = map2[j] + offset2;
              if (offset2 < 0 || curNode != textNode2) {
                ch = map2[j + (offset2 ? 1 : 0)];
              }
              return Pos(line2, ch);
            }
          }
        }
      }
      var found = find(textNode, topNode, offset);
      if (found) {
        return badPos(found, bad);
      }
      for (var after = topNode.nextSibling, dist = textNode ? textNode.nodeValue.length - offset : 0; after; after = after.nextSibling) {
        found = find(after, after.firstChild, 0);
        if (found) {
          return badPos(Pos(found.line, found.ch - dist), bad);
        } else {
          dist += after.textContent.length;
        }
      }
      for (var before = topNode.previousSibling, dist$1 = offset; before; before = before.previousSibling) {
        found = find(before, before.firstChild, -1);
        if (found) {
          return badPos(Pos(found.line, found.ch + dist$1), bad);
        } else {
          dist$1 += before.textContent.length;
        }
      }
    }
    var TextareaInput = function(cm2) {
      this.cm = cm2;
      this.prevInput = "";
      this.pollingFast = false;
      this.polling = new Delayed();
      this.hasSelection = false;
      this.composing = null;
    };
    TextareaInput.prototype.init = function(display) {
      var this$1$1 = this;
      var input = this, cm2 = this.cm;
      this.createField(display);
      var te = this.textarea;
      display.wrapper.insertBefore(this.wrapper, display.wrapper.firstChild);
      if (ios) {
        te.style.width = "0px";
      }
      on(te, "input", function() {
        if (ie && ie_version >= 9 && this$1$1.hasSelection) {
          this$1$1.hasSelection = null;
        }
        input.poll();
      });
      on(te, "paste", function(e) {
        if (signalDOMEvent(cm2, e) || handlePaste(e, cm2)) {
          return;
        }
        cm2.state.pasteIncoming = +new Date();
        input.fastPoll();
      });
      function prepareCopyCut(e) {
        if (signalDOMEvent(cm2, e)) {
          return;
        }
        if (cm2.somethingSelected()) {
          setLastCopied({ lineWise: false, text: cm2.getSelections() });
        } else if (!cm2.options.lineWiseCopyCut) {
          return;
        } else {
          var ranges = copyableRanges(cm2);
          setLastCopied({ lineWise: true, text: ranges.text });
          if (e.type == "cut") {
            cm2.setSelections(ranges.ranges, null, sel_dontScroll);
          } else {
            input.prevInput = "";
            te.value = ranges.text.join("\n");
            selectInput(te);
          }
        }
        if (e.type == "cut") {
          cm2.state.cutIncoming = +new Date();
        }
      }
      on(te, "cut", prepareCopyCut);
      on(te, "copy", prepareCopyCut);
      on(display.scroller, "paste", function(e) {
        if (eventInWidget(display, e) || signalDOMEvent(cm2, e)) {
          return;
        }
        if (!te.dispatchEvent) {
          cm2.state.pasteIncoming = +new Date();
          input.focus();
          return;
        }
        var event = new Event("paste");
        event.clipboardData = e.clipboardData;
        te.dispatchEvent(event);
      });
      on(display.lineSpace, "selectstart", function(e) {
        if (!eventInWidget(display, e)) {
          e_preventDefault(e);
        }
      });
      on(te, "compositionstart", function() {
        var start = cm2.getCursor("from");
        if (input.composing) {
          input.composing.range.clear();
        }
        input.composing = {
          start,
          range: cm2.markText(start, cm2.getCursor("to"), { className: "CodeMirror-composing" })
        };
      });
      on(te, "compositionend", function() {
        if (input.composing) {
          input.poll();
          input.composing.range.clear();
          input.composing = null;
        }
      });
    };
    TextareaInput.prototype.createField = function(_display) {
      this.wrapper = hiddenTextarea();
      this.textarea = this.wrapper.firstChild;
    };
    TextareaInput.prototype.screenReaderLabelChanged = function(label) {
      if (label) {
        this.textarea.setAttribute("aria-label", label);
      } else {
        this.textarea.removeAttribute("aria-label");
      }
    };
    TextareaInput.prototype.prepareSelection = function() {
      var cm2 = this.cm, display = cm2.display, doc = cm2.doc;
      var result = prepareSelection(cm2);
      if (cm2.options.moveInputWithCursor) {
        var headPos = cursorCoords(cm2, doc.sel.primary().head, "div");
        var wrapOff = display.wrapper.getBoundingClientRect(), lineOff = display.lineDiv.getBoundingClientRect();
        result.teTop = Math.max(0, Math.min(display.wrapper.clientHeight - 10, headPos.top + lineOff.top - wrapOff.top));
        result.teLeft = Math.max(0, Math.min(display.wrapper.clientWidth - 10, headPos.left + lineOff.left - wrapOff.left));
      }
      return result;
    };
    TextareaInput.prototype.showSelection = function(drawn) {
      var cm2 = this.cm, display = cm2.display;
      removeChildrenAndAdd(display.cursorDiv, drawn.cursors);
      removeChildrenAndAdd(display.selectionDiv, drawn.selection);
      if (drawn.teTop != null) {
        this.wrapper.style.top = drawn.teTop + "px";
        this.wrapper.style.left = drawn.teLeft + "px";
      }
    };
    TextareaInput.prototype.reset = function(typing) {
      if (this.contextMenuPending || this.composing) {
        return;
      }
      var cm2 = this.cm;
      if (cm2.somethingSelected()) {
        this.prevInput = "";
        var content = cm2.getSelection();
        this.textarea.value = content;
        if (cm2.state.focused) {
          selectInput(this.textarea);
        }
        if (ie && ie_version >= 9) {
          this.hasSelection = content;
        }
      } else if (!typing) {
        this.prevInput = this.textarea.value = "";
        if (ie && ie_version >= 9) {
          this.hasSelection = null;
        }
      }
    };
    TextareaInput.prototype.getField = function() {
      return this.textarea;
    };
    TextareaInput.prototype.supportsTouch = function() {
      return false;
    };
    TextareaInput.prototype.focus = function() {
      if (this.cm.options.readOnly != "nocursor" && (!mobile || activeElt() != this.textarea)) {
        try {
          this.textarea.focus();
        } catch (e) {
        }
      }
    };
    TextareaInput.prototype.blur = function() {
      this.textarea.blur();
    };
    TextareaInput.prototype.resetPosition = function() {
      this.wrapper.style.top = this.wrapper.style.left = 0;
    };
    TextareaInput.prototype.receivedFocus = function() {
      this.slowPoll();
    };
    TextareaInput.prototype.slowPoll = function() {
      var this$1$1 = this;
      if (this.pollingFast) {
        return;
      }
      this.polling.set(this.cm.options.pollInterval, function() {
        this$1$1.poll();
        if (this$1$1.cm.state.focused) {
          this$1$1.slowPoll();
        }
      });
    };
    TextareaInput.prototype.fastPoll = function() {
      var missed = false, input = this;
      input.pollingFast = true;
      function p() {
        var changed = input.poll();
        if (!changed && !missed) {
          missed = true;
          input.polling.set(60, p);
        } else {
          input.pollingFast = false;
          input.slowPoll();
        }
      }
      input.polling.set(20, p);
    };
    TextareaInput.prototype.poll = function() {
      var this$1$1 = this;
      var cm2 = this.cm, input = this.textarea, prevInput = this.prevInput;
      if (this.contextMenuPending || !cm2.state.focused || hasSelection(input) && !prevInput && !this.composing || cm2.isReadOnly() || cm2.options.disableInput || cm2.state.keySeq) {
        return false;
      }
      var text = input.value;
      if (text == prevInput && !cm2.somethingSelected()) {
        return false;
      }
      if (ie && ie_version >= 9 && this.hasSelection === text || mac && /[\uf700-\uf7ff]/.test(text)) {
        cm2.display.input.reset();
        return false;
      }
      if (cm2.doc.sel == cm2.display.selForContextMenu) {
        var first = text.charCodeAt(0);
        if (first == 8203 && !prevInput) {
          prevInput = "\u200B";
        }
        if (first == 8666) {
          this.reset();
          return this.cm.execCommand("undo");
        }
      }
      var same = 0, l = Math.min(prevInput.length, text.length);
      while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same)) {
        ++same;
      }
      runInOp(cm2, function() {
        applyTextInput(cm2, text.slice(same), prevInput.length - same, null, this$1$1.composing ? "*compose" : null);
        if (text.length > 1e3 || text.indexOf("\n") > -1) {
          input.value = this$1$1.prevInput = "";
        } else {
          this$1$1.prevInput = text;
        }
        if (this$1$1.composing) {
          this$1$1.composing.range.clear();
          this$1$1.composing.range = cm2.markText(this$1$1.composing.start, cm2.getCursor("to"), { className: "CodeMirror-composing" });
        }
      });
      return true;
    };
    TextareaInput.prototype.ensurePolled = function() {
      if (this.pollingFast && this.poll()) {
        this.pollingFast = false;
      }
    };
    TextareaInput.prototype.onKeyPress = function() {
      if (ie && ie_version >= 9) {
        this.hasSelection = null;
      }
      this.fastPoll();
    };
    TextareaInput.prototype.onContextMenu = function(e) {
      var input = this, cm2 = input.cm, display = cm2.display, te = input.textarea;
      if (input.contextMenuPending) {
        input.contextMenuPending();
      }
      var pos = posFromMouse(cm2, e), scrollPos = display.scroller.scrollTop;
      if (!pos || presto) {
        return;
      }
      var reset = cm2.options.resetSelectionOnContextMenu;
      if (reset && cm2.doc.sel.contains(pos) == -1) {
        operation(cm2, setSelection)(cm2.doc, simpleSelection(pos), sel_dontScroll);
      }
      var oldCSS = te.style.cssText, oldWrapperCSS = input.wrapper.style.cssText;
      var wrapperBox = input.wrapper.offsetParent.getBoundingClientRect();
      input.wrapper.style.cssText = "position: static";
      te.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - wrapperBox.top - 5) + "px; left: " + (e.clientX - wrapperBox.left - 5) + "px;\n      z-index: 1000; background: " + (ie ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
      var oldScrollY;
      if (webkit) {
        oldScrollY = window.scrollY;
      }
      display.input.focus();
      if (webkit) {
        window.scrollTo(null, oldScrollY);
      }
      display.input.reset();
      if (!cm2.somethingSelected()) {
        te.value = input.prevInput = " ";
      }
      input.contextMenuPending = rehide;
      display.selForContextMenu = cm2.doc.sel;
      clearTimeout(display.detectingSelectAll);
      function prepareSelectAllHack() {
        if (te.selectionStart != null) {
          var selected = cm2.somethingSelected();
          var extval = "\u200B" + (selected ? te.value : "");
          te.value = "\u21DA";
          te.value = extval;
          input.prevInput = selected ? "" : "\u200B";
          te.selectionStart = 1;
          te.selectionEnd = extval.length;
          display.selForContextMenu = cm2.doc.sel;
        }
      }
      function rehide() {
        if (input.contextMenuPending != rehide) {
          return;
        }
        input.contextMenuPending = false;
        input.wrapper.style.cssText = oldWrapperCSS;
        te.style.cssText = oldCSS;
        if (ie && ie_version < 9) {
          display.scrollbars.setScrollTop(display.scroller.scrollTop = scrollPos);
        }
        if (te.selectionStart != null) {
          if (!ie || ie && ie_version < 9) {
            prepareSelectAllHack();
          }
          var i2 = 0, poll = function() {
            if (display.selForContextMenu == cm2.doc.sel && te.selectionStart == 0 && te.selectionEnd > 0 && input.prevInput == "\u200B") {
              operation(cm2, selectAll)(cm2);
            } else if (i2++ < 10) {
              display.detectingSelectAll = setTimeout(poll, 500);
            } else {
              display.selForContextMenu = null;
              display.input.reset();
            }
          };
          display.detectingSelectAll = setTimeout(poll, 200);
        }
      }
      if (ie && ie_version >= 9) {
        prepareSelectAllHack();
      }
      if (captureRightClick) {
        e_stop(e);
        var mouseup = function() {
          off(window, "mouseup", mouseup);
          setTimeout(rehide, 20);
        };
        on(window, "mouseup", mouseup);
      } else {
        setTimeout(rehide, 50);
      }
    };
    TextareaInput.prototype.readOnlyChanged = function(val) {
      if (!val) {
        this.reset();
      }
      this.textarea.disabled = val == "nocursor";
      this.textarea.readOnly = !!val;
    };
    TextareaInput.prototype.setUneditable = function() {
    };
    TextareaInput.prototype.needsContentAttribute = false;
    function fromTextArea(textarea, options) {
      options = options ? copyObj(options) : {};
      options.value = textarea.value;
      if (!options.tabindex && textarea.tabIndex) {
        options.tabindex = textarea.tabIndex;
      }
      if (!options.placeholder && textarea.placeholder) {
        options.placeholder = textarea.placeholder;
      }
      if (options.autofocus == null) {
        var hasFocus = activeElt();
        options.autofocus = hasFocus == textarea || textarea.getAttribute("autofocus") != null && hasFocus == document.body;
      }
      function save() {
        textarea.value = cm2.getValue();
      }
      var realSubmit;
      if (textarea.form) {
        on(textarea.form, "submit", save);
        if (!options.leaveSubmitMethodAlone) {
          var form = textarea.form;
          realSubmit = form.submit;
          try {
            var wrappedSubmit = form.submit = function() {
              save();
              form.submit = realSubmit;
              form.submit();
              form.submit = wrappedSubmit;
            };
          } catch (e) {
          }
        }
      }
      options.finishInit = function(cm3) {
        cm3.save = save;
        cm3.getTextArea = function() {
          return textarea;
        };
        cm3.toTextArea = function() {
          cm3.toTextArea = isNaN;
          save();
          textarea.parentNode.removeChild(cm3.getWrapperElement());
          textarea.style.display = "";
          if (textarea.form) {
            off(textarea.form, "submit", save);
            if (!options.leaveSubmitMethodAlone && typeof textarea.form.submit == "function") {
              textarea.form.submit = realSubmit;
            }
          }
        };
      };
      textarea.style.display = "none";
      var cm2 = CodeMirror(function(node) {
        return textarea.parentNode.insertBefore(node, textarea.nextSibling);
      }, options);
      return cm2;
    }
    function addLegacyProps(CodeMirror2) {
      CodeMirror2.off = off;
      CodeMirror2.on = on;
      CodeMirror2.wheelEventPixels = wheelEventPixels;
      CodeMirror2.Doc = Doc;
      CodeMirror2.splitLines = splitLinesAuto;
      CodeMirror2.countColumn = countColumn;
      CodeMirror2.findColumn = findColumn;
      CodeMirror2.isWordChar = isWordCharBasic;
      CodeMirror2.Pass = Pass;
      CodeMirror2.signal = signal;
      CodeMirror2.Line = Line;
      CodeMirror2.changeEnd = changeEnd;
      CodeMirror2.scrollbarModel = scrollbarModel;
      CodeMirror2.Pos = Pos;
      CodeMirror2.cmpPos = cmp;
      CodeMirror2.modes = modes;
      CodeMirror2.mimeModes = mimeModes;
      CodeMirror2.resolveMode = resolveMode;
      CodeMirror2.getMode = getMode;
      CodeMirror2.modeExtensions = modeExtensions;
      CodeMirror2.extendMode = extendMode;
      CodeMirror2.copyState = copyState;
      CodeMirror2.startState = startState;
      CodeMirror2.innerMode = innerMode;
      CodeMirror2.commands = commands;
      CodeMirror2.keyMap = keyMap;
      CodeMirror2.keyName = keyName;
      CodeMirror2.isModifierKey = isModifierKey;
      CodeMirror2.lookupKey = lookupKey;
      CodeMirror2.normalizeKeyMap = normalizeKeyMap;
      CodeMirror2.StringStream = StringStream;
      CodeMirror2.SharedTextMarker = SharedTextMarker;
      CodeMirror2.TextMarker = TextMarker;
      CodeMirror2.LineWidget = LineWidget;
      CodeMirror2.e_preventDefault = e_preventDefault;
      CodeMirror2.e_stopPropagation = e_stopPropagation;
      CodeMirror2.e_stop = e_stop;
      CodeMirror2.addClass = addClass;
      CodeMirror2.contains = contains;
      CodeMirror2.rmClass = rmClass;
      CodeMirror2.keyNames = keyNames;
    }
    defineOptions(CodeMirror);
    addEditorMethods(CodeMirror);
    var dontDelegate = "iter insert remove copy getEditor constructor".split(" ");
    for (var prop in Doc.prototype) {
      if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0) {
        CodeMirror.prototype[prop] = function(method) {
          return function() {
            return method.apply(this.doc, arguments);
          };
        }(Doc.prototype[prop]);
      }
    }
    eventMixin(Doc);
    CodeMirror.inputStyles = { "textarea": TextareaInput, "contenteditable": ContentEditableInput };
    CodeMirror.defineMode = function(name) {
      if (!CodeMirror.defaults.mode && name != "null") {
        CodeMirror.defaults.mode = name;
      }
      defineMode.apply(this, arguments);
    };
    CodeMirror.defineMIME = defineMIME;
    CodeMirror.defineMode("null", function() {
      return { token: function(stream) {
        return stream.skipToEnd();
      } };
    });
    CodeMirror.defineMIME("text/plain", "null");
    CodeMirror.defineExtension = function(name, func) {
      CodeMirror.prototype[name] = func;
    };
    CodeMirror.defineDocExtension = function(name, func) {
      Doc.prototype[name] = func;
    };
    CodeMirror.fromTextArea = fromTextArea;
    addLegacyProps(CodeMirror);
    CodeMirror.version = "5.63.3";
    return CodeMirror;
  });
})(codemirror);
(function(module, exports) {
  (function(mod) {
    mod(codemirror.exports);
  })(function(CodeMirror) {
    var htmlConfig = {
      autoSelfClosers: {
        "area": true,
        "base": true,
        "br": true,
        "col": true,
        "command": true,
        "embed": true,
        "frame": true,
        "hr": true,
        "img": true,
        "input": true,
        "keygen": true,
        "link": true,
        "meta": true,
        "param": true,
        "source": true,
        "track": true,
        "wbr": true,
        "menuitem": true
      },
      implicitlyClosed: {
        "dd": true,
        "li": true,
        "optgroup": true,
        "option": true,
        "p": true,
        "rp": true,
        "rt": true,
        "tbody": true,
        "td": true,
        "tfoot": true,
        "th": true,
        "tr": true
      },
      contextGrabbers: {
        "dd": { "dd": true, "dt": true },
        "dt": { "dd": true, "dt": true },
        "li": { "li": true },
        "option": { "option": true, "optgroup": true },
        "optgroup": { "optgroup": true },
        "p": {
          "address": true,
          "article": true,
          "aside": true,
          "blockquote": true,
          "dir": true,
          "div": true,
          "dl": true,
          "fieldset": true,
          "footer": true,
          "form": true,
          "h1": true,
          "h2": true,
          "h3": true,
          "h4": true,
          "h5": true,
          "h6": true,
          "header": true,
          "hgroup": true,
          "hr": true,
          "menu": true,
          "nav": true,
          "ol": true,
          "p": true,
          "pre": true,
          "section": true,
          "table": true,
          "ul": true
        },
        "rp": { "rp": true, "rt": true },
        "rt": { "rp": true, "rt": true },
        "tbody": { "tbody": true, "tfoot": true },
        "td": { "td": true, "th": true },
        "tfoot": { "tbody": true },
        "th": { "td": true, "th": true },
        "thead": { "tbody": true, "tfoot": true },
        "tr": { "tr": true }
      },
      doNotIndent: { "pre": true },
      allowUnquoted: true,
      allowMissing: true,
      caseFold: true
    };
    var xmlConfig = {
      autoSelfClosers: {},
      implicitlyClosed: {},
      contextGrabbers: {},
      doNotIndent: {},
      allowUnquoted: false,
      allowMissing: false,
      allowMissingTagName: false,
      caseFold: false
    };
    CodeMirror.defineMode("xml", function(editorConf, config_) {
      var indentUnit = editorConf.indentUnit;
      var config = {};
      var defaults = config_.htmlMode ? htmlConfig : xmlConfig;
      for (var prop in defaults)
        config[prop] = defaults[prop];
      for (var prop in config_)
        config[prop] = config_[prop];
      var type, setStyle;
      function inText(stream, state) {
        function chain(parser) {
          state.tokenize = parser;
          return parser(stream, state);
        }
        var ch = stream.next();
        if (ch == "<") {
          if (stream.eat("!")) {
            if (stream.eat("[")) {
              if (stream.match("CDATA["))
                return chain(inBlock("atom", "]]>"));
              else
                return null;
            } else if (stream.match("--")) {
              return chain(inBlock("comment", "-->"));
            } else if (stream.match("DOCTYPE", true, true)) {
              stream.eatWhile(/[\w\._\-]/);
              return chain(doctype(1));
            } else {
              return null;
            }
          } else if (stream.eat("?")) {
            stream.eatWhile(/[\w\._\-]/);
            state.tokenize = inBlock("meta", "?>");
            return "meta";
          } else {
            type = stream.eat("/") ? "closeTag" : "openTag";
            state.tokenize = inTag;
            return "tag bracket";
          }
        } else if (ch == "&") {
          var ok;
          if (stream.eat("#")) {
            if (stream.eat("x")) {
              ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
            } else {
              ok = stream.eatWhile(/[\d]/) && stream.eat(";");
            }
          } else {
            ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
          }
          return ok ? "atom" : "error";
        } else {
          stream.eatWhile(/[^&<]/);
          return null;
        }
      }
      inText.isInText = true;
      function inTag(stream, state) {
        var ch = stream.next();
        if (ch == ">" || ch == "/" && stream.eat(">")) {
          state.tokenize = inText;
          type = ch == ">" ? "endTag" : "selfcloseTag";
          return "tag bracket";
        } else if (ch == "=") {
          type = "equals";
          return null;
        } else if (ch == "<") {
          state.tokenize = inText;
          state.state = baseState;
          state.tagName = state.tagStart = null;
          var next = state.tokenize(stream, state);
          return next ? next + " tag error" : "tag error";
        } else if (/[\'\"]/.test(ch)) {
          state.tokenize = inAttribute(ch);
          state.stringStartCol = stream.column();
          return state.tokenize(stream, state);
        } else {
          stream.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/);
          return "word";
        }
      }
      function inAttribute(quote) {
        var closure = function(stream, state) {
          while (!stream.eol()) {
            if (stream.next() == quote) {
              state.tokenize = inTag;
              break;
            }
          }
          return "string";
        };
        closure.isInAttribute = true;
        return closure;
      }
      function inBlock(style, terminator) {
        return function(stream, state) {
          while (!stream.eol()) {
            if (stream.match(terminator)) {
              state.tokenize = inText;
              break;
            }
            stream.next();
          }
          return style;
        };
      }
      function doctype(depth) {
        return function(stream, state) {
          var ch;
          while ((ch = stream.next()) != null) {
            if (ch == "<") {
              state.tokenize = doctype(depth + 1);
              return state.tokenize(stream, state);
            } else if (ch == ">") {
              if (depth == 1) {
                state.tokenize = inText;
                break;
              } else {
                state.tokenize = doctype(depth - 1);
                return state.tokenize(stream, state);
              }
            }
          }
          return "meta";
        };
      }
      function lower(tagName) {
        return tagName && tagName.toLowerCase();
      }
      function Context(state, tagName, startOfLine) {
        this.prev = state.context;
        this.tagName = tagName || "";
        this.indent = state.indented;
        this.startOfLine = startOfLine;
        if (config.doNotIndent.hasOwnProperty(tagName) || state.context && state.context.noIndent)
          this.noIndent = true;
      }
      function popContext(state) {
        if (state.context)
          state.context = state.context.prev;
      }
      function maybePopContext(state, nextTagName) {
        var parentTagName;
        while (true) {
          if (!state.context) {
            return;
          }
          parentTagName = state.context.tagName;
          if (!config.contextGrabbers.hasOwnProperty(lower(parentTagName)) || !config.contextGrabbers[lower(parentTagName)].hasOwnProperty(lower(nextTagName))) {
            return;
          }
          popContext(state);
        }
      }
      function baseState(type2, stream, state) {
        if (type2 == "openTag") {
          state.tagStart = stream.column();
          return tagNameState;
        } else if (type2 == "closeTag") {
          return closeTagNameState;
        } else {
          return baseState;
        }
      }
      function tagNameState(type2, stream, state) {
        if (type2 == "word") {
          state.tagName = stream.current();
          setStyle = "tag";
          return attrState;
        } else if (config.allowMissingTagName && type2 == "endTag") {
          setStyle = "tag bracket";
          return attrState(type2, stream, state);
        } else {
          setStyle = "error";
          return tagNameState;
        }
      }
      function closeTagNameState(type2, stream, state) {
        if (type2 == "word") {
          var tagName = stream.current();
          if (state.context && state.context.tagName != tagName && config.implicitlyClosed.hasOwnProperty(lower(state.context.tagName)))
            popContext(state);
          if (state.context && state.context.tagName == tagName || config.matchClosing === false) {
            setStyle = "tag";
            return closeState;
          } else {
            setStyle = "tag error";
            return closeStateErr;
          }
        } else if (config.allowMissingTagName && type2 == "endTag") {
          setStyle = "tag bracket";
          return closeState(type2, stream, state);
        } else {
          setStyle = "error";
          return closeStateErr;
        }
      }
      function closeState(type2, _stream, state) {
        if (type2 != "endTag") {
          setStyle = "error";
          return closeState;
        }
        popContext(state);
        return baseState;
      }
      function closeStateErr(type2, stream, state) {
        setStyle = "error";
        return closeState(type2, stream, state);
      }
      function attrState(type2, _stream, state) {
        if (type2 == "word") {
          setStyle = "attribute";
          return attrEqState;
        } else if (type2 == "endTag" || type2 == "selfcloseTag") {
          var tagName = state.tagName, tagStart = state.tagStart;
          state.tagName = state.tagStart = null;
          if (type2 == "selfcloseTag" || config.autoSelfClosers.hasOwnProperty(lower(tagName))) {
            maybePopContext(state, tagName);
          } else {
            maybePopContext(state, tagName);
            state.context = new Context(state, tagName, tagStart == state.indented);
          }
          return baseState;
        }
        setStyle = "error";
        return attrState;
      }
      function attrEqState(type2, stream, state) {
        if (type2 == "equals")
          return attrValueState;
        if (!config.allowMissing)
          setStyle = "error";
        return attrState(type2, stream, state);
      }
      function attrValueState(type2, stream, state) {
        if (type2 == "string")
          return attrContinuedState;
        if (type2 == "word" && config.allowUnquoted) {
          setStyle = "string";
          return attrState;
        }
        setStyle = "error";
        return attrState(type2, stream, state);
      }
      function attrContinuedState(type2, stream, state) {
        if (type2 == "string")
          return attrContinuedState;
        return attrState(type2, stream, state);
      }
      return {
        startState: function(baseIndent) {
          var state = {
            tokenize: inText,
            state: baseState,
            indented: baseIndent || 0,
            tagName: null,
            tagStart: null,
            context: null
          };
          if (baseIndent != null)
            state.baseIndent = baseIndent;
          return state;
        },
        token: function(stream, state) {
          if (!state.tagName && stream.sol())
            state.indented = stream.indentation();
          if (stream.eatSpace())
            return null;
          type = null;
          var style = state.tokenize(stream, state);
          if ((style || type) && style != "comment") {
            setStyle = null;
            state.state = state.state(type || style, stream, state);
            if (setStyle)
              style = setStyle == "error" ? style + " error" : setStyle;
          }
          return style;
        },
        indent: function(state, textAfter, fullLine) {
          var context = state.context;
          if (state.tokenize.isInAttribute) {
            if (state.tagStart == state.indented)
              return state.stringStartCol + 1;
            else
              return state.indented + indentUnit;
          }
          if (context && context.noIndent)
            return CodeMirror.Pass;
          if (state.tokenize != inTag && state.tokenize != inText)
            return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
          if (state.tagName) {
            if (config.multilineTagIndentPastTag !== false)
              return state.tagStart + state.tagName.length + 2;
            else
              return state.tagStart + indentUnit * (config.multilineTagIndentFactor || 1);
          }
          if (config.alignCDATA && /<!\[CDATA\[/.test(textAfter))
            return 0;
          var tagAfter = textAfter && /^<(\/)?([\w_:\.-]*)/.exec(textAfter);
          if (tagAfter && tagAfter[1]) {
            while (context) {
              if (context.tagName == tagAfter[2]) {
                context = context.prev;
                break;
              } else if (config.implicitlyClosed.hasOwnProperty(lower(context.tagName))) {
                context = context.prev;
              } else {
                break;
              }
            }
          } else if (tagAfter) {
            while (context) {
              var grabbers = config.contextGrabbers[lower(context.tagName)];
              if (grabbers && grabbers.hasOwnProperty(lower(tagAfter[2])))
                context = context.prev;
              else
                break;
            }
          }
          while (context && context.prev && !context.startOfLine)
            context = context.prev;
          if (context)
            return context.indent + indentUnit;
          else
            return state.baseIndent || 0;
        },
        electricInput: /<\/[\s\w:]+>$/,
        blockCommentStart: "<!--",
        blockCommentEnd: "-->",
        configuration: config.htmlMode ? "html" : "xml",
        helperType: config.htmlMode ? "html" : "xml",
        skipAttribute: function(state) {
          if (state.state == attrValueState)
            state.state = attrState;
        },
        xmlCurrentTag: function(state) {
          return state.tagName ? { name: state.tagName, close: state.type == "closeTag" } : null;
        },
        xmlCurrentContext: function(state) {
          var context = [];
          for (var cx = state.context; cx; cx = cx.prev)
            context.push(cx.tagName);
          return context.reverse();
        }
      };
    });
    CodeMirror.defineMIME("text/xml", "xml");
    CodeMirror.defineMIME("application/xml", "xml");
    if (!CodeMirror.mimeModes.hasOwnProperty("text/html"))
      CodeMirror.defineMIME("text/html", { name: "xml", htmlMode: true });
  });
})();
var reactCodemirror2 = {};
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
var __extends = function() {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2) {
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
      }
    };
    return _extendStatics(d, b);
  };
  return function(d, b) {
    _extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
Object.defineProperty(reactCodemirror2, "__esModule", {
  value: true
});
reactCodemirror2.UnControlled = Controlled_1 = reactCodemirror2.Controlled = void 0;
var React = React__default;
var SERVER_RENDERED = typeof navigator === "undefined" || commonjsGlobal["PREVENT_CODEMIRROR_RENDER"] === true;
var cm;
if (!SERVER_RENDERED) {
  cm = codemirror.exports;
}
var Helper = function() {
  function Helper2() {
  }
  Helper2.equals = function(x, y) {
    var _this = this;
    var ok = Object.keys, tx = _typeof(x), ty = _typeof(y);
    return x && y && tx === "object" && tx === ty ? ok(x).length === ok(y).length && ok(x).every(function(key) {
      return _this.equals(x[key], y[key]);
    }) : x === y;
  };
  return Helper2;
}();
var Shared = function() {
  function Shared2(editor, props) {
    this.editor = editor;
    this.props = props;
  }
  Shared2.prototype.delegateCursor = function(position, scroll, focus) {
    var doc = this.editor.getDoc();
    if (focus) {
      this.editor.focus();
    }
    scroll ? doc.setCursor(position) : doc.setCursor(position, null, {
      scroll: false
    });
  };
  Shared2.prototype.delegateScroll = function(coordinates) {
    this.editor.scrollTo(coordinates.x, coordinates.y);
  };
  Shared2.prototype.delegateSelection = function(ranges, focus) {
    var doc = this.editor.getDoc();
    doc.setSelections(ranges);
    if (focus) {
      this.editor.focus();
    }
  };
  Shared2.prototype.apply = function(props) {
    if (props && props.selection && props.selection.ranges) {
      this.delegateSelection(props.selection.ranges, props.selection.focus || false);
    }
    if (props && props.cursor) {
      this.delegateCursor(props.cursor, props.autoScroll || false, this.editor.getOption("autofocus") || false);
    }
    if (props && props.scroll) {
      this.delegateScroll(props.scroll);
    }
  };
  Shared2.prototype.applyNext = function(props, next, preserved) {
    if (props && props.selection && props.selection.ranges) {
      if (next && next.selection && next.selection.ranges && !Helper.equals(props.selection.ranges, next.selection.ranges)) {
        this.delegateSelection(next.selection.ranges, next.selection.focus || false);
      }
    }
    if (props && props.cursor) {
      if (next && next.cursor && !Helper.equals(props.cursor, next.cursor)) {
        this.delegateCursor(preserved.cursor || next.cursor, next.autoScroll || false, next.autoCursor || false);
      }
    }
    if (props && props.scroll) {
      if (next && next.scroll && !Helper.equals(props.scroll, next.scroll)) {
        this.delegateScroll(next.scroll);
      }
    }
  };
  Shared2.prototype.applyUserDefined = function(props, preserved) {
    if (preserved && preserved.cursor) {
      this.delegateCursor(preserved.cursor, props.autoScroll || false, this.editor.getOption("autofocus") || false);
    }
  };
  Shared2.prototype.wire = function(props) {
    var _this = this;
    Object.keys(props || {}).filter(function(p) {
      return /^on/.test(p);
    }).forEach(function(prop) {
      switch (prop) {
        case "onBlur":
          {
            _this.editor.on("blur", function(cm2, event) {
              _this.props.onBlur(_this.editor, event);
            });
          }
          break;
        case "onContextMenu": {
          _this.editor.on("contextmenu", function(cm2, event) {
            _this.props.onContextMenu(_this.editor, event);
          });
          break;
        }
        case "onCopy": {
          _this.editor.on("copy", function(cm2, event) {
            _this.props.onCopy(_this.editor, event);
          });
          break;
        }
        case "onCursor":
          {
            _this.editor.on("cursorActivity", function(cm2) {
              _this.props.onCursor(_this.editor, _this.editor.getDoc().getCursor());
            });
          }
          break;
        case "onCursorActivity":
          {
            _this.editor.on("cursorActivity", function(cm2) {
              _this.props.onCursorActivity(_this.editor);
            });
          }
          break;
        case "onCut": {
          _this.editor.on("cut", function(cm2, event) {
            _this.props.onCut(_this.editor, event);
          });
          break;
        }
        case "onDblClick": {
          _this.editor.on("dblclick", function(cm2, event) {
            _this.props.onDblClick(_this.editor, event);
          });
          break;
        }
        case "onDragEnter":
          {
            _this.editor.on("dragenter", function(cm2, event) {
              _this.props.onDragEnter(_this.editor, event);
            });
          }
          break;
        case "onDragLeave": {
          _this.editor.on("dragleave", function(cm2, event) {
            _this.props.onDragLeave(_this.editor, event);
          });
          break;
        }
        case "onDragOver":
          {
            _this.editor.on("dragover", function(cm2, event) {
              _this.props.onDragOver(_this.editor, event);
            });
          }
          break;
        case "onDragStart": {
          _this.editor.on("dragstart", function(cm2, event) {
            _this.props.onDragStart(_this.editor, event);
          });
          break;
        }
        case "onDrop":
          {
            _this.editor.on("drop", function(cm2, event) {
              _this.props.onDrop(_this.editor, event);
            });
          }
          break;
        case "onFocus":
          {
            _this.editor.on("focus", function(cm2, event) {
              _this.props.onFocus(_this.editor, event);
            });
          }
          break;
        case "onGutterClick":
          {
            _this.editor.on("gutterClick", function(cm2, lineNumber, gutter, event) {
              _this.props.onGutterClick(_this.editor, lineNumber, gutter, event);
            });
          }
          break;
        case "onInputRead":
          {
            _this.editor.on("inputRead", function(cm2, EditorChangeEvent) {
              _this.props.onInputRead(_this.editor, EditorChangeEvent);
            });
          }
          break;
        case "onKeyDown":
          {
            _this.editor.on("keydown", function(cm2, event) {
              _this.props.onKeyDown(_this.editor, event);
            });
          }
          break;
        case "onKeyHandled":
          {
            _this.editor.on("keyHandled", function(cm2, key, event) {
              _this.props.onKeyHandled(_this.editor, key, event);
            });
          }
          break;
        case "onKeyPress":
          {
            _this.editor.on("keypress", function(cm2, event) {
              _this.props.onKeyPress(_this.editor, event);
            });
          }
          break;
        case "onKeyUp":
          {
            _this.editor.on("keyup", function(cm2, event) {
              _this.props.onKeyUp(_this.editor, event);
            });
          }
          break;
        case "onMouseDown": {
          _this.editor.on("mousedown", function(cm2, event) {
            _this.props.onMouseDown(_this.editor, event);
          });
          break;
        }
        case "onPaste": {
          _this.editor.on("paste", function(cm2, event) {
            _this.props.onPaste(_this.editor, event);
          });
          break;
        }
        case "onRenderLine": {
          _this.editor.on("renderLine", function(cm2, line, element) {
            _this.props.onRenderLine(_this.editor, line, element);
          });
          break;
        }
        case "onScroll":
          {
            _this.editor.on("scroll", function(cm2) {
              _this.props.onScroll(_this.editor, _this.editor.getScrollInfo());
            });
          }
          break;
        case "onSelection":
          {
            _this.editor.on("beforeSelectionChange", function(cm2, data) {
              _this.props.onSelection(_this.editor, data);
            });
          }
          break;
        case "onTouchStart": {
          _this.editor.on("touchstart", function(cm2, event) {
            _this.props.onTouchStart(_this.editor, event);
          });
          break;
        }
        case "onUpdate":
          {
            _this.editor.on("update", function(cm2) {
              _this.props.onUpdate(_this.editor);
            });
          }
          break;
        case "onViewportChange":
          {
            _this.editor.on("viewportChange", function(cm2, from, to) {
              _this.props.onViewportChange(_this.editor, from, to);
            });
          }
          break;
      }
    });
  };
  return Shared2;
}();
var Controlled = function(_super) {
  __extends(Controlled2, _super);
  function Controlled2(props) {
    var _this = _super.call(this, props) || this;
    if (SERVER_RENDERED)
      return _this;
    _this.applied = false;
    _this.appliedNext = false;
    _this.appliedUserDefined = false;
    _this.deferred = null;
    _this.emulating = false;
    _this.hydrated = false;
    _this.initCb = function() {
      if (_this.props.editorDidConfigure) {
        _this.props.editorDidConfigure(_this.editor);
      }
    };
    _this.mounted = false;
    return _this;
  }
  Controlled2.prototype.hydrate = function(props) {
    var _this = this;
    var _options = props && props.options ? props.options : {};
    var userDefinedOptions = _extends({}, cm.defaults, this.editor.options, _options);
    var optionDelta = Object.keys(userDefinedOptions).some(function(key) {
      return _this.editor.getOption(key) !== userDefinedOptions[key];
    });
    if (optionDelta) {
      Object.keys(userDefinedOptions).forEach(function(key) {
        if (_options.hasOwnProperty(key)) {
          if (_this.editor.getOption(key) !== userDefinedOptions[key]) {
            _this.editor.setOption(key, userDefinedOptions[key]);
            _this.mirror.setOption(key, userDefinedOptions[key]);
          }
        }
      });
    }
    if (!this.hydrated) {
      this.deferred ? this.resolveChange(props.value) : this.initChange(props.value || "");
    }
    this.hydrated = true;
  };
  Controlled2.prototype.initChange = function(value) {
    this.emulating = true;
    var doc = this.editor.getDoc();
    var lastLine = doc.lastLine();
    var lastChar = doc.getLine(doc.lastLine()).length;
    doc.replaceRange(value || "", {
      line: 0,
      ch: 0
    }, {
      line: lastLine,
      ch: lastChar
    });
    this.mirror.setValue(value);
    doc.clearHistory();
    this.mirror.clearHistory();
    this.emulating = false;
  };
  Controlled2.prototype.resolveChange = function(value) {
    this.emulating = true;
    var doc = this.editor.getDoc();
    if (this.deferred.origin === "undo") {
      doc.undo();
    } else if (this.deferred.origin === "redo") {
      doc.redo();
    } else {
      doc.replaceRange(this.deferred.text, this.deferred.from, this.deferred.to, this.deferred.origin);
    }
    if (value && value !== doc.getValue()) {
      var cursor = doc.getCursor();
      doc.setValue(value);
      doc.setCursor(cursor);
    }
    this.emulating = false;
    this.deferred = null;
  };
  Controlled2.prototype.mirrorChange = function(deferred) {
    var doc = this.editor.getDoc();
    if (deferred.origin === "undo") {
      doc.setHistory(this.mirror.getHistory());
      this.mirror.undo();
    } else if (deferred.origin === "redo") {
      doc.setHistory(this.mirror.getHistory());
      this.mirror.redo();
    } else {
      this.mirror.replaceRange(deferred.text, deferred.from, deferred.to, deferred.origin);
    }
    return this.mirror.getValue();
  };
  Controlled2.prototype.componentDidMount = function() {
    var _this = this;
    if (SERVER_RENDERED)
      return;
    if (this.props.defineMode) {
      if (this.props.defineMode.name && this.props.defineMode.fn) {
        cm.defineMode(this.props.defineMode.name, this.props.defineMode.fn);
      }
    }
    this.editor = cm(this.ref, this.props.options);
    this.shared = new Shared(this.editor, this.props);
    this.mirror = cm(function() {
    }, this.props.options);
    this.editor.on("electricInput", function() {
      _this.mirror.setHistory(_this.editor.getDoc().getHistory());
    });
    this.editor.on("cursorActivity", function() {
      _this.mirror.setCursor(_this.editor.getDoc().getCursor());
    });
    this.editor.on("beforeChange", function(cm2, data) {
      if (_this.emulating) {
        return;
      }
      data.cancel();
      _this.deferred = data;
      var phantomChange = _this.mirrorChange(_this.deferred);
      if (_this.props.onBeforeChange)
        _this.props.onBeforeChange(_this.editor, _this.deferred, phantomChange);
    });
    this.editor.on("change", function(cm2, data) {
      if (!_this.mounted) {
        return;
      }
      if (_this.props.onChange) {
        _this.props.onChange(_this.editor, data, _this.editor.getValue());
      }
    });
    this.hydrate(this.props);
    this.shared.apply(this.props);
    this.applied = true;
    this.mounted = true;
    this.shared.wire(this.props);
    if (this.editor.getOption("autofocus")) {
      this.editor.focus();
    }
    if (this.props.editorDidMount) {
      this.props.editorDidMount(this.editor, this.editor.getValue(), this.initCb);
    }
  };
  Controlled2.prototype.componentDidUpdate = function(prevProps) {
    if (SERVER_RENDERED)
      return;
    var preserved = {
      cursor: null
    };
    if (this.props.value !== prevProps.value) {
      this.hydrated = false;
    }
    if (!this.props.autoCursor && this.props.autoCursor !== void 0) {
      preserved.cursor = this.editor.getDoc().getCursor();
    }
    this.hydrate(this.props);
    if (!this.appliedNext) {
      this.shared.applyNext(prevProps, this.props, preserved);
      this.appliedNext = true;
    }
    this.shared.applyUserDefined(prevProps, preserved);
    this.appliedUserDefined = true;
  };
  Controlled2.prototype.componentWillUnmount = function() {
    if (SERVER_RENDERED)
      return;
    if (this.props.editorWillUnmount) {
      this.props.editorWillUnmount(cm);
    }
  };
  Controlled2.prototype.shouldComponentUpdate = function(nextProps, nextState) {
    return !SERVER_RENDERED;
  };
  Controlled2.prototype.render = function() {
    var _this = this;
    if (SERVER_RENDERED)
      return null;
    var className = this.props.className ? "react-codemirror2 " + this.props.className : "react-codemirror2";
    return React.createElement("div", {
      className,
      ref: function ref(self) {
        return _this.ref = self;
      }
    });
  };
  return Controlled2;
}(React.Component);
var Controlled_1 = reactCodemirror2.Controlled = Controlled;
var UnControlled = function(_super) {
  __extends(UnControlled2, _super);
  function UnControlled2(props) {
    var _this = _super.call(this, props) || this;
    if (SERVER_RENDERED)
      return _this;
    _this.applied = false;
    _this.appliedUserDefined = false;
    _this.continueChange = false;
    _this.detached = false;
    _this.hydrated = false;
    _this.initCb = function() {
      if (_this.props.editorDidConfigure) {
        _this.props.editorDidConfigure(_this.editor);
      }
    };
    _this.mounted = false;
    _this.onBeforeChangeCb = function() {
      _this.continueChange = true;
    };
    return _this;
  }
  UnControlled2.prototype.hydrate = function(props) {
    var _this = this;
    var _options = props && props.options ? props.options : {};
    var userDefinedOptions = _extends({}, cm.defaults, this.editor.options, _options);
    var optionDelta = Object.keys(userDefinedOptions).some(function(key) {
      return _this.editor.getOption(key) !== userDefinedOptions[key];
    });
    if (optionDelta) {
      Object.keys(userDefinedOptions).forEach(function(key) {
        if (_options.hasOwnProperty(key)) {
          if (_this.editor.getOption(key) !== userDefinedOptions[key]) {
            _this.editor.setOption(key, userDefinedOptions[key]);
          }
        }
      });
    }
    if (!this.hydrated) {
      var doc = this.editor.getDoc();
      var lastLine = doc.lastLine();
      var lastChar = doc.getLine(doc.lastLine()).length;
      doc.replaceRange(props.value || "", {
        line: 0,
        ch: 0
      }, {
        line: lastLine,
        ch: lastChar
      });
    }
    this.hydrated = true;
  };
  UnControlled2.prototype.componentDidMount = function() {
    var _this = this;
    if (SERVER_RENDERED)
      return;
    this.detached = this.props.detach === true;
    if (this.props.defineMode) {
      if (this.props.defineMode.name && this.props.defineMode.fn) {
        cm.defineMode(this.props.defineMode.name, this.props.defineMode.fn);
      }
    }
    this.editor = cm(this.ref, this.props.options);
    this.shared = new Shared(this.editor, this.props);
    this.editor.on("beforeChange", function(cm2, data) {
      if (_this.props.onBeforeChange) {
        _this.props.onBeforeChange(_this.editor, data, _this.editor.getValue(), _this.onBeforeChangeCb);
      }
    });
    this.editor.on("change", function(cm2, data) {
      if (!_this.mounted || !_this.props.onChange) {
        return;
      }
      if (_this.props.onBeforeChange) {
        if (_this.continueChange) {
          _this.props.onChange(_this.editor, data, _this.editor.getValue());
        }
      } else {
        _this.props.onChange(_this.editor, data, _this.editor.getValue());
      }
    });
    this.hydrate(this.props);
    this.shared.apply(this.props);
    this.applied = true;
    this.mounted = true;
    this.shared.wire(this.props);
    this.editor.getDoc().clearHistory();
    if (this.props.editorDidMount) {
      this.props.editorDidMount(this.editor, this.editor.getValue(), this.initCb);
    }
  };
  UnControlled2.prototype.componentDidUpdate = function(prevProps) {
    if (this.detached && this.props.detach === false) {
      this.detached = false;
      if (prevProps.editorDidAttach) {
        prevProps.editorDidAttach(this.editor);
      }
    }
    if (!this.detached && this.props.detach === true) {
      this.detached = true;
      if (prevProps.editorDidDetach) {
        prevProps.editorDidDetach(this.editor);
      }
    }
    if (SERVER_RENDERED || this.detached)
      return;
    var preserved = {
      cursor: null
    };
    if (this.props.value !== prevProps.value) {
      this.hydrated = false;
      this.applied = false;
      this.appliedUserDefined = false;
    }
    if (!prevProps.autoCursor && prevProps.autoCursor !== void 0) {
      preserved.cursor = this.editor.getDoc().getCursor();
    }
    this.hydrate(this.props);
    if (!this.applied) {
      this.shared.apply(prevProps);
      this.applied = true;
    }
    if (!this.appliedUserDefined) {
      this.shared.applyUserDefined(prevProps, preserved);
      this.appliedUserDefined = true;
    }
  };
  UnControlled2.prototype.componentWillUnmount = function() {
    if (SERVER_RENDERED)
      return;
    if (this.props.editorWillUnmount) {
      this.props.editorWillUnmount(cm);
    }
  };
  UnControlled2.prototype.shouldComponentUpdate = function(nextProps, nextState) {
    var update = true;
    if (SERVER_RENDERED)
      update = false;
    if (this.detached && nextProps.detach)
      update = false;
    return update;
  };
  UnControlled2.prototype.render = function() {
    var _this = this;
    if (SERVER_RENDERED)
      return null;
    var className = this.props.className ? "react-codemirror2 " + this.props.className : "react-codemirror2";
    return React.createElement("div", {
      className,
      ref: function ref(self) {
        return _this.ref = self;
      }
    });
  };
  return UnControlled2;
}(React.Component);
reactCodemirror2.UnControlled = UnControlled;
const container = "_container_13rz9_1";
var styles = {
  container
};
function CodemirrorEditor(props) {
  const { value, onChange } = props;
  return /* @__PURE__ */ React__default.createElement(Controlled_1, {
    className: styles.container,
    value,
    onBeforeChange: (editor, data, value2) => onChange(value2),
    options: {
      mode: "xml",
      theme: "material",
      lineNumbers: true,
      autofocus: true,
      styleActiveLine: true,
      smartIndent: true,
      lineWrapping: true,
      foldGutter: true
    }
  });
}
export { CodemirrorEditor as default };
//# sourceMappingURL=index3.js.map
