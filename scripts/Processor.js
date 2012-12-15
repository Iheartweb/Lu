define(['Lu', 'helpers', 'utilities', 'Fiber'],
  function (Lu, HELPERS, UTILITIES, Fiber) {
  var Processor = Fiber.extend(function () {
    var defaults = {};
    return {
      init: function(scope, settings) {
        var self = this,
          $scope = UTILITIES.$(scope),
          processing = false,
          events,
          duration = 1000,
          throttle = 300,
          timeout;

        settings = settings || {};
        _.defaults(settings, defaults);

        events = 'mousemove keydown DOMMouseScroll mousewheel mousedown ';
        events += 'touchstart touchmove';

        Lu.map($scope);

        function process(components) {
          var component = components.shift();

          if (!components.length) {
            processing = false;
          }

          if (component && component.execute) {
            if (component.executionEvent) {
              process(components);
              return;
            }
            component.execute().then(function () {
              if (processing) {
                process(components);
              }
            });
          }
        }

        this.start = function () {
          var $cache = Lu.cache(),
            $items = $scope.find($cache),
            components;

          $items = $items.add($scope.filter($cache));

          components = HELPERS.getComponents($cache);

          if (components) {
            processing = true;
            process(components);
          }
        };

        this.stop = function() {
          processing = false;
        };

        function startIdleTimer() {
          timeout = setTimeout(function(){
            self.start();
          }, duration);
        }

        $(document).on(events, function () {
          clearTimeout(timeout);
          self.stop();
          startIdleTimer();
        });

        startIdleTimer();
      }
    };
  });

  return Processor;
});