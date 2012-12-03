define(['constants', 'utilities'], function (CONSTANTS, UTILITIES) {
  /**
   * Returns a components object containing all components mapped to a node.
   * This should be called with a jQuery collection as its context.
   * @method getComponents
   * @return {Object} The Lu components associated with the given element
   */
  function getComponents() {
    var components = CONSTANTS.components.dataKey,
      $this = UTILITIES.$(this);

    if ($this.length > 0) {
      return $this.data(components) || $this.data(components, {}).data(components);
    } else {
      return {};
    }
  }

  /**
   * Returns a component with the given id. This should be called with a
   * jQuery collection as its context.
   * @method getComponents
   * @param {String} id A component id
   * @return {Object} The Lu component associated with the given element
   */
  function getComponent(id) {
    return getComponents.call(this)[id];
  }

  /**
   * Gets the mapped parents of the passed in $element. This should be called
   * with a jQuery collection as its context.
   * @method getParents
   * @param {$jQuery} $filter A jQuery collection used to filter results
   * @return {jQuery} A jQuery collection of the parents
   */
  function getParents($filter) {
    return this.parents().filter($cache);
  }

  /**
   * Gets the mapped descendants of the passed in $element. This should be
   * called with a jQuery collection as its context.
   * @method getDescendants
   * @param {$jQuery} $filter A jQuery collection used to filter results
   * @return {jQuery} A jQuery collection of the descendants
   */
  function getDescendants($filter) {
    return this.find($cache);
  }

  /**
   * Gets the mapped children of the context. This should be called with a
   * jQuery collection as its context.
   * @param {$jQuery} $filter A jQuery collection used to filter results
   * @return {jQuery} A jQuery collection of the children
   */
  function getChildren($filter) {
    return this.children($cache);
  }

  /**
   * Observe a jQuery collection with an observer. Observers are stored in an
   * $element's data. This should be called with a jQuery collection as its
   * context.
   * @param {jQuery} $observer a jQuery collection.
   * @chainable
   */
  function observe($observer) {
    var $observers = this.data('$observers');

    if (!$observers) {
      return this.data('$observers', $observer);
    }

    $observers = $observers.add($observer.not($observers));
    this.data('$observers', $observers);

    return this;
  }

  /**
   * Remove an observer from an $element. This should be called with a jQuery
   * collection as its context.
   * @chainable
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
   * Notifies observers of an event. This should be called with a jQuery
   * collection as its context.
   * @param {String} event The name of the event
   * @param {Array} parameters An array of parameters to pass to event
   * listeners.
   * @chainable
   */
  function notify(event, parameters) {
    var $observers = this.data('$observers');

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
                target: this
              }), parameters);
            }
          });
        });

      });
    }
    return this;
  }

  return {
    notify: notify,
    observe: observe,
    detatch: detatch,
    getChildren: getChildren,
    getDescendants: getDescendants,
    getParents: getParents,
    getComponent: getComponent,
    getComponents: getComponents
  }
});