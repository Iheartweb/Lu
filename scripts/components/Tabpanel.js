/**
 * @class Tab
 * @extends Base
 */

define('lu/components/Base', function () {
  var Abstract = require('lu/components/Abstract/Abstract'),
    Switch = require('lu/components/Switch/Switch'),
    busy = require('lu/components/Switch/states/busy'),
    disabled = require('lu/components/Switch/states/disabled'),
    grabbed = require('lu/components/Switch/states/grabbed'),
    hidden = require('lu/components/Switch/states/hidden'),
    invalid = require('lu/components/Switch/states/invalid');

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