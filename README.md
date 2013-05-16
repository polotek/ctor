ctor
====

A simple and familiar prototypal system.

```js
var Ctor = require('ctor');

var Person = Ctor.extend({
  constructor: function Person(args) {
    this.name = args['name'];
    this.nickname = args['nickname'];
  }

  , names: function() {
    return name + "[" + nickname + "]";
  }

  , sayHello: function() {
    return "Hey, I'm " + this.name + '. But you can call me ' + this.nickname; 
  }
});

var p = Person.create({name: 'Marco', nickname: 'polotek'});

console.log(p.sayHello()); // Hey, I'm Marco. But you can call me polotek

var Employee = Person.extend({
  constructor: function Employee(args) {
    // The person constructor has already been called
    this.job = args['job'];
  }
  , sayHello: function() {
    // No concept of "super". If you want a super call, be explicit
    return "Hello, my name is " + this.name + '. I work at ' + this.job;
  }
});

var e = Employee.create({name: 'Marco', nickname: 'polotek', job: 'Acme Novelties'});

console.log(e.sayHello()); // 'Hello, my name is Marco. I work at Acme Novelties'

var MarcoGhost = p.extend({
  constructor: function MarcoGhost(args) {
    this.cheers = args['cheers'];
  }
  , sayHello: function() {
    this.deep();
    return this.cheers + ", I am the ghost of " + this.name;
  }
});
 
var mg = MarcoGhost.create({ cheers: 'whooooo'});

console.log(mg.sayHello()); // 'whooooo, I am the ghost of Marco

// (p instanceof Person) === true
// p.sayHello === Person.prototype.sayHello
// (e instanceof Employee) === true
// (e instanceof Person) === true
// (e.__proto__ instanceof Person) === true
// (mg instanceof Person) === true
// mg.names === Person.prototype.names
```

`ctor` is a really simple prototypal object system that codefies a few simple constructs that I like.

  * Don't use `new`. Think of `create` as your object factory. This follows nicely from `Object.create`.
  * There is a constructor for initializing your objects. `create` calls this on every object.
  * Instead of "inheritance", there is simple extension. `extend` creates a new object factory with the following behavior
    * Proper prototype chain is set up.
    * The extended parent constructor will *always* be called implicitly. Initialization integrity is preserved.
    * No other fanciness. No "super".
