import { Controller } from '@nestjs/common';
import { RecommentService } from './recomment.service';

@Controller('recomment')
export class RecommentController {
  constructor(private readonly recommentService: RecommentService) {}
}
