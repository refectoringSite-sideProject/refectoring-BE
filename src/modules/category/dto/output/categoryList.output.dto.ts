export class CategoryListOutputDto {
  private category_id: number;
  private category_category: number;

  get _category() {
    return this.category_category;
  }
}
