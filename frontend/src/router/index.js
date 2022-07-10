import { createWebHistory, createRouter } from 'vue-router'
import CreatePost from '../components/CreatePost.vue'
import Posts from '../components/Posts.vue'
import Login from '../components/Login.vue'
import SignUp from '../components/SignUp.vue'
import MyInformation from '../components/MyInformation.vue'


// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    {
        path: '/',
        name: 'Posts',
        component: Posts
    },
    { 
      path: '/createpost', 
      name: 'Create Post',
      component: CreatePost 
    },
    { 
      path: '/login', 
      name: 'Kirjaudu',
      component: Login 
    },
    { 
      path: '/signup', 
      name: 'Luo käyttäjä',
      component: SignUp 
    },
    { 
      path: '/myinformation', 
      name: 'Minun tietoni',
      component: MyInformation 
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