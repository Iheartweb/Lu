define(function () {
  return {
    /**
     * Removes whitespace from both ends of the string.
     * @param  {String} input The string to trim.
     * @return {String} the trimmed string.
     */
    trim: function (input) {
      if (typeof String.prototype.trim === 'function') {
          return input.trim();
      } else {
        return input.replace(/^\s+|\s+$/g, '');
      }
    },
    /**
     * Coerces an unknown input into a jQuery collection. This is useful when
     * a parameter may be a HTMLElement a Selector or a jQuery Collection.
     * @param  {HTMLElement||String||jQuery} element
     * @return {jQuery}
     */
    $: function (element) {
      if( element instanceof $ ) {
        return element;
      } else {
        return $(element);
      }
    }
  };
});