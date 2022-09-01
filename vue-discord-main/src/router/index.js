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

export default router;
