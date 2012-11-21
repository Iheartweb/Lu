
define('Button', function () {

  var Map = require('lu/Map'),
    SUPPORTS = require('lu/supports'),
    executionEvent = (SUPPORTS.touchEvents) ? 'touchstart' : 'click',
    Buttons;

  Buttons = new Map({id: 'Button', executeOnEvent: executionEvent});

  Buttons.direct('[data-lu~=\"Button:Select\"]', function () {
    this.settings.action = 'select';
    this.ready(function () {
      console.info('Button:Select Directive Resolved')
    });
  });

  return Buttons;
});