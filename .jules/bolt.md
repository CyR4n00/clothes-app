## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.
## 2026-06-18 - Avoid nested O(N) filtering operations in useEffect
**Learning:** Performing a nested O(N^2) operation (e.g. `array.filter` containing `array.includes`) during derivation of state inside a `useEffect` on React Native can severely bottleneck the JS thread. The problem is exacerbated as data size scales, potentially blocking the JS thread and causing UI stutters on the bridge during card generation.
**Action:** Replace `array.includes()` inside `filter` functions with `Set.has()`, or remove the nested lookup entirely if the base dataset structure can be filtered in a single O(N) pass.
