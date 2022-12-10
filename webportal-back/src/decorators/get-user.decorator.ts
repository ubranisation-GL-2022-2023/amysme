import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

export const GetUser = createParamDecorator((ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();
  return req.user as User;
});
