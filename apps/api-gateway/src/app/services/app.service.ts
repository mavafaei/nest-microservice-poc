import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {

  constructor(
    // @Inject('AUTH_MICROSERVICE') private readonly authClient: ClientProxy,
  ) { }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  // getUser(createUserDto: CreateUserDto) {
  //   return this.authClient.send<User, CreateUserDto>('get_user', createUserDto);
  // }

  // createUser(createUserDto: CreateUserDto) {
  //   return this.authClient.send<User, CreateUserDto>('create_user', createUserDto);
  // }
}
