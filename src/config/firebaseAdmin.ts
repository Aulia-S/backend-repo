import * as admin from 'firebase-admin'

let serviceAccount: admin.ServiceAccount

if (process.env.NODE_ENV === 'production') {
  serviceAccount = JSON.parse(Buffer.from(process.env.SERVICE_ACCOUNT_KEY || '', 'base64').toString('utf8'))
} else {
  serviceAccount = require('./serviceAccountKey.json')
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

export const verifyIdToken = async (idToken: string) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    return decodedToken
  } catch (error) {
    throw new Error('Token verification failed')
  }
}

export const auth = admin.auth()
