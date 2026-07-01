## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.
## 2026-06-18 - Optimize Swiper Rendering by limiting mapped cards in Animated.View stacked hierarchy
**Learning:** When mapping a large array into an absolute stacked layout (like a Tinder swiper), rendering all unseen items causes severe memory bloat and layout bottlenecking. Rendering should be bounded (e.g. `index > cardIndex + 2`).
**Action:** Always short-circuit mappings or use FlatList for large lists, limiting absolute stacked renders to only the visible topmost components.
