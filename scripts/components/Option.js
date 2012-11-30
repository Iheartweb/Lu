define('Option', function () {
  /**
   * A checkable input that has three possible values: true, false, or mixed.
   * @class Option
   * @extends {Input}
   */
  var Option,
  /**
   * @type {Input}
   */
  Input = require('Input'),
  /**
   * An imported decorator to support the checked state
   * @type {function}
   */
  checkedStateDecorator = require('decorators/checkedState');
  /**
   * An imported decorator to support the selected state
   * @type {function}
   */
  selectedStateDecorator = require('decorators/selectedState');

  Option = Input.extend(function (base) {
    /**
     * An map of defaults for instances of Option
     * @type {Object}
     */
    var defaults = {};

    return {
      /**
       * Constructs Option
       * @param {jQuery} $element A jQuery collection.
       * @param {Object} settings @optional A settings object.
       * @constructor
       */
      init: function ($element, settings) {
        settings = settings || {};
        _.defaults(settings, defaults);
        base.init.call(this, $element, settings);

        Fiber.decorate(this, checkedStateDecorator);
        Fiber.decorate(this, selectedStateDecorator);

        //setup the checked state on instantiation
        if (this.isChecked()) {
          self.check();
        }

        //setup the checked state on instantiation
        if (this.isSelected()) {
          self.select();
        }

      }
    };
  });

  return Option;
});