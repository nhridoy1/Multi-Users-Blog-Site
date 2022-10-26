const fs = require('fs')

// getting html and placeing the dynamic username, token and admin email to each html page
const getPasswordResetHtml = (link, mymail) => {
  const htmlPath = './email/password-reset.html'

  // using regex to place link and email
  const html = fs.readFileSync(htmlPath, {encoding: 'utf8'})
    .replace(/\${mymail}/g, mymail)
    .replace(/\${link}/g, link)

  return html
}

const getPasswordResetSuccessfulHtml = (mymail) => {
  const htmlPath = './email/reset-successfull.html'

  const html = fs.readFileSync(htmlPath, { encoding: 'utf8'})
    .replace(/\${mymail}/g, mymail)
  return html
}

const accountCreateHtml = (username) => {
  const htmlPath = './email/account-create.html' 

  const html = fs.readFileSync(htmlPath, { encoding: 'utf-8' })
    .replace(/\${username}/g, username )
  return html
}

module.exports = {
    getPasswordResetHtml,
    getPasswordResetSuccessfulHtml,
    accountCreateHtml
}