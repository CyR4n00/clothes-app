import re
import os

files = [
    "outfit-swiper/app/index.tsx",
    "outfit-swiper/app/add-item.tsx",
    "outfit-swiper/app/final-confirmation.tsx",
    "outfit-swiper/app/swipe.tsx",
    "outfit-swiper/app/macro-settings.tsx",
    "outfit-swiper/app/explore.tsx",
    "outfit-swiper/app/paywall.tsx"
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Make the UI less "uncool" and more modern/minimalist

    # 1. Very subtle animated-style mesh gradient colors instead of flat gray
    content = content.replace("colors={['#F1F3F5', '#FDFDFD', '#F9FAFB']}", "colors={['#EAEFF2', '#FAFBFC', '#F0F3F5']}")

    # 2. Refine typography (Less pure black, more premium dark slate)
    content = content.replace("color: '#000000'", "color: '#111827'")
    content = content.replace("backgroundColor: '#000000'", "backgroundColor: '#111827'")

    # 3. Soften the extreme borders and opacities from the previous glassmorphism attempt
    content = content.replace("borderColor: 'rgba(255, 255, 255, 0.9)'", "borderColor: 'rgba(255, 255, 255, 0.6)'")
    content = content.replace("backgroundColor: 'rgba(255, 255, 255, 0.4)'", "backgroundColor: 'rgba(255, 255, 255, 0.65)'")
    content = content.replace("backgroundColor: 'rgba(255, 255, 255, 0.55)'", "backgroundColor: 'rgba(255, 255, 255, 0.75)'")

    # 4. Tweak the shadows so they don't look muddy
    content = content.replace("shadowOpacity: 0.152,", "shadowOpacity: 0.08,")
    content = content.replace("shadowRadius: 20,", "shadowRadius: 15,")

    # 5. Fix navigation bar to look more modern
    content = content.replace("height: 70", "height: 64")
    content = content.replace("borderRadius: 35", "borderRadius: 32")
    content = content.replace("width: 300", "width: '85%'")
    content = content.replace("bottom: 30", "bottom: 25")

    with open(filepath, 'w') as f:
        f.write(content)

print("Theme refined.")
