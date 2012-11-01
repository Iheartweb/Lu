# Getting Started with Lu

Lu is a library that leverages semantics to describe interaction. This allows HTML authors to write rich interfaces without writing javascript.

Lu comes with a growing set of components. Each represents a building block of interactivity and is usually bound to markup through the use of a `data-lu` attribute. Components can be mixed, matched, rearranged, and re-purposed to build a wide variety of interfaces.

In this guide I'll talk about the steps needed to create a tabbed interface. We'll start by getting to know Lu's dependencies. We'll get Lu on your page and configure it. We'll write HTML that describes the desired interaction. Then, we'll give our tabs some style.

##Dependencies
Lu leverages a toolkit that includes <a href="http://www.jquery.com" target="_blank">jQuery</a> and <a href="http://documentcloud.github.com/underscore/" target="_blank">Underscore</a>, as well as a <a href="https://github.com/linkedin/inject/" target="_blank">CommonJS Loader</a>, and inheritance through <a href="https://github.com/linkedin/fiber/" target="_blank">Fiber</a>. I'll provide a brief description of each here. For more in-depth information see the <a href="#">architectural primer</a>. 

###jQuery and Underscore###
You've probably have heard of jQuery, but may have not heard of Underscore. Underscore is a utility belt that provides methods for working with objects, collections, and arrays. Because jQuery's ```$( '.selector' )``` returns an array, Underscore and jQuery are a powerful pair. Lu uses them to manipulate and read HTML. It uses them to map components to markup. And, to wire communication between them.

###CommonJS###
All Lu components are modular; they're commonJS (AMD) compliant. This means that they are loaded on the fly as needed. There are a lot of commonJS loaders out there. We use Inject, but also test Lu with requireJS and curl. If your already using one of those, great!

If your not already using a commonJS loader, we encourage the use of Inject. Inject goes above and beyond most other loaders and gives us improved caching as well as loading of scripts across domains. Also, as modularity is central to Lu's architecture, the Lu team works closely with the Inject team and contributes code on a regular basis.

###Inheritance###
While creating Lu, the team researched and used a plethora of inheritance models including <a href="#" target="_blank">Simple JavaScript Inheritance</a>, a underscore based variation inspired by backbone, <a href="#" target="_blank">Klass</a> and <a href="#" target="_blank">Class</a>. Nothing we looked at provided the right amount of sugar without obfuscating code or was fast enough. So, we created one and rolled it out as <a href="#">Fiber</a>.

Fiber provides Lu with a lightweight and <a href="#" target="_blank">fast</a> way to describe inheritance between components. Read about how its used to <a href="#">structure</a> Lu's components.

##<script/>##

Start by downloading Lu and all of the dependencies: <a href="#">Lu</a>, <a href="#">jQuery</a>, <a href="#">Underscore</a>, <a href="#">Fiber</a>, <a href="#">Inject</a>.

Once you have everything downloaded make sure you have the following scripts to your page:

```html
<script src="[path_to_inject].js"/>
<script src="[path_to_jquery].js"/>
<script src="[path_to_underscore]"/>
<script src="[path_to_fiber]"/>
```
**jQuery, Fiber, and Underscore are commonJS compliant. You could manage the loading of these libraries with inject.**

The last script we need to add is a bootstrap and is discussed in the next section.

```html
<script src="[path_to_lu-config]"/>
```

##Configuring Lu##
In the aptly named ```lu-config.js``` there's a configuration for using Lu with Inject. For more advanced configuration, please refer to Inject's <a href="#" target="_blank">Getting Started Guide</a> or to the manual of your commonJS loader.

```js
( function() {

  var PATH_TO_LU = '/scripts/libraries/lu/0.4.x/', 
    PATH_TO_LU_COMPONENTS = PATH_TO_LU + 'components/',
    PATH_TO_LU_MAPS = PATH_TO_LU + 'maps/';

  if( window.Inject ) {
    Inject.setModuleRoot('http://localhost/');
    //Rule for Components
    window.Inject.addRule( /^lu\//, {
      path: function( module ) {
        module = module.replace( 'lu/', '' );
        return PATH_TO_LU_COMPONENTS + module + '.js';
      }
    } );
    //Rule for Mappers
    window.Inject.addRule( /^lu-maps\//, {
      path: function( module ) {
        module = module.replace( 'lu-maps/', '' );
        return PATH_TO_LU_MAPS + module + '.js';
      }
    } );
    //Rule for Lu core
    window.Inject.addRule( /^lu/, {
      path: function( module ) {
        module = module.replace( 'lu-maps/', '' );
        return PATH_TO_LU_MAPS + module + '.js';
      }
    } );
  }

  require.ensure( ['lu', lu-map/Default'], function(){
    $( function(){
      Lu.execute( document );
    } );
  } );

} () );
```

Let's take apart this configuration and look at the important parts.

These lines are used to set the path to lu components. Edit them to point to your copy of Lu.
```js
var PATH_TO_LU = '/scripts/libraries/lu/0.4.x/', 
  PATH_TO_LU_COMPONENTS = PATH_TO_LU + 'components/',
  PATH_TO_LU_MAPS = PATH_TO_LU + 'maps/';
```

This line tells Inject the host to request files from. Change them to point to the location of Lu on your server. If your loading Lu from a remote server please see the <a href="#">inject guide</a> for cross domain loading.
```js
Inject.setModuleRoot('http://localhost/');
```

These rules tell inject how to map commonJS module Ids to files. For example the id of 'lu/Foo' maps to ````[PATH_TO_LU_COMPONENTS]foo.js``` Change thees rules at your own risk!

The last lines that we'll look at tell Inject to load Lu's core javascript, a default set of mappers, as well as to initialize Lu when the document is ready. Changes to the DOM after ```domready```, are picked up automatically. See our guide to mappers for more information on this.

Depending on your implementation you may want to remove thees lines and put it in your application's javascript.
```js
require.ensure( ['lu', lu-map/Default'], function(){
  $( function(){
    Lu.execute( document );
  } );
} );
```

If you've gotten this far the hard part is over. Let's write some HTML.

##Markup##
