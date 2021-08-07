export const contains = (value, array) => array.indexOf(value) >= 0;
export const containsAny = (values, array) =>
    values.some(value => contains(value, array));
export const pushAllIf = (condition, skillIds) => (condition ? skillIds : []);
export const pushIf = (condition, skillId) => (condition ? [skillId] : []);
