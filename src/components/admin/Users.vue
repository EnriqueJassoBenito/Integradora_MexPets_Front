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
        <template v-slot:cell(name)="row">
          {{ row.item.name }} {{ row.item.lastname }} {{ row.item.lastnameMatern }}
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
      <b-form @submit.prevent="onSubmit">
              <div>
                <b-row>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Nombre <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="name"
                        type="text"
                        placeholder="Nombre(s)"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Apellido Paterno <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="lastName"
                        type="text"
                        placeholder="Apellido Paterno"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Apellido Materno <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="lastnameMatern"
                        type="text"
                        placeholder="Apellido Materno"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Teléfono <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="phone"
                        type="tel"
                        placeholder="7771234567"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Estado <span class="obligationText">*</span>
                      </h6>
                      <b-form-select
                        v-model="selected"
                        :options="options"
                        required
                      ></b-form-select>
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Nombre de usuario <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="userName"
                        type="text"
                        placeholder="Nombre de usuario"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Correo Electrónico <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="email"
                        type="email"
                        placeholder="correo@example.com"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Contraseña <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="password"
                        type="password"
                        placeholder="***********"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                  <b-col cols="6">
                    <b-form-group>
                      <h6 class="mt-4">
                        Confirmar contraseña
                        <span class="obligationText">*</span>
                      </h6>
                      <b-form-input
                        v-model="confirmPassword"
                        type="password"
                        placeholder="***********"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </b-col>
                </b-row>
              </div>
            </b-form>
            <div class="contentCenter">
            <b-button
              class="mt-4 btnLogin"
              href="#"
              variant="success"
              @click="onSubmit"
              >Registrarse</b-button
            >
          </div>
  </b-modal>

    <b-modal v-model="showModalInfo" title="Información del Usuario" hide-footer>
      <div>
        <p><strong>Nombre:</strong> {{ userSelect.name }}</p>
        <p><strong>Email:</strong> {{ userSelect.email }}</p>
      </div>
    </b-modal>

    <b-modal v-model="showModal" title="Editar Usuario" hide-footer>
      <form @submit.prevent="guardar">
        <b-form-group label="Nombre">
          <b-form-input v-model="userEdit.name"></b-form-input>
        </b-form-group>
        <b-form-group label="Email">
          <b-form-input v-model="userEdit.email"></b-form-input>
        </b-form-group>
        <b-form-group label="" class="mb-2">
          <b-button type="submit" variant="primary" style="margin-top: 20px;">Guardar Cambios</b-button>
          <b-button variant="secondary" @click="closeModalAddModerator"
            style="margin-top: 20px; margin-left: 10px;">Cancelar</b-button>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import service from '../../service/UsersService';
import rol from '../../service/RolService';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      service: service,
      error: false,
      error_msg: "",
      name: "",
      lastName: "",
      phone: "",
      selected: null,
      userName: "",
      password: "",
      confirmPassword: "",
      lastnameMatern: "",
      email:"",
      usersList: [],
      rolFilter: 'All',
      userSerch: '',
      optionRol: ['All', 'ADMIN', 'MODERADOR'],
      fields: [
        { key: 'nameUser', label: 'Username' },
        { key: 'name', label: 'Nombre' },
        { key: 'email', label: 'Correo' },
        { key: 'location', label: 'Lugar' },
        { key: 'phoneNumber', label: 'Teléfono' },
        { key: 'rol.nrol', label: 'Rol' },
        { key: 'actions', label: 'Acciones' }
        
      ],
      options: [
        { value: null, text: "Selecciona un Estado" },
        { value: "Aguascalientes", text: "Aguascalientes" },
        { value: "Baja California", text: "Baja California" },
        { value: "Baja California Sur", text: "Baja California Sur" },
        { value: "Campeche", text: "Campeche" },
        { value: "Chiapas", text: "Chiapas" },
        { value: "Chihuahua", text: "Chihuahua" },
        { value: "Ciudad de México", text: "Ciudad de México" },
        { value: "Coahuila", text: "Coahuila" },
        { value: "Colima", text: "Colima" },
        { value: "Durango", text: "Durango" },
        { value: "Estado de México", text: "Estado de México" },
        { value: "Guanajuato", text: "Guanajuato" },
        { value: "Guerrero", text: "Guerrero" },
        { value: "Hidalgo", text: "Hidalgo" },
        { value: "Jalisco", text: "Jalisco" },
        { value: "Michoacán", text: "Michoacán" },
        { value: "Morelos", text: "Morelos" },
        { value: "Nayarit", text: "Nayarit" },
        { value: "Nuevo León", text: "Nuevo León" },
        { value: "Oaxaca", text: "Oaxaca" },
        { value: "Puebla", text: "Puebla" },
        { value: "Querétaro", text: "Querétaro" },
        { value: "Quintana Roo", text: "Quintana Roo" },
        { value: "San Luis Potosí", text: "San Luis Potosí" },
        { value: "Sinaloa", text: "Sinaloa" },
        { value: "Sonora", text: "Sonora" },
        { value: "Tabasco", text: "Tabasco" },
        { value: "Tamaulipas", text: "Tamaulipas" },
        { value: "Tlaxcala", text: "Tlaxcala" },
        { value: "Veracruz", text: "Veracruz" },
        { value: "Yucatán", text: "Yucatán" },
        { value: "Zacatecas", text: "Zacatecas" },
      ],
      showModal: false,
      showModalInfo: false,
      showModalAddModerator: false,
      userEdit: { name: '', email: '' },
      userEditIndex: null,
      userSelect: { name: '', email: '' },
      newModerator: { name: '', email: '' },
      showModalAddModerator: false,

      roles: [],
    };
  },
  created() {
    this.consultTypeUsers();
    this.loadRoles(); 
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
    Swal.fire({
          icon: 'error',
          title: 'Error authentication',
          showConfirmButton: false,
          timer: 1500
        });
  }
},
async loadRoles() {
  try {
        this.roles = await rol.getAllRol();
      } catch (error) {
        console.error("Error al obtener roles:", error);
      }
    },
    async onSubmit() {
  if (!this.validateForm()) {
    this.error = true;
    this.error_msg = "¡Debes completar todos los campos correctamente!";
    return;
  }
  
  try {
    const roles = await rol.getAllRol();

    const clienteRol = roles.find(rol => rol.nrol === "ADMIN");

    if (!clienteRol) {
      throw new Error("No se encontró el rol de cliente.");
    }

    const formData = {
      nameUser: this.userName,
      name: this.name,
      lastname: this.lastName,
      lastnameMatern: this.lastnameMatern,
      email: this.email,
      phoneNumber: this.phone,
      localitation: this.selected,
      password: this.password,
      rol: {
        idRol: clienteRol.idRol,
        nrol: clienteRol.nrol,
        status: true
      },
      status: true
    };

    const response = await service.insertUser(formData);

    if (response && response.nameUser) {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario agregado correctamente: ' + response.nameUser
      });
      this.showModalAddModerator = false;
    } else {
      throw new Error("La respuesta del servidor no contiene un usuario válido.");
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al registrar usuario: ' + error.message
    });
  }
}
,
    cerrarModalAgregarModerador() {
      this.showModalAddModerator = false;
    },
closeModalAddModerator() {
      this.showModalAddModerator = false;
      this.newModerator = { name: '', email: '' };
    },
    showModalAddModeratorFn() {
      this.showModalAddModerator = true;
    },
    validateForm() {
  return (
    this.name.trim() !== "" &&
    this.lastName.trim() !== "" &&
    this.phone.trim() !== "" &&
    this.selected !== null &&
    this.userName.trim() !== "" &&
    this.email.trim() !== "" && 
    this.password.trim() !== "" &&
    this.confirmPassword.trim() !== "" &&
    this.password === this.confirmPassword
  );
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