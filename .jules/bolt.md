## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.

## 2024-05-24 - Optimize Swiper Component Rendering and Filtering

**Learning:** Rendering an entire dataset as a stacked view hierarchy using `Array.prototype.map()` in `Animated.View` components causes severe memory and layout overhead, leading to a sluggish swiping experience. Additionally, using `Array.prototype.includes()` inside an `Array.prototype.filter()` loop for checking collection items introduces a nested O(N) operation, blocking the JS thread.

**Action:**
1. Limit rendering of stacked cards to only the top visible ones (e.g., return `null` when `index > cardIndex + 2`).
2. Always pre-compute lookup arrays as a `Set` for O(1) time complexity instead of checking arrays during iterations inside `useEffect`.
