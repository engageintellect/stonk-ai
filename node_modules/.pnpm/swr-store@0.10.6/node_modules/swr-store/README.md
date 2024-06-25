# swr-store

> Reactive SWR stores for data-fetching.

[![NPM](https://img.shields.io/npm/v/swr-store.svg)](https://www.npmjs.com/package/swr-store) [![JavaScript Style Guide](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

## Install

```bash
npm install --save swr-store
```

```bash
yarn add swr-store
```

## Usage

```tsx
import { createSWRStore, trigger } from 'swr-store';

const dogAPI = createSWRStore<APIResult, [string]>({
  // Fetch data based on breed
  get: async (breed: string) => {
    const response = await fetch(`${API}${breed}${API_SUFFIX}`);
    return (await response.json()) as APIResult;
  },
  // Allow us to revalidate the data
  // whenever the page gets focused
  revalidateOnFocus: true,

  // Revalidate the data when the network goes
  // back online
  revalidateOnNetwork: true,
});

// Will be pending initially.
// The result will change once dogAPI.get is called again
// sometime after the fetch has assumed to be resolved.
const result = dogAPI.get(['shiba']);

if (result.status === 'pending') {
  displaySkeleton();
} else if (result.status === 'failure') {
  displayFallback();
} else if (result.status === 'success') {
  displayUI(result.data);
}

// When click is triggered, we prompt a revalidation process
document.getElementById('#refresh').addEventListener('click', () => {
  // We can do local revalidation
  dogAPI.trigger(['shiba']);

  // Or a global revalidation
  trigger('shiba');
});
```

## Features

### Key Generation

SWR stores may derive keys based on received arguments. These keys are used to locate cache references. By default, arguments are serialized through `JSON.stringify`, but can be overriden by providing `options.key`, where the `key` function receives the arguments and may return a string.

```ts
const store = createSWRStore({
  // Only select the key
  // note that keys are globally shared.
  key: (id) => id,
  
  // An auth-based endpoint
  get: (id, token) => getUserPrivateData({
    userId: id,
    token,
  }),
});

// ...
const privateData = store.get(userId, userToken);
```

### Subscriptions

SWR store allows subscriptions to subscribe for cache updates. Subscribing returns a callback that allows unsubscribing to the cache updates.

```ts

// Local subscription
const unsubscribe = userDetails.subscribe([userId], (result) => {
  if (result.status === 'pending') {
    displaySkeleton();
  } else if (result.status === 'failure') {
    displayFallback();
  } else if (result.status === 'success') {
    displayUI(result.data);
  }
});

// global subscription
import { subscribe } from 'swr-store';

const unsubscribe = subscribe(`/user/${userId}`, (result) => {
  if (result.status === 'pending') {
    displaySkeleton();
  } else if (result.status === 'failure') {
    displayFallback();
  } else if (result.status === 'success') {
    displayUI(result.data);
  }
});
```

### Hydration

SWR store may present an initial data through `options.initialData`. This data is used only when the store finds an empty cache value. Initial data is also useful for opting-out of initial pending phase and providing a way for SSR pages to hydrate stores.

```ts
const userDetails = createSWRStore({
  get: (id) => getUserDetails(id),

  initialData: prefetchedData,
});
```

Stores can also be hydrated manually through `mutate`.

Calling `store.get` also allows lazy hydration, in which the provided initial data is preferred rather than `options.initialData`.

```ts
const result = userDetails.get([userId], {
  // If there's no cache, prefetched data is used
  // then attempts revalidation
  initialData: prefetchedData,
});
```

Do note that `options.initialData` won't hydrate the actual store but present a fallback data when the result is still pending. You can use `options.hydrate` to overwrite the current cached data.

### Lazy Revalidation

SWR stores are lazily revalidated whenever `store.get` is called.

```ts
// Initial fetch
const result = store.get([]);

setTimeout(() => {
  // May contain the resolved result
  // or a new one if the cache has been invalidated.
  const newResult = store.get([]);
});
```

Revalidation on `get` may be opt-out by providing `shouldRevalidate`:

```ts
const result = store.get([], {
  shouldRevalidate: false,
});
```

### Global Revalidation

SWR stores share the same global cache, and can be prompted with a global manual revalidation. `trigger` and `mutate` are similar to store's `store.trigger` and `store.mutate` except that they accept the cache key instead of the store's expected arguments.

Stores subscribers are may be notified (`trigger` does not guarantee a notification, while `mutate` guarantees a notification) for the cache update.

```ts
import { trigger, mutate } from 'swr-store';

const userDetails = createSWRStore({
  // Transform id into a cache key
  key: (id) => `/user/${id}`,
  
  // An auth-based endpoint
  get: (id) => getUserDetails(id),
});

// ...
// Global trigger
trigger(`/user/${userId}`);

// Or mutate
mutate(`/user/${userId}`, {
  data: {
    name: 'John Doe',
    age: 16,
  },
  status: 'success',
});
```

### Local Revalidation

SWR stores can be manually revalidated by calling `store.trigger` or `store.mutate`.

- `store.trigger(args, shouldRevalidate = true)`: Triggers a revalidation from the given arguments. Arguments are passed to `options.key` to locate the cache.
- `store.mutate(args, result, shouldRevalidate = true)`: Mutates the cache with `result`. Cache is located based on the key generated from the arguments passed to `options.key`.

```ts
// Local revalidation
userDetails.trigger([userId]);

// is the same as 
trigger(`/user/${userId}`);

// Since userDetails yields the same key format.
```

### Auto Revalidation

SWR stores are able to automatically revalidate data based on DOM events. This feature can be activated based on the following options:

- `options.revalidateOnFocus`: Automatically revalidates data when the window `'focus'` event is triggered. Defaults to `false`.
- `options.revalidateOnVisibility`: Automatically revalidates data when the document `'visibilitychange'` event is triggered, specifically, if the page is `'visible'`. Defaults to `false`.
- `options.revalidateOnNetwork`: Automatically revalidates data when the window `'online'` event is triggered. Defaults to `false`.

### Polling Revalidation

SWR stores are able to poll for revalidation. They are different to event-based revalidation as polling revalidation happens in intervals.

This behavior can be activated through the following options:

- `options.refreshInterval`: Amount of time (in milliseconds) the revalidation goes through in intervals. Defaults to `undefined` (Does not poll). Polling begins immediately after the lazy setup has been triggered.

The default behavior can be overriden by the following options:

- `options.refreshWhenHidden`: Overrides the default polling behavior and only begins polling after the page becomes hidden (triggered by document `visibilitychange` event.). Once the document becomes visible, polling halts.
- `options.refreshWhenBlurred`: Overrides the default polling behavior and only begins polling after the page loses focus (triggered by window `blur` and `focus` events). Once the page is focused again, polling halts.
- `options.refreshWhenOffline`: Overrides the default polling behavior and only begins polling after the page becomes offline (triggered by window `offline` and `online` events). Once the page is focused again, polling halts.

### Lazy Setup

SWR stores are lazily setup: polling and automatic revalidation only begins when there are subscribers to the stores. Once a store receives a subscriber (through `store.subscribe` method), the store lazily sets up the revalidation processes, this way, automatic processes are conserved and are only added when needed.

Stores also halt from automatic revalidation if they lose all subscribers through reference-counting.

### Cache Age

SWR stores can define how 'fresh' or 'stale' the cache is, which can alter the revalidation behavior:

- If the cache is 'fresh', revalidation phases skips the fetching stage.
- If the cache is 'stale', revalidation phases goes through, but the result does not return to `'pending'` state.

These behavior can be defined through the following options:

- `options.freshAge`: Defines how long the cache stays 'fresh', in milliseconds. Defaults to `2000`. (2 seconds).
- `options.staleAge`: Defines how long the cache stays 'stale' after becoming 'fresh', in milliseconds. Defaults to `30000` (30 seconds).

A cache is 'fresh' when the time between the cache was updated and was read is between the `options.freshAge` value, otherwise, the cache automatically becomes 'stale'.
A cache that has been 'stale' will continue being 'stale' until the time between the cache became 'stale' and was read is between the `options.staleAge`.

Cache invalidation always happen lazily: checking for cache age only happens when the revalidation process is requested upon (usually automatically through polling or revalidation on events) or manually (`mutate` or `trigger`).

### Deduplication

SWR Stores throttles data fetching processes through the caching strategy. Cache maintain a timestamp internally, marking valid requests and cache references, establishing race conditions.

### CSR-Only Revalidation and Fetching

SWR stores' cache revalidation and data-fetching only happens on client-side.

### Success Bailouts

SWR stores, by default, deeply compare success data in between cache updates. This behavior prevents re-notifying subscribers when the contents of the data remains the same. This behavior can be overriden by providing a compare function in `options.compare`.

`mutate` accepts an custom compare function to override this behavior as a fourth parameter.

### Retries

SWR stores implements the exponential backoff algorithm for retry intervals whenever a request fails. By default, SWR stores retry indefinitely until the request resolves successfully at a maximum interval of `5000ms`. Limit can be defined through `options.maxRetryCount` and the interval can be overriden with `options.maxRetryInterval`.

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
