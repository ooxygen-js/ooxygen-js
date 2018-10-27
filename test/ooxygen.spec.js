const { expect } = require('chai');
const { o2, ro, rw } = require('@/ooxygen');

describe('o2 constructor', () => {
  it('constructs objects', () => {
    @o2
    class Foo {
      @ro name = 'Bob';
      @rw age;
      message () { return "Hello " + this.name }
    }

    expect(() => { new Foo() }).to.throw("Missing required attributes: age");

    let name = "mst"; let age = 42;

    let foo = new Foo({ name, age });
    let foo2 = new Foo({ age });

    expect(foo.name).to.equal('mst');
    expect(foo.age).to.equal(42);
    expect(foo.message()).to.equal("Hello mst");
    expect(foo2.message()).to.equal("Hello Bob");

    expect(() => { foo2.age = 23; }).to.not.throw();
    expect(() => { foo.name = 'Joe' }).to.throw(/Cannot assign to read only property 'name'/);
  });
});
