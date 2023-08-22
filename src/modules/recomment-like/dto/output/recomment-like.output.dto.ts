export class RecommentLikeOutputDto {
  private id: number;
  private RecommentId: number;
  private UserId: number;

  get _id() {
    return this.id;
  }
}
