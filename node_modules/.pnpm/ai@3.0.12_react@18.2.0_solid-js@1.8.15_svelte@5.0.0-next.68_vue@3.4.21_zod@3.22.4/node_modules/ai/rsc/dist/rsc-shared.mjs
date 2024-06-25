"use client";

// rsc/constants.ts
var STREAMABLE_VALUE_TYPE = Symbol.for("ui.streamable.value");
var DEV_DEFAULT_STREAMABLE_WARNING_TIME = 15 * 1e3;

// rsc/shared-client/streamable.tsx
function assertStreamableValue(value) {
  if (!value || typeof value !== "object" || !("type" in value) || value.type !== STREAMABLE_VALUE_TYPE) {
    throw new Error(
      "Invalid value: this hook only accepts values created via `createStreamableValue` from the server."
    );
  }
}
function readStreamableValue(streamableValue) {
  assertStreamableValue(streamableValue);
  return {
    [Symbol.asyncIterator]() {
      let row = streamableValue;
      let curr = row.curr;
      let done = false;
      return {
        async next() {
          if (done)
            return { value: curr, done: true };
          row = await row;
          if (typeof row.error !== "undefined") {
            throw row.error;
          }
          if ("curr" in row) {
            curr = row.curr;
            if (!row.next) {
              done = true;
              return {
                value: curr,
                done: false
              };
            }
          }
          if (!row.next) {
            return {
              value: curr,
              done: true
            };
          }
          row = row.next;
          return {
            value: curr,
            done: false
          };
        }
      };
    }
  };
}

// rsc/shared-client/context.tsx
import * as React2 from "react";
import * as jsondiffpatch from "jsondiffpatch";

// rsc/utils.tsx
import { Suspense } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var R = [
  async ({
    c,
    // current
    n
    // next
  }) => {
    const chunk = await n;
    if (chunk.done) {
      return chunk.value;
    }
    if (chunk.append) {
      return /* @__PURE__ */ jsxs(Fragment, { children: [
        c,
        /* @__PURE__ */ jsx(Suspense, { fallback: chunk.value, children: /* @__PURE__ */ jsx(R, { c: chunk.value, n: chunk.next }) })
      ] });
    }
    return /* @__PURE__ */ jsx(Suspense, { fallback: chunk.value, children: /* @__PURE__ */ jsx(R, { c: chunk.value, n: chunk.next }) });
  }
][0];
var isFunction = (x) => typeof x === "function";

// rsc/shared-client/context.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var InternalUIStateProvider = React2.createContext(null);
var InternalAIStateProvider = React2.createContext(void 0);
var InternalActionProvider = React2.createContext(null);
var InternalSyncUIStateProvider = React2.createContext(null);
function InternalAIProvider({
  children,
  initialUIState,
  initialAIState,
  initialAIStatePatch,
  wrappedActions,
  wrappedSyncUIState
}) {
  if (!("use" in React2)) {
    throw new Error("Unsupported React version.");
  }
  const uiState = React2.useState(initialUIState);
  const setUIState = uiState[1];
  const resolvedInitialAIStatePatch = initialAIStatePatch ? React2.use(initialAIStatePatch) : void 0;
  initialAIState = React2.useMemo(() => {
    if (resolvedInitialAIStatePatch) {
      return jsondiffpatch.patch(
        jsondiffpatch.clone(initialAIState),
        resolvedInitialAIStatePatch
      );
    }
    return initialAIState;
  }, [initialAIState, resolvedInitialAIStatePatch]);
  const aiState = React2.useState(initialAIState);
  const setAIState = aiState[1];
  const aiStateRef = React2.useRef(aiState[0]);
  React2.useEffect(() => {
    aiStateRef.current = aiState[0];
  }, [aiState[0]]);
  const clientWrappedActions = React2.useMemo(
    () => Object.fromEntries(
      Object.entries(wrappedActions).map(([key, action]) => [
        key,
        async (...args) => {
          const aiStateSnapshot = aiStateRef.current;
          const [aiStateDelta, result] = await action(
            aiStateSnapshot,
            ...args
          );
          (async () => {
            const delta = await aiStateDelta;
            if (delta !== void 0) {
              aiState[1](
                jsondiffpatch.patch(
                  jsondiffpatch.clone(aiStateSnapshot),
                  delta
                )
              );
            }
          })();
          return result;
        }
      ])
    ),
    [wrappedActions]
  );
  const clientWrappedSyncUIStateAction = React2.useMemo(() => {
    if (!wrappedSyncUIState) {
      return () => {
      };
    }
    return async () => {
      const aiStateSnapshot = aiStateRef.current;
      const [aiStateDelta, uiState2] = await wrappedSyncUIState(
        aiStateSnapshot
      );
      if (uiState2 !== void 0) {
        setUIState(uiState2);
      }
      const delta = await aiStateDelta;
      if (delta !== void 0) {
        const patchedAiState = jsondiffpatch.patch(
          jsondiffpatch.clone(aiStateSnapshot),
          delta
        );
        setAIState(patchedAiState);
      }
    };
  }, [wrappedSyncUIState]);
  return /* @__PURE__ */ jsx2(InternalAIStateProvider.Provider, { value: aiState, children: /* @__PURE__ */ jsx2(InternalUIStateProvider.Provider, { value: uiState, children: /* @__PURE__ */ jsx2(InternalActionProvider.Provider, { value: clientWrappedActions, children: /* @__PURE__ */ jsx2(
    InternalSyncUIStateProvider.Provider,
    {
      value: clientWrappedSyncUIStateAction,
      children
    }
  ) }) }) });
}
function useUIState() {
  const state = React2.useContext(InternalUIStateProvider);
  if (state === null) {
    throw new Error("`useUIState` must be used inside an <AI> provider.");
  }
  if (!Array.isArray(state)) {
    throw new Error("Invalid state");
  }
  if (state[0] === void 0) {
    throw new Error(
      "`initialUIState` must be provided to `createAI` or `<AI>`"
    );
  }
  return state;
}
function useAIState(...args) {
  const state = React2.useContext(InternalAIStateProvider);
  if (state === null) {
    throw new Error("`useAIState` must be used inside an <AI> provider.");
  }
  if (!Array.isArray(state)) {
    throw new Error("Invalid state");
  }
  if (state[0] === void 0) {
    throw new Error(
      "`initialAIState` must be provided to `createAI` or `<AI>`"
    );
  }
  if (args.length >= 1 && typeof state[0] !== "object") {
    throw new Error(
      "When using `useAIState` with a key, the AI state must be an object."
    );
  }
  const key = args[0];
  const setter = React2.useCallback(
    typeof key === "undefined" ? state[1] : (newState) => {
      if (isFunction(newState)) {
        return state[1]((s) => {
          return { ...s, [key]: newState(s[key]) };
        });
      } else {
        return state[1]({ ...state[0], [key]: newState });
      }
    },
    [key]
  );
  if (args.length === 0) {
    return state;
  } else {
    return [state[0][args[0]], setter];
  }
}
function useActions() {
  const actions = React2.useContext(InternalActionProvider);
  return actions;
}
function useSyncUIState() {
  const syncUIState = React2.useContext(
    InternalSyncUIStateProvider
  );
  if (syncUIState === null) {
    throw new Error("`useSyncUIState` must be used inside an <AI> provider.");
  }
  return syncUIState;
}
export {
  InternalAIProvider,
  readStreamableValue,
  useAIState,
  useActions,
  useSyncUIState,
  useUIState
};
//# sourceMappingURL=rsc-shared.mjs.map