'use strict'
const root = require( 'app-root-path' )
const { validateServerRole, validateScopes, authorizeResolver } = require( `${root}/modules/shared` )
const { updateServerInfo, getServerInfo, getAvailableScopes, getAvailableRoles } = require( '../../services/generic' )

module.exports = {
  Query: {
    async serverInfo( parent, args, context, info ) {
      return await getServerInfo( )
    }
  },
  ServerInfo: {
    async roles( parent, args, context, info ) {
      return await getAvailableRoles( )
    },
    async scopes( parent, args, context, info ) {
      return await getAvailableScopes( )
    }
  },
  Mutation: {
    async serverInfoUpdate( parent, args, context, info ) {
      await validateServerRole( context, 'server:user' )
      await validateScopes( context.scopes, 'server:setup' )

      await updateServerInfo( args.info )

      return true
    }
  }
}