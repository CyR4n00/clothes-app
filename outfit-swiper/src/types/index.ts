export type Part = 'アウター' | 'トップス' | 'パンツ' | 'シューズ' | 'アクセサリー';

export interface ClothingItem {
  id: string;
  name: string;
  part: Part;
  imageUrl?: string;
  tags?: string[];
}

export interface Collection {
  id: string;
  name: string;
  itemIds: string[];
  isDefault?: boolean; // For Spring, Summer, Fall, Winter
}

export type Outfit = {
  [part in Part]?: ClothingItem;
};
