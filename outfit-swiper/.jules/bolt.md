## 2024-07-08 - Swiper Memory & Layout Optimization
**Learning:** For custom swiper components relying on `Animated.View`, mapping and rendering the entire dataset as a stacked view hierarchy causes severe memory and layout overhead, leading to significant frontend performance degradations especially on larger datasets.
**Action:** Limit rendering to only the top visible cards by conditionally returning `null` when `index > cardIndex + 2`.
