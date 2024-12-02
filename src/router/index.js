// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';

// Importación de vistas
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import RegistroActivos from '../views/RegistroActivos.vue';
import AsignacionActivos from '../views/AsigmacionActivo.vue';
import MantenimientoActivos from '../views/MantenimientoActivo.vue'
import BajaActivos from '../views/BajaActivo.vue';
import GestionUsuarios from '../views/GestionUsuario.vue';
import HistorialMovimientos from '../views/HistorialMovimiento.vue';
import SoporteTecnico from '../views/SoporteTecnico.vue';


// Importación de componentes 
import Header from '../components/Header.vue';

// Crear router usando createRouter y createWebHistory
const routes = [
  // Rutas de vistas principales
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }  // Ruta protegida
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registro-activos',
    name: 'registro-activos',
    component: RegistroActivos,
    meta: { requiresAuth: true }
  },
  {
    path: '/asignacion-activos',
    name: 'asignacion-activos',
    component: AsignacionActivos,
    meta: { requiresAuth: true }
  },
  {
    path: '/mantenimiento-activos',
    name: 'mantenimiento-activos',
    component: MantenimientoActivos,
    meta: { requiresAuth: true }
  },
  {
    path: '/baja-activos',
    name: 'baja-activos',
    component: BajaActivos,
    meta: { requiresAuth: true }
  },
  {
    path: '/gestion-usuarios',
    name: 'gestion-usuarios',
    component: GestionUsuarios,
    meta: { requiresAuth: true }
  },
  {
    path: '/historial-movimientos',
    name: 'historial-movimientos',
    component: HistorialMovimientos,
    meta: { requiresAuth: true }
  },
  {
    path: '/soporte-tecnico',
    name: 'soporte-tecnico',
    component: SoporteTecnico,
    meta: { requiresAuth: true }
  },


  // Rustas del componente Header
  {
    path: '/header',
    name: 'header',
    component: Header
  }
];

// Crear instancia del router
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Guardia global para proteger rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';
  
  // Si la ruta requiere autenticación y no está autenticado, redirige al login
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next(); // Permite la navegación
  }
});

export default router;
