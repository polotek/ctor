var Ctor = require('./index')
  , test = require('tape')

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

  t.equal(e.sayHello(), 'Hello, my name is Marco. I work at Acme Novelties')

  t.ok(p instanceof Person)
  t.equal(p.sayHello, Person.prototype.sayHello)
  t.ok(e instanceof Employee)
  t.ok(e instanceof Person)
  t.ok(e.__proto__ instanceof Person)

  t.end()
})
