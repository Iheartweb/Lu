define(['Lu', 'Fiber', 'constants', 'utilities', 'helpers'],
  function (Lu, Fiber, CONSTANTS, UTILITIES, HELPERS) {

  var Map;

  Map = Fiber.extend(function () {
    var defaults = {
      autoExecute: false,
      executeOnEvent: undefined
    };

    function register(map) {
      return Lu.register(map);
    }

    function cache(element) {
      return Lu.cache(element);
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
        debugger;
        var self = this,
          directives = this.directives,
          id = this.id,
          $element = UTILITIES.$(element);

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
                  id: id,
                  executionEvent: self.executeOnEvent,
                  autoExecute: self.autoExecute,
                  deferral: deferral,
                  ready: deferral.then,
                  settings: {}
                };
                //this structure means that only one component of a base type
                //can be instantiated. This is fine as long as our decoration
                //logic exists within the mappers and not the component itself
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

                component.execute = function () {
                  var execution = self.execute($element);
                  delete component.execute;
                  return execution;
                };

                component.status = 'mapped';
              }
            }
          });
        });

        return this;
      },
      execute: function (element) {
        var deferral = $.Deferred(),
          requires = [],
          queue = [],
          $element = UTILITIES.$(element);

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

        //We've gathered all component information so let's load the necessary
        //scripts
        require(requires, function () {
          _.each(queue, function (item, index) {
            var component = item.component;

            require([item.id], function (Module) {
              //only process components that have a status of queued
              if (component.status === 'queued') {
                component.instance = new Module(item.$element, component.settings);
                component.status = 'ready';
                component.deferral.resolveWith(component.instance);
              }

              if (index === queue.length - 1) {
                deferral.resolveWith(Lu);
              }
            });
          });
        });

        return deferral;
      },
      direct: function (pattern, accessor) {
        var self = this,
          $pattern = UTILITIES.$(pattern),
          processer;

        cache($pattern);

        this.directives.push({
          pattern: pattern,
          accessor: accessor
        });

        processer = self.process($pattern);

        if (this.executeOnEvent) {
          $pattern.one(this.executeOnEvent, function (event, instance) {
            var $this = $(this),
              $target = $(event.target),
              deferrals,
              promise,
              components,
              state;

            self.process($this);
            components = HELPERS.getComponent($this, self.id);

            deferrals = _.pluck(components, 'deferral');

            promise = $.when.apply($, deferrals, components);
            state = promise.state();

            if (state === 'pending') {
              event.stopPropagation();
              event.preventDefault();

              promise.then(function () {
                if (instance) {
                  $target.trigger(event.type, [instance]);
                } else {
                  $target.trigger(event.type);
                }
              });
            }

            _.each(components, function (component) {
              if (component.execute) {
                component.execute();
              }
            });
          });
        }

        return this;
      }
    };
  });

  return Map;
});