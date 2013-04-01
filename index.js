var inherits = require('inherits')
  , mixin = require('otools').mixin;

var slice = Array.prototype.slice;

function Ctor() {
  if(!(this instanceof Ctor)) {
    return Object.create(Ctor.prototype);
  }
}

function createObj(ctor, args) {
  var obj = Object.create(ctor.prototype);

  ctor.apply(obj, args);

  return obj;
}

function create() {
  if(typeof this !== 'function') { throw new Error('create expects "this" to be a ctor function'); }

  var args = arguments.length ? slice.call(arguments) : undefined;
  return createObj(this, args);
}

function extend(proto) {
  if(typeof this !== 'function') { throw new Error('extend expects "this" to be a ctor function'); }

  var parent = this
    , ctor
    , base;

  if(proto && typeof proto.constructor === 'function') {
    base = proto.constructor;
    delete proto.constructor;
  }

  ctor = function() {
    var obj = this;

    if(!(obj instanceof ctor)) {
      obj = Object.create(ctor.prototype);
    }

    parent.apply(obj, arguments);

    if(base) {
      base.apply(obj, arguments);
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
