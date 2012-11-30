define('decorators/invalidState', function () {
  /**
   * A decorator that provides a mechanism for working with a invalid state
   * @return {Object} an Object to be attached to the decorated instance's
   * prototype
   */
  var invalidStateDecorator = function () {
    var self = this;

    /**
     * Enumerations for the invalid state
     * @type {Object}
     */
    this.states.invalid = {
      values: [true, false],
      aria: {
        values: ['true', 'false']
      },
      lu: ['invalid', false]
    };

    //calls the invalidate method
    this.on('invalidate', function (event) {
      event.stopPropagation();
      self.invalidate();
    });

    //calls the invalidate method
    this.on('validate', function (event) {
      event.stopPropagation();
      self.validate();
    });

    return {
      /**
       * Sets the invalid state to true.
       * @method invalidate
       * @chainable
       */
      invalidate: function () {
        this.setState('invalid', true);
        return this;
      },
      /**
       * Sets the invalid state to false.
       * @method validate
       * @chainable
       */
      validate: function () {
        this.setState('invalid', false);
        return this;
      },
      /**
       * Method for checking the invalid state
       * @method isInvalid
       * @return {Boolean} the invalid state
       */
      isInvalid: function () {
        return this.getState('invalid');
      }
    };
  };

  return invalidStateDecorator;
});