define(['Map'], function (Map) {
  var Tablist = new Map({id: 'Tablist', executeOnEvent: 'lu:selected'});

  Tablist.direct('[role~=tablist]', function ($element) {
    var $tab = $element.children('[role~=tab]:first');
    this.settings.selectedTabIndex = $tab.attr('tabindex');
    this.ready( function () {
      console.log('Tablist directive resolved');
    });
  });

  return Tablist;
});