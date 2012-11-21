define('lu/components/Switch/states/busy', function () {
  return function () {
    var self = this;

    this.states.busy = {
      name: 'busy',
      values: [true, false],
      aria: {
        name: 'busy',
        values: ['true', 'false']
      },
      lu: {
        values: ['busy', '']
      }
    };

    /**
     * Adds a busy state to the element
     * @return {this} the instance (chainable)
     */
    this.busy = function () {
      this.setState('busy', true);
      return this;
    };

    /**
     * Removes the busy state from element
     * @return {this} the instance (chainable)
     */
    this.ready = function () {
      this.setState('busy', false);
      return this;
    };

    /**
     * Method for checking if the element has a busy state
     * @return {Boolean} true if the element has a busy state, otherwise false
     */
    this.isBusy = function () {
      return this.getState('busy');
    };

    this.on('busy', function () {
      self.busy();
    });

    //setup the busy state on instantiation
    if (this.isBusy()) {
      self.busy();
    }
  };
});