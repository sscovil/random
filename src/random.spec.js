import * as random from "./random";

describe("colorHex", () => {
    const isValid = (color) => !!String(color).match(/^#[0-9A-Fa-f]{6}$/);

    test("returns a random hex color code", () => {
        // when dealing with random numbers, do it 100 times to be sure
        for (let i = 0; i < 100; i++) {
            const color = random.color();
            expect(isValid(color)).toBe(true);
        }
    });
});

describe("distribute", () => {
    const sumArray = (arr) => arr.reduce((a, b) => a + b, 0);

    test("returned array length is equal to the value of the first argument", () => {
        const length = 5;
        const value = 10;
        const result = random.distribute(length, value);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(length);
    });

    test("returned array elements add up to the value of the second argument", () => {
        const length = 5;
        const value = 10;
        // when dealing with random numbers, do it 100 times to be sure
        for (let i = 0; i < 100; i++) {
            const result = random.distribute(length, value);
            expect(sumArray(result)).toBe(value);
        }
    });

    test("returned array elements have a value >= the third argument", () => {
        const length = 5;
        const value = 100;
        const min = 10;
        // when dealing with random numbers, do it 100 times to be sure
        for (let i = 0; i < 100; i++) {
            const result = random.distribute(length, value, min);
            expect(sumArray(result)).toBe(value);
            for (let j = 0; j < result.length; j++) {
                expect(result[j]).toBeGreaterThanOrEqual(min);
            }
        }
    });

    test("returned array elements have a value between the third and fourth arguments", () => {
        const length = 10
        const value = 25
        const min = 1
        const max = 5
        // when dealing with random numbers, do it 100 times to be sure
        for (let i = 0; i < 100; i++) {
            const result = random.distribute(length, value, min, max);
            expect(sumArray(result)).toBe(value);
            for (let j = 0; j < result.length; j++) {
                expect(result[j]).toBeGreaterThanOrEqual(min);
                expect(result[j]).toBeLessThanOrEqual(max);
            }
        }
    });

    test("returns an array with a single element equal to value if length < 1", () => {
        const length = 0;
        const value = 10;
        const result = random.distribute(length, value);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(1);
        expect(result[0]).toBe(value);
    });

    test("returns an array with a single element equal to min if length < 1 and value < min", () => {
        const length = 0;
        const value = 10;
        const min = 20;
        const result = random.distribute(length, value, min);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(1);
        expect(result[0]).toBe(min);
    });

    test("returns an array with all elements equal to max if value > max * length", () => {
        const length = 5;
        const value = 100;
        const min = 1;
        const max = 5;
        const result = random.distribute(length, value, min, max);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(length);
        for (let i = 0; i < length; i++) {
            expect(result[i]).toBe(max);
        }
    })
});

describe("pick", () => {
    test("returns one random element from a given array", () => {
        const arr = ["heads", "tails"];
        // when dealing with random numbers, do it 100 times to be sure
        for (let i = 0; i < 100; i++) {
            const result = random.pick(arr);
            expect(arr).toContain(result);
        }
    });

    test("works with an array of objects", () => {
        const arr = [{ name: "foo" }, { name: "bar" }, { name: "baz" }];
        const result = random.pick(arr);
        expect(arr).toContain(result);
    });

    test("returns null if argument is not an array", () => {
        const result = random.pick({ heads: 0, tails: 1 });
        expect(result).toBe(null);
    })

    test("returns null if argument is an empty array", () => {
        const result = random.pick([]);
        expect(result).toBe(null);
    })
});

describe("integer", () => {
    test("returns an integer between min and max (inclusive)", () => {
        const min = 1;
        const max = 2;
        // when dealing with random numbers, do it 100 times to be sure
        for (let i = 0; i < 100; i++) {
            const result = random.integer(min, max);
            expect(Number.isInteger(result)).toBe(true);
            expect(result).toBeGreaterThanOrEqual(min);
            expect(result).toBeLessThanOrEqual(max);
        }
    });
});

describe("sample", () => {
    test("returns a random sample of elements from a given array", () => {
        const arr = ["north", "east", "south", "west"];
        const size = 2;
        // when dealing with random numbers, do it 100 times to be sure
        for (let i = 0; i < 100; i++) {
            const result = random.sample(arr, size);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(size);
            expect(arr).toContain(result[0]);
            expect(arr).toContain(result[1]);
            expect(result[0]).not.toBe(result[1]);
        }
    });

    test("returns rearranged version of array if size >= array length", () => {
        const arr = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];
        // test with size equal to and greater than array length
        for (let i = 0; i < 2; i++) {
            const size = arr.length + i;
            const result = random.sample(arr, size);
            expect(Array.isArray(result)).toBe(true);
            expect(result.length).toBe(arr.length); // ensure result is not larger than original array
            expect(result.join()).not.toBe(arr.join()); // ensure result is shuffled
            expect(result.sort()).toEqual(arr.sort()); // ensure all values are present
        }
    });

    test("returns an empty array if first argument is not an array", () => {
        const arr = { one: 1, two: 2, three: 3 };
        const size = 2;
        const result = random.sample(arr, size);
        expect(result).toEqual([]);
    });

    test("returns an empty array if first argument is an empty array", () => {
        const arr = [];
        const size = 2;
        const result = random.sample(arr, size);
        expect(result).toEqual([]);
    });

    test("returns an empty array if sample size is not a number", () => {
        const arr = [1, 2, 3];
        const size = "2";
        const result = random.sample(arr, size);
        expect(result).toEqual([]);
    });

    test("returns an empty array if sample size < 1", () => {
        const arr = [1, 2, 3];
        const size = 0;
        const result = random.sample(arr, size);
        expect(result).toEqual([]);
    });
});
