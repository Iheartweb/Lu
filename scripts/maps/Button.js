define(['Map', 'SUPPORTS'], function (Map, SUPPORTS) {
  var executionEvent = (SUPPORTS.touchEvents) ? 'touchstart' : 'click',
    Button;

  Button = new Map({id: 'Button', executeOnEvent: executionEvent});

  Button.direct('[data-lu~=\"Button:Select\"]', function () {
    this.settings.action = 'select';
    this.ready(function () {
      console.log('Button Select directive resolved');
    });
  });

  return Button;
});