import { createWebHistory, createRouter } from 'vue-router'
import CreatePost from '../components/Posts/CreatePost.vue'
import AreaPosts from '../components/Posts/AreaPosts.vue'
import Login from '../components/User/Login.vue'
import SignUp from '../components/User/SignUp.vue'
import MyInformation from '../components/User/MyInformation.vue'
import MyPosts from '../components/Posts/MyPosts.vue'
import ControlPanel from '../components/User/ControlPanel.vue'


// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    {
      path: '/areaposts',
      name: 'Postaukset',
      component: AreaPosts,
      type: 'private'
    },
    { 
      path: '/createpost', 
      name: 'Luo',
      component: CreatePost,
      type: 'private' 
    },
    { 
      path: '/login', 
      name: 'Kirjaudu',
      component: Login,
      type: 'public' 
    },
    { 
      path: '/signup', 
      name: 'Luo käyttäjä',
      component: SignUp,
      type: 'public' 
    },
    { 
      path: '/myinformation', 
      name: 'Tietoni',
      component: MyInformation,
      type: 'private' 
    },
    { 
      path: '/myposts', 
      name: 'Postaukseni',
      component: MyPosts,
      type: 'private' 
    },
    { 
      path: '/controlpanel', 
      name: 'Hallinta',
      component: ControlPanel,
      type: 'admin' 
    }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/signup', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router