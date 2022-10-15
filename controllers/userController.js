const User = require('../models/user')
const storage = require('../config/firebase')
const { ref, uploadBytesResumable, getDownloadURL } = require('firebase/storage')
const {BigPromise} = require('../utils/bigPromise')


exports.signup = BigPromise( async (req, res, next) => {
    const {name, email, password, phoneNumber} = req.body

    const storageRef = ref(storage, `/images/${req.file.photo.filename}`)

    const uploadTask = uploadBytesResumable(storageRef, req.file.photo.data)
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const uploaded = Math.floor(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(uploaded);
        },
        (error) => {
            console.log(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                handleInputState(name, url);
            });
        }
    );

    res.status(200).send('bye')
})