define(['./Widget'], function (Widget) {
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
    var defaults = {};

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

        /**
         * Gets the owned items.
         * @return {jQuery}
         */
        this.items = function () {
          return this.$element.children(settings.items);
        };

        /**
         * Gets the item currently selected.
         * @return {Object}
         */
        this.current = function () {
          return current;
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
          event.stopPropagation();
          if (instance.isSelected()) {
            _.each(selected, function (item) {
              item.deselect();
            });
            selected = [instance];
          }
        });
      },
      /**
       * Selects the previous owned item in the order that it appears in DOM.
       * @public
       * @chainable
       */
      previous: function () {
        this.select(this.current().$element.prev(this.items()));
        return this;
      },
      /**
       * Selects the next owned item in the order that it appears in DOM.
       * @public
       * @chainable
       */
      next: function () {
        this.select(this.current().$element.next(this.items()));
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
          current = this.current();

        if ($item) {
          $item.trigger(new $.Event('select', {
            target: $item
          }, [this]));
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
      }
    };
  });

  return Composite;
});