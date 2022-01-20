import Vue from 'vue'
import VueRouter from 'vue-router'
import DPPHPage from '../views/DPPHPage.vue'
import INTPage from '../views/INTPage.vue'
import VCCPage from '../views/VCCPage.vue'
import VCCmapPage from '../views/VCCmapPage.vue'
import screenPage from '../views/screenPage.vue'
import piexlsPage from '../views/piexlsPage.vue'
import treePage from '../views/treePage.vue'

Vue.use(VueRouter)
const routes = [{
        path: "/",
        redirect: '/screen'
    },
    {
        path: "/DPPH",
        component: DPPHPage
    },
    {
        path: "/INt",
        component: INTPage
    },
    {
        path: '/VCC',
        component: VCCPage
    },
    {
        path: '/VCCmap',
        component: VCCmapPage
    },
    {
        path: '/screen',
        component: screenPage
    }, {
        path: '/piexls',
        component: piexlsPage
    }, {
        path: '/tree',
        component: treePage
    }
]

const router = new VueRouter({
    routes
})

export default router