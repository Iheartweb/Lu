define('Widget', function () {
  /**
   * Widgets are discrete user interface objects
   * with which the user can interact.
   * @class Widget
   * @extends {Base}
   */
  var Widget,
  /**
   * @type {Base}
   */
  Roletype = require('Base');

  Widget = Roletype.extend(function (base) {
    /**
     * An map of defaults for instances of Widget
     * @type {Object}
     */
    var defaults = {};

    return {
      // TODO: Write Keyboard/Focus Manager
      init: function ($element, settings) {
        settings = settings || {};
        _.defaults(settings, defaults);
        base.init.call(this, $element, settings);
      }
    };
  });

  return Widget;
});