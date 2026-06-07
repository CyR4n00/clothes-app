export interface ClothingItem {
  id: string;
  name: string;
  imageUrl?: string;
  tags?: string[];
}

export interface CategoryDefinition {
  id: string;
  name: string;
  itemIds: string[];
}

export type Outfit = {
  [categoryId: string]: ClothingItem;
};
