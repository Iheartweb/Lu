define('SpinButton', function () {
  /**
   * A form of range that expects the user to select from among discrete
   * choices.
   * @class SpinButton
   * @extends {Input}
   */
  var SpinButton,
  /**
   * @type {Range}
   */
  Range = require('Range');

  SpinButton = Range.extend(function (base) {
    /**
     * An map of defaults for instances of SpinButton
     * @type {Object}
     */
    var defaults = {};

    return {
      /**
       * Constructs SpinButton
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

  return SpinButton;
});