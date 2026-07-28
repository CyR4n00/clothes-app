## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.
## 2024-07-28 - O(N^2) Array lookups during Render
**Learning:** Using `Array.includes()` inside a `filter()` iteration (or similar loops) causes O(N^2) time complexity, which blocks the JS thread and stutters the UI in React Native apps (e.g. while filtering items for Swipe views). Additionally, creating a redundant array mapping for a wildcard "all" condition allocates unnecessary memory.
**Action:** Pre-compute lookup tables using `Set` for O(1) lookups before iterating, and use early returns or bypass logic for wildcard conditions to avoid redundant data mapping.
