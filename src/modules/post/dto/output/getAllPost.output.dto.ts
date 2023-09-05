export class GetAllPostOutputDto {
  private post_id: number;
  private post_title: string;
  private post_content: string;
  post_tag: string | string[];
  private post_createdAt: string;
  private post_UserId: number;
  private post_CategoryId: number;
  private commentCount: string;
  private likeCount: string;

  get _post_tag() {
    return this.post_tag;
  }

  set _post_tag(tag: string | string[]) {
    this.post_tag = tag;
  }
}
