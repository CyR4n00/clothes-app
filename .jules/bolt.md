## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.

## 2026-06-18 - Optimize Swiper Deck Data Derivation
**Learning:** Found an unnecessary O(N) array allocation (`clothes.map(c => c.id)`) and nested O(N) array lookup (`collectionItemIds.includes(c.id)`) inside an O(N) `.filter()` operation during the swiper deck derivation `useEffect`. When datasets are large, this blocking O(N * M) operation could cause stuttering or dropped frames on the main UI thread immediately preceding swipe gestures.
**Action:** Replaced `.includes()` with a `Set` for O(1) lookups and bypassed array allocations entirely when the fallback 'all' filter is active.
