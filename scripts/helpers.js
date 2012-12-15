define(['Lu', 'constants', 'utilities'], function (Lu, CONSTANTS, UTILITIES) {
  /**
   * Gets all components associated with the specified nodes(s)
   * @method getComponents
   * @param {*} element the element(s) This can be an HTMLElement, a jQuery
   * Collection or a selector.
   * @return {Array} a collection of component maps
   */
  function getComponents(element) {
    var $element = UTILITIES.$(element),
      key = CONSTANTS.components.dataKey,
      components = [],
      data;

    if ($element.length === 0) {
      //There's nothing to do here
      return;
    }

    //Terminal step
    if ($element.length === 1) {
      data = $element.data(key);
      if (data) {
        _.each(data, function(component) {
          components.push(component);
        });
        return components;
      }
      //no component data is present
      return;
    }

    _.each($element, function (element) {
      var comps = getComponents(element);
      if (comps) {
        components = components.concat(comps);
      }
    });

    return components;
  }

  /**
   * Gets all components of an id associates with the specified node.
   * @method getComponent
   * @param {*} element the element(s) This can be an HTMLElement, a jQuery
   * Collection or a selector.
   * @param {String} id A component id
   * @return {Array} The Lu components associated with the given element
   */
  function getComponent(element, id) {
    return _.filter(getComponents(element), function (component) {
      return component.id === id;
    });
  }

  /**
   * Gets the mapped parents of the passed in $element.
   * @param {*} element This can be an HTMLElement, a jQuery Collection or a
   * selector.
   * @return {jQuery} A jQuery collection of the parents
   */
  function getParents(element) {
    var $element = UTILITIES.$(element);
    return $element.parents().filter(Lu.cache());
  }

  /**
   * Gets the mapped descendants of the passed in element. This should be
   * called with a jQuery collection as its context.
   * @method getDescendants
   * @param {*} element This can be an HTMLElement, a jQuery Collection or a
   * selector.
   * @return {jQuery} A jQuery collection of the descendants
   */
  function getDescendants(element) {
    return this.find(Lu.cache());
  }

  /**
   * Gets the mapped children of the element.
   * @param {*} element This can be an HTMLElement, a jQuery Collection or a
   * selector.
   * @return {jQuery} A jQuery collection of the children
   */
  function getChildren(element) {
    return this.children(Lu.cache());
  }

  /**
   * Determines if an element is focusable
   * @param {*} element This can be an HTMLElement, a jQuery Collection or a
   * selector.
   * @return {Boolean} true if the element is focusable, otherwise false
   */
  function isFocusable(element) {
    var $element = UTILITIES.$(element),
      nodeName = $element.get(0).nodeName.toLowerCase(),
      tabIndex;

    // the element and all of its ancestors must be visible
    if (nodeName === 'area' && $element.parents(':hidden').length > 0) {
      return false;
    }
    if (nodeName !== 'area' && $element.closest(':hidden').length > 0) {
      return false;
    }

    // if the element is a standard form control, it must not be disabled
    if (/input|select|textarea|button|object/.test(nodeName) === true) {
      return !element.disabled;
    }

    tabIndex = $element.attr('tabindex');

    // If tabindex is defined, its value must be greater than 0
    if (!isNaN(tabIndex) && tabIndex < 0) {
      return false;
    }

    if (isNaN(tabIndex) && tabIndex >= 0) {
      return true;
    }

    // if the element is a link, href must be defined
    if ((nodeName == 'a' ||  nodeName == 'area') === true) {
      return (element.href.length > 0);
    }

    // this is some other page element that is not normally focusable.
    return false;
  }

  /**
   * Gets focusable descendants of the specified element
   * @param {*} element This can be an HTMLElement, a jQuery Collection or a
   * selector.
   * @return {jQuery} A jQuery collection of the descendants children
   */
  function getFocusableDecendants(element) {
    var $descendants = UTILITIES.$(element).find('*');åå
    return $(_.filter($descendants, function(descendant) {
      return isFocusable(descendant);
    }));
  }

  return {
    getChildren: getChildren,
    getDescendants: getDescendants,
    getParents: getParents,
    getComponent: getComponent,
    getComponents: getComponents,
    getFocusableDecendants: getFocusableDecendants,
    isFocusable: isFocusable
  }
});