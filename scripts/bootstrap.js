//Configure requireJS to find Lu files and dependencies
require.config({
  baseUrl: '/scripts/',
  paths: {
    'Fiber': 'libraries/fiber/1.0.5/fiber.min'
  }
});

require(['Lu', 'Processor', 'maps/Button', 'maps/Tab', 'maps/Tablist', 'maps/Tabpanel'],
  function (Lu, Processor) {
    var $live = $('[role~=live]'),
      Observer,
      config = {
        attributes: false,
        childList: true,
        characterData: false
      };

    new Processor(document);

    Observer = new WebKitMutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        Lu.map($(mutation.addedNodes));
        console.log($(mutation.addedNodes), mutation, mutation.type);
      });
    });

    _.each( $live, function (item, index) {
      Observer.observe(item, config);
    });

});
