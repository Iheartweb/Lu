define('Input', function () {
  /**
   * A generic type of widget that allows user input.
   * @class Input
   * @extends {Widget}
   */
  var Input,
  /**
   * @type {Widget}
   */
  Widget = require('Widget');

  Input = Widget.extend(function (base) {
    /**
     * An map of defaults for instances of Input
     * @type {Object}
     */
    var defaults = {};

    return {
      /**
       * Constructs Input
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

  return Input;
});