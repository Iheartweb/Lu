define('Checkbox', function () {
  /**
   * A checkable input that has three possible values: true, false, or mixed.
   * @class Checkbox
   * @extends {Input}
   */
  var Checkbox,
  /**
   * @type {Input}
   */
  Input = require('Input'),
  /**
   * An imported decorator to support the expanded state
   * @type {function}
   */
  checkedStateDecorator = require('decorators/checkedState');

  Checkbox = Input.extend(function (base) {
    /**
     * An map of defaults for instances of Checkbox
     * @type {Object}
     */
    var defaults = {};

    return {
      /**
       * Constructs Checkbox
       * @param {jQuery} $element A jQuery collection.
       * @param {Object} settings @optional A settings object.
       * @constructor
       */
      init: function ($element, settings) {
        settings = settings || {};
        _.defaults(settings, defaults);
        base.init.call(this, $element, settings);

        Fiber.decorate(this, checkedStateDecorator);

        this.$element.on('change', function (event) {
          if(this.$element.prop('checked') === true){
            self.check();
          }
          if(this.$element.prop('checked') === false){
            self.uncheck();
          }
        }));

        //setup the checked state on instantiation
        if (this.isChecked()) {
          self.check();
        }
      }
    };
  });

  return Checkbox;
});