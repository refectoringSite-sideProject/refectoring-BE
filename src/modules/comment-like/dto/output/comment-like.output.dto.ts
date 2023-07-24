export class CommentLikeOutputDto {
  private id: number;
  private CommentId: number;
  private UserId: number;

  get _id() {
    return this.id;
  }
}
