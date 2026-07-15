## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.

## 2024-07-15 - [O(1) lookups in React Native rendering]
**Learning:** In React Native, deriving large collections of state inside `useEffect` by using nested `array.includes()` inside an `array.filter()` loop causes an O(N*M) bottleneck which blocks the JS thread and stutters UI interactions.
**Action:** Always pre-compute lookup collections into a `Set` for O(1) time complexity `has()` checks, or bypass the collection checking entirely if checking against 'all' items.
