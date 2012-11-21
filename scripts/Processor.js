define('lu/Processor', function () {
  Lu = require('lu/Lu');

  Processor = Fiber.extend(function () {
    var defaults = {
      scope: 'body'
    };

    init: function() {},
    start: function() {
      var maps = Lu.maps()
    }
    stop: function() {}
  });

  return Processor;
});