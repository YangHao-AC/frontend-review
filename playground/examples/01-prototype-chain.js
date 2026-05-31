// 第 1 课示例：原型链 / new
// 运行: npm run run -- playground/examples/01-prototype-chain.js
// 或在 REPL 里: .load playground/examples/01-prototype-chain.js

function Person(name) {
  this.name = name;
}
Person.prototype.sayHi = function () {
  console.log(`Hi, ${this.name}`);
};

const p = new Person('小明');

console.log('p.__proto__ === Person.prototype →', p.__proto__ === Person.prototype);
console.log('Person.prototype.__proto__ === Object.prototype →',
  Person.prototype.__proto__ === Object.prototype);
console.log('Object.prototype.__proto__ →', Object.prototype.__proto__);

p.sayHi();

function Foo() {}
Foo.prototype.a = 1;
const f = new Foo();
Foo.prototype = { a: 2 };
console.log('f.a (原型被替换后) →', f.a);
