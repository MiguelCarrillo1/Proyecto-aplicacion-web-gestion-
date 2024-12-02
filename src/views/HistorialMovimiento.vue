<template>
  <div class="historial-movimientos">
    <h1>Historial de Movimientos</h1>

    <!-- Botones de exportación e importación -->
    <div class="actions">
      <button @click="exportarJson">Exportar a JSON</button>
      <button @click="exportarXml">Exportar a XML</button>
      <button @click="importarJsonFile">Importar desde JSON</button>
      <button @click="importarXmlFile">Importar desde XML</button>
    </div>

    <!-- Tabla de movimientos -->
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Activo</th>
          <th>Movimiento</th>
          <th>Fecha</th>
          <th>Usuario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movimiento in movimientos" :key="movimiento.id">
          <td>{{ movimiento.codigo }}</td>
          <td>{{ movimiento.activo }}</td>
          <td>{{ movimiento.movimiento }}</td>
          <td>{{ movimiento.fecha }}</td>
          <td>{{ movimiento.usuario }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HistorialMovimientos',
  data() {
    return {
      movimientos: [
        { codigo: 'ACT1234', activo: 'Computadora HP', movimiento: 'Asignación', fecha: '2023-06-01', usuario: 'Juan Pérez' },
        { codigo: 'ACT2345', activo: 'Impresora Canon', movimiento: 'Mantenimiento', fecha: '2023-07-15', usuario: 'María López' }
      ]
    };
  },
  methods: {
    // Exportar movimientos a JSON
    exportarJson() {
      const json = JSON.stringify(this.movimientos, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'movimientos.json';
      link.click();
    },

    // Exportar movimientos a XML
    exportarXml() {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += '<movimientos>\n';

      this.movimientos.forEach(movimiento => {
        xml += '  <movimiento>\n';
        xml += `    <codigo>${movimiento.codigo}</codigo>\n`;
        xml += `    <activo>${movimiento.activo}</activo>\n`;
        xml += `    <movimiento>${movimiento.movimiento}</movimiento>\n`;
        xml += `    <fecha>${movimiento.fecha}</fecha>\n`;
        xml += `    <usuario>${movimiento.usuario}</usuario>\n`;
        xml += '  </movimiento>\n';
      });

      xml += '</movimientos>';

      const blob = new Blob([xml], { type: 'application/xml' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'movimientos.xml';
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

    // Importar movimientos desde un archivo JSON
    async importarJson(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.movimientos = data;
        } catch (error) {
          alert('Error al procesar el archivo JSON.');
        }
      };
      reader.readAsText(file);
    },

    // Importar movimientos desde un archivo XML
    async importarXml(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(e.target.result, "application/xml");

          const movimientosXml = xmlDoc.getElementsByTagName('movimiento');
          const movimientos = Array.from(movimientosXml).map(movimientoNode => {
            return {
              codigo: movimientoNode.getElementsByTagName('codigo')[0].textContent,
              activo: movimientoNode.getElementsByTagName('activo')[0].textContent,
              movimiento: movimientoNode.getElementsByTagName('movimiento')[0].textContent,
              fecha: movimientoNode.getElementsByTagName('fecha')[0].textContent,
              usuario: movimientoNode.getElementsByTagName('usuario')[0].textContent
            };
          });

          this.movimientos = movimientos;
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
.historial-movimientos {
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
</style>

