define('lu/helpers', function () {
  return {
    trim: (function () {
      if (typeof String.prototype.trim === 'function') {
        return function (input) {
          return input.trim();
        };
      } else {
        return function (input) {
          return input.replace(/^\s+|\s+$/g, '');
        };
      }
    }())
  };
});