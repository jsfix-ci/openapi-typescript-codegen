import { getServer } from './getServer';

describe('getServer', () => {
    it('should produce correct result', () => {
        expect(
            getServer({
                openapi: '3.0',
                info: {
                    title: 'dummy',
                    version: '1.0',
                },
                paths: {},
                servers: [
                    {
                        url: 'https://localhost:8080/api',
                    },
                ],
            })
        ).toEqual({ url: 'https://localhost:8080/api', edgeRegions: [] });
    });

    it('should produce correct result with variables', () => {
        expect(
            getServer({
                openapi: '3.0',
                info: {
                    title: 'dummy',
                    version: '1.0',
                },
                paths: {},
                servers: [
                    {
                        url: '{scheme}://localhost.{edge}.com:{port}/api',
                        variables: {
                            edge: {
                                default: 'gll',
                                enum: ['gll', 'london'],
                            },
                            scheme: {
                                default: 'https',
                            },
                            port: {
                                default: '8080',
                            },
                        },
                    },
                ],
            })
        ).toEqual({ url: 'https://localhost.{edge}.com:8080/api', edgeRegions: ['gll', 'london'] });
    });
});
