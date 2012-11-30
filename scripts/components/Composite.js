define('Composite', function () {
  /**
   * A widget that may contain navigable descendants or owned children.
   * @class Composite
   * @extends {Widget}
   */
  var Composite,
  /**
   * @type {Widget}
   */
  Widget = require('Widget');

  Composite = Widget.extend(function (base) {
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
        //Stores the last item selected
        current;

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
        this.on('select', function (event, component) {
          event.stopPropagation();
          self.select(component.$element);
        });

        //captures the selected
        this.on('selected', function (event, component) {
          event.stopPropagation();
          if (!current.$element.is(component.$element)) {
            current.deselect();
            current = component;
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
          if (current) {
            current.deselect();
          }
          $item.trigger(new $.Event('select', {
            target: $item
          }, [this]));
        }
      }
    };
  });

  return Composite;
});