<template>
  <div class="home-container">
    <h1>Bienvenido al Sistema de Gestión de Activos</h1>
    <nav>
      <ul class="menu">
        <li class="menu-item">
          <img src="../assets/images/registro.png" alt="Registrar Activo" class="menu-icon" />
          <router-link to="/registro-activos">Registrar Activo</router-link>
        </li>
        <li class="menu-item">
          <img src="../assets/images/asignar.png" alt="Asignar Activo" class="menu-icon" />
          <router-link to="/asignacion-activos">Asignar Activo</router-link>
        </li>
        <li class="menu-item">
          <img src="../assets/images/mantenimiento.png" alt="Mantenimiento de Activo" class="menu-icon" />
          <router-link to="/mantenimiento-activos">Mantenimiento de Activo</router-link>
        </li>
        <li class="menu-item">
          <img src="../assets/images/baja.png" alt="Dar Baja a Activo" class="menu-icon" />
          <router-link to="/baja-activos"> Dar Baja a Activo</router-link>
        </li>
        <li class="menu-item">
          <img src="../assets/images/usuarios.png" alt="Gestionar Usuarios" class="menu-icon" />
          <router-link to="/gestion-usuarios">Gestionar Usuarios</router-link>
        </li>
        <li class="menu-item">
          <img src="../assets/images/soporte.png" alt="Soporte Técnico" class="menu-icon" />
          <router-link to="/soporte-tecnico">Soporte Técnico</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HomeViews',
};
</script>

<style scoped>
/* Contenedor principal */
.home-container {
  text-align: center;
  padding: 20px;
}

/* Título principal */
h1 {
  font-family: 'Roboto Slab', serif;
  font-size: 32px;
  font-weight: 700;
  color: #d3222a; /* Rojo de la ULEAM */
  margin-bottom: 40px;
  letter-spacing: 1px;
}

/* Estilos del menú */
.menu {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  list-style-type: none;
  padding: 0;
  margin: 0;
}

/* Estilo de cada ítem de menú */
.menu-item {
  background-color: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.menu-item:hover {
  transform: translateY(-8px); /* Efecto hover */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Sombra más prominente al hacer hover */
}

/* Iconos de los menú */
.menu-icon {
  width: 70px;
  height: 70px;
  margin-bottom: 15px;
}

/* Enlaces del menú */
.menu-item router-link {
  font-size: 18px;
  color: #333;
  text-decoration: none;
  font-weight: 600;
  display: block;
  margin-top: 12px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.menu-item router-link:hover {
  color: #d3222a; /* Rojo de la ULEAM al pasar el cursor */
  transform: scale(1.05); /* Efecto sutil de aumento en el enlace */
}

/* Enlaces en foco */
.menu-item router-link:focus {
  outline: 2px solid #d3222a; /* Borde en foco para accesibilidad */
  outline-offset: 4px;
}
</style>
