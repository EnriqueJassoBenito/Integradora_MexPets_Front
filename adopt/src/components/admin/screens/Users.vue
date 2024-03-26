<template>
  <div class="centered-container">
    <h2>Usuarios</h2>
    <b-list-group style="width: 800px;">
      <b-list-group-item v-for="(usuario, index) in listaUsuarios" :key="index" class="usuario-item">
        <div class="usuario-info">
          <span>{{ usuario.nombre }} - {{ usuario.email }}</span>
        </div>
        <div>
          <b-button variant="danger" @click="eliminarUsuario(index)"><b-icon icon="backspace-fill"></b-icon></b-button>
          <b-button variant="primary" @click="editar(index)"><b-icon icon="pencil-fill"></b-icon></b-button>
          <b-button variant="light" @click="mostrarInformacion(index)"><b-icon icon="info-circle"></b-icon></b-button>
        </div>

      </b-list-group-item>
    </b-list-group>
    <b-modal v-model="mostrarModalInformacion" title="Información del Usuario" hide-footer>
      <div>
        <p><strong>Nombre:</strong> {{ usuarioSeleccionado.nombre }}</p>
        <p><strong>Email:</strong> {{ usuarioSeleccionado.email }}</p>
      </div>
    </b-modal>
    
    <b-modal v-model="mostrarModal" title="Editar Usuario" hide-footer>
      <form @submit.prevent="guardar">
        <b-form-group label="Nombre">
          <b-form-input v-model="usuarioEditado.nombre"></b-form-input>
        </b-form-group>
        <b-form-group label="Email">
          <b-form-input v-model="usuarioEditado.email"></b-form-input>
        </b-form-group>
        <b-form-group label="" class="mb-2">
          <b-button type="submit" variant="primary" style="margin-top: 20px;">Guardar Cambios</b-button>
          <b-button variant="secondary" @click="cerrarModal"
            style="margin-top: 20px; margin-left: 10px;">Cancelar</b-button>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listaUsuarios: [
        { nombre: 'Ricardo Gonzaléz', email: 'richard@gmail.com' },
        { nombre: 'Luis Madina', email: 'LuiMevi23@gmail.com' },
      ],
      mostrarModal: false,
      mostrarModalInformacion: false,
      usuarioEditado: { nombre: '', email: '' },
      usuarioEditadoIndex: null,
      usuarioSeleccionado: { nombre: '', email: '' }
    };
  },
  methods: {
    eliminarUsuario(index) {
      this.listaUsuarios.splice(index, 1);
    },
    editar(index) {
      this.usuarioEditado = { ...this.listaUsuarios[index] };
      this.usuarioEditadoIndex = index;
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
    guardar() {
      this.listaUsuarios.splice(this.usuarioEditadoIndex, 1, this.usuarioEditado);
      this.mostrarModal = false;
    },
    mostrarInformacion(index) {
      if (index >= 0 && index < this.listaUsuarios.length) {
        this.usuarioSeleccionado = { ...this.listaUsuarios[index] };
        this.mostrarModalInformacion = true;
      }
    }
  }
}
</script>

<style>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}
.usuario-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.usuario-info {
  flex: 1;
}

.botones {
  display: flex;
  gap: 10px;
  margin-right: 10px;
}
</style>
