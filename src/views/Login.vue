<template>
  <div class="login">
    <div class="login-container">
      <!-- Logo de la ULEAM -->
      <div class="logo-container">
        <img src="../assets/Logorojo.png" alt="Logo ULEAM" class="logo" />
      </div>
      <h1>Iniciar sesión</h1>
      <form @submit.prevent="login">
        <div class="input-group">
          <label for="usuario">Usuario</label>
          <input type="text" id="usuario" v-model="usuario" required placeholder="Ingrese su usuario" />
        </div>
        <div class="input-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" required placeholder="Ingrese su contraseña" />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      usuario: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Verificación de las credenciales (puedes hacerla más compleja)
      if (this.usuario === 'admin' && this.password === '1234') {
        // Guardar estado de autenticación
        sessionStorage.setItem('isAuthenticated', 'true');
        // Redirigir al Home (o a la vista que corresponda)
        this.$router.push({ name: 'Home' });
      } else {
        alert('Credenciales incorrectas');
      }
    }
  }
};
</script>

<style scoped>
/* Contenedor principal */
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7; /* Fondo similar al que usas */
}

.login-container {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Sombra sutil */
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  width: 100px; /* Tamaño del logo (ajústalo según el logo real) */
  height: auto;
}

/* Estilo para el título */
h1 {
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  color: #d3222a; /* Rojo de la ULEAM */
}

/* Estilos de los campos de entrada */
.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
  display: block;
}

.input-group input {
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s ease-in-out;
}

.input-group input:focus {
  border-color: #d3222a; /* Rojo en el foco */
}

input::placeholder {
  color: #aaa;
}

/* Estilos del botón */
button {
  width: 100%;
  padding: 14px;
  background-color: #d3222a; /* Rojo de la ULEAM */
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.1s ease-in-out;
}

button:hover {
  background-color: #b71b23; /* Rojo más oscuro en hover */
}

button:active {
  transform: scale(0.98);
}
</style>
