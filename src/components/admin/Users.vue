<template>
  <div class="centered-container">
    <div class="loading-overlay is-active" v-if="isLoading">
      <div class="custom-loader"></div>
    </div>
    <div class="cuadro-blanco">
      <h2>Administración de Usuarios</h2>
      <div class="row">
        <div class="col">
          <b-form-input
            v-model="userSerch"
            placeholder="Buscar..."
          ></b-form-input>
        </div>
        <div class="col">
          <b-form-select
            v-model="rolFilter"
            :options="optionRol"
            placeholder="Filtrar por Rol"
            style="height: 38px; border-radius: 5px"
          ></b-form-select>
        </div>
        <div class="col">
          <b-button
            variant="success"
            @click="showModalAddModeratorFn"
            class="ml-auto"
            >Agregar Moderador</b-button
          >
        </div>
      </div>
      <b-table
        striped
        hover
        :items="filteredItems"
        :fields="fields"
        style="width: 1300px; margin-top: 20px"
      >
        <template v-slot:cell(username)="row">
          {{ row.item.username }}
        </template>
        <template v-slot:cell(name)="row">
          {{ row.item.name }} {{ row.item.lastname }}
          {{ row.item.lastnameMatern }}
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
    <b-modal
      v-model="showModalAddModerator"
      title="Agregar Moderador"
      hide-footer
    >
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
                  :rules="[
                    {
                      validator: validateName,
                      message: 'El nombre debe contener al menos 2 caracteres',
                    },
                  ]"
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
                  :rules="[
                    {
                      validator: validateLastName,
                      message:
                        'El apellido paterno debe contener al menos 2 caracteres',
                    },
                  ]"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="6">
              <b-form-group>
                <h6 class="mt-4">
                  Apellido Materno <span class="obligationText">*</span>
                </h6>
                <b-form-input
                  v-model="lastNameMatern"
                  type="text"
                  placeholder="Apellido Materno"
                  required
                  :rules="[
                    {
                      validator: validateLastNameMatern,
                      message:
                        'El apellido materno debe contener al menos 2 caracteres',
                    },
                  ]"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group>
                <h6 class="mt-4">Rol <span class="obligationText">*</span></h6>
                <b-form-select
                  v-model="selectedRole"
                  :options="roles"
                  required
                  :rules="[
                    {
                      validator: validateSelectedRole,
                      message: 'Por favor, selecciona un rol',
                    },
                  ]"
                ></b-form-select>
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
                  :rules="[
                    {
                      validator: validatePhone,
                      message: 'El teléfono debe ser válido',
                    },
                  ]"
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
                  :rules="[
                    {
                      validator: validateSelected,
                      message: 'Por favor, selecciona un estado',
                    },
                  ]"
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
                  :rules="[
                    {
                      validator: validateUserName,
                      message:
                        'El nombre de usuario debe contener al menos 4 caracteres',
                    },
                  ]"
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
                  :rules="[
                    {
                      validator: validateEmail,
                      message: 'El correo electrónico debe ser válido',
                    },
                  ]"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
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
                  :rules="[
                    {
                      validator: validatePassword,
                      message:
                        'La contraseña debe contener al menos 6 caracteres',
                    },
                  ]"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <b-form-group>
                <h6 class="mt-4">
                  Confirmar contraseña <span class="obligationText">*</span>
                </h6>
                <b-form-input
                  v-model="confirmPassword"
                  type="password"
                  placeholder="***********"
                  required
                  :rules="[
                    {
                      validator: validateConfirmPassword,
                      message: 'Las contraseñas no coinciden',
                    },
                  ]"
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

    <b-modal
      v-model="showModalInfo"
      title="Información del Usuario"
      hide-footer
    >
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
          <b-button type="submit" variant="primary" style="margin-top: 20px"
            >Guardar Cambios</b-button
          >
          <b-button
            variant="secondary"
            @click="closeModalAddModerator"
            style="margin-top: 20px; margin-left: 10px"
            >Cancelar</b-button
          >
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import service from "../../service/UsersService";
import rol from "../../service/RolService";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      service: service,
      error: false,
      isLoading: false,
      error_msg: "",
      name: "",
      lastName: "",
      phone: "",
      selected: null,
      userName: "",
      password: "",
      confirmPassword: "",
      lastNameMatern: '',
      email: "",
      usersList: [],
      rolFilter: "All",
      userSerch: "",
      optionRol: ["All", "ADMIN", "MODERADOR"],
      fields: [
        { key: "nameUser", label: "Username" },
        { key: "name", label: "Nombre" },
        { key: "email", label: "Correo" },
        { key: "location", label: "Lugar" },
        { key: "phoneNumber", label: "Teléfono" },
        { key: "rol.nrol", label: "Rol" },
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
      userEdit: { name: "", email: "" },
      userEditIndex: null,
      userSelect: { name: "", email: "" },
      newModerator: { name: "", email: "" },
      showModalAddModerator: false,
      selectedRole: "",
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
      if (this.rolFilter !== "All") {
        usersFilter = usersFilter.filter(
          (user) => user.rol && user.rol.nrol === this.rolFilter
        );
      }
      if (this.userSerch.trim() !== "") {
        const busqueda = this.userSerch.toLowerCase();
        usersFilter = usersFilter.filter(
          (user) =>
            user.name.toLowerCase().includes(busqueda) ||
            user.email.toLowerCase().includes(busqueda) ||
            user.phoneNumber.includes(busqueda) ||
            (user.rol && user.rol.nrol.toLowerCase().includes(busqueda))
        );
      }

      return usersFilter;
    },
  },
  methods: {
    async consultTypeUsers() {
      try {
        this.loading = true;
        const result = await service.getUsersByAdminAndModeratorRoles();
        this.usersList = result;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error authentication",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
    async loadRoles() {
      try {
        this.roles = await rol.getAllRolU();
      } catch (error) {
        console.error("Error al obtener roles:", error);
      }
    },
    async onSubmit() {
      this.isLoading = true;

      try {
        const roles = await rol.getAllRol();
        let clienteRol = null;
        if (this.selectedRole) {
          clienteRol = roles.find((rol) => rol.nrol === this.selectedRole);
        } else {
          this.error = true;
          this.error_msg = "¡Debes seleccionar un rol!";
          return;
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
            nrol: clienteRol.nrol,
            status: true,
          },
          status: true,
        };
        console.log(formData);
        const response = await service.insertUser(formData);

        if (response && response.nameUser) {
          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: "Usuario agregado correctamente: " + response.nameUser,
          });
          this.showModalAddModerator = false;
        } else {
          throw new Error(
            "La respuesta del servidor no contiene un usuario válido."
          );
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al registrar usuario: " + error.message,
        });
      } finally {
        this.isLoading = false;
      }
    },
    cerrarModalAgregarModerador() {
      this.showModalAddModerator = false;
    },
    closeModalAddModerator() {
      this.showModalAddModerator = false;
      this.newModerator = { name: "", email: "" };
    },
    showModalAddModeratorFn() {
      this.showModalAddModerator = true;
    },
    validateName(value) {
      const regex = /^[a-zA-Z\s]+$/;
      return regex.test(value) && value.length >= 2;
    },
    validateLastName(value) {
      const regex = /^[a-zA-Z\s]+$/;
      return regex.test(value) && value.length >= 2;
    },
    validateLastNameMatern(value) {
      const regex = /^[a-zA-Z\s]+$/;
      return regex.test(value) && value.length >= 2;
    },
    validatePhone(value) {
      const regex = /^[0-9]{10}$/;
      return regex.test(value);
    },
    validateUserName(value) {
      const regex = /^[a-zA-Z0-9_]+$/;
      return regex.test(value) && value.length >= 4;
    },
    validateEmail(value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    },
    validateSelectedRole(value) {
      return value !== '';
    },
    validateSelected(value) {
      return value !== '';
    },
    validatePassword(value) {
      return value.length >= 6;
    },
    validateConfirmPassword(value) {
      return value === this.password;
    },
  },
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

.loading-overlay {
  display: none;
  background: rgba(255, 255, 255, 0.708);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9998;
  align-items: center;
  justify-content: center;
}

.loading-overlay.is-active {
  display: flex;
}

.custom-loader {
  width: 50px;
  height: 50px;
  display: grid;
  color: #f0bb00;
  background: radial-gradient(
    farthest-side,
    currentColor calc(100% - 6px),
    #0000 calc(100% - 5px) 0
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    #0000 calc(100% - 13px),
    #000 calc(100% - 12px)
  );
  border-radius: 50%;
  animation: s9 2s infinite linear;
}

.custom-loader::before,
.custom-loader::after {
  content: "";
  grid-area: 1/1;
  background: linear-gradient(currentColor 0 0) center,
    linear-gradient(currentColor 0 0) center;
  background-size: 100% 10px, 10px 100%;
  background-repeat: no-repeat;
}

.custom-loader::after {
  transform: rotate(45deg);
}

@keyframes s9 {
  100% {
    transform: rotate(1turn);
  }
}
</style>