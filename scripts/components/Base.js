define(['constants', 'helpers', 'utilities', 'Fiber'],
  function (CONSTANTS, HELPERS, UTILITIES, Fiber) {
  /**
   * The base component from which all others inherit.
   * @class Base
   * @extends {Base}
   */
  var Base = Fiber.extend(function (base) {
    /**
     * An map to contain defaults for instances of Base
     * @type {Object}
     */
    var defaults = {
      /**
       * A selector that matches nodes to observe
       * @default ''
       * @type {String}
       */
      observe: '',
      /**
       * A selector that matches nodes to notify of events
       * @default ''
       * @type {String}
       */
      notify: '',
      /**
       * A flag that used to determine if aria properties should be used to
       * setup observation and notification. If set to true aria-owns,
       * aria-describedby, aria-labelledby are used to add elements to observe
       * and aria-controls is used to add elements to notify.
       * @default true
       * @type {Boolean}
       */
      aria: true
    };

    /**
     * Inspects the DOM for a declared state
     * @method getDOMState
     * @param {String} key the state to inspect for
     * @private
     * @return the state declared on the DOM or undefined if no state is found
     */
    function getDOMState(key) {
      var self = this,
        states = this.states,
        state = states[key],
        lu,
        aria,
        booleanAttribute,
        values,
        value;

      if(!state){
        return;
      }

      lu = state.lu;
      aria = state.aria;
      booleanAttribute = state.booleanAttribute;
      values = state.values;

      //check for lu-state class declaration
      if (lu) {
        _.each(lu, function (item, index) {
          if (item) {
            if (self.$element.hasClass(CONSTANTS.states.prefix + item)) {
              value = values[index];
            }
          }
        });
        if (value) {
          return value;
        }
      }

      //check for aria-state declaration
      if (aria) {
        _.each(aria, function (item) {
          if (item) {
            if (self.$element.attr('aria-' + item) === item) {
              value = values[index];
            }
          }
        });
        if (value) {
          return value;
        }
      }

      //check for boolean attribute declaration
      if (booleanAttribute) {
        _.each(booleanAttribute, function (item) {
          if (item) {
            if (self.$element.prop(state) === item) {
              value = values[index];
            }
          }
        });
        if (value) {
          return value;
        }
      }
    }

    /**
     * Prefixes one or more events
     * @param {String||Object} event an event, space delimited list of events
     * or map where the keys represent the name of the events
     * @method prefix
     * @private
     * @return {String||Object} an event, a space delimited list of events or
     * an event map
     */
    function prefix(event) {
      var events;

      if (typeof event === 'string') {
        events = UTILITIES.trim(arguments[0]).split(/\s+/g);
        _.each(events, function (event, index) {
          events[index] = CONSTANTS.events.prefix + event;
        });
        events = events.join(' ');
      } else {
        events = {};
        _.each(event, function (e, key) {
          events[CONSTANTS.events.prefix + key] = e;
        });
      }

      return events;
    }

    return {
      /**
       * Constructs Base
       * @param {jQuery} $element A jQuery collection.
       * @param {Object} settings @optional A settings object.
       * @public
       * @constructor
       */
      init: function ($element, settings) {
        var self = this,
          ariaObserve = ['aria-owns', 'aria-describedby', 'aria-labelledby'],
          observe = [],
          $observe = $([]),
          ariaNotify = ['aria-controls'],
          notify = [],
          $notify,
          data;

        settings = settings || {};
        _.defaults(settings, defaults);

        this.$element = $element;

        //setup the lu namespace in the elements data
        this.$element.data('lu');
        data = this.$element.data('lu');

        if (!data) {
          this.$element.data('lu', {});
          data = this.$element.data('lu');
        }

        //Add observers to the data object
        $notify = data.$observers = data.$observers || $([]);

        $notify = $notify.add(settings.notify);

        $observe = $observe.add(settings.observe);

        if (settings.aria) {
          //iterate through aria props and identify elements that should be
          //observed
          _.each(ariaObserve, function (property) {
            var attribute = self.$element.attr(property);
            if (attribute) {
              _.each(attribute.split(' '), function (id) {
                observe.push('#' + id);
              });
            }
          });

          $observe = $observe.add(observe.join(','));

          //iterate through aria props and identify elements that should be
          //notified
          _.each(ariaNotify, function (property) {
            var attribute = self.$element.attr(property);
            if (attribute) {
              _.each(attribute.split(' '), function (id) {
                notify.push('#' + id);
              });
            }
          });

          $notify.add(notify.join(',')).lu('observe', this.$element);
        }

      },
      /**
       * A Map to contain states that can be applied to Base
       * @type {Object}
       */
      states: {},
      /**
       * Sets the state to the specified value
       * @method setState
       * @param {String} key the state
       * @param {String} value the value to set the state to
       * @public
       * @return the context used to call the method
       */
      setState: function (key, value) {
        var $element = this.$element,
          state = this.states[key],
          current = this.getState(key),
          style;

        if (current !== value) {
          if (current !== undefined) {
            style = state.lu[_.indexOf(this.states.values, current)];
            $element.removeClass(CONSTANTS.states.prefix + style);
          }
          style = state.lu[_.indexOf(state.values, value)];
          $element.addClass(CONSTANTS.states.prefix + style);
        }

        //this.trigger(key, [this]);
        // if (value !== currentValue) {
        //   index = _.indexOf(values, value);
        //   currentIndex = _.indexOf(values, currentValue);

        //   //apply the lu state class
        //   if (lu) {
        //     if(value) {
        //       if (state.lu[index]) {
        //         $element.addClass(CONSTANTS.states.prefix + state.lu[index]);
        //       }
        //     }
        //     if (state.lu[index]) {
        //       $element.addClass(CONSTANTS.states.prefix + state.lu[index]);
        //     } else {
        //       $element.removeClass(CONSTANTS.states.prefix + state.lu[currentIndex]);
        //     }
        //   }

        //   //apply the aria state attribute
        //   if (aria) {
        //     (function () {
        //       var values,
        //         filter;

        //       if (_.isArray(aria)) {
        //         values = aria;
        //       } else {
        //         values = aria.values;
        //       }

        //       filter = aria.filter;

        //       if ((filter && $element.is(filter)) || !filter) {
        //         if (values[index]) {
        //           $element.attr('aria-' + key, values[index]);
        //         } else {
        //           $element.removeAttr('aria-' + key);
        //         }
        //       }
        //     }());
        //   }

        //   //apply the boolean attribute state
        //   if (booleanAttribute) {
        //     (function () {
        //       var values,
        //         filter;

        //       if (_.isArray(booleanAttribute)) {
        //         values = booleanAttribute;
        //       } else {
        //         values = booleanAttribute.values;
        //       }

        //       filter = booleanAttribute.filter;

        //       if ((filter && $element.is(filter)) || !filter) {
        //         if (values[index]) {
        //           $element.prop(key, values[index]);
        //         } else {
        //           $element.removeProp(key);
        //         }
        //       }
        //     }());
        //   }

        // }

        return this;
      },
      /**
       * Gets the current value of the specified state
       * @method getState
       * @param {String} key the state
       * @public
       * @return {Boolean||String} The value of the specified state.
       */
      getState: function (key) {
        return getDOMState.call(this, key);
      },
      /**
       * Attach an event handler function for one or more events to the
       * element used in the component's instantiation. This is a proxy for
       * jQuery's on method.
       * @method on
       * @public
       * @chainable
       */
      on: function () {
        var parameters = Array.prototype.slice.call(arguments);
        parameters[0] = prefix(parameters[0]);
        this.$element.on.apply(this.$element, parameters);
        return this;
      },
      /**
       * Attach an event handler function for one or more events to the
       * element used in the component's instantiation. The event fires
       * exactly once. This is a proxy for jQuery's one method.
       * @method one
       * @public
       * @chainable
       */
      one: function () {
        var parameters = CONSTANTS.slice.call(arguments);
        parameters[0] = prefix(parameters[0]);
        this.$element.one.apply(this.$element, parameters);
        return this;
      },
      /**
       * Remove an event handler from the element used in the component's
       * instantiation. This is a proxy for jQuery's off method.
       * @method off
       * @public
       * @chainable
       */
      off: function () {
        var parameters = CONSTANTS.slice.call(arguments);
        parameters[0] = prefix(parameters[0]);
        this.$element.off.apply(this.$element, parameters);
        return this;
      },
      /**
       * Execute all handlers and behaviors attached to the element used
       * during instantiation for the given event type. This is a proxy for
       * jQuery's trigger method.
       * @method trigger
       * @public
       * @chainable
       */
      trigger: function () {
        var parameters = Array.prototype.slice.call(arguments);
        parameters[0] = prefix(parameters[0]);
        this.notify.apply(this, parameters);
        this.$element.trigger.apply(this.$element, parameters);
        return this;
      },
      /**
       * Registers an observer to receive all events.
       * @method observe
       * @param {String||jQuery||HTMLElement} elements The observer.
       * @public
       * @chainable
       */
      observe: function (observer) {
        var $observers = this.$element.data('lu').$observers;
        $observers = $observers.add(HELPERS.$(observer));
        return this;
      },
      /**
       * Ceases observation of events by an observer.
       * @method detatch
       * @param {String||jQuery||HTMLElement} observer The observer.
       * @public
       * @chainable
       */
      detatch: function (observer) {
        var $observers = this.$element.data('lu').$observers;
        $observers = $observers.not(HELPERS.$(observer));
        return this;
      },
      /**
       * Execute all handlers and behaviors attached to observers for the
       * given event type. This interfaces with jQuery's trigger method.
       * @method notify
       * @public
       * @chainable
       */
      notify: function () {
        var parameters = Array.prototype.slice.call(arguments);

        parameters[0] = new $.Event(prefix(parameters[0]), {
          target: this.$element
        });

        _.each(this.$element.data('lu').$observers, function (observer) {
          var $observer = $(observer);
          $observer.trigger.apply($observer, parameters);
        });

        return this;
      }
    };
  });

  return Base;
});