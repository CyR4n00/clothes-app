## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.
## 2026-06-18 - Avoid O(N) array inclusion checks within render/state derivations loops
**Learning:** Checking for item existence in an array (`array.includes()`) inside an already iterating function like `.filter()` creates an O(N^2) operation. When run inside state derivations like `useEffect` upon swiping/navigation, this blocks the JS thread causing UI stutters.
**Action:** Always pre-compute a `Set` for O(1) lookups before filtering large datasets in React Native to keep the main thread unblocked.
