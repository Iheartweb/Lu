define(function () {
  /**
   * A decorator that provides a mechanism for working with a hidden state
   * @return {Object} an Object to be attached to the decorated instance's
   * prototype
   */
  var hiddenStateDecorator = function () {
    var self = this;

    /**
     * Enumerations for the hidden state
     * @type {Object}
     */
    this.states.hidden = {
      values: [true, false],
      aria: ['true', 'false'],
      lu: ['hidden', false]
    };

    //calls the hidden method
    this.on('hide', function (event) {
      event.stopPropagation();
      self.hide();
    });

    //calls the show method
    this.on('show', function (event) {
      event.stopPropagation();
      self.show();
    });

    return {
      /**
       * Sets the hidden state to true
       * @method hide
       * @chainable
       */
      hide: function () {
        this.setState('hidden', true);
        return this;
      },
      /**
       * Sets the hidden state to false
       * @method ready
       * @chainable
       */
      show: function () {
        this.setState('hidden', false);
        return this;
      },
      /**
       * Method for checking the hidden state
       * @method isHidden
       * @return {Boolean} the hidden state
       */
      isHidden: function () {
        return this.getState('hidden');
      }
    };
  };

  return hiddenStateDecorator;
});