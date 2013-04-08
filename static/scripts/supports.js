define(function () {
  return {
    touchEvents: (function () {
      return 'touchstart' in document.documentElement;
    }()),
    mutationObservation: (function () {
      return 'MutationObserver' in window || 'WebkitMutationObserver' in window;
    }()),
    mutationEvents: (function () {
      return 'MutationEvent' in window;
    }())
  };
});