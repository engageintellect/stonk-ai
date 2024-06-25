import {
  createReactiveCache,
  ReactiveCacheListener,
  setReactiveCacheValue,
  subscribeReactiveCache,
} from './reactive-cache';

export const REVALIDATION_CACHE = createReactiveCache<boolean>();

export type RevalidationListener = ReactiveCacheListener<boolean>;

export function subscribeRevalidation(
  key: string,
  listener: RevalidationListener,
): () => void {
  return subscribeReactiveCache(REVALIDATION_CACHE, key, listener);
}

export function setRevalidation(
  key: string,
  value: boolean,
  notify = true,
): void {
  setReactiveCacheValue(REVALIDATION_CACHE, key, value, notify);
}

export function getRevalidation(
  key: string,
): boolean | undefined {
  const result = REVALIDATION_CACHE.cache.get(key);
  if (result) {
    return result.value;
  }
  return undefined;
}
