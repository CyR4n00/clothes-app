## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.

## 2026-06-25 - Avoid nested O(N) operations during state derivations
**Learning:** Found a nested array check (`Array.includes()` inside an `Array.filter()`) happening inside a `useEffect` during state derivations, creating an O(N^2) operation that blocks the JS thread and causes UI stutters.
**Action:** Avoid nested O(N) operations in derivations. For array lookups, pre-compute a lookup array using `Set` for O(1) time complexity, and utilize early returns/bypass for wildcard 'select all' conditions instead of redundantly mapping data into arrays or Sets.
