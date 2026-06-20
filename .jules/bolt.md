## 2026-06-18 - Optimize FlatList Rendering by reducing O(n) array lookup in render function
**Learning:** Found a nested array check `.includes` happening during rendering inside a `FlatList` which is \(O(N)\) check resulting in an \(O(N*N)\) operation over the dataset, combined with a `.find` query per item.
**Action:** Use `useMemo` to compute a Set of active items for an \(O(1)\) check during rendering, and combine with `useCallback` on render functions, to prevent unnecessary re-renders of the lists when unrelated state updates.

## 2026-06-20 - Swiper rendering and filtering optimization
**Learning:** Found an anti-pattern in the custom `swipe.tsx` swiper component where mapping over the entire deck rendered an overlapping `Animated.View` stack for *all* items, causing significant layout and memory overhead for large collections. Additionally, filtering the dataset for swiping used an O(N) `Array.includes()` check inside `Array.filter()`, leading to O(N*M) complexity.
**Action:** Limit rendered cards in custom swipers (e.g., `index > cardIndex + 2 return null`) to only mount the visible stack. Use `Set.has()` instead of `Array.includes()` for O(1) membership lookups during heavy filtering passes.
