const { initializeApp } = require("firebase/app")
const { getStorage } = require("firebase/storage")
const {ref, uploadBytesResumable, getDownloadURL} = require('firebase/storage')
const fileRename = require('../utils/fileRename')

const {
    BUCKET_URL,
    API_KEY,
    AUTH_DOMAIN,
    PROJECT_ID,
    APP_ID,
    MESSAGING_SENDER_ID,
    MEASUREMENT_ID
} = process.env

const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: BUCKET_URL,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)


// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app, 'gs://my-web-blog-8e9e0.appspot.com')

const fileUpload = async (file) => {
    const finalName = fileRename(file.originalname)

    const storageRef = ref(storage, `userPhoto/${finalName}`)

    await uploadBytesResumable(storageRef, file.buffer)

    // gettting the photo url 
    return getDownloadURL(storageRef)
}

module.exports = fileUpload