define(['./Widget', './decorators/hiddenState', 'Fiber', 'helpers'],
  function (Widget, hiddenStateDecorator, Fiber, HELPERS) {
  /**
   * Provides a mechanism for selecting
   * the tab content that is to be rendered to the user.
   * @class Tabpanel
   * @extends {Section}
   */
  var Tabpanel = Widget.extend(function (base) {
    /**
     * An map of defaults for instances of Tabpanel
     * @type {Object}
     */
    var defaults = {};

    return {
      /**
       * Constructs Tabpanel
       * @param {jQuery} $element A jQuery collection.
       * @param {Object} settings @optional A settings object.
       * @constructor
       */
      init: function ($element, settings) {
        var self = this;

        settings = settings || {};
        _.defaults(settings, defaults);
        base.init.call(this, $element, settings);

        Fiber.decorate(this, hiddenStateDecorator);

        this.on('selected', function (event, instance) {
          event.stopPropagation();
          if (instance.isSelected()) {
            self.show();
          } else {
            self.hide();
          }
        });

        this.on('expanded', function (event, instance) {
          event.stopPropagation();
          if (instance.isExpanded()) {
            self.show();
          } else {
            self.hide()
          }
        });

      }
    };
  });

  return Tabpanel;
});