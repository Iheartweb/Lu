define(['Map'], function (Map) {
  var Tabpanel = new Map({
    id: 'Tabpanel',
    autoExecute: false
  });

  Tabpanel.direct('[role~=tabpanel]', function () {
    this.ready( function () {
      console.log('Tabpanel directive resolved');
    });
  });

  Tabpanel.direct('[role~=tabpanel].accordion', function () {
    this.ready( function () {
      console.log('Accordion Tabpanel directive resolved');
    });
  });

  return Tabpanel;
});