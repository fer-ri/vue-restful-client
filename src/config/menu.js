/**
  Available options
  {
    link: {
      path,
      name,
      exact,
      append,
      params,
      replace,
      activeClass
    },
    label,
    before,
    after,
    permissions,
    children
  }
**/

export default [
  {
    link: {
      path: '/',
      exact: true
    },
    label: 'Dashboard',
    before: '',
    after: '<span class="label label-success pull-right">start</span>'
  },
  {
    link: {
      path: '/posts'
    },
    label: 'Post'
  },
  {
    link: {
      path: '/users'
    },
    label: 'User'
  },
  {
    link: null,
    label: 'Dropdown Menu',
    children: [
      {
        link: null,
        label: 'Child Menu'
      },
      {
        link: null,
        label: 'Child Menu 2'
      }
    ]
  },
  {
    link: null,
    label: 'Dropdown Menu 2',
    children: [
      {
        link: null,
        label: 'Child Menu'
      },
      {
        link: null,
        label: 'Child Menu 2'
      }
    ]
  }
]
