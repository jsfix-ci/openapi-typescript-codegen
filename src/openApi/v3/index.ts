import type { Client } from '../../client/interfaces/Client';
import { Model } from '../../client/interfaces/Model';
import { Service } from '../../client/interfaces/Service';
import type { OpenApi } from './interfaces/OpenApi';
import { getModels } from './parser/getModels';
import { getServer } from './parser/getServer';
import { getServices } from './parser/getServices';
import { getServiceVersion } from './parser/getServiceVersion';

/**
 * Parse the OpenAPI specification to a Client model that contains
 * all the models, services and schema's we should output.
 * @param openApi The OpenAPI spec  that we have loaded from disk.
 */
export function parse(openApi: OpenApi): Client {
    const version: string = getServiceVersion(openApi.info.version);
    const server: { url: string; edgeRegions: string[] } = getServer(openApi);
    const models: Model[] = getModels(openApi);
    const services: Service[] = getServices(openApi);

    return { version, server: server.url, edgeRegions: server.edgeRegions, models, services };
}
