import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserProvider } from '../providers/user.provider';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { BasicSuccessfulResponse } from '../IO/basic-successful-response';
import { SetUserRoleDto } from '../dto/user/set-user-role.dto';
import { Roles } from '../config/enums/roles.enum';
import { SuccessAuthResponseDto } from '../dto/auth/success-auth-response.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

@Controller('/user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(@Inject(UserProvider) private userProvider: UserProvider) {}

  @Get('/getAll')
  public async getAllUsers(): Promise<BasicSuccessfulResponse<User[]>> {
    const users: User[] = await this.userProvider.getAllUsers();
    return new BasicSuccessfulResponse<User[]>(users);
  }

  @Get('/getUserById')
  public async getUserById(
    @Body() data: { id: number },
  ): Promise<BasicSuccessfulResponse<User> | null> {
    const user = await this.userProvider.getUserById(data.id);
    return new BasicSuccessfulResponse(user);
  }

  @Get('/getUserByEmail')
  public async getUserByEmail(
    @Body() data: { email: string },
  ): Promise<BasicSuccessfulResponse<User> | null> {
    const user = await this.userProvider.getUserByEmail(data.email);
    return new BasicSuccessfulResponse(user);
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
}
