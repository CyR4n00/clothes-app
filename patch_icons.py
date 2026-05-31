import re
import os

files = [
    "outfit-swiper/app/index.tsx",
    "outfit-swiper/app/add-item.tsx",
    "outfit-swiper/app/final-confirmation.tsx",
    "outfit-swiper/app/swipe.tsx"
]

for filepath in files:
    with open(filepath, 'r') as f:
        content = f.read()

    # Import Ionicons
    if "import { Ionicons } from '@expo/vector-icons';" not in content:
        content = content.replace("import React", "import { Ionicons } from '@expo/vector-icons';\nimport React")

    # Replace specific emojis in UI
    # Replace nav bar emojis in index.tsx
    if "index.tsx" in filepath:
        content = content.replace("<Text style={{fontSize: 24}}>🌍</Text>", '<Ionicons name="earth" size={26} color="#000000" />')
        content = content.replace("<Text style={{fontSize: 24}}>✨</Text>", '<Ionicons name="sparkles" size={26} color="#000000" />')
        content = content.replace("<Text style={{fontSize: 24}}>⚙️</Text>", '<Ionicons name="settings-sharp" size={26} color="#000000" />')
        content = content.replace("<Text style={{color: '#000000', fontSize: 24, fontWeight: '800'}}>▶</Text>", '<Ionicons name="play" size={28} color="#000000" />')
        content = content.replace("<Text style={{color: '#000000', fontSize: 24, lineHeight: 26, fontWeight: '800'}}>+</Text>", '<Ionicons name="add" size={28} color="#000000" />')

        # Empty state
        content = content.replace("<Text style={styles.emptyIcon}>📦</Text>", '<Ionicons name="file-tray-outline" size={60} color="#000000" />')

    # Replace placeholder emojis in index and final-confirmation
    if "index.tsx" in filepath or "final-confirmation.tsx" in filepath:
        content = content.replace("let emoji = '👕';", "let iconName: any = 'shirt';")
        content = content.replace("if (item.category === 'シューズ') emoji = '👟';", "if (item.category === 'シューズ') iconName = 'footsteps';")
        content = content.replace("if (item.category === 'パンツ') emoji = '👖';", "if (item.category === 'パンツ') iconName = 'man';")
        content = content.replace("if (item.category === 'アウター') emoji = '🧥';", "if (item.category === 'アウター') iconName = 'snow';")
        content = content.replace("if (item.category === 'アクセサリー') emoji = '🧢';", "if (item.category === 'アクセサリー') iconName = 'glasses';")

        # Also handle category parameter in final-confirmation.tsx
        content = content.replace("if (category === 'シューズ') emoji = '👟';", "if (category === 'シューズ') iconName = 'footsteps';")
        content = content.replace("if (category === 'パンツ') emoji = '👖';", "if (category === 'パンツ') iconName = 'man';")
        content = content.replace("if (category === 'アウター') emoji = '🧥';", "if (category === 'アウター') iconName = 'snow';")
        content = content.replace("if (category === 'アクセサリー') emoji = '🧢';", "if (category === 'アクセサリー') iconName = 'glasses';")

        content = content.replace("<Text style={{fontSize: 40}}>{emoji}</Text>", '<Ionicons name={iconName} size={40} color="#666666" />')
        content = content.replace("<Text style={{fontSize: 32}}>{emoji}</Text>", '<Ionicons name={iconName} size={32} color="#666666" />')


    with open(filepath, 'w') as f:
        f.write(content)

print("Patch applied.")
