import type { Model } from './Model';
import type { Service } from './Service';

export interface Client {
    version: string;
    server: string;
    edgeRegions: string[];
    models: Model[];
    services: Service[];
}
