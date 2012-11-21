define('lu/Lu', function () {
  var CONSTANTS = require('lu/constants'),
    $cache = $([]),
    Class,
    Lu;

  if (!Lu) {
    Class = Fiber.extend(function () {
      var defaults = {
        debug: 0
      },
      maps = [];

      return {
        init: function (settings) {
          settings = settings || {};
          _.defaults(settings, defaults);
        },
        execute: function (element) {
          var deferrals = [];
          _.each(maps, function (map) {
            deferrals.push(map.execute(element));
          });
          return $.when.apply($, deferrals);
        },
        register: function (map) {
          maps.push(map);
          return this;
        },
        map: function (element) {
          _.each(maps, function (Map) {
            Map.process(element);
          });
          return this;
        }
      };
    });
    Lu = new Class();
  }

  //Core Helpers

  /**
   * Returns a components object containing all components mapped to a node.
   * Available through $.lu jQuery plug-in.
   * @method getComponents
   * @private
   * @static
   * @return {Object} The Lu components associated with the given element
   */
  function getComponents() {
    var components = CONSTANTS.components.dataKey,
      $this = $(this);

    if ($this.length > 0) {
      return $this.data(components) || $this.data(components, {}).data(components);
    } else {
      return {};
    }
  }

  /**
   * Returns a component.
   * Available through $.lu jQuery plug-in.
   * @method getComponents
   * @private
   * @static
   * @param {String} id the component's Id
   * @return {Object} The Lu component associated with the given element
   */
  function getComponent(id) {
    var components = $(this).lu('getComponents');
    return components[id];
  }

  /**
   * Gets the mapped parents of the passed in $element.
   * Available through $.lu jQuery plug-in.
   * @method getParents
   * @public
   * @return {Object} A jQuery collection representing the parents
   */
  function getParents() {
    return $(this).parents().filter($cache);
  }

  /**
   * Gets the mapped descendants of the passed in $element. Available through $.lu jQuery plug-in.
   * @method getDescendants
   * @public
   * @return {Object} A Jquery collection of the descendants
   */
  function getDescendants() {
    return $(this).find($cache);
  }

  /**
   * Gets the mapped children of the passed in $element. Accessible
   * through $.lu.
   * @return {array}
   */
  function getChildren() {
    return $(this).children($cache);
  }

  /**
   * Observe a jQuery collection with an observer. Observers are
   * stored in an $element's data.  Accessible through $.lu. 
   * @param  {array} $observer a jQuery collection.
   * @return {array}
   */
  function observe($observer) {
    var $this = $(this),
      $observers = $this.data('$observers');

    if (!$observers) {
      return $this.data('$observers', $observer);
    }

    $observers = $observers.add($observer.not($observers));
    $this.data('$observers', $observers);

    return $this;
  }

  /**
   * Remove an observer from an $element. Accessible through $.lu.
   * @param  {array} $observer a jQuery collection
   * @return {array}
   */
  function detatch($observer) {
    var $this = $(this),
      $observers = $this.data('$observers');

    if ($observers) {
      $observers = $observers.not($observer);
    }

    $this.data('$observers', $observers);

    return $this;
  }

   /**
    * Notifies observers of an event. Accessible through $.lu.
    * @param  {String} event      The Name of the event
    * @param  {Array} parameters An array of parameters to pass to event listeners
    * @return {Object}
    */
  function notify(event, parameters) {
    var $this = $(this),
      $observers = $this.data('$observers');

    if ($observers) {
      _.each($observers, function (observer) {
        var $observer = $(observer),
          components = $observer.lu('getComponents');

        _.each(components, function (component) {
          var deferral = component.deferral;
          deferral.then(function () {
            var instance = component.instance;
            if (_.indexOf(instance.events(), event) > -1) {
              instance.trigger.call(instance, new $.Event(event, {
                target: $this
              }), parameters);
            }
          });
        });

      });
    }
    return $this;
  }

  (function ($) {
    //Bind utility methods to jQuery as a plug-in
    $.fn.lu = function (method) {
      var parameters = Array.prototype.slice.call(arguments),
        method = parameters[0],
        retrn;

      parameters.splice(0, 1);

      $cache = $cache.add(this);

      switch (method) {
      case 'observe':
        retrn = observe.apply(this, parameters);
        break;
      case 'detatch':
        retrn = detatch.apply(this, parameters);
        break;
      case 'notify':
        retrn = notify.apply(this, parameters);
        break;
      case 'getComponents':
        retrn = getComponents.apply(this, parameters);
        break;
      case 'getComponent':
        retrn = getComponent.apply(this, parameters);
        break;
      case 'getParents':
        retrn = getParents.call(this, $cache);
        break;
      case 'getDescendants':
        retrn = getDescendants.call(this, $cache);
        break;
      case 'getChildren':
        retrn = getChildren.call(this, $cache);
        break;
      case 'execute':
        retrn = Lu.execute($(this));
        break;
      case 'map':
        Lu.map($(this));
        retrn = this;
        break;
      default:
        throw new Error('No such method.');
      }

      return retrn;
    };
  }(jQuery));

  return Lu;
});