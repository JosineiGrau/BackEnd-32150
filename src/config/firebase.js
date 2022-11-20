import admin from 'firebase-admin'
import { config } from './config.js';
admin.initializeApp({
	credential: admin.credential.cert(config.firebase),
	databaseURL: "https://backendCoder.firebaseio.com"
});
export const db = admin.firestore()