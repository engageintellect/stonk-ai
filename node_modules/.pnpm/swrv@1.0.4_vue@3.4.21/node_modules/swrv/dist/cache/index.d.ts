import { IKey } from '../types';
export interface ICacheItem<Data> {
    data: Data;
    createdAt: number;
    expiresAt: number;
}
export default class SWRVCache<CacheData> {
    protected ttl: number;
    private items?;
    constructor(ttl?: number);
    serializeKey(key: IKey): string;
    get(k: string): ICacheItem<CacheData>;
    set(k: string, v: any, ttl: number): void;
    dispatchExpire(ttl: any, item: any, serializedKey: any): void;
    delete(serializedKey: string): void;
}
