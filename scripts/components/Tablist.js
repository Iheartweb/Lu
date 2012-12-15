define(['./Composite', './decorators/expandedState', 'Fiber'],
  function (Composite, expandedStateDecorator, Fiber) {
  /**
   * Provides a mechanism for selecting
   * the tab content that is to be rendered to the user.
   * @class Tablist
   * @extends {Widget}
   */
  var Tablist = Composite.extend(function (base) {
    /**
     * An map of defaults for instances of Tablist
     * @type {Object}
     */
    var defaults = {
      items: '[role~=tab]'
    };

    return {
      /**
       * Constructs Tablist
       * @param {jQuery} $element A jQuery collection.
       * @param {Object} settings @optional A settings object.
       * @constructor
       */
      init: function ($element, settings) {
        var self = this;

        settings = settings || {};
        _.defaults(settings, defaults);
        base.init.call(this, $element, settings);

        Fiber.decorate(this, expandedStateDecorator);

        //setup the expanded state on instantiation
        if (this.isExpanded()) {
          self.expand();
        }
      }
    };
  });

  return Tablist;
});