define('lu/components/Switch/states/grabbed', function () {
  return function () {
    var self = this;

    this.states.grabbed = {
      name: 'grabbed',
      values: [true, false],
      aria: {
        name: 'grabbed',
        values: ['true', 'false']
      },
      lu: {
        values: ['grabbed', '']
      }
    };

    /**
     * Adds a grabbed state to the element
     * @return {this} the instance (chainable)
     */
    this.grab = function () {
      this.setState('grabbed', true);
      return this;
    };

    /**
     * Removes the grabbed state from element
     * @return {this} the instance (chainable)
     */
    this.show = function () {
      this.setState('grabbed', false);
      return this;
    };

    /**
     * Method for checking if the element has a grabbed state
     * @return {Boolean} true if the element has a grabbed state, otherwise false
     */
    this.isGrabbed = function () {
      return this.getState('grabbed');
    };

    this.on('grab', function () {
      self.hide();
    });

    //setup the grabbed state on instantiation
    if (this.isGrabed()) {
      self.grab();
    }
  };
});