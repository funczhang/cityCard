import Vue from 'vue'
import Router from 'vue-router'
// import HomePage from '@/pages/HomePage.vue'
import applyForm from '@/pages/applyCard/ApplyForm.vue'
// import selectAddress from '@/pages/applyCard/SelectAddress.vue'
// import applyCenter from '@/pages/applyCard/ApplyCenter.vue'
// import success from '@/pages/common/applySuccess.vue'
// import failed from '@/pages/common/applyFailed.vue'
// import checkProgress from '@/pages/common/checkProgress.vue'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HomePage',
            component: resolve => require(['../pages/HomePage.vue'], resolve)
        },
        {
            path: '/applyCard/ApplyForm',
            name: 'applyForm',
            component: applyForm
        },
        {
            path: '/applyCard/SelectAddress',
            name: 'SelectAddress',
            component: resolve => require(['../pages/applyCard/SelectAddress.vue'], resolve)
        },
        {
            path: '/applyCard/success',
            name: 'success',
            component: resolve => require(['../pages/common/applySuccess.vue'], resolve)
        },
        {
            path: '/applyCard/failed',
            name: 'failed',
            component: resolve => require(['../pages/common/applyFailed.vue'], resolve)
        },
        {
            path: '/applyCard/checkProgress',
            name: 'checkProgress',
            component: resolve => require(['../pages/common/checkProgress.vue'], resolve)
        },
        {
            path: '/applyCard/applyCenter',
            name: 'applyCenter',
            component: resolve => require(['../pages/applyCard/ApplyCenter.vue'], resolve)
        },
        {
            path: '/common/showCardList',
            name: 'showCardList',
            component: resolve => require(['../pages/common/showCardList.vue'], resolve)
        }
    ]
})