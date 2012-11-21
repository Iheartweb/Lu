/**
 * @class Switch
 * @extends Abstract
 */

define('lu/components/Switch/Switch', function () {
  var CONSTANTS = require('lu/constants'),
    Abstract = require('lu/components/Abstract/Abstract'),
    Switch;

  Switch = Abstract.extend(function (base) {
    var defaults = {
      states: 'active, inactive'
    };

    function getDomState(state) {
      var styles,
        current;

      if (!this.states) {
        return;
      }

      state = this.states[state];

      if (!state) {
        return;
      }

      styles = this.$element.attr('class');
      styles = (styles) ? styles.split(' ') : [];

      _.each(styles, function (style) {
        var prefix = CONSTANTS.states.prefix,
          index;
        if (style.indexOf(prefix) === 0) {
          style = style.replace(prefix, '');
          index = _.indexOf(state.lu.values, style);
          if (index > -1) {
            current = index;
          }
        }
      });

      if (!current || current < 0) {
        _.each(state.lu.values, function (item, index) {
          if (!item) {
            current = index;
          }
        });
      }
      return current;
    }

    return {
      /**
       * Class constructor
       * @method init
       * @public
       * @param {Object} $element JQuery object for the element wrapped by the component
       * @param {Object} settings Configuration settings
       */
      init: function ($element, settings) {
        var states;

        _.defaults(settings || {}, defaults);
        base.init.call(this, $element, {});

        this.states = {};
        states = settings.states;

        if (states && typeof states === 'string') {
          states = states.replace(' ').split(',');
        }

        if (_.isArray(states)) {
          this.states[states.name || states[0]] = {
            name: states[0],
            values: states,
            lu: {
              values: states
            }
          };
        }

        this.setState = function (id, value) {
          var current,
            index,
            state,
            booleanAttribute,
            aria,
            lu;

          state = this.states[id];

          if (!state) {
            return;
          }

          lu = state.lu;
          aria = state.aria;
          booleanAttribute = state.booleanAttribute;

          //There is not current state stored on the state object
          //if (state.value !== value) {

          //get the current index
          if (state.value) {
            current = _.indexOf(state.values, state.value);
          } else {
            current = getDomState.call(this, id);
          }

          //get the index of the value we would like to change to
          index = _.indexOf(state.values, value);

          //the value is allowed and it's not the current value
          if (index > -1 && index !== current) {

            if (state.lu.values[current]) {
              $element.removeClass(CONSTANTS.states.prefix + state.lu.values[current]);
            }

            if (state.lu.values[index]) {
              $element.addClass(CONSTANTS.states.prefix + state.lu.values[index]);
            }

            //Set Aria state
            if (aria) {
              if (!aria.filter || (aria.filter && $element.is(aria.filter))) {
                $element.attr('aria-' + aria.name, aria.values[index]);
              }
            }

            //Set booleanAttribute
            if (state.booleanAttribute) {
              if (!booleanAttribute.filter || (booleanAttribute.filter && $element.is(booleanAttribute.filter))) {
                $element.prop(state.booleanAttribute.name, booleanAttribute.values[index]);
              }
            }

            state.value = value;
            this.trigger(state.name, [this]);
          }

        };

        this.getState = function (id) {
          var state = this.states[id];
          if (!state.value) {
            this.setState(state.values[getDomState.call(this, id)]);
          }
          return state.value;
        };
      }
    };
  });

  return Switch;
});