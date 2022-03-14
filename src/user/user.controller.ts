import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Redirect,
} from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import UserSearchDTO from './dtos/user-search.dto';
import UserDTO from './dtos/user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUserById(Number(id));
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: UserDTO) {
    return this.userService.update(id, user);
  }

  @Get()
  getUsers(@Query() params: UserSearchDTO) {
    const { name } = params;

    if (name) {
      return this.userService.getUserByName(name);
    }

    return this.userService.getAll();
  }

  @Get('new')
  getUserV2() {
    return 'Redirected successfully!';
  }

  @Post()
  saveUser(@Body() user: UserDTO) {
    return this.userService.saveUser(user);
  }
}
