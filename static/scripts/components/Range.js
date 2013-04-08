define('Range', function () {
  /**
   * A graphical object that controls the scrolling of content within a
   * viewing area, regardless of whether the content is fully displayed within
   * the viewing area.
   * @class Range
   * @extends {Input}
   */
  var Range,
  /**
   * @type {Input}
   */
  Input = require('Input');

  Range = Input.extend(function (base) {
    /**
     * An map of defaults for instances of Range
     * @type {Object}
     */
    var defaults = {
      /**
       * The orientation of the scrollbar. This can be set to vertical or
       * horizontal
       * @type {String}
       * @default vertical
       */
      orientation: 'vertical',
      /**
       * The element controlled by the scrollbar. This can be a selector
       * string, an HTMLElement a jQuery collection or 'auto'. If auto is used
       * the aria-controls attribute is inspected.
       * @type {String||HTMLElement||jQuery}
       * @default auto
       */
      controls: 'auto',
      /**
       * The maximum value of the scrollbar. This can be a number or 'auto'.
       * If auto is used the aria-valuemax attribute is inspected. If
       * aria-valuemax is not present the number 100 is used.
       * @type {String||Number}
       * @default auto
       */
      max: 'auto',
      /**
       * The minimum value of the scrollbar. This can be a number or 'auto'.
       * If auto is used the aria-valuemin attribute is inspected. If
       * aria-valuemin is not present the number 0 is used.
       * @type {String||Number}
       * @default auto
       */
      min: 'auto',
      /**
       * The current value of the scrollbar. This can be a number or 'auto'.
       * If auto is used the aria-valuenow attribute is inspected. If
       * aria-valuenow is not present the number 0 is used.
       * @type {String||Number}
       * @default auto
       */
      now: 'auto'
    };

    return {
      /**
       * Constructs Range
       * @param {jQuery} $element A jQuery collection.
       * @param {Object} settings @optional A settings object.
       * @constructor
       */
      init: function ($element, settings) {
        settings = settings || {};
        _.defaults(settings, defaults);
        base.init.call(this, $element, settings);
      }
    };
  });

  return Range;
});