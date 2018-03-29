import Syncano from '@syncano/core'

export default async ctx => {
  const {data, response, logger} = new Syncano(ctx)
  const {error, info} = logger('user-invitation:update')
  const {key, status} = ctx.args

  try {
    const invitation = await data.invitations
      // .fields(MODELS.invitation) - TODO: fields don't work with update
      .where('key', key)
      .update({status})

    info('Sucessfuly updated inviation')
    response.success(invitation)
  } catch (err) {
    error(err)
    response.fail({message: err.response}, 400)
  }
}
