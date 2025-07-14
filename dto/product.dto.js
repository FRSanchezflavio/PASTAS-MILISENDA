export class ProductDTO {
  constructor(product) {
    this.id = product._id;
    this.name = product.name;
    this.description = product.description;
    this.category = product.category;
    this.price = product.price;
    this.stock = product.stock;
  }
}

export class ProductSummaryDTO {
  constructor(product) {
    this.id = product._id;
    this.name = product.name;
    this.price = product.price;
    this.stock = product.stock;
  }
}
