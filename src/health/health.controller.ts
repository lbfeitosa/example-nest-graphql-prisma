import { Controller, Get, Headers } from '@nestjs/common';
import { Public } from '@/common/decorators/is-public.decorator';
import { memoryUsage } from '@/common/utils/os.utils';

@Controller('health')
export class HealthController {

  @Get()
  @Public()
  async healthCheck(
    @Headers() headers: Headers,
  ) {
    return {
      uptime: process.uptime(),
      message: 'OK',
      mem: memoryUsage(),
      headers,
    }
  }
}
