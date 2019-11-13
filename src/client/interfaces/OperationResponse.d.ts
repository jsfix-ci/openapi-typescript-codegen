export interface OperationResponse {
    code: number;
    text: string;
    type: string;
    base: string;
    template: string | null;
    imports: string[];
}