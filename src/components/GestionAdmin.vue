<template>
  <div>
    <b-container>
      <b-row class="mb-3">
        <b-col>
          <b-button @click="openModal" variant="primary">Agregar Usuario</b-button>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-table :items="usuarios" :fields="fields" striped hover>
            <template v-slot:cell(modify)="data">
              <b-button @click="editUser(data.index)" variant="warning">Modificar</b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>

    <!-- Modal para registrar o modificar usuarios -->
    <b-modal v-model="modalVisible" title="Registro de Usuario">
      <b-form @submit.prevent="submitForm">
        <b-form-group label="Nombre:" label-for="nombre">
          <b-form-input id="nombre" v-model="usuario.nombre" required></b-form-input>
        </b-form-group>
        
        <!-- Agrega más campos según tus necesidades -->

        <b-button type="submit" variant="primary">Guardar</b-button>
        <b-button @click="closeModal" variant="danger">Cancelar</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalVisible: false,
      usuario: {
        nombre: '',
        // Agrega más campos según tus necesidades
      },
      usuarios: [
        // Puedes agregar datos de ejemplo aquí si lo deseas
      ],
      fields: [
        // Campos para la tabla
        { key: 'nombre', label: 'Nombre' },
        // Agrega más campos según tus necesidades
        { key: 'modify', label: 'Modificar' },
      ],
    };
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    submitForm() {
      // Aquí implementa la lógica para registrar o modificar usuarios
      // Puedes agregar el usuario al array o hacer una llamada API, dependiendo de tu aplicación
      // Luego, cierra el modal y reinicia el objeto usuario
      if (this.editingIndex !== null) {
        // Modificar usuario existente
        this.$set(this.usuarios, this.editingIndex, { ...this.usuario });
      } else {
        // Agregar nuevo usuario
        this.usuarios.push({ ...this.usuario });
      }

      this.closeModal();
      this.clearForm();
    },
    editUser(index) {
      // Aquí implementa la lógica para cargar los datos del usuario seleccionado en el modal
      this.usuario = { ...this.usuarios[index] };
      this.editingIndex = index;
      this.modalVisible = true;
    },
    clearForm() {
      // Reinicia el objeto usuario y el índice de edición
      this.usuario = { nombre: '' };
      this.editingIndex = null;
    },
  },
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
