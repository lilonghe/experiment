import * as VueRouter from 'vue-router'

const ProjectList = () => import('./pages/project/List.vue');
const ProjectCreate = () => import('./pages/project/Create.vue');

// const getView = (name: string) => import(`./page/${name}.vue`)

const routes = [
    {
        path: '/', component: ProjectList
    },
    {
        path: '/create', component: ProjectCreate
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

export {
    routes,
    router
}