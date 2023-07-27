import { Controller } from '@nestjs/common';
import { RecommentLikeService } from './recomment-like.service';

@Controller('recomment-like')
export class RecommentLikeController {
  constructor(private readonly recommentLikeService: RecommentLikeService) {}
}
