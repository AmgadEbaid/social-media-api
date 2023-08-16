import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { users } from 'src/users/user.entity';

export const currentUser = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return data ? request.user?.[data] : request.user;
  },
);
{
}
