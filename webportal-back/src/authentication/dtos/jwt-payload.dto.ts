import { RoleEnum } from 'src/user/enums/role.enum';

export class JwtPayload {
  id: string;
  username: string;
  email: string;
  role: RoleEnum;
}
