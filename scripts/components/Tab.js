define(['./Widget', './decorators/selectedState', './decorators/expandedState', 'Fiber'],
  function (Widget, selectedStateDecorator, expandedStateDecorator, Fiber) {
  /**
   * Provides a mechanism for selecting the tab content that is to be rendered
   * to the user.
   * @class Tab
   * @extends {Widget}
   */
  var Tab = Widget.extend(function (base) {
    /**
     * A map of defaults for instances of Tab
     * @type {Object}
     */
    var defaults = {};

    return {
      /**
       * Constructs Tab
       * @param {jQuery} $element A jQuery collection.
       * @param {Object} settings @optional A settings object.
       * @constructor
       */
      init: function ($element, settings) {
        var self = this;

        settings = settings || {};
        _.defaults(settings, defaults);
        base.init.call(this, $element, settings);

        Fiber.decorate(this, selectedStateDecorator);
        Fiber.decorate(this, expandedStateDecorator);

        //setup the selected state on instantiation
        if (this.isSelected()) {
          self.select();
        }

        //setup the selected state on instantiation
        if (this.isExpanded()) {
          self.expand();
        }

      }
    };
  });

  return Tab;
});