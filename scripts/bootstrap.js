//Configure requireJS to find Lu file and dependencies
require.config({
  baseUrl: '/scripts/',
  paths: {
    'Fiber': 'libraries/fiber/1.0.5/fiber.min'
  }
});

// Load some default mappers
require(['maps/Button', 'maps/Tab', 'maps/Tablist'], function () {});
