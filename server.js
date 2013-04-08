var Hapi = require('hapi'),
  application;

// Create a server with a host and port
application = Hapi.createServer('localhost', 1337);

application.route([{
  method: 'GET',
  path: '/scripts/{path*}',
  handler: {
    directory: { 
      path: './static/scripts',
      listing: true
    }
  }
}, {
  method: 'GET',
  path: '/examples/{path}',
  handler: {
    directory: { 
      path: './static/examples/',
      listing: true
    }
  }
}, {
  method: 'GET',
  path: '/styles/{path*}',
  handler: {
    directory: { 
      path: './static/styles/css',
      listing: true
    }
  }
}, {
  method: 'GET',
  path: '/robots.txt',
  handler: {
    file: './static/robots.txt'
  }
}, {
  method: 'GET',
  path: '/favicon.ico',
  handler: {
    file: './static/favicon.ico'
  }
}]);

application.start(function () {
  console.log( 'The Lu server is running. Point your browser to http://localhost:1337/examples/' );
});
