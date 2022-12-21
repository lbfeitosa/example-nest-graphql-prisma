import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface AccessTokenPayload {
  sub: string;
}

@Injectable()
export class DefaultJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  public constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('x-authorization'),
      ignoreExpiration: true,
      secretOrKey: config.get<string>('SERVICE_SYSTEM_API_KEY'),
    });
  }

  async validate(payload: AccessTokenPayload): Promise<any> {
    return payload;
  }
}
