define('lu/Map', function () {
  var CONSTANTS = require('lu/constants'),
    Map;

  Map = Fiber.extend(function () {
    var Lu = require('lu/Lu'),
      defaults = {
        autoExecute: false,
        executeOnEvent: null
      };

    function register(map) {
      Lu.register(map);
    }

    return {
      init: function (settings) {
        _.defaults(settings || {}, defaults);

        this.id = settings.id;
        this.autoExecute = settings.autoExecute;
        this.executeOnEvent = settings.executeOnEvent;
        this.directives = [];

        register(this);
      },
      process: function (element) {
        var directives = this.directives,
          id = this.id,
          $element;

        //Coerce the the element into a jQuery Collection
        if (element instanceof $) {
          $element = element;
        } else {
          $element = $(element);
        }

        _.each($element, function (element) {
          var $element = $(element),
            deferral = deferral || $.Deferred(),
            component,
            data,
            accessors;

          _.each(directives, function (direction) {
            if ($element.is(direction.pattern)) {
              deferral = deferral || $.Deferred;
              data = data || $element.data(CONSTANTS.components.dataKey) || {};
              accessors = accessors || [];

              if (direction.accessor) {
                accessors.push(direction.accessor);
              }

              if (!data) {
                return;
              }

              if (!data[id]) {
                component = {
                  deferral: deferral,
                  ready: deferral.then,
                  settings: {}
                };
                //this structure means that only one component of a base type can be instantiated.
                //This is fine as long as our decoration logic exists within
                //the mappers and not the component itself
                data[id] = component;

                //set everything back on the data object.
                $element.data(CONSTANTS.components.dataKey, data);

              } else {
                //a component has already been created so let's use it.
                component = data[id];
              }

              if (!component.status) {
                _.each(accessors, function (accessor) {
                  //call the maps' accessor
                  accessor.call(component, $element);
                });
                component.status = 'mapped';
              }
            }
          });
        });

      },
      execute: function (element) {
        var deferral = $.Deferred(),
          requires = [],
          queue = [],
          $element;

        //Coerce the the element into a jQuery Collection
        if (element instanceof $) {
          $element = element;
        } else {
          $element = $(element);
        }

        //For each element get its components
        _.each($element, function (item) {
          var $element = $(item),
            components = $element.data(CONSTANTS.components.dataKey);

          //For each component queue it up and update its status
          _.each(components, function (component, id) {

            //only process components that have a status of mapped
            if (component.status === 'mapped') {
              id = CONSTANTS.components.prefix + id;

              //just in case we do something silly
              if (_.indexOf(requires, id) === -1) {
                requires.push(id);
              }

              queue.push({
                //the element
                $element: $element,
                //the component
                component: component,
                //the id
                id: id
              });

              component.status = 'queued';
            }
          });
        });

        //We've gathered all component information so let's load the necessary scripts
        require.ensure(requires, function (require) {
          _.each(queue, function (item) {
            var component = item.component,
              Export;

            //only process components that have a status of queued
            if (component.status === 'queued') {
              Export = require(item.id);
              component.instance = new Export($element, component.settings);
              component.deferral.resolveWith(component.instance);
              component.status = 'ready';
            }
          });

          deferral.resolveWith(Lu);
        });

        return deferral;
      },
      direct: function (pattern, accessor) {
        var self = this;

        this.directives.push({
          pattern: pattern,
          accessor: accessor
        });

        if (this.autoExecute) {
          return;
        }

        if (this.executeOnEvent) {
          $(pattern).one(this.executeOnEvent, function (event, instance) {
            var $this = $(this),
              $target = $(event.target),
              component;

            self.process($this);
            component = $this.lu('getComponent', self.id);
            if (component && component.status === 'mapped') {
              event.stopPropagation();
              event.preventDefault();
              self.execute($this).then(function () {
                console.warn('Mapper Execution Resolved');
                $target.trigger(event.type, [instance]);
              });
            }
          });
        }

        return this;
      }
    };
  });

  return Map;
});