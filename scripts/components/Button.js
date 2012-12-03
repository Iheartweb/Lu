define(['./Command', 'SUPPORTS'], function (Command, SUPPORTS) {
  /**
   * An interactive component that transforms a native event into a custom
   * event useful to other components.
   * @class Button
   * @extends {Command}
   */
  var Button = Command.extend(function (base) {
    /**
     * An map of defaults for instances of Button
     * @type {Object}
     */
    var defaults = {
      /**
       * A native event to capture. Defaults to touchstart if supported,otherwise click.
       * @default touchstart || click
       * @type {String}
       */
      on: (SUPPORTS.touchEvents) ? 'touchstart' : 'click',
      /**
       * The time in milliseconds in which to throttle events.
       * Events will only be triggred once per throttle time.
       * This is useful when timing complex css transitions.
       * @property throttle
       * @default 100
       * @type {Number}
       */
      throttle: 100
    };

    return {
      /**
       * Constructs Button
       * @param {jQuery} $element A jQuery collection.
       * @param {Object} settings @optional A settings object.
       * @constructor
       */
      init: function ($element, settings) {
        var self = this;
        settings = settings || {};
        _.defaults(settings, defaults);
        base.init.call(this, $element, settings);

        this.$element.on(settings.on, _.throttle(function (event) {
          event.preventDefault();
          self.trigger(settings.action, [self]);
        }));
      }
    };
  });

  return Button;
});