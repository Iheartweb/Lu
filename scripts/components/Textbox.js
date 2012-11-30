define('TextBox', function () {
  /**
   * Input that allows free-form text as its value.
   * choices.
   * @class TextBox
   * @extends {Input}
   */
  var TextBox,
  /**
   * @type {Range}
   */
  Input = require('Input');

  TextBox = Input.extend(function (base) {
    /**
     * An map of defaults for instances of TextBox
     * @type {Object}
     */
    var defaults = {};

    return {
      /**
       * Constructs TextBox
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

  return TextBox;
});