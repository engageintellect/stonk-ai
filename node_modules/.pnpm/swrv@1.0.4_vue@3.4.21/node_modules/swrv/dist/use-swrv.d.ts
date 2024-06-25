import SWRVCache from './cache';
import { IConfig, IKey, IResponse, fetcherFn } from './types';
/**
 * Main mutation function for receiving data from promises to change state and
 * set data cache
 */
declare const mutate: <Data>(key: string, res: Data | Promise<Data>, cache?: SWRVCache<Omit<IResponse<any, any>, "mutate">>, ttl?: number) => Promise<{
    data: any;
    error: any;
    isValidating: any;
}>;
declare function useSWRV<Data = any, Error = any>(key: IKey): IResponse<Data, Error>;
declare function useSWRV<Data = any, Error = any>(key: IKey, fn: fetcherFn<Data> | undefined | null, config?: IConfig): IResponse<Data, Error>;
export { mutate };
export default useSWRV;
