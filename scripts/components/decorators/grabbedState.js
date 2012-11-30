define('decorators/grabbedState', function () {
  /**
   * A decorator that provides a mechanism for working with a grabbed state
   * @return {Object} an Object to be attached to the decorated instance's
   * prototype
   */
  var grabbedStateDecorator = function () {
    var self = this;

    /**
     * Enumerations for the grabbed state
     * @type {Object}
     */
    this.states.grabbed = {
      values: [true, false],
      aria: ['true', 'false'],
      lu: ['disabled', false]
    };

    //calls the grab method
    this.on('grab', function (event) {
      event.stopPropagation();
      self.grab();
    });

    //calls the drop method
    this.on('drop', function (event) {
      event.stopPropagation();
      self.drop();
    });

    return {
      /**
       * Sets the grabbed state to true
       * @method grab
       * @chainable
       */
      grab: function () {
        this.setState('grabbed', true);
        return this;
      },
      /**
       * Sets the grabbed state to false
       * @method drop
       * @chainable
       */
      drop: function () {
        this.setState('grabbed', false);
        return this;
      },
      /**
       * Method for checking the grabbed state
       * @method isgrabbed
       * @return {Boolean} the grabbed state
       */
      isGrabbed: function () {
        return this.getState('grabbed');
      }
    };
  };

  return grabbedStateDecorator;
});