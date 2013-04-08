define('Section', function () {
  /**
   * An expandable section of content
   * @class Section
   * @extends {Structure}
   */
  var Section,
  /**
   * @type {Structure}
   */
  Structure = require('Structure'),
  /**
   * An imported decorator to support the expanded state
   * @type {function}
   */
  expandedStateDecorator = require('decorators/expandedState');

  Section = Base.extend(function (base) {
    /**
     * An map of defaults for instances of Section
     * @type {Object}
     */
    var defaults = {};

    return {
      /**
       * Constructs Section
       * @param {jQuery} $element A jQuery collection.
       * @param {Object} settings @optional A settings object.
       * @constructor
       */
      init: function ($element, settings) {
        settings = settings || {};
        _.defaults(settings, defaults);
        base.init.call(this, $element, settings);

        Fiber.decorate(this, expandedStateDecorator);

        //setup the selected state on instantiation
        if (this.isExpanded()) {
          self.expand();
        }
      }
    };
  });

  return Section;
});