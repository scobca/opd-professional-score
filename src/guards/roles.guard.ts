import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from '../config/enums/roles.enum';
import { UserDataValuesOutput } from '../IO/user-data-values.output';
import { PermissionDeniedException } from '../exceptions/common/permission-denied.exception';

export class RolesGuard implements CanActivate {
  constructor(@Inject(Reflector) private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<Roles[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) return true;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { user } = context.switchToHttp().getRequest();

    if (user == null) return false;

    if ('dataValues' in user) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const dataValues = user.dataValues as UserDataValuesOutput;

      const userHasRequiredRole = requiredRoles.some((role) =>
        dataValues.role.includes(role),
      );
      if (!userHasRequiredRole) {
        throw new PermissionDeniedException();
      }
      return true;
    }
    return false;
  }
}
