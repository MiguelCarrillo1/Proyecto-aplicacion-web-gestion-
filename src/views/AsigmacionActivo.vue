<template>
  <div class="asignacion-activos">
    <h1>Asignación de Activos</h1>

    <!-- Botones de exportación e importación -->
    <div class="actions">
      <button @click="exportarJson">Exportar a JSON</button>
      <button @click="exportarXml">Exportar a XML</button>
      <button @click="importarJsonFile">Importar desde JSON</button>
      <button @click="importarXmlFile">Importar desde XML</button>
    </div>

    <!-- Tabla de asignaciones -->
    <table>
      <thead>
        <tr>
          <th>Código del Activo</th>
          <th>Departamento</th>
          <th>Ubicación</th>
          <th>Fecha de Asignación</th>
          <th>Responsable</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(asignacion, index) in asignaciones" :key="index">
          <td>{{ asignacion.codigo }}</td>
          <td>{{ asignacion.departamento }}</td>
          <td>{{ asignacion.ubicacion }}</td>
          <td>{{ asignacion.fecha }}</td>
          <td>{{ asignacion.responsable }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Botón para mostrar el formulario de asignación -->
    <button @click="mostrarFormulario">Asignar Nuevo Activo</button>

    <!-- Mostrar el formulario si isFormularioVisible es true -->
    <div v-if="isFormularioVisible" class="formulario-asignacion">
      <h2>Formulario de Asignación</h2>
      <form @submit.prevent="asignarActivo">
        <input v-model="nuevoActivo.codigo" type="text" placeholder="Código del Activo" required />
        <input v-model="nuevoActivo.departamento" type="text" placeholder="Departamento" required />
        <input v-model="nuevoActivo.ubicacion" type="text" placeholder="Ubicación" required />
        <input v-model="nuevoActivo.fecha" type="date" required />
        <input v-model="nuevoActivo.responsable" type="text" placeholder="Responsable" required />
        <button type="submit">Asignar</button>
        <button type="button" @click="cancelarFormulario">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AsignacionActivos',
  data() {
    return {
      asignaciones: [
        // Ejemplo de asignaciones previas (se agregarán los nuevos datos del formulario aquí)
        { codigo: 'ACT1234', departamento: 'IT', ubicacion: 'Piso 2', fecha: '2023-05-02', responsable: 'Juan Pérez' },
        { codigo: 'ACT2345', departamento: 'Recursos Humanos', ubicacion: 'Piso 3', fecha: '2023-06-16', responsable: 'María López' }
      ],
      isFormularioVisible: false, // Control de visibilidad del formulario
      nuevoActivo: {
        codigo: '',
        departamento: '',
        ubicacion: '',
        fecha: '',
        responsable: ''
      }
    };
  },
  methods: {
    // Muestra el formulario para asignar un nuevo activo
    mostrarFormulario() {
      this.isFormularioVisible = true;
    },

    // Cancela la asignación y oculta el formulario
    cancelarFormulario() {
      this.isFormularioVisible = false;
      this.nuevoActivo = { codigo: '', departamento: '', ubicacion: '', fecha: '', responsable: '' }; // Resetea el formulario
    },

    // Asigna el nuevo activo a la lista de asignaciones
    asignarActivo() {
      // Verifica que todos los campos del formulario están completos
      if (this.nuevoActivo.codigo && this.nuevoActivo.departamento && this.nuevoActivo.ubicacion && this.nuevoActivo.fecha && this.nuevoActivo.responsable) {
        // Agregar el nuevo activo al array de asignaciones
        this.asignaciones.push({ ...this.nuevoActivo });
        
        // Limpiar el formulario después de la asignación
        this.cancelarFormulario();
      } else {
        // Si algún campo está vacío, muestra un mensaje de alerta
        alert('Por favor, complete todos los campos.');
      }
    },

    // Exporta las asignaciones a un archivo JSON
    exportarJson() {
      const json = JSON.stringify(this.asignaciones, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'asignaciones.json';
      link.click();
    },

    // Exporta las asignaciones a un archivo XML
    exportarXml() {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<asignaciones>\n';
      this.asignaciones.forEach(asignacion => {
        xml += `  <asignacion>\n    <codigo>${asignacion.codigo}</codigo>\n    <departamento>${asignacion.departamento}</departamento>\n    <ubicacion>${asignacion.ubicacion}</ubicacion>\n    <fecha>${asignacion.fecha}</fecha>\n    <responsable>${asignacion.responsable}</responsable>\n  </asignacion>\n`;
      });
      xml += '</asignaciones>';
      
      const blob = new Blob([xml], { type: 'application/xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'asignaciones.xml';
      link.click();
    },

    // Método para importar un archivo JSON
    importarJsonFile() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = this.importarJson;
      input.click();
    },

    // Método para importar un archivo XML
    importarXmlFile() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.xml';
      input.onchange = this.importarXml;
      input.click();
    },

    async importarJson(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (Array.isArray(data)) {
            this.asignaciones = data;
          } else {
            alert('El archivo JSON no contiene datos válidos.');
          }
        } catch (error) {
          alert('Error al procesar el archivo JSON.');
        }
      };
      reader.readAsText(file);
    },

    async importarXml(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(e.target.result, "application/xml");
          const asignacionesXml = xmlDoc.getElementsByTagName('asignacion');
          const asignaciones = Array.from(asignacionesXml).map(asignacionNode => ({
            codigo: asignacionNode.getElementsByTagName('codigo')[0].textContent,
            departamento: asignacionNode.getElementsByTagName('departamento')[0].textContent,
            ubicacion: asignacionNode.getElementsByTagName('ubicacion')[0].textContent,
            fecha: asignacionNode.getElementsByTagName('fecha')[0].textContent,
            responsable: asignacionNode.getElementsByTagName('responsable')[0].textContent
          }));
          this.asignaciones = asignaciones;
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
.asignacion-activos {
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

.formulario-asignacion {
  margin-top: 20px;
}

button {
  margin: 10px;
}
</style>
