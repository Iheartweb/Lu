define(['./Widget'], function (Widget) {
  /**
   * A widget that may contain navigable descendants or owned children.
   * @class Composite
   * @extends {Widget}
   */
  var Composite = Widget.extend(function (base) {
    /**
     * An map of defaults for instances of Composite
     * @type {Object}
     */
    var defaults = {
      /**
       * A filter used to determine items
       * @type {String}
       */
      items: '*'
    }

    return {
      /**
       * Constructs Composite
       * @param {jQuery} $element A jQuery collection.
       * @param {Object} settings @optional A settings object.
       * @constructor
       */
      init: function ($element, settings) {

        settings = settings || {};
        _.defaults(settings, defaults);
        base.init.call(this, $element, settings);

        /**
         * Gets the owned items.
         * @public
         * @return {jQuery}
         */
        this.items = function () {
          return this.$element.children().filter(settings.items);;
        };
      }
    };
  });

  return Composite;
});