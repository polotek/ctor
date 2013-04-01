(function(e){if("function"==typeof bootstrap)bootstrap("ctor",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeCtor=e}else"undefined"!=typeof window?window.Ctor=e():global.Ctor=e()})(function(){var define,ses,bootstrap,module,exports;
return (function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0](function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
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
      obj = Object.create(ctor);
    }

    parent.apply(obj, arguments);

    if(base) {
      tmp = base.apply(obj, arguments);
      if(tmp) { obj = tmp; }
    }

    return obj;
  }

  inherits(ctor, parent, proto)

  mixin(ctor, Ctor);

  return ctor;
}

Ctor.extend = extend;
Ctor.create = create;

module.exports = Ctor;

},{"inherits":2,"otools":3}],2:[function(require,module,exports){
module.exports = inherits

function inherits (c, p, proto) {
  proto = proto || {}
  var e = {}
  ;[c.prototype, proto].forEach(function (s) {
    Object.getOwnPropertyNames(s).forEach(function (k) {
      e[k] = Object.getOwnPropertyDescriptor(s, k)
    })
  })
  c.prototype = Object.create(p.prototype, e)
  c.super = p
}

//function Child () {
//  Child.super.call(this)
//  console.error([this
//                ,this.constructor
//                ,this.constructor === Child
//                ,this.constructor.super === Parent
//                ,Object.getPrototypeOf(this) === Child.prototype
//                ,Object.getPrototypeOf(Object.getPrototypeOf(this))
//                 === Parent.prototype
//                ,this instanceof Child
//                ,this instanceof Parent])
//}
//function Parent () {}
//inherits(Child, Parent)
//new Child

},{}],3:[function(require,module,exports){
var slice = Array.prototype.slice;

var each = function(o, fn) {
  for(var k in o) {
    fn.call(o, o[k], k);
  }
}

var eachOwn = function(o, fn) {
  var keys = Object.keys(o);

  for(var i = 0, k; i < keys.length; i++) {
    k = keys[i];
    fn.call(o, o[k], k);
  }
}

var mixin = function(target, source) {
  var args = arguments.length > 2 ? slice.call(arguments,1) : [source];

  for(var i = 0; i < args.length; i++) {
    source = args[i];
    if(!source) { continue; }

    for(var k in source) {
      target[k] = source[k];
    }
  }

  return target;
}

exports.each = each;
exports.eachOwn = eachOwn;
exports.mixin = mixin;

},{}]},{},[1])(1)
});
;