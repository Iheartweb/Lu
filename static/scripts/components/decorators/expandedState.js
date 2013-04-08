define(function () {
  /**
   * A decorator that provides a mechanism for working with a expanded state
   * @return {Object} an Object to be attached to the decorated instance's
   * prototype
   */
  var expandedStateDecorator = function () {
    var self = this;

    /**
     * Enumerations for the expanded state
     * @type {Object}
     */
    this.states.expanded = {
      values: [true, false],
      aria: {
        values: ['true', 'false']
      },
      lu: ['expanded', false]
    };

    //calls the expand method
    this.on('expand', function (event) {
      event.stopPropagation();
      self.expand();
    });

    //calls the collapse method
    this.on('collapse', function (event) {
      event.stopPropagation();
      self.collapse();
    });

    //calls the toggleExpanded method
    this.on('toggle:expanded', function (event) {
      event.stopPropagation();
      self.toggleExpanded();
    });

    return {
      /**
       * Toggles the expanded state
       * @method toggleExpanded
       * @chainable
       */
      toggleExpanded: function () {
        if (this.isExpanded()) {
          return this.collapse();
        } else {
          return this.expand();
        }
      },
      /**
       * Sets the expanded state to true
       * @method expand
       * @chainable
       */
      expand: function () {
        this.setState('expanded', true);
        return this;
      },
      /**
       * Sets the expanded state to false
       * @method collapse
       * @chainable
       */
      collapse: function () {
        this.setState('expanded', false);
        return this;
      },
      /**
       * Method for checking the expanded state
       * @method isExpanded
       * @return {Boolean} the expanded state
       */
      isExpanded: function () {
        return this.getState('expanded');
      }
    };
  };

  return expandedStateDecorator;
});