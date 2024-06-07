interface MyObject {
    [key: string]: any;
}

export function prefixObjectKeys<T extends object>(obj: T, prefix: string) {
    // Create a new empty object to store the result
    const newObj: MyObject = {};

    // Iterate over the keys of the original object
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {  // Ensure the key is a direct property of the object
            // Add the prefixed key and the original value to the new object
            newObj[prefix + key] = obj[key];
        }
    }

    return newObj;
}

export function removePrefixFromObjectKeys<T extends object>(obj: T, prefix: string) {
    const newObj: MyObject = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key) && key.startsWith(prefix)) {  // Ensure the key is a direct property and has the prefix
            const newKey = key.slice(prefix.length);  // Remove the prefix from the key
            newObj[newKey] = obj[key];  // Add the new key-value pair to the new object
            delete obj[key];
        }
    }

    return newObj;
}