define(['Map'], function (Map) {
  var Tab = new Map({id: 'Tab', autoExecute: true});

  Tab.direct('[role~=tab]', function () {
    this.ready( function () {
      console.log('Tab directive resolved');
    });
  });

  return Tab;
});