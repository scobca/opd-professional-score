import { Inject, Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserNotFoundException } from '../exceptions/users/user-not-found.exception';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { DoubleRecordException } from '../exceptions/users/double-record.exception';
import { BcryptUtil } from '../utils/bcrypt.util';
import { Roles } from '../config/enums/roles.enum';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { SetUserRoleDto } from '../dto/user/set-user-role.dto';
import { InvalidEnumSyntaxException } from '../exceptions/validation/invalid-enum-syntax.exception';

@Injectable()
export class UserProvider {
  constructor(@Inject(BcryptUtil) private bcryptUtil: BcryptUtil) {}

  public async getAllUsers(): Promise<User[]> {
    return User.findAll();
  }

  public async getUserById(id: number): Promise<User | null> {
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (user == null) throw new UserNotFoundException(id, 'id');

    return user;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user == null) throw new UserNotFoundException(email, 'email');

    return user;
  }

  public async getUsersByRole(
    role: Roles,
  ): Promise<BasicSuccessfulResponse<User[]> | null> {
    if (!Object.values(Roles).includes(role))
      throw new InvalidEnumSyntaxException('Roles', role);

    const users = await User.findAll({
      where: { role: role },
    });
    return new BasicSuccessfulResponse(users);
  }

  public async createUser(
    data: CreateUserDto,
  ): Promise<BasicSuccessfulResponse<User> | null> {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });
    if (user != null)
      throw new DoubleRecordException(
        `User with email '${data.email}' already exists.`,
      );

    return new BasicSuccessfulResponse(
      await User.create({
        username: data.username,
        email: data.email,
        role: data.role == null ? Roles.USER : data.role,
        password: await this.bcryptUtil.hashPassword(data.password),
        isBanned: data.isBanned == null ? false : data.isBanned,
      }),
    );
  }

  public async updateUser(
    data: UpdateUserDto,
  ): Promise<BasicSuccessfulResponse<User> | null> {
    await this.getUserById(data.id);
    const updatedData: Partial<User> = data.updatedData;

    if (updatedData.email != null) {
      const user = await User.findOne({
        where: { email: updatedData.email },
      });

      if (user != null) {
        throw new DoubleRecordException(
          `User with email '${updatedData.email}' already exists.`,
        );
      }
    }

    await User.update({ ...updatedData }, { where: { id: data.id } });

    const response = {
      message: 'User successfully updated',
      user: await this.getUserById(data.id),
    };
    return new BasicSuccessfulResponse(response);
  }

  public async deleteUser(
    id: number,
  ): Promise<BasicSuccessfulResponse<string>> {
    await this.getUserById(id);
    await User.destroy({
      where: { id: id },
    });

    return new BasicSuccessfulResponse('User deleted successfully');
  }

  public async banUser(id: number): Promise<BasicSuccessfulResponse<string>> {
    await this.getUserById(id);
    await User.update({ isBanned: true }, { where: { id: id } });

    return new BasicSuccessfulResponse('User banned successfully');
  }

  public async unbanUser(id: number): Promise<BasicSuccessfulResponse<string>> {
    await this.getUserById(id);
    await User.update({ isBanned: false }, { where: { id: id } });

    return new BasicSuccessfulResponse('User unbanned successfully');
  }

  public async setUserRole(
    data: SetUserRoleDto,
  ): Promise<BasicSuccessfulResponse<string>> {
    await this.getUserById(data.id);
    if (!Object.values(Roles).includes(data.role))
      throw new InvalidEnumSyntaxException('Roles', data.role);

    await User.update({ role: data.role }, { where: { id: data.id } });

    return new BasicSuccessfulResponse(`User's role updated successfully`);
  }
}
