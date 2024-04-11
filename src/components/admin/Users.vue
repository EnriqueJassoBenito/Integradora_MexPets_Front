<template>
  <div class="centered-container">
    <div class="cuadro-blanco">
      <h2>Administración de Usuarios</h2>
      <div class="row">
        <div class="col">
          <b-form-input v-model="userSerch" placeholder="Buscar..."></b-form-input>
        </div>
        <div class="col">
          <b-form-select v-model="rolFilter" :options="optionRol" placeholder="Filtrar por Rol"
            style="height:38px; border-radius: 5px;"></b-form-select>
        </div>
        <div class="col">
          <b-button variant="success" @click="showModalAddModeratorFn" class="ml-auto">Agregar
            Moderador</b-button>
        </div>
      </div>
      <b-table striped hover :items="filteredItems" :fields="fields" style="width: 1300px; margin-top: 20px;">
        <template v-slot:cell(username)="row">
            {{ row.item.username }}
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
        <template v-slot:cell(actions)="row">
          <b-button variant="warning" size="sm" @click="openModalType(type)" style="margin-right:10px;height: 35px;"><b-icon icon="pencil-square"></b-icon></b-button>
          <b-button @click="editarUsuario(row.item)" variant="success">Habilitar</b-button>

        </template>
      </b-table>
    </div>

    <b-modal v-model="showModalAddModerator" title="Agregar Moderador" hide-footer>
      <form @submit.prevent="addModerator">
        <b-form-group label="Nombre">
          <b-form-input v-model="newModerator.nombre"></b-form-input>
        </b-form-group>
        <b-form-group label="Apellido Paterno">
          <b-form-input v-model="newModerator.lastname"></b-form-input>
        </b-form-group>
        <b-form-group label="Apellido Materno">
          <b-form-input v-model="newModerator.lastnameMatern"></b-form-input>
        </b-form-group>
        <b-form-group label="Teléfono">
          <b-form-input v-model="newModerator.phoneNumber"></b-form-input>
        </b-form-group>
        <b-form-group label="Correo electrónico">
          <b-form-input v-model="newModerator.email"></b-form-input>
        </b-form-group>
        <b-form-group label="Contraseña">
          <b-form-input v-model="newModerator.password"></b-form-input>
        </b-form-group>
        <b-form-group label="" class="mb-2">
          <b-button type="submit" variant="primary" style="margin-top: 20px;">Guardar</b-button>
          <b-button variant="secondary" @click="cerrarModalAgregarModerador"
            style="margin-top: 20px; margin-left: 10px;">Cancelar</b-button>
        </b-form-group>
      </form>
    </b-modal>

    <b-modal v-model="showModalInfo" title="Información del Usuario" hide-footer>
      <div>
        <p><strong>Nombre:</strong> {{ userSelect.nombre }}</p>
        <p><strong>Email:</strong> {{ userSelect.email }}</p>
      </div>
    </b-modal>

    <b-modal v-model="showModal" title="Editar Usuario" hide-footer>
      <form @submit.prevent="guardar">
        <b-form-group label="Nombre">
          <b-form-input v-model="userEdit.nombre"></b-form-input>
        </b-form-group>
        <b-form-group label="Email">
          <b-form-input v-model="userEdit.email"></b-form-input>
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
import service from '../../service/UsersService';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      usersList: [],
      rolFilter: 'All',
      userSerch: '',
      optionRol: ['All', 'ADMIN', 'MODE'],
      fields: [
        { key: 'nameUser', label: 'Username' },
        { key: 'name', label: 'Nombre' },
        { key: 'lastname', label: 'Apellido' },
        { key: 'lastnameMatern', label: 'Apellido Materno' },
        { key: 'email', label: 'Correo' },
        { key: 'location', label: 'Lugar' },
        { key: 'phoneNumber', label: 'Teléfono' },
        { key: 'rol.nrol', label: 'Rol' },
        { key: 'actions', label: 'Acciones' }
        
      ],
      showModal: false,
      showModalInfo: false,
      showModalAddModerator: false,
      userEdit: { name: '', email: '' },
      userEditIndex: null,
      userSelect: { name: '', email: '' },
      newModerator: { name: '', email: '' }
    };
  },
  created() {
    this.consultTypeUsers();
  },
  computed: {
    filteredItems() {
      let usersFilter = this.usersList;
      if (this.rolFilter !== 'All') {
        usersFilter = usersFilter.filter(user => user.rol && user.rol.nrol === this.rolFilter);
      }
      if (this.userSerch.trim() !== '') {
        const busqueda = this.userSerch.toLowerCase();
        usersFilter = usersFilter.filter(user =>
          user.name.toLowerCase().includes(busqueda) ||
          user.email.toLowerCase().includes(busqueda) ||
          user.phoneNumber.includes(busqueda) ||
          (user.rol && user.rol.nrol.toLowerCase().includes(busqueda))
        );
      }

      return usersFilter;
    }
  },
  methods: {
    async consultTypeUsers() {
  try {
    this.loading = true;
    const result = await service.getUsersByAdminAndModeratorRoles();
    this.usersList = result;
  } catch (error) {
    console.error("Error:", error);
    alert("Error");
  }
},
closeModalAddModerator() {
      this.showModalAddModerator = false;
      this.newModerator = { name: '', email: '' };
    },
    showModalAddModeratorFn() {
      this.showModalAddModerator = true;
    },
    addModerator() {
      this.usersList.push(this.newModerator);
      this.closeModalAddModerator();
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