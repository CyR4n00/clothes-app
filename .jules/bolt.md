## 2024-07-30 - [Optimize Swipe Filtering]
**Learning:** `Array.includes()` filtering inside `useEffect` during data preparation created O(N^2) complexity, causing lag before the swiper mounted.
**Action:** Pre-computed lookup arrays using `Set` for O(1) time complexity inside `useEffect` logic.
## 2024-07-30 - [Memoize FlatList Cards]
**Learning:** In React Native, `FlatList` components without memoized items can cause severe rendering bottlenecks when list item states are toggled. Toggling a single item's state caused all N items in the list to re-render.
**Action:** Extracted the list item component into a separate functional component and wrapped it with `React.memo()` to ensure only the modified items trigger a re-render, optimizing performance from O(N) to O(1) for item updates.
