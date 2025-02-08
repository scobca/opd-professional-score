import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
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

@Controller('/user')
export class UserController {
  constructor(@Inject(UserProvider) private userProvider: UserProvider) {}

  @Get('/getAll')
  public async getAllUsers(): Promise<User[]> {
    return await this.userProvider.getAllUsers();
  }

  @Get('/getUserById')
  public async getUserById(@Body() data: { id: number }): Promise<User | null> {
    return await this.userProvider.getUserById(data.id);
  }

  @Get('/getUserByEmail')
  public async getUserByEmail(
    @Body() data: { email: string },
  ): Promise<User | null> {
    return await this.userProvider.getUserByEmail(data.email);
  }

  @Get('/getUsersByRole')
  public async getUsersByRole(
    @Body() data: { role: Roles },
  ): Promise<BasicSuccessfulResponse<User[]> | null> {
    return await this.userProvider.getUsersByRole(data.role);
  }

  @Post('/create')
  public async createUser(
    @Body() data: CreateUserDto,
  ): Promise<BasicSuccessfulResponse<User> | null> {
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
}
