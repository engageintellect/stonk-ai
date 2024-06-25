import SWRVCache, { ICacheItem } from '..';
/**
 * LocalStorage cache adapter for swrv data cache.
 * https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 */
export default class LocalStorageCache extends SWRVCache<any> {
    private STORAGE_KEY;
    constructor(key?: string, ttl?: number);
    private encode;
    private decode;
    get(k: any): ICacheItem<any>;
    set(k: string, v: any, ttl: number): void;
    dispatchExpire(ttl: any, item: any, serializedKey: any): void;
    delete(serializedKey: string): void;
}
