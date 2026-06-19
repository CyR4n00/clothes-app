## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.
## 2026-06-19 - Optimize filtering by reducing O(n) array lookup and allocations
**Learning:** Found an unnecessary `.map` over the entire `clothes` array when 'all' items were selected in the swipe deck, resulting in unnecessary allocations. For non-all collections, filtering was using a nested `.includes` lookup on an array resulting in O(N*M) complexity.
**Action:** When filtering by a set of IDs, convert the array of valid IDs to a `Set` for O(1) checks (`.has()`). When 'all' items are valid, bypass the ID filtering completely to save both array allocation and iteration overhead.
