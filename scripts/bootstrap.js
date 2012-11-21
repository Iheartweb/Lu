(function () {
  'use strict';

  var root = '/scripts/',
    path = '';

  if (Inject) {
    //These lines are used for development to clear cache.
    Inject.setExpires(0);
    Inject.clearCache();

    //this block does some fooey to figure out where your server lives
    //if your using a remote server
    (function () {
      var documentLocation = document.location,
        protocol = documentLocation.protocol,
        hostname = documentLocation.hostname,
        port = documentLocation.port;

      Inject.setModuleRoot(protocol + '//' + hostname + ((port !== '') ? ':' + port + root : root));
    }());

    //shortcut to root
    Inject.addRule(/^lu\//, {
      path: function (module) {
        module = module.replace('lu/', '');
        return module + path + '.js';
      }
    });

    //require some useful maps by default
    require.ensure(['lu/maps/Buttons', 'lu/maps/Tab', 'lu/maps/Tablist'], function () {});
  }

} ());