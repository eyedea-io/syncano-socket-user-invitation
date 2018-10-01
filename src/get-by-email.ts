import * as S from '@eyedea/syncano'

interface Args {
  resourceID: number
  resourceType: string
  email: string
}

class Endpoint extends S.Endpoint<Args> {
  async run(
    {data, response}: S.Core,
    {args}: S.Context<Args>
  ) {
    const invitation = await data.invitations
      .where('email', args.email)
      .where('resourceType', args.resourceType)
      .where('resourceID', args.resourceID)
      .first()

    response.json(invitation)
  }

  // Any error thrown in `run` method can be handled using `endpointDidCatch` method
  endpointDidCatch(err: Error) {
    this.syncano.response.json({message: err.message}, 400)
  }
}

export default ctx => new Endpoint(ctx)
