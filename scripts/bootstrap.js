//Configure requireJS to find Lu files and dependencies
require.config({
  baseUrl: '/scripts/',
  paths: {
    'Fiber': 'libraries/fiber/1.0.5/fiber.min'
  }
});

require(['Processor', 'maps/Button', 'maps/Tab', 'maps/Tablist', 'maps/Tabpanel'],
  function (Processor) {
    //new Processor(document);
});
