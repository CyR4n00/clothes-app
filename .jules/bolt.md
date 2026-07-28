## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.
## 2024-07-14 - Optimize collection filtering with Pre-computed Sets
**Learning:** Nested O(N) operations inside state derivations (e.g., `array.includes()` inside an `.filter()` iteration) during `useEffect` can block the JS thread and cause UI stutters in React Native, especially as the number of items or collections grows.
**Action:** When filtering collections, pre-compute required lookups into `Set` structures to achieve O(1) time complexity. For 'all' collection cases, skip filtering lookups entirely to avoid generating redundant data structures.
