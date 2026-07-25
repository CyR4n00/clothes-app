## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.
## 2024-07-25 - [Optimize Swipe Filtering]
**Learning:** In React Native state derivations (like inside `useEffect`), mapping all items to an array when a condition acts as a 'select all' wildcard is redundant and causes performance issues. Additionally, nested O(N) operations like `array.includes()` inside a `.filter()` iteration can block the JS thread.
**Action:** Handle wildcard conditions via early returns or bypassing redundant mapping entirely. Use `Set` for O(1) time complexity lookups instead of O(N) array traversals during `.filter()` iterations to prevent JS thread blocking and UI stutters.
