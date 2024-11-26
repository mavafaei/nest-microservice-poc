import { Injectable } from '@nestjs/common';

import { CreateUserDto, User } from '@nestjs-microservices/shared';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  createUser(newUser: CreateUserDto): Promise<User> {
    return this.userRepository.save(newUser);
  }

  async getUser(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { username } });
    return user ?? undefined;
  }
}