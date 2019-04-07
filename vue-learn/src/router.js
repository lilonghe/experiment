import VueRouter from 'vue-router';
import DashboardPage from './pages/Dashboard';
import AboutPage from './pages/About';
import Error404 from './pages/Error404';
import PostPage from './pages/PostDetail';

const routes = [
    { path: '/', name: 'home', component: DashboardPage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/post/:id', name: 'post_detail', component: PostPage, props: true },
    { path: '*', name: 'Error404', component: Error404 },
]

const router = new VueRouter({
    routes
});

export default router;