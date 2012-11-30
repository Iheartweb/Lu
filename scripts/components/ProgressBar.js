define('ProgressBar', function () {
  /**
   * A form of range that expects the user to select from among discrete
   * choices.
   * @class ProgressBar
   * @extends {Range}
   */
  var ProgressBar,
  /**
   * @type {Range}
   */
  Range = require('Range');

  ProgressBar = Range.extend(function (base) {
    /**
     * An map of defaults for instances of ProgressBar
     * @type {Object}
     */
    var defaults = {};

    return {
      /**
       * Constructs ProgressBar
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

  return ProgressBar;
});