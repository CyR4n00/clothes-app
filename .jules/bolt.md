## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.

## 2024-07-09 - Avoid O(N) array operations inside useEffect state derivations
**Learning:** Found nested O(N) operations (`array.includes()` inside `.filter()`) happening during state derivations (e.g., inside `useEffect`). In React Native, running O(N^2) operations during state derivations can block the JS thread and cause UI stutters, especially during component initialization or heavy updates like swiping.
**Action:** Always pre-compute lookup arrays using `Set` for O(1) time complexity before iterating over collections, preventing JS thread blocking and UI stutters.
