import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }

  // @Post('login')
  // async login(@Body() createUserDto: CreateUserDto) {
  //   const user: User = await lastValueFrom(this.appService.getUser(createUserDto), {
  //     defaultValue: undefined
  //   });
  //   if (!user) {
  //     throw new BadRequestException('Invalid credentials');
  //   }

  //   const isMatch = user.password === createUserDto.password;
  //   if (!isMatch) {
  //     throw new BadRequestException('Incorrect password');
  //   }


  //   return user;
  // }


  // @Post('signup')
  // async signup(@Body() createUserDto: CreateUserDto) {
  //   const user: User = await lastValueFrom(this.appService.getUser(createUserDto), {
  //     defaultValue: undefined,
  //   });
  //   if (user) {
  //     throw new BadRequestException(
  //       `Username ${createUserDto.username} already exists!`
  //     );
  //   }

  //   return this.appService.createUser(createUserDto);
  // }



}

