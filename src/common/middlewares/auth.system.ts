import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class AuthSystem implements NestMiddleware {
  private secret: string
  constructor(readonly config: ConfigService, readonly jwt: JwtService) {
    this.secret = config.get('SERVICE_SYSTEM_API_KEY')
  }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const systemToken = req.headers.authorization

      if (!systemToken) {
        throw new ForbiddenException('systemToken required')
      }

      await this.jwt.verifyAsync(systemToken, {
        secret: this.secret,
      })

      next()
    } catch (err) {
      throw new ForbiddenException('Invalid Token')
    }
  }
}
