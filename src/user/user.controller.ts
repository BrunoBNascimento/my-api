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
import { UserService } from './user.service';

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
  updateUser(@Param('id') id: string, @Body() user: any) {
    return this.userService.update(id, user);
  }

  @Get()
  getUsers(@Query('name') name: string) {
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
  saveUser(@Body() user) {
    return this.userService.saveUser(user);
  }
}
