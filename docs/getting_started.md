# Getting Started with Lu

** Note this guide is written for the versions 0.4.x+ **

Lu is a library that leverages semantics to describe interaction. This allows HTML authors to write rich interfaces without writing javascript.

Lu comes with a growing set of components. Each represents a building block of interactivity and is usually bound to markup through the use of a `data-lu` attribute. Components can be mixed, matched, rearranged, and re-purposed to build a wide variety of interfaces.

In this guide I'll talk about the steps needed to create a tabbed interface. We'll start by getting to know Lu's dependencies. We'll get Lu on your page and configure it. We'll write HTML that describes the desired interaction. Then, we'll give our tabs some style.

##Dependencies
Lu leverages a toolkit that includes <a href="http://www.jquery.com" target="_blank">jQuery</a> and <a href="http://documentcloud.github.com/underscore/" target="_blank">Underscore</a>, a CommonJS Loader (<a href="http://requirejs.org/" target="_blank">requireJS</a>), and <a href="https://github.com/linkedin/fiber/" target="_blank">Fiber</a>. I'll provide a brief description of each here. For more in-depth information see the <a href="#">architectural primer</a> (Coming Soon!). 

###jQuery and Underscore###
You've probably have heard of jQuery, but may have not heard of Underscore. Underscore is a utility belt that provides methods for working with objects, collections, and arrays. Because jQuery's ```$( '.selector' )``` returns an array, Underscore and jQuery are a powerful pair. Lu uses them to manipulate and read HTML. It uses them to map components to markup. And, to wire communication between them.

###CommonJS###
All Lu components are modular; they're AMD compliant. This means that they are loaded on the fly as needed. There are a lot of commonJS loaders out there. We use RequireJS for it's dependability and ease of use.

###Inheritance###
While creating Lu, the team researched and used a plethora of inheritance models including <a href="#" target="_blank">Simple JavaScript Inheritance</a>, a underscore based variation inspired by backbone, <a href="#" target="_blank">Klass</a> and <a href="#" target="_blank">Class</a>. Nothing we looked at provided the right amount of sugar without obfuscating code or was fast enough. So, we created one and rolled it out as <a href="https://github.com/linkedin/Fiber" target="_blank">Fiber</a>.

Fiber provides Lu with a lightweight and <a href="http://jsperf.com/js-inheritance-performance" target="_blank">fast</a> way to describe inheritance between components. Read about how its used to <a href="component_anatomy.md">structure</a> Lu's components.

###Script Inclusion###

Start by downloading Lu and all of the dependencies: <a href="#">Lu</a>(Needs updating with 0.4.x release), <a href="http://www.jquery.com" target="_blank">jQuery</a>, <a href="http://underscorejs.org/" target="_blank">Underscore</a>, <a href="https://github.com/linkedin/Fiber" target="_blank">Fiber</a>, <a href="http://www.requirejs.org" target="_blank">RequireJS</a>.

Once you have everything downloaded make sure you have the following scripts to your page:

```html
<script src="[path_to_requirejs].js"/>
<script src="[path_to_jquery].js"/>
<script src="[path_to_underscore]"/>
```
**You may have noticed Fiber is not included via a script tag. Fiber is fully AMD complaint and is loaded asynchronously**

The last script we need to add is a bootstrap and is discussed in the next section.

```html
<script src="[path_to_bootstrap]"/>
```

##Configuring Lu##
In the aptly named ```bootstrap.js``` there's a bootstrap for telling RequireJS where Lu modules live. The contents of this file look something like the below. For more advanced configuration, please refer to the requireJS's <a href="https://github.com/jrburke/r.js/blob/master/build/example.build.js" target="_blank">sample file</a>.

```js
//Configure requireJS to find Lu file and dependencies
require.config({
  baseUrl: '[base path to lu]',
  paths: {
    'Fiber': 'libraries/fiber/1.0.5/fiber'
  }
});

// Load some default mappers
require(['maps/Button', 'maps/Tab', 'maps/Tablist', 'maps/Tabpanel'], function () {});

```
The base path to lu should be replaced with the path of lu on your server. This might be something like `/scripts/libs/lu/`.

The require method call loads files that tell what to look for in HTML. You can load more maps here as you use them or load them when needed.

---

If you've gotten this far the hard part is over. Let's write some HTML.

##Markup##
This markup is a tab implementation complete with Lu and aria role goodness.

```html
<ul role="tablist">
  <li role="tab" class="lu-state-selected" aria-selected="true" aria-controls="sherlock">
    <a href="#sherlock" data-lu="Button:Select">Sherlock</a>
  </li>
  <li role="tab" aria-controls="watson">
    <a href="#watson" data-lu="Button:Select">Watson</a>
  </li>
  <li role="tab" aria-controls="moriarty">
    <a href="#moriarty" data-lu="Button:Select">Moriarty</a>
  </li>
</ul>
<div id="sherlock" role="tabpanel">
  <!-- Content -->
</div>
<div id="watson" role="tabpanel">
  <!-- Content -->
</div>
<div id="moriarty" role="tabpanel">
  <!-- Content -->
</div>
```
Try this markup out in your browser. If you have an HTML inspector open you'll notice that as you click on the links the states of the tabpanels are updated.

You'll also notice that the Tabs don't look very pretty. Lu focuses on interface behavior. If your looking for an easy to add a presentation on top of Lu, check out Archetype (link not yet public).

The maps you loaded in the bootstrap look for some very specific things. Here's the contents of the map that tells Lu about ```data-lu="Button:Select"````.

```js
define(['Map', 'supports'], function (Map, SUPPORTS) {
  var executionEvent = (SUPPORTS.touchEvents) ? 'touchstart' : 'click',
    Button;

  Button = new Map({id: 'Button', executeOnEvent: executionEvent});

  Button.direct('[data-lu~=\"Button:Select\"]', function () {
    this.settings.action = 'select';
  });

  return Button;
});
```
This file tells Lu to map the css selector: ```[data-lu~=\"Button:Select\"]``` to a ```Button``` components. It tells Lu to instantiate that component on click or touch.

Most importantly it tells gives Lu directions on how to setup the button when its instantiated. In this case it tells Lu to set the state of the tab to selected.

For information on other states that you can set see <a href="http://www.w3.org/TR/wai-aria/states_and_properties" target="_blank">Supported States and Properties</a>.

For information on components see <a href="http://www.w3.org/TR/wai-aria/roles#widget_roles" target="_blank">Widget Roles</a> in section 5.3.2.

Lu provides coverage of aria widget roles plus <a href="#" target="_blank">some extra compositions</a>(Pending) like <a href="#" target="_blank">Carousel</a>(Pending). As long as you markup your HTML with aria attributes, you'll only need to tell Lu about components that are directly interacted with.

In a tabbed interface the component that is directly interacted with is are the anchors notated with ```data-lu="Button:Select"```. Other Buttons like ```data-lu="Button:Expand"``` are also loaded the Button Map.

Lu also supports <a href="#" target="_blank">full declaration for all components</a>(Pending).

To configure components, see the <a href="#" target="_blank">configuration guide</a>(Pending).

For working examples of all aria components <a href="#" target="_blank">use.lu</a>(Pending).

Enjoy!
