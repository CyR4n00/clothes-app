## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.

## 2026-06-30 - Optimize Swiper Component Rendering
**Learning:** Rendering entire datasets as a stacked view hierarchy in custom swiper components relying on `Animated.View` causes severe memory and layout overhead. Also, using `includes()` instead of a `Set` inside a filter for large datasets leads to unnecessary performance bottlenecks.
**Action:** Limit rendering to only the top visible cards by checking the card index (e.g. `index > cardIndex + 2`) and returning `null`, and convert arrays to `Set`s for O(1) lookups during array filtering operations.
