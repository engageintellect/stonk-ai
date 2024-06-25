# solid-swr-store

> SolidJS bindings for `swr-store`

[![NPM](https://img.shields.io/npm/v/solid-swr-store.svg)](https://www.npmjs.com/package/solid-swr-store) [![JavaScript Style Guide](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://codesandbox.io/s/github/LXSMNSYC/swr-store/tree/main/examples/solid-swr-store)

## Install

```bash
npm install --save swr-store solid-swr-store
```

```bash
yarn add swr-store solid-swr-store
```

## Usage

```tsx
import { Suspense } from 'solid-js';
import { createSWRStore } from 'swr-store';
import { useSWRStore, useSWRStoreSuspenselesss } from 'solid-swr-store';

const API = 'https://dog.ceo/api/breed/';
const API_SUFFIX = '/images/random';

interface APIResult {
  message: string;
  status: string;
}

const dogAPI = createSWRStore<APIResult, [string]>({
  key: (breed: string) => breed,
  get: async (breed: string) => {
    const response = await fetch(`${API}${breed}${API_SUFFIX}`);
    return (await response.json()) as APIResult;
  },
  revalidateOnFocus: true,
  revalidateOnNetwork: true,
});

function DogImage(): JSX.Element {
  const data = useSWRStore(dogAPI, ['shiba']);

  return <img src={data().message} alt={data().message} />;
}

function DogImageSuspenseless(): JSX.Element {
  const data = useSWRStoreSuspenseless(dogAPI, ['shiba']);

  return () => {
    const current = data();

    if (current.status === 'pending') {
      return <h1>Loading...</h1>;
    }
    if (current.status === 'failure') {
      return <h1>Something went wrong.</h1>
    }
    return <img src={current.data.message} alt={current.data.message} />;
  };
}

function Trigger(): JSX.Element {
  return (
    <button
      type="button"
      onClick={() => {
        dogAPI.trigger(['shiba']);
      }}
    >
      Trigger
    </button>
  );
}

export default function App(): JSX.Element {
  return (
    <>
      <Trigger />
      <div>
        <Suspense fallback={<h1>Loading...</h1>}>
          <DogImage />
        </Suspense>
        <DogImageSuspenseless />
      </div>
    </>
  );
}
```

## API

### `useSWRStore(store, args, options)`

Subscribes to an SWR store, passing `args`, which are received by the corresponding store for data-fetching and cache updates.

`options` has the following properties:

- `initialData`: Allows lazy hydration when reading the store. If the store does not have cache, `initialData` hydrates the cache and attempts a revalidation. If no `initialData` is provided, defaults to store's `options.initialData`.
- `shouldRevalidate`: If `true`, goes through the revalidation process when reading through the cache. Defaults to `true`.

### `useSWRStoreSuspenseless(store, args, options)`

Has the same API as `useSWRStore` except that it doesn't suspend the reading component.

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
