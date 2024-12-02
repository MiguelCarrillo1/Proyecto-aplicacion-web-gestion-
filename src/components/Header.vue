<template>
  <header>
    <div class="logo-container">
      <!-- Logo y Título -->
      <img src="../assets/Logo1.png" alt="Logo" class="logo" />
      <h1>Gestión de Activos</h1>
    </div>
    
    <nav>
      <!-- Enlaces de navegación -->
      <ul>
        <li v-for="(link, index) in navLinks" :key="index">
          <router-link
            :to="link.to"
            :aria-label="link.ariaLabel"
            :class="{ active: isActive(link.to) }"
            @click="hideBackgroundImage"
          >
            {{ link.text }}
          </router-link>
        </li>
        
        <!-- Mostrar "Iniciar sesión" solo si el usuario no está autenticado -->
        <li v-if="!isAuthenticated">
          <router-link to="/login" aria-label="Iniciar sesión" @click="hideBackgroundImage">Iniciar Sesión</router-link>
        </li>
        
        <!-- Mostrar "Cerrar sesión" solo si el usuario está autenticado -->
        <li v-if="isAuthenticated" class="logout" @click="logoutAndHideBackground">
          Cerrar Sesión
        </li>
      </ul>
    </nav>
  </header>

  <!-- Contenedor para la imagen de fondo -->
  <div v-if="showImage" class="background-image-container"></div>

  <div class="welcome-message">
    <h1 v-if="isAuthenticated">Bienvenido, {{ currentUser.nombre }}!</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderComponent',
  data() {
    return {
      showImage: true, // Controla la visibilidad de la imagen de fondo
      navLinks: [
        { to: '/registro-activos', text: 'Registro de Activos', ariaLabel: 'Registro de Activos' },
        { to: '/asignacion-activos', text: 'Asignación de Activos', ariaLabel: 'Asignación de Activos' },
        { to: '/mantenimiento-activos', text: 'Mantenimiento de Activos', ariaLabel: 'Mantenimiento de Activos' },
        { to: '/baja-activos', text: 'Baja de Activos', ariaLabel: 'Baja de Activos' },
        { to: '/gestion-usuarios', text: 'Gestión de Usuarios', ariaLabel: 'Gestión de Usuarios' },
        { to: '/historial-movimientos', text: 'Historial de Movimientos', ariaLabel: 'Historial de Movimientos' },
        { to: '/soporte-tecnico', text: 'Soporte Técnico', ariaLabel: 'Soporte Técnico' }
      ]
    };
  },
  computed: {
    // Usamos el getter de Vuex para verificar si el usuario está autenticado
    ...mapGetters('users', ['isAuthenticated']),
    currentUser() {
      return this.$store.state.user; // Acceder al usuario actual desde Vuex
    }
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    logout() {
      this.$store.commit('logout'); // Llamamos a la mutación de logout de Vuex
      this.$router.push('/login'); // Redirigimos al login después de cerrar sesión
    },
    hideBackgroundImage() {
      this.showImage = false; // Ocultar la imagen de fondo al hacer clic
    },
    logoutAndHideBackground() {
      this.hideBackgroundImage(); // Ocultar la imagen de fondo
      this.logout(); // Ejecutar logout
    },
    isActive(route) {
      return this.$route.path === route;
    }
  }
}
</script>


<style scoped>
/* Estilos para el Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background-color: #2d3436; /* Fondo oscuro con contraste */
  color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Logo y Título */
.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px; /* Tamaño del logo */
  height: auto;
  margin-right: 15px;
}

h1 {
  font-size: 24px;
  font-weight: 600;
}

/* Navegación */
nav ul {
  display: flex;
  list-style: none;
  padding: 0;
}

nav ul li {
  margin-left: 30px;
  position: relative;
}

nav ul li a {
  text-decoration: none;
  color: #ffffff;
  font-size: 18px;
  transition: color 0.3s ease;
}

nav ul li a:hover {
  color: #00bcd4; /* Color de resaltado al pasar el ratón */
}

.logout {
  cursor: pointer;
  font-weight: 500;
}

.logout:hover {
  color: #e74c3c; /* Resaltado en rojo para la opción de logout */
}

/* Estilos para la bienvenida */
.welcome-message {
  margin: 20px;
  text-align: center;
  font-size: 20px;
}

.welcome-message h1 {
  color: #2d3436;
  font-size: 28px;
}

/* Estilos de enlaces activos */
nav ul li a.active {
  color: #d3222a; /* Resaltado para enlaces activos */
  font-weight: 700;
}

/* Contenedor para la imagen de fondo debajo del header */
.background-image-container {
  background-image: url('../assets/fondo.jpg'); /* Ruta de la imagen */
  background-size: cover; /* Asegura que la imagen cubra todo el contenedor */
  background-position: center; /* Centra la imagen */
  height: 800px; /* Ajusta la altura de la imagen */
  
  width: 100%;
  /* Si deseas que la imagen no se desplace mientras haces scroll, descomenta la siguiente línea */
  /* background-attachment: fixed; */
}

/* Responsividad: Menu en pantallas pequeñas */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    text-align: center;
  }

  .logo-container {
    margin-bottom: 10px;
  }

  nav ul {
    flex-direction: column;
    margin-top: 10px;
  }

  nav ul li {
    margin: 10px 0;
  }
}
</style>

