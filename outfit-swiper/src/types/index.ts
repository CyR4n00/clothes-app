export type Category = 'Outerwear' | 'Tops' | 'Bottoms' | 'Shoes' | 'Accessories';
export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter' | 'All';
export type Style = 'Casual' | 'Formal' | 'Sporty' | 'Lounge';

export interface ClothingItem {
  id: string;
  imageUrl: string;
  category: Category;
  season: Season[];
  style: Style;
  name: string;
}

export interface Setup {
  Outerwear?: ClothingItem;
  Tops?: ClothingItem;
  Bottoms?: ClothingItem;
  Shoes?: ClothingItem;
  Accessories?: ClothingItem;
}

export interface UserSettings {
  macroOrder: Category[];
}
