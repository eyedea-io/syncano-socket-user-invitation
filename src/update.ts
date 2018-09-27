import * as S from '@eyedea/syncano'

interface Args {
  key: string
  status: string
}

class Endpoint extends S.Endpoint<Args> {
  counties: object
  async run(
    {response, data}: S.Core,
    {args}: S.Context<Args>
  ) {
    const invitation = await data.invitations
      // .fields(MODELS.invitation) - TODO: fields don't work with update
      .where('key', args.key)
      .update({status: args.status})

    this.logger.info('Sucessfuly updated inviation')
    response.success(invitation)
  }

  // Any error thrown in `run` method can be handled using `endpointDidCatch` method
  endpointDidCatch(err: Error) {
    this.syncano.response.json({message: err.message}, 400)
  }
}

export default ctx => new Endpoint(ctx)
