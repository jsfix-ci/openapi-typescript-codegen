import camelCase from 'camelcase';

/**
 * Convert the input value to a correct operation (method) classname.
 * This converts the input string to camelCase, so the method name follows
 * the most popular Javascript and Typescript writing style.
 */
export function getOperationName(value: string): string {
    let clean = value
        .replace(/^[^a-zA-Z]+/g, '')
        .replace(/[^\w\-]+/g, '-')
        .trim();

    if (clean.startsWith('List')) {
        clean = 'List';
    } else if (clean.startsWith('Fetch')) {
        clean = 'Fetch';
    } else if (clean.startsWith('Create')) {
        clean = 'Create';
    } else if (clean.startsWith('Update')) {
        clean = 'Update';
    } else if (clean.startsWith('Remove')) {
        clean = 'Remove';
    }

    return camelCase(clean);
}
