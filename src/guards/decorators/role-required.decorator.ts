import { Roles } from '../../config/enums/roles.enum';
import { SetMetadata } from '@nestjs/common';

export const RoleRequired = (...roles: Roles[]) => SetMetadata('roles', roles);
