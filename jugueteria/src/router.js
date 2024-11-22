import { createRouter, createWebHistory } from 'vue-router';
import ProductDetail from './components/ProductDetail.vue';
import ProductList from './components/ProductList.vue';
import ProductForm from './components/ProductForm.vue';
import Pagination from './components/Pagination.vue';
import ProductFormEdit from './components/ProductFormEdit.vue';

const routes = [
    {
        path: '/',
        name: 'ProductList',
        component: ProductList,
    },
    
    {
        path: '/productform',
        name: 'ProductForm',
        component: ProductForm,
    },

    {
        path: '/productEdit/:id',
        name: 'ProductEdit',
        component: ProductFormEdit,
        props: true,
    },
   
    {
        path: '/product/:id',
        name: 'ProductDetail',
        component: ProductDetail,
        props: true,
    },
    {
        path: '/pagination',
        name: 'Pagination',
        component: Pagination,
    },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;