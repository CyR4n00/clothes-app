export type Category = 'アウター' | 'トップス' | 'パンツ' | 'シューズ' | 'アクセサリー';

export interface ClothingItem {
  id: string;
  name: string;
  category: Category;
  imageUrl?: string;
  season: string;
  style: string;
}

export type Outfit = {
  [key in Category]?: ClothingItem;
};