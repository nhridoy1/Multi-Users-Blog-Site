const { getStorage } = require('firebase/storage')
const { initializeApp } = require('firebase/app')

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    storageBucket: process.env.STORAGE_BUCKET
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app)

module.exports = storage