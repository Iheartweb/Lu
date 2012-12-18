define(['./Composite', 'helpers', 'constants'],
  function (Composite, HELPERS, CONSTANTS) {
  /**
   * A widget that may contain navigable descendants or owned children.
   * @class Tablist
   * @extends {Composite}
   */
  var Tablist = Composite.extend(function (base) {
    /**
     * An map of defaults for instances of Tablist
     * @type {Object}
     */
    var defaults = {
      multiselectable: false,
      wrap: true,
      items: '[role~=tab]'
    };

    return {
      /**
       * Constructs Tablist
       * @param {jQuery} $element A jQuery collection.
       * @param {Object} settings @optional A settings object.
       * @constructor
       */
      init: function ($element, settings) {
        var self = this,
          $selected;

        settings = settings || {};

        _.defaults(settings, defaults);
        base.init.call(this, $element, settings);

        this.multiselectable = settings.multiselectable;
        this.wrap = settings.wrap;

        /**
         * Retrieve the item that was last activated
         * @return {jQuery||undefined} A jQuery collection containing the item
         * or undefined if no item was activated
         */
        this.current = function () {
          return $selected;
        };

        //captures the selected event
        this.on('selected', function (event, instance) {
          var $selected;
          event.stopPropagation();
          if (instance.isSelected()) {
            $selected = instance.$element;
            if(!self.multiselectable) {
              self.deselect(self.items().not($selected));
            }
          }
        });

        //captures the expanded event
        this.on('expanded', function (event, instance) {
          event.stopPropagation();
          if (instance.isExpanded()) {
            $selected = instance.$element;
            if(!self.multiselectable) {
              self.deselect(self.items().not($selected));
            }
          }
        });

        //captures the focusin event
        this.$element.on('focusin', function (event) {
          $selected = $(event.target);
          if(!self.multiselectable) {
            self.select($selected);
          }
        });

        this.$element.on('keydown', function (event) {
          var keyboard = CONSTANTS.keyboard;

          if (self.items().is(event.target)) {
            switch (event.keyCode) {
              case keyboard.right:
              case keyboard.down: {
                event.stopPropagation();
                self.next().attr('tabindex', 0).focus();
                return false;
              }
              case keyboard.left:
              case keyboard.up: {
                event.stopPropagation();
                self.previous().attr('tabindex', 0).focus();
                return false;
              }
              case keyboard.home: {
                event.stopPropagation();
                self.first().attr('tabindex', 0).focus();
                return false;
              }
              case keyboard.end: {
                event.stopPropagation();
                self.last().attr('tabindex', 0).focus();
                return false;
              }
              case keyboard.enter:
              case keyboard.space: {
                if(self.multiselectable) {
                  event.stopPropagation();
                  self.items().not(event.target).attr('tabindex', 0);
                  self.select(event.target);
                  return false;
                }
              }
              case keyboard.tab: {
                if(!self.multiselectable) {
                  self.items().not($(event.target)).attr('tabindex', -1);
                } else {
                  self.items().attr('tabindex', 0);
                }
              }
            }
          }
        });
      },
      /**
       * Gets the previous owned item in the order that it appears in DOM. If
       * a previous item is not present and wrap is set to true, the last
       * item is retrieved otherwise the first item is retrieved.
       * @public
       * @return {jQuery} A jQuery collection containing the item.
       */
      previous: function () {
        var $items = this.items(),
          index = this.index(),
          size = this.size();

        if (index > 0) {
          return $items.eq(index + -1);
        }

        if (this.wrap) {
          return this.last();
        }

        return this.first();
      },
      /**
       * Gets the next owned item in the order that it appears in DOM. If
       * a next item is not present and wrap is set to true, the first item is
       * retrieved.
       * @public
       * @return {jQuery||undefined} A jQuery collection containing the item
       * or undefined when no next item exists.
       */
      next: function () {
        var $items = this.items(),
          index = this.index(),
          size = this.size();

        if (index < size - 1) {
          return $items.eq(index + 1);
        }

        if (this.wrap) {
          return this.first();
        }

        return this.last();
      },
      /**
       * Gets the first owned item in the order that it appears in DOM.
       * @public
       * @return {jQuery||undefined} A jQuery collection containing the item
       * or undefined when no items exists.
       */
      first: function () {
        if (this.size() > 0) {
          return $(_.first(this.items()));
        }
      },
      /**
       * Gets the last owned item in the order that it appears in DOM.
       * @public
       * @return {jQuery} A jQuery collection containing the item.
       */
      last: function () {
        if (this.size() > 0) {
          return $(_.last(this.items()));
        }
      },
      /**
       * Selects the specified owned items. If multiselectable is set to true
       * the item is expanded otherwise the item is selected.
       * @param {String||jQuery||HTMLElement} item The item to select.
       * @public
       * @chainable
       */
      select: function (item) {
        var self = this,
          $item = this.items().filter(item),
          components;

        if ($item.length > 0) {
          components = HELPERS.getComponent($item, 'Tab');
          _.each(components, function (component) {
            if(component.execute) {
              component.execute();
            }
            component.ready(function () {
              //This behaves like an accordion
              console.log(self.multiselectable, this);
              if(self.multiselectable && this.toggleExpanded) {
                this.toggleExpanded()
              }
              //This behaves like tabs
              if(!self.multiselectable && this.select) {
                this.select($item);
              }
            });
          });
        }

        return this;
      },
      /**
       * Deselects the specified owned items. If multiselectable is set to
       * true the item is collapsed otherwise the item is deselected.
       * @param {String||jQuery||HTMLElement} item The item to select.
       * @public
       * @chainable
       */
      deselect: function (item) {
        var self = this,
          $item = this.items().filter(item),
          components;

        if ($item.length > 0) {
          components = HELPERS.getComponent($item, 'Tab');
          _.each(components, function (component) {
            if(component.execute) {
              component.execute();
            }
            component.ready(function () {
              if(self.multiselectable && this.toggleExpanded) {
                this.toggleExpanded();
              }
              //This behaves like tabs
              if(!self.multiselectable && this.select) {
                this.deselect();
              }
            });
          });
        }

        return this;
      },
      /**
       * The zero based index of the item last selected.
       * @return {Number||undefined} undefined if not item was selected
       */
      index: function () {
        var $current = this.current();
        if ($current) {
          return this.items().index($current);
        }
      },
      /**
       * The number of items
       * @return {Number}
       */
      size: function () {
        return this.items().length;
      }
    };
  });

  return Tablist;
});