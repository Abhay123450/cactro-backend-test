export interface Cache {
    get(key: string): any;
    getAll(): Map<string, any>;
    set(key: string, value: any): void;
    delete(key: string): void;
    size(): number;
}
