define(function () {
  /**
   * A decorator that provides a mechanism for working with a checked state
   * @return {Object} an Object to be attached to the decorated instance's
   * prototype
   */
  var checkedStateDecorator = function () {
    var self = this;

    /**
     * Enumerations for the checked state
     * @type {Object}
     */
    this.states.checked = {
      values: [true, false, 'mixed'],
      aria: {
        name: 'checked',
        values: ['true', 'false', 'mixed'],
        filter: '[role=option], [role=checkbox]'
      },
      lu: {
        values: ['checked', false, 'mixed']
      },
      booleanAttribute: {
        name: 'checked',
        values: ['checked', false, false],
        filter: 'input[type=checkbox], input[type=radio]'
      }
    };

    //calls the check method
    this.on('check', function (event) {
      event.stopPropagation();
      self.check();
    });

    //calls the uncheck method
    this.on('uncheck', function (event) {
      event.stopPropagation();
      self.uncheck();
    });

    //calls the mix method
    this.on('mix', function (event) {
      event.stopPropagation();
      self.mix();
    });

    return {
      /**
       * Sets the checked state to true
       * @method check
       * @chainable
       */
      check: function () {
        this.setState('checked', true);
        return this;
      },
      /**
       * Sets the checked state to false
       * @method uncheck
       * @chainable
       */
      uncheck: function () {
        this.setState('checked', false);
        return this;
      },
      /**
       * Sets the checked state to mixed
       * @method mix
       * @chainable
       */
      mix: function () {
        this.setState('checked', 'mixed');
        return this;
      },
      /**
       * Method for checking the checked state
       * @method isChecked
       * @return {Boolean||String} the checked state
       */
      isChecked: function () {
        return this.getState('checked');
      }
    };
  };

  return checkedStateDecorator;
});