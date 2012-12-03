define(['Map'], function (Map) {
  var Tablist = new Map({id: 'Tablist', executeOnEvent: 'lu:selected'});

  Tablist.direct('[role~=tablist]', function () {
    this.ready( function () {
      console.log('Tablist directive resolved');
    });
  });

  return Tablist;
});