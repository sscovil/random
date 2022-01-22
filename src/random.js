/**
 * @type {string[]} Hexadecimal array
 */
export const hex = "0123456789ABCDEF".split("");

/**
 * @returns {string} Random hex color (e.g. "#C2123B", "#A2FF9A", "#0DC43F")
 */
export function color() {
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += pick(hex);
    }
    return color;
}

/**
 * @param length {number} Length of desired array
 * @param value {number} Integer to divide and distribute randomly among array elements
 * @param min {number} Minimum value for each element in the array
 * @returns {number[]} Array of integers, randomly distributed among elements
 */
export function distribute(length, value, min = 0) {
    if (length <= 1) {
        return [Math.max(value, min)];
    }

    const result = new Array(length);

    if (value <= length * min) {
        return result.fill(min);
    }

    for (let i = 0; i < length; i++) {
        const isLast = i === length - 1;
        const max = value - min * (length - i);
        result[i] = isLast ? value : integer(min, max);
        value -= result[i];
    }

    return result;
}

/**
 * @param arr {*[]} Array of elements to pick from
 * @returns {*|null} Random element from the given array
 */
export function pick(arr) {
    if (!Array.isArray(arr) || !arr.length) {
        return null;
    }
    return arr[integer(0, arr.length - 1)];
}

/**
 * @param min {number} Lowest number to return
 * @param max {number} Highest number to return
 * @returns {number} Random number between min and max (inclusive)
 */
export function integer(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

/**
 * @param arr {*[]} Array of elements to sample from
 * @param size {number} Sample size
 * @returns {*[]} Array of the given size with random elements from the given array
 */
export function sample(arr, size) {
    if (!Array.isArray(arr) || !arr.length || !Number.isFinite(size) || size < 1) {
        return [];
    }

    const shuffled = arr.slice(0);
    let i = arr.length;

    while (i--) {
        let index = Math.floor((i + 1) * Math.random());
        let temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}
