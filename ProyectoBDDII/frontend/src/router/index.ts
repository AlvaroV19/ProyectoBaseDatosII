import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import ClientePage from '../views/ClientePage.vue'
import LoginPage from '../views/LoginPage.vue'
import DasboardPage from '../views/DasboardPage.vue'
import ProductoPage from '@/views/ProductoPage.vue';
import ProveedorPage from '@/views/ProveedorPage.vue';
import FacturaPage from '@/views/FacturaPage.vue';
import DetalleFacturaPage from '@/views/DetalleFacturaPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },{
    path: '/cliente',
    name: 'Cliente',
    component: ClientePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DasboardPage
  },
  {
    path: '/producto',
    name: 'Producto',
    component: ProductoPage
  },
  {
    path: '/proveedor',
    name: 'Proveedor',
    component: ProveedorPage
  },
  {
    path: '/factura',
    name: 'Factura',
    component: FacturaPage
  },
  {
    path: '/detalleFactura',
    name: 'DetalleFactura',
    component: DetalleFacturaPage
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
