const fs = require('fs');
let content = fs.readFileSync('outfit-swiper/app/swipe.tsx', 'utf8');
content = content.replace(
  `      let collectionItemIdsSet: Set<string>;`,
  `      // Optimization: Pre-compute a Set of item IDs to avoid O(N) array lookups within the filter loop
      let collectionItemIdsSet: Set<string>;`
);
fs.writeFileSync('outfit-swiper/app/swipe.tsx', content);
