export class CommentOutputDto {
  private id: number;
  private content: string;

  get _id() {
    return this.id;
  }

  get _content() {
    return this._content;
  }
}
