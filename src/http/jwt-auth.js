import map from 'lodash/map'

// fork from https://github.com/websanova/vue-jwt-auth
module.exports = (function () {
  let _tokenRefreshTimeout = null

  let localStorage = window.localStorage

  // Default
  function _beforeEach (transition) {
    let auth = _toArray(transition.to.auth)

    if (auth && (auth === true || auth.constructor === Array)) {
      if (!this.check()) {
        this.$router.replace(this.getOption('authRedirect'))
      } else if (auth.constructor === Array && !_compare(auth, this.roleNames())) {
        this.$router.replace(this.getOption('forbiddenRedirect'))
      } else {
        return transition.next()
      }
    } else if (auth === false && this.check()) {
      this.$router.replace(this.getOption('notFoundRedirect'))
    } else {
      return transition.next()
    }
  }

  function _userData (res) {
    res = res.json()

    return res.data || res
  }

  function _cookieDomain () {
    return window.location.hostname
  }

  function _invalidToken (res) {
    if (res.status === 401) {
      this.logout(this.getOption('logoutRedirect'))
    }
  }

  // Utils
  function _getUrl () {
    let port = window.location.port

    return window.location.protocol + '//' + window.location.hostname + (port ? ':' + port : '')
  }

  function _compare (one, two) {
    let i
    let ii

    one = _toArray(one)
    two = _toArray(two)

    if (one.constructor !== Array || two.constructor !== Array) {
      return false
    }

    for (i = 0, ii = one.length; i < ii; i++) {
      if (two.indexOf(one[i]) >= 0) {
        return true
      }
    }

    return false
  }

  function _toArray (val) {
    return (typeof val) === 'string' ? [val] : val
  }

  function _http (options) {
    // Version 0.8.0
    this.$http[options.method || 'get'](options.url, options.data)
      .then(options.success, options.error)
  }

  function _interceptor (Vue, req, res) {
    // Version 0.8.0
    Vue.http.interceptors.push((request, next) => {
      if (req) {
        req.call(this, request)
      }

      next((response) => {
        if (res) {
          res.call(this, response)
        }
      })
    })
  }

  // Remember Me
  function _setCookie (name, value, timeOffset) {
    let domain = this.getOption('cookieDomain').call(this)
    let expires = (new Date((new Date()).getTime() + timeOffset)).toUTCString()

    document.cookie = (name + '=' + value + '; domain=' + domain + '; path=/;' + (timeOffset ? ' expires=' + expires + ';' : ''))
  }

  function _setRememberMeCookie (rememberMe) {
    _setCookie.call(this,
      'rememberMe',
      rememberMe === true ? 'true' : 'false',
      rememberMe === true ? 12096e5 : undefined
    )
  }

  function _removeRememberMeCookie () {
    _setCookie.call(this, 'rememberMe', 'false', -12096e5)
  }

  // Token

  function _setToken (token) {
    if (token) {
      localStorage.setItem((this.other() ? 'login-as-' : '') + this.getOption('tokenName'), token)
    }
  }

  function _getToken () {
    return localStorage.getItem((this.other() ? 'login-as-' : '') + this.getOption('tokenName'))
  }

  function _removeToken () {
    localStorage.removeItem((this.other() ? 'login-as-' : '') + this.getOption('tokenName'))
  }

  function _refreshToken (cb) {
    cb = cb || function () {}

    let _this = this

    if (_getToken.call(this) && this.getOption('tokenType') === 'jwt') {
      _http.call(this, {
        url: this.getOption('tokenUrl'),
        method: 'get',
        success: (res) => {
          _setToken.call(this, res.json()[this.getOption('tokenVar')])

          let tokenJSON = _decodeToken(_getToken.call(_this))
          let expireTime = _getTokenExpirationDate(tokenJSON).valueOf()
          let nowTime = new Date().valueOf()
          let offsetTime = this.getOption('tokenTimeoutOffset')
          let timeout = expireTime - nowTime - offsetTime

          clearTimeout(_tokenRefreshTimeout)

          _tokenRefreshTimeout = setTimeout(function () {
            _refreshToken.call(_this)
          }, timeout)

          return cb()
        },
        error: (res) => {
          return cb()
        }
      })
    } else {
      return cb()
    }
  }

  // Token util

  function _urlBase64Decode (str) {
    let output = str.replace(/-/g, '+').replace(/_/g, '/')

    switch (output.length % 4) {
      case 0: { break }
      case 2: { output += '=='; break }
      case 3: { output += '='; break }
      default: {
        console.log('Illegal base64url string!')
      }
    }

    // polifyll https://github.com/davidchambers/Base64.js
    return decodeURIComponent(escape(window.atob(output)))
  }

  function _decodeToken (token) {
    if (!token) {
      return
    }

    let parts = token.split('.')

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts')
    }

    let decoded = _urlBase64Decode(parts[1])

    if (!decoded) {
      throw new Error('Cannot decode the token')
    }

    return JSON.parse(decoded)
  }

  function _getTokenExpirationDate (tokenJSON) {
    if (!tokenJSON || !tokenJSON.exp) {
      return
    }

    let d = new Date(0) // The 0 here is the key, which sets the date to the epoch

    d.setUTCSeconds(tokenJSON.exp)

    return d
  }

  // Router
  function _setRoute (route, router) {
    this.$route = route
    this.$router = router
  }

  // Auth
  function _login (path, data, rememberMe, redirectUrl, options) {
    options = options || {}

    _http.call(this, {
      url: path,
      method: 'post',
      data: data,
      success: (res) => {
        let _this = this

        _setRememberMeCookie.call(this, rememberMe)

        _setToken.call(this, res.json()[this.getOption('tokenVar')])

        this.authenticated = null

        this.fetch(function () {
          if (options.success) {
            options.success.call(_this, res)
          }

          if (redirectUrl && _this.check()) {
            _this.$router.go(redirectUrl)
          }
        })
      },
      error: (res) => {
        if (options.error) {
          options.error.call(this, res)
        }
      }
    })
  }

  function _oauth2 (type, data, rememberMe, redirectUrl, options) {
    let state
    let params = ''

    data = data || {}

    if (data.code) {
      try {
        state = JSON.parse(decodeURIComponent(this.$route.query.state))
      } catch (e) {
        console.error('vue-jwt-auth:error There was an issue retrieving the state data.')
        state = {}
      }

      _login.call(this, this.getOption(type + 'Url'), data, state.rememberMe, state.redirect, options)
    } else {
      data.state = data.state || {}
      data.state.rememberMe = rememberMe === true
      data.state.redirect = redirectUrl || ''

      data.appId = data.appId || this.getOption(type + 'AppId')
      data.clientId = data.clientId || this.getOption(type + 'ClientId')
      data.scope = data.scope || this.getOption(type + 'Scope')
      data.redirect = data.redirect || this.getOption(type + 'Redirect')
      data.url = data.url || this.getOption(type + 'OAuth2')

      params = '?client_id=' + data.appId + '&redirect_uri=' + data.redirect + '&scope=' + data.scope + '&response_type=code&state=' + encodeURIComponent(JSON.stringify(data.state))

      window.location = data.url + params
    }
  }

  function _fetch (cb) {
    cb = cb || function () {}

    _http.call(this, {
      url: this.getOption('fetchUrl'),
      method: 'get',
      success: (res) => {
        this.authenticated = true
        this.data = this.getOption('userData').call(this, res)
        this.loaded = true

        return cb()
      },
      error: () => {
        this.loaded = true

        return cb()
      }
    })
  }

  // Plugin
  let Auth = {
    options: {
      authType: 'bearer',
      tokenType: 'jwt',

      fetchUrl: 'auth/user',
      tokenUrl: 'auth/token',
      loginUrl: 'auth/login',
      loginAsUrl: 'auth/login-as',

      authRedirect: '/login',
      logoutRedirect: '/',
      notFoundRedirect: '/404',
      forbiddenRedirect: '/403',

      rolesVar: 'roles',
      tokenVar: 'token',
      tokenName: 'jwt-auth-token',
      tokenTimeoutOffset: 5 * 1000, // 5 minutes.

      cookieDomain: _cookieDomain,
      userData: _userData,
      beforeEach: _beforeEach,
      invalidToken: _invalidToken,

      facebookUrl: 'auth/facebook',
      facebookAppId: '',
      facebookScope: 'email',
      facebookRedirect: _getUrl() + '/login/facebook',
      facebookOAuth2: 'https://www.facebook.com/v2.5/dialog/oauth',

      googleUrl: 'auth/google',
      googleAppId: '',
      googleScope: 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read',
      googleRedirect: _getUrl() + '/login/google',
      googleOAuth2: 'https://accounts.google.com/o/oauth2/auth',

      bufferUrl: 'auth/buffer',
      bufferAppId: '',
      bufferScope: '',
      bufferRedirect: _getUrl() + '/login/buffer',
      bufferOAuth2: 'https://bufferapp.com/oauth2/authorize'
    },

    data () {
      return {
        data: null,
        loaded: false,
        authenticated: null
      }
    },

    methods: {
      // Options
      getOption (key) {
        return this.$options.options[key]
      },

      setOptions (options) {
        for (let i in options) {
          this.$options.options[i] = options[i]
        }
      },

      // Login / Logout
      login (data, rememberMe, redirectUrl, options) {
        _login.call(this, this.getOption('loginUrl'), data, rememberMe, redirectUrl, options)
      },

      oauth2 (type, data, rememberMe, redirectUrl, options) {
        _oauth2.call(this, type, data, rememberMe, redirectUrl, options)
      },

      // Deprecated
      facebook (data, rememberMe, redirectUrl, options) {
        _oauth2.call(this, 'facebook', data, rememberMe, redirectUrl, options)
      },

      // Deprecated
      google (data, rememberMe, redirectUrl, options) {
        _oauth2.call(this, 'google', data, rememberMe, redirectUrl, options)
      },

      logout (redirectUrl, force) {
        _removeRememberMeCookie.call(this)

        // Need to call twice to remove both tokens.
        _removeToken.call(this)
        _removeToken.call(this)

        this.authenticated = false
        this.data = null

        if (redirectUrl && (this.$route.auth || force)) {
          this.$router.go(redirectUrl)
        }
      },

      roles () {
        return this.data[this.getOption('rolesVar')].data
      },

      roleNames () {
        return map(this.roles(), 'name')
      },

      // User
      check (role) {
        if (this.data !== null) {
          if (role) {
            return _compare(role, this.roleNames())
          }

          return true
        }

        return false
      },

      fetch (cb) {
        cb = cb || function () {}

        if (!this.loaded) {
          _refreshToken.call(this, () => {
            this.setLoadedAsTrue(cb)
          })
        } else {
          this.setLoadedAsTrue(cb)
        }
      },

      setLoadedAsTrue (cb) {
        if (this.authenticated === null && _getToken.call(this)) {
          if (!document.cookie.match(/rememberMe/)) {
            _removeToken.call(this)

            this.loaded = true

            return cb()
          }

          this.authenticated = false

          _fetch.call(this, cb)
        } else {
          this.loaded = true

          return cb()
        }
      },

      user (data) {
        if (data) {
          this.data = data
        }

        return this.data
      },

      ready () {
        return this.loaded
      },

      // Login As
      loginAs (data, redirectUrl, options) {
        options = options || {}

        _http.call(this, {
          url: this.getOption('loginAsUrl'),
          method: 'post',
          data: data,
          success: (res) => {
            let _this = this

            localStorage.setItem('login-as-' + this.getOption('tokenName'), res.json()[this.getOption('tokenVar')])

            _fetch.call(this, function () {
              if (options.success) {
                options.success.call(this, res)
              }

              if (redirectUrl && _this.check()) {
                _this.$router.go(redirectUrl)
              }
            })
          },
          error: (res) => {
            if (options.error) {
              options.error.call(this, res)
            }
          }
        })
      },

      logoutAs (redirectUrl) {
        let _this = this

        localStorage.removeItem('login-as-' + this.getOption('tokenName'))

        _fetch.call(this, function () {
          if (redirectUrl) {
            _this.$router.go(redirectUrl)
          }
        })
      },

      other () {
        this.data // TODO: Strange thing, need this to make the check fire consistently ??

        return localStorage.getItem('login-as-' + this.getOption('tokenName'))
      },

      // Token
      getAuthHeader () {
        let token = _getToken.call(this)

        if (token && this.getOption('authType') === 'bearer') {
          return 'Bearer: ' + token
        }

        return false
      },

      version () {
        return '0.10.4'
      }
    }
  }

  return function install (Vue, options, router) {
    let auth = new Vue(Auth)

    auth.setOptions(options || {})

    Object.defineProperties(Vue.prototype, {
      $auth: {
        get () {
          _setRoute.call(auth, this.$route, this.$router)

          return auth
        }
      }
    })

    // Setup before each route change check.
    router.beforeEach(function (transition) {
      // Make sure to use $auth.fetch so context is loaded.
      transition.to.router.app.$auth.fetch(function () {
        auth.getOption('beforeEach').bind(auth)(transition)
      })
    })

    // Set interceptors.
    _interceptor(Vue, (req) => {
      let token = _getToken.call(auth)

      if (token && auth.getOption('authType') === 'bearer') {
        req.headers.Authorization = 'Bearer: ' + token
      }
    }, (res) => {
      // Reset auth token if provided in response.
      let authorization = res.headers.Authorization
      let invalidTokenMethod = auth.getOption('invalidToken')

      if (authorization) {
        authorization = authorization.split(' ')

        if (authorization[1]) {
          _setToken.call(auth, authorization[1])
        }
      }

      if (invalidTokenMethod) {
        invalidTokenMethod.bind(auth)(res)
      }
    })
  }
})()
