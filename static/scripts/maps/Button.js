define(['Map', 'SUPPORTS'], function (Map, SUPPORTS) {
  var events = (SUPPORTS.touchEvents) ? 'touchstart' : 'click',
    Button;

  events += ' focus';

  Button = new Map({
    id: 'Button',
    executeOnEvent: events,
    autoExecute: true
  });

  Button.direct('[data-lu~=\"Button:Select\"]', function () {
    this.settings.action = 'select';
    this.ready(function () {
      console.log('Button Select directive resolved');
    });
  });

  Button.direct('[data-lu~=\"Button:Expand\"]', function () {
    this.settings.action = 'toggle:expanded';
    this.ready(function () {
      console.log('Button Expand directive resolved');
    });
  });

  return Button;
});