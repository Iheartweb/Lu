define('Tab', function () {
  /**
   * Provides a mechanism for selecting the tab content that is to be rendered
   * to the user.
   * @class Tab
   * @extends {Widget}
   */
  var Tab,
  /**
   * @type {Widget}
   */
  Widget = require('Widget'),
  /**
   * An imported decorator to support the selected state
   * @type {function}
   */
  selectedStateDecorator = require('decorators/selectedState'),
  /**
   * An imported decorator to support the expanded state
   * @type {function}
   */
  expandedStateDecorator = require('decorators/expandedState');

  Tab = Widget.extend(function (base) {
    /**
     * An map of defaults for instances of Tab
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
        settings = settings || {};
        _.defaults(settings, defaults);
        base.init.call(this, $element, settings);

        Fiber.decorate(this, selectedStateDecorator);
        Fiber.decorate(this, expandedStateDecorator);

        //calls the select method
        this.on('select', function (event) {
          event.stopPropagation();
          self.select();
        });

        //calls the expand method
        this.on('expand', function (event) {
          event.stopPropagation();
          self.expand();
        });

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