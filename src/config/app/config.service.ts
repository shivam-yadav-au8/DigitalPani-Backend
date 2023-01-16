import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get name(): string {
    return this.configService.get<string>('app.name');
  }
  get env(): string {
    return this.configService.get<string>('app.env');
  }
  get url(): string {
    return this.configService.get<string>('app.url');
  }
  get redis_host(): string {
    return this.configService.get<string>('redis_host');
  }
  get redis_port(): string {
    return this.configService.get<string>('redis_port');
  }
  get port(): number {
    return Number(this.configService.get<number>('app.port'));
  }
}
