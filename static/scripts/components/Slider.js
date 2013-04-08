define('Slider', function () {
  /**
   * A user input where the user selects a value from within a given range.
   * @class Slider
   * @extends {Input}
   */
  var Slider,
  /**
   * @type {Range}
   */
  Range = require('Range');

  Slider = Range.extend(function (base) {
    /**
     * An map of defaults for instances of Slider
     * @type {Object}
     */
    var defaults = {};

    return {
      /**
       * Constructs Slider
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

  return Slider;
});