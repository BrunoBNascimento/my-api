import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAll() {
    return this.userRepository.find();
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  getUserByName(name: string) {
    return this.userRepository.find({ name });
  }

  update(id: string, user: any) {
    return this.userRepository.update(id, user);
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }

  saveUser(user: any) {
    const userEntity = this.userRepository.create(user);

    return this.userRepository.save(userEntity);
  }
}
