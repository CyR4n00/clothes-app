## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.
## 2024-07-26 - [Optimize Swipe Filtering]
**Learning:** In React Native derivations during `useEffect`, avoiding `array.includes` inside `filter` is critical for large datasets. Wildcard checks like "all" should completely bypass array creation instead of mapping all IDs to check against later.
**Action:** Pre-compute lookup elements using `Set` for O(1) time complexity, and implement early returns or conditional bypasses for 'select all' scenarios to prevent redundant iteration and UI stutter.
