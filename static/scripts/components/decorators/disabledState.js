define(function () {
  /**
   * A decorator that provides a mechanism for working with a disabled state
   * @return {Object} an Object to be attached to the decorated instance's
   * prototype
   */
  var disabledStateDecorator = function () {
    var self = this;

    /**
     * Enumerations for the disabled state
     * @type {Object}
     */
    this.states.disabled = {
      values: [true, false],
      aria: ['true', 'false'],
      lu: ['disabled', false],
      booleanAttribute: {
        values: ['disabled', false],
        filter: 'input, button, optiongroup, option, select, textarea'
      }
    };

    //calls the disabled method
    this.on('disable', function (event) {
      event.stopPropagation();
      self.disable();
    });

    //calls the grab method
    this.on('enable', function (event) {
      event.stopPropagation();
      self.enable();
    });

    return {
      /**
       * Sets the disabled state to true
       * @method disabled
       * @chainable
       */
      disabled: function () {
        this.setState('disabled', true);
        return this;
      },
      /**
       * Sets the disabled state to false
       * @method ready
       * @chainable
       */
      show: function () {
        this.setState('disabled', false);
        return this;
      },
      /**
       * Method for checking the disabled state
       * @method isDisabled
       * @return {Boolean} the disabled state
       */
      isDisabled: function () {
        return this.getState('disabled');
      }
    };
  };

  return disabledStateDecorator;
});