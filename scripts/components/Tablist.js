/**
 * @class Tablist
 * @extends Abstract
 */

define('lu/components/Tablist', function () {
  var Abstract = require('lu/components/Abstract/Abstract');

  return Abstract.extend(function (base) {
    var defaults = {};
    return {
      init: function ($element, settings) {
        var selected;

        _.defaults(settings || {}, defaults);
        base.init.call(this, $element, settings);

        this.on('selected', function (event, instance) {
          event.stopPropagation();
          if (selected) {
            selected.deselect();
          }
          selected = instance;
        });

      }
    };
  });
});