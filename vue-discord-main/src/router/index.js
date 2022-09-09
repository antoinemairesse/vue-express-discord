import {createRouter, createWebHistory} from 'vue-router';
import Index from '../views/index/index.vue';
import Login from '../views/login/index.vue';
import Register from '../views/register/index.vue';
import Invite from '../views/invite/index.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/invite',
            name: 'invite',
            component: Invite,
        },
    ],
});

const hasQueryParams = (route) => {
    return !!Object.keys(route.query).length
}

router.beforeEach(((to, from, next) => {
    const routes = ['login', 'register', 'invite']
    if((routes.includes(to.name) && routes.includes(from.name)) && (!hasQueryParams(to) && hasQueryParams(from))){
        next({name: to.name, query: from.query});
    } else next()
}))

export default router;
