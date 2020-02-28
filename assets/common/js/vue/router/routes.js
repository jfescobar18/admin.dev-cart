import login from '../components/login.js'
import navbar from '../components/navbar.js'
import home from '../components/home.js'
import slider from '../components/slider.js'
import aboutus from '../components/aboutus.js'
import banner from '../components/banner.js'
import categories from '../components/categories.js'
import products from '../components/products.js'
import orders from '../components/orders.js'
import config from '../components/config.js'

const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/slider',
        name: 'slider',
        component: slider
    },
    {
        path: '/aboutus',
        name: 'aboutus',
        component: aboutus
    },
    {
        path: '/banner',
        name: 'banner',
        component: banner
    },
    {
        path: '/categories',
        name: 'categories',
        component: categories
    },
    {
        path: '/products',
        name: 'products',
        component: products
    },
    {
        path: '/orders',
        name: 'orders',
        component: orders
    },
    {
        path: '/config',
        name: 'config',
        component: config
    }
];

const router = new VueRouter({
    routes
});

export default router;