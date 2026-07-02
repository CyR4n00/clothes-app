## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.
## 2024-07-02 - [Animated View Stacking]
**Learning:** For custom swiper components relying on `Animated.View`, mapping and rendering the entire dataset as a stacked view hierarchy causes severe memory and layout overhead.
**Action:** Limit rendering to only the top visible cards (e.g., returning `null` when `index > cardIndex + 2`).
