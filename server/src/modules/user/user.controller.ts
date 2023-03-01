import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  async getUser() {
    return {
      code: 200,
      message: '成功',
    };
  }
}
