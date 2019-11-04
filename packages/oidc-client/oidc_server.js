OIDC = {}

Accounts.oauth.registerService('oidc')

OAuth.registerService('oidc', 2, null, function (query) {
  var getTokens = getAccessToken(query)
  return {
    serviceData: OIDC.serviceData({'OIDCCredentials': getTokens}),
    options: { profile: {} }
  }
})

Accounts.addAutopublishFields({
  forLoggedInUser: ['services.oidc']
})

var getAccessToken = function (query) {
  var config = ServiceConfiguration.configurations.findOne({ service: 'oidc' })
  if (!config) {
    throw new ServiceConfiguration.ConfigError()
  }

  var response
  try {
    response = HTTP.post(config.tokenEndpoint, {
      params: {
        code: query.code,
        client_id: config.clientId,
        client_secret: OAuth.openSecret(config.secret),
        grant_type: 'authorization_code',
        redirect_uri: OAuth._redirectUri('oidc', config),
        state: query.state
      }
    })
  } catch (err) {
    throw _.extend(new Error('Failed to complete OpenID Connect handshake with your provider. ' + err.message), { response: err.response })
  }

  if (response.data.error) {
    throw new Error('Failed to complete OpenID Connect handshake with your provider. ' + response.data.error)
  } else {
    return response.data
  }
}

OIDC.getRefreshToken = function (refreshToken) {
  var config = ServiceConfiguration.configurations.findOne({ service: 'oidc' })
  if (!config) {
    throw new ServiceConfiguration.ConfigError()
  }

  if (!refreshToken) {
    throw new Error('Invalid refresh_token')
  }

  var response
  try {
    response = HTTP.post(config.tokenEndpoint, {
      params: {
        client_id: config.clientId,
        client_secret: OAuth.openSecret(config.secret),
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      }
    })
  } catch (err) {
    throw _.extend(new Error('Failed to complete OpenID Connect handshake with your provider. ' + err.message), { response: err.response })
  }

  if (response.data.error) {
    throw new Error('Failed to complete OpenID Connect handshake with your provider. ' + response.data.error)
  } else {
    return response.data
  }
}

var getIdentity = function (accessToken) {
  var config = ServiceConfiguration.configurations.findOne({ service: 'oidc' })
  if (!config) {
    throw new ServiceConfiguration.ConfigError()
  }

  try {
    var response = HTTP.get(config.userinfoEndpoint, {
      params: {
        access_token: accessToken
      }
    })
    return response.data
  } catch (err) {
    throw _.extend(new Error('Failed to fetch identity from your provider. ' + err.message), { response: err.response })
  }
}

OIDC.retrieveCredential = function (credentialToken, credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret)
}

OIDC.serviceData = function (obj) {
  let identity = obj.identity

  if (!identity) {
    identity = getIdentity(obj.OIDCCredentials.access_token)
  }

  let userServiceData = identity
  userServiceData.id = identity.sub
  userServiceData.credentials = obj.OIDCCredentials

  return userServiceData
}
