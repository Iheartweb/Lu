define(['Map'], function (Map) {
  var Tablist = new Map({id: 'Tablist', executeOnEvent: 'focusin'});

  Tablist.direct('[role~=tablist]', function ($element) {
    this.settings.multiselectable = $element.attr('aria-multiselectable') || false;
    this.ready( function () {
      console.log('Tablist directive resolved');
    });
  });

  return Tablist;
});