define('lu/components/Switch/states/checked', function () {
  return function () {
    var self = this;

    this.states.checked = {
      name: 'checked',
      values: [true, false, 'mixed'],
      aria: {
        name: 'checked',
        values: ['true', 'false', 'mixed'],
        filter: '[role=option]'
      },
      lu: {
        values: ['checked', '']
      },
      booleanAttribute: {
        name: 'checked',
        values: ['checked', ''],
        filter: 'input[type=checkbox], input[type=radio]' 
      }
    };

    /**
     * Adds a checked state to the element
     * @return {this} the instance (chainable)
     */
    this.check = function () {
      this.setState('checked', true);
      return this;
    };

    /**
     * Removes the checked state from element
     * @return {this} the instance (chainable)
     */
    this.uncheck = function () {
      this.setState('checked', false);
      return this;
    };

    /**
     * Method for checking if the element has a checked state
     * @return {Boolean} true if the element has a checked state, otherwise false
     */
    this.isChecked = function () {
      return this.getState('checked');
    };

    this.on('checked', function () {
      self.checked();
    });

    //setup the checked state on instantiation
    if (this.isChecked()) {
      self.check();
    }
  };
});