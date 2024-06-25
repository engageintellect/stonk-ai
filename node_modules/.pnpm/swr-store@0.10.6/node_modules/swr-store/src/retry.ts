interface RetryOptions {
  count?: number;
  interval: number;
}

interface Resolvable<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: any) => void;
}

export interface Retry<T> {
  resolvable: Resolvable<T>;
  cancel: () => void;
}

function createResolvable<T>(): Resolvable<T> {
  let resolve: Resolvable<T>['resolve'] = () => {
    //
  };
  let reject: Resolvable<T>['reject'] = () => {
    //
  };

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve,
    reject,
  };
}

export default function retry<T>(supplier: () => Promise<T>, options: RetryOptions): Retry<T> {
  let alive = true;
  let schedule: number;

  const resolvable = createResolvable<T>();

  const backoff = (timeout = 10, count = 0) => {
    const handle = (reason: any) => {
      if (!alive || (typeof options.count === 'number' && options.count <= count)) {
        resolvable.reject(reason);
      } else {
        schedule = window.setTimeout(() => {
          backoff(Math.max(10, Math.min(options.interval, timeout * 2)), count + 1);
        }, timeout);
      }
    };

    try {
      supplier().then(resolvable.resolve, handle);
    } catch (reason) {
      handle(reason);
    }
  };

  backoff();

  return {
    resolvable,
    cancel: () => {
      if (schedule) {
        clearTimeout(schedule);
      }
      alive = false;
    },
  };
}
