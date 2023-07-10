export class CategoryListOutputDto {
  private id: number;
  private category: number;

  get _category() {
    return this.category;
  }
}
