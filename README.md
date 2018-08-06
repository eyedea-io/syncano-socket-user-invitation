# Syncano Socket for managing inviting user to the resource

[![Syncano Socket](https://img.shields.io/badge/syncano-socket-blue.svg)](https://syncano.io)
[![CircleCI branch](https://img.shields.io/circleci/project/github/eyedea-io/syncano-socket-user-invitation/master.svg)](https://circleci.com/gh/eyedea-io/syncano-socket-user-invitation/tree/master)
[![Codecov branch](https://img.shields.io/codecov/c/github/eyedea-io/syncano-socket-user-invitation/master.svg)](https://codecov.io/gh/eyedea-io/syncano-socket-simple-user-invitation)
[![npm](https://img.shields.io/npm/dw/@eyedea-sockets/user-invitation.svg)](https://www.npmjs.com/package/@eyedea-sockets/user-invitation)
![license](https://img.shields.io/github/license/eyedea-io/syncano-socket-user-invitation.svg)

Main Socket features:

* **user-invitation/invite** — invite user to the resource
* **user-invitation/get** — get user invitation
* **user-invitation/list** — list invitation for a given resource
* **user-invitation/update** — change invitation status

## Getting Started

Install package in your project:

```sh
cd my_project
npm install @syncano/cli --save-dev
npm install @eyedea-sockets/user-invitation --save
npx s deploy
```

Use it:

```js
import Syncano from '@syncano/client'

const s = new Syncano(<instaneName>)

const params = {
    email: 'test@email.com',
    resourceID: '1234',
    resourceType: 'company',
    details: {
      company_id: 1234
    }
  }
const invitation = await s.post('user-invitation/invite', params)
```
