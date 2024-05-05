import { CurrentUser } from './../decorators/current-user.decorator';
import {
  NestInterceptor,
  CallHandler,
  Injectable,
  ExecutionContext,
} from '@nestjs/common';

import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    console.log(userId);
    if (userId) {
      const user = await this.usersService.findOne(userId);
      request.currentUser = user;
      console.log(user);
    }

    return handler.handle();
  }
}
