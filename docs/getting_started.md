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
While creating Lu, the team researched and used a plethora of inheritance libraries including <a href="#" target="_blank">Simple JavaScript Inheritance</a>, a underscore based variation inspired by backbone, <a href="#" target="_blank">Klass</a> and <a href="#" target="_blank">Class</a>. Nothing we looked at provided the right amount of sugar without obfuscating code or was fast enough. So, we created are own and rolled it out as <a href="#">Fiber</a>.

Fiber provides Lu with a lightweight and fast way to describe inheritance between components. Check out its <a href="#" target="_blank">performance</a> or read about how the code that runs out components in <a href="#">structured</a>.

##<script/>##

You can download the latest stable version of Lu. This download includes everything necessary for Lu to work. This includes all dependencies and a node based server. If you already have ready to go, you can download the dependencies manually as well as a stand alone pre-built version.

Once you have everything downloaded make sure you have the following scripts to your page:

```html
<script src="[path_to_inject]"/>
<script src="[path_to_jquery]"/>
<script src="[path_to_underscore]"/>
<script src="[path_to_fiber]"/>
```
**jQuery, Fiber, and Underscore are commonJS compliant. You could manage the loading of these libraries with inject.**

The script we need to add is a bootstrap. This script came as part of the Lu download and contains configuration for loading Lu. It can be changed to fit your specific implementation.

```html
<script src="[path_to_lu-config]"/>
```

##Configuring Lu##
This configuration is specific to Inject. For more advanced configuration, please refer to Inject's <a href="#" target="_blank">Getting Started Guide</a> or to the manual of your commonJS Loader.

```js
( function() {

  var PATH_TO_LU_COMPONENTS = '/scripts/lu/0.4.x/components/',
    PATH_TO_LU_MAPS = '/scripts/lu/0.4.x/maps/';

  if( window.Inject ) {
    Inject.setModuleRoot('http://www.yourdomain.com');
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
  }

  require.ensure( ['lu', lu-map/Default'], function(){
    $( function(){
      Lu.execute( document );
    } );
  } );

} () );
```

Let's take this line by line.

The first thing we do is set the path to Lu's components and maps. Point thees to wherever you'd like them to live on your server.

```js
var PATH_TO_LU_COMPONENTS = '/scripts/lu/0.4.x/components/',
  PATH_TO_LU_MAPS = '/scripts/lu/0.4.x/maps/';
```



