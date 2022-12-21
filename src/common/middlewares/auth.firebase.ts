import { UserService } from '@/user/user.service'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { AdminFirebaseService } from '../frameworks/firebase-admin'
import { IRequestUser } from '../interfaces/request'

@Injectable()
export class AuthFirebase implements NestMiddleware {
  constructor(
    readonly userService: UserService,
    readonly firebase: AdminFirebaseService
  ) { }

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const userToken = req.headers.authorization

      if (!userToken) {
        throw new Error('userToken required')
      }

      const decodedToken = await this.firebase.admin
        .auth()
        .verifyIdToken(userToken)

      if (!decodedToken) {
        throw new Error('Invalid Token')
      }

      const requestUser: IRequestUser = {
        id: decodedToken.uid,
        name: decodedToken.name,
        email: decodedToken.email,
        picture: decodedToken.picture,
      }

      const user = this.userService.user({ id: requestUser.id })

      req.user = requestUser

      console.log(`Request...`, user)
      next()
    } catch (err) {
      console.error(err)
      res.status(401).json({
        error: err.message,
      })
    }
  }
}
