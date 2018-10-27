import {filter as grep} from 'lodash';

function o2 (orig) {
  if (!orig.prototype.hasOwnProperty('$o2$')) {
    return target;
  }
  let attrs = orig.prototype.$o2$.attrs;
  function o2constructor (args = {}) {
    if (attrs.required.length) {
      let missing = grep(
        attrs.required,
        (name) => !args.hasOwnProperty(name),
      );
      if (missing.length) {
        throw "Missing required attributes: " + missing.join(', ');
      }
    }
    orig.call(this, args);
    for (let { name, writable } of attrs.specs) {
      let value = (name in args ? args[name] : this[name]);
      Object.defineProperty(this, name, {
        configurable: false,
        enumerable: true,
        writable,
        value,
      });
    }
  }
  o2constructor.prototype = orig.prototype;
  return o2constructor;
}

function ro (...args) {
  return attr(...args, false);
}

function rw (...args) {
  return attr(...args, true);
}

function attr (target, key, descriptor, writable) {
  if (!target.hasOwnProperty('$o2$')) {
    target.$o2$ = { attrs: { specs: [], required : [] } };
  }
  let attrs = target.$o2$.attrs;
  attrs.specs.push({
    name: key,
    writable
  });
  if (!descriptor.initializer) {
    attrs.required.push(key);
  }
  // When I annotate a property without a default value, writable ends up
  // defaulting to false. [tableflip]
  return {
    ...descriptor,
    writable: true,
  };
}

@o2
class Foo {
  @ro name = 'Bob';
  @rw age;
  message () { return "Hello " + this.name }
}

let name = "mst"; let age = 42;

console.log(Foo);

try { new Foo } catch (e) { console.log("Error: " + e) };

let foo = new Foo({ name, age });

let foo2 = new Foo({ age });

console.log(foo2.message());

console.log(foo);

console.log(foo.message());

foo2.age = 23;

console.log(foo2);

try { foo.name = 'Joe' } catch (e) { console.log("Error: " + e) };

/*

[Function: o2constructor]
Error: Missing required attributes: age
Hello Bob
Foo { name: 'mst', age: 42 }
Hello mst
Foo { name: 'Bob', age: 23 }
Error: TypeError: Cannot assign to read only property 'name' of #<Foo>

*/
