## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.
## 2024-07-31 - [Collection Filtering O(N^2) Bottleneck]
**Learning:** Using `Array.includes()` for a wildcard "all" condition inside a `.filter()` iteration blocks the JS thread with O(N^2) complexity, causing UI stutters.
**Action:** Implement an early-bypass fast path for wildcard conditions and use `Set` for O(1) lookups on filtered subsets.
