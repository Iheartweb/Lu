define('Tablist', function () {
  var Map = require('lu/Map'),
    Tablist;

  Tablist = new Map({id: 'Tablist', executeOnEvent: 'lu:selected'});
  Tablist.direct('[role~=tablist]', function(){
    this.ready(function () {
      console.info('Tablist Directive Resolved')
    });
  });

  return Tablist;
});