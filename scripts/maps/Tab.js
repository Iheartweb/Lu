define('Tab', function () {
  var Map = require('lu/Map'),
    Tab;

  Tab = new Map({id: 'Tab', executeOnEvent: 'lu:select'});
  Tab.direct('[role~=tab]', function(){
    this.ready(function () {
      console.info('Tab Directive Resolved')
    });
  });

  return Tab;
});