import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { CreateRecommentInputDto } from "./dto/input/create-recommnet.input.dto";
import { RecommentOutputDto } from "./dto/output/recomment.output.dto";
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

  async getRecommentsByCommentId(
    CommentId: number
  ): Promise<RecommentOutputDto[]> {
    const comment = await this.recommentRepository.findOneCommentById(
      CommentId
    );
    if (!comment) {
      throw new BadRequestException("존재하지 않는 댓글입니다.");
    }

    const result = await this.recommentRepository.getRecommentsByCommentId(
      CommentId
    );
    return plainToInstance(RecommentOutputDto, result);
  }
}
