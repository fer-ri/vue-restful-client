// layouts
import Default from '../components/layouts/Default'

// errors
import NotFound from '../components/errors/404'
import NotAuthorized from '../components/errors/403'
import InternalServerError from '../components/errors/500'

// auth
import Auth from '../components/auth/Auth'
import Login from '../components/auth/Login'
import Logout from '../components/auth/Logout'
import Register from '../components/auth/Register'

// pages
import Hello from '../components/Hello'
import Dashboard from '../components/Dashboard'

// posts
import PostIndex from '../components/posts/Index'
import PostCreate from '../components/posts/Create'
import PostEdit from '../components/posts/Edit'

// users
import UserIndex from '../components/users/Index'
import UserCreate from '../components/users/Create'
import UserEdit from '../components/users/Edit'

module.exports = {
  '/': {
    auth: true,
    component: Default,
    subRoutes: {
      '/': {
        component: Dashboard
      },
      '/hello': {
        component: Hello
      },
      '/posts': {
        component: PostIndex
      },
      '/posts/create': {
        component: PostCreate
      },
      '/posts/:uuid/edit': {
        component: PostEdit
      },
      '/users': {
        auth: 'admin',
        component: UserIndex
      },
      '/users/create': {
        auth: 'admin',
        component: UserCreate
      },
      '/users/:uuid/edit': {
        auth: 'admin',
        component: UserEdit
      }
    }
  },
  '/auth': {
    component: Auth,
    subRoutes: {
      '/login': {
        auth: false,
        component: Login
      },
      '/register': {
        auth: false,
        component: Register
      },
      '/logout': {
        component: Logout
      }
    }
  },
  '/403': {
    component: NotAuthorized
  },
  '/500': {
    component: InternalServerError
  },
  '*': {
    component: NotFound
  }
}
