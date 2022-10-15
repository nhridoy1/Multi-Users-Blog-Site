const { getStorage } = require('firebase/storage')
const { initializeApp } = require('firebase/app')

// TODO: Replace the following with your app's Firebase project configuration
const {
    STORAGE_BUCKET,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    MESSAGING_SENDER_ID,
    APP_ID
} = process.env

const firebaseConfig = {
    storageBucket: STORAGE_BUCKET,
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app, process.env.BUCKET_URL)

module.exports = storage