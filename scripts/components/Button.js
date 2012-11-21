/**
 * @class Button
 * @extends Disableable
*/

define('lu/components/Button', function () {
  var Switch = require('lu/components/Switch/Switch'),
    disabled = require('lu/components/Switch/states/disabled');
    SUPPORTS = require('lu/supports');

  return Switch.extend(function (base) {
    var defaults = {
      on: (SUPPORTS.touchEvents) ? 'touchstart' : 'click',
      /**
       * The time in milliseconds in which to throttle events.
       * Events will only be triggred once per throttle time.
       * This is useful when timing complex css transitions.
       * @property throttle
       * @type {Number}
       */
      throttle: 100
    };

    return {
      /**
       * Class constructor
       * @method init
       * @public
       * @param {Object} $element JQuery object for the element wrapped by the component
       * @param {Object} settings Configuration settings
       */
      init: function ($element, settings) {
        var self = this;

        _.defaults(settings || {}, defaults);

        base.init.call(this, $element, {});
        Fiber.decorate(this, disabled);

        this.$element.on(settings.on, _.throttle(function (event) {
          event.preventDefault();
          self.trigger(settings.action, [self]);
        }));
      }
    };
  });
});