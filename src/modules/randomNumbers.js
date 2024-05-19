export function getRandomNumberInRange(min, max) {
    if (typeof min !== 'number' || typeof max !== 'number' || min > max) {
        throw new Error('Invalid input: min and max should be numbers and min should be less than or equal to max');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomSetOfNumbers(max) {
    const set = new Set();
    while (set.size < 5) {
        set.add(getRandomNumberInRange(0, max - 1)); // Ensure the max index is included
    }
    return set;
}