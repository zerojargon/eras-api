const { MAIL_API_KEY, MAIL_DOMAIN, MAIL_RECIPIENT } = require('./config')
const email = require('mailgun-js')({
  apiKey: MAIL_API_KEY,
  domain: MAIL_DOMAIN
})
const Promise = require('bluebird')

module.exports = {
  send: (sender, subject, text, html) => {
    const data = {
      from: sender,
      to: MAIL_RECIPIENT,
      subject: subject,
      text: text
    }

    return new Promise(function (resolve, reject) {
      email.messages().send(data, function (error, body) {
        if (error) {
          return reject(error)
        }
        return resolve(body)
      })
    })
  }
}
