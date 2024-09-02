import { match } from 'oxide.ts';

import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserSingInUseCase } from '@usecase/user/user-signin.usecase';
import { UserSingUpUseCase } from '@usecase/user/user-signup.usecase';

import { UserSignInDto } from '@core/domain/user/dto/user-signin.dto';
import { UserSignUpDto } from '@core/domain/user/dto/user-signup.dto';

@Controller({
  path: 'public',
  version: '1',
})
export class PublicV1Controller {
  constructor(
    private userSingUpUseCase: UserSingUpUseCase,
    private userSingInUseCase: UserSingInUseCase,
  ) {}

  @Post('signup')
  async signUp(@Body() userSignUpDto: UserSignUpDto) {
    const result = await this.userSingUpUseCase.exec(userSignUpDto);
    return match(result, {
      Ok(newUser) {
        return {
          success: true,
          message: 'create new user',
          data: newUser,
        };
      },
      Err(msg) {
        throw new BadRequestException(msg);
      },
    });
  }

  @Post('signin')
  async signIn(@Body() userSignInDto: UserSignInDto) {
    const result = await this.userSingInUseCase.exec(userSignInDto);
    return match(result, {
      Ok(currentUser) {
        return {
          success: true,
          message: 'login success',
          data: currentUser,
        };
      },
      Err(msg) {
        throw new BadRequestException(msg);
      },
    });
  }
}
