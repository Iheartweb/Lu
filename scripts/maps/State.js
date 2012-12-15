define(['Map'], function (Map, SUPPORTS) {
  var Button = new Map({id: 'Button', autoExecute: events});

  Button.direct('[data-lu~=\"Button:Select\"]', function () {
    this.settings.action = 'select';
    this.ready(function () {
      console.log('Button Select directive resolved');
    });
  });

  return Button;
});