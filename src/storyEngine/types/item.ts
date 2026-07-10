export type Item = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type ItemCatalog = {
  items: Item[];
};
