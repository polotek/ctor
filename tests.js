var Ctor = require('./index')
  , test = require('tape');

test('ctor creates a simple constructor', function(t) {
  var Person = Ctor.extend({
    constructor: function Person(name, nickname) {
      this.name = name;
      this.nickname = nickname;
    }
    , sayHello: function() {
      return "Hey, I'm " + this.name + '. But you can call me ' + this.nickname;
    }
  });

  var p = Person.create('Marco', 'polotek');

  t.equal(p.sayHello(), "Hey, I'm Marco. But you can call me polotek");

  var Employee = Person.extend({
    constructor: function Employee(name, nickname, job) {
      // The person constructor has already been called
      this.job = job;
    }
    , sayHello: function() {
      // No concept of "super". If you want a super call, be explicit
      return "Hello, my name is " + this.name + '. I work at ' + this.job;
    }
  });

  var e = Employee.create('Marco', 'polotek', 'Acme Novelties');

  t.equal(e.sayHello(), 'Hello, my name is Marco. I work at Acme Novelties');

  t.ok(p instanceof Person);
  t.equal(p.sayHello, Person.prototype.sayHello);
  t.ok(e instanceof Employee);
  t.ok(e instanceof Person);
  var proto = Object.getPrototypeOf(e);
  t.ok(proto instanceof Person);
  t.notEqual(proto, Person.prototype);

  t.end();
});

test('ctor still supports "new" but doesn\'t need it', function(t) {
  t.plan(6);

  var Person = Ctor.extend({
    constructor: function Person(name, nickname) {
      this.name = name;
      this.nickname = nickname;

      t.pass();
    }
    , sayHello: function() {
      return "Hey, I'm " + this.name + '. But you can call me ' + this.nickname;
    }
  });

  var p = new Person('Marco', 'polotek');
  t.ok(p instanceof Ctor);
  t.equal(p.sayHello, Person.prototype.sayHello);

  p = Person('Marco', 'polotek');
  t.ok(p instanceof Ctor);
  t.equal(p.sayHello, Person.prototype.sayHello);

  t.end();
});

test('ctor adds non-enumerable "contructor" property to prototype', function(t) {
  var Person = Ctor.extend({
    constructor: function Person(name, nickname) {
      this.name = name;
      this.nickname = nickname;
    }
    , sayHello: function() {
      return "Hey, I'm " + this.name + '. But you can call me ' + this.nickname;
    }
  });

  var p = Person.create('Marco', 'polotek')
    , proto = Object.getPrototypeOf(p);

  t.equal(p.hasOwnProperty('constructor'), false);
  t.equal(proto.constructor, Person);

  var desc = Object.getOwnPropertyDescriptor(proto, 'constructor');
  t.equal(desc.enumerable, false);

  t.end();
});

test('ctor extend objects', function(t) {
  var Person = Ctor.extend({
    constructor: function Person(name, nickname) {
      this.name = name;
      this.nickname = nickname;
    }
    , sayHello: function() {
      return "Hey, I'm " + this.name + '. But you can call me ' + this.nickname;
    }
  });

  var p = Person.create('Marco', 'polotek');

  var MarcoGhost = p.extend({
    constructor: function MarcoGhost(args) {
      this.cheers = args['cheers'];
    }
                 , sayHello: function() {
                   return this.cheers + ", I am the ghost of " + this.name;
                 }
  });

  var mg = MarcoGhost.create({ cheers: 'whooooo'})
  , proto = Object.getPrototypeOf(mg);

  t.equal(mg.sayHello(), "whooooo, I am the ghost of Marco");
  t.equal(proto.constructor, Person);

  t.end();

});
