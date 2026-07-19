## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.

## 2024-05-30 - Optimize dataset filtering by avoiding nested O(N) array checks
**Learning:** Found a nested array check `.includes` happening during filtering inside a `useEffect` for dataset rendering, which is an O(N) check resulting in an O(N*M) operation over the dataset when combined with filtering, and redundant operations for "select all" conditions.
**Action:** Use a `Set` to convert the O(N) lookup array to an O(1) set check, and add an early bypass for the "select all" wildcard to completely skip unnecessary computations.
