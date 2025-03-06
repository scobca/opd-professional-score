import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserProvider } from '../providers/user.provider';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { SetUserRoleDto } from '../dto/user/set-user-role.dto';
import { Roles } from '../config/enums/roles.enum';
import { SuccessAuthResponseDto } from '../dto/auth/success-auth-response.dto';
import { ChangePassFirstStepDto } from '../dto/user/change-pass-first-step.dto';
import { ChangePassSecondStepDto } from '../dto/user/change-pass-second-step.dto';

@Controller('/user')
export class UserController {
  constructor(@Inject(UserProvider) private userProvider: UserProvider) {}

  @Get('/getAll')
  public async getAllUsers(): Promise<BasicSuccessfulResponse<User[]>> {
    const users: User[] = await this.userProvider.getAllUsers();
    return new BasicSuccessfulResponse<User[]>(users);
  }

  @Get('getAllUsersAdmin')
  public async getAllUsersAdmin(): Promise<BasicSuccessfulResponse<User[]>> {
    const users = await this.userProvider.getAllUsers();
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }));
  }

  @Get('/getUserById/:id')
  public async getUserById(
    @Param('id') id: number,
  ): Promise<BasicSuccessfulResponse<User> | null> {
    const user = await this.userProvider.getUserById(id);
    return new BasicSuccessfulResponse(user);
  }

  @Get('/getUserByEmail/:email')
  public async getUserByEmail(
    @Param('email') email: string,
  ): Promise<BasicSuccessfulResponse<User> | null> {
    const user = await this.userProvider.getUserByEmail(email);
    return new BasicSuccessfulResponse(user);
  }

  @Get('/getUsersByRole/:role')
  public async getUsersByRole(
    @Param('role') role: Roles,
  ): Promise<BasicSuccessfulResponse<User[]> | null> {
    return await this.userProvider.getUsersByRole(role);
  }

  @Post('/create')
  public async createUser(
    @Body() data: CreateUserDto,
  ): Promise<BasicSuccessfulResponse<SuccessAuthResponseDto>> {
    return await this.userProvider.createUser(data);
  }

  @Patch('/update')
  public async updateUser(
    @Body() data: UpdateUserDto,
  ): Promise<BasicSuccessfulResponse<User> | null> {
    return await this.userProvider.updateUser(data);
  }

  @Delete('/delete')
  public async deleteUser(
    @Body() data: { id: number },
  ): Promise<BasicSuccessfulResponse<string>> {
    return await this.userProvider.deleteUser(data.id);
  }

  @Patch('/banUser')
  public async banUser(
    @Body() data: { id: number },
  ): Promise<BasicSuccessfulResponse<string>> {
    return await this.userProvider.banUser(data.id);
  }

  @Patch('/unbanUser')
  public async unbanUser(
    @Body() data: { id: number },
  ): Promise<BasicSuccessfulResponse<string>> {
    return await this.userProvider.unbanUser(data.id);
  }

  @Patch('setRole')
  public async setRole(
    @Body() data: SetUserRoleDto,
  ): Promise<BasicSuccessfulResponse<string>> {
    return await this.userProvider.setUserRole(data);
  }

  @Post('/changePasswordFirstStep')
  public async changePasswordFirstStep(@Body() data: ChangePassFirstStepDto) {
    return await this.userProvider.changePasswordFirstStep(data);
  }

  @Patch('/changePasswordSecondStep')
  public async changePasswordSecondStep(@Body() data: ChangePassSecondStepDto) {
    return await this.userProvider.changePasswordSecondStep(data);
  }
}
