define(['Lu', 'HELPERS'], function (Lu, HELPERS) {
  //Bind utility methods to jQuery as a plug-in
  $.fn.lu = function (method) {
    var parameters = Array.prototype.slice.call(arguments),
      method = parameters[0],
      retrn;

    parameters.splice(0, 1, this);

    switch (method) {
    case 'observe':
      retrn = HELPERS.observe.apply(this, parameters);
      break;
    case 'detatch':
      retrn = HELPERS.detatch.apply(this, parameters);
      break;
    case 'notify':
      retrn = HELPERS.notify.apply(this, parameters);
      break;
    case 'getComponents':
      retrn = HELPERS.getComponents.apply(this, parameters);
      break;
    case 'getComponent':
      retrn = HELPERS.getComponent.apply(this, parameters);
      break;
    case 'getParents':
      retrn = HELPERS.getParents(this, Lu.cache);
      break;
    case 'getDescendants':
      retrn = HELPERS.getDescendants(this, Lu.cache);
      break;
    case 'getChildren':
      retrn = HELPERS.getChildren(this, Lu.cache);
      break;
    case 'execute':
      retrn = Lu.execute(this);
      break;
    case 'map':
      Lu.map(this);
      retrn = this;
      break;
    default:
      throw new Error('No such method.');
    }

    return retrn;
  };
});