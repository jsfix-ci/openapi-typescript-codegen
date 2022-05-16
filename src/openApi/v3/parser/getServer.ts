import type { OpenApi } from '../interfaces/OpenApi';

export function getServer(openApi: OpenApi): { url: string; edgeRegions: string[] } {
    const server = openApi.servers?.[0];
    const variables = server?.variables || {};
    let url = server?.url || '';
    let edgeRegions: string[] = [];
    for (const variable in variables) {
        if (variables.hasOwnProperty(variable) && variable !== 'edge') {
            url = url.replace(`{${variable}}`, variables[variable].default);
        } else if (variable === 'edge') {
            edgeRegions = variables['edge'].enum as string[];
        }
    }
    return { url: url.replace(/\/$/g, ''), edgeRegions };
}
