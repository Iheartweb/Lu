define('lu/components/Switch/states/expanded', function () {
  return function () {
    var self = this;

    this.states.expanded = {
      name: 'expanded',
      values: [true, false],
      aria: {
        name: 'expanded',
        values: ['true', 'false']
      },
      lu: {
        values: ['expanded', '']
      }
    };

    /**
     * Adds a expanded state to the element
     * @return {this} the instance (chainable)
     */
    this.disable = function () {
      this.setState('expanded', true);
      return this;
    };

    /**
     * Removes the expanded state from element
     * @return {this} the instance (chainable)
     */
    this.show = function () {
      this.setState('expanded', false);
      return this;
    };

    /**
     * Method for checking if the element has a expanded state
     * @return {Boolean} true if the element has a expanded state, otherwise false
     */
    this.isExpanded = function () {
      return this.getState('expanded');
    };

    this.on('expand', function () {
      self.hide();
    });

    //setup the expanded state on instantiation
    if (this.isExpanded()) {
      self.disable();
    }
  };
});