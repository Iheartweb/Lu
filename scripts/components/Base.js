define(['constants', 'helpers', 'utilities', 'Fiber', 'Lu'],
  function (CONSTANTS, HELPERS, UTILITIES, Fiber, Lu) {
  /**
   * The base component from which all others inherit.
   * @class Base
   * @extends {Base}
   */
  var Base = Fiber.extend(function () {
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
      related: '',
      /**
       * A selector that matches nodes to notify of events
       * @default ''
       * @type {String}
       */
      notify: '',
      /**
       * A flag that used to determine if aria attributes should be used to
       * to determine relation of components. If set to true aria-owns,
       * aria-describedby, aria-labelledby, and aria-controls are used to
       * relate elements. aria-controls is used to determine elements to
       * notify of events.
       * @default true
       * @type {Boolean}
       */
      aria: true
    };

    /**
     * Stores and retrieves data associated with the component.
     * @param {Sting} key The key of the data to store or retrieve. @optional
     * @param {*} value The value to set. @optional
     * @return {*} the value associated with the key or the data object if the
     * key is not specified
     */
    function data(key, value) {
      var d = this.$element.data('lu') || {};
      if (!d) {
        d = {};
      }
      if (value && key) {
        d[key] = value;
        this.$element.data('lu', d);
      }
      if(key) {
        return d[key];
      }
      return d;
    }

    function getStateful(element) {
      var $element = UTILITIES.$(element);
      $element = $element.find('[class*=' + CONSTANTS.states.prefix + ']');
      return $element.filter(Lu.cache());
    }

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
        index,
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
          //make sure we don't double prefix
          if (event.indexOf(CONSTANTS.events.prefix) !== 0) {
            events[index] = CONSTANTS.events.prefix + event;
          }
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
          relatedAttrs = ['aria-owns', 'aria-describedby', 'aria-labelledby', 'aria-controls'],
          related = [],
          $related = $(related),
          notifyAttrs = ['aria-controls'],
          notify = [],
          $notify,
          lu;

        settings = settings || {};
        _.defaults(settings, defaults);

        this.$element = $element;

        lu = data.call(this);

        //Add observers to the data object
        $notify = lu.observers || $([]);

        $notify = $notify.add(settings.notify);

        $related = $related.add(settings.related);

        if (settings.aria) {
          //iterate through aria props and identify elements that should be
          //observed
          _.each(relatedAttrs, function (property) {
            var attribute = self.$element.attr(property);
            if (attribute) {
              _.each(attribute.split(' '), function (id) {
                related.push('#' + id);
              });
            }
          });

          $related = $related.add(related.join(','));

          //iterate through aria props and identify elements that should be
          //notified
          _.each(notifyAttrs, function (property) {
            var attribute = self.$element.attr(property);
            if (attribute) {
              _.each(attribute.split(' '), function (id) {
                notify.push('#' + id);
              });
            }
          });

          $notify = $notify.add(notify.join(','));
        }

        data.call(this, 'observers', $notify);
        data.call(this, 'related', $related);
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
          store = data.call(this, 'states') || data.call(this, 'states', {}),
          lu = state.lu,
          aria = state.aria,
          booleanAttribute = state.booleanAttribute,
          currentIndex,
          values,
          filter,
          index,
          style;

        if (current !== value) {
          currentIndex = _.indexOf(state.values, current);
          index = _.indexOf(state.values, value);

          if (current) {
            style = lu[currentIndex];
            $element.removeClass(CONSTANTS.states.prefix + style);
          }
          if (value) {
            style = lu[index];
            $element.addClass(CONSTANTS.states.prefix + style);
          }

          //apply the aria state attribute
          if (aria) {
            if (_.isArray(aria)) {
              values = aria;
              filter = undefined;
            } else {
              values = aria.values;
              filter = aria.filter;
            }

            if ((filter && $element.is(filter)) || !filter) {
              if (values[index]) {
                $element.attr('aria-' + key, values[index]);
              } else {
                $element.removeAttr('aria-' + key);
              }
            }
          }

          //apply the boolean attribute state
          if (booleanAttribute) {
            if (_.isArray(booleanAttribute)) {
              values = booleanAttribute;
              filter = undefined;
            } else {
              values = booleanAttribute.values;
              filter = booleanAttribute.filter;
            }

            if ((filter && $element.is(filter)) || !filter) {
              if (values[index]) {
                $element.prop(key, values[index]);
              } else {
                $element.removeProp(key);
              }
            }
          }
        }

        if (!store[key] || current !== value) {
          data.call(this, 'states')[key] = value;
          this.trigger(key, [this]);
        }

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
        var self = this,
          parameters = Array.prototype.slice.call(arguments),
          deferrals = [],
          $related;

        $related = HELPERS.getParents(this.$element, Lu.cache());
        $related = $related.add(getStateful($related));

        parameters[0] = prefix(parameters[0]);

        _.each($related, function () {
          var components = HELPERS.getComponents($related);
          _.each(components, function (component) {
            if (component.execute) {
              component.execute();
            }
            deferrals.push(component.deferral);
          });
        });

        $.when.apply($, deferrals).then(function() {
          self.$element.trigger.apply(self.$element, parameters);
        });

        this.notify.apply(this, parameters);

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
        var $observers = data.call(this, 'observers');
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
        var parameters = Array.prototype.slice.call(arguments),
          observers = data.call(this, 'observers');

        parameters[0] = new $.Event(parameters[0], {
          target: this.$element
        });

        if (observers) {
          _.each(observers, function (observer) {
            var $observer = $(observer),
              components = HELPERS.getComponents($observer),
              deferrals = [];

            _.each(components, function (component) {
              deferrals.push(component.deferral);
              if (component.execute) {
                component.execute();
              }
            });

            $.when.apply($, deferrals).then(function () {
              $observer.trigger.apply($observer, parameters);
            });
          });
        }

        return this;
      }
    };
  });

  return Base;
});