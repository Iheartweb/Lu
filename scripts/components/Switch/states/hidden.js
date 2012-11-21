define('lu/components/Switch/states/hidden', function () {
  return function () {
    var self = this;

    this.states.hidden = {
      name: 'hidden',
      values: [true, false],
      aria: {
        name: 'hidden',
        values: ['true', 'false']
      },
      lu: {
        values: ['hidden', '']
      }
    };

    /**
     * Adds a hidden state to the element
     * @return {this} the instance (chainable)
     */
    this.hide = function () {
      this.setState('hidden', true);
      return this;
    };

    /**
     * Removes the hidden state from element
     * @return {this} the instance (chainable)
     */
    this.show = function () {
      this.setState('hidden', false);
      return this;
    };

    /**
     * Method for checking if the element has a hidden state
     * @return {Boolean} true if the element has a hidden state, otherwise false
     */
    this.isHidden = function () {
      return this.getState('validated');
    };

    this.on('hide', function () {
      self.hide();
    });

    //setup the hidden state on instantiation
    if (this.isHidden()) {
      self.hide();
    }
  };
});