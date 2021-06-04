import { writable } from '../src/index.js';

const store = writable({ foo: 'bar', bar: 'foo' });

/////////////////////

store.subscribe(value => {
  console.log('Value changed', value);
});

console.log(store.foo);

/////////////////////

store.update(value => {
  value.foo = 'foobarbaz';
  value.bar = 'boom boom';
  return value;
});

console.log(store.foo);

/////////////////////

store.set({ foo: 'foobar', bar: '' });

console.log(store.foo);

/////////////////////

store.bar = 'HiHo';
store.foo = 'waölkehfhew';

console.log(store.foo);

/////////////////////

console.log(store.get().foo);

////////////////////

const oldSet = store.set;

const newSet = val => {
  oldSet({ foo: '13163564646', bar: 'foo' });
};

store.set = newSet;

store.set({ foo: 'bar', bar: 'foo' });
