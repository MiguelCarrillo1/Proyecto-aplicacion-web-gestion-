import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null, // Para manejar el usuario autenticado
    activos: [], // Para almacenar los activos
    usuarios: [], // Para almacenar la lista de usuarios
    autenticado: false, // Para verificar si el usuario está autenticado
  },
  getters: {
    // Obtener el usuario actual
    usuarioActual(state) {
      return state.user;
    },
    // Verificar si el usuario está autenticado
    isAuthenticated(state) {
      return state.autenticado;
    },
    // Obtener la lista de activos
    obtenerActivos(state) {
      return state.activos;
    },
    // Obtener la lista de usuarios
    obtenerUsuarios(state) {
      return state.usuarios;
    }
  },
  mutations: {
    // Mutación para setear el usuario
    setUsuario(state, usuario) {
      state.user = usuario;
      state.autenticado = true;
    },
    // Mutación para eliminar el usuario (cerrar sesión)
    logout(state) {
      state.user = null;
      state.autenticado = false;
    },
    // Mutación para agregar activos
    setActivos(state, activos) {
      state.activos = activos;
    },
    // Mutación para agregar usuarios
    setUsuarios(state, usuarios) {
      state.usuarios = usuarios;
    }
  },
  actions: {
    // Acción para autenticar al usuario
    autenticarUsuario({ commit }, usuario) {
      // Simulación de autenticación
      if (usuario.username === 'admin' && usuario.password === '1234') {
        commit('setUsuario', { username: 'admin', nombre: 'Administrador' });
        return true;
      }
      return false;
    },
    // Acción para obtener los activos (simulación)
    obtenerActivos({ commit }) {
      const activos = [
        { id: 1, nombre: 'Computadora HP', tipo: 'Electrónica', estado: 'En uso' },
        { id: 2, nombre: 'Impresora Canon', tipo: 'Periférico', estado: 'Reparación' },
      ];
      commit('setActivos', activos);
    },
    // Acción para obtener los usuarios (simulación)
    obtenerUsuarios({ commit }) {
      const usuarios = [
        { id: 1, usuario: 'admin', nombre: 'Administrador', correo: 'admin@uleam.edu', rol: 'Administrador' },
        { id: 2, usuario: 'juanperez', nombre: 'Juan Pérez', correo: 'juan@uleam.edu', rol: 'Usuario' },
      ];
      commit('setUsuarios', usuarios);
    }
  }
});
