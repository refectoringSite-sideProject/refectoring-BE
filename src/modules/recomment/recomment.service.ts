import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateRecommentInputDto } from "./dto/input/create-recommnet.input.dto";
import { IRecommentRepository } from "./recomment.IRepository";

@Injectable()
export class RecommentService {
  constructor(
    @Inject(IRecommentRepository)
    private readonly recommentRepository: IRecommentRepository
  ) {}

  async createRecomment(
    CommentId: number,
    body: CreateRecommentInputDto,
    UserId: number
  ): Promise<void> {
    const comment = await this.recommentRepository.findOneCommentById(
      CommentId
    );
    if (!comment) {
      throw new BadRequestException("존재하지 않는 댓글입니다.");
    }
    await this.recommentRepository.createRecomment(CommentId, body, UserId);
    return;
  }
}
