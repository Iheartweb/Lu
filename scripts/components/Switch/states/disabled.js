define('lu/components/Switch/states/disabled', function (base) {
  return function () {
    var self = this;

    this.states.disabled = {
      name: 'disabled',
      values: [true, false],
      aria: {
        name: 'disabled',
        values: ['true', 'false']
      },
      lu: {
        values: ['disabled', '']
      },
      booleanAttribute: {
        name: 'disabled',
        values: ['disabled', ''],
        filter: 'input, button, optiongroup, option, select, textarea' 
      }
    };

    /**
     * Adds a disabled state to the element
     * @return {this} the instance (chainable)
     */
    this.disable = function () {
      this.setState('disabled', true);
      return this;
    };

    /**
     * Removes the disabled state from element
     * @return {this} the instance (chainable)
     */
    this.show = function () {
      this.setState('disabled', false);
      return this;
    };

    /**
     * Method for checking if the element has a disabled state
     * @return {Boolean} true if the element has a disabled state, otherwise false
     */
    this.isDisabled = function () {
      return this.getState('disabled');
    };

    this.on('disable', function () {
      self.hide();
    });

    //setup the disabled state on instantiation
    if (this.isDisabled()) {
      self.disable();
    }
  };
});