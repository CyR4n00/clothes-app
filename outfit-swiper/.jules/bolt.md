## 2024-07-08 - Swiper Memory & Layout Optimization
**Learning:** For custom swiper components relying on `Animated.View`, mapping and rendering the entire dataset as a stacked view hierarchy causes severe memory and layout overhead, leading to significant frontend performance degradations especially on larger datasets.
**Action:** Limit rendering to only the top visible cards by conditionally returning `null` when `index > cardIndex + 2`.

## 2024-10-18 - O(N^2) React Native UI Thread Blocking
**Learning:** Nested O(N) operations inside state derivations (e.g., Array.filter combined with Array.includes) run on the JS thread in React Native and can block the main thread, causing severe UI stutters.
**Action:** Pre-compute lookup arrays using Sets to ensure O(1) time complexity for derivations inside effects or renders.
