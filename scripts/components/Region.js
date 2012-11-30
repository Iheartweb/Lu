define('Region', function () {
  /**
   * An abstract component that creates a heading to content relationship 
   * @class Region
   * @extends {Section}
   */
  var Region,
  /**
   * @type {Section}
   */
  Section = require('Section');

  Region = Base.extend(function (base) {
    /**
     * An map of defaults for instances of Region
     * @type {Object}
     */
    var defaults = {};

    return {
      /**
       * Constructs Region
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

  return Region;
});