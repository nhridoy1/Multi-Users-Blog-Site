const nodemailer = require('nodemailer')
const {
    getPasswordResetHtml,
    getPasswordResetSuccessfulHtml,
    accountCreateHtml
} = require('./email-template')

const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD
} = process.env

// configuring email SMTP key
const emailKeySet = () => {
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: false,
        auth: {
            user: SMTP_USERNAME, 
            pass: SMTP_PASSWORD,
        },
    })

    return transporter
}

// extract transporter so that it can be called by other function
const sendMail = async (recipient , subject, html) => {
    const transporter = emailKeySet()

    // send mail with defined transport object
    await transporter.sendMail({
        from: SMTP_USERNAME,
        to: recipient,
        subject,
        html
    })
}


const sendPasswordResetEmail = (token, email, recipient) => {
    // get html file for reset
    const html = getPasswordResetHtml(token, email)

    sendMail(recipient, "Reset Your Password", html)
}

const sendPasswordResetSuccessfulEmail = (email, recipient) => {
    // get html file for success
    const html = getPasswordResetSuccessfulHtml(email)

    sendMail(recipient, "You have successfully reset your password", html)
}

const sendAccountCreatedEmail = (username, recipient) => {
    // get html file for signup
    const html = accountCreateHtml(username)

    sendMail(recipient, "You have successfully Created Your Account", html)
}

module.exports = {
    sendPasswordResetEmail,
    sendPasswordResetSuccessfulEmail,
    sendAccountCreatedEmail
}