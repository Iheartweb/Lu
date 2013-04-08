define(['./Widget', './decorators/selectedState', './decorators/expandedState', 'Fiber', 'supports', 'constants'],
  function (Widget, selectedStateDecorator, expandedStateDecorator, Fiber, SUPPORTS, CONSTANTS) {
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
        var self = this,
          supportedEvent = (SUPPORTS.touchEvents) ? 'touchstart' : 'click';

        settings = settings || {};
        _.defaults(settings, defaults);
        base.init.call(this, $element, settings);

        Fiber.decorate(this, selectedStateDecorator);
        Fiber.decorate(this, expandedStateDecorator);

        //setup the selected state on instantiation
        if (this.isSelected()) {
          self.select();
        }

        //setup the expanded state on instantiation
        if (this.isExpanded()) {
          self.expand();
        }

        this.$element.on(supportedEvent, function (event) {
          if(!self.$element.is(event.target)) {
            self.$element.attr('tabindex', 1).focus();
          }
        });
      }
    };
  });

  return Tab;
});