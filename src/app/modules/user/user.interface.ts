import { Role } from '@prisma/client';

export type IResponseUser = {
  id: string;
  username: string;
  email: string;
  role: Role;

};
