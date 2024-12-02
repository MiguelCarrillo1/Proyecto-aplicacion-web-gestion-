<template>
  <div class="baja-activos">
    <h1>Baja de Activos</h1>
    
    <!-- Botones de exportación e importación -->
    <div class="actions">
      <button @click="exportarJson">Exportar a JSON</button>
      <button @click="exportarXml">Exportar a XML</button>
      <button @click="importarJsonFile">Importar desde JSON</button>
      <button @click="importarXmlFile">Importar desde XML</button>
    </div>

    <!-- Tabla de bajas -->
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Activo</th>
          <th>Fecha de Baja</th>
          <th>Motivo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="baja in bajas" :key="baja.id">
          <td>{{ baja.codigo }}</td>
          <td>{{ baja.activo }}</td>
          <td>{{ baja.fecha }}</td>
          <td>{{ baja.motivo }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Botón para mostrar el formulario de baja -->
    <button @click="mostrarFormulario">Dar de Baja</button>

    <!-- Mostrar el formulario si isFormularioVisible es true -->
    <div v-if="isFormularioVisible" class="formulario-baja">
      <h2>Formulario de Baja</h2>
      <form @submit.prevent="darDeBaja">
        <input v-model="nuevaBaja.codigo" type="text" placeholder="Código del Activo" required />
        <input v-model="nuevaBaja.activo" type="text" placeholder="Activo" required />
        <input v-model="nuevaBaja.fecha" type="date" required />
        <input v-model="nuevaBaja.motivo" type="text" placeholder="Motivo" required />
        <button type="submit">Dar de Baja</button>
        <button type="button" @click="cancelarFormulario">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bajas: [
        { codigo: 'ACT1234', activo: 'Impresora Canon', fecha: '2023-10-10', motivo: 'No es reparable' },
        { codigo: 'ACT2345', activo: 'Proyector Epson', fecha: '2023-11-01', motivo: 'Obsoleto' }
      ],
      isFormularioVisible: false, // Control de visibilidad del formulario
      nuevaBaja: {
        codigo: '',
        activo: '',
        fecha: '',
        motivo: ''
      }
    };
  },
  methods: {
    mostrarFormulario() {
      this.isFormularioVisible = true;
    },

    // Cancela la baja y oculta el formulario
    cancelarFormulario() {
      this.isFormularioVisible = false;
      this.nuevaBaja = { codigo: '', activo: '', fecha: '', motivo: '' }; // Resetea el formulario
    },

    // Dar de baja un activo
    darDeBaja() {
      if (this.nuevaBaja.codigo && this.nuevaBaja.activo && this.nuevaBaja.fecha && this.nuevaBaja.motivo) {
        this.bajas.push({ ...this.nuevaBaja });
        this.cancelarFormulario();
      } else {
        alert('Por favor, complete todos los campos.');
      }
    },

    // Exportar bajas a JSON
    exportarJson() {
      const json = JSON.stringify(this.bajas, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'bajas.json';
      link.click();
    },

    // Exportar bajas a XML
    exportarXml() {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<bajas>\n';

      this.bajas.forEach(baja => {
        xml += '  <baja>\n';
        xml += `    <codigo>${baja.codigo}</codigo>\n`;
        xml += `    <activo>${baja.activo}</activo>\n`;
        xml += `    <fecha>${baja.fecha}</fecha>\n`;
        xml += `    <motivo>${baja.motivo}</motivo>\n`;
        xml += '  </baja>\n';
      });

      xml += '</bajas>';

      const blob = new Blob([xml], { type: 'application/xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'bajas.xml';
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

    // Importar bajas desde un archivo JSON
    async importarJson(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.bajas = data;
        } catch (error) {
          alert('Error al procesar el archivo JSON.');
        }
      };
      reader.readAsText(file);
    },

    // Importar bajas desde un archivo XML
    async importarXml(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(e.target.result, "application/xml");

          const bajasXml = xmlDoc.getElementsByTagName('baja');
          const bajas = Array.from(bajasXml).map(bajaNode => {
            return {
              codigo: bajaNode.getElementsByTagName('codigo')[0].textContent,
              activo: bajaNode.getElementsByTagName('activo')[0].textContent,
              fecha: bajaNode.getElementsByTagName('fecha')[0].textContent,
              motivo: bajaNode.getElementsByTagName('motivo')[0].textContent
            };
          });

          this.bajas = bajas;
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
.baja-activos {
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

.formulario-baja {
  margin-top: 20px;
}

button {
  margin: 10px;
}
</style>
