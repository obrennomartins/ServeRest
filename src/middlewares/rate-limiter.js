/* istanbul ignore file */

const { RateLimiterMemory } = require('rate-limiter-flexible')

const logger = require('../utils/logger')

const rateLimiter = new RateLimiterMemory({
  points: 2, // requests
  duration: 1 // segundo por IP
})

// Adicionar header 'monitor: false' quando atingir o limite definido para não enviar informações para o moesif.
module.exports = async (req, res, next) => {
  console.log('IP:', req.ip);
  await rateLimiter.consume(req.ip)
    .then(() => {
      console.log('>>>>>>>> 1');
      // logger(req, res, next)
      // console.log('>>>>>>> 123');
      next()
    })
    .catch(() => {
      
      console.log('>>>>>>>> 2');
      next('route')
    })
}
