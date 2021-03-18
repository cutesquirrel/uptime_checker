const PushOver = require('pushover-notifications')

const config = {
  user: process.env.PUSHOVER_USER_KEY,
  token: process.env.PUSHOVER_APP_TOKEN,
  debug: true,
  sound: process.env.PUSHOVER_SOUND || 'classical',
}
const PUSH_ETIENNE = '@pushover:etienne_device'
//
// https://www.npmjs.com/package/pushover-notifications
//
module.exports = function send(title, message) {
  const p = new PushOver(config)

  var msg = {
    // These values correspond to the parameters detailed on https://pushover.net/api
    // 'message' is required. All other values are optional.
    message, // required
    title,
    sound: config.sound,
    device: PUSH_ETIENNE,
    priority: 1,
  }

  return new Promise((resolve, reject) => {
    try {
      p.send(msg, function (err, result) {
        if (err) {
          console.error(`PushoverNotifier.send: error trying to push a message via pushover, err=${err}`)
          return reject(err)
        }
        console.info(`PushoverNotifier: message pushed ${JSON.stringify(result)} !`)
        resolve(result)
      })
    } catch (err) {
      console.error(`PushoverNotifier.send: error trying to push a message via pushover, err=${err}`)
      return reject(err)
    }
  })
}
