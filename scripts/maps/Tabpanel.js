define(['Map'], function (Map) {
  var Tabpanel = new Map({id: 'Tabpanel', executeOnEvent: 'focus'});

  Tabpanel.direct('[role~=tabpanel]', function () {
    this.ready( function () {
      console.log('Tabpanel directive resolved');
    });
  });

  return Tabpanel;
});