export class ItemDescription {
  brand: string;
  cost: number;
  description: string;
  image: string;
  items_available: number;
  label: string;
  category: string;
  productId: string;
  categoryId: string;
  constructor(inputObj) {
    if (inputObj) {
      this.brand = inputObj.brand;
      this.cost = Number(inputObj.cost);
      this.description = inputObj.description;
      this.image = inputObj.image;
      this.items_available = Number(inputObj.items_available);
      this.label = inputObj.label;
      this.category = inputObj.category;
      this.productId = inputObj.productId;
      this.categoryId = inputObj.categoryId;
    }
  }
}
