define('decorators/selectedState', function () {
  /**
   * A decorator that provides a mechanism for working with a selected state
   * @return {Function} an Object to be attached
   * to the decorated instance's prototype
   */
  var selectedStateDecorator = function () {
    var self = this;

    /**
     * Enumerations for the selected state
     * @type {Object}
     */
    this.states.selected = {
      values: [true, false],
      aria: {
        values: ['true', 'false'],
        filter: '[role*=tab], [role*=gridcell], [role*=option], [role*=row]'
      },
      lu: ['selected', false],
      booleanAttribute: {
        values: ['selected', false],
        filter: 'option'
      }
    };

    //calls the select method
    this.on('select', function (event) {
      event.stopPropagation();
      self.select();
    });

    //calls the deselect method
    this.on('deselect', function (event) {
      event.stopPropagation();
      self.deselect();
    });

    return {
      /**
       * Sets the selected state to true
       * @method select
       * @chainable
       */
      select: function () {
        this.setState('selected', true);
        return this;
      },
      /**
       * Sets the selected state to false
       * @method deselect
       * @chainable
       */
      deselect: function () {
        this.setState('selected', false);
        return this;
      },
      /**
       * Method for checking the selected state
       * @method isSelected
       * @return {Boolean} the selected state
       */
      isSelected: function () {
        return this.getState('selected');
      }
    };
  };

  return selectedStateDecorator;
});