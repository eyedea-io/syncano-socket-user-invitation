import crypto from 'crypto'
import Syncano from '@syncano/core'
import {MODELS} from './constants'

export default async ctx => {
  const {data, response, logger} = new Syncano(ctx)
  const {warn, error, info} = logger('user-invitation:invite')

  if (!ctx.meta.user) {
    warn('Unauthorized request.')
    return response.json({message: 'Unauthorized.'}, 401)
  }

  try {
    const invitation = await data
      .invitations
      .fields(MODELS.invitation)
      .create({
        details: ctx.args.details,
        email: ctx.args.email,
        key: crypto.randomBytes(16).toString('hex'),
        resource_id: ctx.args.resource_id,
        resource_type: ctx.args.resource_type
      })

    info('Sucessfuly created inviation')
    response.success(invitation)
  } catch (err) {
    error(err)
    response.fail({message: err.response}, 400)
  }
}
