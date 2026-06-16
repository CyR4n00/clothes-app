## 2026-06-16 - [React Native FlatList Re-render Performance]
**Learning:** In React Native with complex modal overlays, typing into a `TextInput` component (which triggers state updates on every keystroke) will inadvertently force expensive sibling components like `FlatList` to re-render all of their visible items if their `renderItem` props are not memoized.
**Action:** Always wrap `FlatList` `renderItem` callbacks and their dependencies in `useCallback` when there are other interactive elements on the same screen that update local state.
