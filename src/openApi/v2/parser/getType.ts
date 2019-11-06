import { stripNamespace } from './stripNamespace';
import { Type } from '../../../client/interfaces/Type';
import { getMappedType, hasMappedType } from './getMappedType';

/**
 * Parse any value into a type object.
 * @param value String value like "integer" or "Link[Model]".
 * @param template Optional template class from parent (needed to process generics)
 */
export function getType(value: string, template: string | null = null): Type {
    let propertyType = 'any';
    let propertyBase = 'any';
    let propertyTemplate: string | null = null;
    let propertyImports: string[] = [];

    // Remove definitions prefix and cleanup string.
    const valueTrimmed = stripNamespace(value || '');

    // Check of we have an Array type or generic type, for instance: "Link[Model]".
    if (/\[.*\]$/g.test(valueTrimmed)) {
        // Find the first and second type
        const match = valueTrimmed.match(/(.*?)\[(.*)\]$/);
        if (match) {
            // Both of the types can be complex types so parse each of them.
            const match1 = getType(match[1]);
            const match2 = getType(match[2]);

            // If the first match is a generic array then construct a correct array type,
            // for example the type "Array[Model]" becomes "Model[]".
            if (match1.type === 'any[]') {
                propertyType = `${match2.type}[]`;
                propertyBase = `${match2.type}`;
                match1.imports = [];
            } else if (match2.type === '') {
                // Primary types like number[] or string[]
                propertyType = match1.type;
                propertyBase = match1.type;
                propertyTemplate = match1.type;
                match2.imports = [];
            } else {
                propertyType = `${match1.type}<${match2.type}>`;
                propertyBase = match1.type;
                propertyTemplate = match2.type;
            }

            // Either way we need to add the found imports
            propertyImports.push(...match1.imports);
            propertyImports.push(...match2.imports);
        }
    } else if (hasMappedType(valueTrimmed)) {
        const mapped = getMappedType(valueTrimmed);
        propertyType = mapped;
        propertyBase = mapped;
    } else {
        propertyType = valueTrimmed;
        propertyBase = valueTrimmed;
        propertyImports.push(valueTrimmed);
    }

    // If the property that we found matched the parent template class
    // Then ignore this whole property and return it as a "T" template property.
    if (propertyType === template) {
        propertyType = 'T'; // Template;
        propertyBase = 'T'; // Template;
        propertyImports = [];
    }

    return {
        type: propertyType,
        base: propertyBase,
        template: propertyTemplate,
        imports: propertyImports,
    };
}