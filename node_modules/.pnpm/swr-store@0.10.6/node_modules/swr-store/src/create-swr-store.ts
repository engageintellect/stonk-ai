import {
  getMutation,
  getMutationListenerSize,
  MutationPending,
  MutationResult,
  setMutation,
} from './cache/mutation-cache';
import {
  setRevalidation,
  subscribeRevalidation,
} from './cache/revalidation-cache';
import DEFAULT_CONFIG from './default-config';
import {
  mutate,
  subscribe,
  trigger,
} from './global';
import IS_CLIENT from './is-client';
import retry, { Retry } from './retry';
import {
  SWRFullOptions,
  SWRGetOptions,
  SWRStore,
  SWRStoreOptions,
} from './types';

let index = 0;

function getIndex() {
  const current = index;
  index += 1;
  return current;
}

const retries = new Map<string, Retry<any>>();

const { assign } = Object;

function revalidate<T, P extends any[] = []>(
  fullOpts: SWRFullOptions<T, P>,
  args: P,
  opts?: SWRGetOptions<T>,
): MutationResult<T> {
  const defaultRevalidateOptions: SWRGetOptions<T> = {
    shouldRevalidate: true,
    initialData: fullOpts.initialData,
    hydrate: false,
  };
  const revalidateOptions: SWRGetOptions<T> = assign(
    {},
    defaultRevalidateOptions,
    opts,
  );
  // Parse key
  const generatedKey = fullOpts.key(...args);

  // Capture timestamp
  const timestamp = Date.now();

  // Get current mutation
  let currentMutation = getMutation<T>(generatedKey);

  // Hydrate mutation
  if (!currentMutation && revalidateOptions.initialData) {
    currentMutation = {
      result: {
        data: revalidateOptions.initialData,
        status: 'success',
      },
      timestamp,
      isValidating: false,
    };

    if (revalidateOptions.hydrate) {
      setMutation(generatedKey, currentMutation);
    }
  }

  if (currentMutation) {
    if (!revalidateOptions.shouldRevalidate) {
      return currentMutation.result;
    }
    // If mutation is still fresh, return mutation
    if (currentMutation.timestamp + fullOpts.freshAge > timestamp) {
      return currentMutation.result;
    }

    // We have to assume that if the request is no longer fresh
    // and the request is still pending, we need to cancel it
    // specially if it's retrying.
    if (currentMutation.result.status === 'pending') {
      const previousRetry = retries.get(generatedKey);

      if (previousRetry) {
        previousRetry.cancel();
      }
    }
  }

  // Perform fetch
  const pendingRetry = retry(() => fullOpts.get(...args), {
    count: fullOpts.maxRetryCount,
    interval: fullOpts.maxRetryInterval,
  });

  // Set current retry
  retries.set(generatedKey, pendingRetry);

  const pendingData = pendingRetry.resolvable.promise;

  // Capture result
  const result: MutationPending<T> = {
    data: pendingData,
    status: 'pending',
  };

  // Watch for promise resolutions
  // to update cache data
  pendingData.then(
    (data) => {
      const mutation = getMutation<T>(generatedKey);

      const shouldUpdate = (): boolean => {
        // Case 1: There's no mutation
        if (mutation == null) {
          return true;
        }

        // Case 2: Timestamp expired
        if (mutation.timestamp > timestamp) {
          return false;
        }

        // Case 3: There's a stale data
        if (mutation.result.status === 'success') {
          // Deep compare stale data
          return !fullOpts.compare(
            mutation.result.data,
            data,
          );
        }

        // Always update
        return true;
      };

      if (shouldUpdate()) {
        setMutation(generatedKey, {
          result: {
            data,
            status: 'success',
          },
          timestamp: (mutation && mutation.timestamp) ? mutation.timestamp : Date.now(),
          isValidating: false,
        });
      }
    },
    (data) => {
      const mutation = getMutation<T>(generatedKey);

      const shouldUpdate = (): boolean => {
        // Case 1: There's no mutation
        if (mutation == null) {
          return true;
        }

        // Case 2: Timestamp expired
        if (mutation.timestamp > timestamp) {
          return false;
        }

        // Always update
        return true;
      };

      if (shouldUpdate()) {
        setMutation(generatedKey, {
          result: {
            data,
            status: 'failure',
          },
          timestamp: (mutation && mutation.timestamp) ? mutation.timestamp : Date.now(),
          isValidating: false,
        });
      }
    },
  );

  // If there's an existing mutation
  // and mutation is stale
  // update timestamp and return
  if (
    currentMutation
    && currentMutation.timestamp + fullOpts.freshAge + fullOpts.staleAge > timestamp
  ) {
    // Updating this means that the freshness or the staleness
    // of a mutation resets
    currentMutation.timestamp = timestamp;
    currentMutation.isValidating = true;
    return currentMutation.result;
  }

  // Otherwise, set the new mutation
  setMutation(generatedKey, {
    result,
    timestamp,
    isValidating: true,
  });

  return result;
}

type Cleanup = () => void;
type Cleanups = Cleanup[];
type Subscribe = () => Cleanup;


// This lazy registration allows manageable
// global source subscriptions by performing
// reference-counting.
function lazyRegister<T, P extends any[] = []>(
  cleanups: Map<string, Cleanups>,
  generatedKey: string,
  fullOpts: SWRFullOptions<T, P>,
  args: P,
) {
  // If there are listeners, it means
  // that the store has already made subscriptions
  if (getMutationListenerSize(generatedKey) > 0) {
    return;
  }

  // Create cleanup stack
  const currentCleanups: Cleanups = [];

  const subscription = (sub: Subscribe) => {
    currentCleanups.push(sub());
  };

  const onRevalidate = () => {
    setRevalidation(generatedKey, true);
  };
  subscription(() => {
    const innerRevalidate = (flag: boolean) => {
      revalidate(fullOpts, args, {
        shouldRevalidate: flag,
      });
    };
    return subscribeRevalidation(generatedKey, innerRevalidate);
  });

  // Only register on client-side
  if (IS_CLIENT) {
    // Register polling interval
    if (fullOpts.refreshInterval != null) {
      if (fullOpts.refreshWhenBlurred) {
        subscription(() => {
          let interval: undefined | number;

          const enter = () => {
            window.clearInterval(interval);
            interval = window.setInterval(onRevalidate, fullOpts.refreshInterval);
          };
          const exit = () => {
            window.clearInterval(interval);
            interval = undefined;
          };

          window.addEventListener('blur', enter, false);
          window.addEventListener('focus', exit, false);

          return () => {
            window.removeEventListener('blur', enter, false);
            window.removeEventListener('focus', exit, false);
            window.clearInterval(interval);
          };
        });
      }
      if (fullOpts.refreshWhenOffline) {
        subscription(() => {
          let interval: undefined | number;

          const enter = () => {
            window.clearInterval(interval);
            interval = window.setInterval(onRevalidate, fullOpts.refreshInterval);
          };
          const exit = () => {
            window.clearInterval(interval);
            interval = undefined;
          };

          window.addEventListener('offline', enter, false);
          window.addEventListener('online', exit, false);

          return () => {
            window.removeEventListener('offline', enter, false);
            window.removeEventListener('online', exit, false);
            window.clearInterval(interval);
          };
        });
      }
      if (fullOpts.refreshWhenHidden) {
        subscription(() => {
          let interval: undefined | number;

          const onVisibility = () => {
            window.clearInterval(interval);
            if (document.visibilityState === 'visible') {
              interval = undefined;
            } else {
              interval = window.setInterval(onRevalidate, fullOpts.refreshInterval);
            }
          };

          document.addEventListener('visibilitychange', onVisibility, false);

          return () => {
            document.removeEventListener('visibilitychange', onVisibility, false);
            window.clearInterval(interval);
          };
        });
      }
      if (
        !(fullOpts.refreshWhenHidden
        || fullOpts.refreshWhenBlurred
        || fullOpts.refreshWhenOffline)
      ) {
        subscription(() => {
          const interval = window.setInterval(onRevalidate, fullOpts.refreshInterval);

          return () => {
            window.clearInterval(interval);
          };
        });
      }
    }

    // Registers a focus event for revalidation.
    if (fullOpts.revalidateOnFocus) {
      subscription(() => {
        window.addEventListener('focus', onRevalidate, false);

        return () => {
          window.removeEventListener('focus', onRevalidate, false);
        };
      });
    }

    // Registers a online event for revalidation.
    if (fullOpts.revalidateOnNetwork) {
      subscription(() => {
        window.addEventListener('online', onRevalidate, false);

        return () => {
          window.removeEventListener('online', onRevalidate, false);
        };
      });
    }

    // Registers a visibility change event for revalidation.
    if (fullOpts.revalidateOnVisibility) {
      subscription(() => {
        const onVisible = () => {
          if (document.visibilityState === 'visible') {
            onRevalidate();
          }
        };

        window.addEventListener('visibilitychange', onVisible, false);

        return () => {
          window.removeEventListener('visibilitychange', onVisible, false);
        };
      });
    }
  }

  cleanups.set(generatedKey, currentCleanups);
}

function lazyUnregister(
  cleanups: Map<string, Cleanups>,
  generatedKey: string,
) {
  if (getMutationListenerSize(generatedKey) === 0) {
    const actualCleanups = cleanups.get(generatedKey);
    if (actualCleanups) {
      for (let i = 0, len = actualCleanups.length; i < len; i += 1) {
        actualCleanups[i]();
      }
      cleanups.delete(generatedKey);
    }
  }
}

export default function createSWRStore<T, P extends any[] = []>(
  options: SWRStoreOptions<T, P>,
): SWRStore<T, P> {
  const fullOpts: SWRFullOptions<T, P> = assign({}, DEFAULT_CONFIG, options);
  const cleanups = new Map<string, Cleanups>();

  return {
    id: `SWRStore-${getIndex()}`,
    trigger: (args, shouldRevalidate = true) => {
      const generatedKey = fullOpts.key(...args);
      trigger(generatedKey, shouldRevalidate);
    },
    mutate: (args, data, shouldRevalidate = true, compare = fullOpts.compare) => {
      const generatedKey = fullOpts.key(...args);
      mutate(generatedKey, data, shouldRevalidate, compare);
    },
    // This function revalidates the mutation cache
    // through reactive process
    get: (args, opts) => revalidate(fullOpts, args, opts),
    subscribe: (args, listener) => {
      const generatedKey = fullOpts.key(...args);

      // Setup lazy global registration
      lazyRegister(cleanups, generatedKey, fullOpts, args);

      const unsubscribe = subscribe(generatedKey, listener);
      return () => {
        unsubscribe();
        // Attempt lazy unregistration
        lazyUnregister(cleanups, generatedKey);
      };
    },
  };
}
