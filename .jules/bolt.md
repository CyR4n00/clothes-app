## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.
## 2025-07-27 - [Optimize array filtering and lookups]
**Learning:** [Using `.includes()` inside a `.filter()` loop results in an O(N²) operation that can block the JS thread and cause UI stutters. Redundantly mapping an entire dataset into an array for wildcard matching ('all' condition) also introduces unnecessary memory overhead.]
**Action:** [Pre-compute lookup data using `Set` for O(1) time complexity, and bypass iteration altogether for wildcard matching by using early returns or skipping the check entirely.]
