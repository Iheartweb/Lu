define(['./Widget', 'helpers', 'constants'], function (Widget, HELPERS, CONSTANTS) {
  /**
   * A widget that may contain navigable descendants or owned children.
   * @class Composite
   * @extends {Widget}
   */
  var Composite = Widget.extend(function (base) {
    /**
     * An map of defaults for instances of Composite
     * @type {Object}
     */
    var defaults = {
      multiselectable: false,
      selectedTabIndex: 1
    },
    keyboard = {
      tab: 9,
      enter: 13,
      esc: 27,
      space: 32,
      pageup: 33,
      pagedown: 34,
      end: 35,
      home: 36,
      left: 37,
      up: 38,
      right: 39,
      down: 40
    };

    return {
      /**
       * Constructs Composite
       * @param {jQuery} $element A jQuery collection.
       * @param {Object} settings @optional A settings object.
       * @constructor
       */
      init: function ($element, settings) {
        var self = this,
        //Stores the selected item(s)
        selected = [];

        settings = settings || {};
        _.defaults(settings, defaults);
        base.init.call(this, $element, settings);

        this.multiselectable = settings.multiselectable;
        this.selectedTabIndex = settings.selectedTabIndex;

        /**
         * Gets the owned items.
         * @return {jQuery}
         */
        this.items = function () {
          return this.$element.children(settings.items);
        };

        /**
         * Gets the item(s) currently selected.
         * @return {jQuery} a jQuery collection containing the selected tab(s)
         */
        this.current = function () {
          return selected;
        };

        //calls the next method
        this.on('next', function (event) {
          event.stopPropagation();
          self.next();
        });

        //calls the previous method
        this.on('previous', function (event) {
          event.stopPropagation();
          self.previous();
        });

        //calls the first method
        this.on('first', function (event) {
          event.stopPropagation();
          self.first();
        });

        //calls the last method
        this.on('last', function (event) {
          event.stopPropagation();
          self.last();
        });

        //calls the select method
        this.on('select', function (event, instance) {
          event.stopPropagation();
          self.select(instance.$element);
        });

        //calls the deselect method
        this.on('deselect', function (event, instance) {
          event.stopPropagation();
          self.deselect(instance.$element);
        });

        //captures the selected event
        this.on('selected', function (event, instance) {
          var deferrals = [],
            $element;

          event.stopPropagation();

          if (instance.isSelected()) {
            $element = instance.$element;
            $element.attr('tabindex', self.selectedTabIndex).focus();
            self.items().not($element).attr('tabindex', -1);
            _.each(selected, function (item) {
              item.deselect();
            });
            selected = [instance];
          }
        });

        this.$element.on('keydown', function (event) {
          var key;

          if (event.altKey) {
            return true;
          }

          switch(event.keyCode) {
            case keyboard.right:
            case keyboard.up: {
              event.stopPropagation();
              if (event.ctrlKey) {

              } else {
                self.next();
              }
              return false;
            }
            case keyboard.left:
            case keyboard.down: {
              event.stopPropagation();
              if (event.ctrlKey) {

              } else {
                self.previous();
              }
              return false;
            }
            case keyboard.home: {
              event.stopPropagation();
              self.first();
              return false;
            }
            case keyboard.end: {
              event.stopPropagation();
              self.last();
              return false;
            }
          }
        });
      },
      /**
       * Selects the previous owned item in the order that it appears in DOM.
       * @public
       * @chainable
       */
      previous: function () {
        var $items = this.items(),
          index = this.index(),
          size = this.size();

        if (index > 0) {
          this.select($items.eq(index - 1));
        } else {
          this.last();
        }
        return this;
      },
      /**
       * Selects the next owned item in the order that it appears in DOM.
       * @public
       * @chainable
       */
      next: function () {
        var $items = this.items(),
          index = this.index(),
          size = this.size();

        if (index + 1 < size) {
          this.select($items.eq(index + 1));
        } else {
          this.first();
        }
        return this;
      },
      /**
       * Selects the first owned item in the order that it appears in DOM.
       * @public
       * @chainable
       */
      first: function () {
        this.select(_.first(this.items()));
      },
      /**
       * Selects the last owned item in the order that it appears in DOM.
       * @public
       * @chainable
       */
      last: function () {
        this.select(_.last(this.items()));
      },
      /**
       * Selects a specified owned item.
       * @public
       * @param {String||jQuery||HTMLElement} item The item to select.
       * @chainable
       */
      select: function (item) {
        var $item = this.items().filter(item),
          components;

        if ($item.length > 0) {
          components = HELPERS.getComponents($item);
          _.each(components, function (component) {
            if (component.execute) {
              component.execute();
            }
            component.ready(function () {
              if(this.select) {
                this.select();
              }
            })
          });
        }

        return this;
      },
      /**
       * deselects a specified owned item.
       * @public
       * @param {String||jQuery||HTMLElement} item The item to select.
       * @chainable
       */
      deselect: function (item) {
        var $item = this.items().filter(item),
          current = this.current();

        if ($item) {
          $item.trigger(new $.Event('deselect', {
            target: $item
          }, [this]));
        }

        return this;
      },
      /**
       * The zero based index of the item last selected
       * @return {Number}
       */
      index: function () {
        return this.items().index(this.current()[0].$element);
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

  return Composite;
});