define(['Lu'], function () {
  Processor = Fiber.extend(function () {
    var defaults = {
      scope: 'body'
    };

    init: function() {},
    start: function() {}
    stop: function() {}
  });

  return Processor;
});