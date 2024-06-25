import { dequal } from 'dequal/lite';
import {
  getMutation,
  MutationListener,
  MutationResult,
  setMutation,
  subscribeMutation,
} from './cache/mutation-cache';
import {
  setRevalidation,
} from './cache/revalidation-cache';

export function trigger(
  key: string,
  shouldRevalidate = true,
): void {
  setRevalidation(key, shouldRevalidate);
}

export function mutate<T>(
  key: string,
  data: MutationResult<T>,
  shouldRevalidate = true,
  compare: (a: T, b: T) => boolean = dequal,
): void {
  setRevalidation(key, shouldRevalidate);

  const current = getMutation<T>(key);

  if (
    current
    && current.result.status === 'success' && data.status === 'success'
    && compare(current.result.data, data.data)
  ) {
    current.timestamp = Date.now();
    return;
  }

  setMutation(key, {
    result: data,
    timestamp: Date.now(),
    isValidating: false,
  });
}

export function subscribe<T>(
  key: string,
  listener: MutationListener<T>,
): () => void {
  const wrappedListener: MutationListener<T> = (value) => {
    listener(value);
  };
  return subscribeMutation(key, wrappedListener);
}
