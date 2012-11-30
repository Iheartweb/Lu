define(['constants', 'helpers', 'utilities'], function (CONSTANTS, HELPERS, UTILITIES) {
  var $cache = $([]),
    maps = [];

  function execute(element) {
    var $element = UTILITIES.$(element),
      deferrals = [];

    _.each(maps, function (map) {
      deferrals.push(map.execute(element));
    });

    return $.when.apply($, deferrals);
  }

  function map(element) {
    var $element = UTILITIES.$(element);

    $cache = cache.add($element);

    _.each(maps, function (Map) {
      Map.process($element);
    });

    return this;
  }

  function register(map) {
    maps.push(map);
    return this;
  }

  //Bind utility methods to jQuery as a plug-in
  $.fn.lu = function (method) {
    var parameters = Array.prototype.slice.call(arguments),
      method = parameters[0],
      retrn;

    parameters.splice(0, 1);

    $cache = $cache.add(this);

    switch (method) {
    case 'observe':
      retrn = HELPERS.observe.apply(this, parameters);
      break;
    case 'detatch':
      retrn = HELPERS.detatch.apply(this, parameters);
      break;
    case 'notify':
      retrn = HELPERS.notify.apply(this, parameters);
      break;
    case 'getComponents':
      retrn = HELPERS.getComponents.apply(this, parameters);
      break;
    case 'getComponent':
      retrn = HELPERS.getComponent.apply(this, parameters);
      break;
    case 'getParents':
      retrn = HELPERS.getParents.call(this, $cache);
      break;
    case 'getDescendants':
      retrn = HELPERS.getDescendants.call(this, $cache);
      break;
    case 'getChildren':
      retrn = HELPERS.getChildren.call(this, $cache);
      break;
    case 'execute':
      retrn = Lu.execute(this);
      break;
    case 'map':
      Lu.map(this);
      retrn = this;
      break;
    default:
      throw new Error('No such method.');
    }

    return retrn;
  };

  return {
    execute: execute,
    map: map,
    register: register
  };
});