## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.

## 2024-07-20 - O(N^2) Performance Bottleneck in Swipe Collection Filter
**Learning:** In `outfit-swiper/app/swipe.tsx`, filtering clothes based on the 'all' collection previously created a redundant array of all IDs and used `.includes()` inside a filter loop, causing an O(N^2) time complexity operation on every re-render of the swipe card deck. This blocks the main JS thread which causes stuttering during swipe animations in React Native.
**Action:** When a filter acts as a wildcard ('all'), bypass the ID checking entirely rather than mapping all items to a list. Use `Set` for O(1) lookups for specific collections to avoid nested iteration.
