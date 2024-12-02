<template>
  <div class="gestion-usuarios">
    <h1>Gestión de Usuario</h1>
    
    <!-- Botones de exportación e importación -->
    <div class="actions">
      <button @click="exportarJson">Exportar a JSON</button>
      <button @click="exportarXml">Exportar a XML</button>
      <button @click="importarJsonFile">Importar desde JSON</button>
      <button @click="importarXmlFile">Importar desde XML</button>
    </div>

    <!-- Tabla de usuarios -->
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Cédula</th>
          <th>Cargo</th>
          <th>Departamento</th>
          <th>Rol</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.nombre }}</td>
          <td>{{ usuario.email }}</td>
          <td>{{ usuario.cedula }}</td>
          <td>{{ usuario.cargo }}</td>
          <td>{{ usuario.departamento }}</td>
          <td>{{ usuario.rol }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Botón para mostrar el formulario de registro -->
    <button @click="mostrarFormulario">Nuevo Registro</button>

    <!-- Mostrar el formulario si isFormularioVisible es true -->
    <div v-if="isFormularioVisible" class="formulario-usuario">
      <h2>Formulario de Nuevo Usuario</h2>
      <form @submit.prevent="registrarUsuario">
        <input v-model="nuevoUsuario.nombre" type="text" placeholder="Nombre" required />
        <input v-model="nuevoUsuario.email" type="email" placeholder="Email" required />
        <input v-model="nuevoUsuario.cedula" type="text" placeholder="Cédula" required />
        <input v-model="nuevoUsuario.cargo" type="text" placeholder="Cargo" required />
        <input v-model="nuevoUsuario.departamento" type="text" placeholder="Departamento" required />
        <input v-model="nuevoUsuario.rol" type="text" placeholder="Rol" required />
        <button type="submit">Registrar</button>
        <button type="button" @click="cancelarFormulario">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuarios: [
        { nombre: 'Juan Pérez', email: 'juan.perez@uleam.edu.ec', cedula: '1234567890', cargo: 'Administrador', departamento: 'IT', rol: 'Administrador' },
        { nombre: 'María López', email: 'maria.lopez@uleam.edu.ec', cedula: '0987654321', cargo: 'Operador', departamento: 'Soporte', rol: 'Operador' }
      ],
      isFormularioVisible: false, // Control de visibilidad del formulario
      nuevoUsuario: {
        nombre: '',
        email: '',
        cedula: '',
        cargo: '',
        departamento: '',
        rol: ''
      }
    };
  },
  methods: {
    mostrarFormulario() {
      this.isFormularioVisible = true;
    },

    // Cancela el registro y oculta el formulario
    cancelarFormulario() {
      this.isFormularioVisible = false;
      this.nuevoUsuario = { nombre: '', email: '', cedula: '', cargo: '', departamento: '', rol: '' }; // Resetea el formulario
    },

    // Registrar un nuevo usuario
    registrarUsuario() {
      if (this.nuevoUsuario.nombre && this.nuevoUsuario.email && this.nuevoUsuario.cedula && this.nuevoUsuario.cargo && this.nuevoUsuario.departamento && this.nuevoUsuario.rol) {
        this.usuarios.push({ ...this.nuevoUsuario });
        this.cancelarFormulario();
      } else {
        alert('Por favor, complete todos los campos.');
      }
    },

    // Exportar usuarios a JSON
    exportarJson() {
      const json = JSON.stringify(this.usuarios, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'usuarios.json';
      link.click();
    },

    // Exportar usuarios a XML
    exportarXml() {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<usuarios>\n';

      this.usuarios.forEach(usuario => {
        xml += '  <usuario>\n';
        xml += `    <nombre>${usuario.nombre}</nombre>\n`;
        xml += `    <email>${usuario.email}</email>\n`;
        xml += `    <cedula>${usuario.cedula}</cedula>\n`;
        xml += `    <cargo>${usuario.cargo}</cargo>\n`;
        xml += `    <departamento>${usuario.departamento}</departamento>\n`;
        xml += `    <rol>${usuario.rol}</rol>\n`;
        xml += '  </usuario>\n';
      });

      xml += '</usuarios>';

      const blob = new Blob([xml], { type: 'application/xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'usuarios.xml';
      link.click();
    },

    // Método para activar la carga de un archivo JSON
    importarJsonFile() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = this.importarJson;
      input.click();
    },

    // Método para activar la carga de un archivo XML
    importarXmlFile() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.xml';
      input.onchange = this.importarXml;
      input.click();
    },

    // Importar usuarios desde un archivo JSON
    async importarJson(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.usuarios = data;
        } catch (error) {
          alert('Error al procesar el archivo JSON.');
        }
      };
      reader.readAsText(file);
    },

    // Importar usuarios desde un archivo XML
    async importarXml(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(e.target.result, "application/xml");

          const usuariosXml = xmlDoc.getElementsByTagName('usuario');
          const usuarios = Array.from(usuariosXml).map(usuarioNode => {
            return {
              nombre: usuarioNode.getElementsByTagName('nombre')[0].textContent,
              email: usuarioNode.getElementsByTagName('email')[0].textContent,
              cedula: usuarioNode.getElementsByTagName('cedula')[0].textContent,
              cargo: usuarioNode.getElementsByTagName('cargo')[0].textContent,
              departamento: usuarioNode.getElementsByTagName('departamento')[0].textContent,
              rol: usuarioNode.getElementsByTagName('rol')[0].textContent
            };
          });

          this.usuarios = usuarios;
        } catch (error) {
          alert('Error al procesar el archivo XML.');
        }
      };
      reader.readAsText(file);
    }
  }
};
</script>

<style scoped>
.gestion-usuarios {
  padding: 20px;
}

.actions {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.formulario-usuario {
  margin-top: 20px;
}

button {
  margin: 10px;
}
</style>
