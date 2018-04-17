export class ItemsListItem {
  cost: number;
  image: string;
  label: string;
  color: string;
  category: string;
  categoryId: string;
  productId: string;
  constructor(inputObj) {
    if (inputObj) {
      this.cost = Number(inputObj.cost);
      this.image = inputObj.image;
      this.label = inputObj.label;
      this.color = inputObj.color;
      this.category = inputObj.category;
      this.categoryId = inputObj.categoryId;
      this.productId = inputObj.productId;
    }
  }
}
