var inherits = require('inherits')
  , mixin = require('otools').mixin;

var slice = Array.prototype.slice;

function Ctor() {
  if(!(this instanceof Ctor)) {
    return Object.create(Ctor.prototype);
  }
}

function createObj(ctor, args) {
  var obj
    , tmp;

  obj = Object.create(ctor.prototype);

  tmp = ctor.apply(obj, args);

  // Always allow the constructor return value to override
  if(tmp !== undefined) { obj = tmp; }

  return obj;
}

function create() {
  if(typeof this !== 'function') { throw new Error('create expects "this" to be a function'); }

  var args = arguments.length ? slice.call(arguments) : undefined;
  return createObj(this, args);
}

function extend(proto) {
  if(typeof this !== 'function') { throw new Error('extend expects "this" to be a function'); }

  var parent = this
    , ctor
    , base;

  if(proto && typeof proto.constructor === 'function') {
    base = proto.constructor;
    delete proto.constructor;
  }

  ctor = function() {
    var obj = this
      , tmp;

    if(!(obj instanceof ctor)) {
      obj = Object.create(ctor.prototype);
    }

    parent.apply(obj, arguments);

    if(base) {
      tmp = base.apply(obj, arguments);
      if(tmp !== undefined) { obj = tmp; }
    }

    return obj;
  };

  inherits(ctor, parent, proto);

  mixin(ctor, Ctor);

  return ctor;
}

Ctor.extend = extend;
Ctor.create = create;

module.exports = Ctor;
