<template>
  <div class="soporte-tecnico">
    <h1>Soporte Técnico</h1>

    <!-- Botones de exportación e importación -->
    <div class="actions">
      <button @click="exportarJson">Exportar a JSON</button>
      <button @click="exportarXml">Exportar a XML</button>
      <button @click="importarJsonFile">Importar desde JSON</button>
      <button @click="importarXmlFile">Importar desde XML</button>
    </div>

    <!-- Tabla de casos -->
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Activo</th>
          <th>Fecha de Reporte</th>
          <th>Descripción</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="caso in casos" :key="caso.codigo">
          <td>{{ caso.codigo }}</td>
          <td>{{ caso.activo }}</td>
          <td>{{ caso.fecha }}</td>
          <td>{{ caso.descripcion }}</td>
          <td>{{ caso.estado }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Botón para mostrar el formulario de nuevo caso -->
    <button @click="mostrarFormulario">Nuevo Caso</button>

    <!-- Mostrar el formulario si isFormularioVisible es true -->
    <div v-if="isFormularioVisible" class="formulario-caso">
      <h2>Formulario de Nuevo Caso</h2>
      <form @submit.prevent="registrarCaso">
        <input v-model="nuevoCaso.codigo" type="text" placeholder="Código" required />
        <input v-model="nuevoCaso.activo" type="text" placeholder="Activo" required />
        <input v-model="nuevoCaso.fecha" type="date" placeholder="Fecha de Reporte" required />
        <textarea v-model="nuevoCaso.descripcion" placeholder="Descripción" required></textarea>
        <select v-model="nuevoCaso.estado" required>
          <option value="En reparación">En reparación</option>
          <option value="Resuelto">Resuelto</option>
          <option value="Pendiente">Pendiente</option>
        </select>
        <button type="submit">Registrar Caso</button>
        <button type="button" @click="cancelarFormulario">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SoporteTecnico',
  data() {
    return {
      casos: [],  // Lista de casos cargada desde localStorage
      isFormularioVisible: false, // Control de visibilidad del formulario
      nuevoCaso: {
        codigo: '',
        activo: '',
        fecha: '',
        descripcion: '',
        estado: 'En reparación'
      }
    };
  },
  created() {
    this.obtenerCasos(); // Cargar los datos de casos desde localStorage al iniciar
  },
  methods: {
    // Método para recuperar los casos desde localStorage
    obtenerCasos() {
      const casos = localStorage.getItem('casos');
      this.casos = casos ? JSON.parse(casos) : [];
    },

    // Método para guardar los casos en localStorage
    guardarEnLocalStorage() {
      localStorage.setItem('casos', JSON.stringify(this.casos));
    },

    mostrarFormulario() {
      this.isFormularioVisible = true;
    },

    // Cancela el registro y oculta el formulario
    cancelarFormulario() {
      this.isFormularioVisible = false;
      this.nuevoCaso = { codigo: '', activo: '', fecha: '', descripcion: '', estado: 'En reparación' }; // Resetea el formulario
    },

    // Registrar un nuevo caso y actualizar localStorage
    registrarCaso() {
      if (this.nuevoCaso.codigo && this.nuevoCaso.activo && this.nuevoCaso.fecha && this.nuevoCaso.descripcion && this.nuevoCaso.estado) {
        this.casos.push({ ...this.nuevoCaso });
        this.guardarEnLocalStorage(); // Guardar los datos actualizados en localStorage
        this.cancelarFormulario();
      } else {
        alert('Por favor, complete todos los campos.');
      }
    },

    // Exportar casos a JSON
    exportarJson() {
      const json = JSON.stringify(this.casos, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'soporte-tecnico.json';
      link.click();
    },

    // Exportar casos a XML
    exportarXml() {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<casos>\n';

      this.casos.forEach(caso => {
        xml += '  <caso>\n';
        xml += `    <codigo>${caso.codigo}</codigo>\n`;
        xml += `    <activo>${caso.activo}</activo>\n`;
        xml += `    <fecha>${caso.fecha}</fecha>\n`;
        xml += `    <descripcion>${caso.descripcion}</descripcion>\n`;
        xml += `    <estado>${caso.estado}</estado>\n`;
        xml += '  </caso>\n';
      });

      xml += '</casos>';

      const blob = new Blob([xml], { type: 'application/xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'soporte-tecnico.xml';
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

    // Importar casos desde un archivo JSON
    async importarJson(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.casos = data;
          this.guardarEnLocalStorage(); // Actualizar localStorage después de importar los casos
        } catch (error) {
          alert('Error al procesar el archivo JSON.');
        }
      };
      reader.readAsText(file);
    },

    // Importar casos desde un archivo XML
    async importarXml(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(e.target.result, "application/xml");

          const casosXml = xmlDoc.getElementsByTagName('caso');
          const casos = Array.from(casosXml).map(casoNode => {
            return {
              codigo: casoNode.getElementsByTagName('codigo')[0].textContent,
              activo: casoNode.getElementsByTagName('activo')[0].textContent,
              fecha: casoNode.getElementsByTagName('fecha')[0].textContent,
              descripcion: casoNode.getElementsByTagName('descripcion')[0].textContent,
              estado: casoNode.getElementsByTagName('estado')[0].textContent
            };
          });

          this.casos = casos;
          this.guardarEnLocalStorage(); // Actualizar localStorage después de importar los casos
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
.soporte-tecnico {
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

.formulario-caso {
  margin-top: 20px;
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
</style>
