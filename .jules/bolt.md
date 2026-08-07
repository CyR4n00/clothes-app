## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.
## 2026-06-18 - Optimize swipe screen array filter
**Learning:** Found a nested array check `.includes` happening during useEffect inside `swipe.tsx` which is \(O(M)\) check resulting in an \(O(N*M)\) operation over the dataset, combined with a `.filter` query per item.
**Action:** Use a `Set` to compute active item ids for an \(O(1)\) check during filtering, reducing the complexity to O(N).
