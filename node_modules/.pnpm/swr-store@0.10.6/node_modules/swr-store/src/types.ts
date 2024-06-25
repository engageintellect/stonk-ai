import {
  MutationListener,
  MutationResult,
} from './cache/mutation-cache';

export type SWRCompare<T> = (a: T, b: T) => boolean;

export type SWRTrigger<P extends any[] = []> =
  (args: P, shouldRevalidate?: boolean) => void;

export type SWRMutate<T, P extends any[] = []> =
  (args: P, data: MutationResult<T>, shouldRevalidate?: boolean, compare?: SWRCompare<T>) => void;

export interface SWRGetOptions<T> {
  shouldRevalidate?: boolean;
  initialData?: T;
  hydrate?: boolean;
}

export type SWRGet<T, P extends any[] = []> =
  (args: P, options?: SWRGetOptions<T>) => MutationResult<T>;

export type SWRSubscribe<T, P extends any[] = []> =
  (args: P, listener: MutationListener<T>) => () => void;

export interface SWRStoreBaseOptions<T, P extends any[] = []> {
  get: (...args: P) => Promise<T>;
  initialData?: T;
  refreshInterval?: number;
  maxRetryCount?: number;
}

export interface SWRStoreExtendedOptions<T, P extends any[] = []> {
  key: (...args: P) => string;

  revalidateOnFocus: boolean;
  revalidateOnVisibility: boolean;
  revalidateOnNetwork: boolean;

  refreshWhenOffline: boolean;
  refreshWhenHidden: boolean;
  refreshWhenBlurred: boolean;

  freshAge: number;
  staleAge: number;

  compare: SWRCompare<T>;

  maxRetryInterval: number;
}

export type SWRStorePartialOptions<T, P extends any[] = []> =
  Partial<SWRStoreExtendedOptions<T, P>>;

export interface SWRStoreOptions<T, P extends any[] = []>
  extends SWRStorePartialOptions<T, P>, SWRStoreBaseOptions<T, P> {
}

export interface SWRFullOptions<T, P extends any[] = []>
  extends SWRStoreExtendedOptions<T, P>, SWRStoreBaseOptions<T, P> {
}

export interface SWRStore<T, P extends any[] = []> {
  id: string;
  trigger: SWRTrigger<P>;
  mutate: SWRMutate<T, P>;
  get: SWRGet<T, P>;
  subscribe: SWRSubscribe<T, P>;
}
