import { Cache } from "./interface/Cache";

/**
 * A simple in-memory cache implementation.
 * @implements {Cache}
 */
export class CacheImpl implements Cache {
    MAX_CACHE_SIZE: number = 10;
    _cache: Map<string, any> = new Map<string, any>();
    constructor(cacheInitialValues?: Map<string, any>) {
        if (!cacheInitialValues) return;
        cacheInitialValues.forEach((value: any, key: string) => {
            this._cache.set(key, value);
        });
    }

    get(key: string) {
        return this._cache.get(key);
    }

    getAll(): any {
        const obj = Object.fromEntries(this._cache);
        return obj;
    }

    set(key: string, value: any) {
        if (this.size() >= this.MAX_CACHE_SIZE) {
            throw new Error("Cache cannot have more than 10 items");
        }
        this._cache.set(key, value);
    }

    delete(key: string) {
        this._cache.delete(key);
    }

    size() {
        return this._cache.size;
    }
}
