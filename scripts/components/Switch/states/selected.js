define('lu/components/Switch/states/selected', function () {
  return function () {
    var self = this;

    this.states.selected = {
      name: 'selected',
      values: [true, false],
      aria: {
        name: 'selected',
        values: ['true', 'false'],
        filter: '[role*=tab],' + '[role*=gridcell],' +
            '[role*=option],' + '[role*=row]'
      },
      lu: {
        values: ['selected', '']
      }
    };

    /**
     * Adds a selected state to the element
     * @return {this} the instance (chainable)
     */
    this.select = function () {
      this.setState('selected', true);
      return this;
    };

    /**
     * Removes the selected state from element
     * @return {this} the instance (chainable)
     */
    this.deselect = function () {
      this.setState('selected', false);
      return this;
    };

    /**
     * Method for checking if the element has a selected state
     * @return {Boolean} true if the element has a selected state, otherwise false
     */
    this.isSelected = function () {
      return this.getState('selected');
    };

    this.on('select', function () {
      self.select();
    });

    //setup the selected state on instantiation
    if (this.isSelected()) {
      self.select();
    }
  };
});