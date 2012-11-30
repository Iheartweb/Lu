define('Command', function () {
  /**
   * An interactive component that transforms a native event into a custom
   * event useful to other components.
   * @class Command
   * @extends {Widget}
   */
  var Command,
  /**
   * @type {Widget}
   */
  Widget = require('Widget');

  Command = Widget.extend(function (base) {
    /**
     * An map of defaults for instances of Command
     * @type {Object}
     */
    var defaults = {};

    return {
      /**
       * Constructs Command
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

  return Command;
});