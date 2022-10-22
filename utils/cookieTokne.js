const { BigPromise } = require('../utils/bigPromise')


const cookieToken = BigPromise(async (res, user, code) => {
    const token = await user.getJwtToken()

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRY * 60 * 60 * 24 * 1000
        ),
        httpOnly: true
    }

    user.password = undefined
    res.status(code).cookie('token', token, options).json({ success: true, user})
})

module.exports = cookieToken