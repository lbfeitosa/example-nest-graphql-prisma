import { Injectable } from '@nestjs/common'
import admin from 'firebase-admin'

@Injectable()
export class AdminFirebaseService {

  public admin: admin.app.App;

  constructor() {
    const fbConfig = process.env.FIRESTORE_EMULATOR_HOST
      ? {
        projectId: 'moises-dev-emulator',
        credential: admin.credential.applicationDefault(),
      }
      : undefined

    this.admin = admin.initializeApp(fbConfig)
    console.log('Firebase initiliazed', fbConfig)
  }
}