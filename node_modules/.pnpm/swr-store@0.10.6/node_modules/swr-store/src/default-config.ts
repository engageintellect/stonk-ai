import { dequal } from 'dequal/lite';
import { SWRStoreExtendedOptions } from './types';

function defaultKey<P extends any[] = []>(...args: P): string {
  return JSON.stringify(args);
}

const DEFAULT_CONFIG: SWRStoreExtendedOptions<any, any> = {
  revalidateOnFocus: false,
  revalidateOnNetwork: false,
  revalidateOnVisibility: false,
  refreshWhenHidden: false,
  refreshWhenBlurred: false,
  refreshWhenOffline: false,
  freshAge: 2000,
  staleAge: 30000,
  key: defaultKey,
  compare: dequal,
  maxRetryInterval: 5000,
};

export default DEFAULT_CONFIG;
