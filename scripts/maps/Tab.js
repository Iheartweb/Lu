define(['Map'], function (Map) {
  var Tab = new Map({id: 'Tab', executeOnEvent: 'focus'});

  Tab.direct('[role~=tab]', function () {
    this.ready( function () {
      console.log('Tab directive resolved');
    });
  });

  return Tab;
});