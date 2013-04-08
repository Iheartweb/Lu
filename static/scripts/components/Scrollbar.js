define('Scrollbar', function () {
  /**
   * A graphical object that controls the scrolling of content within a
   * viewing area, regardless of whether the content is fully displayed within
   * the viewing area.
   * @class Scrollbar
   * @extends {Input}
   */
  var Scrollbar,
  /**
   * @type {Range}
   */
  Range = require('Range');

  Scrollbar = Range.extend(function (base) {
    /**
     * An map of defaults for instances of Scrollbar
     * @type {Object}
     */
    var defaults = {};

    return {
      /**
       * Constructs Scrollbar
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

  return Scrollbar;
});