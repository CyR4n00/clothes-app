## 2024-05-24 - Custom Swiper Render Limitation
**Learning:** Mapping and rendering the entire dataset as a stacked view hierarchy inside an Animated.View for custom swiper components causes severe memory and layout overhead.
**Action:** Limit rendering to only the top visible cards by conditionally returning null for items beyond a small offset (e.g., `index > cardIndex + 2`), which improves performance significantly on large lists.
