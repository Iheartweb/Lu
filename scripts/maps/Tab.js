define(['Map'], function (Map) {
  var Tab = new Map({
    id: 'Tab',
    executeOnEvent: 'focus click keydown',
    autoExecute: false
  });

  Tab.direct('[role~=tab]', function () {
    this.ready( function () {
      console.log('Tab directive resolved');
    });
  });

  return Tab;
});