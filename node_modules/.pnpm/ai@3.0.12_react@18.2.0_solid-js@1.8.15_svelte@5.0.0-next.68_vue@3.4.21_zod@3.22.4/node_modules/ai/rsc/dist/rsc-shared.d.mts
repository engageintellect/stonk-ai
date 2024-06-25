import * as react_jsx_runtime from 'react/jsx-runtime';

declare const STREAMABLE_VALUE_TYPE: unique symbol;

type ServerWrappedAction<T = unknown> = (aiState: T, ...args: unknown[]) => Promise<[Promise<T>, unknown]>;
type ServerWrappedActions<T = unknown> = Record<string, ServerWrappedAction<T>>;
type InternalAIProviderProps<AIState = any, UIState = any> = {
    children: React.ReactNode;
    initialUIState: UIState;
    initialAIState: AIState;
    initialAIStatePatch: undefined | Promise<AIState>;
    wrappedActions: ServerWrappedActions<AIState>;
    wrappedSyncUIState?: ServerWrappedAction<AIState>;
};
type AIProviderProps<AIState = any, UIState = any, Actions = any> = {
    children: React.ReactNode;
    initialAIState?: AIState;
    initialUIState?: UIState;
    /** $ActionTypes is only added for type inference and is never used at runtime **/
    $ActionTypes?: Actions;
};
type AIProvider<AIState = any, UIState = any, Actions = any> = (props: AIProviderProps<AIState, UIState, Actions>) => Promise<React.ReactElement>;
type InferAIState<T, Fallback> = T extends AIProvider<infer AIState, any, any> ? AIState : Fallback;
type InferUIState<T, Fallback> = T extends AIProvider<any, infer UIState, any> ? UIState : Fallback;
type InferActions<T, Fallback> = T extends AIProvider<any, any, infer Actions> ? Actions : Fallback;
type ValueOrUpdater<T> = T | ((current: T) => T);
type StreamableValue<T = any, E = any> = {
    type?: typeof STREAMABLE_VALUE_TYPE;
    curr?: T;
    error?: E;
    next?: Promise<StreamableValue<T, E>>;
};

/**
 * `readStreamableValue` takes a streamable value created via the `createStreamableValue().value` API,
 * and returns an async iterator.
 *
 * ```js
 * // Inside your AI action:
 *
 * async function action() {
 *   'use server'
 *   const streamable = createStreamableValue();
 *
 *   streamable.update(1);
 *   streamable.update(2);
 *   streamable.done(3);
 *   // ...
 *   return streamable.value;
 * }
 * ```
 *
 * And to read the value:
 *
 * ```js
 * const streamableValue = await action()
 * for await (const v of readStreamableValue(streamableValue)) {
 *   console.log(v)
 * }
 * ```
 *
 * This logs out 1, 2, 3 on console.
 */
declare function readStreamableValue<T = unknown>(streamableValue: StreamableValue<T>): AsyncIterable<T | undefined>;

declare function InternalAIProvider({ children, initialUIState, initialAIState, initialAIStatePatch, wrappedActions, wrappedSyncUIState, }: InternalAIProviderProps): react_jsx_runtime.JSX.Element;
declare function useUIState<AI extends AIProvider = any>(): [InferUIState<AI, any>, (v: InferUIState<AI, any> | ((v_: InferUIState<AI, any>) => InferUIState<AI, any>)) => void];
declare function useAIState<AI extends AIProvider = any>(): [
    InferAIState<AI, any>,
    (newState: ValueOrUpdater<InferAIState<AI, any>>) => void
];
declare function useAIState<AI extends AIProvider = any>(key: keyof InferAIState<AI, any>): [
    InferAIState<AI, any>[typeof key],
    (newState: ValueOrUpdater<InferAIState<AI, any>[typeof key]>) => void
];
declare function useActions<AI extends AIProvider = any>(): InferActions<AI, any>;
declare function useSyncUIState(): () => Promise<void>;

export { InternalAIProvider, readStreamableValue, useAIState, useActions, useSyncUIState, useUIState };
