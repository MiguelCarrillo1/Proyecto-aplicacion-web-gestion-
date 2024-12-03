<template>
  <div class="registro-activos">
    <h1>Registro de Activos</h1>

    <!-- Botones para exportar/importar -->
    <div class="actions">
      <button @click="exportarJson">Exportar a JSON</button>
      <button @click="exportarXml">Exportar a XML</button>
      <button @click="importarJsonFile">Importar desde JSON</button>
      <button @click="importarXmlFile">Importar desde XML</button>
    </div>

    <!-- Tabla de activos -->
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Código</th>
          <th>Categoría</th>
          <th>Fecha Adquisición</th>
          <th>Valor</th>
          <th>Descripción</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activo in activos" :key="activo.codigo">
          <td>{{ activo.nombre }}</td>
          <td>{{ activo.codigo }}</td>
          <td>{{ activo.categoria }}</td>
          <td>{{ activo.fechaAdquisicion }}</td>
          <td>{{ activo.valor }}</td>
          <td>{{ activo.descripcion }}</td>
          <td>{{ activo.estado }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Botón para mostrar el formulario de registro -->
    <button @click="mostrarFormulario">Nuevo Registro</button>

    <!-- Mostrar el formulario si isFormularioVisible es true -->
    <div v-if="isFormularioVisible" class="formulario-registro">
      <h2>Formulario de Registro de Activo</h2>
      <form @submit.prevent="registrarActivo">
        <input v-model="nuevoActivo.nombre" type="text" placeholder="Nombre" required />
        <input v-model="nuevoActivo.codigo" type="text" placeholder="Código" required />
        <input v-model="nuevoActivo.categoria" type="text" placeholder="Categoría" required />
        <input v-model="nuevoActivo.fechaAdquisicion" type="date" required />
        <input v-model="nuevoActivo.valor" type="number" placeholder="Valor" required />
        <input v-model="nuevoActivo.descripcion" type="text" placeholder="Descripción" required />
        <select v-model="nuevoActivo.estado" required>
          <option value="Operativo">Operativo</option>
          <option value="En reparación">En reparación</option>
          <option value="Descontinuado">Descontinuado</option>
        </select>
        <button type="submit">Registrar</button>
        <button type="button" @click="cancelarFormulario">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistroActivos',
  data() {
    return {
      activos: JSON.parse(localStorage.getItem('activos')) || [], // Recupera los datos desde localStorage si existen
      isFormularioVisible: false, // Controla la visibilidad del formulario
      nuevoActivo: {
        nombre: '',
        codigo: '',
        categoria: '',
        fechaAdquisicion: '',
        valor: '',
        descripcion: '',
        estado: 'Operativo'
      }
    };
  },
  methods: {
    // Muestra el formulario para registrar un nuevo activo
    mostrarFormulario() {
      this.isFormularioVisible = true;
    },

    // Cancela el registro y oculta el formulario
    cancelarFormulario() {
      this.isFormularioVisible = false;
      this.nuevoActivo = { nombre: '', codigo: '', categoria: '', fechaAdquisicion: '', valor: '', descripcion: '', estado: 'Operativo' }; // Resetea el formulario
    },

    // Registra el nuevo activo y lo agrega a la lista
    registrarActivo() {
      // Verifica que todos los campos estén completos
      if (this.nuevoActivo.nombre && this.nuevoActivo.codigo && this.nuevoActivo.categoria && this.nuevoActivo.fechaAdquisicion && this.nuevoActivo.valor && this.nuevoActivo.descripcion) {
        // Agrega el nuevo activo al array de activos
        this.activos.push({ ...this.nuevoActivo });

        // Actualiza localStorage después de agregar el nuevo activo
        this.actualizarLocalStorage();

        // Limpia el formulario después de la asignación
        this.cancelarFormulario();
      } else {
        // Si algún campo está vacío, muestra un mensaje de alerta
        alert('Por favor, complete todos los campos.');
      }
    },

    // Actualiza el localStorage con los datos más recientes
    actualizarLocalStorage() {
      localStorage.setItem('activos', JSON.stringify(this.activos));
    },

    // Exporta los activos a un archivo JSON
    exportarJson() {
      const json = JSON.stringify(this.activos, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'activos.json';
      link.click();
    },

    // Exporta los activos a un archivo XML
    exportarXml() {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<activos>\n';

      this.activos.forEach(activo => {
        xml += '  <activo>\n';
        xml += `    <nombre>${activo.nombre}</nombre>\n`;
        xml += `    <codigo>${activo.codigo}</codigo>\n`;
        xml += `    <categoria>${activo.categoria}</categoria>\n`;
        xml += `    <fechaAdquisicion>${activo.fechaAdquisicion}</fechaAdquisicion>\n`;
        xml += `    <valor>${activo.valor}</valor>\n`;
        xml += `    <descripcion>${activo.descripcion}</descripcion>\n`;
        xml += `    <estado>${activo.estado}</estado>\n`;
        xml += '  </activo>\n';
      });

      xml += '</activos>';

      const blob = new Blob([xml], { type: 'application/xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'activos.xml';
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

    // Importar activos desde un archivo JSON
    async importarJson(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.activos = data;
          this.actualizarLocalStorage(); // Actualiza localStorage después de importar los datos
        } catch (error) {
          alert('Error al procesar el archivo JSON.');
        }
      };
      reader.readAsText(file);
    },

    // Importar activos desde un archivo XML
    async importarXml(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(e.target.result, "application/xml");

          const activosXml = xmlDoc.getElementsByTagName('activo');
          const activos = Array.from(activosXml).map(activoNode => {
            return {
              nombre: activoNode.getElementsByTagName('nombre')[0].textContent,
              codigo: activoNode.getElementsByTagName('codigo')[0].textContent,
              categoria: activoNode.getElementsByTagName('categoria')[0].textContent,
              fechaAdquisicion: activoNode.getElementsByTagName('fechaAdquisicion')[0].textContent,
              valor: parseFloat(activoNode.getElementsByTagName('valor')[0].textContent),
              descripcion: activoNode.getElementsByTagName('descripcion')[0].textContent,
              estado: activoNode.getElementsByTagName('estado')[0].textContent
            };
          });

          this.activos = activos;
          this.actualizarLocalStorage(); // Actualiza localStorage después de importar los datos
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
.registro-activos {
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

button {
  margin: 10px;
}

input, select, textarea {
  margin-bottom: 10px;
  padding: 8px;
  width: 100%;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.formulario-registro {
  margin-top: 20px;
}
</style>
