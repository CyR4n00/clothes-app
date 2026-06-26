## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.
## 2024-06-26 - Optimize Swiper Array Lookup and View Hierarchy
**Learning:** In the `swipe.tsx` module, we discovered two key codebase-specific performance bottlenecks:
1. `collectionItemIds.includes(c.id)` inside a `.filter` block created an unnecessary \(O(N \times M)\) lookup when it could easily be optimized to a \(O(N)\) lookup using `Set`.
2. The custom `PanResponder` animated swiper was mapping over the full dataset and instantiating individual React components and `<Animated.View>`s for every single card, including those completely hidden. This creates a huge layout/memory bottleneck for large outfit collections. We resolved this by modifying the `.map` iteration inside `renderCards` to return `null` if the card's `index > cardIndex + 2`.

**Action:** Whenever reviewing map operations and array lookups across large data sets like Collections or Swipers, verify that non-visible elements are pruned during rendering (`null` early return or Flatlist) and convert nested `.includes` to `Sets`.
