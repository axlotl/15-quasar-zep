
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      //{ path: '', component: () => import('pages/index') }
      { 
        path: '', 
        name : "login",  
        component: () => import('pages/login') 
      },
      { 
        path: '/console', 
        name : "console", 
        component: () => import( 'pages/console'),
      
      },
      {
        path : '/templateListing/:template',
        name : 'templateListing',
        component: () => import( 'pages/templateListing')
      },
      {
        path : '/editForm/:subtype/:objectId',
        name : 'editForm',
        component: () => import('pages/editForm')

      },
    ]
  },
  

  
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
