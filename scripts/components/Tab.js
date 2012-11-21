/**
 * @class Tab
 * @extends Abstract
 */

define('lu/components/Tab', function () {
  var Abstract = require('lu/components/Abstract/Abstract'),
    Switch = require('lu/components/Switch/Switch'),
    selected = require('lu/components/Switch/states/selected');

  return Abstract.extend(function (base) {
    var defaults = {
      states: null
    };
    return {
      init: function ($element, settings) {
        var AdaptedSwitch;

        _.defaults(settings || {}, defaults);
        base.init.call(this, $element, settings);

        AdaptedSwitch = new Switch($element, settings);
        Fiber.decorate(AdaptedSwitch, selected);

        this.disable = function(){
          AdaptedSwitch.select();
          return this;
        };

        this.enable = function(){
          AdaptedSwitch.deselect();
          return this;
        };

        this.isSelected = function() {
          return AdaptedSwitch.isSelected();
        };

      }
    };
  });
});