define('lu/components/Switch/states/invalid', function () {
  return function () {
    var self = this;

    this.states.invalid = {
      name: 'invalid',
      values: [true, false],
      aria: {
        name: 'invalid',
        values: ['true', 'false']
      },
      lu: {
        values: ['invalid', '']
      }
    };

    /**
     * Adds a invalid state to the element
     * @return {this} the instance (chainable)
     */
    this.validate = function () {
      this.setState('invalid', false);
      return this;
    };

    /**
     * Removes the invalid state from element
     * @return {this} the instance (chainable)
     */
    this.invalidate = function () {
      this.setState('invalid', true);
      return this;
    };

    /**
     * Method for checking if the element has a validated state
     * @return {Boolean} true if the element has a selected state, otherwise false
     */
    this.isInvalid = function () {
      return this.getState('invalid');
    };

    this.on('invalidate', function () {
      self.invalidate();
    });

    //setup the invalid state on instantiation
    if (this.isInvalid()) {
      self.invalidate();
    }
  };
});