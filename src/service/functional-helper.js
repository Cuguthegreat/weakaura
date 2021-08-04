export const contains = (value, array) => array.indexOf(value) >= 0;
export const containsAny = (values, array) =>
    values.some(value => contains(value, array));
