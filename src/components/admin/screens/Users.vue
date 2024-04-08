<template>
  <div class="centered-container">
    <div class="cuadro-blanco">
      <h2>Administración de Usuarios</h2>
      <div class="row">
        <div class="col">
          <b-form-input v-model="filtroBusqueda" placeholder="Buscar..."></b-form-input>
        </div>
        <div class="col">
          <b-form-select v-model="filtroRol" :options="opcionesRoles" placeholder="Filtrar por Rol"
            style="height:38px; border-radius: 5px;"></b-form-select>
        </div>
        <div class="col">
          <b-button variant="success" @click="mostrarModalAgregarModeradorFn" class="ml-auto">Agregar
            Moderador</b-button>
        </div>
      </div>
      <b-table striped hover :items="filteredItems" :fields="fields" style="width: 1000px; margin-top: 20px;">
        <template v-slot:cell(username)="row">
          <div draggable="true" @dragstart="dragStartHandler(row.item)">
            {{ row.item.username }}
          </div>
        </template>
        <template v-slot:cell(nombre)="row">
          {{ row.item.nombre }} {{ row.item.lastname }} {{ row.item.lastnameMatern }}
        </template>
        <template v-slot:cell(email)="row">
          {{ row.item.email }}
        </template>
        <template v-slot:cell(telefono)="row">
          {{ row.item.phoneNumber }}
        </template>
        <template v-slot:cell(location)="row">
          {{ row.item.localitation }}
        </template>
        <template v-slot:cell(rol)="row">
          {{ row.item.rol }}
        </template>

      </b-table>
    </div>

    <b-modal v-model="mostrarModalAgregarModerador" title="Agregar Moderador" hide-footer>
      <form @submit.prevent="agregarModerador">
        <b-form-group label="Nombre">
          <b-form-input v-model="nuevoModerador.nombre"></b-form-input>
        </b-form-group>
        <b-form-group label="Apellido Paterno">
          <b-form-input v-model="nuevoModerador.lastname"></b-form-input>
        </b-form-group>
        <b-form-group label="Apellido Materno">
          <b-form-input v-model="nuevoModerador.lastnameMatern"></b-form-input>
        </b-form-group>
        <b-form-group label="Teléfono">
          <b-form-input v-model="nuevoModerador.phoneNumber"></b-form-input>
        </b-form-group>
        <b-form-group label="Correo electrónico">
          <b-form-input v-model="nuevoModerador.email"></b-form-input>
        </b-form-group>
        <b-form-group label="Contraseña">
          <b-form-input v-model="nuevoModerador.password"></b-form-input>
        </b-form-group>
        <b-form-group label="" class="mb-2">
          <b-button type="submit" variant="primary" style="margin-top: 20px;">Guardar</b-button>
          <b-button variant="secondary" @click="cerrarModalAgregarModerador"
            style="margin-top: 20px; margin-left: 10px;">Cancelar</b-button>
        </b-form-group>
      </form>
    </b-modal>

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
import axios from 'axios';

export default {
  data() {
    return {
      listaUsuarios: [],
      filtroRol: 'All',
      filtroBusqueda: '',
      opcionesRoles: ['All', 'ADMIN', 'MODE', 'CLIENTE'],
      fields: [
        { key: 'nameUser', label: 'Username' },
        { key: 'name', label: 'Nombre' },
        { key: 'lastname', label: 'Apellido' },
        { key: 'lastnameMatern', label: 'Apellido Materno' },
        { key: 'email', label: 'Correo' },
        { key: 'location', label: 'Lugar' },
        { key: 'phoneNumber', label: 'Teléfono' },
        { key: 'rol.nrol', label: 'Rol' },
        { key: 'more', label: '' }
      ],
      mostrarModal: false,
      mostrarModalInformacion: false,
      mostrarModalAgregarModerador: false,
      usuarioEditado: { name: '', email: '' },
      usuarioEditadoIndex: null,
      usuarioSeleccionado: { name: '', email: '' },
      nuevoModerador: { name: '', email: '' }
    };
  },
  created() {
    this.fetchUsuarios();
  },
  computed: {
    filteredItems() {
      let usuariosFiltrados = this.listaUsuarios;
      if (this.filtroRol !== 'All') {
        usuariosFiltrados = usuariosFiltrados.filter(usuario => usuario.rol && usuario.rol.nrol === this.filtroRol);
      }
      if (this.filtroBusqueda.trim() !== '') {
        const busqueda = this.filtroBusqueda.toLowerCase();
        usuariosFiltrados = usuariosFiltrados.filter(usuario =>
          usuario.name.toLowerCase().includes(busqueda) ||
          usuario.email.toLowerCase().includes(busqueda) ||
          usuario.phoneNumber.includes(busqueda) ||
          (usuario.rol && usuario.rol.nrol.toLowerCase().includes(busqueda))
        );
      }

      return usuariosFiltrados;
    }
  },
  methods: {
    async fetchUsuarios() {
      try {
        const response = await axios.get('http://localhost:8080/api/user/');
        if (response.data && response.data.data) {
          this.listaUsuarios = response.data.data;
        }
      } catch (error) {
        console.error('Error fetching usuarios:', error);
      }
    },
    cerrarModalAgregarModerador() {
      this.mostrarModalAgregarModerador = false;
      this.nuevoModerador = { name: '', email: '' };
    },
    mostrarModalAgregarModeradorFn() {
      this.mostrarModalAgregarModerador = true;
    },
    agregarModerador() {
      this.listaUsuarios.push(this.nuevoModerador);
      this.cerrarModalAgregarModerador();
    },
    dragStartHandler(usuario) {
      event.dataTransfer.setData("usuario", JSON.stringify(usuario));
    },
    dropHandler(event) {
      event.preventDefault();
      const usuario = JSON.parse(event.dataTransfer.getData("usuario"));
      this.eliminarUsuario(usuario);
    },
    eliminarUsuario(usuario) {
      const index = this.listaUsuarios.findIndex(u => u.id === usuario.id);
      if (index !== -1) {
        this.listaUsuarios.splice(index, 1);
      }
    },
    dragOverHandler(event) {
      event.preventDefault();
    }
  }
};
</script>


<style>
.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: rgb(249, 249, 249);
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

.titulo-moderador {
  margin-bottom: 20px;
}

.cuadro-blanco {
  margin-top: 50px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>