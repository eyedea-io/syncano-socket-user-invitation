import crypto from 'crypto'
import Syncano from '@syncano/core'
import {MODELS} from './constants'

export default async ctx => {
  const {data, response, logger} = new Syncano(ctx)
  const {error, info} = logger('user-invitation:invite')

  try {
    const invitation = await data
      .invitations
      .fields(MODELS.invitation)
      .create({
        details: ctx.args.details,
        email: ctx.args.email,
        key: crypto.randomBytes(16).toString('hex'),
        resource_id: ctx.args.resource_id,
        resource_type: ctx.args.resource_type,
        status: 'pending'
      })

    info('Sucessfuly created invitation')
    response.success(invitation)
  } catch (err) {
    error(err)
    response.fail({message: err.response}, 400)
  }
}
