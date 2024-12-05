export const isTrue = (value) => ["true", 1, true].includes(value);
export const isFalse = (value) => ["false", 0, false].includes(value);

export const removePropertyInObject = (target = {}, properties = []) => {
    for (const item of properties) {
        delete target[item];
    }
    return target;
}