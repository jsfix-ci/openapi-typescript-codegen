export interface WithXTagGroupsExtension {
    'x-tagGroups'?: XTagGroup[];
}

export interface XTagGroup {
    name: string;
    tags: string[];
}
