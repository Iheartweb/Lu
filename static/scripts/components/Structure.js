define('Structure', function () {
  /**
   * A dynamic section of content
   * @class Structure
   * @extends {Base}
   */
  var Base,
  /**
   * @type {Base}
   */
  Base = require('Base'),

  Structure = Base.extend(function (base) {
    /**
     * An map of defaults for instances of Structure
     * @type {Object}
     */
    var defaults = {};

    return {
      /**
       * Constructs Structure
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

  return Structure;
});