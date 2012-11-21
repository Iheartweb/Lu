define('lu/components/Abstract/Abstract', function () {
  var CONSTANTS = require('lu/constants'),
    HELPERS = require('lu/helpers'),
    Abstract;

  /**
   * Provides an event facade for jQuery's event system as well as
   * enabling observation.
   * @class Abstract
   */
  Abstract = Fiber.extend(function () {
    var slice = Array.prototype.slice,
      defaults = {
        /**
         * A selector that matches nodes to observe
         * @property observe
         * @type {String}
         */
        observe: '',
        /**
         * A selector that matches nodes to notify of events
         * @property notify
         * @type {String}
         */
        notify: ''
      };

    /**
     * Adds an event, or a string of joined events to the eventStore
     * @method addEventToStorage
     * @private
     * @param {String} event The event(s) to add
     * @param {String} method The method (ex: 'on', 'one')
     */
    function addToEventStore(event, method) {
      var eventStore = this.eventStore,
        pattern = /\s+/g;

      _.each(HELPERS.trim(event).split(pattern), function (item) {
        eventStore[item] = {
          method: method
        };
      });
    }

    /**
     * Removes an event, or a string of joined events from the eventStore
     * @method removeEventFromStorage
     * @private
     * @param {String} event The event(s) to remove
     */
    function removeFromEventStore(event) {
      var eventStore = this.eventStore;
      _.each(HELPERS.trim(event).split(/\s+/g), function () {
        if (eventStore[event]) {
          delete eventStore[event];
        }
      });
    }

    function getRelated() {
      var $self = this,
        element = this.get(0),
        related = [],
        isAnchor = this.is('a'),
        relationshipAttrs = ['aria-activedescendant', 'aria-controls', 'aria-describedby', 'aria-flowto', 'aria-labelledby', 'aria-owns', 'aria-posinset', 'aria-setsize'];

      if (isAnchor && element.hash) {
        related.push(element.hash);
      }

      _.each(relationshipAttrs, function (item) {
        var attr = $self.attr(item);
        if (attr) {
          _.each(attr.split(' '), function (item) {
            related.push('#' + item);
          });
        }
      });
      return $(related.join(','));
    }

    return {
      /**
       * Class constructor
       * @method init
       * @public
       * @param {Object} $element JQuery object for DOM node wrapped by this component
       * @param {Object} settings Custom settings for this component
       */
      init: function ($element, settings) {
        var $observe,
          $notify;

        _.defaults(settings || {}, defaults);

        this.$element = $element;
        this.eventStore = {};

        if (settings.observe instanceof $) {
          $observe = settings.observe;
        } else if (typeof settings.observe === 'string') {
          $observe = $(settings.observe);
        }

        if (settings.notify instanceof $) {
          $notify = settings.notify;
        } else if (typeof settings.notify === 'string') {
          $notify = $(settings.notify);
        }

        if ($observe.length > 0) {
          $observe.lu('observe', $element);
        }

        if ($notify.length > 0) {
          $element.lu('observe', $notify);
        }
      },
      /**
       * Creates an event listener for a type
       * @method on
       * @public
       * @return this
       */
      on: function () {
        var args = slice.call(arguments),
          event = CONSTANTS.events.prefix + arguments[0];

        args.splice(0, 1, event);

        addToEventStore.call(this, event, 'on');

        this.$element.on.apply(this.$element, args);
        return this;
      },
      /**
       * Creates an event listener for a type, fires exactly once.
       * @method one
       * @public
       * @return this
       */
      one: function () {
        var args = slice.call(arguments),
          event = CONSTANTS.events.prefix + arguments[0];

        args.splice(0, 1, event);

        addToEventStore.call(this, event, 'one');
        this.$element.one.apply(this.$element, args);
        return this;
      },
      /**
       * Unbinds event listeners of a type
       * @method off
       * @public
       * @return this
       */
      off: function () {
        var args = slice.call(arguments),
          event = CONSTANTS.events.prefix + arguments[0];

        args.splice(0, 1, event);

        removeFromEventStore.call(this, event);
        this.$element.off.apply(this.$element, args);
        return this;
      },
      /**
       * Fires a custom event
       * @method trigger
       * @public
       * @return this
       */
      trigger: function (event, parameters) {
        var store;

        if (typeof event === 'string') {
          event = CONSTANTS.events.prefix + event;
        }

        store = this.eventStore[event];

        this.$element.lu('notify', event, parameters);

        if (store && store.method === 'one') {
          removeFromEventStore.call(this, event);
        }
        this.$element.trigger.call(this.$element, event, parameters);

        return this;
      },
      /**
       * Observe events from $observer
       * @method observe
       * @private
       * @param {Array} $observer A jQuery collection to be observed
       * @return this
       */
      observe: function ($observer) {
        $observer.lu('observe', this.$element);
        return this;
      },
      /**
       * Detatch events from $observer
       * @method unobserve
       * @private
       * @param {Array} $observer A jQuery collection to be unobserved
       * @return this
       */
      detatch: function ($observer) {
        $observer.lu('detatch', this.$element);
        return this;
      },
      /**
       * Returns and array of events the control is listening too
       * @public
       * @return events
       */
      events: function () {
        return _.keys(this.eventStore);
      },
      /**
       * Proxys the private getRelated method
       * @public
       * @return a A jQuery collection of related elements
       */
      getRelated: function () {
        return getRelated.call(this.$element);
      }
    };
  });

  return Abstract;
});