# Random

An assortment of useful random number functions.

## Installation

```shell
yarn add @sscovil/migrate
# OR
npm install @sscovil/migrate
```

## Usage

```javascript
// ES Module Syntax
import random from "@sscovil/random";

// CommonJS Syntax
const random = require("@sscovil/random");
```

### random.color()

Returns a random hex color (e.g. "#C2123B", "#A2FF9A", "#0DC43F").

```javascript
const color = random.color();
const isValid = (color) => !!String(color).match(/^#[0-9A-Fa-f]{6}$/);

expect(isValid(color)).toBe(true);
```

### random.distribute(length, value, min)

Given a desired array `length` and an integer `value`, returns an array of integers randomly distributed among its
elements.

```javascript
const length = 5;
const value = 10;
const result = random.distribute(length, value); // returns an array like [0, 3, 1, 5, 1]
const sumArray = (arr) => arr.reduce((a, b) => a + b, 0);

expect(result.length).toBe(length);
expect(sumArray(result)).toBe(value);
```

Accepts an optional third argument to specify a `min` value for each element in the array (default is `0`).

```javascript
const length = 5;
const value = 100;
const min = 10;
const result = random.distribute(length, value, min); // returns an array like [11, 33, 24, 17, 15]
const sumArray = (arr) => arr.reduce((a, b) => a + b, 0);

expect(result.length).toBe(length);
expect(sumArray(result)).toBe(value);

for (let i = 0; i < result.length; i++) {
    expect(result[i]).toBeGreaterThanOrEqual(min);
}
```

Ignores `value` if it is less than `length * min`, and returns an array of `length` with each element set to the
value of `min`.

```javascript
const length = 5;
const value = 10; // this is less that length * min, so it will be ignored
const min = 10;
const result = random.distribute(length, value, min); // returns [10, 10, 10, 10, 10]
const sumArray = (arr) => arr.reduce((a, b) => a + b, 0);

expect(result.length).toBe(length);
expect(sumArray(result)).toBe(length * min);

for (let i = 0; i < result.length; i++) {
    expect(result[i]).toBe(min);
}
```

### random.pick(arr)

Returns a random element from a given array.

```javascript
const arr = ["foo", "bar", "baz"];
const result = random.pick(arr);

expect(arr).toContain(result);
```

Works with an array of objects, or any other data type.

```javascript
const arr = [{ name: "foo" }, { name: "bar" }, { name: "baz" }];
const result = random.pick(arr);

expect(arr).toContain(result);
```

Returns `null` if the value passed in is an empty array, or is not an array.

```javascript
expect(random.pick([])).toBe(null);
expect(random.pick({ name: "foo" })).toBe(null);
expect(random.pick("foobar")).toBe(null);
expect(random.pick(123)).toBe(null);
```

### random.integer(min, max)

Returns an integer between `min` and `max` (inclusive).

```javascript
const min = 1;
const max = 10;
const result = random.integer(min, max);

expect(Number.isInteger(result)).toBe(true);
expect(result).toBeGreaterThanOrEqual(min);
expect(result).toBeLessThanOrEqual(max);
```

### random.sample(arr, size)

Returns a random sample of elements from a given array.

```javascript
const arr = ["north", "east", "south", "west"];
const size = 2;
const result = random.sample(arr, size);

expect(Array.isArray(result)).toBe(true);
expect(result.length).toBe(size);
expect(arr).toContain(result[0]);
expect(arr).toContain(result[1]);
expect(result[0]).not.toBe(result[1]); // result will not contain duplicate values
```

Returns a rearranged version of `arr` if `size >= arr.length`.

```javascript
const arr = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];
const size = arr.length;
const result = random.sample(arr, size);

expect(Array.isArray(result)).toBe(true);
expect(result.join()).not.toBe(arr.join()); // new array elements are in a different order
expect(result.sort()).toEqual(arr.sort()); // all values from orginal array are present
```

Returns an empty array if `arr` or `size` are invalid.

```javascript
expect(random.sample([], 2)).toEqual([]);
expect(random.sample({ foo: 1, bar: 2, baz: 3 }, 2)).toEqual([]);
expect(random.sample([1, 2, 3], "2")).toEqual([]);
expect(random.sample([1, 2, 3], -2)).toEqual([]);
```

## Running Tests

```shell
yarn run test
# OR
npm test
```