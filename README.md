# ooxygen-js

A breath of fresh air for OO

## Examples

```javascript
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
```

## Author

[Matt Trout (shadowcat-mst)](https://github.com/shadowcat-mst)

## Contributors

[Errietta Kostala](https://github.com/errietta)
