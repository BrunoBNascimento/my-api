import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    this.logger.debug('Serviço executado dentro de 5 segundo');
    const userEntity = this.userRepository.create({
      name: Math.random().toString(36),
    });

    this.userRepository.save(userEntity);
  }
}
