define(['Map'], function (Map) {
  var Tablist = new Map({
    id: 'Tablist',
    executeOnEvent: 'focusin click keydown',
    autoExecute: true
  });

  Tablist.direct('[role~=tablist]', function ($element) {
    this.settings.multiselectable = $element.attr('aria-multiselectable') || false;
    this.ready( function () {
      console.log('Tablist directive resolved');
    });
  });

  return Tablist;
});