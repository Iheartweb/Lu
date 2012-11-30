define(['Map', 'supports'], function (Map, SUPPORTS) {
  var executionEvent = (SUPPORTS.touchEvents) ? 'touchstart' : 'click',
    Button;

  Button = new Map({id: 'Button', executeOnEvent: executionEvent});

  Button.direct('[data-lu~=\"Button:Select\"]', function () {
    this.settings.action = 'select';
  });

  return Button;
});