import * as react_jsx_runtime from 'react/jsx-runtime';
import { ReactNode } from 'react';
import OpenAI from 'openai';
import { z } from 'zod';

declare const STREAMABLE_VALUE_TYPE: unique symbol;

type AIAction<T = any, R = any> = (...args: T[]) => Promise<R>;
type AIActions<T = any, R = any> = Record<string, AIAction<T, R>>;
type AIProviderProps<AIState = any, UIState = any, Actions = any> = {
    children: React.ReactNode;
    initialAIState?: AIState;
    initialUIState?: UIState;
    /** $ActionTypes is only added for type inference and is never used at runtime **/
    $ActionTypes?: Actions;
};
type AIProvider<AIState = any, UIState = any, Actions = any> = (props: AIProviderProps<AIState, UIState, Actions>) => Promise<React.ReactElement>;
type InferAIState<T, Fallback> = T extends AIProvider<infer AIState, any, any> ? AIState : Fallback;
type OnSetAIState<S> = ({ key, state, done, }: {
    key: string | number | symbol | undefined;
    state: S;
    done: boolean;
}) => void | Promise<void>;
type OnGetUIState<S> = AIAction<void, S | undefined>;
type ValueOrUpdater<T> = T | ((current: T) => T);
type MutableAIState<AIState> = {
    get: () => AIState;
    update: (newState: ValueOrUpdater<AIState>) => void;
    done: ((newState: AIState) => void) | (() => void);
};
type StreamableValue<T = any, E = any> = {
    type?: typeof STREAMABLE_VALUE_TYPE;
    curr?: T;
    error?: E;
    next?: Promise<StreamableValue<T, E>>;
};

/**
 * Get the current AI state.
 * If `key` is provided, it will return the value of the specified key in the
 * AI state, if it's an object. If it's not an object, it will throw an error.
 *
 * @example const state = getAIState() // Get the entire AI state
 * @example const field = getAIState('key') // Get the value of the key
 */
declare function getAIState<AI extends AIProvider = any>(): InferAIState<AI, any>;
declare function getAIState<AI extends AIProvider = any>(key: keyof InferAIState<AI, any>): InferAIState<AI, any>[typeof key];
/**
 * Get the mutable AI state. Note that you must call `.close()` when finishing
 * updating the AI state.
 *
 * @example
 * ```tsx
 * const state = getMutableAIState()
 * state.update({ ...state.get(), key: 'value' })
 * state.update((currentState) => ({ ...currentState, key: 'value' }))
 * state.done()
 * ```
 *
 * @example
 * ```tsx
 * const state = getMutableAIState()
 * state.done({ ...state.get(), key: 'value' }) // Done with a new state
 * ```
 */
declare function getMutableAIState<AI extends AIProvider = any>(): MutableAIState<InferAIState<AI, any>>;
declare function getMutableAIState<AI extends AIProvider = any>(key: keyof InferAIState<AI, any>): MutableAIState<InferAIState<AI, any>[typeof key]>;

/**
 * Create a piece of changable UI that can be streamed to the client.
 * On the client side, it can be rendered as a normal React node.
 */
declare function createStreamableUI(initialValue?: React.ReactNode): {
    value: react_jsx_runtime.JSX.Element;
    update(value: React.ReactNode): void;
    append(value: React.ReactNode): void;
    error(error: any): void;
    done(...args: [] | [React.ReactNode]): void;
};
/**
 * Create a wrapped, changable value that can be streamed to the client.
 * On the client side, the value can be accessed via the readStreamableValue() API.
 */
declare function createStreamableValue<T = any, E = any>(initialValue?: T): {
    readonly value: StreamableValue<T, E>;
    update(value: T): void;
    error(error: any): void;
    done(...args: [
    ] | [T]): void;
};
type Streamable = ReactNode | Promise<ReactNode>;
type Renderer<T> = (props: T) => Streamable | Generator<Streamable, Streamable, void> | AsyncGenerator<Streamable, Streamable, void>;
/**
 * `render` is a helper function to create a streamable UI from some LLMs.
 * Currently, it only supports OpenAI's GPT models with Function Calling and Assistants Tools.
 */
declare function render<TS extends {
    [name: string]: z.Schema;
} = {}, FS extends {
    [name: string]: z.Schema;
} = {}>(options: {
    /**
     * The model name to use. Must be OpenAI SDK compatible. Tools and Functions are only supported
     * GPT models (3.5/4), OpenAI Assistants, Mistral small and large, and Fireworks firefunction-v1.
     *
     * @example "gpt-3.5-turbo"
     */
    model: string;
    /**
     * The provider instance to use. Currently the only provider available is OpenAI.
     * This needs to match the model name.
     */
    provider: OpenAI;
    messages: Parameters<typeof OpenAI.prototype.chat.completions.create>[0]['messages'];
    text?: Renderer<{
        /**
         * The full text content from the model so far.
         */
        content: string;
        /**
         * The new appended text content from the model since the last `text` call.
         */
        delta: string;
        /**
         * Whether the model is done generating text.
         * If `true`, the `content` will be the final output and this call will be the last.
         */
        done: boolean;
    }>;
    tools?: {
        [name in keyof TS]: {
            description?: string;
            parameters: TS[name];
            render: Renderer<z.infer<TS[name]>>;
        };
    };
    functions?: {
        [name in keyof FS]: {
            description?: string;
            parameters: FS[name];
            render: Renderer<z.infer<FS[name]>>;
        };
    };
    initial?: ReactNode;
    temperature?: number;
}): ReactNode;

declare function createAI<AIState = any, UIState = any, Actions extends AIActions = {}>({ actions, initialAIState, initialUIState, unstable_onSetAIState: onSetAIState, unstable_onGetUIState: onGetUIState, }: {
    actions: Actions;
    initialAIState?: AIState;
    initialUIState?: UIState;
    unstable_onSetAIState?: OnSetAIState<AIState>;
    unstable_onGetUIState?: OnGetUIState<UIState>;
}): AIProvider<AIState, UIState, Actions>;

export { createAI, createStreamableUI, createStreamableValue, getAIState, getMutableAIState, render };
