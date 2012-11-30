define('decorators/busyState', function () {
  /**
   * A decorator that provides a mechanism for working with a busy state
   * @return {Object} an Object to be attached to the decorated instance's
   * prototype
   */
  var busyStateDecorator = function () {
    var self = this;

    /**
     * Enumerations for the busy state
     * @type {Object}
     */
    this.states.busy = {
      values: [true, false],
      aria: ['true', 'false'],
      lu: ['busy', false]
    };

    //calls the busy method
    this.on('busy', function (event) {
      event.stopPropagation();
      self.busy();
    });

    //calls the grab method
    this.on('ready', function (event) {
      event.stopPropagation();
      self.ready();
    });

    return {
      /**
       * Sets the busy state to true
       * @method busy
       * @chainable
       */
      busy: function () {
        this.setState('busy', true);
        return this;
      },
      /**
       * Sets the busy state to false
       * @method ready
       * @chainable
       */
      ready: function () {
        this.setState('busy', false);
        return this;
      },
      /**
       * Method for checking the busy state
       * @method isBusy
       * @return {Boolean} the busy state
       */
      isBusy: function () {
        return this.getState('busy');
      }
    };
  };

  return busyStateDecorator;
});