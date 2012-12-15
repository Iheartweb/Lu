define(['constants', 'utilities'], function (CONSTANTS, UTILITIES) {

  var $cache = $([]),
    maps = [];

  function execute(element) {
    var deferrals = [];

    _.each(maps, function (map) {
      deferrals.push(map.execute(element));
    });

    return $.when.apply($, deferrals);
  }

  function map(element) {
    var $element = UTILITIES.$(element);

    _.each(maps, function (Map) {
      Map.process($element);
    });

    return this;
  }

  function register(map) {
    maps.push(map);
    return this;
  }

  function cache(element) {
    if(element) {
      $cache = $cache.add(element);
    }
    return $cache;
  }

  return {
    register: register,
    map: map,
    execute: execute,
    cache: cache
  };
});