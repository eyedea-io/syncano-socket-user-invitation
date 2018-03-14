import crypto from 'crypto'
import Syncano from '@syncano/core'
import FormData from 'form-data'
import {MODELS} from './constants'

export default async ctx => {
  const {data, response, logger} = new Syncano(ctx)
  const {warn, error, info} = logger('user-invitation:invite')

  if (!ctx.meta.user) {
    warn('Unauthorized request.')
    return response.json({message: 'Unauthorized.'}, 401)
  }

  try {
    const form = getForm(ctx)
    const invitation = await data
      .invitations
      .fields(MODELS.invitation)
      .create(form)

    info('Sucessfuly created inviation')
    response.success(invitation)
  } catch (err) {
    error(err)
    response.fail({message: err.response}, 400)
  }
}

function getForm (ctx) {
  const form = new FormData()

  form.append('details', ctx.args.details)
  form.append('email', ctx.args.email)
  form.append('key', crypto.randomBytes(16).toString('hex'))
  form.append('resource_id', ctx.args.resource_id)
  form.append('resource_type', ctx.args.resource_type)

  return form
}
