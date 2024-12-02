<template>
  <div class="mantenimiento-activos">
    <h1>Mantenimiento de Activos</h1>
    
    <!-- Botones de exportación e importación -->
    <div class="actions">
      <button @click="exportarJson">Exportar a JSON</button>
      <button @click="exportarXml">Exportar a XML</button>
      <button @click="importarJsonFile">Importar desde JSON</button>
      <button @click="importarXmlFile">Importar desde XML</button>
    </div>

    <!-- Tabla de mantenimientos -->
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Activo</th>
          <th>Fecha de Mantenimiento</th>
          <th>Estado</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mantenimiento in mantenimientos" :key="mantenimiento.codigo">
          <td>{{ mantenimiento.codigo }}</td>
          <td>{{ mantenimiento.activo }}</td>
          <td>{{ mantenimiento.fecha }}</td>
          <td>{{ mantenimiento.estado }}</td>
          <td>{{ mantenimiento.descripcion }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Botón para mostrar el formulario de registro -->
    <button @click="mostrarFormulario">Nuevo Mantenimiento</button>

    <!-- Mostrar el formulario si isFormularioVisible es true -->
    <div v-if="isFormularioVisible" class="formulario-registro">
      <h2>Formulario de Registro de Mantenimiento</h2>
      <form @submit.prevent="registrarMantenimiento">
        <input v-model="nuevoMantenimiento.codigo" type="text" placeholder="Código del Activo" required />
        <input v-model="nuevoMantenimiento.activo" type="text" placeholder="Activo" required />
        <input v-model="nuevoMantenimiento.fecha" type="date" required />
        <select v-model="nuevoMantenimiento.estado" required>
          <option value="Pendiente">Pendiente</option>
          <option value="Reparado">Reparado</option>
          <option value="En progreso">En progreso</option>
        </select>
        <textarea v-model="nuevoMantenimiento.descripcion" placeholder="Descripción" required></textarea>
        <button type="submit">Registrar</button>
        <button type="button" @click="cancelarFormulario">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MantenimientoActivos',
  data() {
    return {
      mantenimientos: [
        { codigo: 'ACT1234', activo: 'Computadora HP', fecha: '2023-08-01', estado: 'Reparado', descripcion: 'Se reparó la pantalla' },
        { codigo: 'ACT2345', activo: 'Impresora Canon', fecha: '2023-09-15', estado: 'Pendiente', descripcion: 'Falta cambiar cartucho' }
      ],
      isFormularioVisible: false, // Control de visibilidad del formulario
      nuevoMantenimiento: {
        codigo: '',
        activo: '',
        fecha: '',
        estado: 'Pendiente',
        descripcion: ''
      }
    };
  },
  methods: {
    // Muestra el formulario para registrar un nuevo mantenimiento
    mostrarFormulario() {
      this.isFormularioVisible = true;
    },

    // Cancela el registro y oculta el formulario
    cancelarFormulario() {
      this.isFormularioVisible = false;
      this.nuevoMantenimiento = { codigo: '', activo: '', fecha: '', estado: 'Pendiente', descripcion: '' }; // Resetea el formulario
    },

    // Registra el nuevo mantenimiento y lo agrega a la lista
    registrarMantenimiento() {
      if (this.nuevoMantenimiento.codigo && this.nuevoMantenimiento.activo && this.nuevoMantenimiento.fecha && this.nuevoMantenimiento.estado && this.nuevoMantenimiento.descripcion) {
        this.mantenimientos.push({ ...this.nuevoMantenimiento });
        this.cancelarFormulario();
      } else {
        alert('Por favor, complete todos los campos.');
      }
    },

    // Exportar los mantenimientos a JSON
    exportarJson() {
      const json = JSON.stringify(this.mantenimientos, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'mantenimientos.json';
      link.click();
    },

    // Exportar los mantenimientos a XML
    exportarXml() {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<mantenimientos>\n';

      this.mantenimientos.forEach(mantenimiento => {
        xml += '  <mantenimiento>\n';
        xml += `    <codigo>${mantenimiento.codigo}</codigo>\n`;
        xml += `    <activo>${mantenimiento.activo}</activo>\n`;
        xml += `    <fecha>${mantenimiento.fecha}</fecha>\n`;
        xml += `    <estado>${mantenimiento.estado}</estado>\n`;
        xml += `    <descripcion>${mantenimiento.descripcion}</descripcion>\n`;
        xml += '  </mantenimiento>\n';
      });

      xml += '</mantenimientos>';

      const blob = new Blob([xml], { type: 'application/xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'mantenimientos.xml';
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

    // Importar mantenimientos desde un archivo JSON
    async importarJson(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.mantenimientos = data;
        } catch (error) {
          alert('Error al procesar el archivo JSON.');
        }
      };
      reader.readAsText(file);
    },

    // Importar mantenimientos desde un archivo XML
    async importarXml(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(e.target.result, "application/xml");

          const mantenimientosXml = xmlDoc.getElementsByTagName('mantenimiento');
          const mantenimientos = Array.from(mantenimientosXml).map(mantenimientoNode => {
            return {
              codigo: mantenimientoNode.getElementsByTagName('codigo')[0].textContent,
              activo: mantenimientoNode.getElementsByTagName('activo')[0].textContent,
              fecha: mantenimientoNode.getElementsByTagName('fecha')[0].textContent,
              estado: mantenimientoNode.getElementsByTagName('estado')[0].textContent,
              descripcion: mantenimientoNode.getElementsByTagName('descripcion')[0].textContent
            };
          });

          this.mantenimientos = mantenimientos;
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
.mantenimiento-activos {
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

.formulario-registro {
  margin-top: 20px;
}

button {
  margin: 10px;
}
</style>
