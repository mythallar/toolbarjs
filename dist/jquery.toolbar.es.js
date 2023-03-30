import r from "jquery";
/**
 * Toolbar.js
 *
 * @fileoverview  jQuery plugin that creates tooltip style toolbars.
 * @link          http://paulkinzett.github.com/toolbar/
 * @author        Paul Kinzett (http://kinzett.co.nz/)
 * @version       1.1.0
 * @requires      jQuery 1.7+
 *
 * @license jQuery Toolbar Plugin v1.1.0
 * http://paulkinzett.github.com/toolbar/
 * Copyright 2013 - 2015 Paul Kinzett (http://kinzett.co.nz/)
 * Released under the MIT license.
 * <https://raw.github.com/paulkinzett/toolbar/master/LICENSE.txt>
 */
(function(i) {
  var a = {
    init: function(o, e) {
      var t = this;
      t.elem = e, t.$elem = i(e), t.options = i.extend({}, i.fn.toolbar.options, o), t.metadata = t.$elem.data(), t.overrideOptions(), t.toolbar = i('<div class="tool-container" />').addClass("tool-" + t.options.position).addClass("toolbar-" + t.options.style).append('<div class="tool-items" />').append('<div class="arrow" />').appendTo("body").css("opacity", 0).hide(), t.toolbar_arrow = t.toolbar.find(".arrow"), t.initializeToolbar();
    },
    overrideOptions: function() {
      var o = this;
      i.each(o.options, function(e) {
        typeof o.$elem.data("toolbar-" + e) < "u" && (o.options[e] = o.$elem.data("toolbar-" + e));
      });
    },
    initializeToolbar: function() {
      var o = this;
      o.populateContent(), o.setTrigger(), o.toolbarWidth = o.toolbar.width();
    },
    setTrigger: function() {
      var o = this;
      if (o.options.event != "click") {
        let t = function() {
          o.$elem.hasClass("pressed") ? e = setTimeout(function() {
            o.hide();
          }, 150) : clearTimeout(e);
        };
        var e;
        o.$elem.on({
          mouseenter: function(s) {
            o.$elem.hasClass("pressed") ? clearTimeout(e) : o.show();
          }
        }), o.$elem.parent().on({
          mouseleave: function(s) {
            t();
          }
        }), i(".tool-container").on({
          mouseenter: function(s) {
            clearTimeout(e);
          },
          mouseleave: function(s) {
            t();
          }
        });
      }
      if (o.options.event == "click" && (o.$elem.on("click", function(t) {
        t.preventDefault(), o.$elem.hasClass("pressed") ? o.hide() : o.show();
      }), o.options.hideOnClick && i("html").on("click.toolbar", function(t) {
        t.target != o.elem && o.$elem.has(t.target).length === 0 && o.toolbar.has(t.target).length === 0 && o.toolbar.is(":visible") && o.hide();
      })), o.options.hover) {
        let s = function() {
          o.$elem.hasClass("pressed") ? e = setTimeout(function() {
            o.hide();
          }, 150) : clearTimeout(e);
        };
        var e;
        o.$elem.on({
          mouseenter: function(n) {
            o.$elem.hasClass("pressed") ? clearTimeout(e) : o.show();
          }
        }), o.$elem.parent().on({
          mouseleave: function(n) {
            s();
          }
        }), i(".tool-container").on({
          mouseenter: function(n) {
            clearTimeout(e);
          },
          mouseleave: function(n) {
            s();
          }
        });
      }
      i(window).resize(function(t) {
        t.stopPropagation(), o.toolbar.is(":visible") && (o.toolbarCss = o.getCoordinates(o.options.position, 20), o.collisionDetection(), o.toolbar.css(o.toolbarCss), o.toolbar_arrow.css(o.arrowCss));
      });
    },
    populateContent: function() {
      var o = this, e = o.toolbar.find(".tool-items"), t = i(o.options.content).clone(!0).find("a").addClass("tool-item");
      e.html(t), e.find(".tool-item").on("click", function(s) {
        s.preventDefault(), o.$elem.trigger("toolbarItemClick", this);
      });
    },
    calculatePosition: function() {
      var o = this;
      o.arrowCss = {}, o.toolbarCss = o.getCoordinates(o.options.position, o.options.adjustment), o.toolbarCss.position = "absolute", o.toolbarCss.zIndex = o.options.zIndex, o.collisionDetection(), o.toolbar.css(o.toolbarCss), o.toolbar_arrow.css(o.arrowCss);
    },
    getCoordinates: function(o, e) {
      var t = this;
      switch (t.coordinates = t.$elem.offset(), t.options.adjustment && t.options.adjustment[t.options.position] && (e = t.options.adjustment[t.options.position] + e), t.options.position) {
        case "top":
          return {
            left: t.coordinates.left - t.toolbar.width() / 2 + t.$elem.outerWidth() / 2,
            top: t.coordinates.top - t.$elem.outerHeight() - e,
            right: "auto"
          };
        case "left":
          return {
            left: t.coordinates.left - t.toolbar.width() / 2 - t.$elem.outerWidth() / 2 - e,
            top: t.coordinates.top - t.toolbar.height() / 2 + t.$elem.outerHeight() / 2,
            right: "auto"
          };
        case "right":
          return {
            left: t.coordinates.left + t.toolbar.width() / 2 + t.$elem.outerWidth() / 2 + e,
            top: t.coordinates.top - t.toolbar.height() / 2 + t.$elem.outerHeight() / 2,
            right: "auto"
          };
        case "bottom":
          return {
            left: t.coordinates.left - t.toolbar.width() / 2 + t.$elem.outerWidth() / 2,
            top: t.coordinates.top + t.$elem.outerHeight() + e,
            right: "auto"
          };
      }
    },
    collisionDetection: function() {
      var o = this, e = 20;
      (o.options.position == "top" || o.options.position == "bottom") && (o.arrowCss = { left: "50%", right: "50%" }, o.toolbarCss.left < e ? (o.toolbarCss.left = e, o.arrowCss.left = o.$elem.offset().left + o.$elem.width() / 2 - e) : i(window).width() - (o.toolbarCss.left + o.toolbarWidth) < e && (o.toolbarCss.right = e, o.toolbarCss.left = "auto", o.arrowCss.left = "auto", o.arrowCss.right = i(window).width() - o.$elem.offset().left - o.$elem.width() / 2 - e - 5));
    },
    show: function() {
      var o = this;
      o.$elem.addClass("pressed"), o.calculatePosition(), o.toolbar.show().css({ opacity: 1 }).addClass("animate-" + o.options.animation), o.$elem.trigger("toolbarShown");
    },
    hide: function() {
      var o = this, e = { opacity: 0 };
      switch (o.$elem.removeClass("pressed"), o.options.position) {
        case "top":
          e.top = "+=20";
          break;
        case "left":
          e.left = "+=20";
          break;
        case "right":
          e.left = "-=20";
          break;
        case "bottom":
          e.top = "-=20";
          break;
      }
      o.toolbar.animate(e, 200, function() {
        o.toolbar.hide();
      }), o.$elem.trigger("toolbarHidden");
    },
    getToolbarElement: function() {
      return this.toolbar.find(".tool-items");
    }
  };
  i.fn.toolbar = function(o) {
    if (i.isPlainObject(o))
      return this.each(function() {
        var s = Object.create(a);
        s.init(o, this), i(this).data("toolbarObj", s);
      });
    if (typeof o == "string" && o.indexOf("_") !== 0) {
      var e = i(this).data("toolbarObj"), t = e[o];
      return t.apply(e, i.makeArray(arguments).slice(1));
    }
  }, i.fn.toolbar.options = {
    content: "#myContent",
    position: "top",
    hideOnClick: !1,
    zIndex: 120,
    hover: !1,
    style: "default",
    animation: "standard",
    adjustment: 10
  };
})(r);
