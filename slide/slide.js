/* global jQuery */
((global, $) => {
  'use strict';
  const defaultOptions = {
    height: 400,
    speed: 300
  };

  function Slide() {
    this.container = null;
    // 'next' || 'prev'
    this.direction = 'prev';
    // 0: prev node 1: current node 2: next node
    this.nodes = [];
    this.childNodes = [];
    this.nodeW = 0;
  }

  Slide.prototype = {
    init(element, opts) {
      const that = this;
      const $container = that.container = $(element);

      let $childrens = $container.children();
      if ($childrens.length === 2) {
        $container.append($childrens.clone());
        $childrens = $container.children();
      }
      const childLength = $childrens.length;
      const options = that.options = $.extend({}, opts, defaultOptions);
      that.nodeW = parseInt(options.width, 10) || $container.width();
      that.nodeH = options.height;
      $container.css({
        position: 'relative',
        width: that.nodeW,
        height: that.nodeH,
        overflow: 'hidden'
      });

      $childrens.each((i, v) => {
        const el = $(v);
        el.data('idx', i);
        el.css({
          position: 'absolute',
          top: 0,
          left: 0,
          // width: that.nodeW,
          transform: childLength <= 1 ? '' : `translate3d(${that.nodeW}px,0,0)`,
          transition: 'transform linear ${options.speed}ms'
        });
        that.childNodes.push(el);
      });
      if (childLength > 1) {
        that._checkAndSetNodes();
      }

    },
    _checkAndSetNodes() {
      const that = this;
      const nodes = that.nodes;
      const childNodes = that.childNodes;
      let prev = nodes[0];
      let current = nodes[1];
      let next = nodes[2];
      if (!current) {
        current = that.childNodes[0];
        current.css({
          transform: 'translate3d(0,0,0)',
          'transition-duration': '0ms'
        });
        nodes[1] = current;
      }

      const currentIdx = Number(current.data('idx'));

      if (!prev) {
        if (currentIdx === 0) {
          prev = childNodes[childNodes.length - 1];
        } else {
          prev = childNodes[currentIdx - 1];
        }
        prev.css({
          transform: `translate3d(-${that.nodeW}px, 0, 0)`,
          'transition-duration': '0ms'
        });
        nodes[0] = prev;
      }

      if (!next) {
        if (currentIdx === childNodes.length - 1) {
          next = childNodes[0];
        } else {
          next = childNodes[currentIdx + 1];
        }
        next.css({
          transform: `translate3d(${that.nodeW}px, 0, 0)`,
          'transition-duration': '0ms'
        });
        nodes[2] = next;
      }
    },
    _move(direction, prev, current, next, speed) {
      const that = this;
      const seed = direction === 'next' ? -1 : 1;

      current.css({
        transform: `translate3d(${seed * that.nodeW}px, 0, 0)`,
        'transition-duration': `${speed}ms`
      });

      (seed === -1 ? next : prev).css({
        transform: 'translate3d(0, 0, 0)',
        'transition-duration': `${speed}ms`
      });
      that.nodes = seed === -1 ? [current, next, null] : [null, prev, current];
      that._checkAndSetNodes();
    },
    _slide() {
      const that = this;

      if (that.childNodes.length <= 1) {
        return;
      }

      const options = that.options;
      const direction = that.direction;
      const nodes = that.nodes;
      that._checkAndSetNodes();
      const prev = nodes[0];
      const current = nodes[1];
      const next = nodes[2];

      that._move(direction, prev, current, next, options.speed);
    },
    next() {
      const that = this;
      that.direction = 'next';
      that._slide();
    },
    previous() {
      const that = this;
      that.direction = 'prev';
      that._slide();
    }

  };
  Slide.prototype.constructor = Slide;

  $.fn.extend({
    slide(options) {
      const slide = new Slide();
      slide.init(this.get(0), options);
      return slide;
    }
  })
})(this, jQuery);
