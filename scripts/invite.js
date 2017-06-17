import crypto from 'crypto'
import { data, response, logger } from 'syncano-server'


const { debug } = logger('user-invitation-invite')
const { email, resource_id, resource_type, details } = ARGS
const key = crypto.randomBytes(16).toString('hex')

data.invitations.create({
  key,
  email,
  resource_id,
  resource_type,
  details,
})
.then(invitation => {
  debug(invitation)
  response.json({key})
})
.catch(err => {
  console.log(err)
  err.response.text()
    .then(resp => {
      console.log(resp)
    })
})
