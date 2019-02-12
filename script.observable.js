/** ... Observables utility (instantiable) **/
// See https://www.dofactory.com/javascript/observer-design-pattern
function Observable() {
  this.handlers = []; // Observers
};

Observable.prototype = {
  subscribe: function (callback) {
    this.handlers.push(callback);
  },
  unsubscribe: function (callback) {
    this.handlers = this.handlers.filter(function (item) {
      if (item !== callback) {
        return callback;
      }
    });
  },
  run: function (observe, scopeObject) {
    let scope = scopeObject || window;

    this.handlers.forEach(function (item) {
      item.call(scope, observe);
    });
  }
};